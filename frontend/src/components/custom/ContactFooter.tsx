import { useState } from "react";
import { motion } from "framer-motion";
import { SiInstagram, SiX, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("SENDING...");
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatusMessage("MESSAGE SENT.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatusMessage(""), 3000);
      } else {
        setStatusMessage("ERROR SENDING MESSAGE.");
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatusMessage("SERVER ERROR.");
      setTimeout(() => setStatusMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { name: "Instagram", Icon: SiInstagram, href: "https://www.instagram.com/harsh_2004/?hl=en" },
    { name: "Twitter", Icon: SiX, href: "https://x.com/ind_vein" },
    { name: "LinkedIn", Icon: FaLinkedin, href: "https://www.linkedin.com/in/harsh-jha-72a6562a6/" },
    { name: "GitHub", Icon: SiGithub, href: "https://github.com/Indvein" },
  ];

  return (
    <section id="contact" className="py-24 border-t border-neutral-300 dark:border-neutral-900 mt-12 transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8">
        <div className="w-full md:w-3/5 max-w-2xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-3 transition-colors">
            CONTACT ME
          </motion.h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 font-light mb-8 transition-colors">
            Inform me if you want more information about me.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black dark:text-white tracking-wide transition-colors">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="alex" required className="w-full bg-transparent border border-neutral-300 dark:border-neutral-800 p-3 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black dark:text-white tracking-wide transition-colors">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="alex@example.com" required className="w-full bg-transparent border border-neutral-300 dark:border-neutral-800 p-3 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors rounded-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black dark:text-white tracking-wide transition-colors">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your portfolio is amazing!" required rows={4} className="w-full bg-transparent border border-neutral-300 dark:border-neutral-800 p-3 text-sm text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors rounded-none resize-y" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white py-3 mt-2 text-base font-black uppercase tracking-widest hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-all duration-300 cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed">
              {statusMessage || "SUBMIT"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-2/5 flex flex-row md:flex-col items-center justify-center gap-10 md:gap-12 md:pt-4">
          {socials.map((social, index) => (
            <motion.a key={index} href={social.href} target="_blank" rel="noreferrer" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors" aria-label={social.name}>
              <social.Icon className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-mono text-neutral-500 dark:text-neutral-600 uppercase tracking-widest mt-24 pt-8 border-t border-neutral-300 dark:border-neutral-900 gap-4 transition-colors">
        <p>{new Date().getFullYear()} Harsh Jha | All Rights Reserved ©</p>
        <p>Harsh.Dev™</p>
      </div>
    </section>
  );
}