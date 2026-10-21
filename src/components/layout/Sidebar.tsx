import { Icon, type IconName } from '../Icon'

const links: { label: string; icon: IconName }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Learn', icon: 'book' },
  { label: 'Practice', icon: 'code' },
  { label: 'Progress', icon: 'chart' },
]

function Brand() {
  return <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
    <span className="grid size-11 place-items-center rounded-xl bg-white text-violet-600"><Icon name="sparkle" size={25}/></span>
    <span><strong className="block text-lg">AI Tutor</strong><small className="text-xs text-indigo-200/70">Learn. Build. Go Further.</small></span>
  </div>
}

export default function Sidebar() {
  return <aside className="hidden w-[260px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035] lg:flex">
    <Brand />
    <nav className="space-y-2 px-3 py-6">
      {links.map((item, index) => <a key={item.label} href="#" className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm ${index === 0 ? 'bg-gradient-to-r from-blue-500/35 to-violet-500/40 text-white ring-1 ring-white/10' : 'text-indigo-100/80 hover:bg-white/5'}`}><Icon name={item.icon}/>{item.label}</a>)}
      <div className="my-5 border-t border-white/10" />
      <a href="#" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm text-indigo-100/80 hover:bg-white/5"><Icon name="user"/>Account</a>
    </nav>
    <div className="mt-auto p-4"><div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/10 p-5 text-violet-200"><Icon name="sparkle" size={24}/><p className="mt-4 font-serif text-lg italic">Small steps.<br/>Big progress.</p><div className="mt-3 text-3xl">〰</div></div></div>
  </aside>
}
