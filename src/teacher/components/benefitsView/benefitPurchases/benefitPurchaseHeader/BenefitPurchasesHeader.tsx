import { useState } from "react";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import BenefitPurchaseInfo from "../benefitPurchaseInfo/BenefitPurchaseInfo";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitPurchasesHeader.module.css";

type BenefitPurchaseHeaderProps = {
  onNavigate: () => void;
  firstPurchase: BenefitPurchaseSimpleResponse | null;
};

const BenefitPurchasesHeader = ({
  onNavigate,
  firstPurchase,
}: BenefitPurchaseHeaderProps) => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <Button
          variant="ghost"
          size="md"
          onClick={onNavigate}
          className={styles.backButton}
        >
          <FaArrowLeft /> Volver
        </Button>

        <div className={styles.headerContent}>
          <h1 className={styles.title}>Canjes de Beneficios</h1>
          <p className={styles.subtitle}>
            Administra los canjes de beneficios realizados por los estudiantes
          </p>
        </div>

        {firstPurchase && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowInfo(!showInfo)}
            className={styles.toggleButton}
          >
            {showInfo ? <FaChevronUp /> : <FaChevronDown />}
            {showInfo ? "Ocultar" : "Ver"} Info
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showInfo && firstPurchase && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <BenefitPurchaseInfo purchase={firstPurchase} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BenefitPurchasesHeader;
