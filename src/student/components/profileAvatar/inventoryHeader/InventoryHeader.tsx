import styles from "./InventoryHeader.module.css";

interface InventoryHeaderProps {
  sortBy: "name" | "type";
  selectedFilter: "ALL" | "CUERPO" | "REMERA" | "SOMBRERO";
  onSortChange: (sortBy: "name" | "type") => void;
  onFilterChange: (filter: "ALL" | "CUERPO" | "REMERA" | "SOMBRERO") => void;
  onReset: () => void;
  onApply: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default InventoryHeader;
