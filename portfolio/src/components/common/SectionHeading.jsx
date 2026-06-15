import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeUp } from "../../animations/fadeUp";
import DecryptText from "./DecryptText";

/**
 * SectionHeading — consistent heading used by every section.
 *
 * Props:
 *   title      — main heading text
 *   subtitle   — optional subheading / descriptor line
 *   align      — "left" | "center" (default: "center")
 *   accent     — "#1E6F44" | "#2B6282" (default: "#1E6F44")
 *   className
 */
const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  accent = "var(--accent-green)",
  className = "",
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <m.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col gap-3 mb-10 ${alignClass} ${className}`}
    >
      {/* Eyebrow line */}
      <div className="flex items-center gap-3">
        {align === "center" && (
          <div className="h-px w-8 rounded-full" style={{ backgroundColor: accent }} />
        )}
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase font-mono"
          style={{ color: accent }}
        >
          {subtitle || ""}
        </span>
        {align === "center" && subtitle && (
          <div className="h-px w-8 rounded-full" style={{ backgroundColor: accent }} />
        )}
      </div>

      {/* Main title */}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-poppins leading-tight">
        <DecryptText text={title} />
      </h2>

      {/* Underline accent bar */}
      <div
        className="h-1 w-16 rounded-full mt-1"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
        }}
      />
    </m.div>
  );
};

export default SectionHeading;
