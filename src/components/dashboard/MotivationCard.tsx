import { Icon } from '../Icon'

function LearningPath() {
  return <svg viewBox="0 0 280 150" className="absolute inset-x-0 bottom-0 h-32 w-full" fill="none" aria-hidden="true">
    <path d="M10 142 72 111l36 3 40-47 40 12 52-62" stroke="#a78bfa" strokeWidth="4"/>
    <path d="M10 142 72 111l36 3 40-47 40 12 52-62v133H10Z" fill="url(#pathGlow)" opacity=".42"/>
    <defs><linearGradient id="pathGlow" x1="132" y1="45" x2="130" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#4f46e5" stopOpacity="0"/></linearGradient></defs>
    {[['10','142'],['72','111'],['108','114'],['148','67'],['188','79'],['240','17']].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="6" fill="#ddd6fe" stroke="#a78bfa" strokeWidth="3"/>)}
    <path d="M240 17V0l13 5-13 5" fill="#c4b5fd"/>
  </svg>
}

export default function MotivationCard() {
  return <article className="relative min-h-52 overflow-hidden rounded-3xl border border-violet-300/15 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(112,70,218,0.3),_transparent_55%),rgba(255,255,255,0.04)] p-6"><div className="relative z-10 max-w-[170px]"><p className="font-serif text-xl italic text-violet-200">Keep going!</p><p className="mt-3 text-sm leading-6 text-indigo-100/80">You’re building<br/>real skills.</p><Icon name="sparkle" size={19} className="mt-3 text-violet-300"/></div><LearningPath/></article>
}
