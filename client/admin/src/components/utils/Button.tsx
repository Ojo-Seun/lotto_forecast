import LoadingIndicator from "./LodingIndicator";
import styles from "./Util.module.css";

interface Props {
  loading: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ loading, handleSubmit }: Props) {
  return (
    <button type={"button"} onClick={handleSubmit} id={styles.submit}>
      {loading ? <LoadingIndicator /> : null}
      Submit
    </button>
  );
}

export default Button;
