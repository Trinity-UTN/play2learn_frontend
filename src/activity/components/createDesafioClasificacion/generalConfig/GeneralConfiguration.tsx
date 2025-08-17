import { motion, type Variants } from "framer-motion";
import { FaCog } from "react-icons/fa";
import CategoryForm from "../categoriaForm/CategoriaForm";
import CategoryList from "../categoriaList/CategoriaList";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./GeneralConfiguration.module.css";

interface DesafioClasificacionConfigProps {
  itemVariants: Variants;
}

const GeneralConfiguration: React.FC<DesafioClasificacionConfigProps> = ({
  itemVariants,
}) => {
  const { getStepTitle, getStepDescription } = useCreateDesafioClasificacion();

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{getStepTitle()}</h3>
          <p className={styles.description}>{getStepDescription()}</p>
        </div>
      </div>

      <CategoryForm />
      <CategoryList />
    </motion.div>
  );
};

export default GeneralConfiguration;
