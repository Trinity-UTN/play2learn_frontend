import styles from "./LastRealizationsComponent.module.css";
import type { LastRealizations } from "../../../types/CurrentStudent.type";
import { motion } from "framer-motion";
import { FaCoins, FaGamepad } from "react-icons/fa";
import { Card } from "@/shared";

type Props = {
  lastRealizations?: LastRealizations[];
};

const LastRealizationsComponents = ({ lastRealizations }: Props) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const getResult = (result: string) => {
    switch (result) {
      case "EXPIRED":
        return "Vencida";
      case "APPROVED":
        return "Aprobada";
      case "DISAPPROVED":
        return "Desaprobada";
      case "PENDING":
        return "Pendiente a Corrección";
      default:
        "Recientemente";
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.leftColumn}>
        <motion.div variants={itemVariants}>
          <Card className={styles.activitiesCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FaGamepad className={styles.cardIcon} />
                Actividades Recientes
              </h2>
            </div>
            <div className={styles.activitiesList}>
              {(lastRealizations ? lastRealizations : []).map(
                (activity, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.activityItem}
                    whileHover={{ x: 5 }}
                  >
                    <div className={styles.activityLeft}>
                      <div
                        className={styles.activityDot}
                        style={{ backgroundColor: "var(--color-stat-2)" }}
                      />
                      <div className={styles.activityInfo}>
                        <h4 className={styles.activityName}>{activity.name}</h4>
                        <p className={styles.activitySubject}>
                          {activity.subject}
                        </p>
                      </div>
                    </div>
                    <div className={styles.activityRight}>
                      <div className={styles.activityScore}>
                        <span className={styles.resultValue}>
                          {getResult(activity.result)}
                        </span>
                        {activity.reward > 0 && (
                          <span className={styles.pointsEarned}>
                            +{activity.reward} <FaCoins />
                          </span>
                        )}
                      </div>
                      <span className={styles.activityDate}>
                        {activity.doneAgo}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* columna a implementar en un futuro */}
      {/* <div className={styles.rightColumn}></div> */}
    </div>
  );
};

export default LastRealizationsComponents;
