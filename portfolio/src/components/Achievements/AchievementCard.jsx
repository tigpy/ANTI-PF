import { motion } from "framer-motion";
import { Users, Video, Shield, Award } from "lucide-react";
import { staggerItem } from "../../animations/staggerCards";

const ICON_MAP = { Users, Video, Shield, Award };

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "#1E6F44";
  if (color === "#4CC9F0") return "#2B6282";
  if (color === "#FF9900") return "#C25E29";
  return color;
};

const AchievementCard = ({ achievement }) => {
  const Icon = ICON_MAP[achievement.icon] || Award;
  const displayAccent = getThemeColor(achievement.accent);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative p-7 rounded-2xl border border-[#181A1B]/12 overflow-hidden group transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B]"
      style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)" }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${displayAccent}15 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: `${displayAccent}12`,
          border: `1px solid ${displayAccent}25`,
        }}
      >
        <Icon size={22} style={{ color: displayAccent }} />
      </div>

      {/* Content */}
      <h3 className="text-[#181A1B] font-bold font-poppins text-lg mb-3 group-hover:text-[#1E6F44] transition-colors duration-300">
        {achievement.title}
      </h3>
      <p className="text-[#5C615D] text-sm leading-relaxed">
        {achievement.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${displayAccent}, transparent)` }}
      />
    </motion.div>
  );
};

export default AchievementCard;
