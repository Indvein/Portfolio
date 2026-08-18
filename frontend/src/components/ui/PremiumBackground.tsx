import React from "react";
import { motion } from "framer-motion";

export const PremiumBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full bg-neutral-50 dark:bg-[#070707]">
      {/* Animated Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Floating Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none filter blur-[100px] opacity-60">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full mix-blend-multiply dark:mix-blend-screen bg-blue-400/30 dark:bg-blue-600/20"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 120, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full mix-blend-multiply dark:mix-blend-screen bg-purple-400/30 dark:bg-purple-600/20"
        />
      </div>

      {/* Radial fade out so it blends with the rest of the site at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/80 to-neutral-50 dark:via-[#070707]/80 dark:to-[#070707]" />
    </div>
  );
};
