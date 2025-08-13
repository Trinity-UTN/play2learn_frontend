import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaPaperPlane, FaPlus } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import Header from "../../components/createDesafioClasificacion/header/Header";
import CategoryForm from "../../components/createDesafioClasificacion/categoriaForm/CategoriaForm";
import CategoryList from "../../components/createDesafioClasificacion/categoriaList/CategoriaList";
import ClassificationPreview from "../../components/createDesafioClasificacion/clasificacionPreview/ClasificacionPreview";
import styles from "./CreateDesafioClasificacion.module.css";
import { useCreateDesafioClasificacion } from "../../hooks/useDesafioClasificacion";

const CreateDesafioClasificacionView = () => {
  const {
    //Estados
    categories,
    showPreview,
    isSubmitting,
    canSubmit,
    //Setters
    setShowPreview,
    //Envio
    handleSubmit,
  } = useCreateDesafioClasificacion();

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className={styles.formCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaPlus className={styles.cardIcon} />
                  Agregar Categoría
                </h2>
                <p className={styles.cardDescription}>
                  Crea categorías y agrega conceptos que pertenezcan a cada una
                </p>
              </div>

              <CategoryForm />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CategoryList />
          </motion.div>
        </div>

        <div className={styles.sidebar}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.sidebarContent}
          >
            <Card className={styles.configCard}>
              <h3 className={styles.configTitle}>Configuración</h3>

              <div className={styles.configSection}>
                <Button
                  variant={showPreview ? "secondary" : "primary"}
                  fullWidth
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={categories.length === 0}
                >
                  {showPreview ? <FaEyeSlash /> : <FaEye />}
                  {showPreview ? "Ocultar Vista Previa" : "Ver Vista Previa"}
                </Button>
              </div>

              <div className={styles.configSection}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  <FaPaperPlane />
                  {isSubmitting ? "Creando..." : "Crear Actividad"}
                </Button>
              </div>

              <div className={styles.requirements}>
                <h4 className={styles.requirementsTitle}>Requisitos:</h4>
                <ul className={styles.requirementsList}>
                  <li
                    className={
                      categories.length >= 2 ? styles.fulfilled : styles.pending
                    }
                  >
                    Mínimo 2 categorías ({categories.length}/2)
                  </li>
                  <li
                    className={
                      categories.every((cat) => cat.concepts.length > 0)
                        ? styles.fulfilled
                        : styles.pending
                    }
                  >
                    Cada categoría debe tener conceptos
                  </li>
                  <li
                    className={
                      categories.length <= 10
                        ? styles.fulfilled
                        : styles.pending
                    }
                  >
                    Máximo 10 categorías ({categories.length}/10)
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {showPreview && categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.previewSection}
        >
          <ClassificationPreview
            categories={categories}
            onClose={() => setShowPreview(false)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CreateDesafioClasificacionView;
