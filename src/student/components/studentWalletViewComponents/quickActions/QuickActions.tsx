import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaGift,
  FaStore,
  FaCoins,
  FaArrowRight,
  FaBullseye,
} from "react-icons/fa";
import { Card, Button } from "@/shared";
import styles from "./QuickActions.module.css";

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    {
      title: "Inversiones",
      description: "Haz crecer tus monedas",
      icon: FaChartLine,
      color: "#3B82F6",
      view: "investments",
      badge: "Nuevo",
      url: "/dashboard/student/investmests/list",
    },
    {
      title: "Beneficios",
      description: "Usa tus ventajas",
      icon: FaGift,
      color: "#F59E0B",
      view: "benefits",
      badge: "Revisar",
      url: "/dashboard/student/beneficios/list",
    },
    {
      title: "Tienda",
      description: "Compra mejoras",
      icon: FaStore,
      color: "#EF4444",
      view: "store",
      badge: "Ofertas",
      url: "/dashboard/student/store",
    },
  ];

  return (
    <Card className={styles.actionsCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <FaCoins className={styles.titleIcon} />
          Acciones Rápidas
        </h3>
        <p className={styles.cardSubtitle}>
          ¿Qué quieres hacer con tus monedas?
        </p>
      </div>

      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <motion.div
            key={action.view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              fullWidth
              onClick={() => navigate(action.url)}
              className={styles.actionButton}
              style={{ "--action-color": action.color } as React.CSSProperties}
            >
              <div className={styles.actionContent}>
                <div className={styles.actionLeft}>
                  <div className={styles.actionIcon}>
                    <action.icon />
                  </div>
                  <div className={styles.actionInfo}>
                    <h4 className={styles.actionTitle}>{action.title}</h4>
                    <p className={styles.actionDescription}>
                      {action.description}
                    </p>
                  </div>
                </div>
                <div className={styles.actionRight}>
                  {action.badge && (
                    <div className={styles.actionBadge}>{action.badge}</div>
                  )}
                  <FaArrowRight className={styles.actionArrow} />
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className={styles.educationalNote}>
        <FaBullseye className={styles.noteIcon} />
        <div className={styles.noteContent}>
          <strong>Planificación financiera:</strong> Antes de gastar, piensa si
          es una necesidad o un deseo. Las inversiones pueden hacer crecer tu
          dinero, pero requieren paciencia.
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
