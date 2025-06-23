import type React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const badgeClass = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
