import CreateAhorcado from "../components/createAhorcado/CreateAhorcado";
import CreateCompletarOracion from "../components/createCompletarOracion/CreateCompletarOracion";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
};
