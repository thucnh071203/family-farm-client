import React from "react";

export default function MainGroupContent() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="relative h-48">
        <img
          src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Group Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute -bottom-12 left-6">
          <img
            src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Group Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          />
        </div>
      </div>

      <div className="pt-16 px-6 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Support Coursera FPT K17</h1>
          <p className="text-sm text-gray-500">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-black">Created:</span> April
              13 2020 &nbsp; &nbsp;{" "}
              <span className="font-semibold text-black">Members:</span> 200K
              &nbsp; &nbsp;{" "}
              <span className="font-semibold text-black"> Posts:</span> 998
            </p>
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Click to join
        </button>
      </div>

      {/* Tabs */}
      <div className="border-t border-b px-6 py-2 mb-4">
        <ul className="flex gap-6 text-sm text-gray-600">
          <li className="border-b-2 border-blue-500 pb-2 font-medium">
            Member
          </li>
          <li>Home</li>
          <li>Add to Join</li>
          <li>Permissions</li>
        </ul>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <input
          type="text"
          placeholder="Search member..."
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Members */}
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 mb-2 font-semibold">Admin</p>
        <div className="bg-gray-50 p-3 rounded flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="w-10 h-10 rounded-full"
              alt="Admin"
            />
            <div>
              <p className="font-medium">Phuong Nam</p>
              <p className="text-xs text-gray-500">
                Joined: May 20, 2025 · Can Tho
              </p>
            </div>
          </div>
          <button className="text-xl text-gray-500">⋯</button>
        </div>

        <p className="text-sm text-gray-600 mb-2 font-semibold">
          Ordinary member
        </p>
        {[1, 2].map((id) => (
          <div
            key={id}
            className="bg-gray-50 p-3 rounded flex justify-between items-center mb-3"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                className="w-10 h-10 rounded-full"
                alt="Member"
              />
              <div>
                <p className="font-medium">Phuong Nam</p>
                <p className="text-xs text-gray-500">
                  Joined: May 20, 2025 · Can Tho
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {id === 1 && (
                <button className="bg-red-100 text-red-500 px-3 py-1 text-sm rounded">
                  Add friend
                </button>
              )}
              <button className="text-xl text-gray-500">⋯</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
