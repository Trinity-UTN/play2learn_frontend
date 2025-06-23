import type React from "react";
// import { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaTools } from "react-icons/fa";
// import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
// import type { Course } from "../../types/adminTypes";
// import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
// import Input from "../../../shared/components/Input/InputComponent";
import styles from "./ViewCoursesView.module.css";

const ViewCoursesView: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // // Datos de ejemplo simplificados para mostrar cómo quedaría la vista
  // const courses: Course[] = [
  //   {
  //     id: 1,
  //     name: "A",
  //     year_id: 1,
  //     students: 28,
  //   },
  //   {
  //     id: 2,
  //     name: "B",
  //     year_id: 1,
  //     students: 28,
  //   },
  //   {
  //     id: 3,
  //     name: "C",
  //     year_id: 1,
  //     students: 28,
  //   },
  //   {
  //     id: 4,
  //     name: "A",
  //     year_id: 2,
  //     students: 28,
  //   },
  //   {
  //     id: 5,
  //     name: "B",
  //     year_id: 2,
  //     students: 28,
  //   },
  // ];

  // const filteredCourses = courses.filter((course) =>
  //   course.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div>
              <h1 className={styles.title}>
                Vista de Cursos - En Construcción
              </h1>
              <p className={styles.subtitle}>
                Esta página está en desarrollo.
              </p>
            </div>
          </div>
        </div>
        <Button variant="primary" disabled>
          <FaBook className={styles.buttonIcon} />
          Nuevo Curso
        </Button>
      </motion.div>

      {/* <motion.div variants={itemVariants}>
        <Card className={styles.exampleCard}>
          <div className={styles.exampleHeader}>
            <h3>Ejemplo de Vista de Cursos</h3>
            <p>Así podría verse la tabla de cursos una vez implementada:</p>
          </div>

          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <Input
                placeholder="Buscar por año o sección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Año de Curso</th>
                  <th>Curso</th>
                  <th>Estudiantes</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.tableRow}
                  >
                    <td className={styles.yearCell}>{course.year_id}</td>
                    <td className={styles.nameCell}>{course.name}</td>
                    <td>{course.students}</td>
                    <td>
                      <div className={styles.actions}>
                        <Button variant="ghost" size="sm" disabled>
                          <FaEdit />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={styles.deleteButton}
                          disabled
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.constructionNote}>
            <p>
              <strong>Nota:</strong> Los datos mostrados son ejemplos. En la
              implementación final, esta información se cargará desde la base de
              datos.
            </p>
          </div>
        </Card>
      </motion.div> */}
    </motion.div>
  );
};

export default ViewCoursesView;
