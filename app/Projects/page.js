"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const projects = [
  {
    Heading: "Blog Website",
    Text: "A modern blog platform built with Next.js and Tailwind CSS. Features dynamic routing, SEO optimization, and a fully responsive UI.",
    demoLink: "https://devblogs.buttnetworks.com/",
  },
  {
    Heading: "Business Website",
    Text: "A professional business website with features like Dark Mode and Contact Form, built using React, Node.js, Express, and MongoDB for full-stack functionality.",
    demoLink: "https://buttnetworks.com/",
  },
  {
    Heading: "Quiz App",
    Text: "An interactive quiz application with multiple categories, instant scoring, and leaderboard functionality. Built with React and Node.js.",
    demoLink: "https://quizapp.buttnetworks.com/",
  },
  {
    Heading: "Get-a-Developer",
    Text: "A developer marketplace platform where clients can find and hire skilled developers. Built with React, Node.js, and MongoDB for a smooth hiring experience.",
    demoLink: "https://get-a-developer.buttnetworks.com/",
  },
  {
    Heading: "Personal Todo-App",
    Text: "A simple yet powerful todo app to manage daily tasks with features like task creation, editing, and deletion. Built using React, Express, and MongoDB.",
    demoLink: "https://todo-app.buttnetworks.com/",
  },
  {
    Heading: "Tic Tac Toe",
    Text: "A fun and engaging Tic Tac Toe game with interactive UI and win detection logic. Built using React for smooth gameplay experience.",
    demoLink: "https://tic-tac-toe.buttnetworks.com/",
  },
    {
    Heading: "E-Commerce Store",
    Text: "An interactive e-comerce application with multiple categories, Built with Next and Node.js and have proper auth-system with proper database.",
    demoLink: "https://boltform.buttnetworks.com/",
  },
  {
    Heading: "Note Pad",
    Text: "A lightweight Notepad application with formatting and save features. Built using Python and Tkinter, packaged as a Windows executable.",
    downloadLink: "/notepad.exe", 
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // 👈 animate once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <Navbar />
      <section ref={sectionRef} className="Projects mt-30 px-4 md:px-16 mb-5">
        <h1
          className={`text-center font-extrabold text-[35px] text-gray-800 mb-10 transition-opacity duration-700 ${
            visible ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          Projects
        </h1>
        <div className="flex justify-center items-center flex-wrap cursor-pointer gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`Projects-Container w-full sm:w-[300px] md:w-[350px] bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-6 flex flex-col justify-between opacity-0 ${
                visible ? "animate-fadeUp" : ""
              }`}
              style={{
                animationDelay: visible ? `${index * 0.2}s` : "0s",
                animationFillMode: "forwards",
              }}
            >
              <h2 className="font-bold text-2xl mb-4 text-gray-900 transition-colors duration-300 hover:text-gray-700">
                {project.Heading}
              </h2>
              <p className="text-gray-700 mb-4 transition-opacity duration-300 hover:opacity-80">
                {project.Text}
              </p>
              <div className="mt-auto">
                {project.demoLink ? (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-gradient-to-r from-gray-600 to-gray-800 px-5 py-2 rounded-[6px] text-white cursor-pointer font-bold hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Live Demo
                  </a>
                ) : project.downloadLink ? (
                  <a
                    href={project.downloadLink}
                    download
                    className="mt-4 bg-gradient-to-r from-gray-600 to-gray-800 px-5 py-2 rounded-[6px] text-white cursor-pointer font-bold hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Download .exe
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
