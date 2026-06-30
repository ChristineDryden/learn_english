import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <section className="content-panel mb-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#d96b2b]">{eyebrow}</p>
          ) : null}
          <h2 className="text-[1.8rem] leading-tight font-semibold text-slate-900">{title}</h2>
          <p className="mt-3 max-w-[700px] text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {aside ? <div className="md:max-w-[320px]">{aside}</div> : null}
      </div>
    </section>
  );
}
