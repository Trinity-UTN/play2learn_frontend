import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./ActivityDetailsFilters.module.css";

interface ActivityDetailsFiltersProps {
  onSearch: (searchTerm: string) => void;
  studentsCount: number;
  filteredCount: number;
}

const ActivityDetailsFilters = ({
  onSearch,
  studentsCount,
  filteredCount,
}: ActivityDetailsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por nombre de estudiante..."
          value={searchTerm}
          onChange={handleChange}
          className={styles.input}
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <p className={styles.resultInfo}>
        Mostrando {filteredCount} de {studentsCount} estudiantes
      </p>
    </div>
  );
};

export default ActivityDetailsFilters;
