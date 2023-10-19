import React, { useState, useReducer } from "react"
import { AnimatePresence, motion, AnimationProps } from "framer-motion"
import styles from "../utils/ten-boxies-nums/Boxies.module.css"
import DynamicBoxies from "../utils/ten-boxies-nums/DynamicBoxies"
import { OperationsReturnValues, initialState, operationsReducer } from "./reducers/operations.reducer"
import { GameTypes, Games, Group, InsertOne, WinningOrMachineEvent } from "../../utils/types"
import LoadingIndicator from "../utils/LodingIndicator"
import useValidator from "../../hooks/useValidator"
import axios from "axios"
import ErrorNotification from "../error/ErrorNotification"
import useToken from "../../hooks/useToken"

const Variant: AnimationProps["variants"] = {
  hidden: { opacity: 0, y: 20 },
  onView: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  exit: { opacity: 0, y: 20 },
}

interface Props {
  setOperationReturnData: React.Dispatch<React.SetStateAction<{ data: OperationsReturnValues }>>
  game: Games
  group: Group
  nextIndex: number
  lastEvent: GameTypes
}

const initialInputs = {
  W0: 0,
  W1: 0,
  W2: 0,
  W3: 0,
  W4: 0,
  M0: 0,
  M1: 0,
  M2: 0,
  M3: 0,
  M4: 0,
}

const sum = (arr: number[]) => {
  return arr.reduce((prev, curr) => prev + curr, 0)
}

function InsertOneOperation({ setOperationReturnData, game, group, nextIndex, lastEvent }: Props) {
  const [inputs, setInputs] = useState(initialInputs)
  const { validatEventeNum, insertOneInputsFromParentValidator, dataEventValidator } = useValidator()
  const [state, dispatch] = useReducer(operationsReducer, initialState)
  const { isvalidToken } = useToken()
  const user = isvalidToken()
  const access_token = user ? user.access_token : ""
  const { error, loading } = state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = parseInt(e.target.value)
    const isValidValue = validatEventeNum(value)
    if (!isValidValue) {
      dispatch({ type: "ERROR", payload: { err: true, message: "values must be 1 - 90" } })
      return
    }
    dispatch({ type: "ERROR", payload: { err: false, message: "" } })
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleInsertOneOperaion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "LOADING", payload: true })
    const validateInputsFromParent = insertOneInputsFromParentValidator(game, group, nextIndex, lastEvent)
    if (validateInputsFromParent?.err) {
      dispatch({ type: "ERROR", payload: validateInputsFromParent })
      return
    }

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const { W0, W1, W2, W3, W4, M0, M1, M2, M3, M4 } = inputs
    const Winning = [W0, W1, W2, W3, W4] as WinningOrMachineEvent
    const Machine = [M0, M1, M2, M3, M4] as WinningOrMachineEvent
    const event: GameTypes = {
      Index: nextIndex,
      Name: game,
      Winning,
      Machine,
      Category: group,
      Year: year,
      Date: `${day}/${month}/${year}`,
      WT: sum(Winning),
      MT: sum(Machine),
      Ev: lastEvent.Ev + 1,
    }
    const isValidEvent = dataEventValidator(event)
    if (isValidEvent?.err) {
      dispatch({ type: "ERROR", payload: isValidEvent })

      return
    }
    dispatch({ type: "ERROR", payload: { err: false, message: "" } })

    const data: InsertOne = {
      game,
      payload: event,
    }

    const fetch = () => {
      axios
        .patch("http://localhost:8000/api/games/data/insert_one", { payload: data }, { headers: { Authorization: `Bearer ${access_token}` } })
        .then((res) => {
          console.log(res.data)
          if (res.data?.previousEntries) {
            const data = res.data
            dispatch({ type: "DATA", payload: data })
            setOperationReturnData(() => ({ data }))
          }
        })
        .catch((err) => {
          console.log(err)
          dispatch({ type: "ERROR", payload: err.response })
        })
        .finally(() => {
          dispatch({ type: "LOADING", payload: false })
        })
    }
    fetch()
  }
  return (
    <AnimatePresence key={"update-event"}>
      <motion.div className={styles.insertOne} variants={Variant} whileInView={"onView"} initial={"hidden"} exit={"exit"}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", marginTop: "1em" }}>Insert Last Event</h2>
        <ErrorNotification error={error} />
        <div className={styles.eventWrapper}>
          <div className={styles.sideNames}>
            <span>Winning</span>
            <span>Machine</span>
          </div>
          <form className={styles.form} onSubmit={handleInsertOneOperaion}>
            <DynamicBoxies inputs={inputs} handleChange={handleChange} />
            <div className={styles.btn}>
              <button type="submit" id={styles.submit}>
                {loading && !error?.err ? <LoadingIndicator /> : null}
                Submit
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default InsertOneOperation
