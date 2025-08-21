import styles from "./AspectPopup.module.css";

interface ActionButtonsPopupProps {
  hasChanges: boolean;
  loading: boolean;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsPopupProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default ActionButtons;
