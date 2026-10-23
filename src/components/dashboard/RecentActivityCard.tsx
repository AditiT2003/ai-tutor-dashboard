
import { Icon } from "../Icon";
import type { RecentActivity } from "../../types/dashboard";

type Props = {
  activities: RecentActivity[];
};

export default function RecentActivityCard({ activities }: Props) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:px-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Activity</h2>
        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
          View all <Icon name="arrow" size={14} className="ml-1 inline" />
        </button>
      </header>

      <div className="space-y-2">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-indigo-300/[0.06] p-3"
          >
            <span
  className={`grid size-10 place-items-center rounded-full ${
    item.status === "completed"
      ? "bg-emerald-400/20 text-emerald-200"
      : "bg-amber-400/20 text-amber-200"
  }`}
>
<Icon name="check" />
</span>
            <div>
              <strong className="text-sm">{item.title}</strong>
              <p className="mt-1 text-xs text-indigo-100/65">
                {item.status === "completed" ? "Completed" : "In progress"}
                {" · "}
                {item.completedAt}
              </p>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="py-4 text-sm text-indigo-100/70">
            Your learning activity will appear here.
          </p>
        )}
      </div>
    </article>
  );
}
