import { FaInfoCircle, FaTimes } from "react-icons/fa";
import type {
  BodyPart,
  NullAspect,
} from "../../../../types/CurrentStudent.type";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import styles from "./AspectCard.module.css";

interface AspectCardProps {
  aspect: BodyPart | NullAspect;
  isSelected: boolean;
  onClick: (aspect: BodyPart | NullAspect) => void;
  onInfoClick: (aspect: BodyPart) => void;
}

const AspectCard: React.FC<AspectCardProps> = ({
  aspect,
  isSelected,
  onClick,
  onInfoClick,
}) => {
  const isNullAspect = (aspect as any).isNull;

  return (
    <div
      onClick={() => onClick(aspect)}
      className={`${styles.aspectCard} ${
        isSelected ? styles.aspectCardSelected : ""
      } ${isNullAspect ? styles.aspectCardNull : ""}`}
    >
      {!isNullAspect && (
        <Button
          className={styles.aspectInfoButton}
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick(aspect as BodyPart);
          }}
        >
          <FaInfoCircle />
        </Button>
      )}
      <div className={styles.aspectImageContainer}>
        {isNullAspect ? (
          <div className={styles.nullAspectIcon}>
            <FaTimes />
          </div>
        ) : (
          <img
            src={aspect.image || "/placeholder.svg"}
            alt={aspect.name}
            className={styles.aspectImage}
          />
        )}
        {isSelected && <div className={styles.selectedOverlay}>✓</div>}
      </div>
      <div className={styles.aspectInfo}>
        <h3 className={styles.aspectName}>{aspect.name}</h3>
      </div>
    </div>
  );
};

export default AspectCard;
