
import { useState } from "react";
import type { ReactNode } from "react";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileText,
  Lightbulb,
  ListChecks,
  Play,
  RotateCcw,
  Target,
  Clock3,
} from "lucide-react";

type Props = {
  onBack?: () => void;
};

type Tab = "Resources" | "Summary" | "Practice";

type Topic = {
  name: string;
  description: string;
  subtopics: string[];
};

const topics: Topic[] = [
  {
    name: "Beginner Problems",
    description: "Build problem-solving fundamentals.",
    subtopics: ["Time and Space Complexity", "Basic Mathematics", "Pattern Problems"],
  },
  {
    name: "Arrays",
    description: "Learn traversal, searching, and array techniques.",
    subtopics: [
      "Introduction to Arrays",
      "Traversal and Access",
      "Searching in Arrays",
      "Insertion and Deletion",
      "Two Pointer Technique",
      "Sliding Window",
      "Sorting Arrays",
      "Advanced Array Problems",
    ],
  },
  {
    name: "Linked Lists",
    description: "Understand linked structures and pointer manipulation.",
    subtopics: ["Singly Linked Lists", "Doubly Linked Lists", "Reversal", "Cycle Detection"],
  },
  {
    name: "Stacks and Queues",
    description: "Explore LIFO and FIFO data structures.",
    subtopics: ["Stack Operations", "Queue Operations", "Monotonic Stack"],
  },
  {
    name: "Trees",
    description: "Learn tree structures and traversal algorithms.",
    subtopics: ["Binary Trees", "Tree Traversals", "Binary Search Trees"],
  },
  {
    name: "Graphs",
    description: "Explore graph representation and algorithms.",
    subtopics: ["Graph Representation", "BFS", "DFS", "Shortest Paths"],
  },
];

const starterCode = `function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`;

const tests = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [2, 3, 4, 5, 6], target: 11, expected: [1, 4] },
  { nums: [-5, -2, 0, 3, 8], target: 1, expected: [1, 3] },
  { nums: [1, 2, 4, 8], target: 20, expected: [] },
];

const resources = [
  {
    title: "Video tutorials",
    description: "Watch visual explanations and walkthroughs.",
    url: "https://www.youtube.com/results?search_query=data+structures+algorithms+tutorial",
  },
  {
    title: "GeeksforGeeks",
    description: "Read DSA articles and implementation examples.",
    url: "https://www.geeksforgeeks.org/data-structures/",
  },
  {
    title: "LeetCode practice",
    description: "Solve interview-style coding problems.",
    url: "https://leetcode.com/problemset/",
  },
];

