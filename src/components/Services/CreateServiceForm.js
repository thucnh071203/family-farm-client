import React, { useState } from "react";

const CreateServiceForm = () => {
    const [serviceName, setServiceName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [publish, setPublish] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ serviceName, category, price, description, image, publish });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg text-left border border-solid border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-[#3DB3FB]">Create New Service</h2>
            <hr />
            <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Service name</label>
                    <input type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Name or Title"
                        className="w-full p-3 border rounded-lg"/>
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-2 font-medium text-gray-700">Category</label>
                        <select value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border rounded-lg">
                            <option value="">Service Category</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-2 font-medium text-gray-700">Price</label>
                        <div className="flex items-center gap-4">
                            <input type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full p-3 border rounded-lg"/>
                        <span className="transform font-bold text-red-500">VND</span>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Description</label>
                    <textarea value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description..."
                        className="w-full p-3 border rounded-lg h-24"/>
                </div>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Image</label>
                    <input type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"/>
                    {preview ? (
                        <div className="relative w-full h-[250px] border rounded bg-gray-50">
                            <img src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded"/>
                            <button onClick={handleRemoveImage}
                                className="absolute top-1 right-1 rounded-full w-6 h-6 flex items-center justify-center" >
                                <i className="fas fa-window-close"></i>
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="imageUpload"
                            className="w-full h-[250px] p-2 border rounded-lg cursor-pointer text-blue-500 text-sm bg-gray-50 text-center flex items-center justify-center">
                            Click to upload Image Service
                        </label>
                    )}
                </div>
                <div className="flex items-center py-5 gap-4">
                    <input type="checkbox"
                        checked={publish}
                        onChange={(e) => setPublish(e.target.checked)}
                        className="h-4 w-4" />
                    <label className="font-medium text-gray-700">Do you want to publish this service?</label>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl w-1/4 font-bold">
                        CREATE
                    </button>
                    <button type="reset" className="p-2 rounded-xl w-1/4 font-bold border border-solid border-black">
                        RESET
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateServiceForm;