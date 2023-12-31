import styles from "./DrawerBtn.module.css";
import OpenIcon from "../../assets/Menu.png";
import CloseIcon from "../../assets/closeBtnIcon.png";
// interface Props {
//   handleDrawer: () => void;
// }

function DrawerBtn() {
  //const [status, setStatus] = useState(false);

  // const handleStatus = () => {
  //   handleDrawer();
  //   setStatus((prev) => !prev);
  // };

  return (
    <div className={styles.drawerBtnWrapper}>
      <button className={styles.drawerBtn}>
        <img src={status ? CloseIcon : OpenIcon} width={20} height={20} alt="Icon" />
      </button>
    </div>
  );
}

export default DrawerBtn;
