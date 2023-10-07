import styles from "./Board.module.css";
interface Props {
  name: string;
  value: string | number;
}

function BeforeUpdateBoard({ name, value }: Props) {
  return (
    <div className={styles.beforeUpdateBoard}>
      <span id={styles.name}>{name}</span>
      <span id={styles.value}>{value}</span>
    </div>
  );
}

export default BeforeUpdateBoard;
