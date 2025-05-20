import React from 'react'

export default function GroupSidebarU() {
  const groups = [
    { name: "React tutorials" },
    { name: "React tutorials" },
    { name: "React tutorials" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Your Groups</h2>
      <ul className="space-y-2">
        {groups.map((group, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="w-8 h-8 rounded-full" alt="group" />
              <span>{group.name}</span>
            </div>
            <button className="text-blue-500 text-sm hover:underline">Leave</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
