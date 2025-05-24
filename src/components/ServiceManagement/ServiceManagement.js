import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProgressNav from "../ProgressNav/ProgressNav";
import Header from "../Header/Header";

export const ServiceManagement = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleSelectAll = (e) => {
    setIsAllChecked(e.target.checked);
  };


  return (
    <div className="bg-white text-gray-800">
      <Header />
      <div className="progress-management max-w-7xl mx-auto pt-16">
        <ProgressNav />
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Link to="/CreateService">+ New Service</Link>
          </button>
        </div>
        <div className="flex items-center space-x-6 mt-4 lg:gap-40">
          <div className="flex lg:gap-8 gap-4">
            <div className="text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer">
              All
            </div>
            <div className="text-gray-400 cursor-pointer">Available</div>
            <div className="text-gray-400 cursor-pointer">Unavailable</div>
          </div>
          <button className="flex items-center text-red-600 ml-auto gap-2">
            <i className="fa-solid fa-trash"></i>
            Delete choose
          </button>
        </div>
        <div className="overflow-x-visible mt-4 relative">
          <table className="min-w-full border rounded-lg text-left mt-3">
            <thead className="bg-gray-100">
              <tr className="text-left font-bold text-gray-600">
                <th className="p-3"></th>
                <th className="p-3">
                  <input className="h-4 w-4"
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                {/* <th className="p-3">Service Id</th> */}
                <th className="p-3">Service name</th>
                <th className="p-3 hidden md:table-cell">Price</th>
                <th className="p-3 hidden md:table-cell">Status</th>
                <th className="p-3 hidden md:table-cell">Category name</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t relative">
                <td className="p-3"></td>
                <td className="p-3">
                  <input type="checkbox" className="h-4 w-4"
                    checked={isAllChecked}
                    onChange={() => setIsAllChecked(!isAllChecked)}/>
                </td>
                {/* <td className="p-3 text-blue-500 hover:underline cursor-pointer">
                  SV12045
                </td> */}
                <td className="p-3">Support Coursera FPT</td>
                <td className="p-3 hidden md:table-cell">200.000<span>VND</span></td>
                <td className="p-3 hidden md:table-cell">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    Available
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell">
                  Support study online and self help
                </td>
                <td className="p-3 space-x-3">
                  <button className="text-red-500 text-sm"><i className="fa-solid fa-trash"></i> Delete</button>
                  <button className="text-blue-600 text-sm"><i className="fa-solid fa-pen"></i> Edit</button>
                </td>
              </tr>
              <tr className="border-t relative">
                <td className="p-3"></td>
                <td className="p-3">
                  <input type="checkbox" className="h-4 w-4"
                    checked={isAllChecked}
                    onChange={() => setIsAllChecked(!isAllChecked)}/>
                </td>
                {/* <td className="p-3 text-blue-500 hover:underline cursor-pointer">
                  SV12045
                </td> */}
                <td className="p-3">Support Coursera FPT</td>
                <td className="p-3 hidden md:table-cell">200.000<span>VND</span></td>
                <td className="p-3 hidden md:table-cell">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    Available
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell">
                  Support study online and self help
                </td>
                <td className="p-3 space-x-3">
                  <button className="text-red-500 text-sm"><i className="fa-solid fa-trash"></i> Delete</button>
                  <button className="text-blue-600 text-sm"><i className="fa-solid fa-pen"></i> Edit</button>
                </td>
                {/* Hot?????? */}
                <div className="absolute top-1 -left-3 bg-red-200 text-red-600 px-3 py-2 flex items-center gap-1 font-bold rounded-r-full">
                  <span>Hot</span>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ServiceManagement;