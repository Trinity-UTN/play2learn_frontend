import { useState, useEffect } from "react";
import type {
  ConfigurationActivity,
  ConfigurationErrors,
} from "../../types/Configuration.type";
import { useSubject } from "@/admin";
import { activityDraftKey, getItem, removeItem, setItem } from "@/shared";
import { useActividadCreada } from "../useActividadCreada";
import { actividadGeneralMapper } from "@/activity/utils/actividadGeneralMapper";

export const useConfigurationForm = (activityCode?: string, id?: string) => {
  const { subjects } = useSubject();
  const { actividadCreada, getActividadCreada } = useActividadCreada();

  const [configuration, setConfiguration] = useState<ConfigurationActivity>({
    description: "",
    startDate: "",
    publishNow: false,
    endDate: "",
    difficulty: "",
    maxTime: 30,
    subjectId: 0,
    attempts: 1,
    initialBalance: 0,
    typeReward: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ConfigurationErrors>({});

  // Cargar configuración guardada al montar el componente
  useEffect(() => {
    if (activityCode) {
      const savedConfig = loadConfiguration(activityCode);
      if (savedConfig) {
        setConfiguration(savedConfig);
      }
    }
    if (actividadCreada && id) {
      const config = actividadGeneralMapper(actividadCreada);
      setConfiguration(config);
    }
  }, [activityCode, actividadCreada]);

  useEffect(() => {
    if (id) getActividadCreada(Number(id));
  }, [id]);

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    if (activityCode && configuration.description) {
      saveConfiguration(activityCode, configuration);
    }
  }, [configuration, activityCode]);

  const handleChange = (
    field: keyof ConfigurationActivity,
    value: string | number | boolean,
  ) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error al escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const getSelectedSubject = () => {
    return subjects.find((s) => s.id === configuration.subjectId);
  };

  const getMaximumInitialBalance = () => {
    const selected = getSelectedSubject();
    return selected ? Math.floor(selected.initialBalance * 0.3) : 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ConfigurationErrors> = {};

    if (!configuration.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (configuration.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    } else if (configuration.description.length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }

    if (!configuration.publishNow && !configuration.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida";
    } else if (
      configuration.startDate &&
      new Date(configuration.startDate) < new Date()
    ) {
      newErrors.startDate = "La fecha de inicio no puede ser en el pasado";
    }

    if (!configuration.endDate) {
      newErrors.endDate = "La fecha de fin es requerida";
    } else if (
      configuration.startDate &&
      new Date(configuration.endDate) <= new Date(configuration.startDate)
    ) {
      newErrors.endDate =
        "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    if (!configuration.difficulty) {
      newErrors.difficulty = "La dificultad es requerida";
    }

    if (configuration.maxTime <= 0) {
      newErrors.maxTime = "El tiempo máximo debe ser mayor a 0";
    } else if (configuration.maxTime > 180) {
      newErrors.maxTime = "El tiempo máximo no puede exceder 180 minutos";
    }

    if (configuration.subjectId === 0) {
      newErrors.subjectId = "Debe seleccionar una materia";
    }

    if (configuration.attempts <= 0) {
      newErrors.attempts = "El número de intentos debe ser mayor a 0";
    } else if (configuration.attempts > 10) {
      newErrors.attempts = "El número de intentos no puede exceder 10";
    }

    const subject = getSelectedSubject();
    const actualBalance = subject?.actualBalance || 0;
    const maxBalance = getMaximumInitialBalance();

    if (subject && configuration.initialBalance <= 0) {
      newErrors.initialBalance = "El balance inicial debe ser mayor a 0";
    }

    if (configuration.initialBalance > actualBalance) {
      newErrors.initialBalance =
        "El balance inicial supera el balance actual de la materia";
    }

    if (configuration.initialBalance > maxBalance) {
      newErrors.initialBalance = `No puede superar el 30% del balance actual (máximo: ${maxBalance})`;
    }

    if (!configuration.typeReward) {
      newErrors.typeReward = "Debe seleccionar una estrategia de distribución";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    const newConfig = {
      description: "",
      startDate: new Date().toISOString().slice(0, 16),
      endDate: "",
      difficulty: "",
      maxTime: 30,
      subjectId: 0,
      attempts: 1,
      initialBalance: 0,
      typeReward: "",
    };

    setConfiguration(newConfig);
    setErrors({});

    // Limpiar localStorage
    if (activityCode) {
      clearConfiguration(activityCode);
    }
  };

  const saveConfiguration = (code: string, config: ConfigurationActivity) => {
    setItem(activityDraftKey(code), config);
  };

  const loadConfiguration = (code: string): ConfigurationActivity | null => {
    return getItem<ConfigurationActivity>(activityDraftKey(code));
  };

  const clearConfiguration = (code: string) => {
    removeItem(activityDraftKey(code));
  };

  const isFormValid = () => {
    return (
      configuration.description.trim() &&
      configuration.startDate &&
      configuration.endDate &&
      configuration.difficulty &&
      configuration.maxTime > 0 &&
      configuration.subjectId > 0 &&
      configuration.attempts > 0 &&
      configuration.initialBalance > 0 &&
      configuration.typeReward
    );
  };

  return {
    configuration,
    isLoading,
    errors,
    setConfiguration,
    handleChange,
    validateForm,
    getSelectedSubject,
    getMaximumInitialBalance,
    resetForm,
    setIsLoading,
    isFormValid,
    saveConfiguration,
    loadConfiguration,
    clearConfiguration,
  };
};
