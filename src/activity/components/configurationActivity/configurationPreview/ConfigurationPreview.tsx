import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaChartLine,
  FaInfoCircle,
  FaRedoAlt,
  FaCoins,
} from "react-icons/fa";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { ConfigurationActivity } from "../../../types/Configuration.type";
import type { SubjectResponseDto } from "../../../../admin/services/subject/SubjectService";
import styles from "./ConfigurationPreview.module.css";

interface ConfigurationPreviewProps {
  configuration: ConfigurationActivity;
  selectedSubject?: SubjectResponseDto;
}

const difficultyOptions = [
  { value: "FACIL", label: "Fácil" },
  { value: "MEDIO", label: "Medio" },
  { value: "DIFICIL", label: "Difícil" },
];

const ConfigurationPreview: React.FC<ConfigurationPreviewProps> = ({
  configuration,
  selectedSubject,
}) => {
  const getDifficultyLabel = (value: string) => {
    const option = difficultyOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Sin fecha";
    return new Date(dateString).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const previewItems = [
    {
      icon: FaInfoCircle,
      title: "Descripción",
      value: configuration.description || "Sin descripción",
    },
    {
      icon: FaCalendarAlt,
      title: "Período",
      value: `${formatDate(configuration.startDate)} - ${formatDate(
        configuration.endDate
      )}`,
    },
    {
      icon: FaChartLine,
      title: "Dificultad",
      value: getDifficultyLabel(configuration.difficulty) || "Sin definir",
      badge: true,
    },
    {
      icon: FaClock,
      title: "Tiempo Máximo",
      value: `${configuration.maxTime} minutos`,
    },
    {
      icon: FaRedoAlt,
      title: "Cantidad de Intentos",
      value: `${configuration.attempts} intento${
        configuration.attempts !== 1 ? "s" : ""
      }`,
    },
    {
      icon: FaGraduationCap,
      title: "Materia",
      value: selectedSubject?.name || "Sin asignar",
    },
    {
      icon: FaCoins,
      title: "Balance Inicial",
      value: `${configuration.initialBalance || 0} monedas`,
    },
    {
      icon: FaCoins,
      title: "Estrategia de Distribución",
      value: configuration.typeReward || "Sin asignar",
    },
  ];

  return (
    <Card className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <div>
          <h3 className={styles.previewTitle}>
            Vista Previa de la Configuración
          </h3>
        </div>
      </div>

      <div className={styles.previewContent}>
        <div className={styles.previewGrid}>
          {previewItems.map((item, index) => (
            <div key={index} className={styles.previewItem}>
              <item.icon className={styles.previewIcon} />
              <div className={styles.previewItemContent}>
                <h4 className={styles.previewItemTitle}>{item.title}</h4>
                {item.badge ? (
                  <Badge variant="primary" className={styles.previewBadge}>
                    {item.value}
                  </Badge>
                ) : (
                  <p className={styles.previewItemValue}>{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ConfigurationPreview;
