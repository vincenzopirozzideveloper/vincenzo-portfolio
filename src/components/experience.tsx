import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { EXPERIENCES } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

type ExperienceCardProps = {
  experience: (typeof EXPERIENCES)[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
};

// Modern Experience Card
const ExperienceCard = ({ experience, index, isActive, onClick }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1 : 0.9,
        filter: isActive ? "brightness(1)" : "brightness(0.7)"
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        scale: { duration: 0.3 }
      }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div className={`
        relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500
        ${isActive 
          ? 'bg-gradient-to-br from-white/95 to-white/90 shadow-2xl' 
          : 'bg-white/50 hover:bg-white/60 shadow-lg hover:shadow-xl'
        }
      `}>
        {/* Company logo container */}
        <div className="absolute -top-6 left-8">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
            ${isActive 
              ? 'bg-gradient-to-br from-[#915eff] to-[#7a4dd8] shadow-lg' 
              : 'bg-gray-200'
            }
          `}>
            <img 
              src={experience.icon} 
              alt={experience.company_name}
              className={`w-8 h-8 object-contain ${isActive ? 'brightness-0 invert' : 'opacity-60'}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* Title and Company */}
          <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            {experience.title}
          </h3>
          <p className="text-[#915eff] font-semibold mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            {experience.company_name}
          </p>
          
          {/* Date badge */}
          <div className="inline-block mt-3 px-3 py-1 bg-gray-100 rounded-full">
            <span className="text-xs text-gray-600 font-medium">
              {experience.date}
            </span>
          </div>

          {/* Experience points - only show when active */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-5 space-y-2">
              {experience.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-gray-600 text-sm pl-6 relative"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="absolute left-0 top-2 w-2 h-2 bg-[#915eff] rounded-full" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 rounded-2xl border-2 border-[#915eff] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Experience
export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#915eff]/5 to-transparent rounded-full blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#00cea8]/5 to-transparent rounded-full blur-3xl"
        style={{ y: y2 }}
      />
      
      {/* Decorative lines */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        style={{ rotate }}
      />
      
      <SectionWrapper idName="work">
        <div className="relative z-10">
          {/* Title */}
          <motion.div variants={textVariant()}>
            <p className="text-gray-500 text-sm font-medium tracking-wider uppercase" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              What I have done so far
            </p>
            <h2 className="text-gray-900 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
              Work Experience.
            </h2>
          </motion.div>

          {/* Timeline navigator */}
          <div className="mt-12 flex items-center justify-center gap-2 mb-8">
            {EXPERIENCES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${activeIndex === index 
                    ? 'w-12 bg-[#915eff]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>

          {/* Experience Cards Grid */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {EXPERIENCES.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Floating year display */}
          <motion.div 
            className="absolute top-20 right-10 text-8xl font-bold text-gray-100 select-none"
            style={{ fontFamily: 'Inter, sans-serif' }}
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {EXPERIENCES[activeIndex].date.split('-')[0]}
          </motion.div>

          {/* Progress bar */}
          <div className="mt-16 relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#915eff] to-[#00cea8]"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeIndex + 1) / EXPERIENCES.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};