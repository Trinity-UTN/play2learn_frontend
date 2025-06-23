import type React from "react";
// import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaTools } from "react-icons/fa";
// import { FaSearch, FaEdit, FaTrash, FaEnvelope, FaPhone, FaBook} from "react-icons/fa";
// import type { Teacher } from "../../types/adminTypes";
// import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
// import Input from "../../../shared/components/Input/InputComponent";
// import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./ViewTeachersView.module.css";

const ViewTeachersView: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const teachers: Teacher[] = [
  //   {
  //     id: 1,
  //     name: "Prof. María García",
  //     email: "maria.garcia@escuela.com",
  //     phone: "+1234567890",
  //     specialty: "Matemáticas",
  //     courses: 3,
  //     status: "Activo",
  //     experience: "5 años",
  //   },
  //   {
  //     id: 2,
  //     name: "Prof. Carlos Martínez",
  //     email: "carlos.martinez@escuela.com",
  //     phone: "+1234567891",
  //     specialty: "Literatura",
  //     courses: 2,
  //     status: "Activo",
  //     experience: "8 años",
  //   },
  //   {
  //     id: 3,
  //     name: "Prof. Ana López",
  //     email: "ana.lopez@escuela.com",
  //     phone: "+1234567892",
  //     specialty: "Ciencias",
  //     courses: 4,
  //     status: "Activo",
  //     experience: "3 años",
  //   },
  //   {
  //     id: 4,
  //     name: "Prof. José Rodríguez",
  //     email: "jose.rodriguez@escuela.com",
  //     phone: "+1234567893",
  //     specialty: "Historia",
  //     courses: 1,
  //     status: "Inactivo",
  //     experience: "12 años",
  //   },
  //   {
  //     id: 5,
  //     name: "Prof. Laura Fernández",
  //     email: "laura.fernandez@escuela.com",
  //     phone: "+1234567894",
  //     specialty: "Física",
  //     courses: 2,
  //     status: "Activo",
  //     experience: "6 años",
  //   },
  // ];

  // const filteredTeachers = teachers.filter(
  //   (teacher) =>
  //     teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase())
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
              Visualización de Docentes - En Construcción
            </h1>
            <p className={styles.subtitle}>Esta página está en desarrollo.</p>
          </div>
        </div>
        <Button variant="primary">
          <FaUserTie className={styles.buttonIcon} />
          Nuevo Docente
        </Button>
      </motion.div>

      {/* <motion.div variants={itemVariants}>
        <Card className={styles.searchCard}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder="Buscar docentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.teachersGrid}>
        {filteredTeachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={styles.teacherCard} hover>
              <div className={styles.cardHeader}>
                <div className={styles.teacherInfo}>
                  <h3 className={styles.teacherName}>{teacher.name}</h3>
                  <p className={styles.specialty}>{teacher.specialty}</p>
                </div>
                <Badge
                  variant={
                    teacher.status === "Activo" ? "success" : "secondary"
                  }
                >
                  {teacher.status}
                </Badge>
              </div>

              <div className={styles.teacherDetails}>
                <div className={styles.detailItem}>
                  <FaEnvelope className={styles.detailIcon} />
                  <span className={styles.email}>{teacher.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaPhone className={styles.detailIcon} />
                  <span>{teacher.phone}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaBook className={styles.detailIcon} />
                  <span>{teacher.courses} cursos asignados</span>
                </div>
                <div className={styles.detailItem}>
                  <FaUserTie className={styles.detailIcon} />
                  <span>{teacher.experience} de experiencia</span>
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

export default ViewTeachersView;
