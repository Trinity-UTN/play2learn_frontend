import { createContext } from "react";
import type { UserContextType } from "./UserContext.types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
