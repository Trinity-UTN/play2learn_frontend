import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import styles from "./SubjectSelector.module.css";
import type { SubjectResponseDto } from "../../../admin/services/subject/SubjectService";

interface SubjectSelectorProps {
  subjects: SubjectResponseDto[];
  selectedSubjectId: number | undefined;
  onSubjectChange: (subjectId: number) => void;
}

export const SubjectSelector = ({
  subjects,
  selectedSubjectId,
  onSubjectChange,
}: SubjectSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height: isOpen ? "550px" : "auto" }}
    >
      <div className={styles.label}>
        <FaBook className={styles.labelIcon} />
        <span>Selecciona una materia</span>
      </div>

      <div className={styles.selectWrapper}>
        <button
          className={styles.selectButton}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <div className={styles.selectContent}>
            {selectedSubject ? (
              <>
                <span className={styles.subjectName}>
                  {selectedSubject.name}
                </span>
                <span className={styles.subjectCourse}>
                  {selectedSubject.course.name}
                </span>
              </>
            ) : (
              <span className={styles.placeholder}>
                Selecciona una materia...
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown className={styles.chevron} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdown}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {subjects.map((subject, index) => (
                <motion.button
                  key={subject.id}
                  className={`${styles.option} ${
                    selectedSubjectId === subject.id ? styles.selected : ""
                  }`}
                  onClick={() => {
                    onSubjectChange(subject.id);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  type="button"
                >
                  <div className={styles.optionContent}>
                    <span className={styles.optionName}>{subject.name}</span>
                    <div className={styles.optionDetails}>
                      <span className={styles.optionCourse}>
                        {subject.course.name}
                      </span>
                      <span className={styles.optionDivider}>•</span>
                      <span className={styles.optionTeacher}>
                        {subject.teacher.name} {subject.teacher.lastname}
                      </span>
                    </div>
                  </div>
                  {selectedSubjectId === subject.id && (
                    <motion.div
                      className={styles.checkmark}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
