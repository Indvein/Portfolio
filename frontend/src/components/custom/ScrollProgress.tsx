import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    let target = 0;
    let animFrameId: number;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      target = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };

    const animate = () => {
      // Lerp: smoothly chase the target at ~10% per frame
      current += (target - current) * 0.1;
      if (barRef.current) {
        barRef.current.style.width = `${current}%`;
      }
      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          boxShadow: "0 0 8px rgba(59,130,246,0.6)",
        }}
      />
    </div>
  );
}
