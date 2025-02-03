"use client";

import { useState } from "react";

interface CardItem {
  cardName: string;
  cardSubTitle: string;
  ID: number;
  image: string;
}

interface CarouselProps {
  array: CardItem[];
}

const ProductDetail: React.FC<CarouselProps> = ({ array }) => {
  const [selectedImage, setSelectedImage] = useState(array[0].image);
  const [hoveredIndex, setHoveredIndex] = useState(array[0].cardName);

  return (
    <div className="flex md:flex-row flex-col gap-4 p-6">
      {/* Left Side - Small Images */}
      <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible md:items-start items-center order-2 md:order-1">
        {array.map((item, index) => (
          <img
            key={item.ID}
            src={item.image}
            alt={item.cardName}
            className={`w-14 h-14 rounded-md object-cover cursor-pointer border-2 ${
              selectedImage === item.image ? "border-blue-600" : "border-transparent"
            }`}
            onMouseEnter={() => {
              setSelectedImage(item.image);
              setHoveredIndex(item.cardName);
            }}
          />
        ))}
      </div>

      {/* Large Image */}
      <div className="flex-1 order-1 md:order-2">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full md:w-96 h-96 rounded-md object-cover border"
        />
        <p className="mt-2 text-start text-sm text-gray-600">
          Hovered Card: {hoveredIndex}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;