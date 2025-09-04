import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSave } from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import { useYear } from "../../hooks/useYear";
import { useCourse } from "../../hooks/useCourse";
import { useStudent } from "../../hooks/useStudent";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";
import styles from "./CreateStudentView.module.css";

const CreateStudentView: React.FC = () => {
  const { years, getYear } = useYear();
  const { courses, getCourse } = useCourse();
  const { loading, selectedStudent, registerStudent, updateStudent } =
    useStudent();
  const { id } = useParams<{ id: string }>();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    year_id: 0,
    course_id: 0,
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    getYear();
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      const loadYearData = async () => {
        try {
          setFormData({
            name: selectedStudent?.name || "",
            lastname: selectedStudent?.lastname || "",
            dni: selectedStudent?.dni || "",
            email: selectedStudent?.user.email || "",
            year_id: selectedStudent?.course.year.id || 0,
            course_id: selectedStudent?.course.id || 0,
          });
        } catch (error) {
          handleApiError(error, "Error al cargar el estudiante");
          navigate("/dashboard/students/list");
        }
      };
      loadYearData();
    }
  }, [id, isEditMode, navigate]);

  const filteredCourses = courses.filter(
    (course) => course.year.id === formData.year_id
  );

  const resetFormData = () => {
    setFormData({
      name: "",
      lastname: "",
      dni: "",
      email: "",
      year_id: 0,
      course_id: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      dni: formData.dni.trim(),
      email: formData.email.trim(),
      course_id: formData.course_id,
    };
    try {
      if (isEditMode && id) {
        const idN = id ? Number(id) : 0;
        const data = { id: idN, ...payload };

        await updateStudent(data);
        showToast({
          title: "Estudiante actualizado exitosamente",
          message: "El estudiante ha sido actualizado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        navigate("/dashboard/students/list");
      } else {
        await registerStudent(formData);
        showToast({
          title: "Estudiante creado exitosamente",
          message: "El estudiante ha sido creado exitosamente",
          type: "success",
          position: "bottom-right",
        });
        resetFormData();
      }
    } catch (err) {
      showToast({
        title:
          "Error al" +
          (isEditMode ? " actualizar" : " crear") +
          " el estudiante",
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate("/dashboard/students/list");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEditMode ? "Modificar Estudiante" : "Generar Estudiante"}
        </h1>
        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifica la información del estudiante"
            : "Registra un nuevo estudiante en el sistema"}
        </p>
      </div>

      <Card className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaGraduationCap className={styles.headerIcon} />
          <h2 className={styles.cardTitle}>Información del Estudiante</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombres *</label>
              <Input
                placeholder="Nombre del estudiante"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Apellidos *</label>
              <Input
                placeholder="Apellido del estudiante"
                value={formData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>DNI *</label>
              <Input
                placeholder="DNI del estudiante"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo Electrónico *</label>
              <Input
                type="email"
                placeholder="Dirección de email del estudiante"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Año del Curso *</label>
              <select
                className={styles.select}
                value={formData.year_id}
                onChange={(e) => {
                  const yearId = Number(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    year_id: yearId,
                    course_id: 0, // reset curso al cambiar año
                  }));
                }}
                required
              >
                <option value="">Seleccionar año</option>
                {years.map((year) => (
                  <option value={year.id} key={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Curso *</label>
              <select
                className={styles.select}
                value={formData.course_id}
                onChange={(e) =>
                  handleChange("course_id", Number(e.target.value))
                }
                required
                disabled={formData.year_id === 0}
              >
                <option value="">Seleccionar curso</option>
                {filteredCourses.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary" disabled={loading}>
              <FaSave className={styles.buttonIcon} />
              {loading
                ? isEditMode
                  ? "Actualizando..."
                  : "Creando..."
                : isEditMode
                ? "Actualizar Estudiante"
                : "Crear Estudiante"}
            </Button>
            {isEditMode && (
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateStudentView;
