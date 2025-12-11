import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Card, Badge } from "@/shared";
import type { FinancialConcept } from "../data";
import { getDifficultyColor } from "../data";
import styles from "./ConceptCard.module.css";

interface ConceptCardProps {
  concept: FinancialConcept;
  onClick: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onClick }) => {
  const Icon = concept.icon;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <Card
        className={styles.conceptCard}
        style={{ "--concept-color": concept.color } as React.CSSProperties}
      >
        <div className={styles.cardHeader}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: `${concept.color}90` }}
          >
            <Icon className={styles.icon} />
          </div>
          <Badge
            variant="secondary"
            className={styles.difficultyBadge}
            style={{ backgroundColor: getDifficultyColor(concept.difficulty) }}
          >
            {concept.difficulty}
          </Badge>
        </div>

        <h3 className={styles.title}>{concept.title}</h3>
        <p className={styles.description}>{concept.description}</p>

        <div className={styles.cardFooter}>
          <span className={styles.learnMore}>
            Aprender más <FaArrowRight />
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default ConceptCard;
