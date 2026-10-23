
export interface TestCaseResult {
  id: string;
  title: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message: string;
}

export interface EvaluationResult {
  passed: number;
  total: number;
  completed: boolean;
  tests: TestCaseResult[];
}

type GreetingFunction = (name: string) => unknown;

type GreetingTestCase = {
  id: string;
  title: string;
  input: string;
  expected: string;
  message: string;
};

const greetingTestCases: GreetingTestCase[] = [
  {
    id: "basic",
    title: "Test 1",
    input: "Aman",
    expected: "Hello, Aman!",
    message: "Correct output for basic input",
  },
  {
    id: "parameter",
    title: "Test 2",
    input: "Priya",
    expected: "Hello, Priya!",
    message: "Handles different names",
  },
  {
    id: "edge",
    title: "Test 3",
    input: "Alex",
    expected: "Hello, Alex!",
    message: "Correctly handles another input",
  },
  {
    id: "empty",
    title: "Test 4",
    input: "",
    expected: "Hello, !",
    message: "Works with empty input",
  },
];

function loadGreetingFunction(code: string): GreetingFunction {
  // Intended only for trusted code in a local learning prototype.
  const factory = new Function(
    `"use strict";
    ${code}
    if (typeof greet !== "function") {
      throw new Error("Define a function named greet.");
    }
    return greet;`
  );

  const greet: unknown = factory();

  if (typeof greet !== "function") {
    throw new Error("The greet function was not found.");
  }

  return greet as GreetingFunction;
}

export function evaluateGreeting(
  code: string
): EvaluationResult {
  let greet: GreetingFunction;

  try {
    greet = loadGreetingFunction(code);
  } catch {
    const tests: TestCaseResult[] = greetingTestCases.map(
      (test) => ({
        ...test,
        input: `greet(${JSON.stringify(test.input)})`,
        passed: false,
        actual: "Function could not be loaded",
        message: "Check your function name and syntax.",
      })
    );

    return {
      passed: 0,
      total: tests.length,
      completed: false,
      tests,
    };
  }

  const tests: TestCaseResult[] = greetingTestCases.map(
    (test) => {
      let actual: string;
      let passed = false;

      try {
        const result = greet(test.input);

        actual =
          typeof result === "string"
            ? result
            : String(result);

        passed = actual === test.expected;
      } catch {
        actual = "Runtime error";
      }

      return {
        ...test,
        input: `greet(${JSON.stringify(test.input)})`,
        passed,
        actual,
        message: passed
          ? test.message
          : "Incorrect output for this input",
      };
    }
  );

  const passed = tests.filter((test) => test.passed).length;
  const total = tests.length;

  return {
    passed,
    total,
    completed: passed === total,
    tests,
  };
}
