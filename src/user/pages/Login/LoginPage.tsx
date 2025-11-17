import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import Card from "../../../shared/components/Card/CardComponent";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      password: password,
    };

    const destination = await login(data);
    if (destination) {
      navigate(destination, { replace: true });
    }

    setIsLoading(false);
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
          <div className={styles.contLogo}>
            <img src="/Logo.png" alt="logo" />
          </div>
          <div className={styles.header}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Iniciar Sesión
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
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </motion.form>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
