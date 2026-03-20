import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tag: string;
  colSpan: string;
  rowSpan: string;
  delay: number;
  glowColor: string;
}

export default function ProjectCard({ title, description, imageSrc, tag, colSpan, rowSpan, delay, glowColor }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`${colSpan} ${rowSpan} bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group hover:border-neutral-700 transition-colors cursor-pointer overflow-hidden relative`}
    >
      <div className="z-10 relative">
        <p className="text-xs text-blue-400 font-mono mb-2 uppercase">{tag}</p>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-neutral-400 leading-tight">{description}</p>
      </div>
      
      <div className="mt-4 w-full h-40 rounded-xl overflow-hidden border border-neutral-800 z-10 relative shadow-xl">
         <img 
           src={imageSrc} 
           alt={title} 
           className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
         />
      </div>
      
      {/* Dynamic Background Glow */}
      <div className={`absolute bottom-0 right-0 w-32 h-32 ${glowColor} blur-[50px] transition-colors duration-500 rounded-full`} />
    </motion.div>
  );
}