import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProcessResultInput = () => {
    const [images, setImages] = useState([]);
    const [content, setContent] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageRemove = (indexToRemove) => {
        setImages((prevImages) => {
            const imageToRemove = prevImages[indexToRemove];
            URL.revokeObjectURL(imageToRemove.url);
            return prevImages.filter((_, index) => index !== indexToRemove);
        });
    };

    const handleSubmit = () => {
        const resultData = {
            StepResultId: `result${Date.now()}`, // ID tạm thời
            StepId: "step1", // Giả định stepId, thay bằng prop hoặc context thực tế
            StepResultImage: images.length > 0 ? JSON.stringify(images.map((img) => img.url)) : null,
            StepResultComment: content || null,
            CreatedAt: new Date().toISOString(),
        };
        console.log("ProcessStepResults:", resultData);
    };

    return (
        <div>
            <Link to="" className="flex justify-end mb-2 text-blue-500 hover:underline">
                VIEW LIST RESULT
            </Link>
            <form className="p-5 mt-5 bg-white border border-gray-200 border-solid rounded-lg shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-800">YOUR RESULT:</h2>
                <div className="flex flex-col gap-4">
                    <div className="rich-text-editor">
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            className="h-32 mb-10 bg-white"
                            placeholder="Write your result..."
                        />
                        {/* để test nó sẽ hiển thị ra cái gì (bộc nó trong className="rich-text-editor")*/}
                        <div className="p-4 mt-2 bg-white rounded shadow">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.url}
                                    alt={`Result ${index + 1}`}
                                    className="object-cover w-full h-40 rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(index)}
                                    className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700"
                                    title="Remove image"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <span className="inline-block px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                                Add Image
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="py-3 px-10 bg-[#3DB3FB]/25 text-[#3DB3FB]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProcessResultInput;