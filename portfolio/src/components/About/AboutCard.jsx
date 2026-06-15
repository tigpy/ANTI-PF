import { m } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";

const AboutCard = ({ icon: Icon, title, children, accent = "var(--accent-green)" }) => {
  return (
    <m.div
      variants={staggerItem}
      {...cardHoverProps}
      className="flex-1 min-w-[220px] p-6 rounded-2xl border border-border-color transition-all duration-300 hover:border-[var(--card-accent)] hover:shadow-[3px_3px_0px_var(--text-primary)] group"
      style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", "--card-accent": accent }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `color-mix(in srgb, var(--card-accent) 7%, transparent)`,
          border: `1px solid color-mix(in srgb, var(--card-accent) 15%, transparent)`
        }}
      >
        <Icon size={20} style={{ color: "var(--card-accent)" }} />
      </div>

      {/* Title */}
      <p className="text-xs font-mono font-bold tracking-widest uppercase mb-3" style={{ color: "var(--card-accent)" }}>
        {title}
      </p>

      {/* Content */}
      <div className="text-text-secondary text-sm leading-relaxed">{children}</div>
    </m.div>
  );
};

export default AboutCard;
