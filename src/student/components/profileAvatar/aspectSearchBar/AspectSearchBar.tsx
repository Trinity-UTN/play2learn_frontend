import { FaSearch } from "react-icons/fa";
import Input from "../../../../shared/components/Input/InputComponent";
import styles from "./AspectSearchBar.module.css";

interface AspectSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AspectSearchBar: React.FC<AspectSearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className={styles.searchInputWrapper}>
      <FaSearch className={styles.searchIcon} />
      <Input
        type="text"
        placeholder="Buscar aspectos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default AspectSearchBar;
