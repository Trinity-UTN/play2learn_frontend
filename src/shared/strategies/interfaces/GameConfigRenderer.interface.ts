import type { IconType } from "react-icons";
import type { GameConfig } from "../../../student/types/Activity.type";

export interface GameConfigDetail {
  icon: IconType;
  label: string;
  value: string | number;
}

export interface GameConfigRenderer {
  render(config: GameConfig): GameConfigDetail[];
}
