import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-slate-50/90 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="pill-tag">{course.level}</span>
        <span className="text-sm text-slate-500">{course.lessonCount} lessons</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
      <footer className="mt-5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{course.durationMinutes} mins</span>
        <button type="button" className="primary-button">
          开始学习
        </button>
      </footer>
    </article>
  );
}
