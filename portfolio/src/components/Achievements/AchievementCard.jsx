import { motion } from "framer-motion";
import { Users, Video, Shield, Award } from "lucide-react";
import { staggerItem } from "../../animations/staggerCards";

const ICON_MAP = { Users, Video, Shield, Award };

const AchievementCard = ({ achievement }) => {
  const Icon = ICON_MAP[achievement.icon] || Award;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative p-7 rounded-2xl border border-white/10 overflow-hidden group transition-all duration-300 hover:border-[#00FF9D]/30 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)]"
      style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${achievement.accent}15 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: `${achievement.accent}12`,
          border: `1px solid ${achievement.accent}25`,
        }}
      >
        <Icon size={22} style={{ color: achievement.accent }} />
      </div>

      {/* Content */}
      <h3 className="text-white font-bold font-poppins text-lg mb-3 group-hover:text-[#00FF9D] transition-colors duration-300">
        {achievement.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {achievement.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${achievement.accent}, transparent)` }}
      />
    </motion.div>
  );
};

export default AchievementCard;
