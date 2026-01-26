import { useContext } from "react";
import { ActividadCreadaContext } from "../contexts/actividadCreadaContext/ActividadCreadaContext";

export const useActividadCreada = () => {
  const context = useContext(ActividadCreadaContext);
  if (!context) {
    throw new Error("useActividaCreada must be used within an ActividaCreadaProvider");
  }
  return context;
};
