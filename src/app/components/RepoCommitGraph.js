"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function RepoCommitGraph({ repoName, owner }) {
  const [commitData, setCommitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchCommits() {
      const query = `
        query {
          repository(owner: "${owner}", name: "${repoName}") {
            isPrivate
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
      `;

      try {
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
          console.error("GraphQL Error:", data.errors);
          return;
        }

        let allCommits = [];

        const repo = data.data.repository;
        if (repo?.defaultBranchRef) {
          repo.defaultBranchRef.target.history.edges.forEach((commit) => {
            const date = commit.node.committedDate.substring(0, 10);
            const existing = allCommits.find((entry) => entry.date === date);
            if (existing) {
              existing.commits += 1;
            } else {
              allCommits.push({ date, commits: 1 });
            }
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
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    }

    if (repoName) {
      fetchCommits();
    }
  }, [repoName, owner]);

  function filterData(range, data) {
    const now = new Date();
    let pastDate = new Date();

    if (range === "1W") pastDate.setDate(now.getDate() - 7);
    else if (range === "1M") pastDate.setMonth(now.getMonth() - 1);
    else if (range === "1Y") pastDate.setFullYear(now.getFullYear() - 1);
    else pastDate = new Date("2024-01-01");

    setFilteredData(data.filter((d) => new Date(d.date) >= pastDate));
  }

  return (
    <ResponsiveContainer width={200} height={100}>
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
