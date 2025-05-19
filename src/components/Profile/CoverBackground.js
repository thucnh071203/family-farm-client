import React, { useState, useRef } from "react";

const CoverBackground = ({ coverImage: initialCoverImage }) => {
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [showCoverPopup, setShowCoverPopup] = useState(false);
  const [coverZoom, setCoverZoom] = useState(1);
  const coverInputRef = useRef(null);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setShowCoverPopup(false);
    }
  };

  const handleZoomChange = (value) => {
    const newZoom = Math.max(1, Math.min(3, Number(value)));
    setCoverZoom(newZoom);
  };

  return (
    <div className="relative h-72 bg-gray-200 group">
      <img src={
        coverImage ||
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"
      }
        alt="Background"
        className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-90 cursor-pointer"
        onClick={() => setShowCoverPopup(true)} />
      <button onClick={() => coverInputRef.current.click()}
        className="absolute top-4 left-4 flex items-center bg-black/40 text-white px-3 py-1 rounded border border-white transition-all duration-300 ease-in-out opacity-90 group-hover:opacity-100">
        <i className="fa-solid fa-camera text-[24px] h-6 text-white"></i>
        <span className="ml-2 hidden group-hover:inline transition transition-opacity duration-300">
          Change background
        </span>
      </button>
      <input type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={handleCoverImageChange}
        className="hidden" />

      {showCoverPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10"
          onClick={() => setShowCoverPopup(false)} >
          <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-auto max-w-full max-h-[70vh]">
              <img src={coverImage || "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg"
              }
                alt="Background"
                className="max-w-full max-h-full object-contain"
                style={{ transform: `scale(${coverZoom})` }} />
            </div>
            <div className="mt-4 w-48">
              <label className="block mb-2">Zoom:</label>
              <input type="range"
                min="1"
                max="3"
                step="0.1"
                value={coverZoom}
                onChange={(e) => handleZoomChange("cover", e.target.value)}
                className="w-full" />
            </div>
            <button onClick={() => coverInputRef.current.click()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md" >
              Change Background
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverBackground;