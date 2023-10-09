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

const gameEventsInitialState = {
  loading: false,
  error: { err: false, message: "" },
  gameEvents: defaultEvents as typeof defaultEvents | GameTypes[],
  targetEvents: [[0, 0, 0, 0, 0]],
}

interface Props {
  setData: React.Dispatch<React.SetStateAction<{ loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }>>
  data: { loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }
}

function TwoWeeksFilter({ data, setData }: Props) {
  const [gameToForecastGroup, setgameToForecastGroup] = useState<Group>("GHANA")
  const [gameToForecast, setgameToForecast] = useState("Select")
  const [operation, setOperation] = useState("MANUAL")
  const [groupToSearch, setGroupToSearch] = useState<TwoWeeksPayload["group"]>("ALL")
  const [gameToSearch, setGameToSearch] = useState<TwoWeeksPayload["game"]>("ALL")
  const [pattern, setPattern] = useState<TwoWeeksPatterns>("TwoPosTwoPos")
  const [numsOfweeksToAdd, setnumsOfWeeksToAdd] = useState("3")
  const [numsOfweeksApart, setnumsOfWeeksApart] = useState("1")
  const [whereToExtractData, setWhereToExtractData] = useState<WhereToSearch>("Winning")
  const dispatch = useAppDispatch()
  const { loading, error, targetEvents } = useAppSelector((state) => state.gameEvents)
  const eventsToSend = [...targetEvents].reverse().slice(-2) as WinningOrMachineEvent[]

  useEffect(() => {
    if (!gameToForecast || gameToForecast === "Select" || !numsOfweeksApart || !whereToExtractData) {
      return
    }
    dispatch(getGameEventsAsync({ game: gameToForecast as Games, weeksApart: parseInt(numsOfweeksApart), whereToExtractData }))
  }, [gameToForecast, numsOfweeksApart, whereToExtractData])

  const payloadObj = (): TwoWeeksPayload => {
    return {
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
          {eventsToSend.length > 1 && <SendEvents eventsToSend={eventsToSend as WinningOrMachineEvent[]} numOfResultsToUse={2} path={path} payloadObj={payloadObj} setData={setData} data={data} />}
        </section>
      </div>
    </>
  )
}

export default TwoWeeksFilter
