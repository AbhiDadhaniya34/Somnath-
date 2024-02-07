import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchResult, setSearchResult] = useState();
  const [billName, setBillName] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("billname", billName);

    try {
      const response = await axios.post(
        "http://192.168.40.179:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data.imageName);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.40.179:5000/search?name=${selectedImage}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error searching image:", error);
    }
  };

  const handleDownload = async (imageName) => {
    try {
      const response = await axios.get(
        `http://192.168.40.179:5000/download?name=${imageName}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${imageName}.jpg`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Somnath Hardware</h1>
      </header>

      <section className="mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Search</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border rounded-l-md"
            onChange={(e) => setSelectedImage(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        {searchResult && (
          <div className="mt-2 p-4 bg-white rounded shadow-md">
            {searchResult.imageNames && searchResult.imageNames.length > 0 ? (
              searchResult.imageNames.map((imageName, index) => (
                <div className="flex gap-5 mt-5">
                  {/* <p key={index}>Found image: {imageName}</p> */}
                  <img
                    src={`http://192.168.40.179:5000/download?name=${imageName}`}
                    alt={imageName}
                    className="h-36 w-36 p-0 "
                  />
                  <button
                    onClick={() => handleDownload(imageName)}
                    className="bg-green-500 text-white h-10 w-24 my-auto p-2 rounded-md hover:bg-green-700"
                  >
                    Download
                  </button>
                </div>
              ))
            ) : (
              <div className="flex gap-5">
                {/* <p>Found image: {searchResult.imageName}</p> */}
                <img
                  src={`http://192.168.40.179:5000/download?name=${searchResult.imageName}`}
                  alt={searchResult.imageName}
                  className="h-36 w-36 p-0 "
                />
                <button
                  onClick={() => handleDownload(searchResult.imageName)}
                  className="bg-green-500 text-white my-auto p-2 rounded-md h-10 w-24 hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Form</h2>
        <form className="flex flex-col items-center">
          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="mt-1 p-2 border rounded-md"
              onChange={handleImageChange}
            />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Bill Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border rounded-md"
              onChange={(e) => setBillName(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleImageUpload}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </section>

      {/* Search Section */}

      {/* Download Button */}
    </div>
    // <div className="bg-gray-400 h-screen">
    //   <div className="text-3xl font-bold text-center">Somnath Hardware</div>
    //   <div className="bg-white w-60 mx-auto mt-5 p-2">
    //     <input type="file" accept="image/*" className="mt-1" onChange={handleImageChange} />
    //     <label>Name</label>
    //     <input/>
    //     <button onClick={handleImageUpload} className="mx-auto flex mt-3 p-2 bg-green-500 rounded-md">Upload Image</button>
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Enter image name"
    //       value={selectedImage}
    //       onChange={(e) => setSelectedImage(e.target.value)}
    //     />
    //     <button onClick={handleSearch}>Search Image</button>
    //   </div>
    // </div>
  );
}

export default App;
