import React from "react"
import styles from "../Auth.module.css"
import UserIcon from "../../../assets/UserIcon.png"

interface Props {
  code: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (key: string, value: string, pattern: RegExp) => void
  placeholder: string
}

function Code({ code, handleChange, onBlur, placeholder }: Props) {
  const handleOnBlur = () => {
    const codeFormat = /^[0-9]{6}$/
    onBlur("code", code, codeFormat)
  }
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="code">Code</label>
      <input onBlur={handleOnBlur} placeholder={placeholder} value={code} onFocus={(e) => (e.target.value = "")} onChange={handleChange} name="code" id="code" required />
      <img className={styles.inputIcons} width={25} height={20} src={UserIcon} alt="User Icon" />
    </div>
  )
}

export default Code
