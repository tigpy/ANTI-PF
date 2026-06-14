import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { profileData } from "../../data/profileData";
import { glass } from "../../styles/glass";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#00FF9D]/40
                shadow-[0_0_15px_rgba(0,255,157,0.3)]
                flex items-center justify-center">
              <img
                src="/favicon.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:block text-white font-semibold font-poppins text-sm group-hover:text-[#00FF9D] transition-colors duration-300">
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
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-[#00FF9D]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF9D]"
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href={profileData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0] text-[#0B1020] hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all duration-300"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
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
              style={{ background: "#0F1628", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF9D] to-[#4CC9F0] flex items-center justify-center">
                    <span className="text-[#0B1020] font-bold text-xs font-poppins">AS</span>
                  </div>
                  <span className="text-white font-semibold text-sm font-poppins">Aryan Singh</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-mono text-[#00FF9D]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-4 pb-8">
                <a
                  href={profileData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0] text-[#0B1020] hover:shadow-[0_0_20px_rgba(0,255,157,0.35)] transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
