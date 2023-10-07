import styles from "./Header.module.css";
import Logo from "../../assets/logo.png";
import NightModeIcon from "../../assets/nightMode.svg";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} width={100} height={50} alt="Logo" />
      </div>
      <div className={styles.mode}>
        <img src={NightModeIcon} width={32} height={32} alt="Night Mode Icon" />
      </div>
    </div>
  );
}

export default Header;
