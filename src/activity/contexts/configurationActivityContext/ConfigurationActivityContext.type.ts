import type { ConfigurationActivity } from "../../types/Configuration.type";

export interface ConfigurationActivityContextType {
  configurationActivity?: ConfigurationActivity;
  registerConfigurationActivity(data: ConfigurationActivity): Promise<void>;
}
