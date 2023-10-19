import DrawerBtn from "./DrawerBtn"
import styles from "./NavBar.module.css"
import Profile from "./Profile"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import DashboardIcon from "../../assets/dashboardIcon.png"
import SettingsIcon from "../../assets/settingsIcon.png"
import useToken from "../../hooks/useToken"

const isActivePath = (path: string, pathname: string) => {
  return pathname === path ? styles.selected : ""
}

function Navbar() {
  const { isvalidToken } = useToken()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = isvalidToken()
  return (
    <div className={styles.navWrapper}>
      <DrawerBtn />
      {user && (
        <div className={styles.dashboardNav}>
          <nav className={styles.nav}>
            <div className={`${styles.link} ${isActivePath("/", pathname)}`}>
              <img src={DashboardIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />
              <NavLink to="/">Dashboard</NavLink>
            </div>

            <div className={`${styles.link} ${isActivePath("/operations", pathname)}`}>
              <img src={SettingsIcon} className={styles.icon} alt="Dashboard Icon" width={16} height={16} />

              <NavLink to={"/operations"}>Operations</NavLink>
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
      <DrawerBtn />
    </div>
  )
}

export default Navbar
