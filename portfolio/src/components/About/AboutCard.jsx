import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";

const AboutCard = ({ icon: Icon, title, children, accent = "#1E6F44" }) => {
  return (
    <motion.div
      variants={staggerItem}
      {...cardHoverProps}
      className="flex-1 min-w-[220px] p-6 rounded-2xl border border-[#181A1B]/12 transition-all duration-300 hover:border-[var(--card-accent)] hover:shadow-[3px_3px_0px_#181A1B] group"
      style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)", "--card-accent": accent }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>

      {/* Title */}
      <p className="text-xs font-mono font-bold tracking-widest uppercase mb-3" style={{ color: accent }}>
        {title}
      </p>

      {/* Content */}
      <div className="text-[#5C615D] text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
};

export default AboutCard;
