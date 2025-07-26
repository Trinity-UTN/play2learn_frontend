import { useState } from "react";
import type {
  AhorcadoInterface,
  AhorcadoErrors,
} from "../../types/Ahorcado.type";
import styles from "./CreateAhorcado.module.css";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaEye,
  FaEdit,
  FaSave,
  FaUndo,
  FaLightbulb,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaHashtag,
  FaKeyboard,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import { useAhorcado } from "../../hooks/useAhorcado";
const CreateAhorcado = () => {
  const [ahorcadoData, setAhorcadoData] = useState<AhorcadoInterface>({
    word: "",
    errorsPermited: "6",
    attempts: 1,
  });
  const [errors, setErrors] = useState<Partial<AhorcadoErrors>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const { registerAhorcado } = useAhorcado();

  const validateForm = (): boolean => {
    const newErrors: Partial<AhorcadoErrors> = {};

    if (!ahorcadoData.word.trim()) {
      newErrors.word = "La palabra es requerida";
    } else if (ahorcadoData.word.length < 3) {
      newErrors.word = "La palabra debe tener al menos 3 caracteres";
    } else if (ahorcadoData.word.length > 15) {
      newErrors.word = "La palabra no puede tener más de 15 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(ahorcadoData.word)) {
      newErrors.word = "La palabra solo puede contener letras";
    }

    const errorsNum = parseInt(ahorcadoData.errorsPermited);
    if (isNaN(errorsNum) || errorsNum < 1 || errorsNum > 10) {
      newErrors.errorsPermited =
        "Los errores permitidos deben estar entre 1 y 10";
    }

    if (ahorcadoData.attempts < 1 || ahorcadoData.attempts > 5) {
      newErrors.attempts = "Los intentos deben estar entre 1 y 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof AhorcadoInterface,
    value: string | number
  ) => {
    setAhorcadoData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Guardando juego del ahorcado:", ahorcadoData);
      registerAhorcado(ahorcadoData);
    }
  };

  const handleReset = () => {
    setAhorcadoData({
      word: "",
      errorsPermited: "6",
      attempts: 1,
    });
    setErrors({});
    setGuessedLetters([]);
    setCurrentGuess("");
  };

  const renderHangman = (errors: number) => {
    const parts = [
      "  +---+",
      "  |   |",
      errors >= 1 ? "  O   |" : "      |",
      errors >= 3 ? " /|\\  |" : errors >= 2 ? " /|   |" : "      |",
      errors >= 5 ? " / \\  |" : errors >= 4 ? " /    |" : "      |",
      "      |",
      "=========",
    ];
    return parts.join("\n");
  };

  const renderWordDisplay = () => {
    if (!ahorcadoData.word) return "_ _ _ _ _";

    return ahorcadoData.word
      .split("")
      .map((letter) =>
        guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
      )
      .join(" ");
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const difficultyLevels = [
    { errors: "3", label: "Difícil", color: "#ef4444" },
    { errors: "6", label: "Medio", color: "#f59e0b" },
    { errors: "9", label: "Fácil", color: "#10b981" },
  ];

  const wordSuggestions = [
    "MATEMATICAS",
    "CIENCIA",
    "HISTORIA",
    "GEOGRAFIA",
    "LITERATURA",
    "QUIMICA",
    "FISICA",
    "BIOLOGIA",
    "ALGEBRA",
    "GEOMETRIA",
  ];
  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaGamepad className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Juego del Ahorcado</h1>
            <p className={styles.subtitle}>
              Configura una nueva actividad de ahorcado para tus estudiantes
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant={isPreviewMode ? "secondary" : "primary"}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={styles.toggleButton}
          >
            {isPreviewMode ? <FaEdit /> : <FaEye />}
            {isPreviewMode ? "Editar" : "Vista Previa"}
          </Button>
        </div>
      </motion.div>

      <div className={styles.content}>
        {!isPreviewMode ? (
          <>
            {/* Configuración del Juego */}
            <motion.div variants={itemVariants}>
              <Card className={styles.configCard}>
                <div className={styles.cardHeader}>
                  <FaKeyboard className={styles.cardIcon} />
                  <h2 className={styles.cardTitle}>
                    Configuración de la Palabra
                  </h2>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Palabra a Adivinar
                    <span className={styles.required}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={ahorcadoData.word}
                    onChange={(e) =>
                      handleInputChange("word", e.target.value.toUpperCase())
                    }
                    placeholder="Ingresa la palabra (ej: MATEMATICAS)"
                    error={errors.word}
                    className={styles.wordInput}
                  />
                  <div className={styles.inputHelper}>
                    <span className={styles.charCount}>
                      {ahorcadoData.word.length}/15 caracteres
                    </span>
                    {ahorcadoData.word && (
                      <span className={styles.wordLength}>
                        Longitud: {ahorcadoData.word.length} letras
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.suggestions}>
                  <label className={styles.suggestionsLabel}>
                    <FaLightbulb className={styles.suggestionIcon} />
                    Sugerencias de palabras:
                  </label>
                  <div className={styles.suggestionsList}>
                    {wordSuggestions.map((word) => (
                      <button
                        key={word}
                        className={styles.suggestionButton}
                        onClick={() => handleInputChange("word", word)}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Configuración de Dificultad */}
            <motion.div variants={itemVariants}>
              <Card className={styles.difficultyCard}>
                <div className={styles.cardHeader}>
                  <FaExclamationTriangle className={styles.cardIcon} />
                  <h2 className={styles.cardTitle}>Nivel de Dificultad</h2>
                </div>

                <div className={styles.difficultyGrid}>
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.errors}
                      className={`${styles.difficultyButton} ${
                        ahorcadoData.errorsPermited === level.errors
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleInputChange("errorsPermited", level.errors)
                      }
                      style={{ borderColor: level.color }}
                    >
                      <div
                        className={styles.difficultyColor}
                        style={{ backgroundColor: level.color }}
                      />
                      <div className={styles.difficultyInfo}>
                        <span className={styles.difficultyLabel}>
                          {level.label}
                        </span>
                        <span className={styles.difficultyErrors}>
                          {level.errors} errores permitidos
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className={styles.customDifficulty}>
                  <label className={styles.label}>
                    Errores Permitidos (Personalizado)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={ahorcadoData.errorsPermited}
                    onChange={(e) =>
                      handleInputChange("errorsPermited", e.target.value)
                    }
                    error={errors.errorsPermited}
                    className={styles.numberInput}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Configuración de Intentos */}
            <motion.div variants={itemVariants}>
              <Card className={styles.attemptsCard}>
                <div className={styles.cardHeader}>
                  <FaClock className={styles.cardIcon} />
                  <h2 className={styles.cardTitle}>
                    Configuración de Intentos
                  </h2>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Número de Intentos por Estudiante
                    <span className={styles.required}>*</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={ahorcadoData.attempts}
                    onChange={(e) =>
                      handleInputChange(
                        "attempts",
                        parseInt(e.target.value) || 1
                      )
                    }
                    error={errors.attempts}
                    className={styles.numberInput}
                  />
                  <div className={styles.inputHelper}>
                    <span className={styles.attemptsInfo}>
                      Los estudiantes podrán jugar {ahorcadoData.attempts}{" "}
                      {ahorcadoData.attempts === 1 ? "vez" : "veces"}
                    </span>
                  </div>
                </div>

                <div className={styles.attemptsButtons}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`${styles.attemptButton} ${
                        ahorcadoData.attempts === num ? styles.active : ""
                      }`}
                      onClick={() => handleInputChange("attempts", num)}
                    >
                      <FaHashtag className={styles.attemptIcon} />
                      {num} {num === 1 ? "intento" : "intentos"}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </>
        ) : (
          /* Vista Previa del Juego */
          <motion.div variants={itemVariants}>
            <Card className={styles.previewCard}>
              <div className={styles.cardHeader}>
                <FaGamepad className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Vista Previa del Juego</h2>
                <Badge variant="success" className={styles.previewBadge}>
                  <FaCheckCircle />
                  Configuración Lista
                </Badge>
              </div>

              <div className={styles.gamePreview}>
                <div className={styles.hangmanDisplay}>
                  <pre className={styles.hangmanArt}>
                    {renderHangman(guessedLetters.length)}
                  </pre>
                </div>

                <div className={styles.gameInfo}>
                  <div className={styles.wordDisplay}>
                    <h3 className={styles.wordTitle}>Palabra a Adivinar:</h3>
                    <div className={styles.wordLetters}>
                      {renderWordDisplay()}
                    </div>
                  </div>

                  <div className={styles.gameStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>
                        Errores Permitidos:
                      </span>
                      <span className={styles.statValue}>
                        {ahorcadoData.errorsPermited}
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>
                        Intentos Disponibles:
                      </span>
                      <span className={styles.statValue}>
                        {ahorcadoData.attempts}
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>
                        Longitud de Palabra:
                      </span>
                      <span className={styles.statValue}>
                        {ahorcadoData.word.length} letras
                      </span>
                    </div>
                  </div>

                  <div className={styles.previewControls}>
                    <Input
                      type="text"
                      maxLength={1}
                      value={currentGuess}
                      onChange={(e) =>
                        setCurrentGuess(e.target.value.toUpperCase())
                      }
                      placeholder="Letra"
                      className={styles.guessInput}
                    />
                    <Button
                      onClick={() => {
                        if (
                          currentGuess &&
                          !guessedLetters.includes(currentGuess.toLowerCase())
                        ) {
                          setGuessedLetters((prev) => [
                            ...prev,
                            currentGuess.toLowerCase(),
                          ]);
                          setCurrentGuess("");
                        }
                      }}
                      disabled={!currentGuess}
                      className={styles.guessButton}
                    >
                      Probar Letra
                    </Button>
                  </div>

                  {guessedLetters.length > 0 && (
                    <div className={styles.guessedLetters}>
                      <span className={styles.guessedLabel}>
                        Letras probadas:
                      </span>
                      <div className={styles.lettersList}>
                        {guessedLetters.map((letter, index) => (
                          <span
                            key={index}
                            className={`${styles.guessedLetter} ${
                              ahorcadoData.word.toLowerCase().includes(letter)
                                ? styles.correct
                                : styles.incorrect
                            }`}
                          >
                            {letter.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Botones de Acción */}
      <motion.div variants={itemVariants} className={styles.footer}>
        <div className={styles.footerActions}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            <FaUndo />
            Reiniciar
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!ahorcadoData.word || Object.keys(errors).length > 0}
            className={styles.saveButton}
          >
            <FaSave />
            Guardar Juego
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default CreateAhorcado;
