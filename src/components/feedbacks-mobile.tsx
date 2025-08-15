import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../constants";

export const FeedbacksMobile = () => {
  return (
    <section className="bg-black min-h-screen py-12 px-4" id="blog">
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-2">
            Latest posts
          </p>
          <h2 className="text-2xl font-bold text-white">Blog</h2>
        </motion.div>

        <div className="space-y-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.read_time_min} min read</span>
                </div>
                
                <h3 className="text-white text-lg font-bold leading-tight mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Leggi articolo 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};