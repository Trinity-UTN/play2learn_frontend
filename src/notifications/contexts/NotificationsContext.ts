import { createContext } from "react";
import type { NotificationsContextType } from "./NotificationsContext.type";

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);
