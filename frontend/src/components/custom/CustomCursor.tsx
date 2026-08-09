import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, label, select, textarea, [tabindex]");
      const isGrab = target.closest("[class*='cursor-grab']");
      setIsHovering(!!isClickable && !isGrab);
      setIsGrabbing(!!isGrab);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animate = () => {
      const speed = 0.12;
      ringX += (dotX - ringX) * speed;
      ringY += (dotY - ringY) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      animFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#3b82f6",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? "0" : "1",
          transition: "opacity 0.3s, scale 0.2s",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.5)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? "1.5" : isGrabbing ? "0.6" : "1",
          transition: "opacity 0.3s, scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          mixBlendMode: isHovering ? "difference" : "normal",
        }}
      />
    </>
  );
}
