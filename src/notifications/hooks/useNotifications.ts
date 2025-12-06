import { useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return context;
};
