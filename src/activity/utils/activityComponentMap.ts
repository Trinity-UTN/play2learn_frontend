import CreateAhorcado from "../views/createAhorcadoView/CreateAhorcado";
import CreateCompletarOracion from "../views/createCompletarOracionView/CreateCompletarOracion";
import CreatePreguntados from "../views/createPreguntadosView/CreatePreguntados";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
  preguntados: CreatePreguntados,
};
