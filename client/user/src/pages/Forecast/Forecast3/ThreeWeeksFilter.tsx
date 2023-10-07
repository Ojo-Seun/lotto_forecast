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

interface Props {
  setData: React.Dispatch<React.SetStateAction<{ loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }>>
  data: { loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }
}

function ThreeWeeksFilter({ data, setData }: Props) {
  const [gameToForecastGroup, setgameToForecastGroup] = useState<Group>("GHANA")
  const [gameToForecast, setgameToForecast] = useState("Select")
  const [groupToSearch, setGroupToSearch] = useState<ThreeWeeksPayload["group"]>("ALL")
  const [gameToSearch, setGameToSearch] = useState<ThreeWeeksPayload["game"]>("ALL")
  const [pattern, setPattern] = useState<ThreeWeeksPatterns>("TwoCloseOneTwoCloseAny")
  const [numsOfweeksToAdd, setnumsOfWeeksToAdd] = useState("3")
  const [whereToExtractData, setWhereToExtractData] = useState<WhereToSearch>("Winning")
  const dispatch = useAppDispatch()
  const { loading, error, targetEvents } = useAppSelector((state) => state.gameEvents)
  const eventsToSend = [...targetEvents].reverse().slice(-3) as WinningOrMachineEvent[]
  const numsOfweeksApart = 3

  useEffect(() => {
    if (!gameToForecast || gameToForecast === "Select" || !numsOfweeksApart || !whereToExtractData) {
      return
    }
    dispatch(getGameEventsAsync({ game: gameToForecast as Games, weeksApart: numsOfweeksApart, whereToExtractData }))
  }, [gameToForecast, whereToExtractData])

  const payloadObj = (): ThreeWeeksPayload => {
    return {
      thirdToLastEvent: eventsToSend[0],
      secondToLastEvent: eventsToSend[1],
      lastEvent: eventsToSend[2],
      game: gameToSearch,
      group: groupToSearch,
      numOfWeeksToAdd: parseInt(numsOfweeksToAdd),
      pattern: pattern,
      gameToForecast: gameToForecast as Games,
    }
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
        <section>{eventsToSend.length > 2 && <SendEvents eventsToSend={eventsToSend} numOfResultsToUse={3} path={path} payloadObj={payloadObj} setData={setData} data={data} />}</section>
      </div>
    </>
  )
}

export default ThreeWeeksFilter
