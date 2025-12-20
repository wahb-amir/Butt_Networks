import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer border-t-1 border-gray-700 bg-gray-50 text-gray-900 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Butt Networks</h2>
          <p>
            Building modern full-stack web applications with powerful, scalable
            technologies.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p className=" flex items-center justify-center md:justify-start gap-4 mb-2">
            <FaEnvelope /> dev.buttnetworks@gmail.com
          </p>
          <p className=" flex items-center justify-center md:justify-start gap-4 mt-2">
            <FaEnvelope /> shahnawazsaddamb@gmail.com
          </p>
          <p className=" flex items-center justify-center md:justify-start gap-4 mt-2">
            <FaEnvelope /> wahbamir2010@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <FaPhone /> +92 300 4907243
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Me</h2>
          <div className="flex justify-center md:justify-start gap-6 text-2xl">
            <a
              href="https://github.com/ShahanwazSaddam144/Butt-Networks"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm">
        &copy; {new Date().getFullYear()} Butt Networks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
