import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { BLOG_POSTS } from "../constants";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Only render full content for the first post
  const hasFullContent = slug === "monolith-to-microservices-laravel-react";
  
  if (!post) {
    return <NotFound />;
  }
  
  if (!hasFullContent) {
    return <NotFound message="This article is coming soon..." />;
  }
  
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-0 pt-24 pb-12`}>
          <button
            onClick={() => navigate("/")}
            className="text-[#915eff] hover:text-white transition-colors flex items-center gap-2 mb-8"
          >
            ← Back to Portfolio
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
          
          {/* Article Content - Only for first post */}
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Challenge</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Legacy monolithic applications often become bottlenecks in modern software development. 
              They're difficult to scale, challenging to maintain, and slow to deploy. Our client faced 
              all these challenges with their 10-year-old monolithic application serving millions of users.
            </p>
            
            <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Approach</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              We adopted the Strangler Fig pattern to gradually decompose the monolith into microservices. 
              This approach allowed us to migrate functionality piece by piece without disrupting the 
              existing system.
            </p>
            
            <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 1: Identify Bounded Contexts</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              We started by mapping out the different domains within the monolith. User management, 
              payment processing, and inventory management emerged as clear candidates for extraction.
            </p>
            
            <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 2: Extract User Service</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              The user service was our first extraction. We implemented an API gateway to route 
              authentication requests to the new service while keeping other functionalities in the monolith.
            </p>
            
            <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
              <code className="text-[#915eff]">{`// API Gateway routing configuration
{
  "/api/auth/*": "http://user-service:3001",
  "/api/users/*": "http://user-service:3001",
  "/api/*": "http://legacy-monolith:3000"
}`}</code>
            </pre>
            
            <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 3: Implement Event-Driven Communication</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              We introduced Apache Kafka for asynchronous communication between services, ensuring 
              data consistency across the distributed system.
            </p>
            
            <h2 className="text-white text-2xl font-bold mt-8 mb-4">Results</h2>
            <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
              <li>70% reduction in deployment time</li>
              <li>Independent scaling of critical services</li>
              <li>Improved fault isolation and system resilience</li>
              <li>Enabled parallel development across multiple teams</li>
            </ul>
            
            <h2 className="text-white text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The journey from monolith to microservices is not just a technical transformation—it's 
              an organizational one. Success requires careful planning, gradual migration, and strong 
              communication between teams.
            </p>
            
            <div className="border-t border-white/10 mt-12 pt-8">
              <p className="text-white/50 text-sm">
                Tags: #Microservices #Architecture #DevOps #CloudNative
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