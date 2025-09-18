import styles from "./ActivityCardContent.module.css";

interface ActivityCardContentProps {
  name: string;
  type: string;
  description: string;
}

const ActivityCardContent: React.FC<ActivityCardContentProps> = ({
  name,
  type,
  description,
}) => (
  <div className={styles.content}>
    <h3 className={styles.activityName}>{name}</h3>
    <p className={styles.activityType}>{type}</p>
    <p className={styles.activityDescription}>{description}</p>
  </div>
);

export default ActivityCardContent;
