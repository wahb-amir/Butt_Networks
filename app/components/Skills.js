"use client";

import React from "react";
import { FaNodeJs, FaReact, FaPython, FaLinux } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiC,
  SiCplusplus,
  SiScikitlearn,
  SiTypescript,
  SiPytorch,
  SiMysql
} from "react-icons/si";

/* Core tools – shown ONCE */
const CORE_STACK = [
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-neutral-800 dark:text-black" />,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-500" /> },
];

/* Capabilities – tools appear ONCE, in context */
const CAPABILITIES = [
  {
    title: "Frontend Web Apps",
    desc: "Responsive, accessible interfaces with modern React patterns.",
    tools: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-neutral-800 dark:text-black" />
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-sky-500" />,
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" />,
      },
    ],
  },
  {
    title: "Backend APIs",
    desc: "REST APIs and application backends.",
    tools: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
      { name: "Express", icon: <SiExpress className="text-gray-700" /> },
    ],
  },
  {
    title: "Databases",
    desc: "Flexible data models for web apps.",
    tools: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    ],
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform apps for Android and iOS.",
    tools: [
      { name: "React Native", icon: <FaReact className="text-cyan-500" /> },
    ],
  },
  {
    title: "DevOps & Systems",
    desc: "Deploying and running applications.",
    tools: [{ name: "Linux", icon: <FaLinux className="text-gray-800" /> }],
  },
  {
    title: "ML & Experiments",
    desc: "Exploration and prototyping with data.",
    tools: [
      { name: "Python", icon: <FaPython className="text-blue-700" /> },
      {
        name: "Scikit-Learn",
        icon: <SiScikitlearn className="text-orange-400" />,
      },
      { name: "PyTorch", icon: <SiPytorch className="text-orange-400" /> },
    ],
  },
  {
    title: "Systems / Low-level",
    desc: "Performance-oriented and systems work.",
    tools: [
      { name: "C", icon: <SiC className="text-blue-800" /> },
      { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
    ],
  },
];

export default function Skills() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };

  // Theme classes (from your example)
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const cardInnerBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const titleText = isDarkMode ? "text-gray-200" : "text-gray-700";
  const subtitleText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const sectionBg = isDarkMode ? "bg-gray-900/60" : "bg-white/60";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100";

  return (
    <section
      className={`py-12 px-5 mt-20 transition-colors duration-200 ${sectionBg}`}
      id="skills"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-3 ${titleText}`}>
          What We Build
        </h2>
        <p
          className={`text-center text-sm mb-6 max-w-3xl mx-auto ${subtitleText}`}
        >
          Our core tools and the types of systems we build with them.
        </p>

        {/* Core Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {CORE_STACK.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${cardBg} ${borderClass} transition-colors duration-200`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-sm font-medium ${titleText}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-2xl rounded-2xl">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.title}
              className={`p-4 rounded-xl ${cardInnerBg} ${borderClass} shadow-sm transition-shadow hover:shadow-md m-2`}
            >
              <h3 className={`text-base font-semibold ${titleText}`}>
                {cap.title}
              </h3>
              <p className={`text-sm mt-1 mb-3 ${subtitleText}`}>{cap.desc}</p>

              <div className="flex flex-wrap gap-3">
                {cap.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md ${cardBg} ${borderClass} ${subtitleText} text-sm transition-colors duration-200`}
                  >
                    <span className="text-base">{tool.icon}</span>
                    <span className={`${titleText}`}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
