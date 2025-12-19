"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home_ = () => {
  return (
    <section
      id="home"
      className="mt-30 w-full flex flex-col justify-center items-center text-center px-4 cursor-default"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="Home font-extrabold text-4xl md:text-6xl text-gray-900"
      >
        Welcome to <span className="text-blue-600">Butt Networks</span>
      </motion.h1>

      {/* Typewriter Text */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="Home-Text mt-4 text-xl md:text-3xl font-semibold text-gray-700"
      >
        <Typewriter
          words={[
            "Professional Web Development",
            "React & Next.js Expert",
            "Modern UI/UX Designs",
            "Fast, Secure & Optimized Websites",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="Home max-w-2xl mt-6 text-gray-600 text-base md:text-lg"
      >
        We build fast, secure & high-performance websites for businesses,
        startups & personal brands — with modern technologies and elegant UI.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="mt-8 flex gap-4"
      >
        <Link href='#services'>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
          Our Services
        </button>
        </Link>

        <Link href="/contact">
        <button className="Home px-6 py-3 border border-gray-400 text-gray-600 font-semibold rounded-xl hover:bg-gray-400 transition">
          Contact Us
        </button>
        </Link>

      </motion.div>
    </section>
  );
};

export default Home_;
