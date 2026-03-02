import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { useCreateNoLudica } from "../../../../activity/hooks/useCreateNoLudica";
import { useNoLudicaGame } from "../../../hooks/games/useNoLudicaGame";
import MDEditor from "@uiw/react-md-editor";
import styles from "./NoLudicaGame.module.css";

interface NoLudicaGameProps {
  mode?: "preview" | "student";
}

const NoLudicaGame = ({ mode }: NoLudicaGameProps) => {
  const { config } = useCreateNoLudica();
  const {
    gameConfig,
    startGame,
    gameStarted,
    studentResponse,
    setStudentResponse,
  } = useNoLudicaGame();

  useEffect(() => {
    if (!gameStarted) {
      startGame();
    }
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <div className={styles.activityTitle}>
            <FaEye className={styles.activityIcon} />
            <h4>Actividad No Lúdica</h4>
          </div>
        </div>

        <div className={styles.assignmentCard}>
          <div className={styles.assignmentHeader}>
            <h5 className={styles.assignmentTitle}>Consigna:</h5>
          </div>
          <div className={styles.assignmentContent}>
            <p className={styles.assignmentText}>
              {mode === "preview" ? config.exercise : gameConfig?.exercise}
            </p>
          </div>
        </div>

        <div className={styles.responseSection}>
          <div className={styles.responseSectionHeader}>
            <h5 className={styles.responseSectionTitle}>Tu Entrega</h5>
          </div>
          <div className={styles.responseInput}>
            <label className={styles.inputLabel}>Tu respuesta:</label>
            <MDEditor
              className={styles.textArea}
              value={studentResponse}
              onChange={(val) => {
                if (!val) return setStudentResponse("");
                if (val.length <= 1000) setStudentResponse(val);
              }}
              height={350}
            />
            <div className={styles.charCount}>
              {studentResponse.length}/1000 caracteres
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoLudicaGame;
