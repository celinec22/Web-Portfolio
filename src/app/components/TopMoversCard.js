"use client";

// we have top movers card taking in repo name and total commits per week.
export default function TopMoversCard({ repoName, totalCommits }) {
  return (
    <div className="sm:w-full sm:h-full lg:w-[175px] lg:h-[175px]  rounded-sm border border-gray-600 flex flex-col p-4 hover:bg-gray-600">
      <h1 className="text-white text-[15px] font-bold">{repoName}</h1>
      <div className="mt-4">
        <h2 className="text-green-400 text-sm font-bold mt-10">
          ▲ {totalCommits} commits this week
        </h2>
      </div>
    </div>
  );
}
