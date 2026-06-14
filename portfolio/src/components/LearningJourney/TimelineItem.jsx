import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const TimelineItem = ({ item, index, isLast }) => {
  const isLeft = index % 2 === 0;

  const statusStyle = {
    Pursuing: { bg: "rgba(255,153,0,0.1)",   border: "rgba(255,153,0,0.25)",   color: "#FF9900" },
    Learning: { bg: "rgba(76,201,240,0.1)",  border: "rgba(76,201,240,0.25)",  color: "#4CC9F0" },
    Completed:{ bg: "rgba(0,255,157,0.1)",   border: "rgba(0,255,157,0.25)",   color: "#00FF9D" },
  };
  const s = statusStyle[item.status] || statusStyle.Learning;

  return (
    <motion.div
      variants={staggerItem}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card — takes up half the width on desktop */}
      <div className={`flex-1 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#00FF9D]/30 hover:shadow-[0_0_25px_rgba(0,255,157,0.08)]"
          style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}25`, color: item.accent }}
            >
              {item.year}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
            >
              {item.status}
            </span>
          </div>

          <h3 className="text-white font-semibold font-poppins text-base mb-2">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Centre dot — desktop only */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <div
          className="w-4 h-4 rounded-full border-2 border-[#0B1020]"
          style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}60` }}
        />
      </div>

      {/* Empty half — desktop spacer */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </motion.div>
  );
};

export default TimelineItem;
