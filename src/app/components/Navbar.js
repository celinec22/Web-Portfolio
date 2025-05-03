import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white h-16 flex items-center justify-between px-6 z-50">
      <div className="text-gray-300 font-bold text-xl hover:text-green-500">
        Celine's Portfolio
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-10">
        <a
          href="#Home"
          className="text-gray-300 hover:text-green-500 font-bold"
        >
          Home
        </a>
        <a
          href="#trending"
          className="text-gray-300 hover:text-green-500 font-bold"
        >
          Skills
        </a>
        <a
          href="#AboutMe"
          className="text-gray-300 hover:text-green-500 font-bold"
        >
          About
        </a>
        <a
          href="#Footer"
          className="text-gray-300 hover:text-green-500 font-bold"
        >
          Contact Me
        </a>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-center md:hidden">
          <a
            href="#Home"
            className="block py-2 text-gray-300 hover:text-green-500 font-bold"
          >
            Home
          </a>
          <a
            href="#trending"
            className="block py-2 text-gray-300 hover:text-green-500 font-bold"
          >
            Skills
          </a>
          <a
            href="#AboutMe"
            className="block py-2 text-gray-300 hover:text-green-500 font-bold"
          >
            About
          </a>
          <a
            href="#Footer"
            className="block py-2 text-gray-300 hover:text-green-500 font-bold"
          >
            Contact Me
          </a>
        </div>
      )}
    </div>
  );
}
