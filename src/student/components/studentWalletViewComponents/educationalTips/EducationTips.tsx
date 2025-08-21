import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
} from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./EducationTips.module.css";

const EducationalTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "💧 Liquidez",
      concept: "Qué tan fácil puedes usar tu dinero",
      explanation:
        "Las monedas líquidas están disponibles inmediatamente. Las invertidas no, pero crecen con el tiempo.",
      example:
        "Tener 100 monedas en tu billetera = alta liquidez. Tenerlas invertidas = baja liquidez pero más ganancia.",
      color: "#10B981",
    },
    {
      title: "📈 Inversión",
      concept: "Usar dinero para generar más dinero",
      explanation:
        "Cuando inviertes, no puedes usar esas monedas por un tiempo, pero al final tendrás más.",
      example:
        "Inviertes 100 monedas por 1 mes y recibes 110 monedas. ¡Ganaste 10!",
      color: "#3B82F6",
    },
    {
      title: "🎯 Gasto Planificado",
      concept: "Decidir antes de gastar",
      explanation:
        "Planificar tus gastos te ayuda a no quedarte sin monedas cuando las necesites.",
      example:
        "Quieres un avatar que cuesta 200 monedas. Planifica ahorrar 50 monedas por semana durante 4 semanas.",
      color: "#F59E0B",
    },
    {
      title: "🐷 Ahorro",
      concept: "Guardar dinero para el futuro",
      explanation:
        "Ahorrar te permite comprar cosas más caras o tener seguridad para emergencias.",
      example:
        "Ahorras 20 monedas cada semana. En 10 semanas tendrás 200 para algo especial.",
      color: "#8B5CF6",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <Card className={styles.tipsCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <FaGraduationCap className={styles.titleIcon} />
          Aprende Finanzas
        </h3>
        <div className={styles.tipCounter}>
          {currentTip + 1} de {tips.length}
        </div>
      </div>

      <div className={styles.tipContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tipContent}
            style={
              { "--tip-color": tips[currentTip].color } as React.CSSProperties
            }
          >
            <div className={styles.tipHeader}>
              <h4 className={styles.tipTitle}>{tips[currentTip].title}</h4>
              <p className={styles.tipConcept}>{tips[currentTip].concept}</p>
            </div>

            <div className={styles.tipBody}>
              <div className={styles.explanation}>
                <FaLightbulb className={styles.explanationIcon} />
                <p>{tips[currentTip].explanation}</p>
              </div>

              <div className={styles.example}>
                <strong>Ejemplo:</strong>
                <p>{tips[currentTip].example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.tipNavigation}>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevTip}
            className={styles.navButton}
          >
            <FaChevronLeft />
          </Button>
          <div className={styles.tipDots}>
            {tips.map((_, index) => (
              <button
                key={index}
                className={`${styles.tipDot} ${
                  index === currentTip ? styles.active : ""
                }`}
                onClick={() => setCurrentTip(index)}
                style={{
                  backgroundColor:
                    index === currentTip
                      ? tips[currentTip].color
                      : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTip}
            className={styles.navButton}
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EducationalTips;
