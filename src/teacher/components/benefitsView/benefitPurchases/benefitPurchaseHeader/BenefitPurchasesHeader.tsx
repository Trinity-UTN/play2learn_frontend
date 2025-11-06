import { FaArrowLeft } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import styles from "./BenefitPurchasesHeader.module.css";

type BenefitPurchaseHeaderProps = {
  onNavigate: () => void;
};

const BenefitPurchasesHeader = ({ onNavigate }: BenefitPurchaseHeaderProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="md"
        onClick={onNavigate}
        className={styles.backButton}
      >
        <FaArrowLeft /> Volver
      </Button>
      <div>
        <h1 className={styles.title}>Canjes de Beneficios</h1>
        <p className={styles.subtitle}>
          Administra los canjes de beneficios realizados por los estudiantes
        </p>
      </div>
    </>
  );
};

export default BenefitPurchasesHeader;
