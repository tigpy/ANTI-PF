import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { Mail, ArrowUp } from "lucide-react";
import { profileData } from "../../data/profileData";
import { NAV_LINKS } from "../../constants";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { icon: FaGithub,    href: profileData.github,    label: "GitHub",    accent: "#ffffff" },
    { icon: FaLinkedin,  href: profileData.linkedin,  label: "LinkedIn",  accent: "#4CC9F0" },
    { icon: SiTryhackme, href: profileData.tryhackme, label: "TryHackMe", accent: "#00FF9D" },
    { icon: Mail,        href: `mailto:${profileData.email}`, label: "Email", accent: "#00FF9D" },
  ];

  return (
    <footer
      className="relative border-t border-white/8 pt-14 pb-8"
      style={{ background: "#080E1C" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,157,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#00FF9D]/40
                shadow-[0_0_15px_rgba(0,255,157,0.3)]
                flex items-center justify-center">
              <img
                src="/favicon.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
              <span className="text-white font-semibold font-poppins">{profileData.name}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Cybersecurity enthusiast building secure systems and AI-powered security solutions.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {socials.map(({ icon: Icon, href, label, accent }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-gray-500 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = `${accent}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-400 text-sm hover:text-[#00FF9D] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profileData.email}`}
                className="text-gray-400 text-sm hover:text-[#00FF9D] transition-colors duration-200"
              >
                {profileData.email}
              </a>
              <p className="text-gray-500 text-sm">{profileData.location}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
                <span className="text-[#00FF9D] text-xs font-mono">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="text-gray-600 text-xs font-mono text-center sm:text-left">
            © 2026 {profileData.name} · Built with React + Vite + TailwindCSS
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00FF9D] transition-colors duration-200"
          >
            <ArrowUp size={13} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
