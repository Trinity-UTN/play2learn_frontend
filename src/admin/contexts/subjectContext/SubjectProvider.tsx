import { useState, type ReactNode } from "react";
import { SubjectContext } from "./SubjectContext";
import type { SubjectContextType } from "./SubjectContext.type";
import { SubjectService } from "../../services/subject/SubjectService";
import type { CreateSubjectPayload } from "../../services/subject/SubjectService";

interface SubjectProviderProps {
  children: ReactNode;
}

export const SubjectProvider: React.FC<SubjectProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerSubject = async (data: CreateSubjectPayload): Promise<void> => {
    setLoading(true);
    try {
      await SubjectService.registerSubjectApi(data);
    } catch (error) {
      console.error("Error al crear la materia:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: SubjectContextType = {
    loading,
    registerSubject,
  };

  return (
    <SubjectContext.Provider value={contextValue}>
      {children}
    </SubjectContext.Provider>
  );
};
