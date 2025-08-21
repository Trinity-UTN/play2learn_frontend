import type React from "react";
import { useState } from "react";
import { FaPlay, FaSync, FaCoins, FaChartLine } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./InteractiveExample.module.css";

const InteractiveExample = () => {
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
  ];

  const results = [
    {
      id: 1,
      backgroundColor: "#b0f3dd99",
      color: "#05b63aff",
      icon: <FaCoins />,
      simulationData: simulationData.initialAmount,
      name: "Inversión Inicial",
    },
    {
      id: 4,
      backgroundColor: "#fc393976",
      color: "#ff0505ff",
      icon: <FaChartLine />,
      simulationData: selectedScenario === "investment" ? "5%" : "2%",
      name:
        selectedScenario === "investment" ? "% Mensual" : "% De Ahorro Mensual",
    },
    {
      id: 2,
      backgroundColor: "#99c0fed6",
      color: "#094bb5ff",
      icon: <FaChartLine />,
      simulationData: simulationData.currentAmount,
      name: "Valor Actual",
    },
    {
      id: 3,
      backgroundColor: "#bda3f7d7",
      color: "#6a2affff",
      icon: <FaCoins />,
      simulationData:
        simulationData.currentAmount - simulationData.initialAmount,
      name: "Ganancia",
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
              variant={"ghost"}
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
              variant="ghost"
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
              <FaSync />
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
            {results.map((result) => (
              <div className={styles.resultCard} key={result.id}>
                <div
                  className={styles.resultIcon}
                  style={{
                    backgroundColor: result.backgroundColor,
                    color: result.color,
                  }}
                >
                  {result.icon}
                </div>
                <div className={styles.resultInfo}>
                  <span
                    className={styles.resultValue}
                    style={{ color: result.color }}
                  >
                    {result.simulationData}
                  </span>
                  <span className={styles.resultLabel}>{result.name}</span>
                </div>
              </div>
            ))}
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
