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
    return { level: "Excelente", color: "success", icon: <GoTrophy /> };
  if (accuracy >= 75)
    return { level: "Muy Bueno", color: "good", icon: <LuThumbsUp /> };
  if (accuracy >= 60)
    return { level: "Bueno", color: "regular", icon: <IoHandLeftOutline /> };
  if (accuracy >= 40)
    return { level: "Regular", color: "poor", icon: <FaRegHandRock /> };

  return {
    level: "Necesita mejorar",
    color: "very-poor",
    icon: <FaRegHandRock />,
  };
}
