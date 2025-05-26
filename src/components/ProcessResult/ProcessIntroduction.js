import React from "react";
import illustrationImage from "../../assets/images/cold.png"; // Replace with your image path

const ProcessIntroduction = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col gap-5">
        {/* Instructions Section */}
        <div className="p-5 border border-gray-200 border-solid rounded-lg shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-gray-800">INSTRUCTIONS</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Nutrient deficiency: Pale yellow leaves, slow growth</li>
            <li>
              Fungal or bacterial infection: Yellow leaves with black spots or
              burnt edge
            </li>
            <li>Watering too little or too much: Yellow leaves, weak roots</li>
            <li>
              Pests and diseases: Check the underside of leaves for signs of
              attack
            </li>
          </ul>
        </div>
        {/* Illustration Section */}
        <div className="p-5 border border-gray-200 border-solid rounded-lg shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-gray-800">ILLUSTRATION</h2>
          <div className="grid grid-cols-3 gap-4">
            <img
              src={illustrationImage}
              alt=""
              className="object-cover w-full h-40 rounded-lg"
            />
            <img
              src={illustrationImage}
              alt=""
              className="object-cover w-full h-40 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessIntroduction;
