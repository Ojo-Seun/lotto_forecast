import { useState } from "react"
import styles from "../Forecast.module.css"
import { ResultType } from "../../../utils/type"
import useHead from "../../../hooks/useHead"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../../utils/motionVariants"
import OneWeekFilter from "./OneWeekFilter"
import Table from "../result_table/Table"

const dataInitialState = {
  loading: false,
  error: { err: false, message: "" },
  data: [] as ResultType[],
}

const head = {
  title: "Forecast With last  results",
  descriptions: "Forecast Baba Ijebu With Last  Results",
}

function ForecastWith1WeekResult() {
  const [data, setData] = useState(dataInitialState)
  let tableData = data.data
  useHead(head)
  return (
    <motion.div className={styles.container} variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
      <p className={styles.title}>Forecast With Last 1 Weeks Results</p>
      <OneWeekFilter data={data} setData={setData} />
      <>{tableData?.length > 0 && <Table result={tableData} />}</>
    </motion.div>
  )
}

export default ForecastWith1WeekResult
