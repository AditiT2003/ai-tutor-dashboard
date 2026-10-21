import CurrentSkillCard from './CurrentSkillCard'
import HeroCard from './HeroCard'
import MotivationCard from './MotivationCard'
import ProgressCard from './ProgressCard'
import QuoteCard from './QuoteCard'
import RecentActivityCard from './RecentActivityCard'

export default function DashboardHome() {
  return <main className="space-y-6 pb-6">
    <section className="px-1"><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Good morning, Aman <span>👋</span></h1><p className="mt-1 text-indigo-200/80">Ready to learn something new today?</p></section>
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(330px,0.82fr)]">
      <HeroCard/><ProgressCard/>
    </section>
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(330px,0.82fr)]">
      <CurrentSkillCard/><QuoteCard/>
    </section>
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(330px,0.82fr)]">
      <RecentActivityCard/><MotivationCard/>
    </section>
  </main>
}
