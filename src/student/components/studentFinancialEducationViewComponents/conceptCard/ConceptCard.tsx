import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import type { EducationalConcept } from "../../../types/generalType";
import styles from "./ConceptCard.module.css";

interface ConceptCardProps {
  concept: EducationalConcept;
  isSelected: boolean;
  onClick: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  concept,
  isSelected,
  onClick,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "#10B981";
      case "Intermedio":
        return "#F59E0B";
      case "Avanzado":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`${styles.conceptCard} ${isSelected ? styles.selected : ""}`}
      >
        <div className={styles.cardHeader} onClick={onClick}>
          <div className={styles.conceptIcon}>{concept.icon}</div>
          <div className={styles.headerContent}>
            <h3 className={styles.conceptTitle}>{concept.title}</h3>
            <Badge
              variant="secondary"
              className={`${styles.difficultyBadge} `}
              //   style={{
              //     backgroundColor: getDifficultyColor(concept.difficulty),
              //   }}
            >
              {concept.difficulty}
            </Badge>
          </div>
          <div className={styles.expandIcon}>
            {isSelected ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        <div className={styles.conceptDescription}>
          <p>{concept.description}</p>
        </div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.expandedContent}
            >
              <div className={styles.exampleSection}>
                <h4 className={styles.exampleTitle}>💡 Ejemplo Práctico</h4>
                <p className={styles.exampleText}>{concept.example}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
