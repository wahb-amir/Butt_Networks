"use client";
import React from "react";
import { Laptop, Code, Database, Smartphone, Globe, Palette } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  { Icon: Laptop, Name: "Web Development", Service: "Building modern and responsive websites." },
  { Icon: Code, Name: "Software Development", Service: "Custom software solutions in Python and JavaScript." },
  { Icon: Smartphone, Name: "React Native", Service: "Cross-platform mobile applications for Android & iOS." },
  { Icon: Database, Name: "Backend Development", Service: "Secure and scalable APIs using Node.js and MongoDB." },
  { Icon: Globe, Name: "SEO & Deployment", Service: "Optimized websites with SEO and cloud deployment." },
  { Icon: Palette, Name: "UI/UX Design", Service: "Designing user-friendly and visually appealing interfaces." },
];

const Services = () => {
  return (
    <section className="Services mt-20" id="services">
      <h1 className="font-extrabold text-[40px] text-center mb-10">Services</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 }, 
        }}
        className="w-full max-w-6xl px-6"
      >
        {services.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="Services-Container flex flex-col items-center justify-center cursor-pointer rounded-[10px] bg-gray-50 w-75 h-[190px] mx-auto p-4 shadow-md hover:shadow-lg transition-all duration-300 gap-3">
              <item.Icon size={40} className="Services-P text-gray-800" />
              <h1 className="text-xl font-bold">{item.Name}</h1>
              <p className="Services-P text-gray-700 text-center">{item.Service}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Services;
