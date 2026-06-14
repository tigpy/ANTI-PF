import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const StatCard = ({ icon: Icon, label, value, accent = "#00FF9D", delay = 0 }) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.12)] group"
      style={{
        background: "rgba(19,27,46,0.65)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Icon ring */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: `${accent}12`,
          border: `1px solid ${accent}25`,
        }}
      >
        <Icon size={24} style={{ color: accent }} />
      </div>

      {/* Value */}
      <p
        className="text-3xl font-bold font-poppins mb-1 group-hover:scale-105 transition-transform duration-300"
        style={{ color: accent }}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-gray-400 text-sm font-medium">{label}</p>
    </motion.div>
  );
};

export default StatCard;
