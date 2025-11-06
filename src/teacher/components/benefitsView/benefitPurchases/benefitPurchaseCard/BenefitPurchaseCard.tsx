import { motion } from "framer-motion";
import { FaUser, FaBook, FaCheck, FaHashtag } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Badge from "../../../../../shared/components/Badge/BadgeComponent";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import {
  getBenefitPurchaseStatusConfig,
  canAcceptBenefitUse,
} from "../../../../../benefit/utils/benefitPurchase.utils";
import { getSubjectColor } from "../../../../../shared/constants/subject.constants";
import styles from "./BenefitPurchaseCard.module.css";

interface BenefitPurchaseCardProps {
  purchase: BenefitPurchaseSimpleResponse;
  onAcceptUse: (purchaseId: number) => void;
  loading: boolean;
}

const BenefitPurchaseCard: React.FC<BenefitPurchaseCardProps> = ({
  purchase,
  onAcceptUse,
  loading,
}) => {
  const statusConfig = getBenefitPurchaseStatusConfig(purchase.state);
  const canAccept = canAcceptBenefitUse(purchase.state);
  const subjectColor = getSubjectColor(purchase.subjectName);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getTooltipMessage = () => {
    switch (purchase.state) {
      case "PURCHASED":
        return "El estudiante aún no ha solicitado el uso del beneficio";
      case "USED":
        return "Este beneficio ya fue usado";
      default:
        return "Estado desconocido";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: canAccept ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`${styles.purchaseCard} ${
          !canAccept ? styles.disabled : ""
        }`}
      >
        <div className={styles.cardHeader}>
          <div className={styles.studentInfo}>
            <div className={styles.studentIcon}>
              <FaUser />
            </div>
            <div className={styles.studentDetails}>
              <h4 className={styles.studentName}>{purchase.studentName}</h4>
              <div className={styles.badges}>
                <Badge variant="custom" size="sm" customColor={subjectColor}>
                  <FaBook className={styles.badgeIcon} />
                  {purchase.subjectName}
                </Badge>
              </div>
            </div>
          </div>
          <Badge variant="custom" size="md" customColor={statusConfig.bgColor}>
            <statusConfig.icon className={styles.statusIcon} />
            {statusConfig.label}
          </Badge>
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <FaHashtag className={styles.infoIcon} />
            <span className={styles.infoLabel}>ID de Canje:</span>
            <span className={styles.infoValue}>{purchase.id}</span>
          </div>
        </div>

        <div className={styles.cardActions}>
          {canAccept ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => onAcceptUse(purchase.id)}
              disabled={loading}
              className={styles.acceptButton}
            >
              <FaCheck /> Aceptar Uso
            </Button>
          ) : (
            <Tooltip content={getTooltipMessage()} position="top">
              <Button
                variant="secondary"
                size="md"
                disabled
                className={styles.disabledButton}
              >
                <FaCheck /> Aceptar Uso
              </Button>
            </Tooltip>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitPurchaseCard;
