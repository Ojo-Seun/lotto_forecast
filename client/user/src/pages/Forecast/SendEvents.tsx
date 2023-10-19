import { useState } from "react"
import styles from "./Forecast.module.css"
import LoadingIndicator from "../../components/utils/LodingIndicator"
import ErrorNotification from "../../components/error/ErrorNotification"
import { ResultType } from "../../utils/type"
import config from "../../app_config"
import useFetch from "../../hooks/useFetch"
import InputErr from "../Auth/components/InputErr"
const URL = config.get("BASE_URL")

const initialState = {
  loading: false,
  error: { err: false, message: "" },
  data: [] as Data,
}

type Data = ResultType[]
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
  payloadObj: () => any
  path: string
  setData: React.Dispatch<React.SetStateAction<State>>
  data: State
  children: React.ReactNode
}

function SendEvents({ payloadObj, path, data, setData, children }: Props) {
  const obj = payloadObj()
  const [fetch] = useFetch<Data>({ operation: "post", payload: obj, path, initailValue: initialState.data, setStatus: setData })
  const [inputErr, setInputErr] = useState("")

  const handleSubmit = () => {
    if (obj?.err) {
      setInputErr(() => obj.message)
      return
    }
    setInputErr(() => "")

    fetch()
  }
  return (
    <form className={styles.sendEvents}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Events To Send</p>
      <ErrorNotification error={data.error} />
      <>{inputErr && <InputErr message={inputErr} />}</>
      {children}
      <div id={styles.btn}>
        <button type="button" onClick={handleSubmit} id={styles.submit}>
          {data.loading ? <LoadingIndicator /> : null}
          Submit
        </button>
      </div>
    </form>
  )
}

export default SendEvents
