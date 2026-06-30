import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_16px_38px_rgba(36,48,78,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(36,48,78,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-[#f1dcc7] bg-[#fff5ea] px-3 py-1.5 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[#c46a2e]">
          {course.level}
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{course.lessonCount} lessons</span>
      </div>
      <h3 className="mt-5 text-[1.2rem] leading-7 font-semibold tracking-[-0.02em] text-slate-950">{course.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{course.description}</p>
      <footer className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{course.durationMinutes} mins</span>
        <button type="button" className="rounded-full bg-[#172033] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#24314b]">
          开始学习
        </button>
      </footer>
    </article>
  );
}
