import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { IconType } from "react-icons";
import styles from "./InvestmentsTypeCard.module.css";

interface InvestmentTypeCardProps {
  type: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  features: string[];
  onClick: () => void;
  delay?: number;
}

const InvestmentTypeCard: React.FC<InvestmentTypeCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  features,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${color}40`,
      }}
      onClick={onClick}
      style={
        {
          "--card-color": color,
        } as React.CSSProperties
      }
    >
      {/* Icon Section */}
      <div className={styles.iconSection}>
        <motion.div
          className={styles.iconWrapper}
          style={{ backgroundColor: color }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className={styles.icon} />
        </motion.div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {/* Features List */}
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className={styles.feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.05 }}
            >
              <span className={styles.checkmark} style={{ color }}>
                ✓
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <motion.button
        className={styles.actionButton}
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Explorar {title}</span>
        <FaArrowRight className={styles.buttonIcon} />
      </motion.button>

      {/* Decorative Elements */}
      <div
        className={styles.decorativeCircle}
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};

export default InvestmentTypeCard;
