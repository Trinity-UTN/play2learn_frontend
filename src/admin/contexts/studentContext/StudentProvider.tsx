import { useCallback, useState, type ReactNode } from "react";
import { StudentContext } from "./StudentContext";
import type { StudentContextType } from "./StudentContext.type";
import { StudentService } from "../../services/student/StudentService";
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentResponseDto,
} from "../../services/student/StudentService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentResponseDto[]>([]);
  const [paginatedStudents, setPaginatedStudents] =
    useState<PaginatedData<StudentResponseDto> | null>(null);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentResponseDto | null>(null);

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

  const updateStudent = async (data: UpdateStudentPayload): Promise<void> => {
    setLoading(true);
    try {
      await StudentService.updateStudentApi(data);
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getStudent = useCallback(async () => {
    setLoading(true);
    try {
      const response = await StudentService.getStudentApi();
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentById = async (id: number): Promise<StudentResponseDto> => {
    setLoading(true);
    try {
      const StudentData = await StudentService.getStudentByIdApi(id);
      return StudentData;
    } catch (error) {
      console.error("Error al obtener el estudiante (por id):", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedStudent = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await StudentService.getPaginatedStudentApi(params);
        setPaginatedStudents(response.data);
      } catch (error) {
        console.error("Error al obtener los estudiantes paginados:", error); // TODO: REMOVE_DEBUG
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteStudent = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await StudentService.deleteStudentApi(id);
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const restoreStudent = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await StudentService.restoreStudentApi(id);
    } catch (error) {
      console.error("Error al restaurar el estudiante:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: StudentContextType = {
    loading,
    registerStudent,
    updateStudent,
    deleteStudent,
    restoreStudent,
    getStudent,
    getStudentById,
    getPaginatedStudent,
    students,
    paginatedStudents,
    selectedStudent,
    setSelectedStudent,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};
