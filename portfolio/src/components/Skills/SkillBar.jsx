import { motion } from "framer-motion";

const SkillBar = ({ name, level }) => {
  const getBarColor = (lvl) => {
    if (lvl >= 75) return "from-[#1E6F44] to-[#2B6282]"; // Green to Blue
    if (lvl >= 55) return "from-[#2B6282] to-[#1E6F44]/60";
    return "from-[#2B6282]/80 to-[#2B6282]/40";
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-[#5C615D] group-hover:text-[#181A1B] transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono font-bold text-[#1E6F44]">
          {level}%
        </span>
      </div>

      {/* Track */}
      <div className="h-2 w-full rounded-full bg-[#181A1B]/8 overflow-hidden">
        {/* Fill */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(level)}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            boxShadow: level >= 75 ? "0 0 6px rgba(30,111,68,0.15)" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
