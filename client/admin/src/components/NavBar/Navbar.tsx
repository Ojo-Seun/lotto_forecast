import DrawerBtn from "./DrawerBtn";
import styles from "./NavBar.module.css";
import Profile from "./Profile";
import DashboardIcon from "../../assets/dashboardIcon.png";

interface Props {
  handleLefDrawer: () => void;
  handleRightDrawer: () => void;
}

function Navbar({ handleLefDrawer, handleRightDrawer }: Props) {
  return (
    <div className={styles.navWrapper}>
      <DrawerBtn handleDrawer={handleLefDrawer} />
      <div className={styles.dashboardNav}>
        <img src={DashboardIcon} alt="Dashboard Icon" width={32} height={32} />
        <span style={{ color: "aqua", fontSize: "1em" }}>Dashboard</span>
      </div>
      <Profile />
      <DrawerBtn handleDrawer={handleRightDrawer} />
    </div>
  );
}

export default Navbar;
