import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { profileData } from "../../data/profileData";
import { glass } from "../../styles/glass";
import DecryptText from "../common/DecryptText";
import CLIOverlay from "./CLIOverlay";
import { cyberSynth } from "../../utils/synth";
import { addSnifferLog } from "../../utils/sniffer";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [cliOpen, setCliOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(cyberSynth.isEnabled());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply active theme to document body/html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    addSnifferLog(`[SYS] THEME TOGGLED: ${nextTheme.toUpperCase()}`);
    cyberSynth.playChime();
  };

  // Detect scroll to apply glass background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Backtick toggle key listener for terminal CLI
  useEffect(() => {
    const handleBacktick = (e) => {
      if (e.key === "`") {
        e.preventDefault();
        setCliOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleBacktick);
    return () => window.removeEventListener("keydown", handleBacktick);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      addSnifferLog(`[NAV] SCROLLING TO: ${href}`);
      cyberSynth.playChime();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAudio = () => {
    const nextState = cyberSynth.toggle();
    setAudioEnabled(nextState);
    addSnifferLog(`[SYS] AUDIO TOGGLED: ${nextState ? "ON" : "OFF"}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? glass.navbar : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#1E6F44]/30
                shadow-[2px_2px_0px_#181A1B]
                flex items-center justify-center">
              <img
                src="/favicon.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:block text-[#181A1B] font-bold font-poppins text-sm group-hover:text-[#1E6F44] transition-colors duration-300">
              {profileData.name}
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  whileHover={{ y: -1 }}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-[#1E6F44]"
                      : "text-[#5C615D] hover:text-[#181A1B]"
                  }`}
                >
                  <DecryptText text={link.label} />
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1E6F44]"
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border border-[#181A1B] transition-all duration-300 flex items-center gap-1.5 font-mono text-xs font-bold ${
                theme === "dark"
                  ? "bg-[#24A060] text-[#FAF9F6] shadow-[2.5px_2.5px_0px_#181A1B]"
                  : "bg-[#EFECE3] text-[#181A1B] hover:bg-[#FAF9F6]"
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === "light" ? "DARK" : "LIGHT"}</span>
            </button>

            {/* Audio Synth Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border border-[#181A1B] transition-all duration-300 flex items-center gap-1.5 font-mono text-xs font-bold ${
                audioEnabled
                  ? "bg-[#1E6F44] text-[#F6F5F0] shadow-[2.5px_2.5px_0px_#181A1B]"
                  : "bg-[#EFECE3] text-[#181A1B] hover:bg-[#FAF9F6]"
              }`}
              title="Toggle Audio Feedback"
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{audioEnabled ? "AUDIO: ON" : "AUDIO: OFF"}</span>
            </button>

            {/* CLI Console Shell Trigger */}
            <button
              onClick={() => setCliOpen(!cliOpen)}
              className={`p-2 rounded-xl border border-[#181A1B] transition-all duration-300 flex items-center gap-1.5 font-mono text-xs font-bold ${
                cliOpen
                  ? "bg-[#2B6282] text-[#F6F5F0] shadow-[2.5px_2.5px_0px_#181A1B]"
                  : "bg-[#EFECE3] text-[#181A1B] hover:bg-[#FAF9F6]"
              }`}
              title="Open Diagnostic Console & CTF Challenge"
            >
              <Terminal size={14} />
              <span>SHELL [CTF]</span>
            </button>

            <motion.a
              href={profileData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 text-sm font-bold rounded-xl bg-[#181A1B] text-[#F6F5F0] hover:bg-[#1E6F44] hover:shadow-[3px_3px_0px_rgba(24,26,27,0.3)] transition-all duration-300"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#EFECE3] border border-[#181A1B]/15 text-[#5C615D] hover:text-[#181A1B] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{ background: "var(--bg-primary)", borderLeft: "2px solid var(--border)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#181A1B]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#181A1B] flex items-center justify-center">
                    <span className="text-[#F6F5F0] font-bold text-xs font-poppins">AS</span>
                  </div>
                  <span className="text-[#181A1B] font-bold text-sm font-poppins">Aryan Singh</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#EFECE3] text-[#5C615D] hover:text-[#181A1B] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-[#1E6F44]/10 text-[#1E6F44] border border-[#1E6F44]/20"
                          : "text-[#5C615D] hover:bg-[#EFECE3] hover:text-[#181A1B]"
                      }`}
                    >
                      <span className="text-xs font-mono text-[#1E6F44]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile controls */}
              <div className="px-4 py-4 border-t border-[#181A1B]/10 space-y-3">
                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full py-2.5 rounded-xl border border-[#181A1B] flex items-center justify-center gap-2 font-mono text-xs font-bold ${
                    theme === "dark"
                      ? "bg-[#24A060] text-[#FAF9F6]"
                      : "bg-[#EFECE3] text-[#181A1B]"
                  }`}
                >
                  {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
                  <span>{theme === "light" ? "SWITCH TO DARK" : "SWITCH TO LIGHT"}</span>
                </button>

                <button
                  onClick={toggleAudio}
                  className={`w-full py-2.5 rounded-xl border border-[#181A1B] flex items-center justify-center gap-2 font-mono text-xs font-bold ${
                    audioEnabled
                      ? "bg-[#1E6F44] text-[#F6F5F0]"
                      : "bg-[#EFECE3] text-[#181A1B]"
                  }`}
                >
                  {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span>{audioEnabled ? "AUDIO: ON" : "AUDIO: OFF"}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCliOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#181A1B] bg-[#EFECE3] text-[#181A1B] flex items-center justify-center gap-2 font-mono text-xs font-bold hover:bg-[#FAF9F6]"
                >
                  <Terminal size={14} />
                  <span>DIAGNOSTIC SHELL [CTF]</span>
                </button>
              </div>

              {/* Drawer footer CTA */}
              <div className="px-4 pb-8">
                <a
                  href={profileData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 text-sm font-bold rounded-xl bg-[#181A1B] text-[#F6F5F0] hover:bg-[#1E6F44] hover:shadow-[3px_3px_0px_rgba(24,26,27,0.3)] transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CLIOverlay Component */}
      <CLIOverlay isOpen={cliOpen} onClose={() => setCliOpen(false)} />
    </>
  );
};

export default Navbar;

