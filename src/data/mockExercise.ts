import type { Exercise } from "../types/learning/exercises";

export const mockExercise: Exercise = {
  id: "javascript-function-parameters",
  title: "Function Parameters",
  skillName: "JavaScript Functions",
  description:
    "Write a function that takes a name as a parameter and returns a greeting message.",
  starterCode: 'function greet(name) {\n  \n}',
  expectedOutput: "Hello, Aman!",
  hint: "Use the name parameter in a return statement.",
  progress: 0,
};