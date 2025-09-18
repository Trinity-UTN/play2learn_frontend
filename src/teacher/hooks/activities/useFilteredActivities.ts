import type { Activity } from "../../types/TeacherActivity.type";

export const useFilteredActivities = (
  activities: Activity[],
  searchTerm: string,
  sortBy: string
): Activity[] => {
  return activities
    .filter((activity) => {
      const search = searchTerm.toLowerCase();
      return (
        activity.name.toLowerCase().includes(search) ||
        activity.description.toLowerCase().includes(search) ||
        activity.type.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "popular")
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      return 0;
    });
};
