export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white h-16 flex items-center justify-between px-6 z-50">
      <div className="text-gray-300 font-bold text-xl hover:text-green-500">
        Celine's Portfolio
      </div>

      <div className="flex space-x-10">
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
    </div>
  );
}
