import { useEffect, useMemo, useState } from "react";
import { useCourse } from "../../useCourse";
import { useYear } from "../../useYear";
import { useSubject } from "../../useSubject";

export const useYearCourseSelector = () => {
  const { years, getYear } = useYear();
  const { courses, getCourse } = useCourse();
  const { subjects, getSubject } = useSubject();

  useEffect(() => {
    getCourse();
    getYear();
    getSubject();
  }, []);
  const [year, setYear] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    if (!year) return [];
    return courses.filter((c) => c.year.id === year);
  }, [courses, year]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((c) => c.course.id === Number(courseId));
  }, [subjects, courseId]);

  const onYearChange = (yearId: number | null) => {
    setYear(yearId);
    setCourseId(null);
    setSubjectId(null);
  };
  const onCourseChange = (courseId: string | null) => {
    setCourseId(courseId);
    setSubjectId(null);
  };
  const onSubjectChange = (subjectId: string | null) => {
    setSubjectId(subjectId);
  };

  return {
    year,
    onYearChange,
    courseId,
    onCourseChange,
    filteredCourses,
    years,
    subjectId,
    onSubjectChange,
    filteredSubjects,
  };
};
