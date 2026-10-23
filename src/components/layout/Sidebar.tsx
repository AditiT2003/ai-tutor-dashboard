
import { Icon, type IconName } from "../Icon";
import type { Page } from "../../types/navigation";

const links: {
  label: string;
  icon: IconName;
  page: Page;
}[] = [
  { label: "Home", icon: "home", page: "dashboard" },
  { label: "Learn", icon: "book", page: "learning" },
  { label: "Practice", icon: "code", page: "practice" },
  { label: "Progress", icon: "chart", page: "progress" },
  { label: "Account", icon: "user", page: "account" },
];

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col rounded-2xl border border-blue-400/20 bg-gradient-to-b from-[#11234b] to-[#101936] lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[256px]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-violet-600">
          <Icon name="sparkle" size={25} />
        </span>

        <span>
          <strong className="block text-lg">AI Tutor</strong>
          <small className="text-xs text-indigo-200/70">
            Learn. Build. Go Further.
          </small>
        </span>
      </div>

      <nav className="space-y-2 px-3 py-6">
        {links.map((item) => {
          const isActive = activePage === item.page;

          return (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-violet-400/50 bg-gradient-to-r from-blue-600 to-violet-700 text-white shadow-lg shadow-violet-950/30"
                  : "border-transparent text-indigo-100/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon name={item.icon} size={23} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-blue-500/10 p-5 text-violet-300">
          <Icon name="sparkle" size={25} />
          <p className="mt-4 font-serif text-lg italic">
            Small steps.
            <br />
            Big progress.
          </p>
          <div className="mt-3 text-3xl">〰</div>
        </div>
      </div>
    </aside>
  );
}
