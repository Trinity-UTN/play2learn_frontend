import { FaInfoCircle } from "react-icons/fa";
import styles from "./Tooltip.module.css";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
  icon = <FaInfoCircle />,
  className = "",
}) => {
  const tooltipClass = [
    styles.tooltip,
    styles[`tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.tooltipContainer}>
      {children || <div className={styles.tooltipIcon}>{icon}</div>}
      <div className={tooltipClass}>{content}</div>
    </div>
  );
};

export default Tooltip;
