export const urls = {
  UserNotifications: "/notifications",
  MarkAsRead: (notificationId: number) =>
    `/notifications/mark-as-read/${notificationId}`,
};
