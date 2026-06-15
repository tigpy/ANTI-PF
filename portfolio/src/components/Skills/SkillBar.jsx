import React from "react";
import { m } from "framer-motion";

const SkillBar = React.memo(({ name, level }) => {
  const getBarColor = (lvl) => {
    if (lvl >= 75) return "from-accent-green to-accent-teal"; // Green to Teal/Blue
    if (lvl >= 55) return "from-accent-teal to-accent-green/60";
    return "from-accent-teal/80 to-accent-teal/40";
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono font-bold text-accent-green">
          {level}%
        </span>
      </div>

      {/* Track */}
      <div className="h-2 w-full rounded-full bg-border-color/10 overflow-hidden">
        {/* Fill */}
        <m.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(level)}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            boxShadow: level >= 75 ? "0 0 6px color-mix(in srgb, var(--accent-green) 15%, transparent)" : "none",
          }}
        />
      </div>
    </div>
  );
});

export default SkillBar;
