import { FaFire, FaStar } from "react-icons/fa";
import { Badge } from "@/shared";
import styles from "./ActivityCardHeader.module.css";

interface ActivityCardHeaderProps {
  isNew?: boolean;
  isPopular?: boolean;
}

const ActivityCardHeader: React.FC<ActivityCardHeaderProps> = ({
  isNew,
  isPopular,
}) => {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.badges}>
        {isNew && (
          <Badge variant="success" className={styles.newBadge}>
            <FaFire className={styles.badgeIcon} />
            Nuevo
          </Badge>
        )}
        {isPopular && (
          <Badge variant="warning" className={styles.popularBadge}>
            <FaStar className={styles.badgeIcon} />
            Popular
          </Badge>
        )}
        {!isNew && !isPopular && <div className={styles.noBadge} />}
      </div>
    </div>
  );
};

export default ActivityCardHeader;
