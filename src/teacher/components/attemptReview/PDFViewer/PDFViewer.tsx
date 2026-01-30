import { FaFilePdf, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { Button, LoadingSpinnerComponent } from "@/shared";
import { formatFileSize } from "@/shared/utils";
import { useFileDownloader } from "@/shared/hooks";
import styles from "./PDFViewer.module.css";

interface PDFViewerProps {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  fileName,
  fileSize,
}) => {
  const { downloadFile, isDownloading } = useFileDownloader();

  const handleOpen = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.fileCard}>
      <div className={styles.fileIcon}>
        <FaFilePdf />
      </div>

      <div className={styles.fileDetails}>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.fileSize}>{formatFileSize(fileSize)}</span>
      </div>

      <div className={styles.fileActions}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpen}
          className={styles.actionButton}
        >
          <FaExternalLinkAlt />
          <span>Abrir</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => downloadFile(fileUrl, fileName)}
          className={styles.actionButton}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <LoadingSpinnerComponent size="sm" text="" color="currentColor" />
          ) : (
            <FaDownload />
          )}
          <span>{isDownloading ? "Descargando..." : "Descargar"}</span>
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
