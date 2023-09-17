import styles from "./Drawer.module.css";
import { motion, AnimatePresence } from "framer-motion";

const LeftVariants = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.2 } },
};

const RightVariants = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
};

const leftStyle = {
  left: 0,
  top: 0,
};

const rightStyle = {
  right: 0,
  top: 0,
};

interface Props {
  side: "left" | "right";
  openDrawer: boolean;
  children: React.ReactNode;
}

function Drawer({ side, openDrawer, children }: Props) {
  const Varaints = side === "left" ? LeftVariants : RightVariants;
  const style = side === "left" ? leftStyle : rightStyle;

  console.log("Rerender");
  return (
    <AnimatePresence key={"draber"}>
      <>
        {openDrawer ? (
          <motion.div variants={Varaints} initial="hidden" animate="show" exit="exit" className={styles.drawer} style={style}>
            {children}
          </motion.div>
        ) : null}
      </>
    </AnimatePresence>
  );
}

export default Drawer;
