import { useState } from "react";
import { FaPlay, FaRedo, FaCoins, FaChartLine } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";

import styles from "./InteractiveExample.module.css";
import type { EducationalConcept } from "../../../types/generalType";

interface InteractiveExampleProps {
  concepts: EducationalConcept[];
}

const InteractiveExample: React.FC<InteractiveExampleProps> = () => {
  const [selectedScenario, setSelectedScenario] =
    useState<string>("investment");
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationData, setSimulationData] = useState({
    initialAmount: 100,
    currentAmount: 100,
    timeElapsed: 0,
    totalSteps: 12,
  });

  const scenarios = [
    {
      id: "investment",
      title: "Simulador de Inversión",
      description: "Ve cómo crecen tus monedas con el tiempo",
      icon: "📈",
      color: "#3B82F6",
    },
    {
      id: "savings",
      title: "Plan de Ahorro",
      description: "Alcanza tu meta ahorrando poco a poco",
      icon: "🐷",
      color: "#8B5CF6",
    },
    {
      id: "spending",
      title: "Gasto Inteligente",
      description: "Compara diferentes opciones de compra",
      icon: "🎯",
      color: "#F59E0B",
    },
  ];

  const runSimulation = () => {
    if (simulationStep < simulationData.totalSteps) {
      const newStep = simulationStep + 1;
      const growthRate = selectedScenario === "investment" ? 1.05 : 1.02;
      const newAmount = Math.round(
        simulationData.initialAmount * Math.pow(growthRate, newStep)
      );

      setSimulationStep(newStep);
      setSimulationData((prev) => ({
        ...prev,
        currentAmount: newAmount,
        timeElapsed: newStep,
      }));
    }
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setSimulationData((prev) => ({
      ...prev,
      currentAmount: prev.initialAmount,
      timeElapsed: 0,
    }));
  };

  const progress = (simulationStep / simulationData.totalSteps) * 100;

  return (
    <div className={styles.exampleContainer}>
      <Card className={styles.scenarioSelector}>
        <h3 className={styles.selectorTitle}>Elige un Escenario</h3>
        <div className={styles.scenarioGrid}>
          {scenarios.map((scenario) => (
            <Button
              key={scenario.id}
              variant={selectedScenario === scenario.id ? "primary" : "ghost"}
              onClick={() => setSelectedScenario(scenario.id)}
              className={styles.scenarioButton}
              style={
                { "--scenario-color": scenario.color } as React.CSSProperties
              }
            >
              <div className={styles.scenarioIcon}>{scenario.icon}</div>
              <div className={styles.scenarioInfo}>
                <h4 className={styles.scenarioTitle}>{scenario.title}</h4>
                <p className={styles.scenarioDescription}>
                  {scenario.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      <Card className={styles.simulatorCard}>
        <div className={styles.simulatorHeader}>
          <h3 className={styles.simulatorTitle}>
            {scenarios.find((s) => s.id === selectedScenario)?.icon} Simulación
            Interactiva
          </h3>
          <div className={styles.simulatorControls}>
            <Button
              variant="primary"
              onClick={runSimulation}
              disabled={simulationStep >= simulationData.totalSteps}
              className={styles.controlButton}
            >
              <FaPlay />
              {simulationStep >= simulationData.totalSteps
                ? "Completado"
                : "Siguiente Mes"}
            </Button>
            <Button
              variant="ghost"
              onClick={resetSimulation}
              className={styles.controlButton}
            >
              <FaRedo />
              Reiniciar
            </Button>
          </div>
        </div>

        <div className={styles.simulatorContent}>
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.progressLabels}>
              <span>Mes {simulationData.timeElapsed}</span>
              <span>{simulationData.totalSteps} meses total</span>
            </div>
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <div
                className={styles.resultIcon}
                style={{ backgroundColor: "#10B98120", color: "#10B981" }}
              >
                <FaCoins />
              </div>
              <div className={styles.resultInfo}>
                <span className={styles.resultValue}>
                  {simulationData.initialAmount}
                </span>
                <span className={styles.resultLabel}>Inversión Inicial</span>
              </div>
            </div>

            <div className={styles.resultCard}>
              <div
                className={styles.resultIcon}
                style={{ backgroundColor: "#3B82F620", color: "#3B82F6" }}
              >
                <FaChartLine />
              </div>
              <div className={styles.resultInfo}>
                <span className={styles.resultValue}>
                  {simulationData.currentAmount}
                </span>
                <span className={styles.resultLabel}>Valor Actual</span>
              </div>
            </div>

            <div className={styles.resultCard}>
              <div
                className={styles.resultIcon}
                style={{ backgroundColor: "#8B5CF620", color: "#8B5CF6" }}
              >
                <FaCoins />
              </div>
              <div className={styles.resultInfo}>
                <span className={styles.resultValue}>
                  +{simulationData.currentAmount - simulationData.initialAmount}
                </span>
                <span className={styles.resultLabel}>Ganancia</span>
              </div>
            </div>
          </div>

          <div className={styles.insightBox}>
            <h4 className={styles.insightTitle}>💡 Lo que aprendemos:</h4>
            <p className={styles.insightText}>
              {selectedScenario === "investment" &&
                "Las inversiones crecen con el tiempo gracias al interés compuesto. Mientras más tiempo dejes tu dinero invertido, más crece."}
              {selectedScenario === "savings" &&
                "Ahorrar constantemente, aunque sea poco, te ayuda a alcanzar metas grandes. La constancia es clave."}
              {selectedScenario === "spending" &&
                "Planificar tus gastos te permite tomar mejores decisiones y evitar compras impulsivas que después lamentas."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveExample;
