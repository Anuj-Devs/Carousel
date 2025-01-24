"use client";
import { useState, useEffect } from "react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

interface CardItem {
  cardName: string;
  cardSubTitle: string;
  ID: number;
  image: string;
}

interface CarouselProps {
  array: CardItem[];
  isDisabled?: boolean;
  isAutoChange?: boolean;
  autoScrollTimer?: number;
}

const Carousel: React.FC<CarouselProps> = ({ array, isDisabled = false, isAutoChange = false, autoScrollTimer = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsToShow, setItemsToShow] = useState<number>(4);
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    // Update itemsToShow based on screen size
    const updateItemsToShow = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setItemsToShow(1); // 1 card for mobile
      } else if (width < 900) {
        setItemsToShow(2); // 2 cards for tablet
      } else if (width < 1200) {
        setItemsToShow(3); // 3 cards for desktop
      } else {
        setItemsToShow(4); // 4 cards for Big screen
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  useEffect(() => {
    if (isAutoChange && !(isDisabled && currentIndex + itemsToShow >= array.length)) {
      const interval = setInterval(() => {
        handleNext();
      }, autoScrollTimer * 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoChange, currentIndex, isDisabled]);

  const handleNext = () => {
    if (isDisabled) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % array.length);
    } else {
      if (currentIndex + itemsToShow >= array.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePrev = () => {
    if (isDisabled) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + array.length) % array.length
      );
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(array.length - 1);
      } else {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleCardClick = (card: CardItem) => {
    console.log("Card clicked:", card);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Next/Prev Buttons */}
      <div
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 z-10 ${
          currentIndex === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0} // Disable prev if it's the first card and isDisabled is true
          className="bg-white bg-opacity-50 backdrop-blur-md text-white p-2 rounded-full hover:scale-105 transition"
        >
          <TiArrowLeftThick />
        </button>
      </div>
      <div
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 z-10 ${
          isDisabled && currentIndex + itemsToShow >= array.length
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
      >
        <button
          onClick={handleNext}
          disabled={isDisabled && currentIndex + itemsToShow >= array.length} // Disable next if the last card is visible and isDisabled is true
          className="relative flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md text-white p-2 rounded-full hover:scale-105 transition"
        >
          {isAutoChange && !(isDisabled && currentIndex + itemsToShow >= array.length) && (array.length > 4) ? (
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 36 36"
            >
              <path
                key={animationKey} // Reset animation when key changes
                className="stroke-dasharray"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  strokeDasharray: "100, 100",
                  animation: `circularProgress ${autoScrollTimer}s linear infinite`,
                }}
              />
            </svg>
          ) : (
            ""
          )}
          
          <TiArrowRightThick />
        </button>
      </div>

      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-500 ease-in-out  mx-2"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
        }}
      >
        {array.map((item) => (
          <div onClick={() => handleCardClick(item)}
            key={item.ID}
            className={`flex-shrink-0 px-2 pt-12 ${
              itemsToShow === 1 ? "w-full" : itemsToShow === 2 ? "w-1/2" : itemsToShow === 3 ? "w-1/3" : "w-1/4"
            }`} // Adjust width based on itemsToShow
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative myCard">
              <img
                src={item.image}
                alt={item.cardName}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <div className="font-semibold heading1 text-text2">{item.cardName}</div>
                <div className="heading4 text-text2">{item.cardSubTitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes circularProgress {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
