import { useEffect, useState } from "react";
import { getCourses } from "../api/learning";
import CourseCard from "../components/CourseCard";
import PageHeader from "../components/PageHeader";
import type { Course } from "../types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <section>
      <PageHeader
        eyebrow="Courses"
        title="课程中心"
        description="课程页的重点是帮助用户快速找到适合自己的学习内容，因此这里应该长期保持结构稳定、信息清楚。"
        aside={
          <div className="rounded-[24px] border border-[#d8e7ff] bg-[#f4f8ff] p-5">
            <div className="text-sm text-slate-500">推荐节奏</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">每次先完成一节小课，再配套做单词复习</div>
          </div>
        }
      />

      <section className="content-panel">
        <div className="mb-5 flex flex-wrap gap-3">
          {["全部", "入门", "职场", "口语", "旅行", "高频表达"].map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </section>
  );
}
