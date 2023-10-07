import { AnimationProps, motion } from "framer-motion"
import { useAppSelector } from "../../../app/hooks"
import { GameTypes, WhereToSearch } from "../../../utils/type"
import styles from "./Table.module.css"
import TargetNumber from "./TargetNumber"

interface Props {
  event: GameTypes
}

const TrVariant: AnimationProps["variants"] = {
  hidden: { y: -10 },
  onView: { y: 0, transition: { duration: 0.5, delay: 0.2 } },
  exit: { y: -10 },
}

function TargetRow({ event }: Props) {
  const { Winning, Machine, Index, Date, WT, MT, Name, direction, Category, Ev, weeksApart } = event

  return (
    <motion.tr variants={TrVariant} initial={"hidden"} whileInView={"onView"} exit={"exit"} className={styles.targetRow}>
      <td>{Index}</td>
      <td>{Ev}</td>
      <td>{Date}</td>
      <TargetNumber targetEvent={event} where="Winning" targetNum={Winning[0]} />
      <TargetNumber targetEvent={event} where="Winning" targetNum={Winning[1]} />
      <TargetNumber targetEvent={event} where="Winning" targetNum={Winning[2]} />
      <TargetNumber targetEvent={event} where="Winning" targetNum={Winning[3]} />
      <TargetNumber targetEvent={event} where="Winning" targetNum={Winning[4]} />
      <td>{WT}</td>
      <td style={{ backgroundColor: "black", color: "green" }}>
        {direction === "down" ? (
          <>
            &#8593;<sub>{weeksApart}</sub>
          </>
        ) : (
          <>
            &#8595;<sub>{weeksApart}</sub>
          </>
        )}
      </td>
      <TargetNumber targetEvent={event} where="Machine" targetNum={Machine[0]} />
      <TargetNumber targetEvent={event} where="Machine" targetNum={Machine[1]} />
      <TargetNumber targetEvent={event} where="Machine" targetNum={Machine[2]} />
      <TargetNumber targetEvent={event} where="Machine" targetNum={Machine[3]} />
      <TargetNumber targetEvent={event} where="Machine" targetNum={Machine[4]} />
      <td>{MT}</td>
      <td>{Name}</td>
      <td>{Category}</td>
    </motion.tr>
  )
}

export default TargetRow
