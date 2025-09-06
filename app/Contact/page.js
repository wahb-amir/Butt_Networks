"use client";

import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("📝 Field changed:", e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Sending form data:", formData);

    try {
      const res = await fetch("https://wahb.buttnetworks.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong 😬");

      setResponseMsg("✅ Message sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setResponseMsg(""), 3000);
    } catch (error) {
      console.error("❌ Error submitting form:", error.message || error);
      alert(error.message || "Failed to send message.");
    }
  };

  return (
    <>
    <Navbar/>
    <section
      id="contact"
      className="contact py-16 px-4 mt-12"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center  mb-8">
          Contact Our Team
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="w-full border-b-2 border-gray-700 dark:border-gray-400 focus:border-gray-900 px-2 py-2 outline-none transition duration-200 bg-transparent"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full border-b-2  border-gray-300 dark:border-gray-400 focus:border-gray-900 px-2 py-2 outline-none transition duration-200 bg-transparent"
          />

          <input
            name="phone"
            placeholder="Your Phone"
            onChange={handleChange}
            value={formData.phone}
            required
            className="w-full border-b-2 border-gray-300 dark:border-gray-400 focus:border-gray-900 px-2 py-2 outline-none transition duration-200 bg-transparent"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.message}
            required
            rows="4"
            className="w-full border-b-2 border-gray-300 dark:border-gray-400 focus:border-gray-900 px-2 py-2 outline-none transition duration-200 resize-none bg-transparent"
          />

          <button
            className=" button py-3 w-[100%] block m-auto bg-gradient-to-r from-gray-800 to-gray-900 
        text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Get Started
          </button>
        </form>

        {responseMsg && (
          <p className="mt-6 text-center text-sm text-green-600 font-medium">
            {responseMsg}
          </p>
        )}
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Contact;
