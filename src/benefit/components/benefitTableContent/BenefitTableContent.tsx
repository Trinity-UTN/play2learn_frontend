import { FaCoins, FaUsers, FaUser, FaCalendarAlt } from "react-icons/fa";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import Tooltip from "../../../shared/components/Tooltip/TooltipComponent";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  AnyBenefit,
  BenefitVariant,
  TeacherBenefitType,
} from "../../types/benefit.types";
import { formatBenefitDate } from "../../utils/benefit.utils";
import { useBenefitTableData } from "../../hooks/useBenefitTableData";
import styles from "./BenefitTableContent.module.css";

interface BenefitTableContentProps {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
  actionButton?: React.ReactNode;
  showStatsColumns?: boolean;
}

const BenefitTableContent: React.FC<BenefitTableContentProps> = ({
  benefit,
  variant,
  actionButton,
  showStatsColumns = true,
}) => {
  const {
    IconComponent,
    iconColor,
    category,
    showStats,
    categoryName,
    categoryColor,
    benefitName,
    benefitDescription,
    benefitCost,
    subjectName,
    subjectColor,
    isUseRequest,
    studentName,
  } = useBenefitTableData({
    benefit,
    variant,
  });

  const styleSuffix = variant === "student" ? "Student" : "Teacher";
  const isTeacherVariant = variant === "teacher";
  const benefitWithLimits = benefit as
    | BenefitResponseInterface
    | BenefitStudentResponseInterface
    | TeacherBenefitType;

  return (
    <>
      {/* Icono + Nombre + Categoría + Subject */}
      <td className={styles.tableCell}>
        <div className={styles.benefitInfo}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: iconColor }}
          >
            <IconComponent className={styles.benefitIcon} />
          </div>
          <div className={styles.benefitDetails}>
            <span className={styles[`benefitName${styleSuffix}`]}>
              {benefitName}
            </span>
            <div className={styles.badges}>
              {isUseRequest ? (
                <Badge variant="custom" size="sm" customColor={categoryColor}>
                  Solicitud de Uso
                </Badge>
              ) : (
                category && (
                  <Badge variant="custom" size="sm" customColor={categoryColor}>
                    {categoryName}
                  </Badge>
                )
              )}
              {subjectName && subjectColor && (
                <Badge variant="custom" size="sm" customColor={subjectColor}>
                  {subjectName}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Descripción / Estudiante */}
      <td className={`${styles.tableCell} ${styles.centeredCell}`}>
        {isUseRequest && studentName ? (
          <div className={styles.requestInfo}>
            <FaUser className={styles.studentIcon} />
            <span className={styles[`benefitDescription${styleSuffix}`]}>
              {studentName}
            </span>
          </div>
        ) : (
          <Tooltip content={benefitDescription} position="top">
            <p className={styles[`benefitDescription${styleSuffix}`]}>
              {benefitDescription}
            </p>
          </Tooltip>
        )}
      </td>

      {/* Columnas de stats - solo si NO es solicitud */}
      {showStats && !isUseRequest && showStatsColumns && (
        <>
          {/* Costo */}
          <td className={`${styles.tableCell} ${styles.centeredCell}`}>
            <div className={styles.statItem}>
              <FaCoins className={styles.costIcon} />
              <span className={styles[`statValue${styleSuffix}`]}>
                {benefitCost}
              </span>
            </div>
          </td>

          {/* Límite total / Canjes disponibles */}
          <td className={`${styles.tableCell} ${styles.centeredCell}`}>
            {isTeacherVariant ? (
              (benefitWithLimits as BenefitResponseInterface).purchaseLimit ? (
                <div className={styles.statItem}>
                  <FaUsers className={styles.limitIcon} />
                  <span className={styles[`statValue${styleSuffix}`]}>
                    {
                      (benefitWithLimits as BenefitResponseInterface)
                        .purchaseLimit
                    }
                  </span>
                </div>
              ) : (
                <Tooltip content={"Sin límite"} position="top">
                  <span className={styles[`emptyValue${styleSuffix}`]}>—</span>
                </Tooltip>
              )
            ) : (benefitWithLimits as BenefitStudentResponseInterface)
                .purchasesLeft !== null ? (
              <div className={styles.statItem}>
                <FaUsers className={styles.limitIcon} />
                <span className={styles[`statValue${styleSuffix}`]}>
                  {
                    (benefitWithLimits as BenefitStudentResponseInterface)
                      .purchasesLeft
                  }
                </span>
              </div>
            ) : (
              <Tooltip content={"Sin límite"} position="top">
                <span className={styles[`emptyValue${styleSuffix}`]}>—</span>
              </Tooltip>
            )}
          </td>

          {/* Límite por estudiante / Mis usos */}
          <td className={`${styles.tableCell} ${styles.centeredCell}`}>
            {isTeacherVariant ? (
              (benefitWithLimits as BenefitResponseInterface)
                .purchaseLimitPerStudent ? (
                <div className={styles.statItem}>
                  <FaUser className={styles.limitPerStudentIcon} />
                  <span className={styles[`statValue${styleSuffix}`]}>
                    {
                      (benefitWithLimits as BenefitResponseInterface)
                        .purchaseLimitPerStudent
                    }
                  </span>
                </div>
              ) : (
                <Tooltip content={"Sin límite"} position="top">
                  <span className={styles[`emptyValue${styleSuffix}`]}>—</span>
                </Tooltip>
              )
            ) : (benefitWithLimits as BenefitStudentResponseInterface)
                .purchasesLeftByStudent !== null ? (
              <div className={styles.statItem}>
                <FaUser className={styles.limitPerStudentIcon} />
                <span className={styles[`statValue${styleSuffix}`]}>
                  {
                    (benefitWithLimits as BenefitStudentResponseInterface)
                      .purchasesLeftByStudent
                  }
                </span>
              </div>
            ) : (
              <Tooltip content={"Sin límite"} position="top">
                <span className={styles[`emptyValue${styleSuffix}`]}>—</span>
              </Tooltip>
            )}
          </td>
        </>
      )}

      {/* Fecha de finalización */}
      {!isUseRequest && (
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          {"endAt" in benefit && benefit.endAt && (
            <div className={styles.dateSection}>
              <FaCalendarAlt className={styles.dateIcon} />
              <span className={styles.dateValue}>
                {formatBenefitDate(benefit.endAt)}
              </span>
            </div>
          )}
        </td>
      )}

      {/* Acciones */}
      {actionButton && (
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          <div className={styles.actions}>{actionButton}</div>
        </td>
      )}
    </>
  );
};

export default BenefitTableContent;
