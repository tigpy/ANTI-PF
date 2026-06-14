import { motion } from "framer-motion";
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

  const statsUrl = `${STATS_BASE}?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=00FF9D&icon_color=4CC9F0&text_color=94A3B8&bg_color=0D1426&ring_color=00FF9D&count_private=true`;

  const langsUrl = `${STATS_BASE}/top-langs?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=00FF9D&text_color=94A3B8&bg_color=0D1426&langs_count=6`;

  const streakUrl = `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=00FF9D&fire=4CC9F0&currStreakLabel=00FF9D&sideLabels=94A3B8&dates=64748B&stroke=ffffff10&background=0D1426`;

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
          background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container>
        <SectionHeading
          title="GitHub Statistics"
          subtitle="Open Source Activity"
          accent="#00FF9D"
        />

        <div ref={ref}>
          {/* Highlight row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {highlights.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#00FF9D]/30"
                style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,255,157,0.1)", border: "1px solid rgba(0,255,157,0.2)" }}
                >
                  <Icon size={16} color="#00FF9D" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs">{label}</p>
                  <p className="text-white text-sm font-medium truncate">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
          >
            {/* GitHub Stats */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-white/10 overflow-hidden p-1 transition-all duration-300 hover:border-[#00FF9D]/25"
              style={{ background: "rgba(13,20,38,0.8)", backdropFilter: "blur(20px)" }}
            >
              <img
                src={statsUrl}
                alt="GitHub Stats"
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </motion.div>

            {/* Top Languages */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-white/10 overflow-hidden p-1 transition-all duration-300 hover:border-[#4CC9F0]/25"
              style={{ background: "rgba(13,20,38,0.8)", backdropFilter: "blur(20px)" }}
            >
              <img
                src={langsUrl}
                alt="Top Languages"
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Streak stats — full width */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 overflow-hidden p-1 transition-all duration-300 hover:border-[#00FF9D]/25"
            style={{ background: "rgba(13,20,38,0.8)", backdropFilter: "blur(20px)" }}
          >
            <img
              src={streakUrl}
              alt="GitHub Streak"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <motion.a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(0,255,157,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #00FF9D, #4CC9F0)",
                color: "#0B1020",
              }}
            >
              <FaGithub size={16} />
              View GitHub Profile
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default GitHubStats;
