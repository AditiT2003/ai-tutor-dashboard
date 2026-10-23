
import { Icon } from "../Icon";
import type { SkillProgress } from "../../types/dashboard";

type Props = {
  skill: SkillProgress;
};

const statusLabels: Record<SkillProgress["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

export default function CurrentSkillCard({ skill }: Props) {
  return (
    <article className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:px-6">
      <span className="grid size-16 place-items-center rounded-2xl border border-violet-300/20 bg-violet-500/25 text-violet-200">
        <Icon name="code" size={32} />
      </span>
      <div className="min-w-[180px] flex-1">
        <h2 className="text-lg font-bold">Current Skill</h2>
        <strong className="mt-2 block text-xl">{skill.name}</strong>
        <p className="mt-1 text-sm text-indigo-100/70">
          Your current mastery is {skill.mastery}%.
        </p>
      </div>
      <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100">
        <i className="mr-2 inline-block size-3 rounded-full bg-emerald-400" />
        {statusLabels[skill.status]}
      </span>
    </article>
  );
}
