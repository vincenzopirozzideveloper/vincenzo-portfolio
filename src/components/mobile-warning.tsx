import { motion } from "framer-motion";

export const MobileWarning = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6"
    >
      <div className="max-w-md text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Sito Ottimizzato per Desktop
          </h1>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            Questo portfolio è stato progettato per offrire la migliore esperienza su schermi più grandi con effetti 3D e animazioni avanzate.
          </p>
          
          <p className="text-gray-400 text-sm">
            Per una visualizzazione ottimale, ti consigliamo di visitare il sito da desktop o tablet.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Versione Mobile Semplificata</h3>
            <p className="text-xs text-gray-400">
              Qui sotto troverai una versione ottimizzata per dispositivi mobili senza effetti 3D.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};