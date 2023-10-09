import React from "react"
import Luck from "../../components/utils/Luck"
import useHead from "../../hooks/useHead"
import styles from "./Home.module.css"
import { motion } from "framer-motion"
import { RoutesVariants } from "../../utils/motionVariants"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const head = {
  title: "Welcome To Lotto Lens",
  descriptions: "Welcome To Lotto Lens, where you can view all Baba Ijebu passed results, forecast and win big",
}

function Home() {
  useHead(head)
  return (
    <motion.div variants={RoutesVariants} initial={"initial"} animate={"animate"} exit={"exit"} className={styles.home}>
      <p id={styles.title}>Welcome To Lotto Lens</p>
    </motion.div>
  )
}

export default Home
