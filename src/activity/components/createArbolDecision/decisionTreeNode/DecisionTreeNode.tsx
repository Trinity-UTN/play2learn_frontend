import { FaPlus, FaFlag, FaTrash } from "react-icons/fa";
import type {
  Consequence,
  DecisionNode,
} from "../../../types/ArbolDecision.type";
import ConsequenceNode from "../consequenceNode/ConsequenceNode";
import styles from "../generalConfig/GeneralConfiguration.module.css";

interface DecisionTreeNodeProps {
  node: DecisionNode;
  path: number[];
  depth: number;
  onUpdateName: (path: number[], name: string) => void;
  onAddOptions: (path: number[]) => void;
  onAddConsequence: (path: number[]) => void;
  onRemoveContent: (path: number[]) => void;
  onUpdateConsequence: (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => void;
}

const DecisionTreeNode: React.FC<DecisionTreeNodeProps> = ({
  node,
  path,
  depth,
  onUpdateName,
  onAddOptions,
  onAddConsequence,
  onRemoveContent,
  onUpdateConsequence,
}) => {
  const isRootLevel = depth === 0;
  const nodeClass = isRootLevel ? styles.decisionNode : styles.optionNode;
  const inputClass = isRootLevel ? styles.decisionInput : styles.optionInput;
  const placeholder = isRootLevel
    ? `Decisión ${path[0] + 1}`
    : `${depth === 1 ? "Opción" : "Sub-opción"} ${path[path.length - 1] + 1}`;

  const hasContent = node.options.length > 0 || node.consecuence !== null;

  const getLevelText = (depth: number): string => {
    if (depth === 0) return "Principal";
    return `Nivel ${depth}`;
  };

  return (
    <div
      className={depth === 0 ? styles.decisionBranch : styles.subOptionBranch}
    >
      {/* Nodo actual */}
      <div className={nodeClass} data-depth={depth}>
        {/* Badge de nivel */}
        <div className={styles.levelBadge}>{getLevelText(depth)}</div>

        <input
          type="text"
          value={node.name}
          onChange={(e) => onUpdateName(path, e.target.value)}
          placeholder={placeholder}
          className={inputClass}
          maxLength={200}
        />

        <div className={styles.charCount}>
          <span
            className={node.name.length > 200 ? styles.overLimit : ""}
          ></span>
        </div>

        {/* Botones de Acción */}
        {!hasContent && (
          <div className={styles.nodeActions}>
            <button
              type="button"
              onClick={() => onAddOptions(path)}
              className={styles.actionBtn}
              title="Agregar opciones"
            >
              <FaPlus />
            </button>
            <button
              type="button"
              onClick={() => onAddConsequence(path)}
              className={styles.actionBtn}
              title="Agregar consecuencia"
            >
              <FaFlag />
            </button>
          </div>
        )}
        {hasContent && (
          <div className={styles.nodeActions}>
            <button
              type="button"
              onClick={() => onRemoveContent(path)}
              className={styles.removeBtn}
              title="Limpiar contenido"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Opciones hijas */}
      {node.options.length > 0 && (
        <div
          className={
            depth === 0 ? styles.optionsContainer : styles.subOptionsContainer
          }
        >
          {node.options.map((option, optionIndex) => (
            <DecisionTreeNode
              key={`${path.join("-")}-${optionIndex}`}
              node={option}
              path={[...path, optionIndex]}
              depth={depth + 1}
              onUpdateName={onUpdateName}
              onAddOptions={onAddOptions}
              onAddConsequence={onAddConsequence}
              onRemoveContent={onRemoveContent}
              onUpdateConsequence={onUpdateConsequence}
            />
          ))}
        </div>
      )}

      {/* Consecuencia */}
      {node.consecuence && (
        <ConsequenceNode
          consequence={node.consecuence}
          path={path}
          onUpdate={onUpdateConsequence}
        />
      )}
    </div>
  );
};

export default DecisionTreeNode;
