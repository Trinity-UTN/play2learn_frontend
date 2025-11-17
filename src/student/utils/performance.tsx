import { GoTrophy } from "react-icons/go";
import { LuThumbsUp } from "react-icons/lu";
import { IoHandLeftOutline } from "react-icons/io5";
import { FaRegHandRock } from "react-icons/fa";
import type { ReactNode } from "react";

interface PerformanceLevel {
  level: string;
  color: string;
  icon: ReactNode;
}

export function getPerformanceLevel(accuracy: number): PerformanceLevel {
  if (accuracy >= 90)
    return { level: accuracy.toFixed(2), color: "success", icon: <GoTrophy /> };
  if (accuracy >= 75)
    return { level: accuracy.toFixed(2), color: "good", icon: <LuThumbsUp /> };
  if (accuracy >= 60)
    return {
      level: accuracy.toFixed(2),
      color: "regular",
      icon: <IoHandLeftOutline />,
    };
  if (accuracy >= 40)
    return {
      level: accuracy.toFixed(2),
      color: "poor",
      icon: <FaRegHandRock />,
    };

  return {
    level: accuracy.toFixed(2),
    color: "very-poor",
    icon: <FaRegHandRock />,
  };
}
