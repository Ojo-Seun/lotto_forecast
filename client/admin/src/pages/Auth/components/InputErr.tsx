import React from "react"
import styles from "../Auth.module.css"

interface Props {
  message: string
}

function InputErr({ message }: Props) {
  return <pre className={styles.inputErr}>{message}</pre>
}

export default InputErr
