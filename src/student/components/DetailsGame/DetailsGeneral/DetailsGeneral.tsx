import { getGameTypeFromActivityName, getGameComponent } from "@/shared";

interface DetailsGeneralProps {
  activityName?: string;
}

const DetailsGeneral: React.FC<DetailsGeneralProps> = ({ activityName }) => {
  if (!activityName) return <div>Actividad desconocida</div>;

  const gameType = getGameTypeFromActivityName(activityName);
  if (!gameType) return <div>Actividad desconocida: {activityName}</div>;

  // Renderizamos directamente el componente correspondiente
  return getGameComponent(activityName);
};

export default DetailsGeneral;
