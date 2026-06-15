import { m } from "framer-motion";
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
      <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-text-primary bg-bg-terminal">
        <span className="w-3 h-3 rounded-full bg-accent-orange border border-border-color/20" />
        <span className="w-3 h-3 rounded-full bg-bg-secondary border border-border-color/30" />
        <span className="w-3 h-3 rounded-full bg-accent-green border border-border-color/20" />
        <span className="ml-3 text-xs text-[#9CA09D] font-mono font-bold">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-1.5 bg-bg-terminal text-terminal-text">
        {lines.map((line, i) => (
          <m.div
            key={i}
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ delay: animate ? (line.delay ?? i * 0.18) : 0, duration: 0.3 }}
            className="flex gap-2"
          >
            {line.prompt && (
              <span className="text-terminal-text font-bold select-none">$</span>
            )}
            <span
              className={
                line.prompt
                  ? "text-terminal-text font-bold"
                  : line.muted
                  ? "text-text-secondary/60"
                  : "text-[#FAF9F6]"
              }
            >
              {line.text}
            </span>
          </m.div>
        ))}

        {/* Blinking cursor */}
        <span className="inline-block w-2.5 h-4 bg-terminal-cursor rounded-sm animate-terminal-blink" />
      </div>
    </div>
  );
};

export default TerminalCard;

