import { motion } from "framer-motion";
import styles from "./BenefitsList.module.css";
import type { BenefitResponseInterface } from "../../../types/BenefitType";
import { FaGift } from "react-icons/fa";
import BenefitCard from "../benefitCard/BenefitCard";

type Props = {
  filteredBenefits: BenefitResponseInterface[];
};

const BenefitsList = ({ filteredBenefits }: Props) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <>
      <div className={styles.benefitsGrid}>
        {filteredBenefits.map((benefit) => {
          //   const IconComponent = getBenefitIcon(benefit.icon);
          return (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BenefitCard benefit={benefit} />
            </motion.div>
          );
        })}
      </div>
      {filteredBenefits.length === 0 && (
        <motion.div variants={itemVariants} className={styles.noResults}>
          <FaGift className={styles.noResultsIcon} />
          <h3 className={styles.noResultsTitle}>
            No se encontraron beneficios
          </h3>
          <p className={styles.noResultsText}>
            Intenta ajustar los filtros o términos de búsqueda para encontrar
            beneficios.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default BenefitsList;
