"use client";

import React from "react";
import {
  Laptop,
  Code,
  Database,
  Smartphone,
  Globe,
  Palette,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";

const services = [
  {
    Icon: Laptop,
    Name: "Web Development",
    Service: "Modern, responsive websites with accessible UIs.",
    badges: ["Frontend", "Website", "Responsive"],
  },
  {
    Icon: Code,
    Name: "Software Development",
    Service: "Custom apps and automation in JS & Python.",
    badges: ["Backend", "Automation", "Custom"],
  },
  {
    Icon: Smartphone,
    Name: "React Native",
    Service: "Cross-platform mobile apps for Android & iOS.",
    badges: ["Mobile", "Cross-Platform", "Apps"],
  },
  {
    Icon: Database,
    Name: "Backend & APIs",
    Service: "Secure, testable APIs using Node.js & Express.",
    badges: ["API", "Database", "Backend"],
  },
  {
    Icon: Globe,
    Name: "Deployment & SEO",
    Service: "Cloud deployments, CI/CD and basic SEO.",
    badges: ["Cloud", "CI/CD", "SEO"],
  },
  {
    Icon: Palette,
    Name: "UI / UX",
    Service: "Polished interfaces and simple user flows.",
    badges: ["Design", "UX", "UI"],
  },
];

export default function Services() {
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };

  const sectionBg = isDarkMode ? "bg-gray-900/40" : "bg-white/60";
  const headingText = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subtitleText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorder = isDarkMode ? "border-gray-700" : "border-gray-100";
  const cardSubtle = isDarkMode ? "text-gray-300" : "text-gray-600";
  const accent = isDarkMode
    ? "from-indigo-500 to-sky-400"
    : "from-blue-500 to-indigo-600";
  const badgeBg = isDarkMode ? "bg-gray-700" : "bg-gray-50";
  const badgeText = isDarkMode ? "text-gray-200" : "text-gray-700";
  const badgeBorder = isDarkMode ? "border-gray-600" : "border-gray-100";

  return (
    <section
      id="services"
      className={`py-12 px-5 mt-20 transition-colors duration-200 ${sectionBg}`}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${headingText}`}>
            Services
          </h2>
          <p
            className={`mt-2 text-sm md:text-base ${subtitleText} max-w-2xl mx-auto`}
          >
            What we build — bite-sized and honest. Pick a service to learn more
            or get in touch for a quick chat.
          </p>
        </header>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden mb-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: true }}
          >
            {services.map((s, i) => (
              <SwiperSlide key={i}>
                <article
                  className={`mx-4 p-4 rounded-xl ${cardBg} ${cardBorder} shadow-sm transition transform hover:-translate-y-1`}
                  role="article"
                  aria-label={s.Name}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r ${accent} text-white`}
                    >
                      <s.Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {s.Name}
                      </h3>
                      <p className={`mt-1 text-sm ${cardSubtle}`}>
                        {s.Service}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {s.badges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${badgeBg} border ${badgeBorder} ${badgeText}`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Link
                          href="/contact"
                          className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-gray-100/50 hover:bg-gray-200 transition"
                        >
                          Get a quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={i}
              className={`p-6 rounded-2xl ${cardBg} ${cardBorder} shadow-sm hover:shadow-lg transition transform hover:-translate-y-1`}
              role="article"
              aria-labelledby={`service-${i}-title`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-none w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${accent} text-white`}
                >
                  <s.Icon size={26} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3
                    id={`service-${i}-title`}
                    className={`text-lg font-semibold ${headingText}`}
                  >
                    {s.Name}
                  </h3>
                  <p className={`mt-2 text-sm ${cardSubtle}`}>{s.Service}</p>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${badgeBg} border ${badgeBorder} ${badgeText}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
