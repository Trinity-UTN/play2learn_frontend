import { useEffect, useState, type ReactNode } from "react";
import { NoLudicaGameContext } from "./NoLudicaGameContext";
import type { NoLudicaGameContextType } from "./NoLudicaGameContext.type";
import type { NoLudicaConfig } from "../../../../activity/types/NoLudica.type";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";
import { useCreateNoLudica } from "../../../../activity/hooks/useCreateNoLudica";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { GameType } from "../../../types/Games.type";
import { compressPDF } from "../../../utils/compressPDF";
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
  const [gameStarted, setGameStarted] = useState(false);
  const [studentResponse, setStudentResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
  //   "playing"
  // );

  const [gameConfig, setGameConfig] = useState<NoLudicaConfig | null>(null);

  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        excercise: config.excercise,
        tipoEntrega: config.tipoEntrega,
      });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.NO_LUDICA) {
        const noLudicaConfig = currentActivity.gameConfig as NoLudicaConfig;

        setGameConfig({
          excercise: noLudicaConfig.excercise,
          tipoEntrega: noLudicaConfig.tipoEntrega,
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
  const buildFormData = async (): Promise<FormData> => {
    const formData = new FormData();
    if (currentActivity)
      formData.append("activityId", String(currentActivity?.id));

    formData.append("plainText", studentResponse);

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
    selectedFile,
    setSelectedFile,
    setStudentResponse,
    studentResponse,
  };
  return (
    <NoLudicaGameContext.Provider value={value}>
      {children}
    </NoLudicaGameContext.Provider>
  );
};
