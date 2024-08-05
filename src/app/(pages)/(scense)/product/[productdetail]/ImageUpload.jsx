// components/ImageUpload.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const isSaved = useSelector((state) => state.product.isSaved);
  var productMaster = useSelector((state) => state.product.master);
  const [error, setError] = useState('');
  useEffect(() => {
    if (productMaster == null) {
      setSelectedImages([]);
    } else {
      setSelectedImages(productMaster.product_img);
    }
  }, [productMaster]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const pngFiles = files.filter((file) => file.type === 'image/png');
    const nonPngFiles = files.filter((file) => file.type !== 'image/png');
    const imageArray = [];

    if (nonPngFiles.length > 0) {
      setError('Please upload only PNG files.');
      return;
    }

    setError('');

    pngFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push({ img_src: reader.result });

        if (imageArray.length === pngFiles.length) {
          setSelectedImages([...imageArray]);
          if (onImageUpload) {
            onImageUpload(pngFiles);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="image-upload">
      <input
        type="file"
        // disabled={isSaved}
        multiple
        accept="image/png"
        onChange={handleImageChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="image-preview mt-4 flex justify-center space-x-2">
        {selectedImages &&
          selectedImages?.map((selectedImage, index) => (
            <img
              src={selectedImage.img_src}
              // src ='/images/products/1720636671335.png'
              alt="Selected"
              className="w-[215px] h-[300px] object-cover"
            />
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;
