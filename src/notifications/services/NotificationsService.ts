import type { Notification } from "../types/notification.types";
import api from "../../shared/utils/api";
import { urls } from "./notification.urls";

export const NotificationsService = {
  getUserNotifications: async (): Promise<Notification[]> => {
    const response = await api.get(urls.UserNotifications);
    return response.data.data;
  },

  markAsRead: async (notificationId: number): Promise<Notification> => {
    const response = await api.put(urls.MarkAsRead(notificationId));
    return response.data.data;
  },
};
