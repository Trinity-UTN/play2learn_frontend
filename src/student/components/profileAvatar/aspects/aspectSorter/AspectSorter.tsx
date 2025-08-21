import styles from "./AspectSorter.module.css";

interface AspectSorterProps {
  title: string;
  icon: React.ReactNode;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleFilter: () => void;
  showSortFilter: boolean;
}

const AspectSorter: React.FC<AspectSorterProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default AspectSorter;
