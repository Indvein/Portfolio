import { motion } from "framer-motion";
import college from "../../assets/college.jpg"
// You can replace this placeholder with your actual university image later!
const uniImage = {college}; 

export default function EducationCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="md:col-span-2 md:row-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 group hover:border-neutral-700 transition-colors cursor-default overflow-hidden relative flex flex-col justify-end"
    >
      {/* The Hidden Image that reveals on hover */}
      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        <img 
          src={college} 
          alt="University Campus" 
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* The Content */}
      <div className="z-20 relative transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
        <p className="text-xs text-neutral-400 font-mono mb-2 group-hover:text-neutral-300">2021 — 2025</p>
        <h3 className="text-2xl font-bold text-white mb-1">Bachelor of Technology</h3>
        <p className="text-sm text-neutral-400 font-medium mb-3">Computer Science and Engineering</p>
        
        {/* Extra details that fade in slightly on hover */}
        <div className="text-sm text-neutral-500 opacity-80 group-hover:opacity-100 group-hover:text-neutral-300 transition-all duration-500">
          <p>📍 Your University Name</p>
        </div>
      </div>
    </motion.div>
  );
}