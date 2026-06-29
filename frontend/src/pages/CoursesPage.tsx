import { useEffect, useState } from "react";
import { getCourses } from "../api/learning";
import CourseCard from "../components/CourseCard";
import type { Course } from "../types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <section className="content-panel">
      <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h2 className="text-[1.35rem] font-semibold text-slate-900">课程中心</h2>
        <span className="text-sm text-slate-500">覆盖入门、职场、考试与口语表达</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
