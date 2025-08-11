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

export const makeFormData = <T extends Record<string, any>>(
  gameData: T,
  configuration: ConfigurationActivity
): FormData => {
  const formData = new FormData();
  const combinedData = {
    ...configuration,
    ...gameData,
  };

  for (const key in combinedData) {
    const value = combinedData[key];

    if (value === undefined || value === null) {
      continue; // Ignorar valores undefined o null
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else if (typeof item === "object" && item !== null) {
          formData.append(key, JSON.stringify(item));
        } else {
          formData.append(key, String(item));
        }
      });
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }
  return formData;
};
