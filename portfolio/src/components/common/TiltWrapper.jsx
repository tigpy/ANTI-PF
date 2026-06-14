import { useState, useRef, useEffect } from "react";

const TiltWrapper = ({ children, className = "", maxRotation = 8, disabled = false }) => {
  const cardRef = useRef(null);
  const highlightRef = useRef(null);

  // Check if device is mobile (no pointer capabilities) to disable tilt
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (disabled || isMobile) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotations based on mouse position relative to center (-0.5 to 0.5)
    const rx = -(y / rect.height - 0.5) * maxRotation;
    const ry = (x / rect.width - 0.5) * maxRotation;

    // Apply rotation instantly (disable transition) for maximum lag-free responsiveness
    cardRef.current.style.transition = "none";
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`;

    // Directly update spotlight overlay style in DOM
    if (highlightRef.current) {
      highlightRef.current.style.opacity = "1";
      highlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
    }
  };

  const handleMouseEnter = () => {
    if (highlightRef.current) {
      highlightRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (highlightRef.current) {
      highlightRef.current.style.opacity = "0";
    }
    if (cardRef.current) {
      // Smooth snap back when mouse leaves
      cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {/* Reflection highlight overlay (always in DOM, opacity toggled directly) */}
      <div
        ref={highlightRef}
        className="absolute inset-0 pointer-events-none z-20 rounded-inherit opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 0px 0px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default TiltWrapper;
