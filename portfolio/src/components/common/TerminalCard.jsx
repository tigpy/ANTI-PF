import { motion } from "framer-motion";
import { glass } from "../../styles/glass";

/**
 * TerminalCard — glass terminal window, reused in Hero and Contact.
 *
 * Props:
 *   lines      — array of { prompt: bool, text: string, delay?: number }
 *   title      — window title bar text (default: "terminal")
 *   className
 *   animate    — enable typewriter-style line-by-line reveal (default: true)
 */
const TerminalCard = ({
  lines = [],
  title = "terminal",
  className = "",
  animate = true,
}) => {
  return (
    <div className={`${glass.terminal} ${className} overflow-hidden`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-gray-400 font-mono">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ delay: animate ? (line.delay ?? i * 0.18) : 0, duration: 0.3 }}
            className="flex gap-2"
          >
            {line.prompt && (
              <span className="text-[#00FF9D] select-none">$</span>
            )}
            <span
              className={
                line.prompt
                  ? "text-[#00FF9D]"
                  : line.muted
                  ? "text-gray-500"
                  : "text-gray-300"
              }
            >
              {line.text}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-2 h-4 bg-[#00FF9D] rounded-sm"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default TerminalCard;
