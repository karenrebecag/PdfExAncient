import React from "react";
import "../styles/insertedImage.scss";

interface InsertedImageProps {
  src: string;
  alt: string;
}

const InsertedImage: React.FC<InsertedImageProps> = ({ src, alt }) => {
  return <img className="inserted-image" src={src} alt={alt} />;
};

export default InsertedImage;