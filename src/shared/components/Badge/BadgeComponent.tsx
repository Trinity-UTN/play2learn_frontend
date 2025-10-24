import type React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "custom";
  className?: string;
  customColor?: { bg: string; text: string };
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  customColor,
}) => {
  const badgeClass = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  const customStyle =
    variant === "custom" && customColor
      ? { backgroundColor: customColor.bg, color: customColor.text }
      : undefined;

  return (
    <span className={badgeClass} style={customStyle}>
      {children}
    </span>
  );
};

export default Badge;
