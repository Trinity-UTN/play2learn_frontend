import type {
  CourseResponseDto,
  SubjectResponseDto,
  YearResponseDto,
} from "@/admin/types";
import styles from "./YearCourseSelector.module.css";

interface YearCourseSelectorProps {
  years: YearResponseDto[];
  courses: CourseResponseDto[];
  subjects: SubjectResponseDto[];
  selectedYear: Number | null;
  selectedCourse: string | null;
  selectedSubject: string | null;

  onYearChange: (yearId: number | null) => void;
  onCourseChange: (courseId: string | null) => void;
  onSubjectChange: (subjectId: string | null) => void;
}

export const YearCourseSelector = ({
  years,
  courses,
  subjects,
  selectedYear,
  selectedCourse,
  selectedSubject,
  onYearChange,
  onCourseChange,
  onSubjectChange,
}: YearCourseSelectorProps) => {
  return (
    <div className={styles.formGrid}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Año del Curso</label>

        <select
          className={styles.select}
          value={String(selectedYear) ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            onYearChange(value ? Number(value) : null);
          }}
          required
        >
          <option value={""}>Seleccionar año</option>

          {years.map((year) => (
            <option value={year.id} key={year.id}>
              {year.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Curso</label>

        <select
          className={styles.select}
          value={selectedCourse ?? ""}
          onChange={(e) => onCourseChange(e.target.value || null)}
          required
          disabled={!selectedYear}
        >
          <option value="">Seleccionar curso</option>

          {courses.map((course) => (
            <option value={course.id} key={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Materia</label>

        <select
          className={styles.select}
          value={selectedSubject ?? ""}
          onChange={(e) => onSubjectChange(e.target.value || null)}
          required
          disabled={!selectedCourse}
        >
          <option value="">Seleccionar materia</option>

          {subjects.map((subject) => (
            <option value={subject.id} key={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
