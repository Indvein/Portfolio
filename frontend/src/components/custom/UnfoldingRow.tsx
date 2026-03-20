import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UnfoldingRowProps {
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
}

export default function UnfoldingRow({ 
  title, 
  category, 
  imageSrc, 
  description,
  liveLink,
  githubLink
}: UnfoldingRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-neutral-300 dark:border-neutral-800 py-8 cursor-pointer group transition-colors duration-500" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex justify-between items-center px-4">
        <h2 className="text-4xl md:text-6xl font-black text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors duration-500 tracking-tighter">
          {title}
        </h2>
        <span className="text-sm font-mono text-neutral-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-500 uppercase">
          {category}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="overflow-hidden"
          >
            <div className="pt-10 pb-4 px-4 flex flex-col md:flex-row gap-10 items-center">
              
              {/* Image */}
              <div className="w-full md:w-1/2 h-72 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 relative shadow-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-4 transition-colors">
                <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay z-10 pointer-events-none"></div>
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-105" 
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light transition-colors">
                  {description}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex gap-4">
                  {liveLink && (
                    <a 
                      href={liveLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-semibold text-sm"
                    >
                      Live Demo
                    </a>
                  )}

                  {githubLink && (
                    <a 
                      href={githubLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full border border-neutral-500 hover:border-black dark:hover:border-white transition-colors font-semibold text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}