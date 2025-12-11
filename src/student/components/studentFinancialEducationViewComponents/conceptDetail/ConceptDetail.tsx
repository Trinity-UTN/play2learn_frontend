import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { Card, Button, Badge } from "@/shared";
import type { FinancialConcept } from "../data";
import { getDifficultyColor } from "../data";
import styles from "./ConceptDetail.module.css";
import { ImBook } from "react-icons/im";
import { useEffect } from "react";

interface ConceptDetailProps {
  concept: FinancialConcept;
  onBack: () => void;
}

const ConceptDetail: React.FC<ConceptDetailProps> = ({ concept, onBack }) => {
  const Icon = concept.icon;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={styles.detailContainer}
    >
      <Button variant="ghost" onClick={onBack} className={styles.backButton}>
        <FaArrowLeft />
        Volver a conceptos
      </Button>

      <Card className={styles.detailCard}>
        <div className={styles.header}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: `${concept.color}80` }}
          >
            <Icon className={styles.icon} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{concept.title}</h1>
            <Badge
              variant="secondary"
              className={styles.difficultyBadge}
              style={{
                backgroundColor: getDifficultyColor(concept.difficulty),
              }}
            >
              Nivel {concept.difficulty}
            </Badge>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>¿Qué es?</h2>
            <p className={styles.text}>{concept.detailedExplanation}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaCheckCircle className={styles.sectionIcon} />
              Ejemplos Prácticos
            </h2>
            <div className={styles.examplesList}>
              {concept.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.exampleItem}
                >
                  <div className={styles.exampleNumber}>{index + 1}</div>
                  <p className={styles.exampleText}>{example}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FaLightbulb className={styles.sectionIcon} />
              Consejos Prácticos
            </h2>
            <div className={styles.tipsList}>
              {concept.practicalTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.tipItem}
                >
                  <FaCheckCircle className={styles.tipIcon} />
                  <p className={styles.tipText}>{tip}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ImBook className={styles.sectionIcon} />
              Bibliografia
            </h2>
            <div className={styles.tipsList}>{concept.bibliografia}</div>
          </section>
        </div>
      </Card>
    </motion.div>
  );
};

export default ConceptDetail;
