import { FaSave } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./ActionButtons.module.css";

interface ActionButtonsPopupProps {
  loading: boolean;
  hasChanges: boolean;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsPopupProps> = ({
  loading,
  hasChanges,
  onSave,
}) => {
  return (
    <div className={styles.actionButtons}>
      <Button
        onClick={onSave}
        disabled={!hasChanges || loading}
        className={styles.saveButtonGrid}
      >
        <FaSave />
        <span>
          {hasChanges && loading ? "Guardando..." : "Guardar Cambios"}
        </span>
      </Button>
    </div>
  );
};

export default ActionButtons;
