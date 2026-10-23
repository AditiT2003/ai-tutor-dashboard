
import { useState } from "react";
import type { ReactNode } from "react";

import {
  Activity,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronDown,
  Clock3,
  Lightbulb,
  Pencil,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

type ProgressPageProps = {
  onContinueLearning: () => void;
  onViewSkillProgress: () => void;
};

const activities = [
  {
    title: "Completed: Functions Exercise",
    subtitle: "All tests passed",
    time: "2 hours ago",
    completed: true,
  },
  {
    title: "Practiced: Variables",
    subtitle: "Score: 3/4",
    time: "5 hours ago",
    completed: false,
  },
  {
    title: "Completed: Reading Quiz",
    subtitle: "Score: 4/4",
    time: "1 day ago",
    completed: true,
  },
  {
    title: "Practiced: JavaScript Basics",
    subtitle: "Score: 2/4",
    time: "2 days ago",
    completed: false,
  },
];

const skillData = [
  { name: "JavaScript", value: 67, icon: "JS" },
  { name: "Functions", value: 62, icon: "ƒ()" },
  { name: "Variables", value: 81, icon: "{}" },
];

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-[#0d2144]/95 via-[#101d42]/95 to-[#171b4b]/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}

function PanelTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="grid size-11 shrink-0 place-items-center rounded-full border border-indigo-400/20 bg-indigo-600/15 text-violet-400">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-indigo-300">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function ProgressPage({
  onContinueLearning,
  onViewSkillProgress,
}: ProgressPageProps) {
  const [period, setPeriod] = useState("Last 5 Weeks");

  return (
    <main className="min-w-0 space-y-4 pb-6 text-white">
      {/* Page heading */}
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-sm text-indigo-300">Progress</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Your <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Progress</span>
          </h1>
          <p className="mt-2 text-sm text-indigo-200 sm:text-base">
            Track your learning journey and keep going.
          </p>
        </div>

        <div className="hidden items-stretch gap-4 lg:flex">
          <div className="flex w-56 items-start gap-3 overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-indigo-950/80 to-violet-950/60 p-4">
            <span className="text-4xl font-bold leading-none text-violet-500">“</span>
            <div>
              <p className="text-sm leading-5 text-indigo-200">
                Consistent learning today creates bigger opportunities tomorrow.
              </p>
              <div className="mt-2 h-0.5 w-5 bg-violet-500" />
            </div>
          </div>

          <div className="flex w-64 items-start gap-3 rounded-2xl border border-blue-400/20 bg-[#0e1d3b]/90 p-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-400">
              <CalendarDays size={26} />
            </div>
            <div>
              <h2 className="font-semibold">Keep Going!</h2>
              <p className="mt-2 text-xs leading-5 text-indigo-200">
                You're making steady progress. Practice a little every day.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mastery and trend */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <MasteryCard />
        <TrendCard period={period} onPeriodChange={setPeriod} />
      </div>

      {/* Skills and activity */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <SkillBreakdown onViewSkillProgress={onViewSkillProgress} />
        <RecentActivity />
      </div>

      {/* Continue learning */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-violet-500/40 bg-gradient-to-r from-[#111d48] via-[#20185d] to-[#301451] p-5 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-full bg-amber-400/10 text-amber-300">
            <Trophy size={38} />
          </div>
          <div>
            <h2 className="font-bold">You're doing great!</h2>
            <p className="mt-1 text-sm text-indigo-200">
              Keep learning, keep building, keep growing.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinueLearning}
          className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-sm font-semibold shadow-lg shadow-violet-950/30 transition hover:brightness-110 sm:w-auto"
        >
          Continue Learning
          <ArrowRight size={19} />
        </button>
      </section>
    </main>
  );
}

function MasteryCard() {
  const mastery = 67;
  const radius = 57;
  const circumference = 2 * Math.PI * radius;

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <PanelTitle
          icon={<Activity size={23} />}
          title="Overall Mastery"
        />
        <div className="grid size-12 place-items-center rounded-full bg-violet-600/20 text-violet-400">
          <Target size={28} />
        </div>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[175px]">
          <svg
            viewBox="0 0 150 150"
            className="-rotate-90"
            role="img"
            aria-label="Overall mastery 67 percent"
          >
            <defs>
              <linearGradient id="overall-mastery-gradient">
                <stop offset="0%" stopColor="#3294ff" />
                <stop offset="100%" stopColor="#9b31ff" />
              </linearGradient>
            </defs>
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="#20366b"
              strokeWidth="13"
            />
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="url(#overall-mastery-gradient)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - mastery / 100)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
            {mastery}%
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold">Overall Mastery</h3>
          <p className="mt-1 text-indigo-400">You're on the right track!</p>
          <p className="mt-2 text-sm leading-6 text-indigo-200">
            You have completed a significant portion of the topics. Keep
            practicing to strengthen your skills.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-900/25 p-3">
        <Lightbulb className="size-8 shrink-0 text-amber-300" />
        <div>
          <p className="text-sm font-semibold text-indigo-300">Tip</p>
          <p className="mt-1 text-xs leading-5 text-indigo-200">
            Focus on weaker areas to improve your overall mastery.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function TrendCard({
  period,
  onPeriodChange,
}: {
  period: string;
  onPeriodChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const periods = ["Last 5 Weeks", "Last 30 Days", "Last 90 Days"];

  const values = [36, 45, 57, 64, 72, 87];
  const points = values.map((value, index) => ({
    x: 28 + index * 61,
    y: 150 - value * 1.35,
    value,
  }));

  const line = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`;

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PanelTitle
          icon={<Sparkles size={23} />}
          title="Learning Trend"
        />

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-indigo-400/25 bg-indigo-950/30 px-3 py-3 text-xs text-indigo-100 hover:bg-white/5"
          >
            <CalendarDays size={16} />
            {period}
            <ChevronDown size={15} />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-xl border border-indigo-400/25 bg-[#101a3b] p-1 shadow-xl">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onPeriodChange(item);
                    setOpen(false);
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-xs text-indigo-100 hover:bg-violet-500/20"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <svg
        viewBox="0 0 390 190"
        className="mt-1 w-full"
        role="img"
        aria-label="Learning trend chart"
      >
        <defs>
          <linearGradient id="progress-area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8237ff" stopOpacity=".4" />
            <stop offset="100%" stopColor="#8237ff" stopOpacity=".015" />
          </linearGradient>
          <linearGradient id="progress-line-gradient">
            <stop stopColor="#6d39ff" />
            <stop offset="100%" stopColor="#b43dff" />
          </linearGradient>
        </defs>

        {[18, 58, 98, 138, 150].map((y, index) => (
          <g key={y}>
            <line x1="28" y1={y} x2="365" y2={y} stroke="#52638e" strokeOpacity=".25" />
            {index < 4 && (
              <text x="22" y={y + 4} textAnchor="end" fontSize="9" fill="#aabce8">
                {100 - index * 25}%
              </text>
            )}
          </g>
        ))}

        {points.map((point, index) => (
          <line
            key={index}
            x1={point.x}
            y1="18"
            x2={point.x}
            y2="150"
            stroke="#52638e"
            strokeOpacity=".17"
          />
        ))}

        <path d={area} fill="url(#progress-area-gradient)" />
        <path
          d={line}
          fill="none"
          stroke="url(#progress-line-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3.2"
            fill="#ac62ff"
          />
        ))}

        {points.slice(1).map((point, index) => (
          <text
            key={index}
            x={point.x}
            y="169"
            textAnchor="middle"
            fontSize="9"
            fill="#aabce8"
          >
            Week {index + 1}
          </text>
        ))}
      </svg>
    </Panel>
  );
}

function SkillBreakdown({
  onViewSkillProgress,
}: {
  onViewSkillProgress: () => void;
}) {
  return (
    <Panel>
      <PanelTitle
        icon={<Users size={22} />}
        title="Skill Breakdown"
        subtitle="Your progress in each skill area"
      />

      <div className="space-y-2">
        <SkillBar icon={<BookOpen size={20} />} name="Reading" value={78} />
        <SkillBar icon={<Pencil size={20} />} name="Writing" value={51} />
      </div>

      <h3 className="mb-2 mt-4 px-2 text-sm font-semibold text-indigo-300">
        Your Skills
      </h3>

      <div className="space-y-1">
        {skillData.map((skill) => (
          <button
            key={skill.name}
            type="button"
            onClick={onViewSkillProgress}
            className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-indigo-400/15 bg-indigo-950/20 p-2 text-left transition hover:border-violet-400/40 hover:bg-violet-500/10"
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${
                skill.icon === "JS"
                  ? "bg-yellow-400 text-slate-900"
                  : "bg-indigo-500/15 text-indigo-200"
              }`}
            >
              {skill.icon}
            </span>
            <span className="w-[76px] shrink-0 text-sm">{skill.name}</span>
            <ProgressBar value={skill.value} />
            <span className="w-10 shrink-0 text-right text-sm font-semibold">
              {skill.value}%
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function SkillBar({
  icon,
  name,
  value,
}: {
  icon: ReactNode;
  name: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-indigo-400/15 bg-indigo-950/20 p-2">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-500/10 text-indigo-200">
        {icon}
      </span>
      <span className="w-[76px] shrink-0 text-sm">{name}</span>
      <ProgressBar value={value} />
      <span className="w-10 shrink-0 text-right text-sm font-semibold">
        {value}%
      </span>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-[#203360]"
      role="progressbar"
      aria-label={`${value}% complete`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function RecentActivity() {
  return (
    <Panel>
      <div className="mb-3 flex items-center justify-between gap-3">
        <PanelTitle
          icon={<Clock3 size={23} />}
          title="Recent Activity"
          subtitle="Your latest practice sessions"
        />
        <button
          type="button"
          className="shrink-0 text-sm text-violet-400 hover:text-violet-300"
        >
          View All <ArrowRight className="ml-1 inline size-4" />
        </button>
      </div>

      <div className="divide-y divide-indigo-400/10">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center gap-3 py-2"
          >
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-full ${
                activity.completed
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-blue-500/15 text-sky-400"
              }`}
            >
              {activity.completed ? (
                <Check size={18} />
              ) : (
                <ChartNoAxesColumnIncreasing size={18} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-medium">
                {activity.title}
              </p>
              <p className="mt-1 text-xs text-indigo-300">
                {activity.subtitle}
              </p>
            </div>

            <span className="shrink-0 text-right text-xs text-indigo-300">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
