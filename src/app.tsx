import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  ComputerShowcase,
} from "./components";
import Footer from "./components/footer";
import BlogPost from "./components/blog-post";
import { CustomCursor } from "./components/custom-cursor";
import { MobileLayout } from "./components/mobile-layout";
import { isMobileDevice } from "./utils/lib";

// Scroll to hash component
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Always scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Then handle hash navigation if present
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);
  
  return null;
};

// Main Layout
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div className="relative z-0 bg-primary">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <ComputerShowcase />
      <Tech />
      <Works />
      <div style={{ backgroundColor: '#000000' }}>
        <Feedbacks />
      </div>

      {/* Contact */}
      <div className="relative z-0" style={{ backgroundColor: '#000000' }}>
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  );
};

// App
const App = () => {
  useEffect(() => {
    // Force scroll to top on initial app mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
