import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FileText, Mail, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import ProfileImage from "./ProfileImage";
import { TerminalCard } from "../common";
import { profileData } from "../../data/profileData";
import { slideLeft } from "../../animations/slideLeft";
import { slideRight } from "../../animations/slideRight";

// Build typing sequence from roles array
const buildTypingSequence = (roles) => {
  const seq = [];
  roles.forEach((role) => {
    seq.push(role);
    seq.push(2200);
  });
  return seq;
};

// Terminal lines for hero
const heroTerminalLines = [
  { prompt: true,  text: "whoami" },
  { prompt: false, text: "aryan-singh" },
  { prompt: true,  text: "cat location.txt" },
  { prompt: false, text: "Mumbai, India" },
  { prompt: true,  text: "cat status.txt" },
  { prompt: false, text: "Open to opportunities", muted: false },
];

const Hero = () => {
  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* ── Background layers ── */}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* ── Left: Text content ── */}
          <div className="flex-1 max-w-xl">
            {/* Greeting */}
            <motion.p
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              className="text-[#00FF9D] font-mono text-sm mb-3 tracking-widest uppercase"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins text-white leading-[1.1] mb-4"
            >
              {profileData.name}
            </motion.h1>

            {/* Animated typing role */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-[#00FF9D] font-mono text-sm select-none">›</span>
              <span className="text-xl md:text-2xl font-semibold font-mono"
                style={{ color: "#4CC9F0" }}>
                <TypeAnimation
                  sequence={buildTypingSequence(profileData.typingRoles)}
                  wrapper="span"
                  speed={55}
                  deletionSpeed={70}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              {profileData.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.a
                href={profileData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(0,255,157,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0] text-[#0B1020] font-semibold text-sm transition-all duration-300"
              >
                <FileText size={16} />
                Resume
              </motion.a>

              <motion.a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium text-sm transition-all duration-300"
              >
                <FaGithub size={16} />
                GitHub
              </motion.a>

              <motion.a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-[#4CC9F0] hover:border-[#4CC9F0]/30 font-medium text-sm transition-all duration-300"
              >
                <FaLinkedin size={16} />
                LinkedIn
              </motion.a>

              <motion.a
                href={profileData.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-[#00FF9D] hover:border-[#00FF9D]/30 font-medium text-sm transition-all duration-300"
              >
                <SiTryhackme size={15} />
                TryHackMe
              </motion.a>

              <motion.a
                href={`mailto:${profileData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium text-sm transition-all duration-300"
              >
                <Mail size={16} />
                Email
              </motion.a>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.55 }}
              className="max-w-sm"
            >
              <TerminalCard
                title="aryan@portfolio ~ "
                lines={heroTerminalLines}
              />
            </motion.div>
          </div>

          {/* ── Right: Profile image ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <ProfileImage />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll down indicator ── */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-500 hover:text-[#00FF9D] transition-colors duration-300 group"
        aria-label="Scroll to about"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
