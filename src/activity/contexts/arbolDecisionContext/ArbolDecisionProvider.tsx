import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArbolDecisionContext } from "./ArbolDecisionContext";
import type { ArbolDecisionContextType } from "./ArbolDecisionContext.type";
import { ArbolDecisionService } from "../../services/arbolDecision/ArbolDecisionService";
import type {
  Consequence,
  ArbolDecisionConfig,
  ArbolDecisionInterface,
  DecisionNode,
  ValidationError,
} from "../../types/ArbolDecision.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";

interface ArbolDecisionProviderProps {
  children: ReactNode;
}

export const ArbolDecisionProvider: React.FC<ArbolDecisionProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<"config" | "preview">(
    "config"
  );
  const [config, setConfig] = useState<ArbolDecisionConfig>({
    introduction: "",
    decisionTree: [
      { name: "", options: [], consecuence: null },
      { name: "", options: [], consecuence: null },
    ],
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // Validación automática cuando cambia la configuración
  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateConfig(config);
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, config]);

  // Función para reiniciar todos los estados
  const resetAllStates = () => {
    setCurrentStep("config");
    setConfig({
      introduction: "",
      decisionTree: [
        { name: "", options: [], consecuence: null },
        { name: "", options: [], consecuence: null },
      ],
    });
    setErrors([]);
  };

  // Determinar si el formulario es válido para envío
  const isFormValid =
    errors.length === 0 && config.introduction.trim().length > 0;

  // Función para registrar el árbol de decisión
  const registrarArbolDecision = async (
    data: ArbolDecisionInterface
  ): Promise<void> => {
    setLoading(true);

    // console.log("=== ÁRBOL DE DECISIÓN DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await ArbolDecisionService.registerArbolDecisionApi(dataMandar);
      resetAllStates();
    } catch (error) {
      console.error("Error al crear la actividad (árbol de decisión):", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para obtener un nodo por path
  const getNodeByPath = (
    tree: DecisionNode[],
    path: number[]
  ): DecisionNode | null => {
    if (path.length === 0) return null;

    let current = tree[path[0]];

    for (let i = 1; i < path.length; i++) {
      if (current && current.options && current.options[path[i]]) {
        current = current.options[path[i]];
      } else {
        return null;
      }
    }

    return current;
  };

  // Función auxiliar para clonar profundamente el árbol
  const deepCloneTree = (tree: DecisionNode[]): DecisionNode[] => {
    return tree.map((node) => ({
      name: node.name,
      options: deepCloneTree(node.options),
      consecuence: node.consecuence ? { ...node.consecuence } : null,
    }));
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: ArbolDecisionConfig) => {
    const validationErrors = validateInitialConfig(newConfig);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setConfig(newConfig);
    setCurrentStep("preview");
    setErrors([]);
  };

  const handleSubmit = async () => {
    const finalValidationErrors = validateConfig(config);
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: ArbolDecisionInterface = {
        introduction: config.introduction.trim(),
        decisionTree: config.decisionTree,
      };

      await registrarArbolDecision(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      showToast({
        title: "Error al crear la actividad",
        message: "Hubo un error al crear la actividad",
        type: "error",
        position: "bottom-right",
      });
      console.error("Error al crear la actividad (no lúdica):", error);
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("config");
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const configForm = document.querySelector("form");
      if (configForm) {
        configForm.requestSubmit();
      }
    }
  };

  const handleReset = () => {
    showConfirmation({
      title: "Reiniciar Actividad",
      message: "¿Está seguro que desea reiniciar la creación de la actividad?",
      type: "warning",
      onConfirm: () => {
        showToast({
          title: "Actividad reiniciada",
          type: "info",
          position: "bottom-right",
        });
        resetAllStates();
      },
    });
  };

  // Funciones de utilidad
  const validateConfig = (
    configToValidate: ArbolDecisionConfig
  ): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    // Validar introducción
    if (!configToValidate.introduction.trim()) {
      validationErrors.push({
        path: [],
        message: "La introducción es obligatoria",
        field: "introduction",
      });
    } else if (configToValidate.introduction.length > 500) {
      validationErrors.push({
        path: [],
        message: "La introducción no puede superar los 500 caracteres",
        field: "introduction",
      });
    }

    // Validar árbol de decisión
    if (configToValidate.decisionTree.length !== 2) {
      validationErrors.push({
        path: [],
        message: "Debe haber exactamente 2 opciones iniciales",
        field: "decisionTree",
      });
    }

    // Validar cada nodo del árbol recursivamente
    const validateNode = (node: DecisionNode, path: number[]) => {
      if (!node.name.trim()) {
        validationErrors.push({
          path,
          message: "El nombre de la decisión es obligatorio",
          field: "name",
        });
      } else if (node.name.length > 200) {
        validationErrors.push({
          path,
          message:
            "El nombre de la decisión no puede superar los 200 caracteres",
          field: "name",
        });
      }

      // Validar que tenga opciones O consecuencia, no ambas ni ninguna
      const hasOptions = node.options.length > 0;
      const hasConsequence = node.consecuence !== null;

      if (!hasOptions && !hasConsequence) {
        validationErrors.push({
          path,
          message: "Debe tener opciones o una consecuencia",
          field: "content",
        });
      }

      if (hasOptions && hasConsequence) {
        validationErrors.push({
          path,
          message: "No puede tener opciones y consecuencia al mismo tiempo",
          field: "content",
        });
      }

      // Si tiene opciones, debe tener exactamente 2
      if (hasOptions && node.options.length !== 2) {
        validationErrors.push({
          path,
          message: "Debe tener exactamente 2 opciones",
          field: "options",
        });
      }

      // Validar consecuencia si existe
      if (hasConsequence && node.consecuence) {
        if (!node.consecuence.name.trim()) {
          validationErrors.push({
            path,
            message: "El nombre de la consecuencia es obligatorio",
            field: "consecuence.name",
          });
        } else if (node.consecuence.name.length > 200) {
          validationErrors.push({
            path,
            message:
              "El nombre de la consecuencia no puede superar los 200 caracteres",
            field: "consecuence.name",
          });
        }
      }

      // Validar opciones recursivamente
      node.options.forEach((option, index) => {
        validateNode(option, [...path, index]);
      });
    };

    configToValidate.decisionTree.forEach((node, index) => {
      validateNode(node, [index]);
    });

    return validationErrors;
  };

  const validateInitialConfig = (
    configToValidate: ArbolDecisionConfig
  ): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    // Validar solo que la introducción no esté completamente vacía
    if (!configToValidate.introduction.trim()) {
      validationErrors.push({
        path: [],
        message: "La introducción es obligatoria para continuar",
        field: "introduction",
      });
    }

    if (configToValidate.introduction.length > 500) {
      validationErrors.push({
        path: [],
        message: "La introducción no puede superar los 500 caracteres",
        field: "introduction",
      });
    }

    // Validar que haya exactamente 2 opciones iniciales
    if (configToValidate.decisionTree.length !== 2) {
      validationErrors.push({
        path: [],
        message: "Debe haber exactamente 2 opciones iniciales",
        field: "decisionTree",
      });
    }

    // Validación básica de nodos - solo verificar que al menos uno tenga nombre
    let hasAtLeastOneValidNode = false;

    configToValidate.decisionTree.forEach((node) => {
      if (node.name.trim()) {
        hasAtLeastOneValidNode = true;
      }
    });

    if (!hasAtLeastOneValidNode) {
      validationErrors.push({
        path: [],
        message: "Al menos una de las opciones iniciales debe tener un nombre",
        field: "decisionTree",
      });
    }

    return validationErrors;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Configuración de Actividad";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad Árbol de Decisión";
    }
  };

  const getCurrentStepNumber = () => (currentStep === "config" ? 1 : 2);

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Define la situación inicial y construye un árbol de decisiones interactivo para que los estudiantes exploren diferentes caminos.";
      case "preview":
        return "Esta es una simulación de cómo los estudiantes experimentarán tu árbol de decisión.";
      default:
        return "";
    }
  };

  // Funciones específicas de arbolDecision
  const updateNodeName = (path: number[], name: string) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      newConfig.decisionTree = deepCloneTree(newConfig.decisionTree);

      const targetNode = getNodeByPath(newConfig.decisionTree, path);
      if (targetNode) {
        targetNode.name = name;
      }

      return newConfig;
    });
  };

  const addSubOptions = (path: number[]) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      newConfig.decisionTree = deepCloneTree(newConfig.decisionTree);

      const targetNode = getNodeByPath(newConfig.decisionTree, path);
      if (targetNode) {
        targetNode.options = [
          { name: "", options: [], consecuence: null },
          { name: "", options: [], consecuence: null },
        ];
        targetNode.consecuence = null;
      }

      return newConfig;
    });
  };

  const addConsequence = (path: number[]) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      newConfig.decisionTree = deepCloneTree(newConfig.decisionTree);

      const targetNode = getNodeByPath(newConfig.decisionTree, path);
      if (targetNode) {
        targetNode.consecuence = { name: "", approvesActivity: true };
        targetNode.options = [];
      }

      return newConfig;
    });
  };

  const removeContent = (path: number[]) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      newConfig.decisionTree = deepCloneTree(newConfig.decisionTree);

      const targetNode = getNodeByPath(newConfig.decisionTree, path);
      if (targetNode) {
        targetNode.options = [];
        targetNode.consecuence = null;
      }

      return newConfig;
    });
  };

  const updateConsequence = (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig };
      newConfig.decisionTree = deepCloneTree(newConfig.decisionTree);

      const targetNode = getNodeByPath(newConfig.decisionTree, path);
      if (targetNode && targetNode.consecuence) {
        if (field === "name" && typeof value === "string") {
          targetNode.consecuence.name = value;
        } else if (field === "approvesActivity" && typeof value === "boolean") {
          targetNode.consecuence.approvesActivity = value;
        }
      }

      return newConfig;
    });
  };

  const contextValue: ArbolDecisionContextType = {
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,

    // Funciones principales
    registrarArbolDecision,

    // Handlers principales
    handleConfigSubmit,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    validateConfig,
    validateInitialConfig,
    getStepTitle,
    getCurrentStepNumber,
    getStepDescription,

    // Funciones específicas de arbolDecision
    updateNodeName,
    addSubOptions,
    addConsequence,
    removeContent,
    updateConsequence,
  };

  return (
    <ArbolDecisionContext.Provider value={contextValue}>
      {children}
    </ArbolDecisionContext.Provider>
  );
};
