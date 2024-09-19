import React, { useState, useEffect, useRef, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  editingImage: string;
  saveCropedChanges: (cropData: string) => void;
};
function ImageCropper(props: Props) {
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  const image = props.editingImage;
  const saveChanges = props.saveCropedChanges;
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      saveChanges(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  useEffect(() => {
    setCropData('#')
  }, [image]);

  return (
    <div className="w-full py-5">
      {" "}
      <div className="w-full">
        <br />
        <br />
        {image && (
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        )}
      </div>
      <div>
        <button
          className=" bg-zinc-600  h-10 px-5 text-white border rounded-md "
          onClick={getCropData}
        >
          Save Changes
        </button>
        <div className="w-full flex justify-center space-y-10 ">
   
          <div className="w-72 h-72">
            {cropData && (
              <img className="w-full" src={cropData} alt="cropped" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
