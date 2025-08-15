import { motion } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "../constants";

export const WorksMobile = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-2">I Miei Progetti</h2>
          <p className="text-gray-400 text-sm">Alcuni dei miei lavori più importanti</p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800"
            >
              <div
                onClick={() => toggleProject(index)}
                className="cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedProject === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                    <h3 className="text-white font-bold text-lg">{project.name}</h3>
                  </div>
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expandedProject === index ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400 text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.source_code_link && (
                      <a
                        href={project.source_code_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-2 px-4 rounded text-sm font-medium transition-colors"
                      >
                        Codice
                      </a>
                    )}
                    {project.live_site_link && (
                      <a
                        href={project.live_site_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded text-sm font-medium transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};