import { useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./Tooltip.module.css";

type TooltipPosition = "top" | "right" | "bottom" | "left";
type TooltipTrigger = "hover" | "click";

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  long?: boolean;
  trigger?: TooltipTrigger;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
  icon = <FaInfoCircle />,
  className = "",
  long = false,
  trigger = "hover",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tooltipClass = [
    styles.tooltip,
    styles[`tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`],
    long && styles.tooltipLong,
    trigger === "click" && isOpen && styles.tooltipVisible, // ← clase para forzar visibilidad
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Cierra al hacer click fuera
  useEffect(() => {
    if (trigger !== "click") return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [trigger]);

  const handleClick = () => {
    if (trigger === "click") setIsOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.tooltipContainer} ${trigger === "click" ? styles.tooltipClickMode : ""}`}
      onClick={handleClick}
    >
      {children || <div className={styles.tooltipIcon}>{icon}</div>}
      <div className={tooltipClass}>{content}</div>
    </div>
  );
};

export default Tooltip;
