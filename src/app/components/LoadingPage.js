"use client";
import React, { useEffect, useState } from "react";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.5; // Adjust speed
      });
    }, 20); // Adjust interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white">
      <p className="text-lg mb-4 font-semibold">
        Loading {Math.round(progress)}%
      </p>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
