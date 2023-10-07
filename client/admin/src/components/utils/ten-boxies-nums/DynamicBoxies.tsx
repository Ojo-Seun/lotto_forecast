import styles from "./Boxies.module.css";

interface Inputs {
  W0: number;
  W1: number;
  W2: number;
  W3: number;
  W4: number;
  M0: number;
  M1: number;
  M2: number;
  M3: number;
  M4: number;
}
interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: Inputs;
}

function DynamicBoxies({ inputs, handleChange }: Props) {
  return (
    <div className={styles.tenboxies}>
      <div className={styles.fiveBoxies}>
        <input
          required
          placeholder="0"
          name="W0"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.W0}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="W1"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.W1}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="W2"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.W2}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="W3"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.W3}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="W4"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.W4}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
      </div>
      <div className={styles.fiveBoxies}>
        <input
          required
          placeholder="0"
          name="M0"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.M0}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="M1"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.M1}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="M2"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.M2}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="M3"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.M3}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
        <input
          required
          placeholder="0"
          name="M4"
          className={styles.dynamicBox}
          type="number"
          onFocus={(e) => (e.target.value = "")}
          value={inputs.M4}
          pattern="/[0-9]{1,2}/"
          max={90}
          min={1}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default DynamicBoxies;
