export interface Activity {
  id: number;
  code_game: string;
  name: string;
  type: string;
  description: string;
  difficulty: "Variable" | "Fácil" | "Medio" | "Difícil";
  duration: string;
  subject: string;
  icon: string;
  color: string;
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
}
