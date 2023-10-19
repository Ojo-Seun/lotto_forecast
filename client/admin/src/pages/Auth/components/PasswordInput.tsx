import React, { useState } from "react"
import styles from "../Auth.module.css"
import { CreateUser, Login } from "../../../utils/type"
import ClosePassIcon from "../../../assets/ClosePassIcon.png"
import OpenPassIcon from "../../../assets/OpenPassIcon.png"
import { motion } from "framer-motion"
import InputErr from "./InputErr"

const Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
}

interface Props {
  password: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  text: string
  onBlur: (key: string, value: string, pattern: RegExp) => void
}

function PasswordInput({ password, handleChange, text, onBlur }: Props) {
  const [showPass, setShowPass] = useState(false)

  const handleOnBlur = () => {
    const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
    onBlur("password", password, passFormat)
  }
  return (
    <>
      <motion.div variants={Variants} initial="initial" animate="animate" className={styles.inputWrapper}>
        <label htmlFor="password">{text}</label>
        <input
          onBlur={handleOnBlur}
          maxLength={30}
          placeholder="Enter Your Password"
          name="password"
          onFocus={(e) => (e.target.value = "")}
          value={password}
          onChange={handleChange}
          type={showPass ? "text" : "password"}
          id="password"
          required
          minLength={8}
        />
        <img className={styles.inputIcons} onClick={() => setShowPass((prev) => !prev)} width={25} height={20} src={showPass ? ClosePassIcon : OpenPassIcon} alt="Password Icon" />
      </motion.div>
    </>
  )
}

export default PasswordInput
