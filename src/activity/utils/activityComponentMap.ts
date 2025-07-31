import CreateAhorcado from "../components/createAhorcado/CreateAhorcado";
import CreateCompletarOracion from "../components/createCompletarOracion/CreateCompletarOracion";
import CreatePreguntados from "../components/preguntados/CreatePreguntados";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
  preguntados: CreatePreguntados,
};
