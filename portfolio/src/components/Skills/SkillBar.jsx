import { motion } from "framer-motion";

const SkillBar = ({ name, level }) => {
  const getBarColor = (lvl) => {
    if (lvl >= 75) return "from-[#00FF9D] to-[#4CC9F0]";
    if (lvl >= 55) return "from-[#4CC9F0] to-[#00FF9D]/60";
    return "from-[#4CC9F0]/80 to-[#4CC9F0]/40";
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color: "#00FF9D" }}>
          {level}%
        </span>
      </div>

      {/* Track */}
      <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
        {/* Fill — re-animates every time it mounts (tab switch = remount) */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(level)}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            boxShadow: level >= 75 ? "0 0 8px rgba(0,255,157,0.4)" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
