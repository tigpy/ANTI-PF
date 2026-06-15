import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub } from "react-icons/fa";
import { GitBranch, Star, GitCommit } from "lucide-react";
import { SectionHeading, Container } from "../common";
import { profileData } from "../../data/profileData";
import { GITHUB_USERNAME } from "../../constants";
import { staggerContainer, staggerItem } from "../../animations/staggerCards";
import { fadeUp } from "../../animations/fadeUp";

// GitHub readme-stats base URL
const STATS_BASE = "https://github-readme-stats.vercel.app/api";

const GitHubStats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark") || !root.classList.contains("light"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark") || !root.classList.contains("light"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Light/Dark responsive readme stats URLs
  const statsUrl = `${STATS_BASE}?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=${
    isDark ? "24a060" : "006d77"
  }&icon_color=${isDark ? "3a7ca5" : "0f4c5c"}&text_color=${
    isDark ? "9ca09d" : "4e5356"
  }&ring_color=${isDark ? "24a060" : "006d77"}&count_private=true`;

  const langsUrl = `${STATS_BASE}/top-langs?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=${
    isDark ? "24a060" : "006d77"
  }&text_color=${isDark ? "9ca09d" : "4e5356"}&langs_count=6`;

  const streakUrl = `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&background=${
    isDark ? "12131c" : "ebe9df"
  }&hide_border=true&ring=${
    isDark ? "24a060" : "006d77"
  }&fire=${isDark ? "d36e35" : "c25e29"}&currStreakLabel=${
    isDark ? "24a060" : "006d77"
  }&currStreakNum=${
    isDark ? "24a060" : "006d77"
  }&sideLabels=${
    isDark ? "9ca09d" : "4e5356"
  }&sideNums=${
    isDark ? "faf9f6" : "1c1e21"
  }&dates=${
    isDark ? "6e7270" : "7d8386"
  }&stroke=${isDark ? "faf9f615" : "1c1e2115"}`;

  const highlights = [
    { icon: FaGithub,  label: "GitHub",          value: `@${GITHUB_USERNAME}` },
    { icon: GitBranch, label: "Focus",            value: "Security Projects" },
    { icon: Star,      label: "Featured Project", value: "ZTAI-Block" },
    { icon: GitCommit, label: "Primary Language", value: "Python" },
  ];

  return (
    <section id="github" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 3%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container>
        <SectionHeading
          title="GitHub Statistics"
          subtitle="Open Source Activity"
          accent="var(--accent-green)"
        />

        <div ref={ref}>
          {/* Highlight row */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {highlights.map(({ icon: Icon, label, value }) => (
              <m.div
                key={label}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border-color transition-all duration-300 hover:border-accent-green hover:shadow-[3px_3px_0px_var(--text-primary)]"
                style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "color-mix(in srgb, var(--accent-green) 8%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--accent-green) 25%, transparent)"
                  }}
                >
                  <Icon size={16} style={{ color: "var(--accent-green)" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-text-secondary text-xs font-semibold">{label}</p>
                  <p className="text-text-primary text-sm font-bold truncate">{value}</p>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Stats cards grid */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
          >
            {/* GitHub Stats */}
            <m.div
              variants={staggerItem}
              className="rounded-2xl border-2 border-border-color overflow-hidden p-1 transition-all duration-300 hover:border-accent-green hover:shadow-[4px_4px_0px_var(--text-primary)]"
              style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
            >
              <img
                src={statsUrl}
                alt="GitHub Stats"
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </m.div>

            {/* Top Languages */}
            <m.div
              variants={staggerItem}
              className="rounded-2xl border-2 border-border-color overflow-hidden p-1 transition-all duration-300 hover:border-accent-teal hover:shadow-[4px_4px_0px_var(--text-primary)]"
              style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
            >
              <img
                src={langsUrl}
                alt="Top Languages"
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </m.div>
          </m.div>

          {/* Streak stats — full width */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border-2 border-border-color overflow-hidden p-1 transition-all duration-300 hover:border-accent-green hover:shadow-[4px_4px_0px_var(--text-primary)]"
            style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
          >
            <img
              src={streakUrl}
              alt="GitHub Streak"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </m.div>

          {/* GitHub CTA */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <m.a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm bg-text-primary text-bg-primary hover:bg-accent-green hover:shadow-[3.5px_3.5px_0px_var(--border-color)] transition-all duration-300"
            >
              <FaGithub size={16} />
              View GitHub Profile
            </m.a>
          </m.div>
        </div>
      </Container>
    </section>
  );
};

export default GitHubStats;
