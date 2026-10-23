
import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  LockKeyhole,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type Tab = "resources" | "summary" | "practice";

type Subtopic = {
  title: string;
  description: string;
  summary: string[];
  example: string;
  starterCode: string;
  resource: string;
};

type Topic = {
  title: string;
  description: string;
  subtopics: Subtopic[];
};

const topics: Topic[] = [
  {
    title: "JavaScript Basics",
    description: "Syntax, values, and data types",
    subtopics: [
      {
        title: "Introduction to JavaScript",
        description: "Understand what JavaScript does.",
        summary: [
          "JavaScript adds behavior and interactivity to web pages.",
          "It can run in browsers and in environments such as Node.js.",
          "Statements describe the operations your program performs.",
        ],
        example: 'console.log("Hello, JavaScript!");',
        starterCode: 'console.log("Hello, JavaScript!");',
        resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        title: "Variables and Data Types",
        description: "Store values and understand their types.",
        summary: [
          "Use const for bindings that will not be reassigned.",
          "Use let when a variable needs reassignment.",
          "Common types include string, number, boolean, null, and undefined.",
        ],
        example: 'const name = "Aman";\nconst age = 21;\nconsole.log(name, age);',
        starterCode:
          'const name = "Aman";\nconst age = 21;\n\nconsole.log(name);\nconsole.log(age);',
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
      },
      {
        title: "Operators",
        description: "Perform calculations and comparisons.",
        summary: [
          "Arithmetic operators include +, -, *, and /.",
          "Use === to compare values without type coercion.",
          "Logical operators include &&, ||, and !.",
        ],
        example: "const total = 10 + 5;\nconsole.log(total === 15);",
        starterCode:
          "const price = 100;\nconst discount = 20;\n\nconst total = price - discount;\nconsole.log(total);",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators",
      },
    ],
  },
  {
    title: "Variables",
    description: "Declaration, scope, and reassignment",
    subtopics: [
      {
        title: "let and const",
        description: "Choose the correct declaration.",
        summary: [
          "const prevents reassignment of the binding.",
          "let allows reassignment.",
          "Prefer const unless reassignment is needed.",
        ],
        example: "let score = 10;\nscore = 20;\nconsole.log(score);",
        starterCode: "let score = 10;\n\nscore = 20;\nconsole.log(score);",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
      },
      {
        title: "Scope",
        description: "Understand where variables are available.",
        summary: [
          "Block scope is created by braces for let and const.",
          "Function scope limits a variable to its function.",
          "A variable should be declared in the smallest useful scope.",
        ],
        example: 'if (true) {\n  const message = "Inside";\n  console.log(message);\n}',
        starterCode:
          'if (true) {\n  const message = "Inside the block";\n  console.log(message);\n}',
        resource:
          "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
      },
    ],
  },
  {
    title: "Functions",
    description: "Reusable blocks of code",
    subtopics: [
      {
        title: "Function Declarations",
        description: "Create and call reusable functions.",
        summary: [
          "A function groups reusable instructions.",
          "Call a function by writing its name followed by parentheses.",
          "Parameters receive values when the function is called.",
        ],
        example:
          'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Aman"));',
        starterCode:
          'function greet(name) {\n  // Return a greeting for the given name\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Aman"));',
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      },
      {
        title: "Arrow Functions",
        description: "Write functions with concise syntax.",
        summary: [
          "Arrow functions use the => syntax.",
          "A single expression can use an implicit return.",
          "Arrow functions do not have their own this binding.",
        ],
        example: "const double = (number) => number * 2;\nconsole.log(double(5));",
        starterCode:
          "const double = (number) => number * 2;\n\nconsole.log(double(5));",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
      },
      {
        title: "Parameters and Return Values",
        description: "Pass information into functions and return results.",
        summary: [
          "Parameters define the inputs a function accepts.",
          "Arguments are the actual values passed to the function.",
          "return sends a result back to the caller.",
        ],
        example:
          "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(4, 6));",
        starterCode:
          "function add(a, b) {\n  // Return the sum of a and b\n}\n\nconsole.log(add(4, 6));",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      },
    ],
  },
  {
    title: "Control Flow",
    description: "Conditions and decision-making",
    subtopics: [
      {
        title: "if and else",
        description: "Run code based on a condition.",
        summary: [
          "if runs a block when its condition is truthy.",
          "else provides an alternative branch.",
          "else if allows multiple conditions to be checked.",
        ],
        example:
          'const score = 85;\n\nif (score >= 50) {\n  console.log("Passed");\n} else {\n  console.log("Try again");\n}',
        starterCode:
          'const score = 85;\n\nif (score >= 50) {\n  console.log("Passed");\n} else {\n  console.log("Try again");\n}',
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
      },
      {
        title: "Loops",
        description: "Repeat instructions efficiently.",
        summary: [
          "for loops are useful when you control iteration with a counter.",
          "while loops repeat while a condition remains true.",
          "Avoid conditions that cause unintended infinite loops.",
        ],
        example: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
        starterCode:
          "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
      },
    ],
  },
  {
    title: "Arrays and Objects",
    description: "Organize related information",
    subtopics: [
      {
        title: "Working with Arrays",
        description: "Store and process collections of values.",
        summary: [
          "Arrays store ordered collections of values.",
          "Array indexes start at zero.",
          "Methods such as map and filter help transform collections.",
        ],
        example: "const numbers = [1, 2, 3];\nconsole.log(numbers.map(n => n * 2));",
        starterCode:
          "const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);",
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      },
      {
        title: "Objects",
        description: "Represent data using properties.",
        summary: [
          "Objects store information as key-value pairs.",
          "Properties can be accessed with dot or bracket notation.",
          "Methods are functions stored on objects.",
        ],
        example:
          'const learner = { name: "Aman", level: "Beginner" };\nconsole.log(learner.name);',
        starterCode:
          'const learner = {\n  name: "Aman",\n  level: "Beginner",\n};\n\nconsole.log(learner.name);',
        resource:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
      },
    ],
  },
];

