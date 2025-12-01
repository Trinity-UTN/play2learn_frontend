import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { usePassword } from "../../hooks/usePassword";
import { useToaster } from "../../../shared/hooks/useToaster";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import Card from "../../../shared/components/Card/CardComponent";
import styles from "./ChangePassword.module.css";

export const ChangePasswordPage = () => {
  const { showToast } = useToaster();
  const { changePassword, loading } = usePassword();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setNewShowPassword] = useState(false);

  const showError = (data: string) => {
    showToast({
      title: `${data}`,
      position: "bottom-right",
      type: "error",
    });
  };
  const validatePassword = () => {
    if (newPassword === oldPassword) {
      showError("La nueva contraseña no puede ser igual a la anterior.");
      return false;
    }

    if (newPassword.length < 8 || newPassword.length > 32) {
      showError("La contraseña debe tener entre 8 y 32 caracteres.");
      return false;
    }

    const regex = {
      lower: /[a-z]/,
      upper: /[A-Z]/,
      number: /[0-9]/,
      special: /[^A-Za-z0-9]/,
    };

    if (!regex.lower.test(newPassword)) {
      showError("Debe incluir al menos una letra minúscula.");
      return false;
    }
    if (!regex.upper.test(newPassword)) {
      showError("Debe incluir al menos una letra mayúscula.");
      return false;
    }
    if (!regex.number.test(newPassword)) {
      showError("Debe incluir al menos un número.");
      return false;
    }
    if (!regex.special.test(newPassword)) {
      showError("Debe incluir al menos un carácter especial.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    const data = {
      oldPassword,
      newPassword,
    };

    await changePassword(data);
    resetForm();
  };
  const resetForm = () => {
    setNewPassword("");
    setOldPassword("");
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.loginWrapper}
      >
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Cambiar Contraseña
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Accede a tu cuenta institucional
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Contraseña antigua
              </label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Contraseña antigua"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  max={32}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Contraseña Nueva
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Input
                  id="NewPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="•••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  min={8}
                  max={32}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setNewShowPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Cambiando contraseña..." : "Cambiar Contraseña"}
            </Button>
          </motion.form>
        </Card>
      </motion.div>
    </div>
  );
};
