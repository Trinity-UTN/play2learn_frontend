import type { CreateSubjectPayload } from "../../services/subject/SubjectService";

export interface SubjectContextType {
  loading: boolean;
  registerSubject: (data: CreateSubjectPayload) => Promise<void>;
}
