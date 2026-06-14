import { motion } from "framer-motion";

/**
 * SocialButton — icon-only or icon+label social link button.
 *
 * Props:
 *   href      — link URL
 *   icon      — Lucide or react-icons component
 *   label     — accessible label (also shown if showLabel=true)
 *   showLabel — show text label alongside icon (default: false)
 *   size      — "sm" | "md" | "lg"
 *   accent    — hover accent color (default: "#00FF9D")
 */
const SocialButton = ({
  href,
  icon: Icon,
  label,
  showLabel = false,
  size = "md",
  accent = "#00FF9D",
}) => {
  const sizeMap = {
    sm: { wrapper: "w-8 h-8",  icon: 14 },
    md: { wrapper: "w-10 h-10", icon: 18 },
    lg: { wrapper: "w-12 h-12", icon: 22 },
  };

  const { wrapper, icon: iconSize } = sizeMap[size];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={[
        showLabel ? "flex items-center gap-2 px-4 py-2 rounded-xl" : `${wrapper} rounded-xl flex items-center justify-center`,
        "bg-white/5 border border-white/10",
        "text-gray-400 transition-all duration-300",
        "hover:bg-white/10 hover:border-white/25",
      ].join(" ")}
      style={{ "--accent": accent }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = accent;
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 0 16px ${accent}25`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "";
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Icon size={iconSize} />
      {showLabel && (
        <span className="text-sm font-medium text-gray-300">{label}</span>
      )}
    </motion.a>
  );
};

export default SocialButton;
