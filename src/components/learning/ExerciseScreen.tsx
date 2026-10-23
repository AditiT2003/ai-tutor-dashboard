
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { mockExercise } from "../../data/mockExercise";
import {
  evaluateGreeting,
  type EvaluationResult,
} from "../../services/exerciseEvaluator";
import ExerciseResults from "./ExerciseResults";
import SubmissionOverlay, {
  type SubmissionStage,
} from "./SubmissionOverlay";

type Props = {
  onBack: () => void;
  onComplete: (progress: number) => void;
  onViewProgress?: () => void;
};

type ExerciseTab = "problem" | "examples" | "constraints";

export default function ExerciseScreen({
  onBack,
  onComplete,
  onViewProgress,
}: Props) {
  const [code, setCode] = useState(mockExercise.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] =
    useState<ExerciseTab>("problem");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stage, setStage] =
    useState<SubmissionStage>("sending");
  const [evaluation, setEvaluation] =
    useState<EvaluationResult | null>(null);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) =>
        window.clearTimeout(timer)
      );
    };
  }, []);

  function clearTimers() {
    timers.current.forEach((timer) =>
      window.clearTimeout(timer)
    );
    timers.current = [];
  }

  function handleSubmit() {
    if (isSubmitting) return;

    clearTimers();
    setEvaluation(null);
    setShowHint(false);
    setStage("sending");
    setIsSubmitting(true);

    timers.current = [
      window.setTimeout(() => {
        setStage("testing");
      }, 1500),

      window.setTimeout(() => {
        setEvaluation(evaluateGreeting(code));
        setStage("evaluated");
      }, 3500),

      window.setTimeout(() => {
        setIsSubmitting(false);
        timers.current = [];
      }, 5500),
    ];
  }

  function handleRetry() {
    if (isSubmitting) return;

    clearTimers();
    setEvaluation(null);
    setShowHint(false);
    setActiveTab("problem");
    setCode(mockExercise.starterCode);
  }

  function handleCodeChange(value: string | undefined) {
    setCode(value ?? "");
    setEvaluation(null);
  }

  function handleContinue() {
    if (evaluation?.completed) {
      onComplete(100);
    }
  }

  function handleViewProgress() {
    if (onViewProgress) {
      onViewProgress();
    } else {
      onBack();
    }
  }

  return (
    <section className="relative min-h-[680px] overflow-hidden rounded-3xl border border-indigo-300/20 bg-[radial-gradient(ellipse_at_80%_90%,rgba(126,34,206,0.25),transparent_50%),linear-gradient(125deg,#14254b,#171a43_60%,#281849)] p-4 text-white sm:p-6 lg:p-8">
      {/* Exercise header */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <nav className="text-sm text-indigo-300">
            Learn <span className="mx-2">›</span>
            JavaScript <span className="mx-2">›</span>
            Functions <span className="mx-2">›</span>
            <span className="text-blue-400">Practice</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl">
              JavaScript{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Functions
              </span>
            </h1>

            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-300">
              ▥ Beginner Friendly
            </span>
          </div>

          <h2 className="mt-2 text-xl font-semibold">
            {mockExercise.title}
          </h2>

          {!evaluation && (
            <p className="mt-2 max-w-2xl text-sm text-indigo-200">
              {mockExercise.description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="shrink-0 rounded-xl border border-violet-400/30 px-4 py-3 text-sm text-indigo-200 transition hover:bg-white/5 hover:text-white"
        >
          ✕ Exit Practice
        </button>
      </header>

      {/* Results replace the coding layout after evaluation */}
      {evaluation && !isSubmitting ? (
        <div className="mx-auto w-full max-w-[1000px]">
          <ExerciseResults
            evaluation={evaluation}
            onRetry={handleRetry}
            onContinue={handleContinue}
            onHint={() => setShowHint(true)}
            onViewProgress={handleViewProgress}
          />

          {showHint && (
            <aside className="mt-4 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-violet-300">
                  💡 Hint
                </h3>
                <button
                  type="button"
                  onClick={() => setShowHint(false)}
                  className="text-sm text-indigo-200 hover:text-white"
                >
                  Close ✕
                </button>
              </div>

              <p className="mt-2 text-sm leading-6 text-indigo-100">
                {mockExercise.hint} Use a return statement and
                include the name parameter in the greeting.
              </p>
            </aside>
          )}
        </div>
      ) : (
        /* Problem and editor layout */
        <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[0.95fr_1.45fr] xl:gap-5">
          {/* Problem card */}
          <article className="min-w-0 overflow-hidden rounded-2xl border border-indigo-400/25 bg-[#101f49]/80">
            <div className="flex items-center gap-1 border-b border-indigo-400/20 px-2 sm:px-4">
              {(
                [
                  ["problem", "Problem"],
                  ["examples", "Examples"],
                  ["constraints", "Constraints"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-3 py-4 text-sm transition sm:px-4 ${
                    activeTab === tab
                      ? "border-violet-500 font-semibold text-violet-300"
                      : "border-transparent text-indigo-200 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-5 p-4 sm:p-6">
              {activeTab === "problem" && (
                <>
                  <div>
                    <h3 className="text-xl font-bold">
                      {mockExercise.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-indigo-100 sm:text-base">
                      {mockExercise.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Requirements</h4>
                    <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-indigo-100">
                      <li>
                        Create a function named{" "}
                        <code className="rounded bg-indigo-500/20 px-1.5 py-1 text-violet-200">
                          greet
                        </code>{" "}
                        that takes one parameter{" "}
                        <code className="rounded bg-indigo-500/20 px-1.5 py-1 text-violet-200">
                          name
                        </code>.
                      </li>
                      <li>
                        Return a greeting in this format:
                        <code className="mt-2 block w-fit rounded bg-indigo-500/20 px-2 py-1 text-violet-200">
                          "Hello, {"<name>"}!"
                        </code>
                      </li>
                      <li>
                        Use the{" "}
                        <code className="rounded bg-indigo-500/20 px-1.5 py-1 text-violet-200">
                          return
                        </code>{" "}
                        keyword.
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-indigo-400/20 pt-5">
                    <h4 className="font-semibold">Sample Output</h4>
                    <div className="mt-3 rounded-xl border border-indigo-400/25 bg-[#0c1837] p-4 font-mono text-sm">
                      <p>greet("Aman")</p>
                      <p className="mt-2 text-indigo-300">
                        // Output: Hello, Aman!
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "examples" && (
                <div>
                  <h3 className="text-xl font-bold">Examples</h3>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        input: 'greet("Aman")',
                        output: "Hello, Aman!",
                      },
                      {
                        input: 'greet("Priya")',
                        output: "Hello, Priya!",
                      },
                    ].map((example) => (
                      <div
                        key={example.input}
                        className="rounded-xl border border-indigo-400/20 bg-[#0c1837] p-4"
                      >
                        <code className="block">
                          {example.input}
                        </code>
                        <p className="mt-2 text-sm text-emerald-300">
                          Output: {example.output}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "constraints" && (
                <div>
                  <h3 className="text-xl font-bold">Constraints</h3>
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-indigo-100">
                    <li>Use the function name `greet`.</li>
                    <li>Accept one parameter named `name`.</li>
                    <li>Return a greeting string.</li>
                    <li>Return the value instead of printing it.</li>
                  </ul>
                </div>
              )}

              {/* Hint card */}
              <div className="rounded-xl border border-indigo-400/20 bg-violet-500/10 p-4">
                <h4 className="font-semibold text-violet-300">
                  💡 Tip
                </h4>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Parameters let you pass data into functions,
                  making them reusable and flexible.
                </p>

                <button
                  type="button"
                  onClick={() => setShowHint((visible) => !visible)}
                  aria-expanded={showHint}
                  className="mt-3 text-sm text-violet-300 hover:text-white"
                >
                  {showHint ? "Hide extra hint" : "Need a Hint?"}
                </button>

                {showHint && (
                  <p className="mt-2 rounded-lg bg-black/20 p-3 text-sm leading-6 text-indigo-100">
                    {mockExercise.hint} For example, you can use{" "}
                    <code>{"`Hello, ${name}!`"}</code> in a return
                    statement.
                  </p>
                )}
              </div>
            </div>
          </article>

          {/* Monaco editor card */}
          <article className="flex min-w-0 flex-col rounded-2xl border border-indigo-400/25 bg-[#101f49]/80 p-3 sm:p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-3 font-semibold">
                <span className="rounded-lg border border-violet-500/40 p-2 text-violet-300">
                  {"</>"}
                </span>
                Code Editor
              </h3>

              <span className="rounded-xl border border-indigo-400/30 px-3 py-2 text-sm">
                🟨 JavaScript
              </span>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-indigo-400/15 bg-[#0c1428]">
              <Editor
                height="460px"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  padding: { top: 20 },
                  readOnly: isSubmitting,
                }}
              />
            </div>

            <p className="mt-3 text-right text-xs text-indigo-300">
              ↻ Write your code above
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowHint((visible) => !visible)}
                className="rounded-xl border border-violet-500/60 px-4 py-4 font-semibold transition hover:bg-violet-500/10 disabled:opacity-50"
              >
                ✦ Need a Hint
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "➤ Submit"}
              </button>
            </div>
          </article>
        </div>
      )}

      {/* Submission loading overlay */}
      {isSubmitting && (
        <SubmissionOverlay stage={stage} />
      )}
    </section>
  );
}
