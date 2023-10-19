import React, { useState } from "react"
import { CreateUser } from "../../../utils/types"
import styles from "../Auth.module.css"
import useFetch from "../../../hooks/useFetch"
import ErrorNotification from "../../../components/error/ErrorNotification"
import LoadingIndicator from "../../../components/utils/LodingIndicator"
import InputErr from "./InputErr"
import useValidator from "../../../hooks/useValidator"
import useStore from "../../../hooks/useStore"

interface Props {
  inputs: CreateUser
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (key: string, value: string, pattern: RegExp) => void
}

const initialState = {
  loading: false,
  error: { err: false, message: "" },
  data: {
    success: false,
    message: "",
  },
}

interface Data {
  success: boolean
  message: string
}
const path = "auth/send-registration-code"
function SendRegCode({ inputs, handleChange, onBlur }: Props) {
  const { name, email, code } = inputs
  const [status, setStatus] = useState(initialState)
  const [inputErr, setInputErr] = useState("")
  const { sendMailInputsValidator } = useValidator()
  const [fetch] = useFetch<Data>({ operation: "post", payload: inputs, path, initailValue: initialState.data, setStatus })

  const { dispatch } = useStore()

  const handleOnBlur = () => {
    const codeFormat = /^[0-9]{6}$/
    onBlur("code", inputs.code, codeFormat)
  }

  const sendCode = () => {
    const isValid = sendMailInputsValidator({ name, email })
    if (isValid?.err) {
      setInputErr(() => isValid.message)
      return
    } else {
      setInputErr(() => "")
    }

    const option = {
      cb: (data: Data) => {
        if (data.success) {
          dispatch({ type: "SHOW_ALERT", payload: data.message })
        }
      },
    }

    fetch(option)
  }
  return (
    <>
      {status.loading && <LoadingIndicator />}
      <ErrorNotification error={status.error} />
      <>{inputErr && <InputErr message={inputErr} />}</>
      <div className={styles.inputWrapper}>
        <label htmlFor="code">Code</label>
        <input
          onBlur={handleOnBlur}
          placeholder="Enter Verification  Code"
          onFocus={(e) => (e.target.value = "")}
          pattern="[0-9]{6}"
          value={code}
          onChange={handleChange}
          name="code"
          id="code"
          required
        />
        <button type="button" id={styles.sendCode} onClick={sendCode}>
          Send Code
        </button>
      </div>
    </>
  )
}

export default SendRegCode
