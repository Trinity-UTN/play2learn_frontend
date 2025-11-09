import { motion } from "framer-motion";
import { FaInbox } from "react-icons/fa";
import { itemVariants } from "../../constants/variants.constants";
import styles from "./EmptyState.module.css";

export interface EmptyStateComponentProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  textColor?: string;
}

const defaultProps: Required<EmptyStateComponentProps> = {
  title: "No se encontraron resultados",
  message: "Intenta ajustar los filtros o términos de búsqueda.",
  icon: <FaInbox className={styles.icon} />,
  iconColor: "#9CA3AF",
  textColor: "#374151",
};

export const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({
  title = defaultProps.title,
  message = defaultProps.message,
  icon = defaultProps.icon,
  iconColor = defaultProps.iconColor,
  textColor = defaultProps.textColor,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
      style={
        {
          "--empty-state-icon-color": iconColor,
          "--empty-state-text-color": textColor,
        } as React.CSSProperties
      }
    >
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </motion.div>
  );
};
