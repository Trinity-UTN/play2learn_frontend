import type { AhorcadoConfig } from "../../../../activity/types/Ahorcado.type";
import type { GameHook } from "../../../types/Games.type";

export interface AhorcadoGameContextType extends GameHook {
  // Estados del juego
  gameConfig: AhorcadoConfig | null;
  guessedLetters: string[];
  currentGuess: string;

  // Estados calculados
  maxErrors: number;
  wrongGuesses: number;
  livesRemaining: number;

  // Funciones del juego
  handleGuessLetter: () => void;
  renderHangman: (errors: number) => string;
  renderWordDisplay: (letters: string[]) => string;
  setCurrentGuess: (guess: string) => void;
}
