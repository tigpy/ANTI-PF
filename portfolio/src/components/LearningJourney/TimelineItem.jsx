import { memo } from "react";
import { m } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "var(--accent-green)";
  if (color === "#4CC9F0") return "var(--accent-teal)";
  if (color === "#FF9900") return "var(--accent-orange)";
  return color;
};

const TimelineItem = ({ item, index, isLast }) => {
  const isLeft = index % 2 === 0;
  const displayAccent = getThemeColor(item.accent);

  const statusStyle = {
    Pursuing: {
      bg: "color-mix(in srgb, var(--accent-orange) 8%, transparent)",
      border: "color-mix(in srgb, var(--accent-orange) 25%, transparent)",
      color: "var(--accent-orange)"
    },
    Learning: {
      bg: "color-mix(in srgb, var(--accent-teal) 8%, transparent)",
      border: "color-mix(in srgb, var(--accent-teal) 25%, transparent)",
      color: "var(--accent-teal)"
    },
    Completed: {
      bg: "color-mix(in srgb, var(--accent-green) 8%, transparent)",
      border: "color-mix(in srgb, var(--accent-green) 25%, transparent)",
      color: "var(--accent-green)"
    },
  };
  const s = statusStyle[item.status] || statusStyle.Learning;

  return (
    <m.div
      variants={staggerItem}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card — takes up half the width on desktop */}
      <div className={`flex-1 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <m.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6 rounded-2xl border border-border-color transition-all duration-300 hover:border-[var(--card-hover-accent)] hover:shadow-[3px_3px_0px_var(--text-primary)]"
          style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", "--card-hover-accent": displayAccent }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              style={{
                background: `color-mix(in srgb, ${displayAccent} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${displayAccent} 25%, transparent)`,
                color: displayAccent
              }}
            >
              {item.year}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
            >
              {item.status}
            </span>
          </div>

          <h3 className="text-text-primary font-bold font-poppins text-base mb-2">
            {item.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {item.description}
          </p>
        </m.div>
      </div>

      {/* Centre dot — desktop only */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <div
          className="w-4 h-4 rounded-full border-2 border-bg-primary"
          style={{
            background: displayAccent,
            boxShadow: `0 0 10px color-mix(in srgb, ${displayAccent} 40%, transparent)`
          }}
        />
      </div>

      {/* Empty half — desktop spacer */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </m.div>
  );
};

export default memo(TimelineItem);
