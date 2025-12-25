"use client";
import React, { useState } from "react";
import RepoCommitGraph from "./RepoCommitGraph";

const projectRepoMap = {
  NutriScan: {
    repo: "NutriScan",
    owner: "celinec22",
    description: "A nutrition scanning app to track food and nutrition data.",
    code: "https://github.com/celinec22/NutriScan",
  },
  ReplenX: {
    repo: "HealthCare_Pill_Tracker",
    owner: "WarrenLaz",
    description:
      "A pill tracking app to remind users of their medication schedules.",
    demo: "https://replenx-info.vercel.app/",
  },
  CRCBuilder: {
    repo: "CRC-Card-Builder",
    owner: "celinec22",
    description:
      "A tool for building CRC (Class Responsibility Collaboration) cards for software design.",
    code: "https://github.com/celinec22/CRC-Card-Builder",
  },
  MyPass: {
    repo: "mypass-manager",
    owner: "hebz26",
    description: "A password manager for securely storing login credentials.",
    demo: "https://www.youtube.com/watch?v=TgCBUT-Td08",
  },
  NarcanVM: {
    repo: "narcan-alert",
    owner: "AliBdeir",
    description: "An app to generate and display Fibonacci sequences.",
    demo: "https://www.narcanvm.com/",
  },
};

const TableComponent = () => {
  const [openProject, setOpenProject] = useState(null);

  const handleArrowClick = (projectName) => {
    setOpenProject(openProject === projectName ? null : projectName);
  };

  return (
    <div className="overflow-auto lg:w-[300px] lg:max-h-[650px] sm:w-full sm:h-full rounded-sm border border-gray-600">
      <table className="min-w-full bg-black text-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-[20px] font-bold border-b border-gray-600">
              Projects
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(projectRepoMap).map(
            (
              [displayName, { repo, owner, description, code, demo }],
              index
            ) => (
              <React.Fragment key={index}>
                <tr className="border-t border-gray-600">
                  <td className="px-4 py-3 font-bold flex justify-between items-center">
                    <span className="text-[15px]">{displayName}</span>
                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                      <RepoCommitGraph repoName={repo} owner={owner} />
                    </div>
                    <button
                      onClick={() => handleArrowClick(displayName)}
                      className="text-gray-300 focus:outline-none"
                    >
                      <span
                        className={
                          openProject === displayName
                            ? "text-white"
                            : "text-green-500"
                        }
                      >
                        {openProject === displayName ? "▼" : "▲"}
                      </span>
                    </button>
                  </td>
                </tr>
                {openProject === displayName && (
                  <>
                    <tr>
                      <td colSpan="3" className="px-4 py-2 bg-gray-800 text-sm">
                        <p>{description}</p>
                      </td>
                    </tr>
                    {(code || demo) && (
                      <tr>
                        <td colSpan="3" className="px-4 py-2 bg-gray-800">
                          <div className="space-y-2">
                            {code && (
                              <a
                                href={code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                              >
                                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900">
                                  Code
                                </button>
                              </a>
                            )}
                            {demo && (
                              <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                              >
                                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900">
                                  Demo
                                </button>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </React.Fragment>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
