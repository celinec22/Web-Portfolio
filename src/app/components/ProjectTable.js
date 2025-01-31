import React from "react";

const TableComponent = () => {
  return (
    <div className="overflow-hidden w-[300px] rounded-sm border border-gray-600">
      <div className="flex item">
        <table className="min-w-full bg-black text-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm">Projects</th>
            </tr>
          </thead>

          <tbody>
            {["NarcanVM", "NutriScan", "ReplenX", "Yahtzee", "MyPass"].map(
              (project, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="px-4 py-2">{project}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
