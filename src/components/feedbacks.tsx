import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { BLOG_POSTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type BlogCardProps = (typeof BLOG_POSTS)[number] & { index: number };

// Blog Card (horizontal scroll)
const BlogCard = ({ index, slug, title, excerpt, image, date, read_time_min }: BlogCardProps) => (
  <motion.article
    variants={fadeIn(undefined, "spring", index * 0.25, 0.6)}
    className="bg-black-200 rounded-[20px] w-[320px] shrink-0 snap-start overflow-hidden"
  >
    <div className="aspect-video w-full overflow-hidden rounded-t-[20px]">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-5">
      <h3 className="text-white text-[18px] font-bold leading-snug line-clamp-2">{title}</h3>
      <p className="mt-2 text-white/70 text-[14px] leading-relaxed line-clamp-3">{excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-white/50 text-[12px]">
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>{read_time_min} min read</span>
      </div>
      <a
        href={`#/blog/${slug}`}
        className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#915eff] hover:text-white transition-colors"
        aria-label={`Read ${title}`}
      >
        Read article →
      </a>
    </div>
  </motion.article>
);


// Feedbacks
export const Feedbacks = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <SectionWrapper>
      <section ref={targetRef} className="relative h-[300vh]">
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
                <div className="overflow-hidden rounded-[20px]">
                  {/* Horizontal scroll content */}
                  <motion.div style={{ x }} className="flex gap-5 pb-2">
                    {BLOG_POSTS.map((post, i) => (
                      <BlogCard key={post.slug} index={i} {...post} />
                    ))}
                  </motion.div>
                </div>
                
                {/* Scroll gradients on top */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black-100 to-transparent rounded-l-[20px] z-10" aria-hidden />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black-100 to-transparent rounded-r-[20px] z-10" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};
