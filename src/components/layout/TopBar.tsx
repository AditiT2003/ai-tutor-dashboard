import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex min-h-[70px] items-center gap-4 rounded-2xl border border-blue-400/20 bg-[#111c40]/75 px-4 py-3 shadow-lg shadow-blue-950/10 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex min-w-0 flex-1 justify-center">
        <label className="flex w-full max-w-[640px] items-center gap-3 rounded-xl border border-indigo-400/15 bg-gradient-to-r from-blue-950/70 to-indigo-950/60 px-4 py-3 text-indigo-200 focus-within:border-violet-400/50">
          <Search size={21} className="shrink-0 text-indigo-300" />

          <input
            type="search"
            aria-label="Search skills and topics"
            placeholder="Search skills, topics, or anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-indigo-200/80"
          />

          <kbd className="hidden shrink-0 rounded-md border border-indigo-300/20 px-2 py-1 text-xs text-indigo-200 sm:block">
            Ctrl K
          </kbd>
        </label>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid size-10 shrink-0 place-items-center rounded-xl text-indigo-200 transition hover:bg-white/5 hover:text-white"
      >
        <Bell size={24} />
        <span className="absolute right-1 top-1 size-2.5 rounded-full bg-pink-500 ring-2 ring-[#111c40]" />
      </button>

      <div className="hidden h-9 w-px bg-white/10 sm:block" />

      <button
        type="button"
        aria-label="User menu"
        className="flex shrink-0 items-center gap-3 rounded-xl px-1 py-1 text-white hover:bg-white/5"
      >
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-xl font-semibold shadow-lg shadow-violet-950/30">
          A
        </span>

        <span className="hidden text-sm font-medium sm:block">Aman</span>
        <ChevronDown
          size={19}
          className="hidden text-indigo-200 sm:block"
        />
      </button>
    </header>
  );
}