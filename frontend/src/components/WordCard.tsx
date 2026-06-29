import type { Word } from "../types";

interface WordCardProps {
  word: Word;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <article className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-slate-50/90 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{word.word}</h3>
          <span className="text-sm text-slate-500">{word.phonetic}</span>
        </div>
        <span className="pill-tag">Lv.{word.difficulty}</span>
      </div>
      <p className="mt-4 text-base font-semibold text-slate-800">{word.meaning}</p>
      <p className="mt-2 text-sm italic leading-6 text-slate-600">{word.exampleSentence}</p>
      <small className="mt-3 block text-sm text-slate-500">{word.category}</small>
    </article>
  );
}
