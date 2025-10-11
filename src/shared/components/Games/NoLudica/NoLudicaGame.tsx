import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaFileAlt, FaLink, FaEdit, FaUpload } from "react-icons/fa";
import { useCreateNoLudica } from "../../../../activity/hooks/useCreateNoLudica";
import { useNoLudicaGame } from "../../../hooks/games/useNoLudicaGame";
import styles from "./NoLudicaGame.module.css";

interface NoLudicaGameProps {
  mode?: "preview" | "student";
}
const NoLudicaGame = ({ mode }: NoLudicaGameProps) => {
  const { config, getTipoEntregaOptions } = useCreateNoLudica();
  const {
    gameConfig,
    startGame,
    gameStarted,
    studentResponse,
    setStudentResponse,
    selectedFile,
    setSelectedFile,
  } = useNoLudicaGame();

  const [linkUrl, setLinkUrl] = useState("");
  const tipoEntregaOptions = getTipoEntregaOptions();
  const selectedOption = tipoEntregaOptions.find(
    (opt) => opt.value === config.tipoEntrega
  );
  useEffect(() => {
    if (!gameStarted) {
      startGame();
    }
  }, []);
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getResponseIcon = () => {
    switch (config.tipoEntrega) {
      case "ENTREGA":
        return <FaFileAlt />;
      case "ENLACE":
        return <FaLink />;
      case "TEXTO":
        return <FaEdit />;
      default:
        return <FaEdit />;
    }
  };

  const renderResponseInput = () => {
    switch (config.tipoEntrega) {
      case "TEXTO":
        return <div></div>;

      case "ENTREGA":
        return (
          <div className={styles.responseInput}>
            <label className={styles.inputLabel}>Subir archivo:</label>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileSelect}
                className={styles.fileInput}
                accept={selectedOption?.acceptedFormats?.join(",")}
              />
              <label htmlFor="file-upload" className={styles.fileUploadLabel}>
                <FaUpload className={styles.uploadIcon} />
                <span>
                  {selectedFile ? selectedFile.name : "Seleccionar archivo"}
                </span>
              </label>
              {selectedOption?.acceptedFormats && (
                <div className={styles.acceptedFormats}>
                  Formatos aceptados:{" "}
                  {selectedOption.acceptedFormats.join(", ")}
                </div>
              )}
            </div>
          </div>
        );

      case "ENLACE":
        return (
          <div className={styles.responseInput}>
            <label className={styles.inputLabel}>Enlace:</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className={styles.urlInput}
              placeholder={
                selectedOption?.placeholder || "https://ejemplo.com/mi-trabajo"
              }
            />
            <div className={styles.urlHint}>
              Asegúrate de incluir http:// o https://
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <div className={styles.activityTitle}>
            <FaEye className={styles.activityIcon} />
            <h4>Actividad No Lúdica</h4>
          </div>
          <div className={styles.deliveryType}>
            {getResponseIcon()}
            <span>{selectedOption?.label}</span>
          </div>
        </div>

        <div className={styles.assignmentCard}>
          <div className={styles.assignmentHeader}>
            <h5 className={styles.assignmentTitle}>Consigna:</h5>
          </div>
          <div className={styles.assignmentContent}>
            <p className={styles.assignmentText}>
              {mode === "preview" ? config.excercise : gameConfig?.excercise}
            </p>
          </div>
        </div>

        <div className={styles.responseSection}>
          <div className={styles.responseSectionHeader}>
            <h5 className={styles.responseSectionTitle}>Tu Entrega</h5>
            <div className={styles.responseTypeInfo}>
              {getResponseIcon()}

              <span>
                {mode === "preview"
                  ? selectedOption?.description
                  : "Suba su entrega"}{" "}
              </span>
            </div>
          </div>
          <div className={styles.responseInput}>
            <label className={styles.inputLabel}>Tu respuesta:</label>
            <textarea
              value={studentResponse}
              onChange={(e) => setStudentResponse(e.target.value)}
              className={styles.textArea}
              placeholder={
                selectedOption?.placeholder || "Escribe tu respuesta aquí..."
              }
              rows={6}
            />
            <div className={styles.charCount}>
              {studentResponse.length} caracteres
            </div>
          </div>
          {renderResponseInput()}
        </div>
      </div>
    </motion.div>
  );
};

export default NoLudicaGame;
