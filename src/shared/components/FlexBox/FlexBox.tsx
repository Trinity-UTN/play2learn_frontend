import styles from "./FlexBox.module.css";
import { FiList, FiGrid } from "react-icons/fi";

interface FlexBoxProps {
  isRow: boolean;
  onToggle: (data: boolean) => void;
  children: React.ReactNode;
}

const FlexBox = ({ children, isRow, onToggle }: FlexBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.contButtons}>
        <button onClick={() => onToggle(false)}>
          <FiList />
        </button>
        <button onClick={() => onToggle(true)}>
          <FiGrid />
        </button>
      </div>
      <div
        style={{
          flexDirection: isRow ? "row" : "column",
          justifyContent: isRow ? "center" : "start",
        }}
        className={styles.box}
      >
        {children}
      </div>
    </div>
  );
};

export default FlexBox;
