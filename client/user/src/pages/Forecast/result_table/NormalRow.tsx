import React from "react"
import styles from "./Table.module.css"
import { GameTypes } from "../../../utils/type"
import { AnimationProps, motion } from "framer-motion"

interface Props {
  event: GameTypes
}

const TrVariant: AnimationProps["variants"] = {
  hidden: { y: -10 },
  onView: { y: 0, transition: { duration: 0.5, delay: 0.2 } },
  exit: { y: -10 },
}

function NormalRow({ event }: Props) {
  const { Winning, Machine, Index, Date, WT, MT, Name, Category, Ev } = event

  return (
    <motion.tr variants={TrVariant} initial="hidden" whileInView={"onView"} exit={"exit"} className="normalRow">
      <td>{Index}</td>
      <td>{Ev}</td>
      <td>{Date}</td>
      <td className={styles.eventData}>{Winning[0]}</td>
      <td className={styles.eventData}>{Winning[1]}</td>
      <td className={styles.eventData}>{Winning[2]}</td>
      <td className={styles.eventData}>{Winning[3]}</td>
      <td className={styles.eventData}>{Winning[4]}</td>
      <td>{WT}</td>
      <td style={{ backgroundColor: "white", opacity: "0.1" }}></td>
      <td className={styles.eventData}>{Machine[0]}</td>
      <td className={styles.eventData}>{Machine[1]}</td>
      <td className={styles.eventData}>{Machine[2]}</td>
      <td className={styles.eventData}>{Machine[3]}</td>
      <td className={styles.eventData}>{Machine[4]}</td>
      <td>{MT}</td>
      <td>{Name}</td>
      <td>{Category}</td>
    </motion.tr>
  )
}

export default NormalRow
