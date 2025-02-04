"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function RepoCommitGraph() {
  const [commitData, setCommitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("1W");

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
                      history(first: 100, since: "2024-01-01T00:00:00Z") {
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
  }

  return (
    <ResponsiveContainer width="20%" height={50}>
      <LineChart data={filteredData}>
        <Line
          type="monotone"
          dataKey="commits"
          stroke="#4CAF50"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
