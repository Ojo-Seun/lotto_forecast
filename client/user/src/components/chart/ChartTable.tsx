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
          <th>W1</th>
          <th>W2</th>
          <th>W3</th>
          <th>W4</th>
          <th>W5</th>
          <th>Total</th>
          <th>M1</th>
          <th>M2</th>
          <th>M3</th>
          <th>M4</th>
          <th>M5</th>
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
