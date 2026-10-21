import { Icon } from '../Icon'

export default function CurrentSkillCard() {
  return <article className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:px-6">
    <span className="grid size-16 place-items-center rounded-2xl border border-violet-300/20 bg-violet-500/25 text-violet-200"><Icon name="code" size={32}/></span>
    <div className="min-w-[180px] flex-1"><h2 className="text-lg font-bold">Current Skill</h2><strong className="mt-2 block text-xl">JavaScript Functions</strong><p className="mt-1 text-sm text-indigo-100/70">You’re currently learning this skill.</p></div>
    <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-indigo-100"><i className="mr-2 inline-block size-3 rounded-full bg-emerald-400"/>In Progress</span>
  </article>
}
