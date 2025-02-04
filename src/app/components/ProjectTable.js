import React from "react";
import RepoCommitGraph from "./RepoCommitGraph";

const projects = ["NarcanVM", "NutriScan", "ReplenX", "Yahtzee", "MyPass"];

const TableComponent = () => {
  return (
    <div className="overflow-hidden w-[300px] h-[500px] rounded-sm border border-gray-600">
      <table className="min-w-full bg-black text-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-[20px] font-bold">
              Projects
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-t border-gray-600">
              <td className="px-4 py-2 font-bold hover:bg-gray-600 flex justify-between items-center">
                <span className="text-[15px]">{project}</span>
                {index === 0 && <RepoCommitGraph repoName={project} />}
                <p>hi</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
