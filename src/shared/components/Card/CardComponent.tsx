import type React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  style,
}) => {
  const cardClass = [styles.card, className].filter(Boolean).join(" ");

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cardClass}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClass}>{children}</div>;
};

export default Card;
