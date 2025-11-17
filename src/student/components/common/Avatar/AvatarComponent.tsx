import { FaStar } from "react-icons/fa";
import type { AvatarComponentsPreview } from "../../../types/CurrentStudent.type";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import styles from "./Avatar.module.css";

interface AvatarComponentProps {
  size?: "small" | "medium" | "large" | "preview";
  showLevel?: boolean;
  showRing?: boolean;
  onClick?: () => void;
  className?: string;
  previewState?: AvatarComponentsPreview;
}

const Avatar: React.FC<AvatarComponentProps> = ({
  size = "medium",
  showLevel = false,
  showRing = false,
  onClick,
  className = "",
  previewState,
}) => {
  const { getAvatarComponents } = useCurrentStudent();

  const avatarComponents = previewState
    ? {
        body: previewState.selectedBody?.image || "/avatar/body_anonymous.png",
        shirt: previewState.selectedShirt?.image || "",
        hat: previewState.selectedHat?.image || "",
      }
    : getAvatarComponents();

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    preview: styles.preview,
  };

  return (
    <div
      className={`${styles.avatarContainer} ${sizeClasses[size]} ${className} ${
        onClick ? styles.clickable : ""
      }`}
      onClick={onClick}
    >
      {showRing && <div className={styles.avatarRing} />}

      <div className={styles.avatarWrapper}>
        <img
          src={avatarComponents.body}
          alt="Cuerpo"
          className={`${styles.avatarImage} ${styles.avatarBody}`}
          loading="lazy"
        />

        {avatarComponents.shirt && (
          <img
            src={avatarComponents.shirt}
            className={`${styles.avatarImage} ${styles.avatarShirt}`}
            loading="lazy"
          />
        )}

        {avatarComponents.hat && (
          <img
            src={avatarComponents.hat}
            className={`${styles.avatarImage} ${styles.avatarHat}`}
            loading="lazy"
          />
        )}
      </div>

      {showLevel && (
        <div className={styles.levelBadge}>
          <FaStar className={styles.levelIcon} />
          <span>30</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
