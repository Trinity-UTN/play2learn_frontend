import type { ConfigurationActivity } from "../types/Configuration.type";
export const makeData = <T extends Record<string, any>>(
  gameData: T,
  configuration: ConfigurationActivity
): T & ConfigurationActivity => {
  return {
    ...configuration,
    ...gameData,
  };
};
