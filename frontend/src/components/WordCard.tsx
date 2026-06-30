import type { Word } from "../types";

interface WordCardProps {
  word: Word;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <article className="rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_16px_38px_rgba(36,48,78,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-slate-950">{word.word}</h3>
          <span className="mt-1 inline-block text-sm text-slate-500">{word.phonetic}</span>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-slate-500">
          Lv.{word.difficulty}
        </span>
      </div>
      <p className="mt-4 text-base font-semibold text-slate-900">{word.meaning}</p>
      <p className="mt-3 text-sm italic leading-7 text-slate-600">{word.exampleSentence}</p>
      <small className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
        {word.category}
      </small>
    </article>
  );
}
