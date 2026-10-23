
import { useState } from "react";

import CurrentSkillCard from "./CurrentSkillCard";
import HeroCard from "./HeroCard";
import MotivationCard from "./MotivationCard";
import ProgressCard from "./ProgressCard";
import QuoteCard from "./QuoteCard";
import RecentActivityCard from "./RecentActivityCard";
import LearningActivity from "./LearningActivity";

import ExerciseScreen from "../learning/ExerciseScreen";
import PracticePreparation from "../learning/PracticePreparation";

import {
  dailyQuote,
  mockActivities,
  mockDashboard,
  mockLearningSession,
} from "../../data/mockDashboard";

type Screen =
  | "dashboard"
  | "learning"
  | "preparation"
  | "exercise";

export default function DashboardHome() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  const [exerciseProgress, setExerciseProgress] =
    useState(mockLearningSession.progress);

  if (screen === "preparation") {
    return (
      <PracticePreparation
        onBack={() => setScreen("learning")}
        onReady={() => setScreen("exercise")}
      />
    );
  }

  if (screen === "exercise") {
    return (
      <ExerciseScreen
        onBack={() => setScreen("learning")}
        onComplete={(progress) => {
          setExerciseProgress(progress);
          setScreen("learning");
        }}
        onViewProgress={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "learning") {
    return (
      <LearningActivity
        title={mockLearningSession.title}
        skillName={mockLearningSession.skillName}
        progress={exerciseProgress}
        onBack={() => setScreen("dashboard")}
        onContinue={() => setScreen("preparation")}
      />
    );
  }

  return (
    <main className="min-w-0 space-y-6 pb-6">
      <section className="px-1">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Good morning, {mockDashboard.student.name} 👋
        </h1>
        <p className="mt-1 text-indigo-200/80">
          Ready to learn something new today?
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.82fr)]">
        <HeroCard
          nextStep={mockDashboard.nextStep}
          onStart={() => setScreen("learning")}
        />
        <ProgressCard data={mockDashboard} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.82fr)]">
        {mockDashboard.skills.length > 0 ? (
          <CurrentSkillCard skill={mockDashboard.skills[0]} />
        ) : (
          <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-lg font-bold">Current Skill</h2>
            <p className="mt-2 text-sm text-indigo-100/70">
              Complete a diagnostic assessment to discover your first skill.
            </p>
          </section>
        )}

        <QuoteCard quote={dailyQuote} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.82fr)]">
        <RecentActivityCard activities={mockActivities} />
        <MotivationCard />
      </section>
    </main>
  );
}
