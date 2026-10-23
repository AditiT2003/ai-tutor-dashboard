
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  Pencil,
} from "lucide-react";

type SkillProgressPageProps = {
  onBack: () => void;
};

const chartData = [
  { label: "Aug 1", value: 11 },
  { label: "Aug 5", value: 21 },
  { label: "Aug 10", value: 32 },
  { label: "Aug 15", value: 44 },
  { label: "Aug 20", value: 56 },
  { label: "Aug 25", value: 68 },
  { label: "Aug 29", value: 80 },
];

const evidence = [
  {
    title: "Passed parameter exercise",
    description: "You correctly solved the exercise",
    date: "2 days ago",
  },
  {
    title: "Completed function exercise",
    description: "You finished the function exercise",
    date: "5 days ago",
  },
];

export default function SkillProgressPage({
  onBack,
}: SkillProgressPageProps) {
  const [period, setPeriod] = useState("Last 30 days");

  return (
    <main className="min-w-0 space-y-5 pb-6 text-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-indigo-300"
      >
        <button
          onClick={onBack}
          className="hover:text-white"
          type="button"
        >
          Learn
        </button>
        <ChevronRight size={16} />
        <span>JavaScript</span>
        <ChevronRight size={16} />
        <span>Functions</span>
        <ChevronRight size={16} />
        <span className="text-white">Progress</span>
      </nav>

      {/* Page heading */}
      <header className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-yellow-400 text-3xl font-black text-[#24203b] shadow-lg shadow-yellow-500/10">
            JS
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              JavaScript Functions
            </h1>
            <p className="mt-2 text-sm text-indigo-200 sm:text-base">
              Track your progress and see how you're improving.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-blue-500/40 bg-blue-950/30 px-4 py-3 text-sm font-medium transition hover:border-violet-400 hover:bg-violet-500/10"
        >
          <ArrowLeft size={19} />
          Back to Learn
        </button>
      </header>

      {/* Mastery and chart */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <MasteryCard />
        <TrendCard period={period} onPeriodChange={setPeriod} />
      </div>

      {/* Skill breakdown and evidence */}
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <SkillBreakdown />
        <EvidenceCard />
      </div>
    </main>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[#102650]/95 via-[#121e48]/95 to-[#21144d]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function PanelHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-indigo-300">
          {subtitle}
        </p>
      </div>
      {action}
    </div>
  );
}

function MasteryCard() {
  const mastery = 62;
  const radius = 77;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - mastery / 100);

  return (
    <Panel className="border-blue-500/60 bg-gradient-to-br from-[#102957] via-[#142253] to-[#261451]">
      <PanelHeading
        title="Effective Mastery"
        subtitle="Your overall mastery in JavaScript Functions"
        action={
          <div title="Mastery reflects your current skill assessment.">
            <Info className="mt-1 size-5 text-indigo-400" />
          </div>
        }
      />

      <div className="grid items-center gap-5 sm:grid-cols-[1fr_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[230px]">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full -rotate-90"
            role="img"
            aria-label="62 percent effective mastery"
          >
            <defs>
              <linearGradient
                id="mastery-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#2394ff" />
                <stop offset="100%" stopColor="#7c2cff" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#203b83"
              strokeWidth="15"
            />

            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#mastery-gradient)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{mastery}%</span>
            <span className="mt-1 text-sm text-indigo-300">
              Effective Mastery
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-400/10 bg-indigo-950/35 p-5">
          <ChartNoAxesColumnIncreasing className="mb-3 size-7 text-violet-400" />
          <h3 className="font-semibold text-indigo-100">
            Keep practicing!
          </h3>
          <p className="mt-2 text-sm leading-6 text-indigo-200">
            You're making steady progress in JavaScript Functions.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-950">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
              style={{ width: `${mastery}%` }}
            />
          </div>
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
  onPeriodChange: (period: string) => void;
}) {
  const periods = ["Last 7 days", "Last 30 days", "Last 90 days"];

  const [showMenu, setShowMenu] = useState(false);

  const points = chartData.map((item, index) => {
    const x = 42 + index * 48;
    const y = 164 - (item.value / 100) * 145;

    return { ...item, x, y };
  });

  const line = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} 164 L ${points[0].x} 164 Z`;

  return (
    <Panel>
      <PanelHeading
        title="Progress over time"
        subtitle="Your mastery trend in JavaScript Functions"
        action={
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((value) => !value)}
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-950/40 px-3 py-2 text-xs text-indigo-100 hover:bg-white/5"
            >
              {period}
              <ChevronDown size={15} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-xl border border-indigo-400/20 bg-[#111b3d] p-1 shadow-xl">
                {periods.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onPeriodChange(item);
                      setShowMenu(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-xs text-indigo-100 hover:bg-violet-500/20"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />

      <div className="min-w-0">
        <svg
          viewBox="0 0 370 205"
          className="w-full overflow-visible"
          role="img"
          aria-label="Mastery trend chart"
        >
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#762cff" stopOpacity=".45" />
              <stop offset="100%" stopColor="#762cff" stopOpacity=".02" />
            </linearGradient>
            <linearGradient id="trend-line" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#4169ff" />
              <stop offset="100%" stopColor="#b02dff" />
            </linearGradient>
          </defs>

          {[19, 55, 91, 127, 164].map((y, index) => (
            <g key={y}>
              <line
                x1="42"
                y1={y}
                x2="330"
                y2={y}
                stroke="#50639a"
                strokeOpacity=".32"
              />
              <text
                x="32"
                y={y + 4}
                fill="#c4d2f8"
                fontSize="10"
                textAnchor="end"
              >
                {100 - index * 25}%
              </text>
            </g>
          ))}

          {points.map((point) => (
            <line
              key={point.label}
              x1={point.x}
              y1="19"
              x2={point.x}
              y2="164"
              stroke="#50639a"
              strokeOpacity=".2"
            />
          ))}

          <path d={area} fill="url(#trend-fill)" />

          <path
            d={line}
            fill="none"
            stroke="url(#trend-line)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point) => (
            <circle
              key={point.label}
              cx={point.x}
              cy={point.y}
              r="3.6"
              fill="#fff"
              stroke="#8b3dff"
              strokeWidth="2.4"
            />
          ))}

          {points.map((point, index) =>
            index % 2 === 0 || index === points.length - 1 ? (
              <text
                key={point.label}
                x={point.x}
                y="183"
                fill="#e0e7ff"
                fontSize="9"
                textAnchor="middle"
              >
                {point.label}
              </text>
            ) : null,
          )}
        </svg>
      </div>
    </Panel>
  );
}

function SkillBreakdown() {
  const skills = [
    { label: "Reading", value: 78, icon: BookOpen },
    { label: "Writing", value: 51, icon: Pencil },
  ];

  return (
    <Panel>
      <PanelHeading
        title="Skill Breakdown"
        subtitle="Performance in key areas"
      />

      <div className="space-y-3">
        {skills.map(({ label, value, icon: IconComponent }) => (
          <div
            key={label}
            className="grid grid-cols-[42px_minmax(65px,0.45fr)_minmax(70px,1fr)_42px] items-center gap-3 rounded-xl border border-indigo-400/15 bg-indigo-950/25 p-3"
          >
            <div className="grid size-10 place-items-center rounded-lg bg-blue-500/10 text-indigo-400">
              <IconComponent size={25} />
            </div>

            <span className="text-sm font-medium">{label}</span>

            <div
              className="h-3 overflow-hidden rounded-full bg-[#1d306e]"
              role="progressbar"
              aria-label={label}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                style={{ width: `${value}%` }}
              />
            </div>

            <span className="text-right text-sm font-semibold">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function EvidenceCard() {
  return (
    <Panel className="border-violet-500/35">
      <PanelHeading
        title="Recent evidence"
        subtitle="Latest achievements in this skill"
      />

      <div className="space-y-2">
        {evidence.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 items-center gap-3 rounded-xl border border-indigo-400/10 bg-indigo-950/30 p-3"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-900/30">
              <Check size={21} strokeWidth={3} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-medium">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-indigo-200">
                {item.description}
              </p>
            </div>

            <span className="shrink-0 self-start pt-1 text-right text-xs text-indigo-300">
              {item.date}
            </span>
          </article>
        ))}
      </div>
    </Panel>
  );
}
