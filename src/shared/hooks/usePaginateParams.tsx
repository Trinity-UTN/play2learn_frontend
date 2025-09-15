import { useState } from "react";
import type { GetPaginated } from "../types/PaginacionType";

function usePaginationParams(initialParams?: Partial<GetPaginated>) {
  const [paginationParams, setPaginationParams] = useState<GetPaginated>({
    page: 1,
    page_size: 10,
    order_by: "id",
    order_type: "asc",
    search: "",
    filters: [],
    filtersValues: [],
    ...initialParams,
  });

  const handleSearch = (value: string) => {
    setPaginationParams((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleSort = (column: string) => {
    setPaginationParams((prev) => ({
      ...prev,
      order_by: column,
      order_type:
        prev.order_by === column && prev.order_type === "asc" ? "desc" : "asc",
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page_size: pageSize,
      page: 1,
    }));
  };

  const handleFilter = (filter: string[], value: string[]) => {
    if (value.length === 0) {
      setPaginationParams((prev) => ({
        ...prev,
        filters: [],
        filtersValues: [],
      }));
    }
    setPaginationParams((prev) => ({
      ...prev,
      filters: filter,
      filtersValues: value,
      page: 1,
    }));
  };

  return {
    paginationParams,
    setPaginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  };
}

export default usePaginationParams;
