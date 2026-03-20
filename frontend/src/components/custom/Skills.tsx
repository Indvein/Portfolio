import { useState } from "react";
import { motion } from "framer-motion";
import { SiReact, SiPython, SiTypescript, SiNodedotjs, SiTailwindcss, SiFramer, SiMongodb, SiMysql, SiTensorflow, SiGit, SiCplusplus } from "react-icons/si";

// 1. Create a mini-component so each card tracks its own hover state independently
function SkillCard({ skill, index }: { skill: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col items-center gap-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 bg-neutral-100 dark:bg-neutral-900/30 rounded-2xl border border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-400 dark:group-hover:border-neutral-700 shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-2">
        <skill.Icon
          className="text-5xl md:text-6xl text-neutral-400 dark:text-neutral-600 transition-colors duration-500"
          style={{ color: isHovered ? skill.hex : undefined }} // Forces the color change instantly, then deletes it when hover ends
        />
      </div>
      <span className="text-xs font-mono text-neutral-600 group-hover:text-black dark:group-hover:text-neutral-300 transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  // 2. Swapped the Tailwind classes for pure hex codes
  const skills = [
    { name: "React.js", Icon: SiReact, hex: "#61DAFB" },
    { name: "Python", Icon: SiPython, hex: "#3776AB" },
    { name: "TypeScript", Icon: SiTypescript, hex: "#3178C6" },
    { name: "Node.js", Icon: SiNodedotjs, hex: "#339933" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, hex: "#06B6D4" },
    { name: "Framer Motion", Icon: SiFramer, hex: "#0055FF" },
    { name: "MongoDB", Icon: SiMongodb, hex: "#47A248" },
    { name: "SQL", Icon: SiMysql, hex: "#4479A1" },
    { name: "Machine Learning", Icon: SiTensorflow, hex: "#FF6F00" },
    { name: "Git", Icon: SiGit, hex: "#F05032" },
    { name: "C/C++", Icon: SiCplusplus, hex: "#00599C" },
  ];

  return (
    <section id="skills" className="py-24 border-t border-neutral-300 dark:border-neutral-900 mt-12 transition-colors duration-500">
      <p className="text-xs font-mono text-neutral-500 mb-12 uppercase tracking-widest text-center md:text-left">
        Technical Arsenal
      </p>

      <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}