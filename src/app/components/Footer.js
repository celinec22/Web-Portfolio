export default function Footer() {
  return (
    <div
      id="Footer"
      className="bg-gray-600 text-white flex justify-center items-center p-4 space-x-16"
    >
      <a href="mailto:cchahine@umich.edu" className="hover:opacity-80">
        <img
          src="/email.png"
          className="w-6 h-6 hover:opacity-100 hover:scale-110 transition-all"
        />
      </a>
      <a
        href="https://github.com/celinec22"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
      >
        <img
          src="/github.png"
          className="w-6 h-6 hover:opacity-100 hover:scale-110 transition-all filter brightness-95"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/celine-chahine-678b55263/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
      >
        <img
          src="/linkedin.png"
          className="w-8 h-8 hover:opacity-100 hover:scale-110 transition-all"
        />
      </a>
    </div>
  );
}
