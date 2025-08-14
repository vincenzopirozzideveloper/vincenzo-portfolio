import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

type ServiceItemProps = {
  index: number;
  title: string;
};

// Minimalist Service Item
const ServiceItem = ({ index, title }: ServiceItemProps) => {
  return (
    <div className="flex items-center gap-4 shrink-0">
      {/* Minimalist Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        {index % 4 === 0 && (
          // Backend Development Icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="8" width="6" height="12" fill="#1a1a1a" opacity="0.8"/>
            <rect x="11" y="6" width="6" height="16" fill="#1a1a1a" opacity="0.6"/>
            <rect x="20" y="10" width="6" height="8" fill="#1a1a1a" opacity="0.4"/>
          </svg>
        )}
        {index % 4 === 1 && (
          // Frontend Development Icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2 L26 8 L26 20 L14 26 L2 20 L2 8 Z" 
                  stroke="#1a1a1a" 
                  strokeWidth="2" 
                  fill="none"
                  opacity="0.7"/>
            <circle cx="14" cy="14" r="4" fill="#1a1a1a" opacity="0.5"/>
          </svg>
        )}
        {index % 4 === 2 && (
          // React Native Icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="3" fill="#1a1a1a" opacity="0.7"/>
            <ellipse cx="14" cy="14" rx="12" ry="5" 
                     stroke="#1a1a1a" 
                     strokeWidth="1.5" 
                     fill="none" 
                     opacity="0.5"/>
            <ellipse cx="14" cy="14" rx="5" ry="12" 
                     stroke="#1a1a1a" 
                     strokeWidth="1.5" 
                     fill="none" 
                     opacity="0.5"
                     transform="rotate(60 14 14)"/>
            <ellipse cx="14" cy="14" rx="5" ry="12" 
                     stroke="#1a1a1a" 
                     strokeWidth="1.5" 
                     fill="none" 
                     opacity="0.5"
                     transform="rotate(-60 14 14)"/>
          </svg>
        )}
        {index % 4 === 3 && (
          // Content Creator Icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="12" 
                  stroke="#1a1a1a" 
                  strokeWidth="2" 
                  fill="none"
                  opacity="0.7"/>
            <path d="M11 14 L17 14" stroke="#1a1a1a" strokeWidth="2" opacity="0.5"/>
          </svg>
        )}
      </div>
      
      {/* Title */}
      <h3 className="text-[#1a1a1a] text-lg font-medium tracking-wide" 
          style={{ fontFamily: 'Inter, sans-serif' }}>
        {title}
      </h3>
      
      {/* Separator dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mx-8" />
    </div>
  );
};

// About
export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Aurora expansion effect
  const auroraScale = useTransform(scrollYProgress, [0, 0.3], [0, 2.5]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0.8]);
  
  // Background transition
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={sectionRef} className="relative">
      {/* Aurora transition effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px]"
          style={{ 
            scale: auroraScale,
            opacity: auroraOpacity
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-white via-[#f8f8f8] to-transparent rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* White background that fades in */}
      <motion.div 
        className="absolute inset-0 bg-white"
        style={{ opacity: bgOpacity }}
      />
      
      <SectionWrapper idName="about">
        <div className="relative z-10">
          {/* Title with dark text for white background */}
          <motion.div variants={textVariant()}>
            <p className="text-gray-500 text-sm font-medium tracking-wider uppercase" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
              Professional Profile
            </p>
            <h2 className="text-[#1a1a1a] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
              About.
            </h2>
          </motion.div>

          {/* Bio text */}
          <motion.div
            variants={fadeIn(undefined, "tween", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 max-w-3xl"
          >
            <p className="text-gray-700 text-[17px] leading-[30px]" 
               style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              I'm a Senior Full Stack Developer with deep expertise in backend 
              architectures and DevSecOps practices. My approach to complex problem-solving 
              emphasizes elegant, maintainable solutions over unnecessary over-engineering.
            </p>
            <p className="text-gray-600 text-[16px] leading-[28px] mt-4" 
               style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              With extensive experience in PHP/Laravel ecosystem, modern JavaScript frameworks 
              like React and Vue.js, and containerization technologies including Docker and 
              Kubernetes, I deliver scalable enterprise solutions.
            </p>
          </motion.div>

          {/* Infinite Horizontal Carousel - Seamless */}
          <div className="mt-20 relative">
            {/* Very subtle fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-60" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none opacity-60" />
            
            {/* Carousel container */}
            <div className="overflow-hidden py-8">
              <motion.div
                className="flex items-center"
                animate={{
                  x: [0, -2000],
                }}
                transition={{
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {/* First set */}
                {[...SERVICES, ...SERVICES].map((service, i) => (
                  <ServiceItem key={`${service.title}-1-${i}`} index={i} title={service.title} />
                ))}
                {/* Second set for seamless loop */}
                {[...SERVICES, ...SERVICES].map((service, i) => (
                  <ServiceItem key={`${service.title}-2-${i}`} index={i} title={service.title} />
                ))}
              </motion.div>
            </div>
            
            {/* Second row moving opposite direction */}
            <div className="overflow-hidden py-8">
              <motion.div
                className="flex items-center"
                animate={{
                  x: [-2000, 0],
                }}
                transition={{
                  x: {
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {/* First set */}
                {[...SERVICES, ...SERVICES].map((service, i) => (
                  <ServiceItem key={`${service.title}-3-${i}`} index={SERVICES.length - 1 - i} title={service.title} />
                ))}
                {/* Second set for seamless loop */}
                {[...SERVICES, ...SERVICES].map((service, i) => (
                  <ServiceItem key={`${service.title}-4-${i}`} index={SERVICES.length - 1 - i} title={service.title} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Subtle line decoration */}
          <div className="mt-16 flex justify-center">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};