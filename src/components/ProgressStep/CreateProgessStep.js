import React from "react";

export const CreateProgessStep = () => {
  return (
    <div class="bg-white text-gray-800">
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex space-x-8 pb-4 overflow-x-auto">
          <div class="flex items-center space-x-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
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
          <div class="flex items-center space-x-2 text-blue-500 font-semibold cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>

            <span>Service Management</span>
          </div>
          <div class="flex items-center space-x-2 cursor-pointer">
            <svg
              class="w-5 h-5"
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

        <div class="bg-gray-50 font-sans">
          <div class="flex flex-col lg:flex-row min-h-screen">
            <aside class="w-full lg:w-1/4 bg-white shadow p-4">
              <h2 class="text-xl font-semibold mb-4">Menu</h2>
              <ul class="space-y-2">
                <li>
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 text-black-700 rounded hover:bg-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    List of available processes
                  </button>
                </li>

                <li>
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 text-black-700 rounded hover:bg-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                      />
                    </svg>
                    List of unpaid orders
                  </button>
                </li>

                <li>
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    List of orders waiting
                  </button>
                </li>
              </ul>
              <div class="mt-6 text-sm text-gray-600">
                <strong class="text-red-600">ATTENTION:</strong> You have{" "}
                <span class="text-orange-500 font-semibold">3 processes</span>{" "}
                needing confirmation of completion
              </div>
            </aside>
            <div class="flex-1 p-6">
              <h1 class="text-2xl font-bold mb-4">Create New Process</h1>

              <div class="mb-6">
                <div class="flex items-center gap-4 mb-2">
                  <span class="font-semibold">Customer:</span>
                  <div class="flex items-center gap-2">
                    <img
                      src="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"
                      alt="Customer Avatar"
                      class="w-10 h-10 rounded-full"
                    />

                    <span>Phuong Nam</span>
                  </div>
                  <span class="ml-auto text-blue-600 hover:underline cursor-pointer">
                    Support Coursera online of FPT
                  </span>
                </div>

                <div class="bg-white p-4 rounded shadow">
                  <textarea
                    placeholder="Enter a short description for this process"
                    class="w-full p-2 border rounded"
                  ></textarea>
                </div>
              </div>

              <div class="space-y-6">
                <div class="space-y-6">
                  <div class="flex items-center mb-2">
                    <div class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                      1
                    </div>
                  </div>
                  <div class="bg-white p-4 rounded shadow">
                    <textarea
                      placeholder="Enter detailed description for this step"
                      class="w-full mb-2 p-2 border rounded"
                    ></textarea>
                    <div class="flex flex-wrap gap-4">
                      <div class="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                        Drop file here to upload
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <div class="flex items-center mb-2">
                    <div class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                      2
                    </div>
                  </div>
                  <div class="bg-white p-4 rounded shadow">
                    <textarea
                      placeholder="Enter detailed description for this step"
                      class="w-full mb-2 p-2 border rounded"
                    ></textarea>
                    <div class="flex flex-wrap gap-4">
                      <div class="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                        Drop file here to upload
                      </div>
                    </div>
                    <button class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
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
  );
};
