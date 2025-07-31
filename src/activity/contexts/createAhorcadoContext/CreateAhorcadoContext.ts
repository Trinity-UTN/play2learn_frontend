import { createContext } from "react";
import type { CreateAhorcadoContextType } from "./CreateAhorcadoContext.type";

export const CreateAhorcadoContext = createContext<
  CreateAhorcadoContextType | undefined
>(undefined);
