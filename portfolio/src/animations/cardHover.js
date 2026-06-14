// Spread these as props directly onto motion.div
// e.g. <motion.div {...cardHoverProps}>

export const cardHoverProps = {
  whileHover: {
    scale: 1.03,
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Lighter hover for smaller cards
export const subtleHoverProps = {
  whileHover: {
    scale: 1.02,
    y: -3,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Profile image scale
export const profileHoverProps = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};
