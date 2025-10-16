import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import styles from "./NoLudicaPreview.module.css";
import NoLudicaGame from "../../../../shared/components/Games/NoLudica/NoLudicaGame";

const NoLudicaPreview: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Puedes probar enviando una respuesta de ejemplo" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes.
          </p>
        </div>
      </div>

      <div className={styles.contPreview}>
        <NoLudicaGame />
      </div>
    </motion.div>
  );
};

export default NoLudicaPreview;
