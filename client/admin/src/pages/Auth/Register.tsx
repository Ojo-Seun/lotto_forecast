import React, { useState } from "react"
import EmailInput from "./components/EmailInput"
import PasswordInput from "./components/PasswordInput"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../pages/routesVariants"
import Button from "./components/Button"
import ErrorNotification from "../../components/error/ErrorNotification"
import useFetch from "../../hooks/useFetch"
import useValidator from "../../hooks/useValidator"
import Logo from "../../assets/eyeLogo.svg"
import SendRegCode from "./components/SendRegCode"
import Text from "./components/Text"
import InputErr from "./components/InputErr"
import { Roles } from "../../utils/types"
import useStore from "../../hooks/useStore"

const path = "auth/register-user"

const userInitialData = {
  loading: false,
  error: { err: false, message: "" },
  data: {
    name: "",
    email: "",
    sub: "",
    roles: [] as Roles,
    access_token: "",
  },
}

const initialInputs = {
  name: "",
  email: "",
  password: "",
  code: "",
}

interface Data {
  name: string
  email: string
  sub: string
  roles: Roles
  access_token: string
}

function Register() {
  const [inputs, setInputs] = useState(initialInputs)
  const [user, setUser] = useState(userInitialData)
  const [fetch] = useFetch<Data>({ operation: "post", payload: inputs, path, initailValue: userInitialData.data, setStatus: setUser })

  const { dispatch } = useStore()
  const { registerInputsValidator, regexValidator } = useValidator()
  const [inputErr, setInputErr] = useState("")
  const navigate = useNavigate()

  const onBlur = (key: string, value: string, pattern: RegExp) => {
    const isValid = regexValidator(key, value, pattern)
    if (isValid?.err) {
      setInputErr(() => isValid.message)
    } else {
      setInputErr(() => "")
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = registerInputsValidator(inputs)
    if (isValid?.err) {
      setInputErr(() => isValid.message)

      return
    } else {
      setInputErr(() => "")
    }

    const option = {
      cb: (data: Data) => {
        if (data.access_token) {
          dispatch({ type: "LOGIN", payload: data })
          navigate("/", { replace: true })
        }
      },
    }

    fetch(option)
  }

  return (
    <motion.div className={styles.container} variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
      <div id={styles.container}>
        <p id={styles.title}>Register</p>
        <div id={styles.logo}>
          <img src={Logo} width={32} height={32} alt="Logo" />
        </div>
        <ErrorNotification error={user.error} />
        <>{inputErr && <InputErr message={inputErr} />}</>
        <form onSubmit={onSubmit} id={styles.form}>
          <Text onBlur={onBlur} name={inputs.name} handleChange={onChange} />
          <EmailInput onBlur={onBlur} email={inputs.email} handleChange={onChange} />
          <PasswordInput text="Password" onBlur={onBlur} password={inputs.password} handleChange={onChange} />
          <SendRegCode onBlur={onBlur} inputs={inputs} handleChange={onChange} />
          <div>
            Have account?{" "}
            <button type="button" onClick={() => navigate("/auth/login")}>
              Login
            </button>
          </div>
          <Button type="submit" loading={user.loading} />
        </form>
        <div style={{ textAlign: "center", marginBottom: "2em" }}>
          <button onClick={() => navigate("/auth/send-password-reset-code")} type="button">
            Forget password?
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Register
