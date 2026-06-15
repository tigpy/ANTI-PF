import { memo } from "react";
import { m } from "framer-motion";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import { staggerItem } from "../../animations/staggerCards";
import { cardHoverProps } from "../../animations/cardHover";
import { TiltWrapper } from "../common";

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "var(--accent-green)";
  if (color === "#4CC9F0") return "var(--accent-teal)";
  if (color === "#FF9900") return "var(--accent-orange)";
  return color;
};

const CertCard = ({ cert, onOpenLightbox }) => {
  const isCompleted = cert.status === "Completed";
  const displayColor = getThemeColor(cert.color);

  return (
    <TiltWrapper maxRotation={6} className="flex flex-col h-full">
      <m.div
        variants={staggerItem}
        {...cardHoverProps}
        className="relative flex flex-col rounded-2xl border border-border-color overflow-hidden transition-all duration-300 hover:border-accent-green hover:shadow-[3px_3px_0px_var(--text-primary)] group h-full"
        style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", "--cert-accent": displayColor }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: isCompleted
              ? "linear-gradient(90deg, var(--cert-accent), transparent)"
              : "linear-gradient(90deg, var(--accent-orange), transparent)",
          }}
        />

        {/* Certificate Image */}
        {cert.image && (
          <div className="relative overflow-hidden aspect-[16/10] w-full border-b border-border-color/30 cursor-pointer">
            <img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
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
                background: "color-mix(in srgb, var(--cert-accent) 7%, transparent)",
                border: "1px solid color-mix(in srgb, var(--cert-accent) 15%, transparent)",
                color: "var(--cert-accent)",
              }}
            >
              {cert.issuer}
            </div>

            {/* Status badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                isCompleted
                  ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                  : "bg-accent-orange/10 text-accent-orange border border-accent-orange/20"
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
          <h3 className="text-text-primary font-bold font-poppins text-lg leading-snug mb-2 group-hover:text-accent-green transition-colors duration-300">
            {cert.title}
          </h3>

          {/* Year */}
          <p className="text-text-muted text-sm font-mono font-semibold mb-6">{cert.date}</p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border-color/60">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: isCompleted ? "var(--accent-green)" : "var(--accent-orange)" }}
              />
              <span className="text-text-muted text-xs font-semibold">
                {isCompleted ? "Credential earned" : "In progress"}
              </span>
            </div>

            {cert.credentialLink ? (
              <m.a
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: "color-mix(in srgb, var(--cert-accent) 7%, transparent)",
                  color: "var(--cert-accent)",
                  border: "1px solid color-mix(in srgb, var(--cert-accent) 15%, transparent)",
                }}
              >
                <ExternalLink size={11} />
                View Credential
              </m.a>
            ) : (
              <span className="text-text-muted text-xs italic">Link coming soon</span>
            )}
          </div>
        </div>
      </m.div>
    </TiltWrapper>
  );
};

export default memo(CertCard);
