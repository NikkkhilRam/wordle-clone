import { FaLinkedinIn } from "react-icons/fa";
import congrats_svg from "../assets/congrats.svg";
import { IoMdClose } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";

function ResultModal({ callback, status, word }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black "></div>
      <div className="relative sm:w-1/3 sm:m-0 mx-5 text-white flex flex-col gap-2 sm:h-3/4 sm:p-4 p-6 rounded-lg  border">
        <IoMdClose
          onClick={callback}
          className="absolute top-3 right-3 cursor-pointer"
          size={24}
        />
        <div className="flex flex-col items-center gap-3 mt-10">
          <img src={congrats_svg} alt="Congratulations" className="w-12 h-12" />
          <p className="text-3xl font-bold font-Jacquard12">
            {status === 1 ? "Congratulations!" : "Better luck next time"}
          </p>
          <p className="text-xl">Want to see how this game was made?</p>
        </div>
        <div className="flex items-center w-full justify-center mt-5">
          <a href="https://github.com/NikkkhilRam/wordle-clone" target="_blank">
            <button className="text-black px-8 py-2 text-xl rounded-full flex items-center gap-2 bg-white">
              <p>Visit Repo</p>
              <IoLogoGithub />
            </button>
          </a>
        </div>
        <div className="h-[1px] mt-10 bg-white"></div>
        <div className="flex flex-col items-center justify-center mt-6">
          <a href="https://www.linkedin.com/in/nikhil-rameshh" target="_blank">
            <button className="flex items-center gap-2 text-white border border-white px-5 p-1 rounded-full hover:bg-white hover:text-black">
              <p>Get in touch</p>
              <FaLinkedinIn />
            </button>
          </a>

          <p className="mt-10 text-2xl">{status === 0 && `Answer : ${word}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
