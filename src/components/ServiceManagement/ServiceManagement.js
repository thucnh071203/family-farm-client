import React from "react";

export const ServiceManagement = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex space-x-8 pb-4 overflow-x-auto">
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
              />
            </svg>

            <span>Overview</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-500 font-semibold cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>

            <span>Service Management</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-6h13M9 12l-3 3m0 0l-3-3m3 3V4"
              ></path>
            </svg>
            <span>Progress Management</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + New Service
          </button>
        </div>
        <div className="flex items-center space-x-6 mt-4">
          <div className="text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer">
            All services
          </div>
          <div className="text-gray-400 cursor-pointer">Available</div>
          <div className="text-gray-400 cursor-pointer">Unavailable</div>
          <button className="flex items-center text-red-600 ml-auto">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-.894.553L4.382 4H2a1 1 0 000 2h1l1.5 9A2 2 0 006.48 17h7.04a2 2 0 001.98-2L17 6h1a1 1 0 100-2h-2.382l-.724-1.447A1 1 0 0014 2H6z"></path>
            </svg>
            Delete choose
          </button>
        </div>
        <div classNameName="overflow-x-auto mt-4">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-3">
                  <input type="checkbox" />
                </th>
                <th className="p-3">Service Id</th>
                <th className="p-3">Service name</th>
                <th className="p-3 hidden md:table-cell">Price</th>
                <th className="p-3 hidden md:table-cell">Status</th>
                <th className="p-3 hidden md:table-cell">Category name</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 text-blue-500 hover:underline cursor-pointer">
                  SV12045
                </td>
                <td className="p-3">Support Coursera FPT</td>
                <td className="p-3 hidden md:table-cell">200.000Đ</td>
                <td className="p-3 hidden md:table-cell">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Available
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell">
                  Support study online and self help
                </td>
                <td className="p-3 space-x-3">
                  <button className="text-red-600 text-sm">🗑 Delete</button>
                  <button className="text-blue-600 text-sm">✏️ Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="absolute top-48 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-r-full">
          Hot
        </div>
      </div>
    </div>
  );
};
