
export interface StudentProfile {
  id: string;
  name: string;
  learningGoal: string;
}

export interface SkillProgress {
  id: string;
  name: string;
  mastery: number;
  status: "not-started" | "in-progress" | "completed";
}

export interface NextStep {
  title: string;
  description: string;
  skillId: string;
  actionLabel: string;
}

export interface DashboardData {
  student: StudentProfile;
  overallMastery: number;
  nextStep: NextStep;
  skills: SkillProgress[];
}


export interface RecentActivity {
  id: string;
  title: string;
  status: "completed" | "in-progress";
  completedAt: string;
}

export interface LearningSession {
  title: string;
  skillName: string;
  progress: number;
  status: "in-progress" | "completed";
}