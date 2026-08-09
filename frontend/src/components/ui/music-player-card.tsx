import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

interface MusicPlayerCardProps {
  isVisible: boolean;
  onClose: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  onAutoPlay: () => void;
  currentTrack: Track;
  onNext: () => void;
  onPrev: () => void;
  currentTime: number;
  duration: number;
}

const MusicPlayerCard = ({ 
  isVisible, onClose, isPlaying, togglePlay, onAutoPlay, currentTrack, onNext, onPrev, currentTime, duration 
}: MusicPlayerCardProps) => {
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    
    if (isVisible) {
      onAutoPlay();
      
      hideTimer = setTimeout(() => {
        onClose();
      }, 8000);
    }

    return () => clearTimeout(hideTimer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]"
        >
          <div className="w-[320px] p-5 bg-[#0a0a0a] rounded-3xl shadow-2xl border border-neutral-800 text-white flex flex-col gap-5 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none" />

            <div className="flex gap-4 items-center relative z-10">
              <div className="w-[60px] h-[60px] rounded-2xl shrink-0 shadow-lg shadow-black/50 overflow-hidden bg-neutral-900 border border-neutral-800">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="font-bold text-[17px] leading-tight truncate">{currentTrack.title}</div>
                <div className="text-sm text-neutral-400 font-medium truncate">{currentTrack.artist}</div>
              </div>

              <div className="flex gap-[3px] items-end h-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className={`w-1 bg-white rounded-t-sm ${isPlaying ? 'animate-[bounce_1s_infinite]' : ''}`}
                    style={{ 
                      animationDelay: `${i * 0.15}s`, 
                      height: isPlaying ? undefined : '4px' 
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="w-full h-1 bg-neutral-800 rounded-full relative">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }} />
                <div className="w-3 h-3 bg-white rounded-full shadow absolute top-1/2 -translate-y-1/2" style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 6px)` }} />
              </div>

              <div className="flex justify-between items-center mt-3">
                <button onClick={onPrev} className="text-neutral-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
                  </svg>
                </button>
                
                <button onClick={togglePlay} className="text-white hover:scale-105 transition-transform active:scale-95">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.596 8.697l-6.363 3.692c-.54.314-1.233-.065-1.233-.696V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                  )}
                </button>
                
                <button onClick={onNext} className="text-neutral-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayerCard;
