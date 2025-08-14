import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BLOG_POSTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type BlogCardProps = (typeof BLOG_POSTS)[number] & { index: number, isDragging: boolean };

// Blog Card (horizontal scroll)
const BlogCard = ({ index, slug, title, excerpt, image, date, read_time_min, isDragging }: BlogCardProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-black rounded-2xl w-[320px] shrink-0 snap-start overflow-hidden select-none border border-[#915eff]/10"
    >
      {/* Purple glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#915eff]/0 via-[#915eff]/20 to-[#915eff]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
      
      <div className="relative bg-black rounded-2xl overflow-hidden">
        <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
          <img src={image} alt={title} className="w-full h-full object-cover" draggable="false" />
          {/* Purple overlay on hover */}
          <div className="absolute inset-0 bg-[#915eff]/0 group-hover:bg-[#915eff]/10 transition-colors duration-300" />
        </div>
        <div className="p-5">
          <h3 className="text-white text-[18px] font-bold leading-snug line-clamp-2" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {title}
          </h3>
          <p className="mt-2 text-gray-500 text-[14px] leading-relaxed line-clamp-3" 
             style={{ fontFamily: 'Inter, sans-serif' }}>
            {excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-gray-600 text-[12px]" 
               style={{ fontFamily: 'Inter, sans-serif' }}>
            <span>{new Date(date).toLocaleDateString()}</span>
            <span>{read_time_min} min read</span>
          </div>
          <motion.button
            onClick={() => !isDragging && navigate(`/blog/${slug}`)}
            className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#915eff]/60 hover:text-[#915eff] transition-colors cursor-pointer group/btn"
            aria-label={`Read ${title}`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            whileTap={{ scale: 0.95 }}
          >
            Read article 
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};


// Feedbacks
export const Feedbacks = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 20, stiffness: 200 });
  
  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <SectionWrapper>
      <section ref={targetRef} id="blog" className="relative h-[300vh]" 
               style={{ backgroundColor: '#000000' }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          {/* Purple glow effects in background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-40 w-80 h-80 bg-[#915eff]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-[#7a4dd8]/20 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative mt-12">
            <div className="p-12">
              {/* Title */}
              <motion.div variants={textVariant()}>
                <p className="text-[#915eff]/60 text-sm font-medium tracking-wider uppercase" 
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                  Latest posts
                </p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2" 
                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Blog.
                </h2>
              </motion.div>
            </div>

            {/* Horizontal scrollable list */}
            <div className="px-12 -mt-10 pb-14"> 
              <div className="relative">
                {/* Purple glow line */}
                <div className="absolute -top-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#915eff]/30 to-transparent" />
                
                {/* Mask container that clips content */}
                <div 
                  ref={scrollRef}
                  className={cn(
                    "overflow-hidden rounded-2xl",
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  )}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Horizontal scroll content */}
                  <motion.div 
                    style={{ x }} 
                    className="flex gap-5 pb-2"
                    drag="x"
                    dragConstraints={{ left: -2000, right: 0 }}
                    dragElastic={0.2}
                    dragTransition={{ power: 0.3, timeConstant: 200 }}
                  >
                    {BLOG_POSTS.map((post, i) => (
                      <BlogCard key={post.slug} index={i} isDragging={isDragging} {...post} />
                    ))}
                  </motion.div>
                </div>
                
                {/* Scroll gradients on top with parallax effect */}
                <motion.div 
                  className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black via-black/50 to-transparent rounded-l-2xl z-10" 
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0.8, 1]) }}
                  aria-hidden 
                />
                <motion.div 
                  className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black via-black/50 to-transparent rounded-r-2xl z-10" 
                  style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0.8]) }}
                  aria-hidden 
                />
                
                {/* Progress indicator with purple glow */}
                <motion.div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-1 bg-gray-900 rounded-full w-32 overflow-hidden"
                >
                  <motion.div 
                    className="h-full bg-[#915eff] rounded-full"
                    style={{ 
                      scaleX: scrollYProgress,
                      boxShadow: '0 0 10px rgba(145, 94, 255, 0.5)'
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};