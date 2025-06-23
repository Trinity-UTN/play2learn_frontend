import type React from "react";
// import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaTools } from "react-icons/fa";
// import { FaSearch, FaEdit, FaTrash, FaEnvelope, FaPhone } from "react-icons/fa";
// import type { Student } from "../../types/adminTypes";
// import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
// import Input from "../../../shared/components/Input/InputComponent";
// import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./ViewStudentsView.module.css";

const ViewStudentsView: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const students: Student[] = [
  //   {
  //     id: 1,
  //     name: "Ana García López",
  //     email: "ana.garcia@email.com",
  //     phone: "+1234567890",
  //     year: "1er Año",
  //     status: "Activo",
  //     enrollment: "2024001",
  //   },
  //   {
  //     id: 2,
  //     name: "Carlos Martínez Ruiz",
  //     email: "carlos.martinez@email.com",
  //     phone: "+1234567891",
  //     year: "2do Año",
  //     status: "Activo",
  //     enrollment: "2023045",
  //   },
  //   {
  //     id: 3,
  //     name: "María Rodríguez Silva",
  //     email: "maria.rodriguez@email.com",
  //     phone: "+1234567892",
  //     year: "3er Año",
  //     status: "Activo",
  //     enrollment: "2022089",
  //   },
  //   {
  //     id: 4,
  //     name: "José López Fernández",
  //     email: "jose.lopez@email.com",
  //     phone: "+1234567893",
  //     year: "1er Año",
  //     status: "Inactivo",
  //     enrollment: "2024012",
  //   },
  //   {
  //     id: 5,
  //     name: "Laura Sánchez Torres",
  //     email: "laura.sanchez@email.com",
  //     phone: "+1234567894",
  //     year: "2do Año",
  //     status: "Activo",
  //     enrollment: "2023067",
  //   },
  // ];

  // const filteredStudents = students.filter(
  //   (student) =>
  //     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.enrollment.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
              Visualización de Estudiantes - En Construcción
            </h1>
            <p className={styles.subtitle}>Esta página está en desarrollo.</p>
          </div>
        </div>
        <Button variant="primary">
          <FaGraduationCap className={styles.buttonIcon} />
          Nuevo Estudiante
        </Button>
      </motion.div>

      {/* <motion.div variants={itemVariants}>
        <Card className={styles.searchCard}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.studentsGrid}>
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={styles.studentCard} hover>
              <div className={styles.cardHeader}>
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>{student.name}</h3>
                  <p className={styles.enrollment}>{student.enrollment}</p>
                </div>
                <Badge
                  variant={
                    student.status === "Activo" ? "success" : "secondary"
                  }
                >
                  {student.status}
                </Badge>
              </div>

              <div className={styles.studentDetails}>
                <div className={styles.detailItem}>
                  <FaGraduationCap className={styles.detailIcon} />
                  <span>{student.year}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaEnvelope className={styles.detailIcon} />
                  <span className={styles.email}>{student.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaPhone className={styles.detailIcon} />
                  <span>{student.phone}</span>
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

export default ViewStudentsView;
