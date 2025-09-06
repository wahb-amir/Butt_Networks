"use client";
import React, { useState, useEffect } from "react";

const Home_ = () => {
  const [showPopup, setShowPopup] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="Home py-20 px-5 bg-gradient-to-br from-gray-500 to-gray-400 mt-19 cursor-pointer"
    >
      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              👋 Welcome to Butt Networks
            </h2>
            <p className="text-gray-600 mb-5">
           We are proud to be collaborating with <b>Chohan Space</b>, led by CEO Abdullah Chohan.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:scale-105 transition shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

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

