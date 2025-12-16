import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGripVertical,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import type { SequenceEvent } from "../../../types/OrdenarSecuencia.type";
import { Button, Input, useConfirmation } from "@/shared";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: SequenceEvent;
  index: number;
  onUpdate: (updatedEvent: Partial<SequenceEvent>) => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  //   index,
  onUpdate,
  onDelete,
}) => {
  const { showConfirmation } = useConfirmation();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(event.name);
  const [editDescription, setEditDescription] = useState(event.description);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  const validateEdit = () => {
    const newErrors: { name?: string; description?: string } = {};

    if (!editName.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (editName.length > 50) {
      newErrors.name = "El nombre no puede superar los 50 caracteres";
    }

    if (!editDescription.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (editDescription.length > 100) {
      newErrors.description =
        "La descripción no puede superar los 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateEdit()) return;

    onUpdate({
      name: editName.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setEditName(event.name);
    setEditDescription(event.description);
    setIsEditing(false);
    setErrors({});
  };

  const handleDelete = () => {
    showConfirmation({
      title: "Borrar evento",
      message: "¿Está seguro de que desea eliminar este evento?",
      type: "warning",
      onConfirm: () => {
        onDelete();
      },
    });
  };

  return (
    <motion.div
      className={styles.eventCard}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.dragHandle}>
          <FaGripVertical className={styles.gripIcon} />
        </div>
        <div className={styles.orderBadge}>
          <span className={styles.orderNumber}>{event.order + 1}</span>
        </div>
        <div className={styles.cardActions}>
          {!isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className={styles.actionButton}
              >
                <FaEdit />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                <FaTrash />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={styles.actionButton}
              >
                <FaSave />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className={styles.actionButton}
              >
                <FaTimes />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        {event.imagePreview && (
          <div className={styles.imageContainer}>
            <img
              src={event.imagePreview || "/placeholder.svg"}
              alt={event.name}
              className={styles.eventImage}
            />
            <div className={styles.imageOverlay}>
              <FaImage className={styles.imageIcon} />
            </div>
          </div>
        )}

        <div className={styles.eventDetails}>
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.inputGroup}>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  error={errors.name}
                  className={styles.editInput}
                />
                <div className={styles.charCounter}>
                  <span
                    className={editName.length > 50 ? styles.overLimit : ""}
                  >
                    {editName.length}/50
                  </span>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className={`${styles.editTextarea} ${
                    errors.description ? styles.error : ""
                  }`}
                  rows={2}
                />
                {errors.description && (
                  <span className={styles.errorText}>{errors.description}</span>
                )}
                <div className={styles.charCounter}>
                  <span
                    className={
                      editDescription.length > 100 ? styles.overLimit : ""
                    }
                  >
                    {editDescription.length}/100
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.eventInfo}>
              <h4 className={styles.eventName}>{event.name}</h4>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
