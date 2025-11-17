import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import styles from "./EducationHeader.module.css";

const EducationHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.header}
    >
      <div className={styles.titleSection}>
        <motion.div
          className={styles.iconWrapper}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaGraduationCap className={styles.mainIcon} />
        </motion.div>
        <h1 className={styles.title}>Educación Financiera</h1>
        <p className={styles.subtitle}>
          Aprende a manejar tus monedas de forma inteligente
        </p>
      </div>
    </motion.div>
  );
};

export default EducationHeader;
