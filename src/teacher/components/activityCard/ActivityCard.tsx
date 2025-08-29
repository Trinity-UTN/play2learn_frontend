import type React from "react";
import { motion, type Variants } from "framer-motion";
import {
  FaGamepad,
  FaSpellCheck,
  FaQuestionCircle,
  FaSortAmountUp,
  FaPuzzlePiece,
  FaBrain,
  FaCheckCircle,
  FaRandom,
  FaClock,
  FaStar,
  FaFire,
} from "react-icons/fa";
import type { Activity } from "../../types/ActivityType";
import Card from "../../../shared/components/Card/CardComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./ActivityCard.module.css";
import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../../shared/components/GlowEffect/GlowEffect";

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
  className?: string;
}

const getActivityIcon = (iconName: string) => {
  const icons: { [key: string]: IconType } = {
    hangman: FaSpellCheck,
    questions: FaQuestionCircle,
    sequence: FaSortAmountUp,
    puzzle: FaPuzzlePiece,
    memory: FaBrain,
    complete: FaCheckCircle,
    random: FaRandom,
    default: FaGamepad,
  };
  return icons[iconName] || icons.default;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Variable":
      return "#c084fc";
    case "Fácil":
      return "#b9e769";
    case "Medio":
      return "#ff6f3c";
    case "Difícil":
      return "#007bff";
    default:
      return "#6b7280";
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
  className = "",
}) => {
  const IconComponent = getActivityIcon(activity.icon);
  const difficultyColor = getDifficultyColor(activity.difficulty);
  const navigate = useNavigate();
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const iconVariants: Variants = {
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.1,
      transition: { duration: 0.5 },
    },
  };

  const handleNavigate = (activity: Activity) => {
    onSelect?.(activity);
    navigate(
      `/dashboard/teacher/actividades/configuration/${activity.code_game}`
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`${styles.container} ${className}`}
    >
      <Card className={styles.activityCard}>
        {/* Header con badges */}
        <div className={styles.cardHeader}>
          <div className={styles.badges}>
            {activity.isNew && (
              <Badge variant="success" className={styles.newBadge}>
                <FaFire className={styles.badgeIcon} />
                Nuevo
              </Badge>
            )}
            {activity.isPopular && (
              <Badge variant="warning" className={styles.popularBadge}>
                <FaStar className={styles.badgeIcon} />
                Popular
              </Badge>
            )}
          </div>
          <div
            className={styles.difficultyBadge}
            style={{
              backgroundColor: `${difficultyColor}20`,
              color: difficultyColor,
            }}
          >
            {activity.difficulty}
          </div>
        </div>

        {/* Icono principal */}
        <motion.div
          variants={iconVariants}
          className={styles.iconWrapper}
          style={{ backgroundColor: activity.color }}
        >
          <IconComponent className={styles.activityIcon} />
        </motion.div>

        {/* Contenido principal */}
        <div className={styles.content}>
          <h3 className={styles.activityName}>{activity.name}</h3>
          <p className={styles.activityType}>{activity.type}</p>
          <p className={styles.activityDescription}>{activity.description}</p>

          {/* Información adicional */}
          <div className={styles.activityInfo}>
            <div className={styles.infoItem}>
              <FaClock className={styles.infoIcon} />
              <span>{activity.duration}</span>
            </div>
            <div className={styles.infoItem}>
              <FaGamepad className={styles.infoIcon} />
              <span>{activity.subject}</span>
            </div>
          </div>

          {/* Características */}
          <div className={styles.features}>
            {activity.features.slice(0, 3).map((feature, index) => (
              <span key={index} className={styles.feature}>
                {feature}
              </span>
            ))}
            {activity.features.length > 3 && (
              <span className={styles.moreFeatures}>
                +{activity.features.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Footer con botón */}
        <div className={styles.cardFooter}>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => handleNavigate(activity)}
            className={styles.selectButton}
          >
            Crear Actividad
          </Button>
        </div>

        {/* Efecto de brillo en hover */}
        <GlowEffect backgroundColor={activity.color} />
      </Card>
    </motion.div>
  );
};

export default ActivityCard;
