import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  texto?: string;
};
const BackButton = ({ texto }: Props) => {
  const navigate = useNavigate();
  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <FaArrowLeft />
      <span>{texto ? texto : "Volver"}</span>
    </button>
  );
};

export default BackButton;
