
import type { EvaluationResult } from "../../services/exerciseEvaluator";

type Props = {
  evaluation: EvaluationResult;
  onRetry: () => void;
  onContinue: () => void;
  onHint: () => void;
  onViewProgress: () => void;
};

export default function ExerciseResults({
  evaluation,
  onRetry,
  onContinue,
  onHint,
  onViewProgress,
}: Props) {
  const success = evaluation.completed;
  const percentage =
    evaluation.total > 0
      ? Math.round((evaluation.passed / evaluation.total) * 100)
      : 0;

  return (
    <section className="mx-auto w-full max-w-[920px] rounded-2xl border border-indigo-400/30 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.12),transparent_38%),linear-gradient(125deg,#10244b,#1b1c4b_58%,#30194e)] px-4 py-7 text-white shadow-xl sm:px-7 sm:py-9 lg:px-10">
      {/* Success or failure heading */}
      <header className="text-center">
        <div
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[5px] text-6xl shadow-[0_0_35px_rgba(16,185,129,0.18)] ${
            success
              ? "border-emerald-400 text-emerald-300"
              : "border-pink-400 text-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.18)]"
          }`}
        >
          {success ? "✓" : "×"}
        </div>

        {success ? (
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Exercise{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              complete
            </span>{" "}
            <span className="text-sky-400">✓</span>
          </h2>
        ) : (
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Not quite{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              yet
            </span>
          </h2>
        )}

        <p className="mt-3 text-lg font-semibold">
          {success
            ? "All tests passed."
            : `${evaluation.passed} of ${evaluation.total} tests passed.`}
        </p>

        <p className="mt-1 text-sm text-indigo-200 sm:text-base">
          {success
            ? "Your progress has been updated."
            : "Take another look at your solution."}
        </p>
      </header>

      {/* Test summary card */}
      <div className="mt-7 rounded-2xl border border-indigo-400/35 bg-[#101a38]/65 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-bold">Test Results</h3>

          <div className="flex min-w-[180px] flex-1 items-center gap-4 sm:max-w-[350px]">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm text-indigo-200">
                {evaluation.passed} / {evaluation.total} Passed
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    success
                      ? "bg-gradient-to-r from-emerald-400 to-green-300"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span
                className={
                  success ? "text-emerald-300" : "text-pink-400"
                }
              >
                ◷
              </span>
              <span>{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-x-6 sm:grid-cols-2">
          {evaluation.tests.map((test, index) => (
            <article
              key={test.id}
              className={`flex min-w-0 gap-3 border-white/10 py-4 ${
                index > 0 ? "border-t" : ""
              } ${index >= 2 ? "sm:border-t" : ""}`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold ${
                  test.passed
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.25)]"
                    : "border-pink-400 bg-pink-500/15 text-pink-300 shadow-[0_0_14px_rgba(236,72,153,0.2)]"
                }`}
              >
                {test.passed ? "✓" : "×"}
              </span>

              <div className="min-w-0 flex-1">
                <h4 className="font-semibold">{test.title}</h4>
                <p className="mt-1 text-sm leading-5 text-indigo-200">
                  {test.message}
                </p>

                {!test.passed && (
                  <div className="mt-3 space-y-2 text-xs leading-5">
                    <p className="break-words">
                      <span className="text-indigo-300">Input: </span>
                      <code>{test.input}</code>
                    </p>
                    <p className="break-words">
                      <span className="text-indigo-300">Expected: </span>
                      <code>{test.expected}</code>
                    </p>
                    <p className="break-words">
                      <span className="text-indigo-300">Actual: </span>
                      <code>{test.actual}</code>
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mx-auto mt-8 grid max-w-[660px] gap-3 sm:grid-cols-2">
        {success ? (
          <>
            <button
              type="button"
              onClick={onContinue}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 font-semibold shadow-lg shadow-violet-900/20 transition hover:brightness-110"
            >
              <span className="mr-3 text-xl">→</span>
              Continue →
            </button>

            <button
              type="button"
              onClick={onViewProgress}
              className="rounded-xl border border-violet-400/40 px-5 py-4 font-semibold transition hover:bg-violet-500/10"
            >
              <span className="mr-2 text-violet-400">▥</span>
              View Progress
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 font-semibold shadow-lg transition hover:brightness-110"
            >
              <span className="mr-2">↻</span>
              Try Again →
            </button>

            <button
              type="button"
              onClick={onHint}
              className="rounded-xl border border-violet-400/40 px-5 py-4 font-semibold transition hover:bg-violet-500/10"
            >
              <span className="mr-2">💡</span>
              Need a Hint
            </button>
          </>
        )}
      </div>

      <footer className="mt-8 flex items-center justify-center gap-4 text-center text-xs text-indigo-200 sm:gap-8 sm:text-sm">
        <span className="h-px w-10 bg-indigo-400/70 sm:w-20" />
        <p>
          {success
            ? "Consistency today creates opportunity tomorrow."
            : "Every attempt helps you learn."}
        </p>
        <span className="h-px w-10 bg-indigo-400/70 sm:w-20" />
      </footer>
    </section>
  );
}
