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

  useEffect(() => {
    // Check if the window width is mobile or not
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the width based on your needs
    };

    // Run check on component mount and on resize
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Clean up on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current || !hoverBoxRef.current || !zoomedImageRef.current) return;

    // Get bounding box of the image container
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    
    // Calculate the relative mouse position inside the image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate percentage of the image size relative to mouse position
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Update hover box position
    hoverBoxRef.current.style.left = `${x - 50}px`; // Adjust to make it larger
    hoverBoxRef.current.style.top = `${y - 50}px`; // Adjust to make it larger

    // Set the background position of the zoomed image based on mouse position
    zoomedImageRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Open popup on click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close popup
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 relative">
      {/* Left Side - Thumbnail Images */}
      <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible md:items-start items-center order-2 md:order-1">
        {array.map((item) => (
          <img
            key={item.ID}
            src={item.image}
            alt={item.cardName}
            className={`w-16 h-16 rounded-md object-cover cursor-pointer border-2 transition-all hover:border-yellow-500 ${
              selectedImage === item.image ? "border-yellow-500" : "border-gray-300"
            }`}
            onMouseEnter={() => {
              setSelectedImage(item.image);
            }}
            onClick={() => setSelectedImage(item.image)}
          />
        ))}
      </div>

      {/* Large Image with Zoom and Preview */}
      <div className="flex-1 order-1 md:order-2 flex flex-col relative">
        {/* For mobile, we skip the zoom and hover effects */}
        <div
          ref={zoomRef}
          className={`relative group w-full ${isMobile ? 'md:w-96' : 'md:w-[500px]'} h-[500px] overflow-hidden cursor-pointer`}
          onMouseEnter={!isMobile ? () => setIsZoomed(true) : undefined}
          onMouseLeave={!isMobile ? () => setIsZoomed(false) : undefined}
          onMouseMove={!isMobile ? handleMouseMove : undefined}
          onClick={handleImageClick} // Add click event here
        >
          <img
            src={selectedImage}
            alt="Selected"
            className={`w-full h-full  ${isMobile ? 'object-cover' : 'object-contain'} ${isMobile ? '' : 'border'}`}
          />
          {/* Only show hover effect for desktop */}
          {isZoomed && !isMobile && (
            <div
              ref={hoverBoxRef}
              className="absolute w-40 h-40 border border-gray-600 bg-gray-600 opacity-50 pointer-events-none"
              style={{
                position: "absolute",
                background: "radial-gradient(circle, #0053a0 2px, transparent 2px)", // Amazon-style bluish dot
                backgroundSize: "5px 5px", // Adjust size of dots and gaps
              }}
            />
          )}
        </div>
        {/* Text Below the Image, Centered under image container */}
        {!isMobile && (
          <div className="flex justify-center mt-2 md:w-[500px]">
            <p className="text-gray-600 text-sm">
              {isZoomed ? "Click to open expanded view" : "Roll over image to zoom in"}
            </p>
          </div>
        )}
      </div>

      {/* Zoomed Preview */}
      {isZoomed && !isMobile && (
        <div
          ref={zoomedImageRef}
          className="absolute right-10 top-6 w-[700px] h-[500px] border-2 rounded border-gray-600 bg-white shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: "200%", // Zoom level
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Modal Popup for full-size image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Modal Image" className="max-w-full max-h-full object-contain" />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white px-3 py-0 heading5 rounded-full text-black"
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
