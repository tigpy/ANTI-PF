import { useEffect, useState, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [visible, setVisible] = useState(false);
  const coordsRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const nodeRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Lag-follow spring settings for outer circle/crosshair
  const springConfig = { damping: 28, stiffness: 220, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 1. Detect if desktop with fine pointer device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(!window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const visibleRef = useRef(false);

  // 2. Track mouse position & window focus
  useEffect(() => {
    if (isMobile) return;

    let animFrame;
    const handleMove = (e) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      if (animFrame) cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Perform direct DOM updates for coordinates to avoid React re-renders
        if (coordsRef.current) {
          coordsRef.current.innerText = `${Math.round(e.clientX)}, ${Math.round(e.clientY)}`;
        }
      });
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const handleEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isMobile, mouseX, mouseY]);

  // 3. Detect hovering states via event delegation and apply direct DOM style modifications
  useEffect(() => {
    if (isMobile) return;

    const handleOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const isLink = target.closest("a, button, [role='button'], .cursor-pointer, input[type='submit']");
      const isInput = target.closest("input, textarea, select");

      let status = "SYS_OK";
      let color = "var(--accent-green)"; // Forest green / Teal
      let spinSpeed = "6s";
      let scale = "scale(1)";

      if (isInput) {
        status = "INPUT_ACT";
        color = "var(--accent-teal)"; // Blueprint blue / Teal blue
        spinSpeed = "2s";
        scale = "scale(0.8)";
      } else if (isLink) {
        status = "TARGET_LOCK";
        color = "var(--accent-orange)"; // Terracotta alert orange
        spinSpeed = "1.2s";
        scale = "scale(1.25)";
      }

      // A. Update status indicator text & color
      if (labelRef.current) {
        labelRef.current.style.color = color;
        labelRef.current.innerText = `[${status}]`;
      }

      // B. Update targeted DOM element path details
      if (nodeRef.current) {
        let nodeName = target.tagName.toLowerCase();
        if (target.id) {
          nodeName += `#${target.id}`;
        } else if (target.className && typeof target.className === 'string') {
          const firstClass = target.className.split(' ')[0];
          if (firstClass && !firstClass.includes('framer') && !firstClass.includes('motion') && !firstClass.includes('preserve-3d')) {
            nodeName += `.${firstClass}`;
          }
        }
        nodeRef.current.style.color = color;
        nodeRef.current.innerText = `[NODE: ${nodeName.slice(0, 18)}]`;
      }

      // C. Update radar circular scope and sweep styles directly
      if (ringRef.current) {
        ringRef.current.style.borderColor = color;
        ringRef.current.style.transform = scale;
        
        const sweep = ringRef.current.querySelector('.sweep-line');
        if (sweep) {
          sweep.style.borderTopColor = color;
          sweep.style.animationDuration = spinSpeed;
        }
        const dot = ringRef.current.querySelector('.center-dot');
        if (dot) {
          dot.style.backgroundColor = color;
        }
      }
    };

    window.addEventListener("mouseover", handleOver);
    return () => window.removeEventListener("mouseover", handleOver);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease-out" }}
    >
      {/* ── Inner Direct Dot ── */}
      <m.div
        className="fixed w-1.5 h-1.5 rounded-full bg-accent-green pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* ── Outer Tech Radar Scope (spring delayed positioning) ── */}
      <m.div
        className="fixed pointer-events-none flex items-center justify-center"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      >
        {/* Child container handles direct DOM scaling & colors safely without Framer conflicts */}
        <div
          ref={ringRef}
          className="relative w-8 h-8 rounded-full border border-accent-green flex items-center justify-center transition-transform duration-300"
          style={{ transform: "scale(1)" }}
        >
          {/* Radar Sweep sonar radius line */}
          <div className="absolute top-1/2 left-0 w-1/2 h-px border-t border-accent-green origin-right animate-radar-sweep sweep-line" />
          
          {/* Circular crosshair ticks */}
          <span className="absolute w-1.5 h-px bg-text-primary/15 -top-px" />
          <span className="absolute w-1.5 h-px bg-text-primary/15 -bottom-px" />
          <span className="absolute h-1.5 w-px bg-text-primary/15 -left-px" />
          <span className="absolute h-1.5 w-px bg-text-primary/15 -right-px" />

          {/* Core center ring anchor dot */}
          <div className="w-1 h-1 rounded-full bg-accent-green center-dot" />
        </div>
      </m.div>

      {/* ── Floating Diagnostic HUD Tags ── */}
      <m.div
        className="fixed flex flex-col font-mono pointer-events-none select-none text-[8px] tracking-wider"
        style={{
          left: cursorX,
          top: cursorY,
          x: 18,
          y: 12,
        }}
      >
        {/* State Indicator */}
        <span ref={labelRef} className="text-accent-green font-bold">
          [SYS_OK]
        </span>

        {/* Current targeted DOM Element Tag */}
        <span ref={nodeRef} className="text-text-muted mt-0.5 font-semibold">
          [NODE: body]
        </span>

        {/* Coordinates Readout (updated via direct DOM reference) */}
        <span className="text-text-muted/65 mt-0.5">
          [<span ref={coordsRef}>0, 0</span>]
        </span>
      </m.div>
    </div>
  );
};

export default CustomCursor;
