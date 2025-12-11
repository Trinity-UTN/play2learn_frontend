import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { Card } from "@/shared";
import styles from "./FormSection.module.css";

interface FormSectionProps {
  icon: IconType;
  title: string;
  children: ReactNode;
}

const FormSectionCard: React.FC<FormSectionProps> = ({
  icon: Icon,
  title,
  children,
}) => {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Icon className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </Card>
  );
};

export default FormSectionCard;
