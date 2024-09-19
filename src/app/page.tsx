"use client";
import ImageCropper from "@/components/imageCropper";
import React, { useState } from "react";

const App: React.FC = () => {
  const [images, setImages] = useState([
    "/images/img-1.jpg",
    "/images/img-2.jpg",
    "/images/img-3.jpg",
    "/images/img-4.jpg",
  ]);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState("");

  const saveCropedChanges = (cropData: string) => {
    let index = images.indexOf(editingImage);
    images[index] = cropData;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = cropData;
      console.log(newImages);
      
      return newImages;
    });

    // setEditingImage(cropData);
  };

  const broadcastChannel = new BroadcastChannel("image_channel");

  const handleSelect = (image: string, isSelected: boolean) => {
    let updatedImages;
    if (isSelected) {
      updatedImages = [...selectedImages, image];
    } else {
      updatedImages = selectedImages.filter((img) => img !== image);
    }
    setSelectedImages(updatedImages);

    // Broadcast the selected images
    if (typeof window !== "undefined") {
      broadcastChannel.postMessage(updatedImages);
      console.log("Broadcasting selected images:", updatedImages);
    }
  };

  return (
    <div className="container w-full  ">
      <div className=" flex justify-center  ">
        <div className="space-y-10">
          <h1 className="text-2xl font-medium">First Window - Select Images</h1>
          <div className="w-full  grid grid-cols-2 gap-5">
            {images.map((image, index) => (
              <div key={index}>
                <img
                  onClick={() => setEditingImage(image)}
                  src={image}
                  alt={`img-${index}`}
                  className="w-96 h-96"
                />
                <input
                  className=" w-5 h-8"
                  type="checkbox"
                  onChange={(e) => handleSelect(image, e.target.checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <ImageCropper
          editingImage={editingImage}
          saveCropedChanges={saveCropedChanges}
        />
      </section>
    </div>
  );
};

export default App;
