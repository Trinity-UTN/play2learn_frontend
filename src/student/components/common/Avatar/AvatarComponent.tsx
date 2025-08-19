import { FaStar } from "react-icons/fa";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import styles from "./Avatar.module.css";

interface AvatarComponentProps {
  size?: "small" | "medium" | "large";
  showLevel?: boolean;
  showRing?: boolean;
  onClick?: () => void;
  className?: string;
}

const Avatar: React.FC<AvatarComponentProps> = ({
  size = "medium",
  showLevel = true,
  showRing = false,
  onClick,
  className = "",
}) => {
  const { getAvatarComponents } = useCurrentStudent();
  const avatarComponents = getAvatarComponents();

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <div
      className={`${styles.avatarContainer} ${sizeClasses[size]} ${className} ${
        onClick ? styles.clickable : ""
      }`}
      onClick={onClick}
    >
      {/* Ring Effect - Outside wrapper for proper positioning */}
      {showRing && <div className={styles.avatarRing} />}

      <div className={styles.avatarWrapper}>
        {/* Body Layer */}
        <img
          src={avatarComponents.body}
          alt="Cuerpo"
          className={`${styles.avatarImage} ${styles.avatarBody}`}
          loading="lazy"
        />

        {/* Shirt Layer */}
        <img
          src={avatarComponents.shirt}
          alt="Remera"
          className={`${styles.avatarImage} ${styles.avatarShirt}`}
          loading="lazy"
        />

        {/* Hat Layer */}
        <img
          src={avatarComponents.hat}
          alt="Sombrero"
          className={`${styles.avatarImage} ${styles.avatarHat}`}
          loading="lazy"
        />
      </div>

      {/* Level Badge */}
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
