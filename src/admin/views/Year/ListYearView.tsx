import type React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaTools } from "react-icons/fa";
// import { FaUsers, FaEdit, FaTrash } from "react-icons/fa";
// import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
// import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./ListYearView.module.css";

const ListYearView: React.FC = () => {
  // const years: Year[] = [
  //   {
  //     id: 1,
  //     name: "1er Año",
  //     students: 245,
  //     courses: 8,
  //     status: "Activo",
  //     period: "2024",
  //   },
  //   {
  //     id: 2,
  //     name: "2do Año",
  //     students: 198,
  //     courses: 9,
  //     status: "Activo",
  //     period: "2024",
  //   },
  //   {
  //     id: 3,
  //     name: "3er Año",
  //     students: 156,
  //     courses: 10,
  //     status: "Activo",
  //     period: "2024",
  //   },
  //   {
  //     id: 4,
  //     name: "4to Año",
  //     students: 134,
  //     courses: 8,
  //     status: "Inactivo",
  //     period: "2023",
  //   },
  // ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <div className={styles.constructionBanner}>
            <FaTools className={styles.constructionIcon} />
            <h1 className={styles.title}>
              Visualización de Años - En Construcción
            </h1>
            <p className={styles.subtitle}>Esta página está en desarrollo.</p>
          </div>
        </div>
        <Button variant="primary">
          <FaCalendarAlt className={styles.buttonIcon} />
          Nuevo Año
        </Button>
      </motion.div>

      {/* <motion.div variants={itemVariants} className={styles.yearsGrid}>
        {years.map((year) => (
          <motion.div
            key={year.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={styles.yearCard} hover>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.yearName}>{year.name}</h3>
                  <p className={styles.yearPeriod}>Período {year.period}</p>
                </div>
                <Badge
                  variant={year.status === "Activo" ? "success" : "secondary"}
                >
                  {year.status}
                </Badge>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div
                    className={styles.statIcon}
                    style={{ backgroundColor: "#007bff" }}
                  >
                    <FaUsers />
                  </div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>{year.students}</span>
                    <span className={styles.statLabel}>Estudiantes</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div
                    className={styles.statIcon}
                    style={{ backgroundColor: "#ff6f3c" }}
                  >
                    <FaCalendarAlt />
                  </div>
                  <div className={styles.statContent}>
                    <span className={styles.statValue}>{year.courses}</span>
                    <span className={styles.statLabel}>Cursos</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                <Button variant="ghost" size="sm">
                  <FaEdit className={styles.actionIcon} />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={styles.deleteButton}
                >
                  <FaTrash className={styles.actionIcon} />
                  Eliminar
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div> */}
    </motion.div>
  );
};

export default ListYearView;
