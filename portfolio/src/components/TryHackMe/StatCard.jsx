import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const StatCard = ({ icon: Icon, label, value, accent = "#1E6F44", delay = 0 }) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-[#181A1B]/12 transition-all duration-300 hover:shadow-[3.5px_3.5px_0px_#181A1B] group"
      style={{
        background: "rgba(239, 236, 227, 0.65)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(24, 26, 27, 0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(24, 26, 27, 0.12)";
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
      <p className="text-[#5C615D] text-sm font-semibold">{label}</p>
    </motion.div>
  );
};

export default StatCard;
