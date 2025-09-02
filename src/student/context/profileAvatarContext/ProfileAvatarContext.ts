import { createContext } from "react";
import type { ProfileAvatarContextType } from "./ProfileAvatarContext.type";

export const ProfileAvatarContext = createContext<
  ProfileAvatarContextType | undefined
>(undefined);
