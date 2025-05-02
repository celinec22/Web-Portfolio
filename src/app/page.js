"use client";

import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import StockTable from "./components/ProjectTable";
import Trending from "./components/Trending";
import AboutMe from "./components/AboutMe";
import Footer from "./components/Footer";
import TopMoversCard from "./components/TopMoversCard";

export default function Home() {
  const [topRepos, setTopRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const sinceDate = oneMonthAgo.toISOString().split("T")[0] + "T00:00:00Z";

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const sinceWeek = oneWeekAgo.toISOString().split("T")[0] + "T00:00:00Z";

      const query = `
        query {
          viewer {
            repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
              nodes {
                name
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 100, since: "${sinceDate}") {
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
        }`;

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        console.log("GraphQL API Response:", JSON.stringify(result, null, 2));

        if (!result.data?.viewer?.repositories?.nodes) {
          console.error("No repository data found.");
          return;
        }

        const repos = result.data.viewer.repositories.nodes;

        const sortedRepos = repos
          .map((repo) => {
            const commits =
              repo.defaultBranchRef?.target?.history?.edges?.map(
                (commit) => new Date(commit.node.committedDate)
              ) || [];

            const totalCommits = commits.length;
            const weeklyCommits = commits.filter(
              (date) => date >= new Date(sinceWeek)
            ).length;
            const prevWeekCommits = totalCommits - weeklyCommits;

            const weeklyChange =
              prevWeekCommits > 0
                ? ((weeklyCommits - prevWeekCommits) / prevWeekCommits) * 100
                : weeklyCommits > 0
                ? 100
                : 0;

            return {
              name: repo.name,
              totalCommits,
              weeklyChange: weeklyChange.toFixed(1),
            };
          })
          .sort((a, b) => b.totalCommits - a.totalCommits)
          .slice(0, 4);

        setTopRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    }

    fetchRepos();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full bg-black text-gray-300 font-capsule">
        <NavBar />
        <div className="w-full mx-auto flex">
          <div className="w-full p-4">
            <Dashboard />

            <div className="w-full p-4">
              <Trending />
            </div>
            <div className="block lg:hidden w-full p-4">
              <StockTable />
            </div>
            <div className="w-full p-4">
              <div className="rounded-sm mt-10">
                <h1 className="text-xl font-bold mb-2">Recent Movers</h1>
                <hr className="mb-6 border-gray-600" />
                <div className="flex flex-wrap gap-12">
                  {topRepos.map((repo, index) => (
                    <TopMoversCard
                      key={index}
                      repoName={repo.name}
                      totalCommits={repo.totalCommits}
                    />
                  ))}
                </div>

                <hr className="mt-6 border-gray-600" />
              </div>
            </div>
            <div className="w-full p-4">
              <AboutMe />
            </div>
          </div>
          <div className="hidden lg:block w-1/2 p-4">
            <div className="flex flex-col mt-20">
              <div className="fixed top-20 h-[700px] mb-20">
                <StockTable />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
