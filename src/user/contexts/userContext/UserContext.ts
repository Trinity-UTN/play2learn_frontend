import { createContext } from "react";
import type { UserContextType } from "./UserContext.type";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
