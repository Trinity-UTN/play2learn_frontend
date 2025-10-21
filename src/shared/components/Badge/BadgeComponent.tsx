import type React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  style,
}) => {
  const badgeClass = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClass} style={style}>
      {children}
    </span>
  );
};

export default Badge;
