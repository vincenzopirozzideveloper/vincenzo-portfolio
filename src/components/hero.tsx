import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import vincenzoImg from "../assets/vincenzo.png";

// Hero
export const Hero = () => {
  const containerRef = useRef<HTMLSection>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Phase 1: Image fades as black section rises (0-25% of scroll)
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  
  // Phase 2: Black section rises from bottom (0-25% of scroll)
  const blackSectionY = useTransform(scrollYProgress, [0, 0.25], ["100%", "0%"]);
  
  // Phase 3: Text opacity increases as section is centered (15-30% of scroll)
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  
  // Stoic quote split into chunks
  const quoteChunks = [
    "The impediment",
    "to action",
    "advances action.",
    "What stands",
    "in the way",
    "becomes the way."
  ];
  
  const author = "— Marcus Aurelius";

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky container for all animations */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: '#020202' }}>
        
        {/* Phase 1: Initial image */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: imageOpacity }}
        >
          <img 
            src={vincenzoImg} 
            alt="Vincenzo"
            className="w-[600px] h-[600px] object-cover"
          />
        </motion.div>

        {/* Phase 2: Dark section that rises from bottom */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ y: blackSectionY, backgroundColor: '#020202' }}
        >
          {/* Quote container */}
          <div className="max-w-4xl mx-auto px-8 text-center">
            {/* Quote symbol */}
            <motion.div
              className="text-[#915eff] text-6xl mb-8"
              style={{ 
                opacity: textOpacity,
                fontFamily: 'Georgia, serif'
              }}
            >
              "
            </motion.div>
            
            {/* Main quote with chunk-by-chunk illumination */}
            <div className="mb-8">
              <motion.h1 
                className="text-[3.5vw] leading-tight select-none"
                style={{ 
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 700,
                  opacity: textOpacity,
                }}
              >
                {quoteChunks.map((chunk, index) => {
                  // Each chunk illuminates progressively from 35% to 75% of scroll
                  const totalChunks = quoteChunks.length;
                  const startPercent = 0.35;
                  const endPercent = 0.75;
                  const rangePerChunk = (endPercent - startPercent) / totalChunks;
                  
                  const chunkStart = startPercent + (index * rangePerChunk);
                  const chunkEnd = chunkStart + rangePerChunk;
                  
                  const chunkColor = useTransform(
                    scrollYProgress,
                    [chunkStart, chunkEnd],
                    ["#333333", "#ffffff"]
                  );
                  
                  return (
                    <motion.span
                      key={index}
                      style={{ color: chunkColor }}
                      className="block"
                    >
                      {chunk}
                    </motion.span>
                  );
                })}
              </motion.h1>
            </div>
            
            {/* Author attribution - illuminates last */}
            <motion.p
              className="text-xl italic"
              style={{ 
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 300,
                opacity: textOpacity,
                color: useTransform(
                  scrollYProgress,
                  [0.75, 0.85],
                  ["#333333", "#915eff"]
                )
              }}
            >
              {author}
            </motion.p>
            
            {/* Closing quote */}
            <motion.div
              className="text-[#915eff] text-6xl mt-8"
              style={{ 
                opacity: textOpacity,
                fontFamily: 'Georgia, serif',
                transform: 'rotate(180deg)'
              }}
            >
              "
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator - only visible at start */}
        <motion.div 
          className="absolute bottom-10 w-full flex justify-center items-center z-30"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <div className="w-[35px] h-[64px] rounded-3xl border-2 border-white/30 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};