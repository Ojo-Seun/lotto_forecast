import DrawerBtn from "./DrawerBtn"
import styles from "./NavBar.module.css"
import Profile from "./Profile"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import DashboardIcon from "../../assets/dashboardIcon.png"
import SettingsIcon from "../../assets/settingsIcon.png"
import { useState } from "react"
import Chart from "../chart/Chart"
import useToken from "../../hooks/useToken"

// interface Props {
//   handleLefDrawer: () => void;
//   handleRightDrawer: () => void;
// }

const isActivePath = (path: string, pathname: string) => {
  return pathname === path ? styles.selected : ""
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { isvalidToken } = useToken()
  const navigate = useNavigate()
  const user = isvalidToken()
  return (
    <div className={styles.navWrapper}>
      <DrawerBtn status={open} setStatus={setOpen} />
      {user && (
        <div className={styles.dashboardNav}>
          <nav className={styles.nav}>
            <div className={`${styles.link} ${isActivePath("/", pathname)}`}>
              <img src={DashboardIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />
              <NavLink to="/">Home</NavLink>
            </div>

            <div className={`${styles.link} ${isActivePath("/forecast-1", pathname)}`}>
              <img src={SettingsIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />

              <NavLink to={"/forecast-1"}>Forecast 1</NavLink>
            </div>
            <div className={`${styles.link} ${isActivePath("/forecast-2", pathname)}`}>
              <img src={SettingsIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />

              <NavLink to={"/forecast-2"}>Forecast 2</NavLink>
            </div>
            <div className={`${styles.link} ${isActivePath("/forecast-3", pathname)}`}>
              <img src={SettingsIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />

              <NavLink to={"/forecast-3"}>Forecast 3</NavLink>
            </div>
            <span className={styles.indicator}></span>
            <Outlet />
          </nav>
        </div>
      )}
      {user ? (
        <Profile name={user.name} />
      ) : (
        <div id={styles.loginBtn}>
          <button onClick={() => navigate("/auth/login")}>Login</button>
          <button onClick={() => navigate("/auth/register")}>Register</button>
        </div>
      )}

      <DrawerBtn status={open} setStatus={setOpen} />
      {open && <Chart />}
    </div>
  )
}

export default Navbar
