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

  // Light-theme optimized readme stats URLs
  const statsUrl = `${STATS_BASE}?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=1e6f44&icon_color=2b6282&text_color=5c615d&ring_color=1e6f44&count_private=true`;

  const langsUrl = `${STATS_BASE}/top-langs?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=1e6f44&text_color=5c615d&langs_count=6`;

  const streakUrl = `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=1e6f44&fire=c25e29&currStreakLabel=1e6f44&sideLabels=5c615d&dates=8c908d&stroke=181a1b10`;

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
          background: "radial-gradient(circle, rgba(30,111,68,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container>
        <SectionHeading
          title="GitHub Statistics"
          subtitle="Open Source Activity"
          accent="#1E6F44"
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
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-[#181A1B]/12 transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B]"
                style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(30,111,68,0.08)", border: "1px solid rgba(30,111,68,0.25)" }}
                >
                  <Icon size={16} color="#1E6F44" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#8C908D] text-xs font-semibold">{label}</p>
                  <p className="text-[#181A1B] text-sm font-bold truncate">{value}</p>
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
              className="rounded-2xl border-2 border-[#181A1B]/15 overflow-hidden p-1 transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[4px_4px_0px_#181A1B]"
              style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
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
              className="rounded-2xl border-2 border-[#181A1B]/15 overflow-hidden p-1 transition-all duration-300 hover:border-[#2B6282] hover:shadow-[4px_4px_0px_#181A1B]"
              style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
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
            className="rounded-2xl border-2 border-[#181A1B]/15 overflow-hidden p-1 transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[4px_4px_0px_#181A1B]"
            style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm bg-[#181A1B] text-[#F6F5F0] hover:bg-[#1E6F44] hover:shadow-[3.5px_3.5px_0px_#181A1B] transition-all duration-300"
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
