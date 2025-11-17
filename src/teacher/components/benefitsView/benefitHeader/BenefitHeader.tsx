import { FaGift } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./BenefitHeader.module.css";

type BenefitHeaderProps = {
  onNavigate: (path: string) => void;
};

const BenefitHeader = ({ onNavigate }: BenefitHeaderProps) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>Gestión de Beneficios</h1>
        <p className={styles.subtitle}>
          Administra las recompensas disponibles para los estudiantes
        </p>
      </div>
      <Button
        variant="primary"
        className={styles.createButton}
        onClick={() => onNavigate("/dashboard/teacher/beneficio/create")}
      >
        <FaGift className={styles.buttonIcon} />
        Nuevo Beneficio
      </Button>
    </>
  );
};

export default BenefitHeader;
