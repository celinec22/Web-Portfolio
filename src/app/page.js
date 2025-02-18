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
        }`;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      const repos = result.data.viewer.repositories.nodes;

      // Filter and sort repositories based on latest commit
      const sortedRepos = repos
        .map((repo) => ({
          name: repo.name,
          lastCommit:
            repo.defaultBranchRef?.target?.history?.edges[0]?.node
              ?.committedDate || "1970-01-01T00:00:00Z",
        }))
        .sort((a, b) => new Date(b.lastCommit) - new Date(a.lastCommit)) // Sort by most recent commit
        .slice(0, 4); // Get top 4 repositories

      setTopRepos(sortedRepos);
    }

    fetchRepos();
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-hidden bg-black text-gray-300 font-capsule">
        <NavBar />
        <div className="w-full mx-auto flex">
          <div className="w-[2100px] p-4">
            <Dashboard />
            <div className="w-1/4 p-4">
              <Trending />
            </div>
            <div className="w-1/4 p-4">
              <div className="overflow-hidden w-[1000px] h-[400px] rounded-sm mt-10">
                <h1 className="text-xl font-bold mb-2">Top Movers</h1>
                <hr className="mb-6 border-gray-600" />
                <div className="flex flex-wrap gap-12">
                  {topRepos.map((repo, index) => (
                    <TopMoversCard key={index} repoName={repo.name} />
                  ))}
                </div>
                <hr className="mt-6 border-gray-600" />
              </div>
            </div>
            <div className="w-1/4 p-4">
              <AboutMe />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="flex flex-col mt-20">
              <div className="fixed top-20 h-[700px] mb-20">
                <StockTable />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
