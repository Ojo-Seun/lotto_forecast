import React, { useState, useEffect } from "react"
import styles from "./Chart.module.css"
import SelectBox from "../utils/select-box/SelectBox"
import { ghanas, premmiers } from "../../utils/repo"
import useFetch from "../../hooks/useFetch"
import ErrorNotification from "../error/ErrorNotification"
import LoadingIndicator from "../utils/LodingIndicator"
const path = "games/data/years"

const initialValues = {
  error: { err: false, message: "" },
  loading: false,
  data: [] as number[],
}

interface Props {
  setGame: React.Dispatch<React.SetStateAction<string>>
  setYear: React.Dispatch<React.SetStateAction<string>>
  game: string
  year: number
}

function ChartFilter({ game, setGame, year, setYear }: Props) {
  const [gameYears, setGameYears] = useState(initialValues)
  const [fetch] = useFetch({ path, payload: { game }, setStatus: setGameYears, initialData: [], operation: "post" })

  useEffect(() => {
    if (game === "Select") return
    fetch()
  }, [game])
  return (
    <div>
      <div id={styles.filter}>
        <SelectBox title="Select Game" optionsList={[...premmiers, ...ghanas]} option={game} setSelectedOption={setGame} />
        <SelectBox title="Select Year" optionsList={gameYears.data} option={year} setSelectedOption={setYear} />
      </div>
      <ErrorNotification error={gameYears.error} />
      {gameYears.loading && <LoadingIndicator />}
    </div>
  )
}

export default ChartFilter
