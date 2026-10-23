
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Code2,
  Sparkles,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

type Props = {
  onBack: () => void;
  onReady: () => void;
};

export default function PracticePreparation({
  onBack,
  onReady,
}: Props) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 4, 100));
    }, 120);

    const timeout = window.setTimeout(() => {
      onReady();
    }, 3000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [onReady]);

  return (
    <main className="relative min-h-[calc(100vh-100px)] overflow-hidden rounded-3xl bg-[#111c48] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_85%,rgba(126,34,206,0.55),transparent_50%),radial-gradient(ellipse_at_25%_20%,rgba(37,99,235,0.35),transparent_55%)]" />

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,255,0.2)_1px,transparent_1px)] [background-size:24px_24px]" />

      <button
        type="button"
        onClick={onBack}
        className="relative z-10 m-5 flex items-center gap-2 text-sm text-indigo-200 hover:text-white sm:m-8"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <section className="relative z-10 mx-auto flex max-w-5xl items-center justify-center px-4 pb-10 pt-2 sm:px-8">
        <div className="w-full rounded-2xl border border-indigo-400/50 bg-[#182658]/65 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-5 py-3">
            <Sparkles className="text-violet-400" size={22} />
            <span className="text-sm font-medium sm:text-base">
              Preparing your practice
            </span>
          </div>

          <div className="mx-auto my-8 flex h-40 max-w-md items-center justify-center sm:my-10 sm:h-48">
            <div className="relative flex h-36 w-52 items-center justify-center rounded-2xl border border-indigo-400/70 bg-indigo-500/10 shadow-[0_0_60px_rgba(99,102,241,0.2)] sm:h-40 sm:w-64">
              <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-2 border-b border-indigo-400/40 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
              </div>
              <Code2
                size={76}
                strokeWidth={1.8}
                className="mt-5 text-indigo-400"
              />
              <Sparkles className="absolute -right-4 top-8 text-violet-400" size={22} />
              <span className="absolute -bottom-3 -left-5 rounded-lg border border-indigo-400/60 bg-indigo-600 px-3 py-2 text-xl font-bold">
                JS
              </span>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Preparing your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              exercise...
            </span>
          </h1>

          <p className="mt-4 text-center text-base text-indigo-100 sm:text-xl">
            Finding the right challenge for you.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div
              className="h-3 overflow-hidden rounded-full bg-indigo-950/70"
              role="progressbar"
              aria-label="Preparing practice"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 shadow-[0_0_15px_rgba(129,140,248,0.8)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-5 flex items-center justify-center gap-3 text-center text-sm text-indigo-200 sm:text-base">
              <Sparkles size={18} className="text-violet-400" />
              This will only take a moment.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-4 rounded-2xl border border-indigo-400/30 bg-indigo-950/25 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-indigo-500/40 text-xl font-bold">
                JS
              </div>
              <div>
                <p className="text-sm text-indigo-200">
                  Practice Topic
                </p>
                <h2 className="mt-1 font-semibold sm:text-lg">
                  JavaScript Functions
                </h2>
                <p className="mt-1 text-sm text-indigo-200">
                  Function Parameters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-indigo-400/30 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <ChartNoAxesColumnIncreasing
                size={32}
                className="shrink-0 text-indigo-400"
              />
              <p className="text-sm">
                Matched to your
                <br />
                current skill level
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="pointer-events-none absolute bottom-6 left-6 hidden -rotate-12 text-lg italic text-violet-300/80 lg:block">
        Small steps.
        <br />
        Big progress.
      </p>

      <p className="pointer-events-none absolute right-8 top-24 hidden rotate-6 text-lg italic text-violet-300/80 lg:block">
        Practice today
        <br />
        Build tomorrow
        <br />
        〰〰〰
      </p>
    </main>
  );
}
