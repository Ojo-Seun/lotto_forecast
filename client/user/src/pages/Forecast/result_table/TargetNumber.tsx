import { memo } from "react"
import { useAppSelector } from "../../../app/hooks"
import { GameTypes, WhereToSearch, WinningOrMachineEvent } from "../../../utils/type"
import styles from "./Table.module.css"

type Events = GameTypes[]

function getTargetEvents(events: GameTypes[], whereToExtractData: WhereToSearch) {
  let targetEvents = events.map((event) => event[whereToExtractData])
  return (targetEvents = targetEvents.reverse())
}

const styleTargetNums = (targetEvent: GameTypes, targetNum: number, events: Events, where: WhereToSearch, whereToExtractData?: WhereToSearch) => {
  const { weeksApart, searchedIn } = targetEvent
  const _searchedIn = searchedIn === "Both" ? where : searchedIn
  const _whereToExtractData = whereToExtractData ? whereToExtractData : where

  const targetEvents = getTargetEvents(events, _whereToExtractData as WhereToSearch)
  if (_searchedIn !== where) return false
  const eventInPosition = targetEvents[weeksApart!]
  const isTargetNum = eventInPosition?.includes(targetNum)
  return isTargetNum
}

interface Props {
  targetNum: number
  targetEvent: GameTypes
  where: WhereToSearch
  whereToExtractData?: WhereToSearch
}

function TargetNumber({ targetEvent, targetNum, where, whereToExtractData }: Props) {
  const events = useAppSelector((state) => state.gameEvents.gameEvents)
  const isTargetNum = styleTargetNums(targetEvent, targetNum, events as Events, where, whereToExtractData)

  return <>{isTargetNum ? <td className={`${styles.targetNum} ${styles.eventData}`}>{targetNum}</td> : <td className={styles.eventData}>{targetNum}</td>}</>
}

export default TargetNumber
