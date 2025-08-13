import { motion } from "framer-motion";

import { BLOG_POSTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type BlogCardProps = (typeof BLOG_POSTS)[number] & { index: number };

// Blog Card (horizontal scroll)
const BlogCard = ({ index, slug, title, excerpt, image, date, read_time_min }: BlogCardProps) => (
  <motion.article
    variants={fadeIn(undefined, "spring", index * 0.25, 0.6)}
    className="bg-black-200 rounded-2xl overflow-hidden w-[320px] shrink-0 snap-start"
  >
    <div className="aspect-video w-full overflow-hidden">
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
  const listRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", onResize);
    };
  }, [updateScrollState]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("article");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : 340; // 320 + gap
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, []);

  return (
    <SectionWrapper>
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
            {/* Scroll gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black-100 to-transparent rounded-l-[20px]" aria-hidden />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black-100 to-transparent rounded-r-[20px]" aria-hidden />

            {/* Controls */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCard(-1)}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 disabled:opacity-40"
              disabled={!canScrollLeft}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCard(1)}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 disabled:opacity-40"
              disabled={!canScrollRight}
            >
              ›
            </button>

            {/* List */}
            <div
              ref={listRef}
              onWheel={onWheel}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
              role="list"
            >
              {BLOG_POSTS.map((post, i) => (
                <BlogCard key={post.slug} index={i} {...post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
