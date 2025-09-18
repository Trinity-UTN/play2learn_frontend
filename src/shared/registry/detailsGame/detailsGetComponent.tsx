import { GAME_TYPE_TO_COMPONENT } from "./detailsHooksRegistry";
import { getGameTypeFromActivityName } from "./detailsMapping";

export function getGameComponent(activityName: string, props?: any) {
  const gameType = getGameTypeFromActivityName(activityName);
  if (!gameType) throw new Error(`Actividad no mapeada: ${activityName}`);

  const Component = GAME_TYPE_TO_COMPONENT[gameType];
  if (!Component) throw new Error(`No existe componente para: ${gameType}`);

  return <Component {...props} />;
}
