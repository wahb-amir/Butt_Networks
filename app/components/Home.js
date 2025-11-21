"use client";
import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home_ = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="home"
      className="Home py-20 px-5 bg-gradient-to-br from-gray-500 to-gray-400 mt-19 cursor-pointer"
    >
      {/* MAIN CONTENT */}
      <motion.div
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 
       transform hover:scale-[1.01] transition duration-300 border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Typewriter Effect */}
          <Typewriter
            words={["🚀 Welcome to Butt Networks"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
          />
        </motion.h1>

        <motion.h2
          className="text-2xl text-gray-300 font-semibold mb-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Full Stack Web Development
        </motion.h2>

        <motion.p
          className="text-lg text-gray-200 mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Building modern web applications with a focus on user experience,
          performance, and responsive design. We bring your ideas to life with
          scalable and elegant code.
        </motion.p>

        <motion.a href="#skills" variants={buttonVariants} whileHover="hover" whileTap="tap">
          <button
            className="button px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 
        text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            Get Started
          </button>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Home_;
