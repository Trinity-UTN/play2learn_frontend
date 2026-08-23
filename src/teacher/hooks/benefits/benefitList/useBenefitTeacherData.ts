import { useEffect, useCallback, useMemo, useRef } from "react";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useBenefitTeacherFilters } from "./useBenefitTeacherFilters";
import { usePaginationParams, type FilterOption } from "@/shared";
import { useSubject } from "@/admin";

/**
 * Hook central para cargar y manejar los datos de beneficios del teacher
 */
export const useBenefitTeacherData = () => {
  const {
    loading: loadingBenefits,
    paginatedBenefits,
    paginatedBenefitsUseRequested,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
  } = useBenefitAPI();

  const {
    subjects: subjectsFromAPI,
    getSubjectByTeacher,
    loading: loadingSubjects,
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
    selectedCategory,
    search,
    benefitId,
    viewMode,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    setViewMode,
    applyFilters,
    resetFilters,
  } = useBenefitTeacherFilters();

  const hasLoadedSubjects = useRef(false);

  useEffect(() => {
    if (!hasLoadedSubjects.current) {
      hasLoadedSubjects.current = true;
      getSubjectByTeacher();
    }
  }, []);

  const loadBenefits = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Estado (benefit.state)
    filters.push("state");
    filtersValues.push(activeFilter);

    // Materia (benefit.subjectId)
    if (selectedSubject?.id && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    // Categoría (benefit.category)
    if (selectedCategory && selectedCategory !== "ALL") {
      filters.push("category");
      filtersValues.push(selectedCategory);
    }

    // Filtro por beneficio (solo en uso solicitado)
    if (activeFilter === "USE_REQUESTED" && benefitId) {
      filters.push("benefitId");
      filtersValues.push(benefitId);
    }

    if (activeFilter === "USE_REQUESTED") {
      await getPaginatedBenefitsUseRequested({
        ...paginationParams,
        search,
        filters,
        filtersValues,
      });
    } else {
      await getPaginatedBenefits({
        ...paginationParams,
        search,
        filters,
        filtersValues,
      });
    }
  }, [
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    paginationParams,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
  ]);

  /**
   * Carga inicial de beneficios
   */
  useEffect(() => {
    loadBenefits();
  }, [loadBenefits]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    setPaginationParams,
  ]);

  // Datos Generales
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
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      );

    return [{ id: "ALL", name: "Todas las materias" }, ...mapped];
  }, [subjectsFromAPI]);

  const availableBenefits = useMemo(() => {
    const items = [
      ...(paginatedBenefitsUseRequested?.results ?? []),
      ...(paginatedBenefits?.results ?? []),
    ];

    const unique = new Map<number, string>();
    for (const item of items) {
      if ("benefitId" in item && item.benefitId) {
        unique.set(item.benefitId, (item as any).benefitName);
      } else if ("id" in item && "name" in item) {
        unique.set(item.id, item.name);
      }
    }
    return Array.from(unique, ([id, name]) => ({ id, name }));
  }, [paginatedBenefits, paginatedBenefitsUseRequested]);

  const filteredBenefits = useMemo(() => {
    return activeFilter === "USE_REQUESTED"
      ? (paginatedBenefitsUseRequested?.results ?? [])
      : (paginatedBenefits?.results ?? []);
  }, [activeFilter, paginatedBenefits, paginatedBenefitsUseRequested]);

  const paginationInfo = useMemo(() => {
    const data =
      activeFilter === "USE_REQUESTED"
        ? paginatedBenefitsUseRequested
        : paginatedBenefits;

    if (!data) return null;

    return {
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      pageSize: data.pageSize,
      totalItems: data.count,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };
  }, [
    activeFilter,
    paginatedBenefits,
    paginatedBenefitsUseRequested,
    handlePageChange,
    handlePageSizeChange,
  ]);

  // Loading combinado
  const loading =
    loadingBenefits || (hasLoadedSubjects.current && loadingSubjects);

  return {
    // Estados
    loading,
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    setViewMode,
    applyFilters,
    resetFilters,

    // Datos
    subjects,
    availableBenefits,
    filteredBenefits,
    paginationInfo,
  };
};
