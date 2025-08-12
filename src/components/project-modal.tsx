import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export type ProjectModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  image: string;
  onClose: () => void;
};

export const ProjectModal = ({ isOpen, title, description, image, onClose }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC and lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} details`}
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dimmed, blurred backdrop with project image */}
          <div
            className="absolute inset-0 overflow-hidden"
            onClick={onClose}
          >
            <img
              src={image}
              alt="Background preview"
              className="w-full h-full object-cover scale-105 filter blur-lg brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>

          {/* Content card */}
          <div className="relative h-full w-full flex items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={dialogRef}
              className="w-full max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                      {title}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">Project details</p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md px-2 py-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Foreground content over blurred bg */}
                <div className="relative">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={image}
                      alt={`${title} preview`}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>

                  <div className="px-5 py-4 sm:px-6 sm:py-6">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
