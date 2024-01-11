import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const ImageUpload = (props) => {
  const { setImages, existData } = props;
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);

    // Do something with the selected image files
    // For example, you can display a preview of each image:
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setSelectedImages(imagesArray);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (existData) {
      setSelectedImages(existData);
    }
  }, [existData]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {selectedImages.length > 0 && (
        <div className="my-4 h-[120px] w-full flex gap-2">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              className="object-contain h-full w-full"
              srcSet={image}
              src={image}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  setImages: PropTypes.func.isRequired,
  existData: PropTypes.array,
};
ImageUpload.defaultProps = {
  setImages: () => "error",
};

export default ImageUpload;
