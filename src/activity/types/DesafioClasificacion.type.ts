export interface ConceptPayload {
  name: string;
}
export interface CategoryPayload {
  name: string;
  concepts: ConceptPayload[];
}

export interface ClassificationConcept {
  id: string;
  name: string;
  categoryId: string;
}

export interface ClassificationCategory {
  id: string;
  name: string;
  concepts: ClassificationConcept[];
  color: string;
}

export interface CreateClassification {
  attempts: number; // TODO: ATTEMPTS REMOVAL
  categories: CategoryPayload[];
}
