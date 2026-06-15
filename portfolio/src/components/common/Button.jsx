import { m } from "framer-motion";

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
      "bg-text-primary",
      "text-bg-primary font-semibold",
      "hover:bg-accent-green hover:shadow-[3px_3px_0px_var(--border-color)]",
    ].join(" "),

    secondary: [
      "bg-transparent",
      "border-2 border-text-primary",
      "text-text-primary font-semibold",
      "hover:bg-bg-secondary",
    ].join(" "),

    ghost: [
      "bg-transparent",
      "text-accent-green font-semibold",
      "hover:bg-accent-green/8",
    ].join(" "),
  };

  const baseClasses = [
    "inline-flex items-center gap-2",
    "rounded-xl",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-accent-green/40",
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
      <m.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClasses}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {content}
    </m.button>
  );
};

export default Button;
