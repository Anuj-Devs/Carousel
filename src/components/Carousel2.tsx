"use client";
import { useState } from "react";
import { motion } from "framer-motion"
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { BsDot } from "react-icons/bs";
const Carousel2 = ({ array }: { array: { cardName: string; ID: number; image: string }[] }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? array.length - 1 : prev - 1));
  }
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === array.length - 1 ? 0 : prev + 1));
  }

  return (
    <main className="py-40 px-12 overflow-hidden">
      <div className="relative flex flex-col items-center py-20">
        <div className="overflow-hidden w-[90rem] h-[20rem]">
          <motion.div className="flex" initial={{ x:0 }} animate={{ x: -currentIndex * 320}} transition={{type: "spring", stiffness: 300, damping: 30}}>
            {array.map((data) => (
              <motion.div className="p-2 min-w-[30rem] h-[20rem] myCard"  key={data.ID}>
                  <h3>{data.cardName}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-row w-full justify-between mt-6">
          <button onClick={prevSlide} className="bg-gray-100 p-3 rounded-full shadow transition-all hover:opacity-70">
            <TiArrowLeftThick/>
          </button>
          <div className="flex flex-row gap-1">
              {array.map((_, index) => (
                <BsDot onClick={() => setCurrentIndex(index)} key={index} className={`cursor-pointer heading1111 ${index === currentIndex ? "text-gray-800" : "text-gray-400"}`}  />
              ))}
          </div>
          <button onClick={nextSlide} className="bg-gray-100 p-3 rounded-full shadow transition-all hover:opacity-70">
            <TiArrowRightThick/>
          </button>
        </div>
      </div>
    </main>
  )
}

export default Carousel2;
