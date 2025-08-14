import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ProjectModalEnhancedProps {
  isOpen: boolean;
  project: any;
  onClose: () => void;
}

export const ProjectModalEnhanced = ({ isOpen, project, onClose }: ProjectModalEnhancedProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open and set modal state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-modal-open');
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(230, 230, 230, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          />

          {/* Pulsing lights underneath */}
          <motion.div
            className="fixed inset-0 z-[997] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Light 1 */}
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-96 h-96"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, rgba(145, 94, 255, 0.6) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
            
            {/* Light 2 */}
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-80 h-80"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{
                background: 'radial-gradient(circle, rgba(123, 77, 216, 0.5) 0%, transparent 60%)',
                filter: 'blur(50px)',
              }}
            />
            
            {/* Light 3 */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                background: 'radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </motion.div>

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <motion.div
              className="relative w-full max-w-7xl h-[85vh] bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 25px 100px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[2px] rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #915eff, #7a4dd8, #915eff, #7a4dd8)',
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Inner white background to create border effect */}
              <div className="absolute inset-[2px] bg-gradient-to-br from-white to-gray-50 rounded-3xl" />
              
              {/* Subtle corner highlights */}
              <motion.div
                className="absolute top-0 left-0 w-24 h-24"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#915eff] via-[#915eff]/50 to-transparent" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#915eff] via-[#915eff]/50 to-transparent" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 right-0 w-24 h-24"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#915eff] via-[#915eff]/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-[#915eff] via-[#915eff]/50 to-transparent" />
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-8 right-8 w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center group z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-[#915eff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Content */}
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 h-full">
                  {/* Left side - Image */}
                  <div className="relative h-full overflow-hidden">
                    <motion.img
                      src={project.modal_image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                    
                    {/* Floating particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#915eff]/30 rounded-full"
                        initial={{
                          x: Math.random() * 100 + '%',
                          y: '100%',
                        }}
                        animate={{
                          y: '-100%',
                        }}
                        transition={{
                          duration: 10 + Math.random() * 10,
                          repeat: Infinity,
                          delay: i * 2,
                          ease: "linear",
                        }}
                        style={{
                          filter: 'blur(2px)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Right side - Content */}
                  <div className="relative p-16 flex flex-col justify-center">
                    {/* Project number */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8"
                    >
                      <span 
                        className="text-[160px] font-black text-[#915eff]/10 leading-none"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        01
                      </span>
                    </motion.div>

                    {/* Project title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl font-black text-gray-900 mb-6"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {project.name}
                    </motion.h2>

                    {/* Project description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl text-gray-600 leading-relaxed mb-8"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Extended description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-gray-500 leading-relaxed mb-8 space-y-4"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <p>
                        This project showcases cutting-edge web development techniques and modern design principles. 
                        Built with performance and user experience in mind, it demonstrates proficiency in creating 
                        scalable, maintainable applications.
                      </p>
                      <p>
                        The architecture follows best practices for component-based development, featuring responsive 
                        design, smooth animations, and optimized performance across all devices.
                      </p>
                    </motion.div>

                    {/* Tech tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-3 mb-10"
                    >
                      {project.tags.map((tag: any, index: number) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="px-5 py-2 bg-[#915eff]/10 border border-[#915eff]/30 rounded-full text-[#915eff] text-sm font-medium"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {tag.name}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex gap-4"
                    >
                      {project.live_site_link && (
                        <motion.a
                          href={project.live_site_link}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative px-8 py-4 bg-[#915eff] text-white rounded-xl font-bold overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          <span className="relative z-10">View Live Site</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#7a4dd8] to-[#915eff]"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      )}
                      
                      {project.source_code_link && (
                        <motion.a
                          href={project.source_code_link}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative px-8 py-4 bg-gray-900 text-white rounded-xl font-bold overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Source
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};