import { useState, useRef } from "react";
import { Music, Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-3xl md:rounded-full px-6 py-3 flex flex-col md:flex-row md:items-center md:gap-8 shadow-xl transition-all duration-300">
      
      {/* Top Row for Mobile & Desktop */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <span className="font-bold tracking-wider text-black dark:text-white">
          harsh.dev
        </span>
        
        {/* Mobile Actions: Theme, Music, Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-black dark:text-white transition-colors">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button onClick={toggleMusic} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full transition-colors">
            <Music size={16} className={isPlaying ? "text-red-500" : "text-black dark:text-white"} /> 
          </button>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-black dark:text-white transition-colors">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
        <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About</a>
        <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
        <a href="#education" className="hover:text-black dark:hover:text-white transition-colors">Education</a>
        <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
      </div>
      
      <audio ref={audioRef} src="/bg-music.mp3" loop />

      {/* Desktop Actions: Theme & Music */}
      <div className="hidden md:flex items-center gap-3">
        <button onClick={toggleTheme} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white transition-colors w-9 h-9 rounded-full cursor-pointer">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button onClick={toggleMusic} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-9 h-9 rounded-full cursor-pointer">
          <Music size={16} className={`transition-colors duration-300 ${isPlaying ? "text-red-500" : "text-black dark:text-white"}`} /> 
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 pb-2 text-sm text-neutral-600 dark:text-neutral-400 font-medium md:hidden border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors w-full text-center py-2">About</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors w-full text-center py-2">Projects</a>
          <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors w-full text-center py-2">Education</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black dark:hover:text-white transition-colors w-full text-center py-2">Contact</a>
        </div>
      )}
    </nav>
  );
}