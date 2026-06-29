import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = false, style }, ref) => {
    const cardClass = [styles.card, className].filter(Boolean).join(" ");

    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
          className={cardClass}
          style={style}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardClass} style={style}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
