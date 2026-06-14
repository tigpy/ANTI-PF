import { motion } from "framer-motion";
import { profileData } from "../../data/profileData";

const ProfileImage = () => {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
      {/* Outer rotating gradient ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin-ring"
        style={{
          background: "conic-gradient(from 0deg, #00FF9D, #4CC9F0, transparent, #00FF9D)",
          padding: "3px",
          borderRadius: "50%",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "#0B1020" }}
        />
      </div>

      {/* Inner static glow ring */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          boxShadow: "0 0 40px rgba(0,255,157,0.15), inset 0 0 40px rgba(0,255,157,0.05)",
        }}
      />

      {/* Profile image */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        className="relative z-10 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full overflow-hidden border-2 border-white/10"
      >
        <img
          src="/assets/profile/profile.png"
          alt={profileData.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback avatar if image not found
            e.target.style.display = "none";
            e.target.parentElement.style.background =
              "linear-gradient(135deg, #131B2E 0%, #0F1628 100%)";
            const initials = document.createElement("span");
            initials.textContent = "AS";
            initials.style.cssText =
              "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:700;color:#00FF9D;font-family:Poppins,sans-serif;";
            e.target.parentElement.appendChild(initials);
          }}
        />
      </motion.div>

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap"
        style={{
          background: "rgba(11,16,32,0.95)",
          border: "1px solid rgba(0,255,157,0.3)",
          boxShadow: "0 0 16px rgba(0,255,157,0.15)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
        <span className="text-[#00FF9D]">Available for opportunities</span>
      </motion.div>
    </div>
  );
};

export default ProfileImage;
