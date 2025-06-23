import { createContext } from "react";
import type { UserContextType } from "../types/userTypes";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
