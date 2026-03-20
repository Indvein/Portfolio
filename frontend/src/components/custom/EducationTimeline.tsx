import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import college from "../../assets/college.jpg";
import school from "../../assets/school.avif";

function UnrollingTimelineItem({ item, index }: { item: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.2 }} className="mb-12 last:mb-0 relative group cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="absolute -left-9.25 md:-left-13.25 top-1.5 w-3 h-3 bg-neutral-300 dark:bg-neutral-800 border-2 border-white dark:border-[#070707] rounded-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300" />

      <div className="py-2">
        <p className="text-xs font-mono text-neutral-500 mb-2 tracking-widest">{item.year}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-500 leading-tight">
          {item.title}
        </h3>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <div className="pt-4 pb-6">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light mb-6 flex items-center gap-2 transition-colors">
                <span className="text-blue-500">📍</span> {item.subtitle}
              </p>
              {item.imageSrc && (
                <div className="w-full max-w-lg h-56 rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-800 relative shadow-2xl transition-colors">
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src={item.imageSrc} alt={item.subtitle} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EducationTimeline() {
  const journey = [
    { year: "2022 — 2026", title: "Bachelor of Technology in Information Technology", subtitle: "JSS Academy of Technical Education , Noida", imageSrc: college },
    { year: "2009 — 2022", title: "Highschool and Junior College", subtitle: "DAV Public School , Brijh Vihar", imageSrc: school }
  ];

  return (
    <section id="education" className="py-24 border-t border-neutral-300 dark:border-neutral-900 mt-24 transition-colors duration-500">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter sticky top-32 transition-colors">
            Education <br className="hidden md:block"/> & Journey
          </h2>
        </div>
        <div className="md:w-2/3 relative border-l border-neutral-300 dark:border-neutral-800 ml-4 md:ml-0 pl-8 md:pl-12 transition-colors">
          {journey.map((item, index) => (
            <UnrollingTimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}