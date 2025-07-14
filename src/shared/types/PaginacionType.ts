export interface GetPaginated {
  page?: number;
  page_size?: number;
  order_by?: string;
  order_type?: "asc" | "desc";
  search?: string;
  filters?: string[];
  filtersValues?: string[];
}

export interface PaginatedData<T> {
  results: T[];
  currentPage: number;
  pageSize: number;
  count: number;
  totalPages: number;
}
// export interface PaginatedYearResponse {
//   data: PaginatedData<YearResponseDto>;
//   message: string;
//   errors: any;
//   timestamp: string;
// }