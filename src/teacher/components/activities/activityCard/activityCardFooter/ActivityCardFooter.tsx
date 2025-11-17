import Button from "../../../../../shared/components/Button/ButtonComponent";
import styles from "./ActivityCardFooter.module.css";

interface ActivityCardFooterProps {
  onClick: () => void;
}

const ActivityCardFooter: React.FC<ActivityCardFooterProps> = ({ onClick }) => (
  <div className={styles.cardFooter}>
    <Button
      variant="secondary"
      fullWidth
      onClick={onClick}
      className={styles.selectButton}
    >
      Crear Actividad
    </Button>
  </div>
);

export default ActivityCardFooter;
