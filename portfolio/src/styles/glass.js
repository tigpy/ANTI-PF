// Shared Tailwind class strings for glassmorphism
// Import and spread into className wherever needed

export const glass = {
  // Base card — used everywhere
  card: [
    "bg-[rgba(19,27,46,0.55)]",
    "backdrop-blur-xl",
    "border",
    "border-white/10",
    "rounded-2xl",
    "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
  ].join(" "),

  // Project cards get a slightly larger radius
  projectCard: [
    "bg-[rgba(19,27,46,0.55)]",
    "backdrop-blur-xl",
    "border",
    "border-white/10",
    "rounded-3xl",
    "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
  ].join(" "),

  // Hover state applied via Framer Motion or Tailwind group
  cardHover: [
    "hover:border-[#00FF9D]",
    "hover:shadow-[0_0_25px_rgba(0,255,157,0.3)]",
  ].join(" "),

  // Navbar — more transparent
  navbar: [
    "bg-[rgba(11,16,32,0.8)]",
    "backdrop-blur-xl",
    "border-b",
    "border-white/10",
  ].join(" "),

  // Terminal window card
  terminal: [
    "bg-[rgba(11,16,32,0.9)]",
    "backdrop-blur-xl",
    "border",
    "border-white/10",
    "rounded-2xl",
  ].join(" "),

  // Input fields
  input: [
    "bg-[rgba(19,27,46,0.55)]",
    "backdrop-blur-sm",
    "border",
    "border-white/10",
    "rounded-xl",
    "focus:border-[#00FF9D]",
    "focus:ring-1",
    "focus:ring-[#00FF9D]",
    "focus:outline-none",
    "transition-all",
    "duration-300",
  ].join(" "),
};
