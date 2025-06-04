import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProcessNav from "../ProcessNav/ProcessNav";
import Header from "../Header/Header";

export const ServiceManagement = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleSelectAll = (e) => {
    setIsAllChecked(e.target.checked);
  };


  return (
    <div className="text-gray-800 bg-white">
      <Header />
      <div className="pt-16 mx-auto progress-management max-w-7xl">
        <ProcessNav />
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            <Link to="/CreateService">+ New Service</Link>
          </button>
        </div>
        <div className="flex items-center mt-4 space-x-6 lg:gap-40">
          <div className="flex gap-4 lg:gap-8">
            <div className="font-semibold text-blue-600 border-b-2 border-blue-600 cursor-pointer">
              All
            </div>
            <div className="text-gray-400 cursor-pointer">Available</div>
            <div className="text-gray-400 cursor-pointer">Unavailable</div>
          </div>
          <button className="flex items-center gap-2 ml-auto text-red-600">
            <i className="fa-solid fa-trash"></i>
            Delete choose
          </button>
        </div>
        <div className="relative mt-4 overflow-x-visible">
          <table className="min-w-full mt-3 text-left border rounded-lg">
            <thead className="bg-gray-100">
              <tr className="font-bold text-left text-gray-600">
                <th className="p-3"></th>
                <th className="p-3">
                  <input className="w-4 h-4"
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                {/* <th className="p-3">Service Id</th> */}
                <th className="p-3">Service name</th>
                <th className="hidden p-3 md:table-cell">Price</th>
                <th className="hidden p-3 md:table-cell">Status</th>
                <th className="hidden p-3 md:table-cell">Category name</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="relative border-t">
                <td className="p-3"></td>
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4"
                    checked={isAllChecked}
                    onChange={() => setIsAllChecked(!isAllChecked)} />
                </td>
                {/* <td className="p-3 text-blue-500 cursor-pointer hover:underline">
                  SV12045
                </td> */}
                <td className="p-3">Support Coursera FPT</td>
                <td className="hidden p-3 md:table-cell">200.000<span>VND</span></td>
                <td className="hidden p-3 md:table-cell">
                  <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
                    Available
                  </span>
                </td>
                <td className="hidden p-3 md:table-cell">
                  Support study online and self help
                </td>
                <td className="p-3 space-x-3">
                  <button className="text-sm text-red-500"><i className="fa-solid fa-trash"></i> Delete</button>
                  <button className="text-sm text-blue-600"><i className="fa-solid fa-pen"></i> Edit</button>
                </td>
              </tr>
              <tr className="relative border-t">
                <td className="p-3"></td>
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4"
                    checked={isAllChecked}
                    onChange={() => setIsAllChecked(!isAllChecked)} />
                </td>
                {/* <td className="p-3 text-blue-500 cursor-pointer hover:underline">
                  SV12045
                </td> */}
                <td className="p-3">Support Coursera FPT</td>
                <td className="hidden p-3 md:table-cell">200.000<span>VND</span></td>
                <td className="hidden p-3 md:table-cell">
                  <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
                    Available
                  </span>
                </td>
                <td className="hidden p-3 md:table-cell">
                  Support study online and self help
                </td>
                <td className="p-3 space-x-3">
                  <button className="text-sm text-red-500"><i className="fa-solid fa-trash"></i> Delete</button>
                  <button className="text-sm text-blue-600"><i className="fa-solid fa-pen"></i> Edit</button>
                </td>
                {/* Hot?????? */}
                <td className="absolute flex items-center gap-1 px-3 py-2 font-bold text-red-600 bg-red-200 rounded-r-full top-1 -left-3">
                  <span>Hot</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ServiceManagement;