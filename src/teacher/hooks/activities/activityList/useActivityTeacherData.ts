import { useEffect, useCallback, useMemo, useRef } from "react";
import { useActivityTeacherFilters } from "./useActivityTeacherFilters";
import { usePaginationParams, type FilterOption } from "@/shared";
import { useActivityTeacher } from "../../useActivityTeacher";

/**
 * Hook central para cargar y manejar los datos de actividades del teacher
 */
export const useActivityTeacherData = () => {
  const {
    loading: loadingActivities,
    paginatedActivitiesTeacher,
    subjectsTeacher,
    coursesTeacher,
    yearsTeacher,
    getPaginatedActivitiesTeacher,
    getSubjectCoursesYearsTeacher,
  } = useActivityTeacher();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  const {
    activeFilter,
    selectedSubject,
    selectedCourse,
    selectedYear,
    search,
    viewMode,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCourse,
    setSelectedYear,
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
      getSubjectCoursesYearsTeacher();
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

    // Curso (activity.courseId)
    if (selectedCourse?.id && selectedCourse.id !== "ALL") {
      filters.push("courseId");
      filtersValues.push(selectedCourse.id);
    }

    // Año (activity.yearId)
    if (selectedYear?.id && selectedYear.id !== "ALL") {
      filters.push("yearId");
      filtersValues.push(selectedYear.id);
    }

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
  }, [
    activeFilter,
    selectedSubject,
    selectedCourse,
    selectedYear,
    search,
    setPaginationParams,
  ]);

  // Mapear materias para el filtro
  const subjects: FilterOption[] = useMemo(() => {
    if (!subjectsTeacher || subjectsTeacher.length === 0) {
      return [{ id: "ALL", name: "Todas las materias" }];
    }

    const mapped = subjectsTeacher
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
  }, [subjectsTeacher]);

  // Mapeo de cursos para el filtro
  const courses: FilterOption[] = useMemo(() => {
    if (!coursesTeacher || coursesTeacher.length === 0) {
      return [{ id: "ALL", name: "Todos los cursos" }];
    }

    const filteredCourses =
      selectedYear && selectedYear.id !== "ALL"
        ? coursesTeacher.filter(
            (course) => String(course.year?.id) === selectedYear.id
          )
        : coursesTeacher;

    const mapped = filteredCourses
      .map((course) => ({
        id: String(course.id),
        name: course.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return [...mapped];
  }, [coursesTeacher, selectedYear]);

  // Mapeo de años para el filtro
  const years: FilterOption[] = useMemo(() => {
    if (!yearsTeacher || yearsTeacher.length === 0) {
      return [{ id: "ALL", name: "Todos los años" }];
    }

    const mapped = yearsTeacher.map((year) => ({
      id: String(year.id),
      name: year.name,
    }));

    return [{ id: "ALL", name: "Todos los años" }, ...mapped];
  }, [yearsTeacher]);

  // Datos filtrados
  const filteredActivities = useMemo(() => {
    return paginatedActivitiesTeacher?.results ?? [];
  }, [paginatedActivitiesTeacher]);

  useEffect(() => {
    setSelectedCourse({ id: "ALL", name: "Todos los cursos" });
  }, [selectedYear]);

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
  const loading = loadingActivities;

  return {
    // Estados
    loading,
    activeFilter,
    selectedSubject,
    selectedCourse,
    selectedYear,
    search,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSelectedCourse,
    setSelectedYear,
    setSearch,
    setViewMode,
    applyFilters,
    resetFilters,

    // Datos
    subjects,
    courses,
    years,
    filteredActivities,
    paginationInfo,
  };
};
