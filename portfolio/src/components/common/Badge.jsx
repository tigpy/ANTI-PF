import { m } from "framer-motion";

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
    default: "bg-bg-secondary text-text-primary border border-border-color hover:bg-accent-green/10 hover:text-accent-green hover:border-accent-green/30",
    green:   "bg-accent-green/10 text-accent-green border border-accent-green/20",
    blue:    "bg-accent-teal/10 text-accent-teal border border-accent-teal/20",
    orange:  "bg-accent-orange/10 text-accent-orange border border-accent-orange/20",
    outline: "bg-transparent text-text-secondary border border-border-color hover:border-accent-green",
  };

  return (
    <m.span
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
    </m.span>
  );
};

export default Badge;
