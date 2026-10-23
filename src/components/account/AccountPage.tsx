import type { ReactNode } from "react";
import {
  Mail,
  Target,
  ChartNoAxesColumnIncreasing,
  Code2,
  GraduationCap,
  Sparkles,
  Flag,
} from "lucide-react";

type AccountPageProps = {
  name?: string;
  email?: string;
  learningGoal?: string;
  level?: string;
};

const DEFAULTS = {
  name: "Aman Dogra",
  email: "aman@example.com",
  learningGoal: "Frontend Development",
  level: "Intermediate",
};

export default function AccountPage({
  name = DEFAULTS.name,
  email = DEFAULTS.email,
  learningGoal = DEFAULTS.learningGoal,
  level = DEFAULTS.level,
}: AccountPageProps) {
  const profile = {
    name: name.trim() || "Learner",
    email: email.trim() || "Not provided",
    learningGoal: learningGoal.trim() || "Not set",
    level: level.trim() || "Beginner",
  };

  return (
    <main className="min-w-0 space-y-6 text-white">
      <AccountHeader />

      <div className="grid min-w-0 items-stretch gap-5 xl:grid-cols-[1.15fr_1fr]">
        <ProfileCard {...profile} />

        <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-1">
          <InfoCard
            icon={<Target className="size-7" />}
            title="Learning Goal"
            subtitle="Your current learning focus."
          >
            <DetailPanel
              icon={<Code2 className="size-8" />}
              title={profile.learningGoal}
              description="Build modern and responsive web experiences with modern tools and technologies."
            />
          </InfoCard>

          <InfoCard
            icon={<ChartNoAxesColumnIncreasing className="size-7" />}
            title="Current Level"
            subtitle="Your current skill level."
          >
            <DetailPanel
              icon={<ChartNoAxesColumnIncreasing className="size-8" />}
              title={profile.level}
              description={levelDescription(profile.level)}
            />
          </InfoCard>
        </div>
      </div>

      <MotivationalBanner />
    </main>
  );
}

