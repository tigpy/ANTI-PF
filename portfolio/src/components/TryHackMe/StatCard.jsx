import { memo } from "react";
import { m } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const StatCard = ({ icon: Icon, label, value, accent = "var(--accent-green)" }) => {
  return (
    <m.div
      variants={staggerItem}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-border-color transition-all duration-300 hover:border-[var(--card-accent)] hover:shadow-[3.5px_3.5px_0px_var(--text-primary)] group"
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        "--card-accent": accent,
      }}
    >
      {/* Icon ring */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: `color-mix(in srgb, var(--card-accent) 7%, transparent)`,
          border: `1px solid color-mix(in srgb, var(--card-accent) 15%, transparent)`,
        }}
      >
        <Icon size={24} style={{ color: "var(--card-accent)" }} />
      </div>

      {/* Value */}
      <p
        className="text-3xl font-bold font-poppins mb-1 group-hover:scale-105 transition-transform duration-300"
        style={{ color: "var(--card-accent)" }}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-text-secondary text-sm font-semibold">{label}</p>
    </m.div>
  );
};

export default memo(StatCard);
