"use client";

export default function TopMoversCard({ cardtitle, cardcontent }) {
  return (
    <div className="w-[200px] h-[270px] rounded-sm border border-gray-600 flex flex-col justify-center items-center">
      <h2 className="text-white">Title</h2>
      <div className="">Content</div>
    </div>
  );
}
