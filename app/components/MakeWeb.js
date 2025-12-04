"use client";

import React, { useState } from "react";

const MakeWeb = () => {
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [delivery, setDelivery] = useState("");

  const projectPrices = {
    website: 15000,
    reactnative: 30000,
    ecommerce: 20000,
    portfolio: 8000,
    api: 12000,
  };

  const getEstimatedPrice = () => {
    if (!projectType) return 0;

    let basePrice = projectPrices[projectType];

    if (budget === "medium") basePrice += 5000;
    if (budget === "high") basePrice += 12000;

    if (delivery === "fast") basePrice += 7000;
    if (delivery === "superfast") basePrice += 15000;

    return basePrice;
  };

  return (
    <>
      <section className="MakeWeb text-gray-800 mt-20 px-4 text-center animate-fadeIn">
        <header className="flex justify-center items-center mb-10">
          <h1 className="font-extrabold text-[40px] text-blue-600 uppercase tracking-wider drop-shadow-lg">
            Make Your Project Budget
          </h1>
        </header>

        <p className="Makeweb max-w-xl mx-auto text-gray-800 text-[17px] mb-10">
          Select your project requirements below and instantly calculate your estimated development cost.
        </p>

        {/* Main Card */}
        <div className="Makeweb-Container max-w-2xl mx-auto bg-gray-50 border border-gray-700 rounded-2xl p-6">

          {/* Project Type */}
          <div className="mb-6 text-left">
            <label className="text-sm uppercase opacity-80">Project Type</label>
            <select
              className="Makeweb-Input mt-2 w-full p-3 rounded-xl bg-[#11111120] border border-gray-700 focus:border-blue-500 focus:ring-blue-600 outline-none transition-all"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="">-- Choose Project --</option>
              <option value="website">Website Development</option>
              <option value="reactnative">React Native App</option>
              <option value="ecommerce">E-Commerce Website</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="api">Custom API + Backend</option>
            </select>
          </div>

          {/* Budget */}
          <div className="mb-6 text-left">
            <label className="text-sm uppercase opacity-80">Budget Range</label>
            <select
              className="Makeweb-Input mt-2 w-full p-3 rounded-xl bg-[#11111120] border border-gray-700 focus:border-blue-500 focus:ring-blue-600 outline-none transition-all"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">-- Select Budget --</option>
              <option value="low">Low Budget</option>
              <option value="medium">Medium Budget</option>
              <option value="high">High Budget</option>
            </select>
          </div>

          {/* Delivery Time */}
          <div className="mb-6 text-left">
            <label className="text-sm uppercase opacity-80">Delivery Time</label>
            <select
              className="Makeweb-Input mt-2 w-full p-3 rounded-xl bg-[#11111120] border border-gray-700 focus:border-blue-500 focus:ring-blue-600 outline-none transition-all"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value="">-- Select Delivery Time --</option>
              <option value="normal">Normal (7–10 Days)</option>
              <option value="fast">Fast (3–5 Days)</option>
              <option value="superfast">Super Fast (24–48 Hours)</option>
            </select>
          </div>

          {/* Price Estimate Box */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-extrabold text-white">Estimated Price</h2>
            <p className="text-4xl font-black mt-2 text-white drop-shadow-xl">
              Rs. {getEstimatedPrice().toLocaleString()}
            </p>
          </div>

        </div>

        {/* Footer Text */}
        <p className="Makeweb mt-6 text-gray-700 text-sm">
          *This is only an estimate — final pricing may vary depending on exact features.
        </p>

      </section>
    </>
  );
};

export default MakeWeb;
