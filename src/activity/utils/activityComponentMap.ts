import CreateAhorcado from "../views/createAhorcadoView/CreateAhorcado";
import CreateCompletarOracion from "../views/createCompletarOracionView/CreateCompletarOracion";
import CreateMemorama from "../views/createMemoramaView/CreateMemorama";
import CreatePreguntados from "../views/createPreguntadosView/CreatePreguntados";
import CreateSequenceView from "../views/createSequenceView/CreateSequenceView";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
  memorama: CreateMemorama,
  ordenar_secuencia: CreateSequenceView,
  preguntados: CreatePreguntados,
};
