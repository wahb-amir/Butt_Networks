"use client";
import React from "react";

const Home_ = () => {

  return (
    <section
      id="home"
      className="Home py-20 px-5 bg-gradient-to-br from-gray-500 to-gray-400 mt-19 cursor-pointer"
    >

      {/* MAIN CONTENT */}
      <div
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 
       transform hover:scale-[1.01] transition duration-300 border border-white/10"
      >
        <h1 className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
          🚀 Welcome to Butt Networks
        </h1>
        <h2 className="text-2xl text-gray-300 font-semibold mb-4">
          Full Stack Web Development
        </h2>
        <p className="text-lg text-gray-200 mb-6 leading-relaxed">
          Building modern web applications with a focus on user experience,
          performance, and responsive design. We bring your ideas to life with
          scalable and elegant code.
        </p>
        <a href="#skills">
          <button
            className="button px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 
        text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
};

export default Home_;

