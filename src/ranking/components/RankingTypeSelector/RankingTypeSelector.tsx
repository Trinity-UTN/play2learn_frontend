import { motion } from "framer-motion";
import type { RankingType } from "../../types/ranking.type";
import { useRankingTypeSelector } from "../../hooks/useRankingTypeSelector";
import styles from "./RankingTypeSelector.module.css";

interface RankingTypeSelectorProps {
  category: "coins" | "activities";
  selectedType: RankingType;
  onTypeChange: (type: RankingType) => void;
}

export const RankingTypeSelector = ({
  category,
  selectedType,
  onTypeChange,
}: RankingTypeSelectorProps) => {
  const { types } = useRankingTypeSelector(category);

  return (
    <div className={styles.container}>
      {types.map((type, index) => {
        const Icon = type.icon;
        const isActive = selectedType === type.id;

        return (
          <motion.button
            key={type.id}
            className={`${styles.typeButton} ${isActive ? styles.active : ""}`}
            onClick={() => onTypeChange(type.id as RankingType)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} />
            </div>
            <h3 className={styles.label}>{type.label}</h3>
            <p className={styles.description}>{type.description}</p>
            {isActive && (
              <motion.div
                className={styles.activeBorder}
                layoutId="typeBorder"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
