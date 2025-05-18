import React from "react";
import MenuProgessStep from "./MenuProgessStep";

const CreateProgessStep = () => {
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
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-6h13M9 12l-3 3m0 0l-3-3m3 3V4"
              ></path>
            </svg>
            <span>Progress Management</span>
          </div>
        </div>

        {/* <div className="bg-gray-50 font-sans"> */}
        <div className="h-screen flex flex-col">
          <div
            className="flex flex-col lg:flex-row overflow-y-auto flex-1"
            style={{
              minHeight: "600px",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <MenuProgessStep />

            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Create New Process</h1>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">Customer:</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"
                      alt="Customer Avatar"
                      className="w-10 h-10 rounded-full"
                    />

                    <span>Phuong Nam</span>
                  </div>
                  <span className="ml-auto text-blue-600 hover:underline cursor-pointer">
                    Support Coursera online of FPT
                  </span>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <textarea
                    placeholder="Enter a short description for this process"
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                      1
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <textarea
                      placeholder="Enter detailed description for this step"
                      className="w-full mb-2 p-2 border rounded"
                    ></textarea>
                    <div className="flex flex-wrap gap-4">
                      <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                        Drop file here to upload
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                      2
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <textarea
                      placeholder="Enter detailed description for this step"
                      className="w-full mb-2 p-2 border rounded"
                    ></textarea>
                    <div className="flex flex-wrap gap-4">
                      <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                        Drop file here to upload
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                        2
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                      <textarea
                        placeholder="Enter detailed description for this step"
                        className="w-full mb-2 p-2 border rounded"
                      ></textarea>
                      <div className="flex flex-wrap gap-4">
                        <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                          Drop file here to upload
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProgessStep;
