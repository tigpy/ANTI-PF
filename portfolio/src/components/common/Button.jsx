import { motion } from "framer-motion";

/**
 * Button — unified button component.
 *
 * Props:
 *   variant   — "primary" | "secondary" | "ghost"
 *   size      — "sm" | "md" | "lg"
 *   href      — renders as <a> if provided
 *   external  — opens link in new tab
 *   icon      — Lucide icon component (rendered left of label)
 *   iconRight — Lucide icon component (rendered right of label)
 *   disabled
 *   className
 *   onClick
 *   children
 */
const Button = ({
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  className = "",
  onClick,
  children,
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const variantClasses = {
    primary: [
      "bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0]",
      "text-[#0B1020] font-semibold",
      "hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]",
      "hover:brightness-110",
    ].join(" "),

    secondary: [
      "bg-transparent",
      "border border-white/20",
      "text-white font-medium",
      "hover:bg-white/10",
      "hover:border-white/40",
    ].join(" "),

    ghost: [
      "bg-transparent",
      "text-[#00FF9D] font-medium",
      "hover:bg-[#00FF9D]/10",
    ].join(" "),
  };

  const baseClasses = [
    "inline-flex items-center gap-2",
    "rounded-xl",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-[#00FF9D]/50",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && <Icon size={16} />}
      {children}
      {IconRight && <IconRight size={16} />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClasses}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
