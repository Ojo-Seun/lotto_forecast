import { GameTypes } from "../../../utils/types";
import styles from "./Boxies.module.css";

interface TestEvent {
  Winning: number[];
  Machine: number[];
}

interface Props {
  event: GameTypes | TestEvent;
}

function StaticBoxies({ event }: Props) {
  const { Winning, Machine } = event;
  return (
    <div className={styles.tenboxies}>
      <div className={styles.fiveBoxies}>
        <span className={styles.box}>{Winning[0]}</span>
        <span className={styles.box}>{Winning[1]}</span>
        <span className={styles.box}>{Winning[2]}</span>
        <span className={styles.box}>{Winning[3]}</span>
        <span className={styles.box}>{Winning[4]}</span>
      </div>
      <div className={styles.fiveBoxies}>
        <span className={styles.box}>{Machine[0]}</span>
        <span className={styles.box}>{Machine[1]}</span>
        <span className={styles.box}>{Machine[2]}</span>
        <span className={styles.box}>{Machine[3]}</span>
        <span className={styles.box}>{Machine[4]}</span>
      </div>
    </div>
  );
}

export default StaticBoxies;
