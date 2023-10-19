import React, { useEffect, useState } from "react"
import styles from "../Forecast.module.css"
import SelectBox from "../../../components/utils/select-box/SelectBox"
import { groups, ghanas, premmiers, oneWeekPatterns, weeksApart, weeksToAdd } from "../../../utils/repo"
import LastThreeEvents from "../LastThreeEvents"
import { Games, Group, ResultType, OneWeekPatterns, OneWeekPayload, GameTypes } from "../../../utils/type"
import LoadingIndicator from "../../../components/utils/LodingIndicator"
import ErrorNotification from "../../../components/error/ErrorNotification"
import SendEvents from "../SendEvents"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getGameEventsAsync } from "../../../features/getEvents/getEventsSlice"
import useValidators from "../../../hooks/useValidators"
import StaticBoxies from "../../../components/utils/ten-boxies-nums/StaticBoxies"
import useFetch from "../../../hooks/useFetch"
const path = "games/one-week/search"
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

function OneWeekFilter({ data, setData }: Props) {
  const [gameToForecastGroup, setgameToForecastGroup] = useState<Group>("GHANA")
  const [gameToForecast, setgameToForecast] = useState("Select")
  const [groupToSearch, setGroupToSearch] = useState<OneWeekPayload["group"]>("ALL")
  const [gameToSearch, setGameToSearch] = useState<OneWeekPayload["game"]>("ALL")
  const [pattern, setPattern] = useState<OneWeekPatterns>("TwoWinTwoMac")
  const [numsOfweeksToAdd, setnumsOfWeeksToAdd] = useState("3")
  const { oneWeekDataValidator } = useValidators()
  const dispatch = useAppDispatch()
  const { loading, error, gameEvents } = useAppSelector((state) => state.gameEvents)
  const eventsToSend = gameEvents.slice(-1) as GameTypes[]

  useEffect(() => {
    if (!gameToForecast || gameToForecast === "Select") {
      return
    }
    dispatch(getGameEventsAsync({ game: gameToForecast as Games, weeksApart: 3 }))
  }, [gameToForecast])

  const payloadObj = (): OneWeekPayload | ErrorObj => {
    const payload = {
      lastEvent: { Winning: eventsToSend[0]["Winning"], Machine: eventsToSend[0]["Machine"] },
      game: gameToSearch,
      group: groupToSearch,
      numOfWeeksToAdd: parseInt(numsOfweeksToAdd),
      pattern: pattern,
      gameToForecast: gameToForecast as Games,
    }

    const isValid = oneWeekDataValidator(payload)
    if (isValid?.err) {
      return isValid
    }
    return payload
  }

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
            <SelectBox title="Select Pattern" option={pattern} optionsList={oneWeekPatterns as string[]} setSelectedOption={setPattern} />
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
            <SelectBox title="Weeks To Add" optionsList={weeksToAdd as number[]} option={parseInt(numsOfweeksToAdd)} setSelectedOption={setnumsOfWeeksToAdd} />
          </div>
        </section>

        <section>
          <LastThreeEvents />
        </section>
        <section>
          {eventsToSend.length > 0 && (
            <SendEvents path={path} payloadObj={payloadObj} setData={setData} data={data}>
              {
                <div className={styles.lastEvent}>
                  <StaticBoxies event={eventsToSend[0]} />
                </div>
              }
            </SendEvents>
          )}
        </section>
      </div>
    </>
  )
}

export default OneWeekFilter
