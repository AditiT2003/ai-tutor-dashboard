
import { Icon } from "../Icon";
import type { DashboardData } from "../../types/dashboard";

type Props = {
  data: DashboardData;
};

function MasteryRing({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const angle = safeValue * 3.6;

  return (
    <div
      className="mx-auto mt-3 grid size-40 place-items-center rounded-full p-3"
      style={{
        background: `conic-gradient(#4bd9bb 0deg ${angle}deg, rgba(130,150,220,.42) ${angle}deg 360deg)`,
      }}
    >
      <div className="grid size-full place-items-center rounded-full bg-[#202652] text-center">
        <div>
          <strong className="block text-3xl">{safeValue}%</strong>
          <span className="text-sm text-indigo-100">Overall Mastery</span>
        </div>
      </div>
    </div>
  );
}

function SkillRow({ name, value }: { name: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-sm">{name}</strong>
        <b className="text-sm">{safeValue}%</b>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressCard({ data }: Props) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-6">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Your Progress</h2>
        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium">
          View Progress <Icon name="arrow" size={14} className="ml-1 inline" />
        </button>
      </header>
      <MasteryRing value={data.overallMastery} />
      <div className="mt-3 space-y-2">
        {data.skills.map((skill) => (
          <SkillRow key={skill.id} name={skill.name} value={skill.mastery} />
        ))}
      </div>
    </article>
  );
}
