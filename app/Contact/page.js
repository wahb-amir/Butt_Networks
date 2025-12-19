"use client";

import React, { useState, useEffect, useRef } from "react";
import { SiGithub } from "react-icons/si";

const CONTACT_EMAIL = "shahnawazsaddamb@gmail.com";
const CLIENT_PORTAL = process.env.NEXT_PUBLIC_CONTACT_PLATFORM || "#";
const CLIENT_QUOTE = `${CLIENT_PORTAL}#request-quote`;


const teamGitHub = [
  { name: "Wahb Amir", url: "https://github.com/coder101-js" },
  { name: "Shahanwaz", url: "https://github.com/ShahanwazSaddam144" },
];
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // status: idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isBusy = status === "sending";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("📝 Field changed:", e.target.name, e.target.value);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("📋 Email copied to clipboard");
    } catch {
      // fallback
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Sending form data:", formData);
    setStatus("sending");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong 😬");

      setStatus("sent");
      setResponseMsg("✅ Message sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // reset status/message after a short delay so user sees confirmation
      setTimeout(() => {
        setStatus("idle");
        setResponseMsg("");
      }, 3000);
    } catch (error) {
      console.error("❌ Error submitting form:", error.message || error);
      setStatus("error");
      setResponseMsg(error.message || "Failed to send message.");
      setTimeout(() => {
        setStatus("idle");
        setResponseMsg("");
      }, 4000);
      // keep the browser alert for immediate feedback too (you had this before)
      alert(error.message || "Failed to send message.");
    }
  };

  return (
    <>
      <section id="contact" className="contact py-16 px-4 mt-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Contact Our Team
          </h1>


          <div className="mb-6 flex justify-center ">
            <div
              className="rounded-xl p-4 flex flex-col items-center text-center gap-3 max-w-2xl border shadow-sm
    bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              role="note"
              aria-label="Client portal information"
              style={{
                borderColor: "#cbd5e1",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Client portal is live — manage projects & request quotes ✨
                </h3>
                <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
                  If you’re a client, request a quote or open the portal for tracking. The form still works for quick messages.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <a
                  href={CLIENT_QUOTE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm rounded-md font-medium shadow-sm"
                  aria-label="Request a quote"
                  style={{
                    backgroundColor: "#0ea5e9",
                    color: "#fff",
                    boxShadow: `0 6px 18px #0ea5e933`,
                  }}
                >
                  Request a quote
                </a>

                <a
                  href={CLIENT_PORTAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm rounded-md font-medium border"
                  aria-label="Open client portal"
                  style={{
                    borderColor: "#e6eef6",
                    backgroundColor: "white",
                    color: "#000000"
                  }}
                >
                  Open portal
                </a>

              </div>
            </div>
          </div>

          {/* contact & quick actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 justify-center">
  {/* Email copy button */}
  <div
    onClick={copyEmail}
    role="button"
    aria-label={`Copy email address ${CONTACT_EMAIL}`}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") copyEmail();
    }}
    className="flex items-center gap-3 px-4 py-2 rounded-full border shadow-sm cursor-pointer select-none
               bg-white/90 dark:bg-gray-800 border-gray-300 dark:border-gray-600
               hover:bg-gray-100 dark:hover:bg-gray-700 transition"
  >
    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
      {CONTACT_EMAIL}
    </span>
    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
      {copied ? "Copied!" : "Click to copy"}
    </span>
  </div>

  {/* GitHub dropdown */}
  <div className="relative inline-block text-left" ref={ref}>
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="inline-flex items-center justify-center px-3 py-1 rounded-full border
                 bg-white/90 dark:bg-gray-800 dark:text-white font-medium shadow-sm
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      aria-haspopup="true"
      aria-expanded={open}
    >
      <SiGithub className="w-5 h-5 mr-2" />
      GitHub Team
    </button>

    {open && (
      <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg
                      bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
        <div className="py-1">
          {teamGitHub.map((member) => (
            <a
              key={member.name}
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-100
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <SiGithub className="w-4 h-4 mr-2" />
              {member.name}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
</div>


          {/* Contact form */}
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
              className="w-full border-b-2 border-gray-300 dark:border-gray-400 focus:border-gray-900 px-2 py-2 outline-none transition duration-200 bg-transparent"
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
              type="submit"
              disabled={isBusy}
              aria-busy={isBusy}
              className={`button py-3 w-full block m-auto bg-gradient-to-r from-gray-800 to-gray-900 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition ${isBusy ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "✅ Sent!" : status === "error" ? "Error" : "Get Started"}
            </button>
          </form>

          {responseMsg && (
            <p className="mt-6 text-center text-sm text-green-600 font-medium">
              {responseMsg}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
