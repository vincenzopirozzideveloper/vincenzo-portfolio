import { motion } from "framer-motion";
import { SERVICES } from "../constants";

export const AboutMobile = () => {
  return (
    <section className="bg-white min-h-screen py-12 px-4" id="about">
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-2">
            Professional Profile
          </p>
          <h2 className="text-2xl font-bold text-gray-900">About</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4 mb-12"
        >
          <p className="text-gray-700 text-base leading-relaxed">
            Senior Full Stack Developer con expertise in architetture backend e pratiche DevSecOps. 
            Il mio approccio alla risoluzione di problemi complessi enfatizza soluzioni eleganti e mantenibili.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Con esperienza estesa nell'ecosistema PHP/Laravel, framework JavaScript moderni 
            come React e Vue.js, e tecnologie di containerizzazione come Docker e Kubernetes.
          </p>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Specializzazioni</h3>
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-gray-800 font-medium text-sm">
                {service.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};