import { m } from "framer-motion";
import { glass } from "../../styles/glass";

/**
 * GlassCard — the universal glassmorphism card.
 * 
 * Props:
 *   children    — content
 *   className   — additional Tailwind classes
 *   hover       — enable hover lift + green glow border (default: true)
 *   padding     — inner padding class (default: "p-8")
 *   variant     — "default" | "project" | "terminal"
 *   onClick     — optional click handler
 */
const GlassCard = ({
  children,
  className = "",
  hover = true,
  padding = "p-8",
  variant = "default",
  onClick,
  ...motionProps
}) => {
  const baseStyle =
    variant === "project"
      ? glass.projectCard
      : variant === "terminal"
      ? glass.terminal
      : glass.card;

  const hoverStyle = hover
    ? `${glass.cardHover} cursor-default`
    : "";

  return (
    <m.div
      className={`${baseStyle} ${hoverStyle} ${padding} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </m.div>
  );
};

export default GlassCard;
