import { useCallback, useMemo, useState, type ReactNode } from "react";
import { PasswordContext } from "./PasswordContext";
import type { PasswordContextType } from "./PasswordContext.type";

import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import type { ChangePassword } from "../../types/ChangePassword";
import { PasswordService } from "../../services/passwordService";

interface PasswordProviderProps {
  children: ReactNode;
}

export const PasswordProvider: React.FC<PasswordProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);

  const changePassword = useCallback(async (data: ChangePassword) => {
    setLoading(true);
    try {
      await PasswordService.changePasswordApi(data);
    } catch (error) {
      handleApiError(error, "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Objeto de acciones - ESTABLE (no cambia entre renders)
   * Solo se recalcula si las funciones cambian (cosa que no debería pasar)
   */
  const actions = useMemo(
    () => ({
      changePassword,
    }),
    [changePassword]
  );
  /**
   * Objeto de estado - CAMBIA cuando los datos cambian
   * Se recalcula solo cuando loading cambian
   */
  const state = useMemo(
    () => ({
      loading,
    }),
    [loading]
  );

  const contextValue: PasswordContextType = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <PasswordContext.Provider value={contextValue}>
      {children}
    </PasswordContext.Provider>
  );
};
