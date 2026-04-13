import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    
    const updateCounter = () => {
      const increment = Math.floor(Math.random() * 10) + 1; 
      current += increment;

      if (current >= 100) {
        current = 100;
        setCount(100);
        
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800); 
        }, 500);
      } else {
        setCount(current);
        setTimeout(updateCounter, Math.random() * 50 + 30); 
      }
    };

    updateCounter();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#070707] text-black dark:text-white"
        >
          <div className="text-7xl md:text-9xl font-black tracking-tighter tabular-nums">
            {count}%
          </div>
          <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <motion.div
              className="h-full bg-black dark:bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}