import { useState } from "react"
import styles from "../Forecast.module.css"
import useHead from "../../../hooks/useHead"
import TwoWeeksFilter from "./TwoWeeksFilter"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../../utils/motionVariants"
import { ResultType, WhereToSearch } from "../../../utils/type"
import Table from "../result_table/Table"

const head = {
  title: "Forecast With last 2 results",
  descriptions: "Forecast Baba Ijebu With Last 2 Results",
}

const dataInitialState = {
  loading: false,
  error: { err: false, message: "" },
  data: [] as ResultType[],
}

function ForecastWith2WeeksResults() {
  const [whereToExtractData, setWhereToExtractData] = useState<WhereToSearch>("Winning")
  const [data, setData] = useState(dataInitialState)
  let tableData = data.data

  useHead(head)
  return (
    <motion.div className={styles.container} variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
      <p className={styles.title}>Forecast With Last 2 Weeks Results</p>
      <TwoWeeksFilter whereToExtractData={whereToExtractData} setWhereToExtractData={setWhereToExtractData} data={data} setData={setData} />
      <>{tableData?.length > 0 && <Table whereToExtractData={whereToExtractData} result={tableData} />}</>
    </motion.div>
  )
}

export default ForecastWith2WeeksResults
