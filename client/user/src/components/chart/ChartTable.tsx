import React from "react"
import styles from "./Chart.module.css"
import { GameTypes } from "../../utils/type"
import TableRow from "./TableRow"

interface Props {
  data: GameTypes[]
}

function ChartTable({ data }: Props) {
  return (
    <table id={styles.table}>
      <thead>
        <tr className={styles.tableRows}>
          <th>Ev</th>
          <th>Date</th>
          <th colSpan={5} className={styles.event}>
            Winning
          </th>
          <th>Total</th>
          <th colSpan={5} className={styles.event}>
            Machine
          </th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event, index) => (
          <TableRow key={index} event={event} />
        ))}
      </tbody>
    </table>
  )
}

export default ChartTable
