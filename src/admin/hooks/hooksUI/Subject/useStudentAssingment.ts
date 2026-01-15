import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSubject } from "../../useSubject";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  StudentAssingmentResponse,
  SubjectResponseDto,
} from "@/admin/types/subject.types";
import { useConfirmation, useToaster } from "@/shared";

type SortField = keyof StudentAssingmentResponse;
type SortDirection = "asc" | "desc";

export const useStudentAssingment = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const subject: SubjectResponseDto = location.state?.subject;
  const {
    getStudentAssingment,
    studentAssingment,
    loading,
    assingmentStudent,
    unassignStudent,
  } = useSubject();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  } | null>(null);

  //Get inicial de estudiantes que pueden estar en la materia
  const handleGet = () => {
    getStudentAssingment(Number(id));
  };
  useEffect(() => {
    if (id) {
      handleGet();
    }
  }, [id]);

  //Navegacion
  const navigate = useNavigate();

  //Filtro y busqueda
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSort = (column: string) => {
    if (!["name", "lastname", "dni", "registered", "id"].includes(column))
      return;
    setSortConfig((prev) => {
      if (prev?.field === column) {
        return {
          field: column as SortField,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { field: column as SortField, direction: "asc" };
    });
  };
  const filteredStudents = useMemo(() => {
    let result = studentAssingment ? [...studentAssingment] : [];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.lastname.toLowerCase().includes(term) ||
          s.dni.includes(term)
      );
    }

    // Sort
    if (sortConfig) {
      const { field, direction } = sortConfig;

      result.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        return 0;
      });
    }

    return result;
  }, [studentAssingment, searchTerm, sortConfig]);

  //Acciones de asignar y desasignar
  const handleAssign = useCallback((student: StudentAssingmentResponse) => {
    showConfirmation({
      title: "Asignar Estudiante",
      message: `¿Está seguro que desea asignar al estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      onConfirm: async () => {
        await assingmentStudent(Number(id), [student.id]);
        handleGet();
        showToast({
          title: "Estudiante asginado exitosamente",
          message: "El estudiante ha sido asignado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  }, []);

  const handleUnassign = useCallback((student: StudentAssingmentResponse) => {
    showConfirmation({
      title: "Desasignar Estudiante",
      message: `¿Está seguro que desea desasignar al estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      onConfirm: async () => {
        await unassignStudent(Number(id), [student.id]);
        handleGet();
        showToast({
          title: "Estudiante desasignado exitosamente",
          message: "El estudiante ha sido desasignado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  }, []);

  return {
    students: filteredStudents,
    searchTerm,
    handleSearch,
    handleSort,
    loading,
    subject,
    navigate,
    handleAssign,
    handleUnassign,
  };
};
