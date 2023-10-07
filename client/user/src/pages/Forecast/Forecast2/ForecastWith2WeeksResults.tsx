import { useState } from "react"
import Luck from "../../../components/utils/Luck"
import styles from "../Forecast.module.css"
import useHead from "../../../hooks/useHead"
import TwoWeeksFilter from "./TwoWeeksFilter"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../../utils/motionVariants"
import { ResultType } from "../../../utils/type"
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
  const [data, setData] = useState(dataInitialState)
  let tableData = data.data

  useHead(head)
  return (
    <div className={styles.container}>
      <motion.div variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"}>
        <p className={styles.title}>Forecast With Last 2 Weeks Results</p>
        <TwoWeeksFilter data={data} setData={setData} />
      </motion.div>
      <>{tableData?.length > 0 && <Table result={tableData} />}</>
      <Luck />
    </div>
  )
}

export default ForecastWith2WeeksResults
