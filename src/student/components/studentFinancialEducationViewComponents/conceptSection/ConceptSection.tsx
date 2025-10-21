import { motion } from "framer-motion";
import ConceptCard from "../conceptCard/ConceptCard";
import ConceptDetail from "../conceptDetail/ConceptDetail";
import styles from "./ConceptSection.module.css";
import type { FinancialConcept } from "../data";

interface ConceptsSectionProps {
  concepts: FinancialConcept[];
  selectedConceptId: string | null;
  onConceptSelect: (id: string | null) => void;
}

const ConceptsSection: React.FC<ConceptsSectionProps> = ({
  concepts,
  selectedConceptId,
  onConceptSelect,
}) => {
  const selectedConcept = concepts.find((c) => c.id === selectedConceptId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={styles.conceptsSection}>
      {!selectedConceptId ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.conceptsGrid}
        >
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              onClick={() => onConceptSelect(concept.id)}
            />
          ))}
        </motion.div>
      ) : selectedConcept ? (
        <ConceptDetail
          concept={selectedConcept}
          onBack={() => onConceptSelect(null)}
        />
      ) : null}
    </div>
  );
};

export default ConceptsSection;
