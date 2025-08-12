export interface Consequence {
  name: string;
  approvesActivity: boolean;
}

export interface DecisionNode {
  name: string;
  options: DecisionNode[];
  consecuence: Consequence | null;
}

export interface ArbolDecisionConfig {
  introduction: string;
  decisionTree: DecisionNode[];
}

export interface ArbolDecisionInterface {
  attempts: number; //TODO: ATTEMPTS REMOVAL
  introduction: string;
  decisionTree: DecisionNode[];
}

// Tipos auxiliares para la UI
export interface DecisionTreeBuilder {
  currentPath: number[];
  maxDepth: number;
  totalNodes: number;
}

export interface ValidationError {
  path: number[];
  message: string;
  field: string;
}
