import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-project]')) {
        setIsHoveringProject(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-project]')) {
        setIsHoveringProject(false);
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    // Check for modal state
    const checkModalState = () => {
      const modalElement = document.querySelector('[data-modal-open]');
      setIsModalOpen(!!modalElement);
    };
    
    // Use MutationObserver to detect modal changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['data-modal-open'],
      subtree: true 
    });
    
    checkModalState();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHoveringProject ? 2.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="w-10 h-10 rounded-full border-2"
            animate={{
              opacity: isHoveringProject ? 0.3 : 0.8,
              borderColor: isModalOpen ? '#1a1a1a' : '#915eff',
            }}
            style={{
              boxShadow: isHoveringProject 
                ? isModalOpen 
                  ? '0 0 30px rgba(26, 26, 26, 0.6)' 
                  : '0 0 30px rgba(145, 94, 255, 0.6)'
                : isModalOpen
                  ? '0 0 15px rgba(26, 26, 26, 0.3)'
                  : '0 0 15px rgba(145, 94, 255, 0.3)',
            }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
            animate={{
              scale: isHoveringProject ? 0 : 1,
              backgroundColor: isModalOpen ? '#1a1a1a' : '#915eff',
            }}
          />
        </motion.div>
      </motion.div>

      {/* View Project text */}
      <AnimatePresence>
        {isHoveringProject && (
          <motion.div
            className="fixed pointer-events-none z-[9999]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x - 60,
              y: mousePosition.y - 60,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              x: { type: "spring", stiffness: 500, damping: 28 },
              y: { type: "spring", stiffness: 500, damping: 28 },
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#915eff]/20 rounded-full blur-xl" />
              
              {/* Text container */}
              <div className="relative bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#915eff]/50">
                <span className="text-white text-xs font-bold tracking-wider" 
                      style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  VIEW PROJECT
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};