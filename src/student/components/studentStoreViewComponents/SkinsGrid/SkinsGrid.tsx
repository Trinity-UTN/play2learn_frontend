import { motion, type Variants } from "framer-motion";
import SkinCard from "../SkinCard/SkinCard";
import type { BodyPart } from "../../../types/CurrentStudent.type";
import styles from "./SkinsGrid.module.css";

interface SkinsGridProps {
  skins: BodyPart[];
  onPurchase: (skin: BodyPart) => void;
  userBalance: number;
}

const SkinsGrid: React.FC<SkinsGridProps> = ({
  skins,
  onPurchase,
  userBalance,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (skins.length === 0) {
    return (
      <motion.div variants={itemVariants} className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3 className={styles.emptyTitle}>No se encontraron items</h3>
        <p className={styles.emptyMessage}>Intenta con otra categoría</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.grid}
    >
      {skins.map((skin) => (
        <motion.div key={skin.id} variants={itemVariants}>
          <SkinCard
            skin={skin}
            onPurchase={onPurchase}
            userBalance={userBalance}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkinsGrid;
