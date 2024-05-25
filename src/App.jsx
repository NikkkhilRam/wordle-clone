import { Toaster } from "react-hot-toast";
import wordleLogo from "./assets/Wordle-Logo.jpg";
import GameBlock from "./components/GameBlock";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

function App() {
  return (
    <div className="bg-[#121214]">
      <Toaster />
      <div className="bg-white w-full text-center text-3xl flex  justify-center items-center font-semibold uppercase absolute">
        <img src={wordleLogo} alt="" className="w-24" />
      </div>
      <GameBlock />
      <div className="bg-[#121214] w-full  flex   justify-between px-6 items-center font-semibold  absolute pb-2">
        <p className="text-white sm:text-base">Made By Nikhil Ramesh</p>
        <div className="flex text-white items-center gap-2">
          <a
            href="https://github.com/NikkkhilRam"
            target="_blank"
          >
            <FiGithub
              className="cursor-pointer border rounded-full p-[4px] hover:text-black hover:bg-white"
              size={30}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/nikhil-rameshh"
            target="_blank"
          >
            <button className="flex items-center gap-2 text-white border border-white sm:px-5 p-1 rounded-full hover:bg-white hover:text-black">
              <p className="hidden sm:flex">Get in touch</p>
              <FaLinkedinIn size={20} />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
