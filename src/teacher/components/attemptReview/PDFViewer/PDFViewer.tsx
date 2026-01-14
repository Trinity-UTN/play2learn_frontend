import type React from "react";
import { FaFilePdf, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/shared";
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
  const getDownloadUrl = (): string => {
    if (fileUrl.includes("cloudinary.com")) {
      const urlParts = fileUrl.split("/upload/");
      if (urlParts.length === 2) {
        const encodedFileName = encodeURIComponent(fileName);
        return `${urlParts[0]}/upload/fl_attachment:${encodedFileName}/${urlParts[1]}`;
      }
    }
    return fileUrl;
  };

  const handleOpen = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    window.open(getDownloadUrl(), "_blank", "noopener,noreferrer");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
          onClick={handleDownload}
          className={styles.actionButton}
        >
          <FaDownload />
          <span>Descargar</span>
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