type Props = {
  onBack?: () => void;
};

export default function LearnNavigationPage({ onBack }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("resources");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);

  const topic = selectedTopic === null ? null : topics[selectedTopic];
  const subtopic =
    topic && selectedSubtopic !== null
      ? topic.subtopics[selectedSubtopic]
      : null;

  const totalSubtopics = topics.reduce(
    (sum, item) => sum + item.subtopics.length,
    0,
  );
  const percent = Math.round((completed.length / totalSubtopics) * 100);

  function openSubtopic(topicIndex: number, subtopicIndex: number) {
    const item = topics[topicIndex].subtopics[subtopicIndex];

    setSelectedTopic(topicIndex);
    setSelectedSubtopic(subtopicIndex);
    setTab("resources");
    setCode(item.starterCode);
    setOutput("");
  }

  function back() {
    if (tab !== "resources") {
      setTab("resources");
      return;
    }
    if (selectedSubtopic !== null) {
      setSelectedSubtopic(null);
      setCode("");
      setOutput("");
      return;
    }
    if (selectedTopic !== null) {
      setSelectedTopic(null);
      return;
    }
    onBack?.();
  }

  function runCode() {
    const lines: string[] = [];
    const fakeConsole = {
      log: (...values: unknown[]) =>
        lines.push(values.map((value) => {
          if (typeof value === "string") return value;
          try {
            return JSON.stringify(value);
          } catch {
            return String(value);
          }
        }).join(" ")),
      error: (...values: unknown[]) => lines.push(
        "Error: " + values.map(String).join(" "),
      ),
      warn: (...values: unknown[]) => lines.push(
        "Warning: " + values.map(String).join(" "),
      ),
    };

    try {
      // Educational prototype only: this executes code locally, not in a sandbox.
      const execute = new Function("console", code);
      execute(fakeConsole);
      setOutput(lines.join("\n") || "Code executed successfully. No output.");
    } catch (error) {
      setOutput(
        error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      );
    }
  }

  function markComplete() {
    if (!subtopic) return;
    const key = subtopic.title;
    setCompleted((previous) =>
      previous.includes(key) ? previous : [...previous, key],
    );
  }

  function continueToNext() {
    if (selectedTopic === null || selectedSubtopic === null) return;

    markComplete();

    const currentTopic = topics[selectedTopic];
    if (selectedSubtopic < currentTopic.subtopics.length - 1) {
      openSubtopic(selectedTopic, selectedSubtopic + 1);
    } else if (selectedTopic < topics.length - 1) {
      openSubtopic(selectedTopic + 1, 0);
    } else {
      setSelectedTopic(null);
      setSelectedSubtopic(null);
    }
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-6 pb-8 text-white">
      <div className="flex flex-wrap items-center gap-2 text-sm text-blue-200">
        <button onClick={back} className="hover:text-white">
          Learn
        </button>
        <ChevronRight size={16} />
        <button
          onClick={() => {
            setSelectedTopic(null);
            setSelectedSubtopic(null);
          }}
          className="hover:text-white"
        >
          JavaScript
        </button>
        {topic && (
          <>
            <ChevronRight size={16} />
            <span>{topic.title}</span>
          </>
        )}
        {subtopic && (
          <>
            <ChevronRight size={16} />
            <span className="truncate">{subtopic.title}</span>
          </>
        )}
      </div>

      {!topic && (
        <>
          <header>
            <p className="text-sm text-blue-200">LEARN / JAVASCRIPT</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              JavaScript <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning Path</span>
            </h1>
            <p className="mt-2 text-indigo-200">
              Understand each concept and build your coding skills step by step.
            </p>
          </header>

          <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
            <section className="rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-blue-950/70 to-purple-950/60 p-5 sm:p-7">
              <h2 className="text-xl font-bold">Your Learning Path</h2>
              <p className="mt-2 text-sm text-blue-200">
                Choose a topic to explore its subtopics, resources, summary, and practice.
              </p>

              <div className="mt-6 space-y-3">
                {topics.map((item, index) => {
                  const topicDone = item.subtopics.every((sub) =>
                    completed.includes(sub.title),
                  );

                  return (
                    <button
                      key={item.title}
                      onClick={() => setSelectedTopic(index)}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-indigo-400/20 bg-white/[0.035] p-4 text-left transition hover:border-violet-400/70 hover:bg-violet-500/10 sm:p-5"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-violet-300">
                        {topicDone ? <CheckCircle2 className="text-emerald-400" /> : <BookOpen />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{item.title}</span>
                        <span className="mt-1 block text-sm text-indigo-200">
                          {item.description}
                        </span>
                        <span className="mt-2 block text-xs text-indigo-300/70">
                          {item.subtopics.length} subtopics
                        </span>
                      </span>
                      <ArrowRight className="shrink-0 text-blue-300 transition group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-3xl border border-indigo-400/25 bg-white/[0.045] p-6 text-center">
                <h2 className="text-left font-bold">Your Progress</h2>
                <div
                  className="mx-auto mt-6 grid size-40 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(#8b5cf6 ${percent}%, #28345f ${percent}% 100%)`,
                  }}
                >
                  <div className="grid size-32 place-items-center rounded-full bg-[#111b3d]">
                    <span className="text-3xl font-bold">{percent}%</span>
                  </div>
                </div>
                <p className="mt-5 text-sm text-indigo-200">
                  {completed.length} of {totalSubtopics} subtopics completed
                </p>
              </section>

              <section className="rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-blue-950/70 to-purple-950/60 p-6">
                <Sparkles className="text-violet-400" />
                <h2 className="mt-4 text-lg font-bold">Ready to learn?</h2>
                <p className="mt-2 text-sm text-indigo-200">
                  Start with the basics, then build confidence through hands-on practice.
                </p>
                <button
                  onClick={() => setSelectedTopic(0)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-semibold hover:brightness-110"
                >
                  Start Learning <ArrowRight size={18} />
                </button>
              </section>

              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-blue-200 hover:text-white"
              >
                <ArrowLeft size={17} /> Back to dashboard
              </button>
            </div>
          </div>
        </>
      )}

      {topic && !subtopic && (
        <>
          <header>
            <h1 className="text-3xl font-bold sm:text-4xl">
              {topic.title}
            </h1>
            <p className="mt-2 text-indigo-200">{topic.description}</p>
          </header>

          <section className="rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-blue-950/70 to-purple-950/50 p-5 sm:p-7">
            <h2 className="text-xl font-bold">Explore Subtopics</h2>
            <p className="mt-2 text-sm text-indigo-200">
              Select a subtopic to read documentation, review the summary, or write code.
            </p>

            <div className="mt-6 space-y-3">
              {topic.subtopics.map((item, index) => {
                const isDone = completed.includes(item.title);

                return (
                  <button
                    key={item.title}
                    onClick={() => openSubtopic(selectedTopic!, index)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-indigo-400/20 bg-white/[0.035] p-4 text-left transition hover:border-violet-400/70 hover:bg-violet-500/10 sm:p-5"
                  >
                    {isDone ? (
                      <CheckCircle2 className="shrink-0 text-emerald-400" />
                    ) : (
                      <BookOpen className="shrink-0 text-violet-300" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{item.title}</span>
                      <span className="mt-1 block text-sm text-indigo-200">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight className="shrink-0 text-blue-300" />
                  </button>
                );
              })}
            </div>
          </section>

          <button
            onClick={back}
            className="flex items-center gap-2 text-sm text-blue-200 hover:text-white"
          >
            <ArrowLeft size={17} /> Back to all topics
          </button>
        </>
      )}

      {topic && subtopic && (
        <>
          <header>
            <h1 className="text-3xl font-bold sm:text-4xl">
              {subtopic.title}
            </h1>
            <p className="mt-2 text-indigo-200">{subtopic.description}</p>
          </header>

          <div className="grid min-w-0 items-start gap-5">
            <nav className="grid grid-cols-3 gap-1 rounded-2xl border border-indigo-400/25 bg-white/[0.035] p-2">
              <TabButton
                active={tab === "resources"}
                onClick={() => setTab("resources")}
                icon={<FileText size={19} />}
              >
                Resources
              </TabButton>
              <TabButton
                active={tab === "summary"}
                onClick={() => setTab("summary")}
                icon={<BookOpen size={19} />}
              >
                Summary
              </TabButton>
              <TabButton
                active={tab === "practice"}
                onClick={() => {
                  setTab("practice");
                  setOutput("");
                }}
                icon={<Code2 size={19} />}
              >
                Practice
              </TabButton>
            </nav>

            {tab === "resources" && (
              <section className="rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-blue-950/70 to-purple-950/50 p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <FileText className="text-violet-400" size={27} />
                  <h2 className="text-xl font-bold">Learning Resources</h2>
                </div>
                <p className="mt-4 leading-7 text-indigo-100">
                  {subtopic.description} Study the official documentation, read the explanation, and try the examples yourself.
                </p>

                <div className="mt-6 rounded-2xl border border-indigo-400/20 bg-[#0b1634]/80 p-5">
                  <h3 className="font-semibold">Recommended documentation</h3>
                  <p className="mt-2 text-sm leading-6 text-indigo-200">
                    Read the MDN Web Docs guide for this concept. It includes explanations, examples, and additional references.
                  </p>
                  <a
                    href={subtopic.resource}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-300 hover:text-white"
                  >
                    Open documentation <ExternalLink size={16} />
                  </a>
                </div>

                <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-white/[0.025] p-5">
                  <h3 className="font-semibold">Example</h3>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-[#08132b] p-4 text-sm leading-6 text-blue-100">
                    <code>{subtopic.example}</code>
                  </pre>
                  <button
                    onClick={() => setTab("practice")}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold"
                  >
                    Try this code <Code2 size={17} />
                  </button>
                </div>
              </section>
            )}

            {tab === "summary" && (
              <section className="rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-blue-950/70 to-purple-950/50 p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-violet-400" size={27} />
                  <h2 className="text-xl font-bold">Concept Summary</h2>
                </div>
                <p className="mt-3 text-indigo-200">
                  The key points to remember about {subtopic.title.toLowerCase()}.
                </p>

                <ul className="mt-6 space-y-4">
                  {subtopic.summary.map((point, index) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-xl border border-indigo-400/15 bg-white/[0.025] p-4"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-200">
                        {index + 1}
                      </span>
                      <span className="leading-6 text-indigo-100">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-indigo-400/20 bg-[#0b1634]/80 p-5">
                  <h3 className="font-semibold">Example to remember</h3>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-blue-100">
                    <code>{subtopic.example}</code>
                  </pre>
                </div>

                <button
                  onClick={() => setTab("practice")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold"
                >
                  Practice this concept <ArrowRight size={17} />
                </button>
              </section>
            )}

            {tab === "practice" && (
              <section className="min-w-0 overflow-hidden rounded-3xl border border-indigo-400/25 bg-[#101a38]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
                  <div>
                    <h2 className="font-bold">Practice Workspace</h2>
                    <p className="mt-1 text-sm text-indigo-200">
                      Write JavaScript and run it to see the output.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCode(subtopic.starterCode);
                      setOutput("");
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5"
                  >
                    <RotateCcw size={15} /> Reset
                  </button>
                </div>

                <div className="h-[350px] min-w-0 sm:h-[430px]">
                  <Editor
                    height="100%"
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
                </div>

                <div className="flex flex-wrap gap-3 border-t border-white/10 p-4">
                  <button
                    onClick={runCode}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold hover:brightness-110"
                  >
                    <Play size={17} /> Run Code
                  </button>
                  <button
                    onClick={markComplete}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <CheckCircle2 size={17} /> Mark Complete
                  </button>
                </div>

                <div className="border-t border-white/10 p-4 sm:p-5">
                  <h3 className="font-semibold">Output</h3>
                  <pre className="mt-3 min-h-20 overflow-x-auto whitespace-pre-wrap rounded-xl bg-[#080f23] p-4 text-sm leading-6 text-emerald-300">
                    {output || "Your code output will appear here."}
                  </pre>
                  <p className="mt-3 text-xs leading-5 text-amber-200/80">
                    Prototype note: this editor executes code in your app's JavaScript environment. Do not run untrusted code in a production app without a proper sandbox.
                  </p>
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={back}
              className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white"
            >
              <ArrowLeft size={17} /> Back
            </button>
            <button
              onClick={continueToNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold"
            >
              Complete & Continue <ArrowRight size={17} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold transition sm:px-4 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-950/30"
          : "text-indigo-200 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
