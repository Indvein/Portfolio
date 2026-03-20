import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import stockpie1 from "../../assets/stockpie1.png";
import folost1 from "../../assets/folost1.png";
import plant1 from "../../assets/plant2.png";

export default function ProjectSection() {
  const projects = [
    {
      title: "Folost",
      category: "FULL-STACK",
      imageSrc: folost1,
      description: "A Lost & Found platform with a clean UI that helps users report and recover items efficiently.",
      liveLink: "https://folost.vercel.app/",
    },
    {
      title: "Stockpie",
      category: "FULL-STACK",
      imageSrc: stockpie1,
      description: "A stock portfolio analysis tool that tracks data, visualizes trends, and helps users understand investments.",
      githubLink: "https://github.com/Indvein/Stockpie",
    },
    {
      title: "Plant Disease AI",
      category: "MACHINE LEARNING",
      imageSrc: plant1,
      description: "A machine learning app that detects plant diseases from images and helps with quick diagnosis.",
      githubLink: "https://github.com/Indvein/Plant-Disease-Detection-and-treatment",
    }
  ];

  return (
    <motion.div
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mb-24 scroll-mt-32"
    >
      <p className="text-xs font-mono text-neutral-500 mb-8 px-4 uppercase tracking-widest text-center md:text-left">
        Selected Work
      </p>

      {/* The Stacked Row Container */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 flex flex-col">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 px-4 border-b border-neutral-200 dark:border-neutral-800 transition-colors"
          >
            
            {/* Left Side: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-1">
              <span className="text-xs font-mono text-blue-500 dark:text-blue-400 mb-4 uppercase tracking-wider">
                {proj.category}
              </span>
              
              <h3 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight">
                {proj.title}
              </h3>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8 max-w-lg">
                {proj.description}
              </p>
              
              {/* Dynamic Buttons */}
              {proj.liveLink ? (
                <a 
                  href={proj.liveLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-black dark:text-white uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
                >
                  Live Site <ArrowUpRight size={18} />
                </a>
              ) : (
                <a 
                  href={proj.githubLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-black dark:text-white uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
                >
                  View Code <Github size={18} />
                </a>
              )}
            </div>

            {/* Right Side: Image Display */}
            <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl aspect-video flex items-center justify-center p-8 overflow-hidden order-1 md:order-2">
              <img 
                src={proj.imageSrc} 
                alt={proj.title} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
            
          </div>
        ))}
      </div>
    </motion.div>
  );
}