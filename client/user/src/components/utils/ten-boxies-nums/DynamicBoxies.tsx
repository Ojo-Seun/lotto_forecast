import styles from "./Boxies.module.css"

interface Inputs {
  box0: number
  box1: number
  box2: number
  box3: number
  box4: number
}
interface Props {
  setInputs: React.Dispatch<React.SetStateAction<Inputs>>

  inputs: Inputs
}

function DynamicBoxies({ inputs, setInputs }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = parseInt(e.target.value)
    setInputs((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div className={styles.fiveDynamicBoxies}>
      <input
        required
        placeholder="0"
        name="box0"
        className={styles.dynamicBox}
        type="number"
        onFocus={(e) => (e.target.value = "")}
        value={inputs.box0}
        pattern="/[0-9]{1,2}/"
        max={90}
        min={1}
        onChange={handleChange}
      />
      <input
        required
        placeholder="0"
        name="box1"
        className={styles.dynamicBox}
        type="number"
        onFocus={(e) => (e.target.value = "")}
        value={inputs.box1}
        pattern="/[0-9]{1,2}/"
        max={90}
        min={1}
        onChange={handleChange}
      />
      <input
        required
        placeholder="0"
        name="box2"
        className={styles.dynamicBox}
        type="number"
        onFocus={(e) => (e.target.value = "")}
        value={inputs.box2}
        pattern="/[0-9]{1,2}/"
        max={90}
        min={1}
        onChange={handleChange}
      />
      <input
        required
        placeholder="0"
        name="box3"
        className={styles.dynamicBox}
        type="number"
        onFocus={(e) => (e.target.value = "")}
        value={inputs.box3}
        pattern="/[0-9]{1,2}/"
        max={90}
        min={1}
        onChange={handleChange}
      />
      <input
        required
        placeholder="0"
        name="box4"
        className={styles.dynamicBox}
        type="number"
        onFocus={(e) => (e.target.value = "")}
        value={inputs.box4}
        pattern="/[0-9]{1,2}/"
        max={90}
        min={1}
        onChange={handleChange}
      />
    </div>
  )
}

export default DynamicBoxies
