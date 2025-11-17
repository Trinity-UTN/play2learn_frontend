import styles from "./GlowEffect.module.css";
import { motion } from "framer-motion";

type Props = {
  backgroundColor: string;
};

const GlowEffect = ({ backgroundColor }: Props) => {
  return (
    <motion.div
      className={styles.glowEffect}
      style={{ backgroundColor: backgroundColor }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 0.1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default GlowEffect;
