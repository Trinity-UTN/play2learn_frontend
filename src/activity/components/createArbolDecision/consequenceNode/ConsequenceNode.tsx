import { FaFlag } from "react-icons/fa";
import type { Consequence } from "../../../types/ArbolDecision.type";
import styles from "../generalConfig/GeneralConfiguration.module.css";

interface ConsequenceNodeProps {
  consequence: Consequence;
  path: number[];
  onUpdate: (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => void;
}

const ConsequenceNode: React.FC<ConsequenceNodeProps> = ({
  consequence,
  path,
  onUpdate,
}) => {
  return (
    <div className={styles.consequenceContainer}>
      <div
        className={`${styles.consequenceNode} ${
          consequence.approvesActivity ? styles.approved : styles.rejected
        }`}
      >
        <FaFlag className={styles.consequenceIcon} />
        <textarea
          value={consequence.name}
          onChange={(e) => onUpdate(path, "name", e.target.value)}
          placeholder="Describe la consecuencia..."
          className={styles.consequenceTextarea}
          rows={2}
          maxLength={200}
        />
        <div className={styles.charCount}>
          <span
            className={consequence.name.length > 200 ? styles.overLimit : ""}
          ></span>
        </div>
        <div className={styles.approvalSection}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={!consequence.approvesActivity}
              onChange={(e) =>
                onUpdate(path, "approvesActivity", !e.target.checked)
              }
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Actividad desaprobada</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ConsequenceNode;
