
export interface Exercise {
  id: string;
  title: string;
  skillName: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hint: string;
  progress: number;
}

export interface ExerciseResult {
  passed: number;
  total: number;
  completed: boolean;
}
