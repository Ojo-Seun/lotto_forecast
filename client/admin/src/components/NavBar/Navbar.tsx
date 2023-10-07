import DrawerBtn from "./DrawerBtn";
import styles from "./NavBar.module.css";
import Profile from "./Profile";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "../../assets/dashboardIcon.png";
import SettingsIcon from "../../assets/settingsIcon.png";

// interface Props {
//   handleLefDrawer: () => void;
//   handleRightDrawer: () => void;
// }

const isActivePath = (path: string, pathname: string) => {
  return pathname === path ? styles.selected : "";
};

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className={styles.navWrapper}>
      <DrawerBtn />
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
        </nav>
      </div>
      <Profile />
      <DrawerBtn />
    </div>
  );
}

export default Navbar;
