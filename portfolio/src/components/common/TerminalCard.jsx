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
      <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-[#181A1B]">
        <span className="w-3 h-3 rounded-full bg-[#C25E29] border border-[#181A1B]/20" />
        <span className="w-3 h-3 rounded-full bg-[#EFECE3] border border-[#181A1B]/30" />
        <span className="w-3 h-3 rounded-full bg-[#1E6F44] border border-[#181A1B]/20" />
        <span className="ml-3 text-xs text-[#5C615D] font-mono font-bold">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-1.5 bg-[#FAF9F6] text-[#181A1B]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ delay: animate ? (line.delay ?? i * 0.18) : 0, duration: 0.3 }}
            className="flex gap-2"
          >
            {line.prompt && (
              <span className="text-[#1E6F44] font-bold select-none">$</span>
            )}
            <span
              className={
                line.prompt
                  ? "text-[#1E6F44] font-bold"
                  : line.muted
                  ? "text-[#8C908D]"
                  : "text-[#181A1B]"
              }
            >
              {line.text}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-2.5 h-4 bg-[#1E6F44] rounded-sm"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default TerminalCard;
