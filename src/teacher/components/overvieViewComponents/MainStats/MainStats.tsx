import { motion } from "framer-motion";
import styles from "./MainStats.module.css";
import { FaBook, FaGift } from "react-icons/fa";
import { Card } from "@/shared";
import type { StatisticsResponse } from "../../../types/Statistics.type";

type Props = {
  statistics: StatisticsResponse;
};

const MainStats = ({ statistics }: Props) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div variants={itemVariants} className={styles.statsGrid}>
      <Card className={styles.statCard}>
        <div className={styles.statHeader}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#007bff" }}
          >
            <FaBook />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>
              {statistics?.totalCourses}
            </span>
            <span className={styles.statLabel}>Cursos Asignados</span>
          </div>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statHeader}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f59e0b" }}
          >
            <FaGift />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>
              {statistics?.totalBenefits}
            </span>
            <span className={styles.statLabel}>Beneficios Canjeados</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MainStats;
