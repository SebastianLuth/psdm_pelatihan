'use client';
import React, { useRef, useState } from 'react';
import CardDataStats from './CardDataStats';

const ScrollableCards: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="overflow-x-auto">
      <div
        ref={scrollRef}
        className="flex space-x-4 cursor-grab active:cursor-grabbing overflow-x-auto" // Enable horizontal scrolling
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        style={{ maxHeight: '200px', maxWidth: '1420px',  overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto'}} // Set height according to your need
      >
        <div className="flex space-x-4 min-w-fit">
          <CardDataStats title="Total Users" total="3.456K" rate="0.43%" levelUp>
            <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Users" total="3.456K" rate="0.43%" levelUp>
            <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
          </CardDataStats>
          {/* Add other cards here */}
        </div>
      </div>
    </div>
  );
};

export default ScrollableCards;
