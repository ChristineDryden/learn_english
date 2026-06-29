import { useEffect, useState } from "react";
import { getTodayWords } from "../api/learning";
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
    <section className="content-panel">
      <div className="mb-[18px] flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h2 className="text-[1.35rem] font-semibold text-slate-900">单词学习</h2>
        <span className="text-sm text-slate-500">按难度、场景和例句记忆</span>
      </div>
      <div className="grid gap-3.5">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  );
}
