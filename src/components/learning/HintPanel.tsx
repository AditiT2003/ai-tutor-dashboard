
type HintPanelProps = {
  onClose: () => void;
};

const suggestions = [
  <>The parameter <code>name</code> contains the value passed to the function.</>,
  <>Return a string that includes this value.</>,
  <>Use string concatenation or template literals.</>,
];

export default function HintPanel({ onClose }: HintPanelProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close hint panel"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/60"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="hint-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-violet-400/30 bg-[linear-gradient(145deg,#111b3b,#171d49_60%,#101a38)] p-5 text-white shadow-2xl shadow-black/40 sm:p-7"
      >
        <header className="flex items-center justify-between">
          <h2 id="hint-title" className="flex items-center gap-3 text-xl font-bold">
            <span className="text-3xl">💡</span> Hint
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close hints"
            className="rounded-lg p-2 text-3xl leading-none text-indigo-200 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </header>

        <section className="mt-7 rounded-2xl border border-violet-500/40 bg-violet-500/10 p-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-600/30 px-4 py-2 font-semibold">
            💡 Hint
          </span>
          <p className="mt-5 text-lg leading-8 text-indigo-50">
            Think about the value being received by the function.
          </p>
        </section>

        <div className="my-6 border-t border-indigo-300/20" />

        <h3 className="text-lg font-bold">Still thinking?</h3>
        <p className="mt-2 text-sm text-indigo-200/80">
          Here are some things to consider:
        </p>

        <div className="mt-4 space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-indigo-400/10 bg-indigo-400/[0.08] p-4"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600/60 to-violet-600/60 font-semibold">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-indigo-100">{suggestion}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-auto rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-4 font-semibold shadow-lg shadow-violet-950/30 transition hover:brightness-110"
        >
          Continue Working →
        </button>
      </aside>
    </>
  );
}
