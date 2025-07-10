import React from "react";
import { Link } from "react-router-dom";

const PopularService = ({ list }) => {
  const services = [
    {
      title: "Solve problem about agriculture",
      price: "500.000 VND",
      image:
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
    },
    {
      title: "NodeJS online for beginner",
      price: "500.000 VND",
      image:
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-3">Popular Service</h2>
        <Link className="text-blue-800" to="/Service">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-3 ">
        {Array.isArray(list) &&
          list.slice(0, 4).map((service, index) => (
            <div
              key={index}
              className="flex justify-between gap-1 rounded-lg relative border border-solid border-gray-200"
            >
              <div className="absolute bg-lime-600 mt-1 p-1 px-3 rounded-r-full">
                <p className="font-bold text-sm text-white">{service.price}</p>
              </div>
              <div className="flex flex-col w-full border rounded-md">
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  className="rounded-md"
                />
                <p className="p-2 font-bold text-left">{service.serviceName}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularService;
