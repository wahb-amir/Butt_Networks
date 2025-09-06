"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const blogs = [
  {
    image: "/blog1.jpg",
    title: "Website Development",
    desc: "Building modern, responsive, and user-friendly websites using the latest technologies like React, Next.js, and Tailwind CSS to ensure speed, security, and scalability.",
  },
  {
    image: "/blog2.jpg",
    title: "React Native",
    desc: "Developing cross-platform mobile apps with React Native for smooth performance, native features, and a single codebase for both iOS and Android.",
  },
  {
    image: "/blog3.jpg",
    title: "Python and C",
    desc: "Solving complex problems with Python for AI and automation while leveraging C for high-performance system programming and efficiency.",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Animate once
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
      <section ref={sectionRef} className="Blogs mt-30">
        <h1 className="text-center font-bold text-[40px] mb-5">Blogs</h1>
        <div className="flex flex-wrap justify-center gap-20">
          {blogs.map((item, index) => (
            <div
              key={index}
              className={`Blogs-Container bg-gray-200 shadow-lg rounded-xl p-5 w-[100%] sm:w-[350px] text-center transform transition-all duration-700 opacity-0 ${
                visible ? "animate-fadeUp" : ""
              }`}
              style={{
                animationDelay: visible ? `${index * 0.2}s` : "0s",
                animationFillMode: "forwards",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="rounded-[5px] block m-auto"
              />
              <h2 className="text-xl font-semibold mt-3">{item.title}</h2>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
