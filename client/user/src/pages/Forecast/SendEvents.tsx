import { useState } from "react"
import DynamicBoxies from "../../components/utils/ten-boxies-nums/DynamicBoxies"
import styles from "./Forecast.module.css"
import LoadingIndicator from "../../components/utils/LodingIndicator"
import useValidators from "../../hooks/useValidators"
import ErrorNotification from "../../components/error/ErrorNotification"
import { QueryTypes, ThreeWeeksPayload, TwoWeeksPayload, WinningOrMachineEvent, ResultType } from "../../utils/type"
import config from "../../app_config"
import axios from "axios"
import { useAppSelector } from "../../app/hooks"
import StaticFiveBoxies from "../../components/utils/ten-boxies-nums/StaticFiveBoxies"
const URL = config.get("BASE_URL")

const initailInputs = {
  box0: 0,
  box1: 0,
  box2: 0,
  box3: 0,
  box4: 0,
}

const dataInitialState = {
  loading: false,
  error: { err: false, message: "" },
  data: [] as ResultType[],
}

interface Props {
  payloadObj: () => TwoWeeksPayload | ThreeWeeksPayload
  path: string
  numOfResultsToUse: 2 | 3
  setData: React.Dispatch<React.SetStateAction<{ loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }>>
  data: { loading: boolean; error: { err: boolean; message: string }; data: ResultType[] }
  eventsToSend: WinningOrMachineEvent[]
}

function SendEvents({ payloadObj, path, numOfResultsToUse, data, setData, eventsToSend }: Props) {
  const { twoWeekDataValidator, threeWeekDataValidator } = useValidators()

  const handleSubmit = () => {
    setData((prev) => ({ ...prev, loading: true, error: dataInitialState.error }))

    const payload: QueryTypes = payloadObj()
    let isValid: any

    if (numOfResultsToUse === 3) {
      isValid = threeWeekDataValidator(payload as ThreeWeeksPayload)
    } else {
      isValid = twoWeekDataValidator(payload as TwoWeeksPayload)
    }

    if (isValid?.err) {
      setData((prev) => ({ ...prev, loading: false, error: isValid }))
      console.log(isValid, payload)
      return
    }

    const sendQueries = () => {
      axios
        .post(`${URL}/${path}`, { payload })
        .then((res) => {
          const response: ResultType[] = res.data?.length > 0 ? res.data : []
          console.log(response)
          setData((prev) => ({ ...prev, data: response }))
        })
        .catch((err) => {
          const ERROR = err.response?.data?.message || err?.message
          console.log(err)
          setData((prev) => ({ ...prev, error: { err: true, message: ERROR } }))
        })
        .finally(() => {
          setData((prev) => ({ ...prev, loading: false }))
        })
    }

    sendQueries()
  }
  return (
    <div>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Events To Send</p>
      <ErrorNotification error={data.error} />
      <div className={styles.eventsToSend}>
        {eventsToSend.map((event, index) => (
          <StaticFiveBoxies key={index} event={event} />
        ))}
      </div>
      <div id={styles.btn}>
        <button type="button" onClick={handleSubmit} id={styles.submit}>
          {data.loading ? <LoadingIndicator /> : null}
          Submit
        </button>
      </div>
    </div>
  )
}

export default SendEvents
