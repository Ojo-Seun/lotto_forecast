import styles from "./Board.module.css";

interface Props {
  lastIndex: number;
  nextIndex: number;
  previousEntries: number;
  newEntries: number;
}

function AfterUpdateBoard({ lastIndex, nextIndex, previousEntries, newEntries }: Props) {
  console.log({ newEntries });
  return (
    <div className={styles.afterUpdateBoard}>
      <div className={styles.boardDisplay}>
        <div>
          <span style={{ color: "aqua" }}>Last Index</span>
          <span style={{ color: "white" }}>{lastIndex}</span>
        </div>
        <div>
          <span style={{ color: "aqua" }}> Next Index</span>
          <span style={{ color: "white" }}>{nextIndex}</span>
        </div>
      </div>
      <div className={styles.boardDisplay}>
        <div>
          <span style={{ color: "aqua" }}>Previous Entries</span>
          <span style={{ color: "white" }}>{previousEntries}</span>
        </div>
        <div>
          <span style={{ color: "aqua" }}>New Entries</span>
          <span style={{ color: "white" }}>{newEntries}</span>
        </div>
      </div>
    </div>
  );
}

export default AfterUpdateBoard;
