import styles from "./ActivitiesCreatedHeader.module.css";

const ActivitiesCreatedHeader = () => {
  return (
    <>
      <div>
        <h1 className={styles.title}>Gestión de Actividades</h1>
        <p className={styles.subtitle}>
          Administra y monitorea el progreso de tus actividades
        </p>
      </div>
    </>
  );
};

export default ActivitiesCreatedHeader;
