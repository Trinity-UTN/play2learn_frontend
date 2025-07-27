import { useState, type ReactNode } from "react";

import { AhorcadoContext } from "./AhorcadoContext";
import type { AhorcadoContextType } from "./AhoracadoContext.type";
import { AhorcadoService } from "../../services/ahorcado/AhorcadoService";
import type { CreateAhorcadoPayload } from "../../services/ahorcado/AhorcadoService";

import type { AhorcadoInterface } from "../../types/Ahorcado.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { makeData } from "../../utils/MakeData";
import { useNavigate } from "react-router-dom";
interface CourseProviderProps {
  children: ReactNode;
}

export const AhorcadoProvider: React.FC<CourseProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { configurationActivity } = useConfigurationActivity();
  const navigate = useNavigate();
  const registerAhorcado = async (data: AhorcadoInterface): Promise<void> => {
    setLoading(true);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );

    try {
      AhorcadoService.registerAhorcadoApi(dataMandar as CreateAhorcadoPayload);
    } catch (error) {
      console.error("Error al crear el ahorcado:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
      navigate("/dashboard/teacher/actividades/list");
    }
  };

  const contextValue: AhorcadoContextType = {
    loading,
    registerAhorcado,
  };

  return (
    <AhorcadoContext.Provider value={contextValue}>
      {children}
    </AhorcadoContext.Provider>
  );
};
