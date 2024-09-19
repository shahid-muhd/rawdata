"use client";
import React, { useEffect, useState } from "react";

const ImageDisplay: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const broadcastChannel = new BroadcastChannel("image_channel");

      // Listen for messages from the broadcast channel
      broadcastChannel.onmessage = (event) => {
        console.log("on msg", event.data);
        setImages(event.data); // Update images from the broadcast message
      };

      return () => {
        broadcastChannel.close(); // Clean up when component unmounts
      };
    }
  }, []);

  return (
    <div className="container  0 w-full min-h-screen flex items-center justify-center p-36 ">
      {images.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-5 ">
          {images.length > 0 &&
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`img-${index}`}
                className="w-96 h-96"
              />
            ))}
        </div>
      ) : (
        <div>
          <p>No Images Selected</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
