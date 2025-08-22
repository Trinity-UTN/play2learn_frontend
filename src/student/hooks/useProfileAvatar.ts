import { useContext } from "react";
import { ProfileAvatarContext } from "../context/profileAvatarContext/ProfileAvatarContext";
import type { ProfileAvatarContextType } from "../context/profileAvatarContext/ProfileAvatarContext.type";

export const useProfileAvatar = (): ProfileAvatarContextType => {
  const context = useContext(ProfileAvatarContext);
  if (context === undefined) {
    throw new Error(
      "useProfileAvatar must be used within a ProfileAvatarProvider"
    );
  }
  return context;
};
