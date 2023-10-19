import React, { useState } from "react"
import EmailInput from "./components/EmailInput"
import PasswordInput from "./components/PasswordInput"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../utils/motionVariants"
import Button from "./components/Button"
import ErrorNotification from "../../components/error/ErrorNotification"
import useFetch from "../../hooks/useFetch"
import { useAppDispatch } from "../../app/hooks"
import useValidators from "../../hooks/useValidators"
import Logo from "../../assets/eyeLogo.svg"
import { login } from "../../features/user/userSlice"
import InputErr from "./components/InputErr"
import { Role } from "../../utils/type"
const path = "auth/login"

const userInitialData = {
  loading: false,
  error: { err: false, message: "" },
  data: {
    name: "",
    email: "",
    sub: "",
    roles: [] as Role[],
    access_token: "",
  },
}

const initialInputs = {
  email: "",
  password: "",
}

interface Data {
  name: string
  email: string
  sub: string
  roles: Role[]
  access_token: string
}

function Login() {
  const [inputs, setInputs] = useState(initialInputs)
  const [user, setUser] = useState(userInitialData)
  const [fetch] = useFetch<Data>({ operation: "post", payload: inputs, path, initailValue: userInitialData.data, setStatus: setUser })
  const [inputErr, setInputErr] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loginInputsValidator, regexValidator } = useValidators()

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

    const isValid = loginInputsValidator(inputs)
    if (isValid?.err) {
      setInputErr(() => isValid.message)

      return
    } else {
      setInputErr(() => "")
    }
    const option = {
      cb: (data: Data) => {
        if (data.access_token) {
          dispatch(login(data))
          navigate("/", { replace: true })
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
        <p id={styles.title}>Login</p>
        <div id={styles.logo}>
          <img src={Logo} width={32} height={32} alt="Logo" />
        </div>
        <ErrorNotification error={user.error} />
        <>{inputErr && <InputErr message={inputErr} />}</>
        <form onSubmit={onSubmit} id={styles.form}>
          <EmailInput onBlur={onBlur} email={inputs.email} handleChange={onChange} />
          <PasswordInput onBlur={onBlur} text="Password" password={inputs.password} handleChange={onChange} />
          <div>
            No account?{" "}
            <button type="button" onClick={() => navigate("/auth/register")}>
              Register
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

export default Login
