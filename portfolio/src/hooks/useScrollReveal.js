import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * useScrollReveal — triggers Framer Motion controls when element enters viewport.
 *
 * @param {object} options
 * @param {number} options.threshold  — 0–1, default 0.15
 * @param {boolean} options.once      — trigger once only, default true
 *
 * @returns { ref, controls } — spread ref onto container, pass controls to motion variants
 *
 * Usage:
 *   const { ref, controls } = useScrollReveal();
 *   <motion.div ref={ref} animate={controls} initial="hidden" variants={fadeUp}>
 */
const useScrollReveal = ({ threshold = 0.15, once = true } = {}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold, triggerOnce: once });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  return { ref, controls };
};

export default useScrollReveal;
