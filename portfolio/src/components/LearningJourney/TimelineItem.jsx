import { motion } from "framer-motion";
import { staggerItem } from "../../animations/staggerCards";

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "#1E6F44";
  if (color === "#4CC9F0") return "#2B6282";
  if (color === "#FF9900") return "#C25E29";
  return color;
};

const TimelineItem = ({ item, index, isLast }) => {
  const isLeft = index % 2 === 0;
  const displayAccent = getThemeColor(item.accent);

  const statusStyle = {
    Pursuing: { bg: "rgba(194,94,41,0.08)",  border: "rgba(194,94,41,0.25)",  color: "#C25E29" },
    Learning: { bg: "rgba(43,98,130,0.08)",  border: "rgba(43,98,130,0.25)",  color: "#2B6282" },
    Completed:{ bg: "rgba(30,111,68,0.08)",   border: "rgba(30,111,68,0.25)",   color: "#1E6F44" },
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
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6 rounded-2xl border border-[#181A1B]/12 transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B]"
          style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${displayAccent}12`, border: `1px solid ${displayAccent}25`, color: displayAccent }}
            >
              {item.year}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
            >
              {item.status}
            </span>
          </div>

          <h3 className="text-[#181A1B] font-bold font-poppins text-base mb-2">
            {item.title}
          </h3>
          <p className="text-[#5C615D] text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Centre dot — desktop only */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <div
          className="w-4 h-4 rounded-full border-2 border-[#FAF9F6]"
          style={{ background: displayAccent, boxShadow: `0 0 10px ${displayAccent}40` }}
        />
      </div>

      {/* Empty half — desktop spacer */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </motion.div>
  );
};

export default TimelineItem;
