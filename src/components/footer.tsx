import { Link } from "react-router-dom";

import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-8 border-t border-t-white/5"
      )}
      style={{ backgroundColor: '#020202' }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm font-medium flex" 
           style={{ fontFamily: 'Inter, sans-serif' }}>
          &copy; Vincenzo {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden flex-row sm:flex gap-10">
          {SOCIALS.map((social) => (
            <li
              key={social.name}
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Link to={social.link} target="_blank" rel="noreferrer noopener">
                <img 
                  src={social.icon} 
                  alt={social.name} 
                  className="h-6 w-6 invert opacity-80" 
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Footer;