import type { BodyPart, NullAspect } from "../../../types/CurrentStudent.type";
import AspectCard from "./aspectCard/AspectCard";
import styles from "./AspectGrid.module.css";

interface AspectGridProps {
  aspects: (BodyPart | NullAspect)[];
  isAspectSelected: (aspect: BodyPart | NullAspect) => boolean;
  onAspectClick: (aspect: BodyPart | NullAspect) => void;
  onInfoClick: (aspect: BodyPart) => void;
}

const AspectGrid: React.FC<AspectGridProps> = ({
  aspects,
  isAspectSelected,
  onAspectClick,
  onInfoClick,
}) => {
  return (
    <div className={styles.aspectsGrid}>
      {aspects.map((aspect, index) => {
        const key = (aspect as any).isNull
          ? `null-${aspect.type}-${index}`
          : aspect.id;
        return (
          <AspectCard
            key={key}
            aspect={aspect}
            isSelected={isAspectSelected(aspect)}
            onClick={onAspectClick}
            onInfoClick={onInfoClick}
          />
        );
      })}
    </div>
  );
};

export default AspectGrid;
