import { m } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { Mail, ArrowUp } from "lucide-react";
import { profileData } from "../../data/profileData";
import { NAV_LINKS } from "../../constants";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { icon: FaGithub,    href: profileData.github,    label: "GitHub",    accent: "var(--text-primary)" },
    { icon: FaLinkedin,  href: profileData.linkedin,  label: "LinkedIn",  accent: "var(--accent-teal)" },
    { icon: SiTryhackme, href: profileData.tryhackme, label: "TryHackMe", accent: "var(--accent-green)" },
    { icon: Mail,        href: `mailto:${profileData.email}`, label: "Email", accent: "var(--accent-green)" },
  ];

  return (
    <footer
      className="relative border-t border-border-color pt-14 pb-8"
      style={{ background: "var(--bg-tertiary)" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent-green) 20%, transparent), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border-color
                shadow-[2px_2px_0px_var(--text-primary)]
                flex items-center justify-center">
                <img
                  src="/favicon.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-text-primary font-bold font-poppins">{profileData.name}</span>
            </div>
            <p className="text-text-muted text-sm font-medium leading-relaxed max-w-xs">
              Cybersecurity enthusiast building secure systems and AI-powered security solutions.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {socials.map(({ icon: Icon, href, label, accent }) => (
                <m.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border-color text-text-secondary transition-all duration-300 hover:text-[var(--social-accent)] hover:border-text-primary hover:shadow-[1.5px_1.5px_0px_var(--text-primary)] hover:bg-bg-secondary cursor-pointer"
                  style={{ background: "var(--bg-card)", "--social-accent": accent }}
                >
                  <Icon size={15} />
                </m.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest mb-4">
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
                  className="text-text-secondary text-sm font-bold hover:text-accent-green transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profileData.email}`}
                className="text-text-secondary text-sm font-bold hover:text-accent-green transition-colors duration-200"
              >
                {profileData.email}
              </a>
              <p className="text-text-secondary text-sm font-semibold">{profileData.location}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
                <span className="text-accent-green text-xs font-bold font-mono">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-color">
          <p className="text-text-muted text-xs font-mono font-semibold text-center sm:text-left">
            © 2026 {profileData.name} · Built with React + Vite + TailwindCSS
          </p>

          {/* Self-Destruct Trigger Badge */}
          <button
            onClick={() => {
              if (confirm("WARNING: Pressing this button will initiate system self-destruction. Are you sure you want to proceed?")) {
                window.dispatchEvent(new CustomEvent('trigger-self-destruct'));
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent-orange text-bg-primary border-2 border-text-primary text-xs font-mono font-black tracking-widest rounded-xl cursor-pointer shadow-[4px_4px_0px_var(--text-primary)] transition-all duration-200 hover:bg-accent-orange/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_var(--text-primary)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_var(--text-primary)] select-none uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bg-primary"></span>
            </span>
            ⚠️ DANGER: DO NOT PRESS ⚠️
          </button>

          {/* Back to top */}
          <m.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs font-mono font-bold text-text-secondary hover:text-accent-green transition-colors duration-200 cursor-pointer"
          >
            <ArrowUp size={13} />
            Back to top
          </m.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
