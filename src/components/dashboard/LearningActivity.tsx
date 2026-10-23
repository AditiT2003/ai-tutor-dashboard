
type LearningActivityProps = {
  title: string;
  skillName: string;
  progress: number;
  onBack: () => void;
  onContinue: () => void;
};

export default function LearningActivity({
  title,
  skillName,
  progress,
  onBack,
  onContinue,
}: LearningActivityProps) {
  const titleParts = title.trim().split(/\s+/);
  const highlightedWord = titleParts.pop() ?? title;
  const remainingTitle = titleParts.join(" ");
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <section className="relative isolate flex min-h-[680px] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border border-indigo-300/20 bg-[radial-gradient(ellipse_at_75%_85%,rgba(168,85,247,0.30),transparent_48%),radial-gradient(ellipse_at_15%_25%,rgba(59,130,246,0.32),transparent_50%),linear-gradient(125deg,#1b315c_0%,#252750_52%,#38244f_100%)] p-5 text-white sm:p-8">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Back navigation */}
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 rounded-xl border border-white/10 px-4 py-2 text-sm transition hover:bg-white/10 sm:left-7 sm:top-7"
      >
        ← Back to dashboard
      </button>

      {/* Decorative annotations */}
      <span className="pointer-events-none absolute left-8 top-1/4 hidden -rotate-12 text-sm italic text-violet-300 sm:block">
        Pick up
        <br />
        where you
        <br />
        left off. ↘
      </span>

      <span className="pointer-events-none absolute right-8 top-1/3 hidden rotate-12 text-5xl text-violet-400 sm:block">
        {"</>"}
      </span>

      <span className="pointer-events-none absolute bottom-1/4 right-8 hidden rotate-12 text-sm italic text-violet-300 sm:block">
        Same progress.
        <br />
        Bigger you. 〰
      </span>

      {/* Main learning card */}
      <article className="my-16 w-full max-w-3xl rounded-3xl border border-indigo-300/25 bg-slate-900/30 p-5 text-center shadow-2xl shadow-indigo-950/30 backdrop-blur-xl sm:p-8 md:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold tracking-[.2em] text-indigo-100 sm:text-xs">
          <i className="size-2 rounded-full bg-emerald-400" />
          CONTINUE YOUR PRACTICE
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {remainingTitle && `${remainingTitle} `}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {highlightedWord}
          </span>
        </h1>

        <p className="mt-3 text-sm text-indigo-200 sm:text-base">
          You were working on this exercise.
        </p>

        {/* Current skill */}
        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.05] p-4 text-left">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-500/30 text-xl text-violet-200">
            {"</>"}
          </span>

          <div className="min-w-0 flex-1">
            <strong className="block text-sm sm:text-base">
              {skillName}
            </strong>
            <span className="text-xs text-indigo-200/70">
              Current skill
            </span>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-[10px] text-indigo-100">
            <i className="size-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">
              Session in progress
            </span>
            <span className="sm:hidden">In progress</span>
          </span>
        </div>

        {/* Exercise progress */}
        <div className="mt-5 text-left">
          <div className="flex justify-between gap-3 text-xs text-indigo-200">
            <span>Your progress in this exercise</span>
            <span>{safeProgress}%</span>
          </div>

          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="Exercise progress"
            aria-valuenow={safeProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400 transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>

        <p className="mt-5 text-xs text-indigo-200/80">
          ◷ &nbsp; You can pick up right where you left off.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-4 font-semibold shadow-lg shadow-violet-950/40 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 sm:w-3/4"
          >
            Continue Session →
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-xs text-indigo-200/80 transition hover:text-white"
          >
            Back to Home
          </button>
        </div>
      </article>

      {/* Footer */}
      <footer className="absolute bottom-5 flex items-center gap-4 text-center text-[10px] text-indigo-200/80">
        <span className="hidden h-px w-12 bg-violet-300/30 sm:block" />
        Small steps. Big progress.
        <span className="hidden h-px w-12 bg-violet-300/30 sm:block" />
      </footer>
    </section>
  );
}
