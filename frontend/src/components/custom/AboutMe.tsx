import { Github, Linkedin } from "lucide-react";
import self from "../../assets/self.jpg";

export default function AboutMe() {
  return (
    <section id="about" className="py-24 mt-12 mb-24 border-t border-neutral-300 dark:border-neutral-900 transition-colors duration-500">
      <div className="flex flex-col md:flex-row gap-16 items-center md:items-start">
        
        <div className="relative flex-shrink-0 mt-8 md:mt-0">
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-8 bg-black dark:bg-[#070707] text-white px-4 py-2 text-xl md:text-2xl font-black tracking-widest uppercase border-2 border-black dark:border-neutral-800 z-10 shadow-2xl transition-colors">
            HARSH
          </div>
          
          <div className="w-64 h-64 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-800 relative grayscale hover:grayscale-0 transition-all duration-700 ease-out shadow-2xl">
            <img src={self} alt="Harsh Jha Placeholder" className="w-full h-full object-cover" />
          </div>

          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-8 bg-white text-black px-4 py-2 text-xl md:text-2xl font-black tracking-widest uppercase border-2 border-neutral-300 dark:border-white z-10 shadow-2xl transition-colors">
            JHA
          </div>
        </div>

        <div className="flex flex-col flex-grow md:pt-8">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6 uppercase tracking-tighter transition-colors">
            About Me
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light mb-10 max-w-2xl transition-colors">
            Skilled in React, Python, and modern web technologies with a strong commitment to building intuitive user experiences and writing efficient, maintainable code. Dedicated to turning ideas into real-world digital solutions and always eager to collaborate, learn, and grow through impactful full-stack projects.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 border border-neutral-400 dark:border-neutral-600 rounded-none text-sm font-bold tracking-widest uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300">
              <Github size={18} /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 border border-neutral-400 dark:border-neutral-600 rounded-none text-sm font-bold tracking-widest uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}