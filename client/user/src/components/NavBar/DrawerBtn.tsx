import { useState, useEffect } from "react"
import styles from "./DrawerBtn.module.css"
import OpenIcon from "../../assets/Menu.png"
import CloseIcon from "../../assets/closeBtnIcon.png"
interface Props {
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

function DrawerBtn({ status, setStatus }: Props) {
  const handleStatus = () => {
    setStatus((prev) => !prev)
  }

  return (
    <div className={styles.drawerBtnWrapper}>
      <button onClick={handleStatus} className={styles.drawerBtn}>
        <img src={status ? CloseIcon : OpenIcon} width={20} height={20} alt="Icon" />
      </button>
    </div>
  )
}

export default DrawerBtn
