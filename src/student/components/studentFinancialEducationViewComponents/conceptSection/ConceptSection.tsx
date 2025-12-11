import { motion } from "framer-motion";
import ConceptCard from "../conceptCard/ConceptCard";
import ConceptDetail from "../conceptDetail/ConceptDetail";
import { categories, type FinancialConcept } from "../data";
import { useMemo, useState } from "react";
import styles from "./ConceptSection.module.css";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const filteredConcepts = useMemo(() => {
    return selectedCategory
      ? concepts.filter((c) => c.categoria === selectedCategory)
      : concepts;
  }, [concepts, selectedCategory]);

  return (
    <div className={styles.conceptsSection}>
      <div className={styles.filterContainer}>
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {!selectedConceptId ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.conceptsGrid}
        >
          {filteredConcepts.map((concept) => (
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
