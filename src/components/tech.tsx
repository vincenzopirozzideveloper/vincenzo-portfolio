import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";

// Technologies
export const Tech = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 });
  
  // Random light movement
  useEffect(() => {
    const interval = setInterval(() => {
      setLightPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Different parallax speeds for each column
  const column1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const column2Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const column3Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const column4Y = useTransform(scrollYProgress, [0, 1], [140, -140]);
  
  // Section fade in/out based on scroll - delayed appearance
  const sectionOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 1, 0]);
  
  // Geometric lines animation
  const linesOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const linesRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  // Split technologies into four columns
  const columns = [
    TECHNOLOGIES.filter((_, i) => i % 4 === 0),
    TECHNOLOGIES.filter((_, i) => i % 4 === 1),
    TECHNOLOGIES.filter((_, i) => i % 4 === 2),
    TECHNOLOGIES.filter((_, i) => i % 4 === 3),
  ];
  
  const columnTransforms = [column1Y, column2Y, column3Y, column4Y];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-20"
      style={{ backgroundColor: '#020202' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: sectionOpacity }}
      >
        {/* Moving spotlight */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none z-0"
          animate={{
            x: `${lightPosition.x}%`,
            y: `${lightPosition.y}%`,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, rgba(145, 94, 255, 0.2) 30%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Secondary moving light */}
        <motion.div
          className="absolute w-80 h-80 rounded-full pointer-events-none z-0"
          animate={{
            x: `${100 - lightPosition.x}%`,
            y: `${100 - lightPosition.y}%`,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Geometric lines background */}
        <div className="absolute inset-0 overflow-hidden">
        {/* Glowing grid lines */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: linesOpacity }}
        >
          {/* Vertical lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{ left: `${12.5 * (i + 1)}%` }}
            />
          ))}
          
          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ top: `${16.66 * (i + 1)}%` }}
            />
          ))}
        </motion.div>
        
        {/* Diagonal accent lines */}
        <motion.div
          className="absolute inset-0"
          style={{ rotate: linesRotate, opacity: linesOpacity }}
        >
          <div className="absolute top-1/4 -left-20 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[#915eff]/30 to-transparent transform rotate-12" />
          <div className="absolute bottom-1/4 -right-20 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[#00cea8]/30 to-transparent transform -rotate-12" />
        </motion.div>
        
        {/* Glowing nodes at intersections */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: linesOpacity }}
        >
          {[...Array(4)].map((_, row) => (
            [...Array(4)].map((_, col) => (
              <motion.div
                key={`node-${row}-${col}`}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${25 * (col + 1)}%`,
                  top: `${25 * (row + 1)}%`,
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: row * 0.2 + col * 0.1,
                  repeat: Infinity,
                }}
              />
            ))
          ))}
        </motion.div>
      </div>
      </motion.div>
      
      <SectionWrapper>
        <motion.div 
          className="relative z-10"
          style={{ opacity: sectionOpacity }}
        >
          {/* Title */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm font-medium tracking-wider uppercase" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              My technical arsenal
            </p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
              Technologies.
            </h2>
          </motion.div>
          
          {/* Four columns container */}
          <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
            {columns.map((columnTechs, colIndex) => (
              <motion.div 
                key={colIndex}
                className="flex flex-col gap-4"
                style={{ 
                  y: columnTransforms[colIndex],
                  marginTop: colIndex % 2 === 0 ? '0' : '40px'
                }}
              >
                {columnTechs.map((technology, index) => (
                  <motion.div
                    key={technology.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + colIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Card glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Dynamic illumination based on light proximity */}
                    <motion.div 
                      className="absolute -inset-1 rounded-lg pointer-events-none"
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 6,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    {/* Card */}
                    <div className="relative p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                      {/* Icon */}
                      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <img 
                          src={technology.icon} 
                          alt={technology.name}
                          className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      
                      {/* Tech name */}
                      <p className="text-gray-400 text-xs text-center font-medium tracking-wide group-hover:text-white transition-colors" 
                         style={{ fontFamily: 'Inter, sans-serif' }}>
                        {technology.name}
                      </p>
                      
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};