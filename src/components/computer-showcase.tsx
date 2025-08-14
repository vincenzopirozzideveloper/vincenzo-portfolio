import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ComputersCanvas from "./canvas/computers";

export const ComputerShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Simple fade in/out based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#020202' }}
    >
      {/* 3D Computer container - centered */}
      <motion.div 
        className="w-full h-full flex items-center justify-center"
        style={{ opacity }}
      >
        <ComputersCanvas />
      </motion.div>
    </div>
  );
};