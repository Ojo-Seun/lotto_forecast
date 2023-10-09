import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GameTypes } from "../../utils/type"
import useFetch from "../../hooks/useFetch"
import styles from "./Chart.module.css"
import ChartFilter from "./ChartFilter"
import ChartTable from "./ChartTable"
import ErrorNotification from "../error/ErrorNotification"
import LoadingIndicator from "../utils/LodingIndicator"
const path = "games/data/chart"
const initialValues = {
  error: { err: false, message: "" },
  loading: false,
  data: [] as Data,
}
type Data = GameTypes[]

const Variants = {
  initial: { opacity: 0, top: -20 },
  animate: { opacity: 1, transition: { duration: 0.5 }, top: "2em" },
  exit: { opacity: 0, transition: { duration: 0.5 }, top: -20 },
}
function Chart() {
  const [chart, setchart] = useState(initialValues)
  const [game, setGame] = useState("Select")
  const [year, setYear] = useState("Select")

  const [fetch] = useFetch({ path, setStatus: setchart, operation: "post", payload: { game, year: parseInt(year) }, initialData: [] })

  useEffect(() => {
    if (game === "Select" || year === "Select") return
    fetch()
  }, [year, game])

  return (
    <AnimatePresence key={"chart"}>
      <motion.div drag variants={Variants} initial="initial" animate="animate" exit="exit" id={styles.container}>
        <p id={styles.title}>Chart</p>
        <ChartFilter game={game} setGame={setGame} year={parseInt(year)} setYear={setYear} />
        <ErrorNotification error={chart.error} />
        {chart.loading && <LoadingIndicator />}
        <div id={styles.chart}>
          {game !== "Select" && year !== "Select" ? (
            <div id={styles.gameInfo}>
              <span>{game}</span>
              <span>{year}</span>
            </div>
          ) : null}
          {chart.data.length > 0 && <ChartTable data={chart.data} />}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Chart
