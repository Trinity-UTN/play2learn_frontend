import { useState, type ReactNode } from "react";
import { StudentContext } from "./StudentContext";
import type { StudentContextType } from "./StudentContext.type";
import { StudentService } from "../../services/Student/StudentService";
import type { CreateStudentPayload } from "../../services/Student/StudentService";

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerStudent = async (data: CreateStudentPayload): Promise<void> => {
    setLoading(true);
    try {
      await StudentService.registerStudentApi(data);
    } catch (error) {
      console.error("Error al crear el estudiante:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: StudentContextType = {
    loading,
    registerStudent,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};
