import { motion } from "framer-motion";
import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./QuickActions.module.css";
import { FaGamepad, FaGift, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  const quickActions = [
    {
      title: "Nueva Actividad",
      description: "Crear actividad para tus cursos",
      icon: FaGamepad,
      color: "#007bff",
      action: "create-activity",
      url: "/dashboard/teacher/actividades/list",
    },
    {
      title: "Nuevo Beneficio",
      description: "Agregar recompensa para estudiantes",
      icon: FaGift,
      color: "#8b5cf6",
      action: "create-benefit",
      url: "/dashboard/teacher/beneficio/create",
    },
  ];
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.contentCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <FaStar className={styles.cardIcon} />
            Acciones Rápidas
          </h3>
        </div>
        <div className={styles.actionsGrid}>
          {quickActions.map((action) => (
            <motion.button
              key={action.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.actionButton}
              style={{ backgroundColor: `${action.color}15` }}
              onClick={() => navigate(action.url)}
            >
              <action.icon
                className={styles.actionIcon}
                style={{ color: action.color }}
              />
              <div className={styles.actionContent}>
                <span className={styles.actionTitle}>{action.title}</span>
                <span className={styles.actionDescription}>
                  {action.description}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
