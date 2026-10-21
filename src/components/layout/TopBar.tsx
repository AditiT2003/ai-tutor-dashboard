import { Icon } from '../Icon'

export default function TopBar() {
  return <header className="mb-6 flex h-[66px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 sm:px-6">
    <div className="text-sm font-semibold tracking-wide text-indigo-100/80 lg:hidden">AI Tutor</div>
    <div className="hidden flex-1 lg:block" />
    <label className="hidden h-11 w-full max-w-[292px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-indigo-100/70 sm:flex">
      <Icon name="search" size={20}/><input aria-label="Search skills and topics" placeholder="Search skills, topics..." className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-indigo-100/70"/>
    </label>
    <button aria-label="Notifications" className="relative ml-4 grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-indigo-100"><Icon name="bell"/><i className="absolute right-2 top-2 size-2 rounded-full bg-rose-400"/></button>
    <button className="ml-3 flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3"><span className="grid size-9 place-items-center rounded-full bg-violet-500 text-lg font-semibold">A</span><span className="hidden text-sm sm:block">Aman</span><Icon name="chevron" size={16}/></button>
  </header>
}
