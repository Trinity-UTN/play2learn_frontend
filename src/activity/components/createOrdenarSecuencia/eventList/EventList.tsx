import { motion, Reorder } from "framer-motion";
import { FaGripVertical, FaListOl } from "react-icons/fa";
import type { SequenceEvent } from "../../../types/OrdenarSecuencia.type";
import EventCard from "../eventCard/EventCard";
import styles from "./EventList.module.css";

interface EventListProps {
  events: SequenceEvent[];
  onUpdateEvent: (id: string, updatedEvent: Partial<SequenceEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onReorderEvents: (newOrder: SequenceEvent[]) => void;
  cantEvents: number;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onUpdateEvent,
  onDeleteEvent,
  onReorderEvents,
  cantEvents,
}) => {
  if (events.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <FaGripVertical className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No hay eventos agregados</h3>
            <p className={styles.emptyDescription}>
              Comience agregando eventos para crear la secuencia. Los
              estudiantes deberán ordenar estos eventos en el orden correcto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.eventList}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <FaListOl className={styles.cardIcon} />
            Secuencia de Eventos ({events.length}/{cantEvents})
          </h3>
          <p className={styles.cardSubtitle}>
            Arrastra los eventos para cambiar el orden. Este será el orden
            correcto.
          </p>
        </div>

        <Reorder.Group
          axis="y"
          values={events}
          onReorder={(newOrder) => {
            onReorderEvents(newOrder);
          }}
          className={styles.reorderGroup}
        >
          {events.map((event, index) => (
            <Reorder.Item
              key={event.id}
              value={event}
              className={styles.reorderItem}
              whileDrag={{ zIndex: 1000 }}
            >
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <EventCard
                  event={event}
                  index={index}
                  onUpdate={(updatedEvent) =>
                    onUpdateEvent(event.id, updatedEvent)
                  }
                  onDelete={() => onDeleteEvent(event.id)}
                />
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className={styles.listFooter}>
          <div className={styles.orderInfo}>
            <FaGripVertical className={styles.gripIcon} />
            <span>
              Arrastra los eventos para cambiar el orden de la secuencia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
