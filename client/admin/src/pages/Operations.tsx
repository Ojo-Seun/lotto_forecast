import { useEffect, useState } from "react"
import InsertManyOperation from "../components/operations/InsertManyOperation"
import styles from ".././components/operations/Operations.module.css"
import { ghanas, groups, operations, premmiers } from "../utils/util"
import SelectBox from "../components/utils/select-box/SelectBox"
import { GameDetails, GameTypes, Games, Group, Operation } from "../utils/types"
import LastTwoEvents from "../components/utils/ten-boxies-nums/LastTwoEvents"
import AfterUpdateBoard from "../components/utils/game-details-board/AfterUpdateBoard"
import axios from "axios"
import { gameDetailsInitialData } from "../utils/util"
import { initialState } from "../components/operations/reducers/operations.reducer"
import InsertOneOperation from "../components/operations/InsertOneOperation"
import config from "../app-config"
import LoadingIndicator from "../components/utils/LodingIndicator"
import ErrorNotification from "../components/error/ErrorNotification"
import useHead from "../hooks/useHead"
import { motion } from "framer-motion"
import { RoutesVariants } from "./routesVariants"
import useStore from "../hooks/useStore"

const gameDetailsInitialState = {
  loading: false,
  error: { err: false, message: "" },
  data: gameDetailsInitialData,
}

function Operations() {
  useHead({ title: "Operations", descriptions: "Lotto Lens Admin Operations" })
  const [gameDetails, setGameDetails] = useState(gameDetailsInitialState)
  const [group, setGroup] = useState("GHANA")
  const [game, setGame] = useState("Select")
  const [operation, setOperation] = useState<Operation>("Insert Many")
  const [operationReturnData, setOperationReturnData] = useState({ data: initialState.data })
  const URL = config.get("BASE_URL")
  const { state } = useStore()
  const { access_token } = state.user

  useEffect(() => {
    if (!game || game === "Select") return
    console.log({ game })
    const payload = {
      game,
    }
    setGameDetails((prev) => ({ ...prev, loading: true, error: gameDetailsInitialState.error }))
    axios
      .post(`${URL}/games/data`, { payload }, { headers: { Authorization: `Bearer ${access_token}` } })
      .then((res) => {
        if (res.data?.last2Events?.length > 0) {
          const data: GameDetails = res.data
          setGameDetails((prev) => ({ ...prev, data: data }))
        } else {
          // Replace data from previous game with initial state data
          setGameDetails((prev) => ({ ...prev, data: gameDetailsInitialState.data }))
          setOperationReturnData(() => ({ data: initialState.data }))
        }
      })
      .catch((err) => {
        const ERROR = err.response?.data?.message || err?.message
        setGameDetails((prev) => ({ ...prev, error: { err: true, message: ERROR } }))
      })
      .finally(() => {
        setGameDetails((prev) => ({ ...prev, loading: false }))
      })
  }, [game, URL, access_token])
  const { lastIndex, nextIndex, last2Events } = gameDetails.data
  const { data } = operationReturnData
  const title = operation === "Insert Many" ? "Insert Many Events" : "Insert One Event"
  return (
    <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={RoutesVariants} className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <>{gameDetails?.loading && <LoadingIndicator />}</>
      <ErrorNotification error={gameDetails.error} />
      <div className={styles.operations}>
        <div className={styles.select}>
          <SelectBox setSelectedOption={setGroup} option={group} title="Select Group" optionsList={groups as string[]} />
          <SelectBox title="Select Game" option={game} setSelectedOption={setGame} optionsList={group === "PREMMIER" ? (premmiers as string[]) : (ghanas as string[])} />
          <SelectBox title="Select Operation" option={operation} optionsList={operations} setSelectedOption={setOperation} />
        </div>
        <LastTwoEvents events={last2Events} />
        <AfterUpdateBoard previousEntries={data.previousEntries} newEntries={data.newEntries} lastIndex={lastIndex} nextIndex={nextIndex} />
        <>
          {operation === "Insert Many" ? (
            <InsertManyOperation setOperationReturnData={setOperationReturnData} game={game as Games} group={group as Group} />
          ) : (
            <InsertOneOperation lastEvent={last2Events[1] as GameTypes} nextIndex={nextIndex} setOperationReturnData={setOperationReturnData} game={game as Games} group={group as Group} />
          )}
        </>
      </div>
    </motion.div>
  )
}

export default Operations
