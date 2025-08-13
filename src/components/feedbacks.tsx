import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BLOG_POSTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type BlogCardProps = (typeof BLOG_POSTS)[number] & { index: number };

// Blog Card (horizontal scroll)
const BlogCard = ({ index, slug, title, excerpt, image, date, read_time_min }: BlogCardProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-black-200 rounded-[20px] w-[320px] shrink-0 snap-start overflow-hidden select-none"
    >
      <div className="aspect-video w-full overflow-hidden rounded-t-[20px]">
        <img src={image} alt={title} className="w-full h-full object-cover" draggable="false" />
      </div>
      <div className="p-5">
        <h3 className="text-white text-[18px] font-bold leading-snug line-clamp-2">{title}</h3>
        <p className="mt-2 text-white/70 text-[14px] leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-white/50 text-[12px]">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>{read_time_min} min read</span>
        </div>
        <button
          onClick={() => navigate(`/blog/${slug}`)}
          className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#915eff] hover:text-white transition-colors cursor-pointer"
          aria-label={`Read ${title}`}
        >
          Read article →
        </button>
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
      <section ref={targetRef} id="blog" className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <div className="mt-12 bg-black-100 rounded-[20px]">
            <div
              className={cn(
                styles.padding,
                "bg-tertiary rounded-2xl min-h-[300px]"
              )}
            >
              {/* Title */}
              <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Latest posts</p>
                <h2 className={styles.sectionHeadText}>Blog.</h2>
              </motion.div>
            </div>

            {/* Horizontal scrollable list */}
            <div className={cn(styles.paddingX, "-mt-20 pb-14")}> 
              <div className="relative">
                {/* Mask container that clips content */}
                <div 
                  ref={scrollRef}
                  className={cn(
                    "overflow-hidden rounded-[20px]",
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
                      <BlogCard key={post.slug} index={i} {...post} />
                    ))}
                  </motion.div>
                </div>
                
                {/* Scroll gradients on top with parallax effect */}
                <motion.div 
                  className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black-100 via-black-100/50 to-transparent rounded-l-[20px] z-10" 
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0.8, 1]) }}
                  aria-hidden 
                />
                <motion.div 
                  className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black-100 via-black-100/50 to-transparent rounded-r-[20px] z-10" 
                  style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0.8]) }}
                  aria-hidden 
                />
                
                {/* Progress indicator */}
                <motion.div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-1 bg-gray-800 rounded-full w-32"
                >
                  <motion.div 
                    className="h-full bg-[#915eff] rounded-full"
                    style={{ scaleX: scrollYProgress }}
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
