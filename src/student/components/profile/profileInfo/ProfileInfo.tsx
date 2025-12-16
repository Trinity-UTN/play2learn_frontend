import { FaGraduationCap, FaEdit } from "react-icons/fa";
import { Button } from "@/shared";
import Avatar from "../../common/Avatar/AvatarComponent";
import type { CurrentStudent } from "../../../types/CurrentStudent.type";
import styles from "./ProfileInfo.module.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const onChangePassword = () => {
    navigate("change-password");
  };
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
      <div className={styles.contButtons}>
        <Button
          className={styles.changePasswordButton}
          onClick={onChangePassword}
        >
          Cambiar contraseña
        </Button>
        <Button onClick={onEditAvatar} className={styles.editAvatarButton}>
          <FaEdit size={16} />
          Personalizar Avatar
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
