import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import StockTable from "./components/ProjectTable";

export default function Home() {
  return (
    <div className="min-h-screen overf bg-black text-gray-300 font-capsule">
      <NavBar />
      <div className="w-full mx-auto flex">
        <div className="w-[1500px] p-4">
          <Dashboard />
        </div>

        <div className="w-1/2 p-4">
          <div className="flex flex-col mt-20 items-center">
            {" "}
            <StockTable />
          </div>
        </div>
      </div>
    </div>
  );
}
