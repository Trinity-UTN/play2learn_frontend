import { FaGraduationCap, FaEdit } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Avatar from "../../common/Avatar/AvatarComponent";
import type { CurrentStudent } from "../../../types/CurrentStudent.type";
import styles from "./ProfileInfo.module.css";

interface ProfileInfoProps {
  currentStudent: CurrentStudent | null;
  onEditAvatar: () => void;
  avatarSize?: "small" | "medium" | "large";
  showLevel?: boolean;
  showRing?: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  currentStudent,
  onEditAvatar,
  avatarSize = "large",
  showLevel = true,
  showRing = true,
}) => {
  return (
    <div className={styles.headerContent}>
      <div className={styles.avatarSection}>
        <Avatar
          size={avatarSize}
          showLevel={showLevel}
          showRing={showRing}
          className={styles.profileAvatar}
        />

        <div className={styles.profileInfo}>
          <h1 className={styles.studentName}>
            {currentStudent?.name} {currentStudent?.lastname}
          </h1>
          <p className={styles.studentEmail}>{currentStudent?.user?.email}</p>
          <div className={styles.studentCourse}>
            <FaGraduationCap size={20} />
            <span>
              {currentStudent?.course?.year?.name}{" "}
              {currentStudent?.course?.name}
            </span>
          </div>
        </div>
      </div>

      <Button onClick={onEditAvatar} className={styles.editAvatarButton}>
        <FaEdit size={16} />
        Personalizar Avatar
      </Button>
    </div>
  );
};

export default ProfileInfo;
