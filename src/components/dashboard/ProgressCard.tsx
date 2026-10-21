import { Icon } from '../Icon'

const subjects = [
  { icon: 'book' as const, name: 'Reading', value: 78, color: 'bg-emerald-400' },
  { icon: 'code' as const, name: 'Writing', value: 51, color: 'bg-violet-400' },
]

function MasteryRing() {
  return <div className="mx-auto mt-3 grid size-40 place-items-center rounded-full p-3" style={{ background: 'conic-gradient(#4bd9bb 0deg 241deg, rgba(130,150,220,.42) 241deg 360deg)' }}>
    <div className="grid size-full place-items-center rounded-full bg-[#202652] text-center"><div><strong className="block text-3xl">67%</strong><span className="text-sm text-indigo-100">Overall Mastery</span></div></div>
  </div>
}

function SubjectProgress({ icon, name, value, color }: typeof subjects[number]) {
  return <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-indigo-400/15 text-indigo-100"><Icon name={icon}/></span><strong className="flex-1 text-sm">{name}</strong><b className="text-sm">{value}%</b></div><div className="ml-12 mt-2 h-2 rounded-full bg-white/10"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }}/></div></div>
}

export default function ProgressCard() {
  return <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-6"><header className="flex items-center justify-between"><h2 className="text-lg font-bold">Your Progress</h2><button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium">View Progress <Icon name="arrow" size={14} className="ml-1 inline"/></button></header><MasteryRing/><div className="mt-3 space-y-2">{subjects.map((subject) => <SubjectProgress key={subject.name} {...subject}/>)}</div></article>
}
