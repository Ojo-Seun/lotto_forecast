import React from "react"
import styles from "../Auth.module.css"
import { CreateUser, Login } from "../../../utils/type"
import { motion } from "framer-motion"
import EmailIcon from "../../../assets/EmailIcon.png"

const Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
}

interface Props {
  email: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (key: string, value: string, pattern: RegExp) => void
}

function EmailInput({ email, handleChange, onBlur }: Props) {
  const handleOnBlur = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    onBlur("email", email, emailFormat)
  }
  return (
    <motion.div variants={Variants} initial="initial" animate="animate" className={styles.inputWrapper}>
      <label htmlFor="email">Email</label>
      <input onBlur={handleOnBlur} placeholder="Enter Your Email" onFocus={(e) => (e.target.value = "")} value={email} onChange={handleChange} name="email" type={"email"} id="email" required />
      <img className={styles.inputIcons} width={20} height={20} src={EmailIcon} alt="Email Icon" />
    </motion.div>
  )
}

export default EmailInput
