"use client";
import React from "react";
import {
  FaNodeJs,
  FaReact,
  FaPython,
  FaLinux,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiC,
  SiTensorflow,
  SiReact,
} from "react-icons/si";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const stack = [
  { 
    name: "JavaScript", 
    icon: <SiJavascript className="text-yellow-400" />, 
    progress: 70,
    desc: "Core language for web interactivity and app logic."
  },
  { 
    name: "Tailwind CSS", 
    icon: <SiTailwindcss className="text-sky-500" />, 
    progress: 75,
    desc: "Utility-first CSS framework for responsive designs."
  },
  { 
    name: "Node.js", 
    icon: <FaNodeJs className="text-green-600" />, 
    progress: 80,
    desc: "JavaScript runtime for scalable backend systems."
  },
  { 
    name: "Express.js", 
    icon: <SiExpress className="text-gray-700" />, 
    progress: 75,
    desc: "Minimalist backend framework for Node.js APIs."
  },
  { 
    name: "MongoDB", 
    icon: <SiMongodb className="text-green-700" />, 
    progress: 70,
    desc: "NoSQL database for flexible and fast data storage."
  },
  { 
    name: "React.js", 
    icon: <FaReact className="text-cyan-400" />, 
    progress: 78,
    desc: "Library for creating interactive UIs and components."
  },
  { 
    name: "Next.js", 
    icon: <SiNextdotjs className="text-black" />, 
    progress: 78,
    desc: "React framework for SSR and full-stack apps."
  },
  { 
    name: "React Native", 
    icon: <SiReact className="text-cyan-500" />, 
    progress: 65,
    desc: "Platform for apps framework for iOS and Android."
  },
  { 
    name: "Python", 
    icon: <FaPython className="text-blue-700" />, 
    progress: 80,
    desc: "Versatile language for web, AI, and automation."
  },
  { 
    name: "Scikit-Learn (ML)", 
    icon: <SiTensorflow className="text-orange-400" />, 
    progress: 45,
    desc: "Machine learning library for building models."
  },
  { 
    name: "Linux", 
    icon: <FaLinux className="text-gray-800 " />, 
    progress: 70,
    desc: "For deploying and managing applications securely."
  },
  { 
    name: "C Language", 
    icon: <SiC className="text-blue-800" />, 
    progress: 60,
    desc: "Low-level language for system and performance apps."
  },
];

const Skills = () => {
  return (
    <section className="Skills py-10 px-5 mt-20 bg-transparent" id="skills">
      <h1 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3 text-gray-800">
        <span role="img" aria-label="briefcase">
          💼
        </span>
        Tech Stack
      </h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="max-w-6xl mx-auto"
      >
        {stack.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="SkillsBox bg-gray-100 shadow-lg rounded-xl p-6 flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="text-5xl">{item.icon}</div>
              <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600 text-center">{item.desc}</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${item.progress}%` }}
                />
                <span className="absolute inset-0 flex justify-center items-center text-xs font-semibold text-white">
                  {item.progress}%
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Skills;
