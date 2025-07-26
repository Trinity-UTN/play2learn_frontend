import { useState, type ReactNode } from "react";

import { ConfigurationActivityContext } from "./ConfigurationActivityContext";
import type { ConfigurationActivityContextType } from "./ConfigurationActivityContext.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";

interface ConfigurationActivityProviderProps {
  children: ReactNode;
}

export const ConfigurationActivityProvider: React.FC<
  ConfigurationActivityProviderProps
> = ({ children }) => {
  const [configurationActivity, setConfigurationActivity] =
    useState<ConfigurationActivity>();

  const registerConfigurationActivity = async (
    data: ConfigurationActivity
  ): Promise<void> => {
    setConfigurationActivity(data);
  };

  const contextValue: ConfigurationActivityContextType = {
    configurationActivity,
    registerConfigurationActivity,
  };

  return (
    <ConfigurationActivityContext.Provider value={contextValue}>
      {children}
    </ConfigurationActivityContext.Provider>
  );
};
