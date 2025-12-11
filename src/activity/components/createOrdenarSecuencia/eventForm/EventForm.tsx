import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaImage, FaTimes, FaTag, FaAlignLeft } from "react-icons/fa";
import type { SequenceEvent } from "../../../types/OrdenarSecuencia.type";
import { Button, Input, TextArea, Tooltip, useToaster } from "@/shared";
import styles from "./EventForm.module.css";

interface EventFormProps {
  onAddEvent: (event: Omit<SequenceEvent, "id" | "order">) => void;
  disabled?: boolean;
  cantEvents: number;
}

const EventForm: React.FC<EventFormProps> = ({
  onAddEvent,
  disabled = false,
  cantEvents,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  const { showToast } = useToaster();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (name.length > 50) {
      newErrors.name = "El nombre no puede superar los 50 caracteres";
    }

    if (!description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (description.length > 100) {
      newErrors.description =
        "La descripción no puede superar los 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit

        showToast({
          title: "La imagen no puede superar los 5MB",
          type: "warning",
          position: "top-center",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        showToast({
          title: "Solo se permiten archivos de imagen",
          type: "warning",
          position: "top-center",
        });
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAddEvent({
      name: name.trim(),
      description: description.trim(),
      image,
      imagePreview,
    });

    // Reset form
    setName("");
    setDescription("");
    setImage(null);
    setImagePreview("");
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaTag className={styles.sectionIcon} />
                Nombre del evento
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Máximo 50 caracteres" />
                </span>
              </h4>
            </div>
            {disabled ? (
              <p className={styles.sectionDescriptionWarning}>
                Máximo de {cantEvents} eventos alcanzado
              </p>
            ) : (
              <p className={styles.sectionDescription}>
                Indica el nombre del evento que deseas crear
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              min={3}
              max={50}
              disabled={disabled}
              className={styles.nameInput}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaAlignLeft className={styles.sectionIcon} />
                Descripción del evento
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Máximo 100 caracteres" />
                </span>
              </h4>
            </div>
            {disabled ? (
              <p className={styles.sectionDescriptionWarning}>
                Máximo de {cantEvents} eventos alcanzado
              </p>
            ) : (
              <p className={styles.sectionDescription}>
                Indica la descripción del evento
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={100}
              showCharCount={true}
              resize="vertical"
              disabled={disabled}
              className={styles.descriptionTextarea}
            />
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageUpload}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={disabled}
              className={styles.fileInput}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className={styles.imageButton}
            >
              <FaImage />
              {image ? "Cambiar Imagen" : "Agregar Imagen (Opcional)"}
            </Button>
          </div>

          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.imagePreview}
            >
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Vista previa"
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={removeImage}
                className={styles.removeImageButton}
                disabled={disabled}
              >
                <FaTimes />
              </button>
            </motion.div>
          )}
        </div>

        <div className={styles.formActions}>
          <Button
            type="submit"
            variant="primary"
            disabled={disabled || !name.trim() || !description.trim()}
            className={styles.addButton}
          >
            <FaPlus />
            Agregar Evento
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
