import { useContext } from "react";
import { ConfigurationActivityContext } from "../contexts/configurationActivityContext/ConfigurationActivityContext";

export const useConfigurationActivity = () => {
  const context = useContext(ConfigurationActivityContext);
  if (!context) {
    throw new Error("useConfigurationActivity must be used within an ConfigurationActivityProvider");
  }
  return context;
};
