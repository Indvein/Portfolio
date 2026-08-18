import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import pub1 from "../../assets/publication1.png";

export default function PublicationsSection() {
  return (
    <motion.div
      id="publications"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mb-24 scroll-mt-32"
    >
      <p className="text-xs font-mono text-neutral-500 mb-8 px-4 uppercase tracking-widest text-center md:text-left">
        Research & Publications
      </p>

      <div className="border-t border-neutral-200 dark:border-neutral-800 flex flex-col">
        <div className="group flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 px-4 border-b border-neutral-200 dark:border-neutral-800 transition-colors">

          {/* Left: Text */}
          <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-200 dark:border-blue-800/50">
                IEEE
              </span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                Feb 2026
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 tracking-tight leading-tight">
              Plant Disease Detection and Treatment Using Generative AI
            </h3>

            <p className="text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6 max-w-lg">
              A study on Tomato and Chilli crops combining CNN/EfficientNet disease classification with a GenAI engine to generate chemical, organic, and prevention treatment guidelines — achieving 96.8% real-field accuracy.
            </p>

            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-8">
              <span className="text-neutral-800 dark:text-neutral-300 font-medium">Mayank Raj, Tarun Kumar Chatterjee, Piyush Bharti, </span>
              <span className="text-black dark:text-white font-bold">Harsh Jha</span>
              <span className="text-neutral-800 dark:text-neutral-300 font-medium">, Dipanshu Mohan, Pawandeep Kaur, Maansi Bharti</span>
            </p>

            <a
              href="https://ieeexplore.ieee.org/document/11636542"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-black dark:text-white uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
            >
              View on IEEE Xplore <ExternalLink size={18} />
            </a>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl aspect-video flex items-center justify-center p-8 overflow-hidden order-1 md:order-2">
            <img
              src={pub1}
              alt="IEEE Research Publication"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
