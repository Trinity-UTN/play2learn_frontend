type CreateFilterHandlerParams<T extends string> = {
  onFilterChange: (status: T) => void;
  handleFilter: (filters: string[], values: string[]) => void;
  filterType: string;
};

type FilterItem<T extends string> = {
  value: T;
  label: string;
  color: string;
  filterValue: string | null;
};

export function createFilterHandler<T extends string>({
  onFilterChange,
  handleFilter,
  filterType,
}: CreateFilterHandlerParams<T>) {
  return (status: FilterItem<T>) => {
    onFilterChange(status.value);

    if (status.filterValue === null) {
      handleFilter([], []);
    } else {
      handleFilter([filterType], [status.filterValue]);
    }
  };
}
