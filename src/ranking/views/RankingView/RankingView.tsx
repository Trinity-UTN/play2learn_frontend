import { motion, AnimatePresence } from "framer-motion";
import {
  RankingBoard,
  CategorySelector,
  RankingHeader,
  RankingTypeSelector,
  SubjectSelector,
} from "@/ranking";
import { useRankingView } from "../../hooks/useRankingView";
import styles from "./RankingView.module.css";
// Mock data para desarrollo

export const StudentRankingView = () => {
  const {
    loading,
    ranking,
    category,
    selectedType,
    subjects,
    subjectId,
    requiresSubject,
    handleCategoryChange,
    handleTypeChange,
    setSubjectId,
  } = useRankingView();

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <RankingHeader />

        <CategorySelector
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />

        <RankingTypeSelector
          category={category}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
        <AnimatePresence mode="wait">
          {requiresSubject && (
            <SubjectSelector
              subjects={subjects}
              selectedSubjectId={subjectId}
              onSubjectChange={setSubjectId}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.loadingContainer}
            >
              <div className={styles.spinner} />
              <p>Cargando ranking...</p>
            </motion.div>
          ) : ranking ? (
            <RankingBoard
              key={selectedType}
              data={ranking}
              category={category}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
