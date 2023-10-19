import React from "react"
import styles from "../Auth.module.css"
import UserIcon from "../../../assets/UserIcon.png"

interface Props {
  name: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (key: string, value: string, pattern: RegExp) => void
}

function Text({ name, handleChange, onBlur }: Props) {
  const handleOnBlur = () => {
    const nameFormat = /^[A-Za-z]{3,30}(\s[A-Za-z]{3,30})?$/
    onBlur("name", name, nameFormat)
  }
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="name">Name</label>
      <input onBlur={handleOnBlur} placeholder="Enter Your Name" value={name} onFocus={(e) => (e.target.value = "")} onChange={handleChange} name="name" id="name" required />
      <img className={styles.inputIcons} width={25} height={20} src={UserIcon} alt="User Icon" />
    </div>
  )
}

export default Text
