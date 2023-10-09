import React from "react"
import { GameTypes } from "../../utils/type"
import styles from "./Chart.module.css"

interface Props {
  event: GameTypes
}

function TableRow({ event }: Props) {
  const { Ev, Date, WT, Winning, Machine, MT, _id } = event
  let date: any = Date.split("/")
  date.splice(2)
  date = date.join("/")
  return (
    <tr className={styles.tableRows}>
      <td className={styles.bold}>{Ev}</td>
      <td>{date}</td>
      <td className={styles.box}>{Winning[0]}</td>
      <td className={styles.box}>{Winning[1]}</td>
      <td className={styles.box}>{Winning[2]}</td>
      <td className={styles.box}>{Winning[3]}</td>
      <td className={styles.box}>{Winning[4]}</td>
      <td className={`${styles.bold} ${styles.boundary}`}>{WT}</td>
      <td className={styles.box}>{Machine[0]}</td>
      <td className={styles.box}>{Machine[1]}</td>
      <td className={styles.box}>{Machine[2]}</td>
      <td className={styles.box}>{Machine[3]}</td>
      <td className={styles.box}>{Machine[4]}</td>
      <td className={styles.bold}>{MT}</td>
    </tr>
  )
}

export default TableRow
