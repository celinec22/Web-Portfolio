"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function Dashboard() {
  const [commitData, setCommitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("1W");
  const [totalCommits, setTotalCommits] = useState(0);
  const [prevTotalCommits, setPrevTotalCommits] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [hoveredCommit, setHoveredCommit] = useState(null);

  useEffect(() => {
    async function fetchCommits() {
      const query = `
        query {
          viewer {
            repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
              nodes {
                name
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 100, since: "2025-01-01T00:00:00Z") {
                        edges {
                          node {
                            committedDate
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error("Error fetching commits:", data.errors);
        return;
      }

      let allCommits = [];
      data.data.viewer.repositories.nodes.forEach((repo) => {
        if (!repo.defaultBranchRef) return;

        repo.defaultBranchRef.target.history.edges.forEach((commit) => {
          const date = commit.node.committedDate.substring(0, 10);
          const existing = allCommits.find((entry) => entry.date === date);
          if (existing) {
            existing.commits += 1;
          } else {
            allCommits.push({ date, commits: 1 });
          }
        });
      });

      allCommits.sort((a, b) => new Date(a.date) - new Date(b.date));

      let cumulative = 0;
      allCommits = allCommits.map((entry) => {
        cumulative += entry.commits;
        return { ...entry, commits: cumulative };
      });

      setCommitData(allCommits);
      filterData("1Y", allCommits);
    }

    fetchCommits();
  }, []);

  function filterData(range, data) {
    const now = new Date();
    let filtered = [];
    let pastDate = new Date();

    if (range === "1W") pastDate.setDate(now.getDate() - 7);
    else if (range === "1M") pastDate.setMonth(now.getMonth() - 1);
    else if (range === "1Y") pastDate.setFullYear(now.getFullYear() - 1);
    else pastDate = new Date("2024-01-01");

    filtered = data.filter((d) => new Date(d.date) >= pastDate);
    setFilteredData(filtered);
    setSelectedRange(range);

    const currentTotal = filtered.length
      ? filtered[filtered.length - 1].commits
      : 0;
    setTotalCommitsWithAnimation(currentTotal);

    const pastTotal =
      data.find((d) => d.date === pastDate.toISOString().substring(0, 10))
        ?.commits || 0;
    setPercentageChange(((currentTotal - pastTotal) / (pastTotal || 1)) * 100);
  }

  // Function to gradually update the total commits
  const setTotalCommitsWithAnimation = (newTotal) => {
    const interval = 50;
    const step = 1;
    const diff = newTotal - prevTotalCommits;

    if (diff !== 0) {
      let current = prevTotalCommits;

      const animate = () => {
        current += Math.sign(diff) * step;
        if (
          (diff > 0 && current < newTotal) ||
          (diff < 0 && current > newTotal)
        ) {
          setTotalCommits(current);
          setTimeout(animate, interval);
        } else {
          setTotalCommits(newTotal);
        }
      };

      animate();
      setPrevTotalCommits(newTotal);
    }
  };

  const handleHover = (commitValue) => {
    setHoveredCommit(commitValue);
    setTotalCommitsWithAnimation(commitValue);
  };

  const handleLeave = () => {
    setHoveredCommit(null);
    setTotalCommitsWithAnimation(
      filteredData.length ? filteredData[filteredData.length - 1].commits : 0
    );
  };

  return (
    <div className="p-4 mt-16 bg-black flex flex-col items-left">
      <h1 id="Home" className="text-2xl text-gray-300 font-bold mb-4 p-4">
        Github Commits{" "}
        <p className="mt-2">
          <span
            className={`text-white-400 transition-all duration-300 ease-in-out ${
              hoveredCommit !== null && hoveredCommit !== totalCommits
                ? "text-green-500"
                : ""
            }`}
          >
            {hoveredCommit !== null ? hoveredCommit : totalCommits} commits
          </span>
        </p>
        <p className="text-xs text-green-400 flex items-center">
          <svg
            className="w-5 h-10 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5 12l5-5 5 5H5z" clipRule="evenodd" />
          </svg>
          ({percentageChange.toFixed(2)}%) up this {selectedRange}
        </p>
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={filteredData}
          onMouseMove={(e) => {
            if (e && e.activePayload && e.activePayload.length) {
              handleHover(e.activePayload[0].payload.commits);
            }
          }}
          onMouseLeave={handleLeave}
        >
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ display: "none" }}
            cursor={{ stroke: "#D1D5DB", strokeWidth: 1 }}
          />

          <ReferenceLine y={25} stroke="#D1D5DB" strokeDasharray="1 9" />

          <Line
            type="monotone"
            dataKey="commits"
            stroke="#4CAF50"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex space-x-4 mb-[0px] ml-2 text-sm font-bold ">
        {["1W", "1M", "1Y", "All"].map((range) => (
          <button
            key={range}
            onClick={() => filterData(range, commitData)}
            className={`relative pb-2 ${
              selectedRange === range
                ? "text-green-500 font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-green-500"
                : "text-white"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <hr className="border-gray-600" />

        <div className="flex flex-row justify-between">
          <h1 className="font-capsule text-sm text-gray-300 font-bold p-4">
            Commit Power{" "}
          </h1>
          <h1 className="font-capsule text-gray-300 font-bold p-4">∞ </h1>
        </div>

        <hr className="border-gray-600" />
      </div>
    </div>
  );
}
