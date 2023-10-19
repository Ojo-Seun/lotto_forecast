import React, { useEffect, useState } from "react"
import styles from "../Forecast.module.css"
import SelectBox from "../../../components/utils/select-box/SelectBox"
import { groups, ghanas, premmiers, twoWeeksPatterns, twoWeeksOperations, weeksApart, weeksToAdd, defaultEvents, whereToSearch } from "../../../utils/repo"
import LastThreeEvents from "../LastThreeEvents"
import { GameTypes, Games, Group, ResultType, TwoWeeksPatterns, TwoWeeksPayload, WhereToSearch, WinningOrMachineEvent } from "../../../utils/type"
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
  setWhereToExtractData: React.Dispatch<React.SetStateAction<WhereToSearch>>
  whereToExtractData: WhereToSearch
}

function TwoWeeksFilter({ data, setData, whereToExtractData, setWhereToExtractData }: Props) {
  const [gameToForecastGroup, setgameToForecastGroup] = useState<Group>("GHANA")
  const [gameToForecast, setgameToForecast] = useState("Select")
  const [operation, setOperation] = useState("MANUAL")
  const [groupToSearch, setGroupToSearch] = useState<TwoWeeksPayload["group"]>("ALL")
  const [gameToSearch, setGameToSearch] = useState<TwoWeeksPayload["game"]>("ALL")
  const [pattern, setPattern] = useState<TwoWeeksPatterns>("TwoPosTwoPos")
  const [numsOfweeksToAdd, setnumsOfWeeksToAdd] = useState("3")
  const [numsOfweeksApart, setnumsOfWeeksApart] = useState("1")

  const { twoWeekDataValidator } = useValidators()
  const dispatch = useAppDispatch()
  const { loading, error, gameEvents } = useAppSelector((state) => state.gameEvents)
  const events = gameEvents.slice(-2) as GameTypes[]
  const eventsToSend = events.map((event) => event[whereToExtractData])

  useEffect(() => {
    if (!gameToForecast || gameToForecast === "Select" || !numsOfweeksApart || !whereToExtractData) {
      return
    }
    dispatch(getGameEventsAsync({ game: gameToForecast as Games, weeksApart: parseInt(numsOfweeksApart) }))
  }, [gameToForecast, numsOfweeksApart, whereToExtractData])

  const payloadObj = (): TwoWeeksPayload | ErrorObj => {
    const payload = {
      secondToLastEvent: eventsToSend[0],
      lastEvent: eventsToSend[1],
      game: gameToSearch,
      group: groupToSearch,
      numOfWeeksToAdd: parseInt(numsOfweeksToAdd),
      pattern: pattern,
      weeksApart: parseInt(numsOfweeksApart),
      whereToExtract: whereToExtractData,
      gameToForecast: gameToForecast as Games,
    }

    const isValid = twoWeekDataValidator(payload)
    if (isValid?.err) {
      return isValid
    }
    return payload
  }

  const path = operation === "MANUAL" ? "games/two_weeks/manual-search" : "games/two_weeks/auto-search"
  return (
    <>
      <>
        <>{loading && <LoadingIndicator />}</>
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
            <SelectBox title="Select Operation" option={operation} optionsList={twoWeeksOperations as string[]} setSelectedOption={setOperation} />
          </div>
        </section>
        <section className={styles.selectBoxies}>
          <div className={styles.selections}>
            <SelectBox title="Weeks To Add" optionsList={weeksToAdd as number[]} option={parseInt(numsOfweeksToAdd)} setSelectedOption={setnumsOfWeeksToAdd} />

            <SelectBox title="Select Pattern" option={pattern} optionsList={twoWeeksPatterns as string[]} setSelectedOption={setPattern} />

            <SelectBox title="Weeks Apart" option={parseInt(numsOfweeksApart)} optionsList={weeksApart as number[]} setSelectedOption={setnumsOfWeeksApart} />
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

        <section>
          <LastThreeEvents />
        </section>
        <section>
          {eventsToSend.length > 1 && (
            <SendEvents path={path} payloadObj={payloadObj} setData={setData} data={data}>
              {
                <div className={styles.eventsToSend}>
                  {eventsToSend.map((event, index) => (
                    <StaticFiveBoxies key={index} event={event} />
                  ))}
                </div>
              }
            </SendEvents>
          )}
        </section>
      </div>
    </>
  )
}

export default TwoWeeksFilter
