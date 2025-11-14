import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import InvestmentTypeCard from "../../components/InvestmentsView/InvestmentsTypeCard/InvestmentsTypeCard";
import styles from "./InvestmentsView.module.css";
import { Link, useNavigate } from "react-router-dom";
import { investmentTypes } from "../../contanst/investmentsView.contanst";

const InvestmentsView = () => {
  const navigate = useNavigate();
  const handleNavigateClick = (url: string) => {
    navigate(url);
  };
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.iconContainer}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <FaRocket className={styles.headerIcon} />
          </motion.div>
          <h1 className={styles.title}>Centro de Inversiones</h1>
          <p className={styles.subtitle}>Elige cómo hacer crecer tus monedas</p>
        </div>

        {/* Investment Types Grid */}
        <div className={styles.typesGrid}>
          {investmentTypes.map((item) => (
            <InvestmentTypeCard
              key={item.type}
              {...item}
              onClick={() => handleNavigateClick(item.url)}
            />
          ))}
        </div>

        {/* Educational Banner */}
        <motion.div
          className={styles.educationalBanner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className={styles.bannerIcon}>💡</div>
          <div className={styles.bannerContent}>
            <h3>¿No sabes por dónde empezar?</h3>
            <p>
              Visita nuestra sección de{" "}
              <Link
                to="/dashboard/student/wallet/financial-education"
                className={styles.linkTo}
              >
                Educación Financiera
              </Link>{" "}
              para aprender sobre cada tipo de inversión y tomar decisiones
              inteligentes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvestmentsView;
