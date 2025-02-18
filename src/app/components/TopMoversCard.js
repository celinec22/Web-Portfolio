"use client";

export default function TopMoversCard({ repoName }) {
  return (
    <div className="w-[200px] h-[150px] rounded-sm border border-gray-600 flex flex-col p-4">
      <h2 className="text-white text-lg font-semibold">{repoName}</h2>
    </div>
  );
}