export default function DSALearningModule({ onBack }: Props) {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedTopic, setSelectedTopic] = useState(1);
  const [selectedSubtopic, setSelectedSubtopic] = useState("Two Pointer Technique");
  const [tab, setTab] = useState<Tab>("Resources");
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<
    { passed: boolean; expected: number[]; actual: unknown; input: string }[]
  >([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const topic = topics[selectedTopic];
  const total = topics.reduce((sum, item) => sum + item.subtopics.length, 0);
  const percent = Math.round((completed.length / total) * 100);

  const card =
    "rounded-2xl border border-blue-800/80 bg-gradient-to-br from-blue-950/90 to-indigo-950/80 p-5 sm:p-6";
  const primary =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold transition hover:brightness-110";
  const secondary =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-800 px-4 py-3 text-blue-200 hover:bg-blue-900/50";

  function openTopic(index: number) {
    setSelectedTopic(index);
    setScreen(2);
  }

  function openSubtopic(name: string) {
    setSelectedSubtopic(name);
    setTab("Resources");
    setCode(starterCode);
    setOutput("");
    setTestResults([]);
    setScreen(3);
  }

  function goBack() {
    if (screen === 1) {
      onBack?.();
    } else if (screen === 5) {
      setScreen(4);
    } else if (screen === 4) {
      setScreen(3);
      setTab("Practice");
    } else if (screen === 3) {
      setScreen(2);
    } else {
      setScreen(1);
    }
  }

  function markComplete() {
    setCompleted((previous) =>
      previous.includes(selectedSubtopic)
        ? previous
        : [...previous, selectedSubtopic],
    );
  }

  function runCode() {
    try {
      const execute = new Function(
        `"use strict"; ${code}; return typeof twoSum === "function" ? twoSum : null;`,
      ) as () => ((nums: number[], target: number) => unknown) | null;

      const twoSum = execute();

      if (!twoSum) {
        setOutput("Error: Define a function named twoSum(nums, target).");
        setTestResults([]);
        return;
      }

      const results = tests.map((test) => {
        const actual = twoSum(test.nums, test.target);
        const passed =
          Array.isArray(actual) &&
          JSON.stringify(actual) === JSON.stringify(test.expected);

        return {
          passed,
          expected: test.expected,
          actual,
          input: `nums = [${test.nums.join(", ")}], target = ${test.target}`,
        };
      });

      setTestResults(results);
      setOutput(
        results
          .map(
            (result, index) =>
              `Test ${index + 1}: ${result.passed ? "PASSED" : "FAILED"}\nInput: ${result.input}\nExpected: ${JSON.stringify(result.expected)}\nActual: ${JSON.stringify(result.actual)}`,
          )
          .join("\n\n"),
      );
    } catch (error) {
      setTestResults([]);
      setOutput(
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : "Execution failed.",
      );
    }
  }

  const allPassed =
    testResults.length === tests.length &&
    testResults.every((result) => result.passed);

  return (
    <div className="mx-auto min-w-0 max-w-[1600px] space-y-6 pb-8 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-blue-300">
            Learn / DSA{screen > 1 ? ` / ${topic.name}` : ""}
            {screen > 2 ? ` / ${selectedSubtopic}` : ""}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {screen === 1
              ? "DSA Learning Path"
              : screen === 2
                ? topic.name
                : screen === 5
                  ? "Practice Results"
                  : selectedSubtopic}
          </h1>
          <p className="mt-2 text-blue-200">
            {screen === 1
              ? "Master data structures and algorithms step by step."
              : screen === 2
                ? topic.description
                : "Explore the concepts, review examples, and practise your skills."}
          </p>
        </div>

        <button onClick={goBack} className={secondary}>
          <ArrowLeft size={18} />
          {screen === 1 ? "Back to Dashboard" : "Back"}
        </button>
      </div>

      {screen === 1 && (
        <div className="grid items-start gap-5 xl:grid-cols-[1.7fr_0.85fr]">
          <section className={card}>
            <h2 className="text-xl font-bold">Your Learning Path</h2>
            <p className="mt-2 text-sm text-blue-300">
              Choose a topic to explore its subtopics.
            </p>

            <div className="mt-5 space-y-3">
              {topics.map((item, index) => {
                const count = item.subtopics.filter((sub) =>
                  completed.includes(sub),
                ).length;

                return (
                  <button
                    key={item.name}
                    onClick={() => openTopic(index)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-blue-800 bg-blue-950/50 p-4 text-left hover:border-purple-500 hover:bg-purple-950/30"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-900 text-blue-200">
                      {count === item.subtopics.length ? (
                        <CheckCircle2 />
                      ) : (
                        <BookOpen />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{item.name}</span>
                      <span className="mt-1 block text-sm text-blue-300">
                        {item.description}
                      </span>
                      <span className="mt-2 block text-xs text-blue-400">
                        {count}/{item.subtopics.length} completed
                      </span>
                    </span>
                    <ArrowRight className="shrink-0 text-blue-300 group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="space-y-5">
            <section className={card}>
              <h2 className="font-bold">Overall Progress</h2>
              <div
                className="mx-auto my-6 grid size-36 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#8b5cf6 ${percent}%, #23345f ${percent}% 100%)`,
                }}
              >
                <div className="grid size-28 place-items-center rounded-full bg-[#111b3d]">
                  <span className="text-3xl font-bold">{percent}%</span>
                </div>
              </div>
              <p className="text-center text-sm text-blue-200">
                {completed.length} of {total} subtopics completed
              </p>
            </section>

            <section className={card}>
              <Lightbulb className="text-purple-400" size={26} />
              <h2 className="mt-3 font-bold">Ready to learn?</h2>
              <p className="mt-2 text-sm leading-6 text-blue-200">
                Start with the fundamentals and build confidence through practice.
              </p>
              <button onClick={() => openTopic(0)} className={`${primary} mt-5 w-full`}>
                Start Learning <ArrowRight size={17} />
              </button>
            </section>
          </aside>
        </div>
      )}

      {screen === 2 && (
        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{topic.name} Subtopics</h2>
              <p className="mt-2 text-sm text-blue-300">
                Select a subtopic to open its resources, summary, and practice.
              </p>
            </div>
            <span className="text-sm text-blue-300">
              {topic.subtopics.filter((sub) => completed.includes(sub)).length}/
              {topic.subtopics.length} completed
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {topic.subtopics.map((subtopic, index) => {
              const done = completed.includes(subtopic);

              return (
                <button
                  key={subtopic}
                  onClick={() => openSubtopic(subtopic)}
                  className="flex w-full items-center gap-4 rounded-xl border border-blue-800 bg-blue-950/50 p-4 text-left hover:border-purple-500"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-900 font-semibold">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{subtopic}</span>
                    <span className="mt-1 block text-sm text-blue-300">
                      Study the concept and solve related problems.
                    </span>
                  </span>
                  {done && <CheckCircle2 className="text-emerald-400" />}
                  <ArrowRight size={18} className="text-blue-300" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {screen === 3 && (
        <>
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-blue-800 bg-blue-950/60 p-2">
            {(
              [
                ["Resources", FileText],
                ["Summary", BookOpen],
                ["Practice", Code2],
              ] as const
            ).map(([name, Icon]) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                className={`flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold ${
                  tab === name
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "text-blue-200 hover:bg-blue-900"
                }`}
              >
                <Icon size={18} /> {name}
              </button>
            ))}
          </div>

          {tab === "Resources" && (
            <div className="grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
              <section className={card}>
                <h2 className="flex items-center gap-3 text-xl font-bold">
                  <FileText className="text-purple-400" /> Learning Resources
                </h2>
                <p className="mt-3 leading-7 text-blue-200">
                  Use these resources to understand {selectedSubtopic}. Read the
                  explanation, trace the examples, and try the code yourself.
                </p>
                <div className="mt-5 space-y-3">
                  {resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-blue-800 bg-blue-950/60 p-4 hover:border-purple-500"
                    >
                      <FileText className="shrink-0 text-purple-400" />
                      <span className="flex-1">
                        <span className="block font-semibold">{resource.title}</span>
                        <span className="mt-1 block text-sm text-blue-300">
                          {resource.description}
                        </span>
                      </span>
                      <ExternalLink size={17} />
                    </a>
                  ))}
                </div>
              </section>

              <div className="space-y-5">
                <InfoCard title="What You'll Learn" icon={<Target />}>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Understand the concept and when to use it.</li>
                    <li>Identify common problem-solving patterns.</li>
                    <li>Analyse time and space complexity.</li>
                  </ul>
                </InfoCard>
                <button
                  onClick={() => setTab("Summary")}
                  className={`${primary} w-full`}
                >
                  Continue to Summary <ArrowRight size={17} />
                </button>
              </div>
            </div>
          )}

          {tab === "Summary" && (
            <section className={card}>
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <BookOpen className="text-purple-400" /> Concept Summary
              </h2>
              <p className="mt-4 leading-7 text-blue-200">
                {selectedSubtopic} is part of problem-solving with data
                structures and algorithms. First understand the input and
                expected output, then choose an approach, consider edge cases,
                and evaluate efficiency.
              </p>
              <h3 className="mt-6 font-bold">Key points to remember</h3>
              <ul className="mt-3 space-y-3">
                {[
                  "Understand the problem before writing code.",
                  "Test empty input, duplicate values, and boundary conditions.",
                  "Explain the algorithm step by step.",
                  "Evaluate time and space complexity.",
                ].map((point, index) => (
                  <li key={point} className="flex gap-3 rounded-xl border border-blue-800 p-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-purple-900 font-bold">
                      {index + 1}
                    </span>
                    <span className="text-blue-200">{point}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setTab("Practice")} className={`${primary} mt-6`}>
                Practise this topic <ArrowRight size={18} />
              </button>
            </section>
          )}

          {tab === "Practice" && (
            <div className="grid min-w-0 gap-5 xl:grid-cols-2">
              <section className={card}>
                <h2 className="text-xl font-bold">
                  Problem: Two Sum in a Sorted Array
                </h2>
                <p className="mt-3 leading-7 text-blue-200">
                  Given a sorted array of integers and a target, return the
                  indices of two numbers whose sum equals the target. Return
                  an empty array if no matching pair exists.
                </p>
                <div className="mt-5 rounded-xl bg-slate-950 p-4">
                  <h3 className="font-semibold">Examples</h3>
                  <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-blue-100">{`Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Input: nums = [2, 3, 4, 5, 6], target = 11
Output: [1, 4]

Input: nums = [1, 2, 4, 8], target = 20
Output: []`}</pre>
                </div>
                <h3 className="mt-5 font-semibold">Constraints</h3>
                <p className="mt-2 text-sm leading-6 text-blue-300">
                  The array is sorted in non-decreasing order. Return zero-based
                  indices of the matching pair.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm text-blue-300">
                  <Clock3 size={17} /> Expected time complexity: O(n)
                </div>
              </section>

              <section className="min-w-0 overflow-hidden rounded-2xl border border-blue-800 bg-slate-950">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900 p-3">
                  <span className="text-sm font-semibold text-blue-200">
                    JavaScript · Monaco Editor
                  </span>
                  <div className="flex gap-2">
                    <button onClick={runCode} className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-500">
                      <Play size={16} /> Run
                    </button>
                    <button
                      onClick={() => {
                        setCode(starterCode);
                        setOutput("");
                        setTestResults([]);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-blue-800 px-3 py-2 hover:bg-blue-900"
                    >
                      <RotateCcw size={16} /> Reset
                    </button>
                  </div>
                </div>
                <Editor
                  height="350px"
                  language="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                    wordWrap: "on",
                  }}
                />
                <div className="border-t border-blue-900 p-4">
                  <div className="mb-3 flex items-center gap-2 font-semibold">
                    <ListChecks size={18} className="text-blue-300" />
                    Console and Test Results
                  </div>
                  <pre className="max-h-64 min-h-20 overflow-auto whitespace-pre-wrap rounded-xl bg-[#080f23] p-4 text-sm leading-6 text-blue-200">
                    {output || "Click Run to execute the sample test cases."}
                  </pre>
                  {testResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`rounded-lg border p-3 text-sm ${
                            result.passed
                              ? "border-emerald-800 text-emerald-300"
                              : "border-red-800 text-red-300"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {result.passed ? <CheckCircle2 size={16} /> : <ListChecks size={16} />}
                            Test {index + 1}: {result.passed ? "PASSED" : "FAILED"}
                          </span>
                        </div>
                      ))}
                      <button
                        onClick={() => setScreen(5)}
                        className={`${primary} mt-3 w-full`}
                      >
                        View Results & Solution <ArrowRight size={17} />
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </>
      )}

      {screen === 5 && (
        <div className="grid gap-5 xl:grid-cols-2">
          <section className={card}>
            <div className="flex items-center gap-3">
              {allPassed ? (
                <CheckCircle2 className="text-emerald-400" size={30} />
              ) : (
                <ListChecks className="text-amber-400" size={30} />
              )}
              <div>
                <h2 className="text-xl font-bold">Test Results</h2>
                <p className="text-sm text-blue-300">
                  {testResults.filter((item) => item.passed).length} of {tests.length} tests passed
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="rounded-xl border border-blue-800 bg-blue-950/60 p-4">
                  <p className={result.passed ? "text-emerald-300" : "text-red-300"}>
                    {result.passed ? "✓" : "✗"} Test Case {index + 1}
                  </p>
                  <p className="mt-2 text-sm text-blue-300">{result.input}</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Expected: {JSON.stringify(result.expected)}
                  </p>
                  <p className="mt-1 text-sm text-blue-200">
                    Actual: {JSON.stringify(result.actual)}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setScreen(3);
                setTab("Practice");
              }}
              className={`${secondary} mt-5`}
            >
              <ArrowLeft size={17} /> Back to Editor
            </button>
          </section>

          <section className={card}>
            <h2 className="text-xl font-bold">Solution Approach</h2>
            <p className="mt-4 leading-7 text-blue-200">
              Because the array is sorted, place one pointer at the beginning
              and another at the end. If their sum is too small, move the left
              pointer forward. If it is too large, move the right pointer
              backward. Stop when the target is found or the pointers meet.
            </p>
            <h3 className="mt-5 flex items-center gap-2 font-semibold">
              <Clock3 size={18} /> Complexity
            </h3>
            <p className="mt-2 text-blue-300">
              Time: O(n) · Extra space: O(1)
            </p>
            <h3 className="mt-5 font-semibold">Key takeaways</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-blue-300">
              <li>Use the sorted order to reduce unnecessary comparisons.</li>
              <li>Move one pointer at a time based on the sum.</li>
              <li>Test boundary cases before submitting.</li>
            </ul>
            {allPassed && (
              <button
                onClick={() => {
                  markComplete();
                  setScreen(2);
                }}
                className={`${primary} mt-6 w-full`}
              >
                <CheckCircle2 size={18} /> Complete Subtopic
              </button>
            )}
          </section>
        </div>
      )}

      {screen !== 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={goBack} className={secondary}>
            <ArrowLeft size={17} /> Back
          </button>
          {screen === 3 && (
            <button
              onClick={() => {
                setTab("Practice");
              }}
              className={primary}
            >
              Go to Practice <ArrowRight size={17} />
            </button>
          )}
          {screen === 2 && (
            <button
              onClick={() => openSubtopic(topic.subtopics[0])}
              className={primary}
            >
              Start First Subtopic <ArrowRight size={17} />
            </button>
          )}
        </div>
      )}

      <p className="text-xs leading-5 text-blue-400/80">
        Demo note: code runs in the browser using JavaScript Function execution.
        This is not a secure sandbox for untrusted submissions. A production
        coding platform should run submitted code in an isolated backend service.
      </p>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-blue-800/80 bg-gradient-to-br from-blue-950/90 to-indigo-950/80 p-5">
      <h2 className="mb-3 flex items-center gap-3 font-bold">
        <span className="text-purple-400">{icon}</span>
        {title}
      </h2>
      <div className="text-sm leading-6 text-blue-200">{children}</div>
    </section>
  );
}
