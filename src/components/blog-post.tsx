import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { BLOG_POSTS } from "../constants";
import { BLOG_ARTICLES } from "../data/blog-articles";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const articleContent = BLOG_ARTICLES.find(a => a.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!post) {
    return <NotFound />;
  }
  
  if (!articleContent) {
    return <NotFound message="This article is coming soon..." />;
  }
  
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-0 pt-24 pb-12`}>
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const blogSection = document.getElementById("blog");
                if (blogSection) {
                  blogSection.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
            className="text-[#915eff] hover:text-white transition-colors flex items-center gap-2 mb-8"
          >
            ← Back to Articles
          </button>
          
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            animate="show"
          >
            <p className={`${styles.sectionSubText} text-[#915eff]`}>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {post.read_time_min} min read
            </p>
            <h1 className={`${styles.heroHeadText} text-white mt-2`}>
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>
      
      <div className={`${styles.paddingX} max-w-4xl mx-auto pb-32`}>
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          initial="hidden"
          animate="show"
          className="bg-tertiary rounded-2xl p-8 md:p-12"
        >
          {/* Hero Image */}
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          
          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            {articleContent.content}
            
            <div className="border-t border-white/10 mt-12 pt-8">
              <p className="text-white/50 text-sm">
                Tags: {post.tags.map(tag => `#${tag}`).join(' ')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NotFound = ({ message = "Article not found" }: { message?: string }) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative z-0 bg-primary min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/70 mb-8">{message}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#915eff] text-white px-6 py-3 rounded-lg hover:bg-[#7a4dd8] transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BlogPost;