import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";

const CertCard = ({ cert, onOpenLightbox }) => {
  const isCompleted = cert.status === "Completed";

  return (
    <motion.div
      variants={staggerItem}
      {...cardHoverProps}
      className="relative flex flex-col rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#00FF9D]/40 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] group"
      style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: isCompleted
            ? `linear-gradient(90deg, ${cert.color}, transparent)`
            : "linear-gradient(90deg, #FF9900, transparent)",
        }}
      />

      {/* Certificate Image */}
      {cert.image && (
        <div className="relative overflow-hidden aspect-[16/10] w-full border-b border-white/5 cursor-pointer">
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
            className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
            style={{
              background: `${cert.color}12`,
              border: `1px solid ${cert.color}30`,
              color: cert.color,
            }}
          >
            {cert.issuer}
          </div>

          {/* Status badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              isCompleted
                ? "bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20"
                : "bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20"
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
        <h3 className="text-white font-semibold font-poppins text-lg leading-snug mb-2 group-hover:text-[#00FF9D] transition-colors duration-300">
          {cert.title}
        </h3>

        {/* Year */}
        <p className="text-gray-500 text-sm font-mono mb-6">{cert.date}</p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: isCompleted ? "#00FF9D" : "#FF9900" }}
            />
            <span className="text-gray-500 text-xs">
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
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: `${cert.color}12`,
                color: cert.color,
                border: `1px solid ${cert.color}25`,
              }}
            >
              <ExternalLink size={11} />
              View Credential
            </motion.a>
          ) : (
            <span className="text-gray-600 text-xs italic">Link coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertCard;
