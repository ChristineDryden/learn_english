import { useEffect, useState } from "react";
import { getTodayWords } from "../api/learning";
import PageHeader from "../components/PageHeader";
import WordCard from "../components/WordCard";
import type { Word } from "../types";

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    getTodayWords()
      .then((res) => setWords(res.data))
      .catch(() => setWords([]));
  }, []);

  return (
    <section>
      <PageHeader
        eyebrow="Words"
        title="今日单词"
        description="单词页不是单纯展示词汇，而是帮助用户完成一次可感知的记忆动作，因此需要清楚地告诉用户今天要完成多少、当前进度如何。"
        aside={
          <div className="rounded-[24px] border border-[#d8e7ff] bg-[#f4f8ff] p-5">
            <div className="text-sm text-slate-500">今日进度</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">{words.length ? `${Math.min(2, words.length)} / ${words.length}` : "0 / 0"} 已进入复习流程</div>
          </div>
        }
      />

      <section className="content-panel">
        <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-[1.35rem] font-semibold text-slate-900">按场景记忆高频词</h2>
          <span className="text-sm text-slate-500">先理解释义，再通过例句和掌握标记巩固</span>
        </div>
        <div className="grid gap-3.5">
          {words.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      </section>
    </section>
  );
}
