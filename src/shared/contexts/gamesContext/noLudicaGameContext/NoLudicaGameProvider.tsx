import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { NoLudicaGameContext } from "./NoLudicaGameContext";
import type { NoLudicaGameContextType } from "./NoLudicaGameContext.type";
import type { NoLudicaConfig } from "../../../../activity/types/NoLudica.type";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";
import { useCreateNoLudica } from "../../../../activity/hooks/useCreateNoLudica";
import { getGameTypeFromActivityName } from "@/shared";
import { useToaster } from "../../../hooks/useToaster";
import { GameType } from "../../../types/Games.type";
import { compressPDF } from "../../../utils/compressPDF";
import { NO_LUDICA_EMPTY_TEXT_RESPONSE } from "@shared/constants/games.constants";

interface NoLudicaGameProviderProps {
  children: ReactNode;
  config?: NoLudicaConfig;
  mode?: "preview" | "student";
}
export const NoLudicaGameProvider: React.FC<NoLudicaGameProviderProps> = ({
  children,
  config: propConfig,
  mode = "preview",
}) => {
  const { config } = useCreateNoLudica();
  const { currentActivity, registerActivityNoLudicaCompleted } =
    useActivityStudent();
  const { showToast } = useToaster();
  const [gameStarted, setGameStarted] = useState(false);
  const [studentResponse, setStudentResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gameConfig, setGameConfig] = useState<NoLudicaConfig | null>(null);

  const isGameWon = false;
  const isGameLost = true;

  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        exercise: config.exercise,
      });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.NO_LUDICA) {
        const noLudicaConfig = currentActivity.gameConfig as NoLudicaConfig;

        setGameConfig({
          exercise: noLudicaConfig.exercise,
        });
      }
    } else if (propConfig) {
      setGameConfig(propConfig);
    }
  }, [mode, propConfig, config, currentActivity]);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const validateNoLudicaSubmission = (): boolean => {
    if (!studentResponse.trim() && !selectedFile) {
      showToast({
        title: "Entrega vacía",
        message:
          "Debes escribir una respuesta o adjuntar un archivo PDF para finalizar el intento.",
        type: "warning",
        position: "bottom-right",
      });
      return false;
    }
    return true;
  };

  const buildFormData = async (): Promise<FormData> => {
    const formData = new FormData();
    if (currentActivity)
      formData.append("activityId", String(currentActivity?.id));

    const plainTextValue = studentResponse.trim()
      ? studentResponse
      : NO_LUDICA_EMPTY_TEXT_RESPONSE;
    formData.append("plainText", plainTextValue);

    if (selectedFile) {
      const pdfCompress = await compressPDF(selectedFile);
      formData.append("file", pdfCompress);
    } else {
      formData.append("file", new Blob([])); // vacío pero presente
    }
    return formData;
  };

  const handleFinishNoLudica = async () => {
    const formData = await buildFormData();
    registerActivityNoLudicaCompleted(formData);
  };

  const value: NoLudicaGameContextType = {
    resetGame,
    startGame,
    gameConfig,
    gameStarted,
    handleFinishNoLudica,
    handleFileSelect,
    handleRemoveFile,
    validateNoLudicaSubmission,
    selectedFile,
    setSelectedFile,
    setStudentResponse,
    studentResponse,
    isGameLost,
    isGameWon,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
  };
  return (
    <NoLudicaGameContext.Provider value={value}>
      {children}
    </NoLudicaGameContext.Provider>
  );
};