function AccountHeader() {
  return (
    <header className="relative flex min-h-[130px] items-center justify-between gap-5 overflow-hidden">
      <div className="relative z-10 min-w-0 py-2">
        <p className="text-sm text-indigo-300">Account</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-[44px]">
          Account
        </h1>

        <p className="mt-2 text-base text-indigo-200 sm:text-xl">
          Manage your profile and learning preferences.
        </p>
      </div>

      <div className="relative hidden h-[140px] w-[48%] max-w-[480px] shrink-0 items-center lg:flex">
        <div className="relative z-10 flex items-start gap-3">
          <span className="text-5xl leading-none text-indigo-500">“</span>

          <div className="pt-4">
            <p className="text-sm leading-6 text-white">
              A better you
              <br />
              builds a brighter tomorrow.
            </p>
            <div className="mt-4 h-0.5 w-5 bg-violet-500" />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 top-0 w-[55%]">
          <svg
            viewBox="0 0 260 140"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="mountainGlow" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#4F46E5" />
              </linearGradient>
            </defs>

            <path
              d="M0 120 L48 65 Q64 45 81 66 L118 105 L157 46 Q174 18 192 49 L260 120"
              stroke="url(#mountainGlow)"
              strokeWidth="1.5"
            />
            <path
              d="M0 120 L48 65 Q64 45 81 66 L118 105 L157 46 Q174 18 192 49 L260 120"
              fill="url(#mountainGlow)"
              fillOpacity=".15"
            />
            <path
              d="M55 120 L105 80 Q120 64 137 83 L169 112 L207 70 Q224 56 239 78 L260 100"
              stroke="#6366F1"
              strokeWidth="1.5"
            />
            <path
              d="M174 31 V7"
              stroke="#A78BFA"
              strokeWidth="1.5"
            />
            <path
              d="M174 7 L188 11 L174 16 Z"
              fill="#8B5CF6"
            />
            <circle cx="174" cy="31" r="2" fill="#C4B5FD" />
          </svg>

          <div className="absolute right-0 top-0 rotate-[-10deg] text-sm italic leading-6 text-violet-300">
            Keep
            <br />
            Learning
          </div>

          <svg
            viewBox="0 0 70 20"
            className="absolute bottom-2 right-0 w-16 text-violet-500"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 15 Q8 2 15 12 T29 11 T43 10 T57 9 T69 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

type Profile = {
  name: string;
  email: string;
  learningGoal: string;
  level: string;
};

function ProfileCard({
  name,
  email,
  learningGoal,
  level,
}: Profile) {
  const initial = name.charAt(0).toUpperCase() || "U";

  return (
    <section className="min-w-0 rounded-2xl border border-blue-400/45 bg-gradient-to-br from-[#102957]/95 via-[#131f4e]/95 to-[#19164d]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:p-7">
      <h2 className="text-xl font-bold sm:text-2xl">
        Profile Information
      </h2>

      <p className="mt-1 text-sm text-indigo-200 sm:text-base">
        Your account details and learning preferences.
      </p>

      <div className="flex flex-wrap items-center gap-5 px-1 py-7 sm:px-4">
        <div className="grid size-24 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-5xl font-semibold shadow-[0_0_35px_rgba(124,58,237,0.22)]">
          {initial}
        </div>

        <div className="min-w-0">
          <h3 className="break-words text-2xl font-bold sm:text-[26px]">
            {name}
          </h3>
          <p className="mt-2 text-indigo-300">Learner</p>
        </div>
      </div>

      <div className="divide-y divide-indigo-400/20 border-t border-indigo-400/20">
        <ProfileRow icon={<Mail />} label="Email" value={email} />
        <ProfileRow
          icon={<Target />}
          label="Learning Goal"
          value={learningGoal}
        />
        <ProfileRow
          icon={<ChartNoAxesColumnIncreasing />}
          label="Level"
          value={level}
        />
      </div>
    </section>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-4 py-4">
      <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-200">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-indigo-300">{label}</p>
        <p className="mt-1 break-words font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-violet-400/40 bg-gradient-to-br from-[#142957]/95 via-[#171e50]/95 to-[#291753]/95 p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-white">
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-indigo-200 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function DetailPanel({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-indigo-400/15 bg-white/[0.025] p-4">
      <div className="grid size-16 shrink-0 place-items-center rounded-full bg-indigo-500/10 text-violet-400">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="break-words font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-indigo-200">
          {description}
        </p>
      </div>
    </div>
  );
}

function MotivationalBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-indigo-400/35 bg-gradient-to-r from-[#102957] via-[#241e67] to-[#351754] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_30%,rgba(124,58,237,0.24),transparent_45%)]" />

      <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="grid size-20 shrink-0 place-items-center rounded-full border border-violet-400 bg-indigo-950/70 text-white shadow-[0_0_28px_rgba(124,58,237,0.2)]">
          <GraduationCap className="size-10" />
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Small steps.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Big progress.
            </span>
          </h2>

          <p className="mt-2 text-sm leading-6 text-indigo-200 sm:text-lg">
            Keep learning, keep building, and stay consistent.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-5 hidden items-center gap-8 text-blue-400/90 md:flex">
        <Sparkles className="size-5" />
        <Sparkles className="size-10 fill-blue-500/10" />
      </div>

      <Flag
        aria-hidden="true"
        className="pointer-events-none absolute right-[28%] top-10 size-4 text-violet-400"
      />

      <p className="pointer-events-none absolute bottom-5 right-8 hidden rotate-[-10deg] text-sm italic leading-6 text-violet-300 md:block">
        Better Skills
        <br />
        Brighter You
      </p>

      <svg
        viewBox="0 0 120 28"
        className="pointer-events-none absolute bottom-4 right-7 hidden w-28 text-violet-500 md:block"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 22 Q13 1 25 17 T49 13 T73 12 T97 8 T119 2"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
}

function levelDescription(level: string): string {
  switch (level.toLowerCase()) {
    case "beginner":
      return "You're learning the fundamentals and building your foundation.";
    case "advanced":
      return "You're developing deeper expertise and tackling complex projects.";
    case "intermediate":
      return "You have a good understanding of the basics and are building practical skills.";
    default:
      return "Keep learning and practicing to build your skills.";
  }
}