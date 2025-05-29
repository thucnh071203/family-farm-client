import React from "react";
import { Link } from "react-router-dom";

export default function ServicesList({ onClose }) {
  // useEffect(() => {
  //   const handleClose = () => onToggle();
  //   window.addEventListener("closeFilter", handleClose);
  //   return () => window.removeEventListener("closeFilter", handleClose);
  // }, [onToggle]);

  return (
    // <div className="relative">
    //   <div className="icon-filter"
    //         onClick={onToggle}
    //         role="button"
    //         aria-label="Toggle filter"
    //         aria-expanded={isVisible}>
    //     <img src={filterIcon} alt="image" />
    //   </div>
    // </div>

    <div className="flex justify-center items-center h-auto">
      <div className="bg-white w-[450px] p-8 rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-800 flex items-center gap-2">
            <i className="fas fa-sliders-h text-sky-400"></i> Filter Service
          </h2>
          <div className="text-2xl text-gray-800 cursor-pointer" onClick={onClose}>&times;</div>
        </div>

        {/* Body */}
        <div className="ml-6">
          <div className="mb-4">
            <h4 className="text-sm text-gray-500 mb-2">Search name service</h4>
            <div className="flex items-center bg-red-100 rounded-lg px-4 py-2">
              <i className="fas fa-search text-gray-600 mr-2"></i>
              <input
                type="text"
                placeholder="Text here..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-5 mb-6 text-sm">
            {/* Publish Date */}
            <div>
              <h4 className="text-gray-500 mb-2">Publish date</h4>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                Today
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                This week
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                This month
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                This year
              </Link>
            </div>

            {/* Star & Price */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-gray-500 whitespace-nowrap">Star rating</h4>
                <select className="text-sm border-none bg-transparent focus:outline-none">
                  <option>5</option>
                  <option>4+</option>
                  <option>3+</option>
                  <option>2+</option>
                </select>
              </div>
              <h4 className="text-gray-500 mb-2">Service price</h4>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                Lower 200.000
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                200.000 to 500.000
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                500.000 to 1.000.000
              </Link>
              <Link to="/1" className="text-sky-400 block mb-1 ml-1">
                Greater 1.000.000
              </Link>
            </div>
          </div>

          {/* Position Filters */}
          <div className="mb-6">
            <h4 className="text-sm text-gray-500 mb-2">Position</h4>
            <div className="mb-4">
              <label className="text-sky-400 text-sm mr-2">Country:</label>
              <select className="text-sm border-none bg-transparent focus:outline-none">
                <option>Select</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </select>
            </div>
            <div>
              <label className="text-sky-400 text-sm mr-2">City:</label>
              <select className="text-sm border-none bg-transparent focus:outline-none">
                <option>Select</option>
                <option>Hà Nội</option>
                <option>HCM</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-sky-400 text-white font-bold text-sm py-3 px-6 rounded-lg block ml-auto">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
