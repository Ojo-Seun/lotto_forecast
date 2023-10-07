import { GameTypes } from "../../../utils/types";
import styles from "./Boxies.module.css";
import StaticBoxies from "./StaticBoxies";

interface TestEvent {
  Winning: number[];
  Machine: number[];
}

interface Props {
  events: GameTypes[] | TestEvent[];
}

function LastTwoEvents({ events }: Props) {
  return (
    <div className={styles.lastTwoEvents}>
      <h2 style={{ textAlign: "center", fontWeight: "bold", marginTop: "1em" }}>Last 2 Events</h2>
      <div className={styles.eventsWrapper}>
        <div className={styles.sideNames}>
          <span>Winning</span>
          <span>Machine</span>
        </div>
        <div className={styles.events}>
          {events.map((event, index) => (
            <StaticBoxies key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastTwoEvents;
