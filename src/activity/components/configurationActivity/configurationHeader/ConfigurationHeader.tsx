import { motion } from "framer-motion";
import { FaColumns, FaList, FaEye, FaGamepad } from "react-icons/fa";
import { Button } from "@/shared";
import styles from "./ConfigurationHeader.module.css";

interface ConfigurationHeaderProps {
  activityName: string;
  isVerticalLayout: boolean;
  isPreviewMode: boolean;
  onToggleLayout: () => void;
  onTogglePreview: () => void;
}

const ConfigurationHeader: React.FC<ConfigurationHeaderProps> = ({
  activityName,
  isVerticalLayout,
  isPreviewMode,
  onToggleLayout,
  onTogglePreview,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.header}
    >
      <div className={styles.titleSection}>
        <div className={styles.iconWrapper}>
          <FaGamepad className={styles.titleIcon} />
        </div>
        <div>
          <h1 className={styles.title}>Creando Actividad: {activityName}</h1>
          <p className={styles.subtitle}>
            Personaliza los parámetros de tu actividad educativa
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="ghost"
          onClick={onToggleLayout}
          className={styles.layoutButton}
          title={
            isVerticalLayout
              ? "Cambiar a diseño horizontal"
              : "Cambiar a diseño vertical"
          }
        >
          {isVerticalLayout ? <FaColumns /> : <FaList />}
        </Button>

        <Button
          variant="ghost"
          onClick={onTogglePreview}
          className={styles.previewButton}
        >
          <FaEye />
          {isPreviewMode ? "Editar" : "Vista Previa"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfigurationHeader;
