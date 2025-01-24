"use client"

import React, { useState, useEffect } from 'react';

type Card = {
  cardName: string;
  ID: number;
  image: string;
};

type CarouselProps = {
  cards: Card[];
};

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1); // Default to 1 card

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) setCardsToShow(1); // 1 card on small screens
      else if (window.innerWidth < 768) setCardsToShow(2); // 2 cards on medium screens
      else if (window.innerWidth < 1024) setCardsToShow(3); // 3 cards on large screens
      else setCardsToShow(4); // 4 cards on extra-large screens
    };

    updateCardsToShow(); // Update on mount
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(cards.length - cardsToShow); // Go to last set of cards
    }
  };

  const handleNext = () => {
    const totalCards = cards.length;
    const remainingCards = totalCards - (currentIndex + cardsToShow);
    
    // Prevent going beyond the last set of cards
    if (remainingCards > 0) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(totalCards - cardsToShow); // Go to last set of cards if we're at the end
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}>
        {cards.map((card) => (
          <div key={card.ID} className="flex-shrink-0 h-96 bg-red-300 p-2 mx-0 sm:mx-6 box-border shadow-xl border border-gray-200 rounded-lg" style={{ width: `${100 / cardsToShow}%` }}>
            <div className="text-center mt-2">{card.cardName}</div>
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2">
        Prev
      </button>
      <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2">
        Next
      </button>
    </div>
  );
};

export default Carousel; 
