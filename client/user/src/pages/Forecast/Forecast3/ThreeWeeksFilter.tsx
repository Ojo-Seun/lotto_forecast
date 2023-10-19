import React, { useEffect, useState } from "react"
import styles from "../Forecast.module.css"
import SelectBox from "../../../components/utils/select-box/SelectBox"
import { groups, ghanas, premmiers, threeWeeksPatterns, weeksToAdd, defaultEvents, whereToSearch } from "../../../utils/repo"
import LastThreeEvents from "../LastThreeEvents"
import { GameTypes, Games, Group, ResultType, ThreeWeeksPatterns, ThreeWeeksPayload, WhereToSearch, WinningOrMachineEvent } from "../../../utils/type"
import LoadingIndicator from "../../../components/utils/LodingIndicator"
import ErrorNotification from "../../../components/error/ErrorNotification"
import SendEvents from "../SendEvents"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getGameEventsAsync } from "../../../features/getEvents/getEventsSlice"
import useValidators from "../../../hooks/useValidators"
import StaticFiveBoxies from "../../../components/utils/ten-boxies-nums/StaticFiveBoxies"

interface ErrorObj {
  err: boolean
  message: string
}
interface State {
  loading: boolean
  error: ErrorObj
  data: ResultType[]
}

interface Props {
  setData: React.Dispatch<React.SetStateAction<State>>
  data: State
}

interface Props {
  setData: React.Dispatch<React.SetStateAction<State>>
  data: State
  setWhereToExtractData: React.Dispatch<React.SetStateAction<WhereToSearch>>
  whereToExtractData: WhereToSearch
}

function ThreeWeeksFilter({ data, setData, whereToExtractData, setWhereToExtractData }: Props) {
  const [gameToForecastGroup, setgameToForecastGroup] = useState<Group>("GHANA")
  const [gameToForecast, setgameToForecast] = useState("Select")
  const [groupToSearch, setGroupToSearch] = useState<ThreeWeeksPayload["group"]>("ALL")
  const [gameToSearch, setGameToSearch] = useState<ThreeWeeksPayload["game"]>("ALL")
  const [pattern, setPattern] = useState<ThreeWeeksPatterns>("TwoPosOneAnyTwoCloseAny")
  const [numsOfweeksToAdd, setnumsOfWeeksToAdd] = useState("3")
  const dispatch = useAppDispatch()
  const { loading, error, gameEvents } = useAppSelector((state) => state.gameEvents)
  const events = gameEvents.slice(-3) as GameTypes[]
  const eventsToSend = events.map((event) => event[whereToExtractData])
  const { threeWeekDataValidator } = useValidators()
  const numsOfweeksApart = 3

  useEffect(() => {
    if (!gameToForecast || gameToForecast === "Select" || !numsOfweeksApart || !whereToExtractData) {
      return
    }
    dispatch(getGameEventsAsync({ game: gameToForecast as Games, weeksApart: numsOfweeksApart }))
  }, [gameToForecast, whereToExtractData])

  const payloadObj = (): ThreeWeeksPayload | ErrorObj => {
    const payload = {
      thirdToLastEvent: eventsToSend[0],
      secondToLastEvent: eventsToSend[1],
      lastEvent: eventsToSend[2],
      game: gameToSearch,
      group: groupToSearch,
      numOfWeeksToAdd: parseInt(numsOfweeksToAdd),
      pattern: pattern,
      gameToForecast: gameToForecast as Games,
    }

    const isValid = threeWeekDataValidator(payload)
    if (isValid?.err) {
      return isValid
    }
    return payload
  }

  const path = "games/Three_weeks/search"
  return (
    <>
      <>
        {loading && <LoadingIndicator />}
        <ErrorNotification error={error} />
      </>
      <div className={styles.filter}>
        <section className={styles.selectBoxies}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Game To Forecast</p>
          <div className={styles.selections}>
            <SelectBox title="Select Group" optionsList={groups as string[]} option={gameToForecastGroup} setSelectedOption={setgameToForecastGroup} />
            <SelectBox
              title="Select Game"
              option={gameToForecast}
              optionsList={gameToForecastGroup === "GHANA" ? (ghanas as string[]) : (premmiers as string[])}
              setSelectedOption={setgameToForecast}
            />
            <SelectBox title="Select Pattern" option={pattern} optionsList={threeWeeksPatterns as string[]} setSelectedOption={setPattern} />
          </div>
        </section>

        <section className={styles.selectBoxies}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Group To Search</p>
          <div className={styles.selections}>
            <SelectBox title="Select Group" optionsList={[...groups, "ALL"] as string[]} option={groupToSearch} setSelectedOption={setGroupToSearch} />
            <>
              {groupToSearch === "GHANA" && <SelectBox title="Select Game" option={gameToSearch} optionsList={[...ghanas, "ALL"] as string[]} setSelectedOption={setGameToSearch} />}
              {groupToSearch === "PREMMIER" && <SelectBox title="Select Game" option={gameToSearch} optionsList={[...premmiers, "ALL"] as string[]} setSelectedOption={setGameToSearch} />}
            </>
            <SelectBox title="Where To Extract" option={whereToExtractData} setSelectedOption={setWhereToExtractData} optionsList={whereToSearch} />
          </div>
        </section>
        <section className={styles.selectBoxies}>
          <div className={`${styles.selections} ${styles.weeksToAdd}`}>
            <SelectBox title="Weeks To Add" optionsList={weeksToAdd as number[]} option={parseInt(numsOfweeksToAdd)} setSelectedOption={setnumsOfWeeksToAdd} />
          </div>
        </section>
        <section>
          <LastThreeEvents />
        </section>
        <section>
          {eventsToSend.length > 2 && (
            <SendEvents path={path} payloadObj={payloadObj} setData={setData} data={data}>
              <div className={styles.eventsToSend}>
                {eventsToSend.map((event, index) => (
                  <StaticFiveBoxies key={index} event={event} />
                ))}
              </div>
            </SendEvents>
          )}
        </section>
      </div>
    </>
  )
}

export default ThreeWeeksFilter
