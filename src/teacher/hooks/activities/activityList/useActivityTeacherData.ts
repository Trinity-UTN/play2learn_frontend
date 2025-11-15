import { useEffect, useCallback, useMemo, useRef } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import { useActivityTeacherFilters } from "./useActivityTeacherFilters";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import { useSubject } from "../../../../admin/hooks/useSubject";
import { useActivityTeacher } from "../../useActivityTeacher";

/**
 * Hook central para cargar y manejar los datos de actividades del teacher
 */
export const useActivityTeacherData = () => {
  const {
    loading: loadingActivities,
    paginatedActivitiesTeacher,
    getPaginatedActivitiesTeacher,
  } = useActivityTeacher();

  const {
    loading: loadingSubjects,
    subjects: subjectsFromAPI,
    getSubjectByTeacher,
  } = useSubject();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  const {
    activeFilter,
    selectedSubject,
    search,
    viewMode,
    setActiveFilter,
    setSelectedSubject,
    setSearch,
    setViewMode,
    applyFilters,
    resetFilters,
  } = useActivityTeacherFilters();

  const hasLoadedSubjects = useRef(false);

  // Cargar materias disponibles
  useEffect(() => {
    if (!hasLoadedSubjects.current) {
      hasLoadedSubjects.current = true;
      getSubjectByTeacher();
    }
  }, []);

  // Cargar actividades
  const loadActivities = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Estado (activity.status)
    filters.push("status");
    filtersValues.push(activeFilter);

    // Materia (activity.subjectId)
    if (selectedSubject?.id && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    // if (selectedCourse?.id && selectedCourse.id !== "ALL") {
    //   filters.push("courseId");
    //   filtersValues.push(selectedCourse.id);
    // }

    // if (selectedYear?.id && selectedYear.id !== "ALL") {
    //   filters.push("yearId");
    //   filtersValues.push(selectedYear.id);
    // }

    await getPaginatedActivitiesTeacher({
      ...paginationParams,
      search,
      filters,
      filtersValues,
    });
  }, [
    activeFilter,
    selectedSubject,
    search,
    paginationParams,
    getPaginatedActivitiesTeacher,
  ]);

  /**
   * Carga inicial de actividades
   */
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, search, setPaginationParams]);

  // Mapear materias para el filtro
  const subjects: FilterOption[] = useMemo(() => {
    if (!subjectsFromAPI || subjectsFromAPI.length === 0) {
      return [{ id: "ALL", name: "Todas las materias" }];
    }

    const mapped = subjectsFromAPI
      .map((subject) => ({
        id: String(subject.id),
        name: `${subject.course?.year?.name || "Sin año"} ${
          subject.course?.name || "Sin curso"
        } - ${subject.name}`,
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );

    return [{ id: "ALL", name: "Todas las materias" }, ...mapped];
  }, [subjectsFromAPI]);

  // Datos filtrados
  const filteredActivities = useMemo(() => {
    return paginatedActivitiesTeacher?.results ?? [];
  }, [paginatedActivitiesTeacher]);

  // Info de paginación
  const paginationInfo = useMemo(() => {
    if (!paginatedActivitiesTeacher) return null;

    return {
      currentPage: paginatedActivitiesTeacher.currentPage,
      totalPages: paginatedActivitiesTeacher.totalPages,
      pageSize: paginatedActivitiesTeacher.pageSize,
      totalItems: paginatedActivitiesTeacher.count,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };
  }, [paginatedActivitiesTeacher, handlePageChange, handlePageSizeChange]);

  // Loading combinado
  const loading =
    loadingActivities || (hasLoadedSubjects.current && loadingSubjects);

  return {
    // Estados
    loading,
    activeFilter,
    selectedSubject,
    search,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSearch,
    setViewMode,
    applyFilters,
    resetFilters,

    // Datos
    subjects,
    filteredActivities,
    paginationInfo,
  };
};
