import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import StockTable from "./components/ProjectTable";
import Trending from "./components/Trending";
import AboutMe from "./components/AboutMe";
import Footer from "./components/Footer";
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
              <AboutMe />
            </div>
          </div>

          <div className="w-1/2 p-4">
            <div className="flex flex-col mt-20">
              <div className="fixed top-20 h-[500px] mb-20 overflow-y-auto">
                <StockTable />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
