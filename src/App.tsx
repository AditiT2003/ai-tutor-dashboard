
import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";

import DashboardHome from "./components/dashboard/DashboardHome";
import DSALearningModule from "./components/learning/DSALearningModule";
import PracticePreparation from "./components/learning/PracticePreparation";
import SkillProgressPage from "./components/learning/SkillProgressPage";
import AccountPage from "./components/account/AccountPage";
import ProgressPage from "./components/progress/ProgressPage";

import type { Page } from "./types/navigation";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;

      case "learning":
        return (
          <DSALearningModule
            onBack={() => setActivePage("dashboard")}
          />
        );

      case "practice":
        return (
          <PracticePreparation
            onBack={() => setActivePage("learning")}
            onReady={() => setActivePage("learning")}
          />
        );

      case "progress":
        return (
          <ProgressPage
            onContinueLearning={() => setActivePage("learning")}
            onViewSkillProgress={() => setActivePage("skillProgress")}
          />
        );

      case "skillProgress":
        return <SkillProgressPage />;

      case "account":
        return (
          <AccountPage
            name="Aman Dogra"
            email="aman@example.com"
            learningGoal="Frontend Development"
            level="Intermediate"
          />
        );

      default:
        return <DashboardHome />;
    }
  }

  return (
    <div className="app-background min-h-screen text-white">
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col gap-4 p-3 sm:p-4 lg:flex-row">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <TopBar />

          <main className="min-w-0 flex-1 px-1 pb-5 sm:px-2">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
