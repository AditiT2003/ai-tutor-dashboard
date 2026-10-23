
export type SubmissionStage = "sending" | "testing" | "evaluated";

type Props = {
  stage: SubmissionStage;
};

const steps: { label: string; stage: SubmissionStage }[] = [
  { label: "Sending your code", stage: "sending" },
  { label: "Running tests", stage: "testing" },
  { label: "Evaluating...", stage: "evaluated" },
];

export default function SubmissionOverlay({ stage }: Props) {
  const currentIndex = steps.findIndex((step) => step.stage === stage);
  const evaluated = stage === "evaluated";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#050b20]/80 p-4 backdrop-blur-sm">
      <section
        role="status"
        aria-live="polite"
        className="w-full max-w-[540px] rounded-3xl border border-blue-500/50 bg-gradient-to-br from-[#172953] via-[#191747] to-[#281653] p-6 text-white shadow-2xl sm:p-8"
      >
        <div className="flex justify-center">
          <div className="relative grid size-28 place-items-center">
            <div
              className={`absolute inset-0 rounded-full border-[7px] border-violet-500/20 border-t-blue-500 border-r-violet-500 ${
                evaluated ? "" : "animate-spin"
              }`}
            />
            <div className="grid size-20 place-items-center rounded-full bg-violet-500/15 text-4xl text-blue-300">
              {evaluated ? "✓" : "➤"}
            </div>
            <span className="absolute -right-1 top-3 text-xl text-violet-300">✦</span>
            <span className="absolute bottom-2 left-0 text-lg text-blue-300">✦</span>
          </div>
        </div>

        <h2 className="mt-5 text-center text-3xl font-bold">
          {evaluated ? "Evaluated!" : "Submitting..."}
        </h2>

        <p className="mt-2 text-center text-indigo-200">
          {stage === "sending"
            ? "Sending your code..."
            : stage === "testing"
              ? "Your code has been submitted. Running tests..."
              : "Your solution has been evaluated."}
        </p>

        <div className="mt-7 space-y-2">
          {steps.map((step, index) => {
            const done = index < currentIndex || evaluated;
            const active = index === currentIndex && !evaluated;

            return (
              <div
                key={step.stage}
                className={`flex items-center gap-4 rounded-xl border p-3 ${
                  active
                    ? "border-violet-400/40 bg-violet-400/10"
                    : "border-white/5 bg-white/[0.05]"
                }`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border-[3px] ${
                    done
                      ? "border-blue-400 text-blue-300"
                      : active
                        ? "animate-spin border-violet-400/30 border-t-blue-400"
                        : "border-indigo-400/30"
                  }`}
                >
                  {done ? "✓" : ""}
                </span>

                <span className="flex-1 text-sm text-indigo-100">
                  {evaluated && index === 2 ? "Evaluated" : step.label}
                </span>

                {done && <span className="text-blue-300">✓</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-4 text-center text-sm text-indigo-300">
          <span className="h-px flex-1 bg-violet-400/30" />
          {evaluated ? "Evaluation complete!" : "Almost there!"}
          <span className="h-px flex-1 bg-violet-400/30" />
        </div>
      </section>
    </div>
  );
}
