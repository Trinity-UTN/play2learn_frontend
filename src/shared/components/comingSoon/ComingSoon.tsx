import styles from "./ComingSoon.module.css";
import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0.3 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, type: "spring" }}
      className={styles.container}
    >
      <h1 className={styles.title}>🚧 Página en desarrollo 🚧</h1>
      <p className={styles.message}>
        Próximamente estará disponible. ¡Gracias por tu paciencia!
      </p>
    </motion.div>
  );
};

export default ComingSoon;
