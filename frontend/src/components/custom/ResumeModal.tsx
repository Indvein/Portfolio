import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import resumeLocalUrl from "@/assets/Harsh_resume_new.pdf";

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, type: "spring", bounce: 0.15 }}
            className="relative z-10 w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f]"
            style={{ height: "min(90vh, 700px)" }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] shrink-0">
              <span className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
                Resume
              </span>
              <div className="flex items-center gap-1">
                <a
                  href={resumeLocalUrl}
                  download="Harsh_Jha_Resume.pdf"
                  className="p-2 rounded-md text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Download"
                >
                  <Download size={18} />
                </a>
                <a
                  href={resumeLocalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-md text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
                <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Close (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 w-full relative bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
              {/* Spinner shown behind the iframe until it loads */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-blue-500 animate-spin" />
                <span className="text-xs font-mono">Loading…</span>
              </div>
              {/* Local PDF Viewer */}
              <iframe
                key={isOpen ? "open" : "closed"}
                src={resumeLocalUrl}
                className="relative z-10 w-full h-full border-none"
                title="Harsh Jha Resume"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
