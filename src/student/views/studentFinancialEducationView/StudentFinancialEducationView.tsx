import { useState } from "react";
import { motion } from "framer-motion";
import EducationHeader from "../../components/studentFinancialEducationViewComponents/educationHeader/EducationHeader";
import NavigationTabs from "../../components/studentFinancialEducationViewComponents/navigationTabs/NavigationTabs";
import ConceptsSection from "../../components/studentFinancialEducationViewComponents/conceptSection/ConceptSection";
// import InteractiveSimulator
import QuizSection from "../../components/studentFinancialEducationViewComponents/quizSection/QuizSection";
import { financialConcepts } from "../../components/studentFinancialEducationViewComponents/data";
import styles from "./StudentFinancialEducationView.module.css";
import BackButton from "../../../shared/components/BackButton/BackButton";

type TabSection = "concepts" | "quiz";

const StudentFinancialEducationView = () => {
  const [currentSection, setCurrentSection] = useState<TabSection>("concepts");
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(
    null
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.education}
    >
      <motion.div
        variants={itemVariants}
        className={styles.backButtonContainer}
      >
        <BackButton />
      </motion.div>

      <EducationHeader />

      <NavigationTabs
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      <div className={styles.content}>
        {currentSection === "concepts" && (
          <motion.div variants={itemVariants}>
            <ConceptsSection
              concepts={financialConcepts}
              selectedConceptId={selectedConceptId}
              onConceptSelect={setSelectedConceptId}
            />
          </motion.div>
        )}

        {currentSection === "quiz" && (
          <motion.div variants={itemVariants}>
            <QuizSection concepts={financialConcepts} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentFinancialEducationView;
