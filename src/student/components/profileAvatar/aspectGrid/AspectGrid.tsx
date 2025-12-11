import type { BodyPart, NullAspect } from "../../../types/CurrentStudent.type";
import { EmptyStateComponent } from "@/shared";
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
  if (aspects.length === 0) {
    return (
      <div className={styles.emptyStateWrapper}>
        <EmptyStateComponent
          title="No se encontraron aspectos"
          message="Prueba cambiar el filtro o buscar con otro término."
          iconColor="#f59e0b"
          textColor="white"
        />
      </div>
    );
  }

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
