import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";

const AboutCard = ({ icon: Icon, title, children, accent = "#00FF9D" }) => {
  return (
    <motion.div
      variants={staggerItem}
      {...cardHoverProps}
      className="flex-1 min-w-[220px] p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#00FF9D] hover:shadow-[0_0_25px_rgba(0,255,157,0.15)] group"
      style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>

      {/* Title */}
      <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: accent }}>
        {title}
      </p>

      {/* Content */}
      <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
};

export default AboutCard;
