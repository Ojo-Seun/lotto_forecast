import React, { useState } from "react"
import EmailInput from "./components/EmailInput"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../utils/motionVariants"
import Button from "./components/Button"
import ErrorNotification from "../../components/error/ErrorNotification"
import useFetch from "../../hooks/useFetch"
import useValidators from "../../hooks/useValidators"
import Logo from "../../assets/eyeLogo.svg"
import InputErr from "./components/InputErr"
import Code from "./components/Code"
import PasswordInput from "./components/PasswordInput"
import { useAppDispatch } from "../../app/hooks"
import { showAlert } from "../../features/alert/alertSlice"
const path = "auth/reset-password"

const initialState = {
  loading: false,
  error: { err: false, message: "" },
  data: {
    success: false,
    message: "",
  },
}

const initialInputs = {
  email: "",
  code: "",
  password: "",
}

interface Data {
  success: boolean
  message: string
}
function ResetPassword() {
  const [inputs, setInputs] = useState(initialInputs)
  const [user, setUser] = useState(initialState)
  const [fetch] = useFetch<Data>({ operation: "post", payload: inputs, path, initailValue: initialState.data, setStatus: setUser })

  const [inputErr, setInputErr] = useState("")
  const navigate = useNavigate()
  const { resetPassValidator, regexValidator } = useValidators()
  const dispatch = useAppDispatch()

  const onBlur = (key: string, value: string, pattern: RegExp) => {
    const isValid = regexValidator(key, value, pattern)
    if (isValid?.err) {
      setInputErr(() => isValid.message)
    } else {
      setInputErr(() => "")
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = resetPassValidator(inputs)
    if (isValid?.err) {
      setInputErr(() => isValid.message)

      return
    }
    setInputErr(() => "")
    setUser((prev) => ({ ...prev, loading: true, data: initialState.data, error: initialState.error }))

    const option = {
      cb: (data: Data) => {
        if (data.success) {
          dispatch(showAlert(data.message))
          navigate("/auth/login", { replace: true })
        }
      },
    }
    fetch(option)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  return (
    <motion.div className={styles.container} variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
      <div id={styles.container}>
        <p id={styles.title}>Reset Password</p>
        <div id={styles.logo}>
          <img src={Logo} width={32} height={32} alt="Logo" />
        </div>
        <ErrorNotification error={user.error} />
        <>{inputErr && <InputErr message={inputErr} />}</>
        <form onSubmit={onSubmit} id={styles.form}>
          <EmailInput onBlur={onBlur} email={inputs.email} handleChange={onChange} />
          <Code placeholder="Enter New Verification Code" code={inputs.code} onBlur={onBlur} handleChange={onChange} />
          <PasswordInput password={inputs.password} text="New Password" handleChange={onChange} onBlur={onBlur} />
          <Button type="submit" loading={user.loading} />
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPassword
