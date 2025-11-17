import { motion, type Variants } from "framer-motion";
import styles from "./ActivityCardIcon.module.css";

interface ActivityCardIconProps {
  icon: React.ReactElement;
  backgroundColor: string;
}

const iconVariants: Variants = {
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: { duration: 0.5 },
  },
};

const ActivityCardIcon: React.FC<ActivityCardIconProps> = ({
  icon,
  backgroundColor,
}) => {
  return (
    <motion.div
      variants={iconVariants}
      className={styles.iconWrapper}
      style={{ backgroundColor }}
    >
      {icon}
    </motion.div>
  );
};

export default ActivityCardIcon;
