import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaEllipsisV } from "react-icons/fa";
import { Button } from "@/shared";
import styles from "./StudentActivityFab.module.css";

export interface FabAction {
  key: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

interface StudentActivityFabProps {
  actions: FabAction[];
  visible: boolean;
}

const StudentActivityFab: React.FC<StudentActivityFabProps> = ({
  actions,
  visible,
}) => {
  const [open, setOpen] = useState(false);

  const handleAction = (action: FabAction) => {
    if (action.disabled) return;
    action.onClick();
    setOpen(false);
  };

  return createPortal(
    <AnimatePresence onExitComplete={() => setOpen(false)}>
      {visible && actions.length > 0 && (
        <motion.div
          className={styles.fabContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.18 }}
              >
                {actions.map((action) => (
                  <Button
                    key={action.key}
                    variant={action.variant}
                    className={[styles.action, action.className]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleAction(action)}
                    disabled={action.disabled}
                  >
                    {action.children}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="button"
            variant="ghost"
            className={styles.fab}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Cerrar acciones" : "Abrir acciones"}
            aria-expanded={open}
          >
            <motion.span
              className={styles.fabIcon}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <FaTimes /> : <FaEllipsisV />}
            </motion.span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default StudentActivityFab;
