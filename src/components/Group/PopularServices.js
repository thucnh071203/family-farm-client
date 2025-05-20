import React from "react";

export default function PopularServices() {
  const services = [
    {
      title: "Solve problem about agriculture",
      price: "200.000 VND",
      img: "/rice.jpg",
    },
    {
      title: "NodeJS online for beginner",
      price: "500.000 VND",
      img: "/nodejs.jpg",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Popular Services</h2>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={idx} className="border rounded overflow-hidden">
            <img
              src="https://th.bing.com/th/id/OIP.XVG00Ykm3IQf9g7P8K34ZAHaEn?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="w-full h-24 object-cover"
            />
            <div className="p-2">
              <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded">
                ddddd
              </span>
              <p className="mt-1 text-sm font-medium">ddddddddddddddd</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
