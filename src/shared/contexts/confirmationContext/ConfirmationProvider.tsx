import { useState, type ReactNode } from "react";
import { ConfirmationContext } from "./ConfirmationContext";
import type { ConfirmationContextType } from "./ConfirmationContext.type";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import type { ConfirmationConfig } from "../../types/Confirmation.type";

interface ConfirmationProviderProps {
  children: ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig>({
    title: "",
    message: "",
  });
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);

  const showConfirmation = (alertConfig: ConfirmationConfig) => {
    setConfig(alertConfig);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (config.showDoubleConfirmation && !showSecondConfirmation) {
      setShowSecondConfirmation(true);
      return;
    }
    config.onConfirm?.();
    closeConfirmation();
  };

  const closeConfirmation = () => {
    setIsOpen(false);
    setShowSecondConfirmation(false);
    if (isOpen) {
      config.onCancel?.();
    }
  };

  const contextValue: ConfirmationContextType = {
    showConfirmation,
    closeConfirmation,
  };

  return (
    <ConfirmationContext.Provider value={contextValue}>
      {children}
      <ConfirmationModal
        title={config.title}
        message={config.message}
        type={config.type}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        isOpen={isOpen}
        showDoubleConfirmation={config.showDoubleConfirmation}
        showSecondConfirmation={showSecondConfirmation}
        doubleConfirmationText={config.doubleConfirmationText}
        rules={config.rules}
        hideCancel={config.hideCancel}
        onConfirm={handleConfirm}
        onClose={closeConfirmation}
      />
    </ConfirmationContext.Provider>
  );
};
