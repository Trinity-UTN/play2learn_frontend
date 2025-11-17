import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Activity } from "../../../types/TeacherActivity.type";
import Card from "../../../../shared/components/Card/CardComponent";
import GlowEffect from "../../../../shared/components/GlowEffect/GlowEffect";
import ActivityCardHeader from "./activityCardHeader/ActivityCardHeader";
import ActivityCardIcon from "./activityCardIcon/ActivityCardIcon";
import ActivityCardContent from "./activityCardContent/ActivityCardContent";
import ActivityCardFooter from "./activityCardFooter/ActivityCardFooter";
import { getActivityIcon } from "../../../../shared/utils/activityIcons";
import styles from "./ActivityCard.module.css";

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
  className = "",
}) => {
  const IconComponent = getActivityIcon(activity.code_game);
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
        <ActivityCardHeader
          isNew={activity.isNew}
          isPopular={activity.isPopular}
        />

        <ActivityCardIcon
          icon={<IconComponent className={styles.activityIcon} />}
          backgroundColor={activity.color}
        />

        <ActivityCardContent
          name={activity.name}
          type={activity.type}
          description={activity.description}
        />

        <ActivityCardFooter onClick={() => handleNavigate(activity)} />

        <GlowEffect backgroundColor={activity.color} />
      </Card>
    </motion.div>
  );
};

export default ActivityCard;
