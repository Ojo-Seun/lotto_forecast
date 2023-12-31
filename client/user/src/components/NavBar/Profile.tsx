import styles from "./NavBar.module.css"
import Avater from "../../assets/admin.png"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"

const DropDownVarian = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay: 5 } },
  exit: { opacity: 0, y: -10 },
}

interface Props {
  name: string
}

function Profile({ name }: Props) {
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileDetails}>
        <img className={styles.avater} width={40} height={40} src={Avater} alt="Avater Image" />
        <span style={{ color: "white" }}>{name}</span>
        <AnimatePresence key={"drop-down"}>
          <motion.div variants={DropDownVarian} initial="initial" animate="animate" exit={"exit"} className={styles.dropDown}>
            <div>
              <img className={styles.avater} width={60} height={60} src={Avater} alt="Avater Image" />
              <span style={{ color: "white" }}>{name}</span>
            </div>
            <button onClick={handleLogOut}>Logout</button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Profile
