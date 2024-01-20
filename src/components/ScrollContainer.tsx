import React, { useRef } from "react";

const ScrollContainer = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollLeft +
        containerRef.current.clientWidth * 0.95 * dir;
    }
  };

  return (
    <div className="group relative overflow-hidden">
      <button
        className="-translate-x-full group-hover:translate-x-0 w-8 opacity-85 hover:opacity-100 absolute h-full left-0 top-0 z-20 cursor-pointer duration-300"
        onClick={() => handleScroll(-1)}
        style={{
          background: "linear-gradient(to left, #02061700, #020617)",
        }}
      >
        <img src="/ic-arrow.svg" alt="<" className="w-full" />
      </button>
      <div
        className={`flex gap-2 overflow-auto no-scrollbar scroll-smooth ${className}`}
        ref={containerRef}
      >
        {children}
      </div>
      <button
        className="translate-x-full group-hover:translate-x-0 w-8 opacity-85 hover:opacity-100 absolute h-full right-0 top-0 z-20 cursor-pointer duration-300"
        onClick={() => handleScroll(1)}
        style={{
          background: "linear-gradient(to right, #02061700, #020617)",
        }}
      >
        <img src="/ic-arrow.svg" alt=">" className="w-full rotate-180" />
      </button>
    </div>
  );
};

export default ScrollContainer;
