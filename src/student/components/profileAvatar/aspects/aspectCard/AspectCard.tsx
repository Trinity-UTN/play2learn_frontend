import type {
  BodyPart,
  NullAspect,
} from "../../../../types/CurrentStudent.type";
import styles from "./AspectCard.module.css";

interface AspectCardProps {
  aspect: BodyPart | NullAspect;
  isSelected: boolean;
  onClick: () => void;
  onShowInfo: () => void;
}

const AspectCard: React.FC<AspectCardProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default AspectCard;
