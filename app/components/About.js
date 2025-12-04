"use client";

import React, { useRef, useState, useEffect } from "react";
import { Network, ShieldCheck, Cpu, Lightbulb } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Link from 'next/link';

const About = () => {
  const [showSignature, setShowSignature] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  const fullText = `Butt Networks delivers secure, high-performance, and innovative networking solutions for businesses and individuals. We combine expertise with creativity to ensure reliable, scalable, and future-ready systems — connecting people and ideas through seamless technology.`;

  // Detect when About section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mt-15 py-16 px-6 transition-colors cursor-pointer duration-300"
    >
      <div className=" text-center">
        {/* Heading */}
        <h1 className="About flex items-center justify-center gap-3 font-extrabold text-[40px] text-gray-900 mb-6 tracking-wide drop-shadow-lg animate-slideDown">
          <Network className="w-10 h-10 text-blue-400" />
          About
        </h1>

        {/* Typewriter text */}
        {hasStarted && (
          <p className="About-text text-lg text-gray-700 leading-relaxed animate-fadeIn delay-200 whitespace-pre-line">
            <Typewriter
              words={[fullText]}
              cursor
              cursorStyle="|"
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={1000}
              onLoopDone={() => setShowSignature(true)}
            />
          </p>
        )}

        {/* Signature */}
        {showSignature && (
          <div className="mt-4 text-right text-gray-700 italic opacity-0 animate-fadeInSlow">
            — From Our CEO
          </div>
        )}

        {/* Feature icons */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="About-Container flex flex-col items-center p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <ShieldCheck className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="About-Container-Text text-gray-800 font-semibold">Secure Solutions</h3>
          </div>
          <div className="About-Container flex flex-col items-center p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <Cpu className="w-10 h-10 text-purple-400 mb-3" />
            <h3 className="About-Container-Text text-gray-800 font-semibold">High Performance</h3>
          </div>
          <div className="About-Container flex flex-col items-center p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <Lightbulb className="w-10 h-10 text-yellow-400 mb-3" />
            <h3 className="About-Container-Text text-gray-700 font-semibold">Innovative Ideas</h3>
          </div>
          <div className="About-Container flex flex-col items-center p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
            <Network className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="About-Container-Text text-gray-700 font-semibold">Reliable Networks</h3>
          </div>
        </div>
        <Link href='/About'>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
              type="button">Explore Our Blogs</button>
              </Link>
      </div>
    </section>
  );
};

export default About;
