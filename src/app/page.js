import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import StockTable from "./components/ProjectTable";
import Trending from "./components/Trending";
import AboutMe from "./components/AboutMe";
import Footer from "./components/Footer";
import TopMoversCard from "./components/TopMoversCard";
export default function Home() {
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
                <h1 className="text-xl font-bold mb-2"> Top Movers</h1>
                <hr className="mb-6 border-gray-600" />
                <div className="flex flex-wrap gap-12">
                  <TopMoversCard />
                  <TopMoversCard />
                  <TopMoversCard />
                  <TopMoversCard />
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
