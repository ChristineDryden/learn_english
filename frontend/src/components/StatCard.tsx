interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <article className="glass-panel rounded-[28px] p-[22px]">
      <strong className="block text-[2rem] font-semibold text-slate-900">{value}</strong>
      <span className="text-sm text-slate-600">{label}</span>
    </article>
  );
}
