"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);
  const hoverBoxRef = useRef<HTMLDivElement>(null);
  const zoomedImageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current || !hoverBoxRef.current || !zoomedImageRef.current) return;

    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const hoverBoxSize = 190; // Increased size to 150px for the hover box
    const clampedX = Math.max(hoverBoxSize / 2, Math.min(x, width - hoverBoxSize / 2));
    const clampedY = Math.max(hoverBoxSize / 2, Math.min(y, height - hoverBoxSize / 2));

    setHoverPosition({ x: clampedX, y: clampedY });

    hoverBoxRef.current.style.left = `${clampedX - hoverBoxSize / 2}px`;
    hoverBoxRef.current.style.top = `${clampedY - hoverBoxSize / 2}px`;

    const xPercent = ((clampedX - hoverBoxSize / 2) / (width - hoverBoxSize)) * 100;
    const yPercent = ((clampedY - hoverBoxSize / 2) / (height - hoverBoxSize)) * 100;

    zoomedImageRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 relative">
      <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible md:items-start items-center order-2 md:order-1">
        {array.map((item) => (
          <img
            key={item.ID}
            src={item.image}
            alt={item.cardName}
            className={`w-16 h-16 rounded-md object-cover cursor-pointer border-2 transition-all hover:border-yellow-500 ${
              selectedImage === item.image ? "border-yellow-500" : "border-gray-300"
            }`}
            onMouseEnter={() => setSelectedImage(item.image)}
            onClick={() => setSelectedImage(item.image)}
          />
        ))}
      </div>

      <div className="flex-1 order-1 md:order-2 flex flex-col relative">
        <div
          ref={zoomRef}
          className={`relative group w-full ${isMobile ? 'md:w-96' : 'md:w-[500px]'} h-[500px] overflow-hidden cursor-pointer`}
          onMouseEnter={!isMobile ? () => setIsZoomed(true) : undefined}
          onMouseLeave={!isMobile ? () => setIsZoomed(false) : undefined}
          onMouseMove={!isMobile ? handleMouseMove : undefined}
          onClick={handleImageClick}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className={`w-full h-full bg-white ${isMobile ? 'object-cover' : 'object-contain'} ${isMobile ? '' : 'border'}`}
          />
          {isZoomed && !isMobile && (
            <div
              ref={hoverBoxRef}
              className="absolute w-48 h-48 border border-gray-600 bg-gray-600 opacity-50 pointer-events-none"
              style={{
                background: "radial-gradient(circle, #0053a0 2px, transparent 2px)",
                backgroundSize: "5px 5px",
              }}
            />
          )}
        </div>
        {!isMobile && (
          <div className="flex justify-center mt-2 md:w-[500px]">
            <p className="text-gray-600 text-sm">
              {isZoomed ? "Click to open expanded view" : "Roll over image to zoom in"}
            </p>
          </div>
        )}
      </div>

      {isZoomed && !isMobile && (
        <div
          ref={zoomedImageRef}
          className="absolute right-10 top-6 w-[700px] h-[500px] border-2 rounded border-gray-600 bg-white shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: "200%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
          onClick={closeModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Modal Image" className="max-w-full h-96 max-h-full object-contain shadow-lg rounded-lg" />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white px-3 py-0 heading5 rounded-full text-black font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;