import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import styles from "./alert.module.css"
import Logo from "../../assets/eyeLogo.svg"
import { motion, AnimatePresence, AnimationProps } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeAlert } from "../../features/alert/alertSlice"

const portalRoot = document.getElementById("portal-root") as HTMLDivElement
console.log(portalRoot)
const Variants: AnimationProps["variants"] = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.5 } },
}

function Alert() {
  const { show, message } = useAppSelector((state) => state.alert)
  const dispatch = useAppDispatch()
  console.log({ show, message })

  const handleCloseAlert = () => {
    dispatch(closeAlert())
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div variants={Variants} initial="initial" animate="animate" exit={"exit"} id={styles.alert}>
          <button id={styles.btn} type="button" onClick={handleCloseAlert}>
            X
          </button>
          <img id={styles.logo} width={32} src={Logo} height={32} />
          <p id={styles.message}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  )
}

export default Alert
