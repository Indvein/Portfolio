import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Music, Menu, X, Sun, Moon } from 'lucide-react';
import MusicPlayerCard from '../ui/music-player-card';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  // Dynamic Logo State
  const faces = [
    "( ͡❛ ⏥ ͡❛)",
    "( ˶° ᗝ °˶ )",
    "(⌐■_■)",
    "¯\\_(ツ)_/¯",
    "ʕ•ᴥ•ʔ",
    "(ง'̀-'́)ง",
    "(~˘▾˘)~"
  ];
  const [faceIndex, setFaceIndex] = useState(0);

  // Audio & Mobile State
  const tracks = [
    { title: "Golden Hour", artist: "JVKE", src: "/Golden Hour.mp3", cover: "/Golden Hour.png" },
    { title: "Looser", artist: "Tame Impala", src: "/Looser -Tame impala.mp3", cover: "/Looser.png" }
  ];

  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  // GSAP Refs
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Dynamic colors based on your theme prop
  const baseColor = theme === 'dark' ? '#ffffff' : '#000000'; // Expanding hover circle
  const pillColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'; // Resting pill background
  const hoveredPillTextColor = theme === 'dark' ? '#000000' : '#ffffff'; // Text on hover
  const pillTextColor = theme === 'dark' ? '#ffffff' : '#000000'; // Resting text

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setIsMusicPlayerOpen(false);
    } else {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
      setIsMusicPlayerOpen(true);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleAutoPlay = () => {
    if (!isPlaying) {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    if (document.fonts) document.fonts.ready.then(layout).catch(() => {});

    return () => window.removeEventListener('resize', onResize);
  }, [theme]); // Re-run layout if theme changes

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: 'power3.easeOut', overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: 'power3.easeOut', overwrite: 'auto' });
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: pillTextColor,
    ['--nav-h']: '42px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '4px'
  } as React.CSSProperties;

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
      <nav
        className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-3xl md:rounded-full px-4 py-3 flex items-center justify-between shadow-xl transition-all duration-300"
        aria-label="Primary"
        style={cssVars}
      >
        {/* Logo */}
        <a 
          href="/"
          className="font-bold tracking-wider text-black dark:text-white mr-auto md:mr-8 ml-2 whitespace-nowrap cursor-pointer transition-opacity hover:opacity-70 select-none"
          onClick={(e) => {
            // Optional: smooth scroll to top instead of hard reload if on same page
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onMouseEnter={() => setFaceIndex((prev) => (prev + 1) % faces.length)}
        >
          {faces[faceIndex]}
        </a>

        {/* Desktop GSAP Links */}
        <div className="relative items-center rounded-full hidden md:flex mr-8" style={{ height: 'var(--nav-h)' }}>
          <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: 'var(--pill-gap)' }}>
            {navItems.map((item, i) => {
              const basePillClasses = "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[14px] whitespace-nowrap cursor-pointer px-0";
              const pillStyle: React.CSSProperties = {
                background: 'transparent',
                color: 'var(--pill-text)',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{ background: 'var(--base)', willChange: 'transform' }}
                      aria-hidden="true"
                      ref={el => { circleRefs.current[i] = el; }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Audio Element */}
        <audio 
          ref={audioRef} 
          src={currentTrack.src} 
          onEnded={handleNextTrack}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleTheme} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white transition-colors w-9 h-9 rounded-full cursor-pointer">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={toggleMusic} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-9 h-9 rounded-full cursor-pointer">
            <Music size={16} className={`transition-colors duration-300 ${isPlaying ? "text-red-500" : "text-black dark:text-white"}`} />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-black dark:text-white transition-colors">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={toggleMusic} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full transition-colors">
            <Music size={16} className={isPlaying ? "text-red-500" : "text-black dark:text-white"} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-black dark:text-white transition-colors">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[4.5rem] left-0 w-full bg-white/95 dark:bg-[#111]/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 flex flex-col gap-2 md:hidden shadow-xl transition-all">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      </div>
      <MusicPlayerCard 
        isVisible={isMusicPlayerOpen} 
        onClose={() => setIsMusicPlayerOpen(false)} 
        isPlaying={isPlaying}
        togglePlay={handleTogglePlay}
        onAutoPlay={handleAutoPlay}
        currentTrack={currentTrack}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        currentTime={currentTime}
        duration={duration}
      />
    </>
  );
}