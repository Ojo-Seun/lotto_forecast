import styles from "../components/dashboard/Dashboard.module.css";
import Luck from "../components/utils/Luck";
import useHead from "../hooks/useHead";
import { motion } from "framer-motion";
import { RoutesVariants } from "./routesVariants";

function Dashboard() {
  useHead({ title: "Dashboard", descriptions: "Lotto Lens Admin Dashboard" });
  return (
    <>
      <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={RoutesVariants} className={styles.container}>
        <div>Dashboard</div>
      </motion.div>
      <Luck />
    </>
  );
}

export default Dashboard;
