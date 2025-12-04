"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    Heading: "Digital Website",
    Text: "A modern digital platform built with Next.js and Tailwind CSS. Features dynamic routing, SEO optimization, and a fully responsive UI.",
    demoLink: "https://digital-x.buttnetworks.com/",
  },
  {
    Heading: "Portfolio Website",
    Text: "A portfolio website with features like Dark-Mode and Contact Form built using Next, Node.js, Express, and MongoDB for full-stack. For our Client Syed Zeeshan Haider.",
    demoLink: "https://syedzeeshanhaider.netlify.app/",
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
    Heading: "Tic Tac Toe",
    Text: "A fun and engaging Tic Tac Toe game with interactive UI and win detection logic. Built using React for smooth gameplay experience.",
    demoLink: "https://tic-tac-toebuttnetworks.netlify.app/",
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
          observer.disconnect();
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
      <section
        ref={sectionRef}
        className="Projects mt-30 px-4 md:px-16 mb-5"
        id="projects"
      >
        <h1
          className={`text-center font-extrabold text-[35px] text-gray-800 mb-10 transition-opacity duration-700 ${
            visible ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          Projects
        </h1>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div
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
                     className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
                    >
                      Live Demo
                    </a>
                  ) : project.downloadLink ? (
                    <a
                      href={project.downloadLink}
                      download
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
                    >
                      Download .exe
                    </a>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
