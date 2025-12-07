import { motion } from "framer-motion";
import styles from "./CourseGrid.module.css";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import { useState } from "react";
import type { StatisticsResponse } from "../../../types/Statistics.type";
import { FaBook, FaGamepad, FaUsers, FaEye } from "react-icons/fa";
type Props = {
  statistics: StatisticsResponse;
};

const CourseGrid = ({ statistics }: Props) => {
  const [totalCourse, setTotalCourse] = useState<boolean>(false);
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div variants={itemVariants} className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Mis Materias</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTotalCourse(!totalCourse)}
        >
          <FaEye className={styles.buttonIcon} />
          Ver todos
        </Button>
      </div>
      <div className={styles.coursesGrid}>
        {statistics?.subjectsStatistics
          .slice(0, totalCourse ? statistics.subjectsStatistics.length : 4)
          .map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={styles.courseCard}>
                <div className={styles.courseHeader}>
                  <div
                    className={styles.courseIcon}
                    style={{ backgroundColor: "var(--color-stat-4)" }}
                  >
                    <FaBook />
                  </div>
                  <div className={styles.courseInfo}>
                    <h3 className={styles.courseName}>{course.name}</h3>
                  </div>
                </div>

                <div className={styles.courseStats}>
                  <div className={styles.courseStat}>
                    <FaUsers className={styles.courseStatIcon} />
                    <span>{course.totalStudents} estudiantes</span>
                  </div>
                  <div className={styles.courseStat}>
                    <FaGamepad className={styles.courseStatIcon} />
                    <span>{course.totalActivities} actividades</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default CourseGrid;
