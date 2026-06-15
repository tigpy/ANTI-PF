export const glass = {
  // Base card — cream/sand textured panel with thin organic charcoal border
  card: [
    "bg-bg-card",
    "backdrop-blur-md",
    "border",
    "border-border-color",
    "rounded-2xl",
    "shadow-[3px_3px_0px_var(--border-color)]",
    "transition-all",
    "duration-300",
  ].join(" "),

  // Project cards with custom shape and solid border
  projectCard: [
    "bg-bg-card",
    "backdrop-blur-md",
    "border-2",
    "border-border-color",
    "rounded-3xl",
    "shadow-[4px_4px_0px_var(--border-color)]",
    "transition-all",
    "duration-300",
  ].join(" "),

  // Hover state: sharp black/charcoal solid offset shadow and green border
  cardHover: [
    "hover:border-accent-teal",
    "hover:shadow-[4px_4px_0px_var(--text-primary)]",
    "hover:-translate-y-0.5",
  ].join(" "),

  // Navbar — semi-transparent warm ivory cream
  navbar: [
    "bg-bg-primary/92",
    "backdrop-blur-md",
    "border-b",
    "border-border-color/60",
  ].join(" "),

  // Terminal window card: tactile CRT terminal casing with heavy borders
  terminal: [
    "bg-bg-terminal",
    "border-2",
    "border-text-primary",
    "rounded-2xl",
    "shadow-[4px_4px_0px_var(--text-primary)]",
    "scanlines",
  ].join(" "),

  // Input fields for forms
  input: [
    "bg-bg-secondary",
    "border-2",
    "border-border-color",
    "rounded-xl",
    "text-text-primary",
    "placeholder-text-muted",
    "focus:border-accent-green",
    "focus:ring-1",
    "focus:ring-accent-green",
    "focus:outline-none",
    "transition-all",
    "duration-300",
  ].join(" "),
};

