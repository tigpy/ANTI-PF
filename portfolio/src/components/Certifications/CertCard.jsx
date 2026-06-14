import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";
import { TiltWrapper } from "../common";

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "#1E6F44";
  if (color === "#4CC9F0") return "#2B6282";
  if (color === "#FF9900") return "#C25E29";
  return color;
};

const CertCard = ({ cert, onOpenLightbox }) => {
  const isCompleted = cert.status === "Completed";
  const displayColor = getThemeColor(cert.color);

  return (
    <TiltWrapper maxRotation={6} className="flex flex-col h-full">
      <motion.div
        variants={staggerItem}
        {...cardHoverProps}
        className="relative flex flex-col rounded-2xl border border-[#181A1B]/12 overflow-hidden transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B] group h-full"
        style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)" }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: isCompleted
              ? `linear-gradient(90deg, ${displayColor}, transparent)`
              : "linear-gradient(90deg, #C25E29, transparent)",
          }}
        />

        {/* Certificate Image */}
        {cert.image && (
          <div className="relative overflow-hidden aspect-[16/10] w-full border-b border-[#181A1B]/5 cursor-pointer">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={() => onOpenLightbox(cert.image)}
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-5">
            {/* Issuer badge */}
            <div
              className="px-3 py-1 rounded-full text-xs font-mono font-bold"
              style={{
                background: `${displayColor}12`,
                border: `1px solid ${displayColor}30`,
                color: displayColor,
              }}
            >
              {cert.issuer}
            </div>

            {/* Status badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                isCompleted
                  ? "bg-[#1E6F44]/10 text-[#1E6F44] border border-[#1E6F44]/20"
                  : "bg-[#C25E29]/10 text-[#C25E29] border border-[#C25E29]/20"
              }`}
            >
              {isCompleted ? (
                <CheckCircle size={11} />
              ) : (
                <Clock size={11} />
              )}
              {cert.status}
            </div>
          </div>

          {/* Certificate title */}
          <h3 className="text-[#181A1B] font-bold font-poppins text-lg leading-snug mb-2 group-hover:text-[#1E6F44] transition-colors duration-300">
            {cert.title}
          </h3>

          {/* Year */}
          <p className="text-[#8C908D] text-sm font-mono font-semibold mb-6">{cert.date}</p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#181A1B]/10">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: isCompleted ? "#1E6F44" : "#C25E29" }}
              />
              <span className="text-[#8C908D] text-xs font-semibold">
                {isCompleted ? "Credential earned" : "In progress"}
              </span>
            </div>

            {cert.credentialLink ? (
              <motion.a
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: `${displayColor}12`,
                  color: displayColor,
                  border: `1px solid ${displayColor}25`,
                }}
              >
                <ExternalLink size={11} />
                View Credential
              </motion.a>
            ) : (
              <span className="text-[#8C908D] text-xs italic">Link coming soon</span>
            )}
          </div>
        </div>
      </motion.div>
    </TiltWrapper>
  );
};

export default CertCard;
