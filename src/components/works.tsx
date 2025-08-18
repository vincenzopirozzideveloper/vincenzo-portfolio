import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { ProjectModalEnhanced } from "./project-modal-enhanced";

// Works component with scroll-based animations
export const Works = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active project based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const projectIndex = Math.floor(value * PROJECTS.length);
      setActiveIndex(Math.min(projectIndex, PROJECTS.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <SectionWrapper idName="projects">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          height: `${PROJECTS.length * 100}vh`,
          backgroundColor: '#020202' 
        }}
      >
      {/* Fixed layout container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex">
          {/* Left side - Project info */}
          <div className="w-1/2 flex flex-col justify-center pl-20">
            {/* Project number */}
            <div className="relative h-32 overflow-hidden mb-8">
              {PROJECTS.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute left-0"
                  animate={{
                    y: activeIndex === index ? 0 : 
                       activeIndex > index ? -150 : 150,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <span 
                    className="text-[120px] font-bold text-white/10 leading-none"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Project titles */}
            <div className="relative h-20 overflow-hidden mb-6">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  className="absolute left-0"
                  animate={{
                    y: activeIndex === index ? 0 : 
                       activeIndex > index ? -100 : 100,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.1
                  }}
                >
                  <h2 
                    className="text-5xl font-bold text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {project.name}
                  </h2>
                </motion.div>
              ))}
            </div>

            {/* Project descriptions */}
            <div className="relative h-32 overflow-hidden mb-8">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  className="absolute left-0 w-[500px]"
                  animate={{
                    y: activeIndex === index ? 0 : 
                       activeIndex > index ? -150 : 150,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.2
                  }}
                >
                  <p 
                    className="text-gray-400 text-lg leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="relative h-12 overflow-hidden">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  className="absolute left-0 flex gap-3"
                  animate={{
                    y: activeIndex === index ? 0 : 
                       activeIndex > index ? -60 : 60,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.3
                  }}
                >
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-[#915eff]/10 border border-[#915eff]/30 rounded-full text-[#915eff] text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Project navigation dots */}
            <div className="flex gap-2 mt-12">
              {PROJECTS.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/20"
                  animate={{
                    backgroundColor: activeIndex === index 
                      ? 'rgba(145, 94, 255, 1)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    scale: activeIndex === index ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Right side - Project cards */}
          <div className="w-1/2 h-full overflow-hidden pr-20">
            <motion.div 
              className="flex flex-col gap-8 py-10"
              animate={{
                y: -activeIndex * 420 + 100 // Adjust position based on active project
              }}
              transition={{
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              {PROJECTS.map((project, index) => {
                const distance = Math.abs(activeIndex - index);
                const isActive = activeIndex === index;
                const scale = isActive ? 1 : 0.85 + (0.05 * Math.max(0, 2 - distance));
                const opacity = isActive ? 1 : 0.3 + (0.2 * Math.max(0, 2 - distance));

                return (
                  <motion.div
                    key={index}
                    className="flex-shrink-0"
                    data-cursor-project
                    animate={{
                      scale,
                      opacity,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    style={{
                      height: '400px',
                    }}
                    onClick={() => {
                      if (index === 0) { // Only first project opens modal
                        setSelectedProject(project);
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <div className="relative h-full">
                      {/* Card glow */}
                      <motion.div
                        className="absolute -inset-4 rounded-3xl"
                        animate={{
                          opacity: isActive ? 0.3 : 0,
                        }}
                        style={{
                          background: 'radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, transparent 70%)',
                          filter: 'blur(20px)',
                        }}
                      />
                      
                      {/* Project card */}
                      <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#915eff]/20 cursor-pointer group">
                        {/* Image container */}
                        <div className="relative h-full overflow-hidden">
                          <motion.img 
                            src={project.image} 
                            alt={project.name}
                            className="w-full h-full object-cover"
                            animate={{
                              scale: isActive ? 1.05 : 1,
                            }}
                            transition={{
                              duration: 0.6,
                            }}
                          />
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Hover overlay */}
                          <motion.div 
                            className="absolute inset-0 bg-[#915eff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          
                          {/* Card content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center justify-between mb-4">
                              <span 
                                className="text-[#915eff] text-lg font-bold"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="flex gap-3">
                                {project.source_code_link && (
                                  <a 
                                    href={project.source_code_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#915eff]/30 transition-all duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                  </a>
                                )}
                                {project.live_site_link && (
                                  <a 
                                    href={project.live_site_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#915eff]/30 transition-all duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <h3 
                              className="text-white text-2xl font-bold"
                              style={{ fontFamily: 'Montserrat, sans-serif' }}
                            >
                              {project.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Modal */}
      <ProjectModalEnhanced
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />
      </div>
    </SectionWrapper>
  );
};

