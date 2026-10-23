
import type {
  DashboardData,
  RecentActivity,
  LearningSession,
} from "../types/dashboard";

export const mockDashboard: DashboardData = {
  student: {
    id: "student-001",
    name: "Aditi",
    learningGoal: "Improve JavaScript skills",
  },
  overallMastery: 87,
  nextStep: {
    title: "Function Parameters",
    description: "Practice passing values to functions.",
    skillId: "javascript-functions",
    actionLabel: "Start",
  },
  skills: [],
};

export const mockActivities: RecentActivity[] = [
  {
    id: "activity-1",
    title: "Function Basics",
    status: "completed",
    completedAt: "2 days ago",
  },
  {
    id: "activity-2",
    title: "Variables",
    status: "completed",
    completedAt: "3 days ago",
  },
];

export const dailyQuote =
  "Consistency today creates opportunity tomorrow.";

  export const mockLearningSession: LearningSession = {
  title: "Function Parameters",
  skillName: "JavaScript Functions",
  progress: 50,
  status: "in-progress",
};