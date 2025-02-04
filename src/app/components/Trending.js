export default function Trending() {
  const skills = [
    { name: "HTML", icon: "/html.svg" },
    { name: "CSS", icon: "/css.svg" },
    { name: "JavaScript", icon: "/javascript.svg" },
    { name: "React", icon: "/react.svg" },
    { name: "Next.js", icon: "/next.svg" },
    { name: "Node.js", icon: "/nodejs.svg" },
    { name: "Python", icon: "/python.svg" },
    { name: "C++", icon: "/c++.svg" },
    { name: "MongoDB", icon: "/mongodb.svg" },
    { name: "SQL", icon: "/mysql.svg" },
    { name: "PHP", icon: "/php.png" },
    { name: "C#", icon: "/csharp.svg" },
  ];

  return (
    <div className="overflow-hidden w-[1000px] h-[200px] rounded-sm mt-10 ">
      <h1 className="text-xl font-bold mb-2">Trending Skills</h1>
      <hr className="mb-4" />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <button
            key={index}
            className="flex items-center gap-2 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full border border-gray-600"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-6 h-6 rounded-full bg-white"
            />
            {skill.name}
          </button>
        ))}
      </div>
      <hr className="mt-10" />
    </div>
  );
}
