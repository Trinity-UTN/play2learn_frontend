import styles from "./AspectHeader.module.css";

interface AspectHeaderProps {
  title: string;
  icon: React.ReactNode;
}

const AspectHeader: React.FC<AspectHeaderProps> = ({ title, icon }) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>
        <span className={styles.titleIcon}>{icon}</span>
        {title}
      </h1>
    </div>
  );
};

export default AspectHeader;
