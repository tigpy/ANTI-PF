// Shared Tailwind class strings for Chalk & Charcoal Cybernetics layout
// Import and spread into className wherever needed

export const glass = {
  // Base card — cream/sand textured panel with thin organic charcoal border
  card: [
    "bg-[#EFECE3]/80",
    "backdrop-blur-md",
    "border",
    "border-[#181A1B]/12",
    "rounded-2xl",
    "shadow-[3px_3px_0px_rgba(24,26,27,0.05)]",
    "transition-all",
    "duration-300",
  ].join(" "),

  // Project cards with custom shape and solid border
  projectCard: [
    "bg-[#EFECE3]/80",
    "backdrop-blur-md",
    "border-2",
    "border-[#181A1B]/15",
    "rounded-3xl",
    "shadow-[4px_4px_0px_rgba(24,26,27,0.06)]",
    "transition-all",
    "duration-300",
  ].join(" "),

  // Hover state: sharp black/charcoal solid offset shadow and green border
  cardHover: [
    "hover:border-[#1E6F44]",
    "hover:shadow-[4px_4px_0px_rgba(24,26,27,0.9)]",
    "hover:-translate-y-0.5",
  ].join(" "),

  // Navbar — semi-transparent warm ivory cream
  navbar: [
    "bg-[#F6F5F0]/92",
    "backdrop-blur-md",
    "border-b",
    "border-[#181A1B]/10",
  ].join(" "),

  // Terminal window card: tactile CRT terminal casing with heavy borders
  terminal: [
    "bg-[#EFECE3]",
    "border-2",
    "border-[#181A1B]",
    "rounded-2xl",
    "shadow-[4px_4px_0px_rgba(24,26,27,0.9)]",
    "scanlines",
  ].join(" "),

  // Input fields for forms
  input: [
    "bg-[#FAF9F6]",
    "border-2",
    "border-[#181A1B]/15",
    "rounded-xl",
    "text-[#181A1B]",
    "placeholder-[#8C908D]",
    "focus:border-[#1E6F44]",
    "focus:ring-1",
    "focus:ring-[#1E6F44]",
    "focus:outline-none",
    "transition-all",
    "duration-300",
  ].join(" "),
};
