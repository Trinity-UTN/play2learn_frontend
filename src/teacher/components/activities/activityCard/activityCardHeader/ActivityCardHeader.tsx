import styles from "./ActivityCardHeader.module.css";

interface ActivityCardHeaderProps {
  isNew?: boolean;
  isPopular?: boolean;
}

const ActivityCardHeader: React.FC<ActivityCardHeaderProps> = () => {
  return <div className={styles.cardHeader}></div>;
};

export default ActivityCardHeader;
