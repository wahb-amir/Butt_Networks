import React from "react";
import { Users } from "lucide-react";

const Collaboration = () => {
  return (
    <>
      <section className="Collaboration mt-30">
        <div className="text-center mx-10">
          <div className="flex items-center justify-center bg-blue-800 w-[100px] h-[100px] rounded-[100%] m-auto">
            <Users size={50} className="text-white" />
          </div>

          <h1 className="font-bold text-[30px]">
            In Collaboration with Chohan-Space
          </h1>
          <p className="text-[18px] font-semibold text-gray-700 mt-2">
            Butt Networks is proud to partner with Chohan-Space, a leader in
            innovative web solutions. Led by CEO Abdullah Chohan, this
            collaboration combines our strengths to push the boundaries of
            digital experiences and build the future of the web, together.
          </p>
          <a href="https://thechohan.space/" target="_blank">
            <button
              className="button mt-6 px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
              type="button"
            >
              Visit Chohan Space
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Collaboration;
