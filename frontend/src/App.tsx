import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Navbar from "./components/layout/Navbar";
import AboutMe from "./components/custom/AboutMe";
import Skills from "./components/custom/Skills";
import ProjectSection from "./components/custom/ProjectSection";
import EducationTimeline from "./components/custom/EducationTimeline";
import PublicationsSection from "./components/custom/PublicationsSection";
import ContactFooter from "./components/custom/ContactFooter";
import Lanyard from "./components/custom/Lanyard";
import Threads from "./components/ui/Threads";
import Loader from "./components/custom/Loader";
import ScrollProgress from "./components/custom/ScrollProgress";
import ResumeModal from "./components/custom/ResumeModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false); // <-- 2. Add loading state

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") || "dark";
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <ScrollProgress />
      {/* 3. Drop the Loader right at the top */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* 4. We hide the scrollbar while loading so the user can't scroll the page behind the loader */}
      <div className={`min-h-screen bg-neutral-50 dark:bg-[#070707] text-neutral-900 dark:text-neutral-50 font-sans selection:bg-blue-500/30 selection:text-white pb-12 overflow-x-hidden transition-colors duration-500 ${isLoading ? "h-screen overflow-hidden" : ""}`}>
        
        <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden">
          <Threads
            amplitude={1.2}
            distance={0.1}
            enableMouseInteraction={true}
            color={theme === "dark" ? [1, 1, 1] : [0, 0, 0]}
          />
        </div>

        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="relative z-10 max-w-6xl mx-auto pt-32 px-6">
          <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[50vh] md:min-h-[85vh] mb-10 md:mb-20">
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full md:w-1/2 z-10 pt-8 md:pt-0 pointer-events-none flex flex-col items-start">
              <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium mb-2 pointer-events-auto transition-colors">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight mb-2 pointer-events-auto transition-colors">Harsh Jha</h1>
              <h2 className="text-3xl md:text-4xl text-neutral-600 dark:text-neutral-500 font-semibold tracking-tight mb-6 pointer-events-auto transition-colors">Software Developer</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-lg text-lg font-light mb-10 pointer-events-auto leading-relaxed transition-colors">I'm a BTech graduate focused on building clean, intuitive web apps with React and Python.</p>
              <div className="flex flex-wrap items-center gap-4 mb-8 pointer-events-auto">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >View Resume</button>
                <a
                  href="/resume.pdf"
                  download="Harsh_Jha_Resume.pdf"
                  className="px-8 py-3 bg-transparent text-black dark:text-white text-sm font-bold rounded-md border border-black dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >Download Resume</a>
              </div>
              <div className="flex items-center gap-5 pointer-events-auto">
                <a href="https://www.linkedin.com/in/harsh-jha-72a6562a6/" target="_blank" rel="noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"><FaLinkedin className="text-2xl" /></a>
                <a href="https://github.com/Indvein" target="_blank" rel="noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"><SiGithub className="text-2xl" /></a>
              </div>
            </motion.div>

            <div className="hidden md:flex relative md:w-1/2 md:h-[90vh] z-0 items-start justify-center pointer-events-none">
              <div className="w-full h-full scale-[0.8] md:scale-100 pointer-events-auto cursor-grab active:cursor-grabbing">
                {/* 5. Only mount the Lanyard if we are NOT loading, or let it mount behind the scenes.
                    Letting it mount behind the scenes is better so it's ready when the curtain lifts! */}
                <Lanyard position={[0, 0, 25]} gravity={[0, -40, 0]} />
              </div>
            </div>

          </div>
          <Skills />
          <AboutMe />
          <ProjectSection />
          <PublicationsSection />
          <EducationTimeline />
          <ContactFooter />
        </main>
      </div>
    </>
  );
}