import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { menu, close } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Navbar
export const Navbar = () => {
  // state variables
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-5 fixed top-0 z-20 backdrop-blur-md border-b border-[#915eff]/20 shadow-lg"
      )}
      style={{ 
        backgroundColor: 'rgba(2, 2, 2, 0.8)',
        boxShadow: '0 4px 30px rgba(145, 94, 255, 0.1)'
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Availability Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 bg-[#915eff] rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-[#915eff] rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Available for project</span>
            <span className="text-white/50 text-xs">EARLY FEB 2025</span>
          </div>
        </div>

        {/* Nav Links (Desktop) */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {NAV_LINKS.map((link) => (
            <li
              key={link.id}
              className={cn(
                active === link.title ? "text-white" : "text-secondary",
                "hover:text-white text-[18px] font-medium cursor-pointer"
              )}
              onClick={() => !link.link && setActive(link.title)}
            >
              {link.link ? (
                <a href={link.link} target="_blank" rel="noreferrer noopener">
                  {link.title}
                </a>
              ) : (
                <a href={`#${link.id}`}>{link.title}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="Menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={cn(
              !toggle ? "hidden" : "flex",
              "p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl"
            )}
          >
            {/* Nav Links (Mobile) */}
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.id}
                  className={cn(
                    active === link.title ? "text-white" : "text-secondary",
                    "font-poppins font-medium cursor-pointer text-[16px]"
                  )}
                  onClick={() => {
                    !link.link && setToggle(!toggle);
                    !link.link && setActive(link.title);
                  }}
                >
                  {link.link ? (
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a href={`#${link.id}`}>{link.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
