import type {
  BodyPart,
  NullAspect,
  AvatarComponentsPreview,
} from "../../../../types/CurrentStudent.type";
import styles from "./AspectGrid.module.css";

interface AspectGridProps {
  aspects: (BodyPart | NullAspect)[];
  selectedAspects: AvatarComponentsPreview;
  onAspectClick: (aspect: BodyPart | NullAspect) => void;
  onShowInfo: (aspect: BodyPart) => void;
  isAspectSelected: (aspect: BodyPart | NullAspect) => boolean;
}

const AspectGrid: React.FC<AspectGridProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default AspectGrid;
