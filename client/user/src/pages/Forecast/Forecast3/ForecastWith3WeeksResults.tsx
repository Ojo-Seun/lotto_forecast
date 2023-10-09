import { useState } from "react"
import Luck from "../../../components/utils/Luck"
import useHead from "../../../hooks/useHead"
import styles from "../Forecast.module.css"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../../utils/motionVariants"
import ThreeWeeksFilter from "./ThreeWeeksFilter"
import { ResultType } from "../../../utils/type"
import Table from "../result_table/Table"

const head = {
  title: "Forecast With last 3 results",
  descriptions: "Forecast Baba Ijebu With Last 3 Results",
}

const dataInitialState = {
  loading: false,
  error: { err: false, message: "" },
  data: [] as ResultType[],
}

function ForecastWith3WeeksResults() {
  const [data, setData] = useState(dataInitialState)
  useHead(head)
  return (
    <motion.div className={styles.container} variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
      <p className={styles.title}>Forecast With Last 3 Weeks Results</p>
      <ThreeWeeksFilter data={data} setData={setData} />
      <>{data?.data.length > 0 && <Table result={data.data} />}</>
    </motion.div>
  )
}

export default ForecastWith3WeeksResults
