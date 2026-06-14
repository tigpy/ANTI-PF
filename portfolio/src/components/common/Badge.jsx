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
    default: "bg-[#EFECE3] text-[#181A1B] border border-[#181A1B]/12 hover:bg-[#1E6F44]/10 hover:text-[#1E6F44] hover:border-[#1E6F44]/30",
    green:   "bg-[#1E6F44]/10 text-[#1E6F44] border border-[#1E6F44]/20",
    blue:    "bg-[#2B6282]/10 text-[#2B6282] border border-[#2B6282]/20",
    orange:  "bg-[#C25E29]/10 text-[#C25E29] border border-[#C25E29]/20",
    outline: "bg-transparent text-[#5C615D] border border-[#181A1B]/15 hover:border-[#1E6F44]",
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
