import type { AvatarComponentsPreview } from "../../../types/CurrentStudent.type";
import styles from "./AvatarPreview.module.css";

interface AvatarPreviewProps {
  previewState: AvatarComponentsPreview;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = () => {
  return <div className={styles.container}>hola</div>;
};

export default AvatarPreview;
