import React from "react";

const Quiz_App = () => {
  return (
    <section className="QuizApp py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
          Master Coding Skills with <span className="text-yellow-500">Fun Quizzes!</span>
        </h1>

        {/* Description */}
        <p className="Quiz-Text text-lg lg:text-xl mb-6 text-gray-900">
          Challenge yourself with coding questions, test your knowledge, and improve your programming skills with our interactive mobile quiz app.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/application-2d156cdb-76b2-4890-bfc6-786960778d89.apk" 
            download
            className="bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
          >
            Download Now
          </a>
          <button className="bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition">
            Learn More
          </button>
        </div>

        {/* Note */}
        <p className="Quiz-Text mt-6 text-sm text-gray-800">
          Available for Android devices. Free to download.
        </p>
      </div>
    </section>
  );
};

export default Quiz_App;
