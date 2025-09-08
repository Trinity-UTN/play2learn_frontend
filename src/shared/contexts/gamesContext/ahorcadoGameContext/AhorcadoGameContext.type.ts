import type { AhorcadoConfig } from "../../../../activity/types/Ahorcado.type";

export interface AhorcadoGameContextType {
  // Estados del juego
  gameConfig: AhorcadoConfig | null;
  guessedLetters: string[];
  currentGuess: string;
  gameStarted: boolean;

  // Estados calculados
  maxErrors: number;
  wrongGuesses: number;
  livesRemaining: number;
  isGameWon: boolean;
  isGameLost: boolean;

  // Funciones del juego
  handleGuessLetter: () => void;
  resetGame: () => void;
  startGame: () => void;
  renderHangman: (errors: number) => string;
  renderWordDisplay: (letters: string[]) => string;
  setCurrentGuess: (guess: string) => void;
}
