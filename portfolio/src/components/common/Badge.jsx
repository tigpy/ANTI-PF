import { motion } from "framer-motion";

/**
 * Badge — pill-style tag for tech stacks, categories, statuses.
 *
 * Props:
 *   variant   — "default" | "green" | "blue" | "orange" | "outline"
 *   size      — "sm" | "md"
 *   className
 *   children
 */
const Badge = ({
  variant = "default",
  size = "md",
  className = "",
  children,
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  const variantClasses = {
    default: "bg-white/5 text-gray-300 border border-white/10 hover:bg-[#00FF9D]/10 hover:text-[#00FF9D] hover:border-[#00FF9D]/30",
    green:   "bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20",
    blue:    "bg-[#4CC9F0]/10 text-[#4CC9F0] border border-[#4CC9F0]/20",
    orange:  "bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20",
    outline: "bg-transparent text-gray-400 border border-white/15 hover:border-[#00FF9D]/40",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={[
        "inline-flex items-center rounded-full font-medium",
        "transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
