import { motion } from "framer-motion";
import { Trophy, Target, Shield, Flame, ExternalLink, Terminal } from "lucide-react";
import { useInView } from "react-intersection-observer";
import StatCard from "./StatCard";
import { SectionHeading, Container, TerminalCard } from "../common";
import { profileData } from "../../data/profileData";
import { staggerContainer } from "../../animations/staggerCards";
import { slideLeft } from "../../animations/slideLeft";
import { slideRight } from "../../animations/slideRight";

const getThemeColor = (color) => {
  if (color === "#00FF9D") return "#1E6F44";
  if (color === "#4CC9F0") return "#2B6282";
  if (color === "#FF9900") return "#C25E29";
  return color;
};

const STAT_CONFIG = [
  { key: "rank",   label: "Global Rank",     icon: Trophy,   accent: "#1E6F44" },
  { key: "rooms",  label: "Rooms Completed", icon: Target,   accent: "#2B6282" },
  { key: "badges", label: "Badges Earned",   icon: Shield,   accent: "#1E6F44" },
  { key: "streak", label: "Current Streak",  icon: Flame,    accent: "#C25E29" },
];

const thmTerminalLines = [
  { prompt: true,  text: "cat tryhackme_stats.txt" },
  { prompt: false, text: `rank        → ${profileData.tryhackmeStats.rank}` },
  { prompt: false, text: `rooms       → ${profileData.tryhackmeStats.rooms}` },
  { prompt: false, text: `badges      → ${profileData.tryhackmeStats.badges}` },
  { prompt: false, text: `streak      → ${profileData.tryhackmeStats.streak}` },
  { prompt: true,  text: "cat focus_areas.txt" },
  { prompt: false, text: "Web Exploitation · Network Security" },
  { prompt: false, text: "OSINT · Cryptography · SOC" },
];

const TryHackMe = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="tryhackme"
      className="py-20 relative overflow-hidden"
    >
      {/* Green-tinted background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(30,111,68,0.03) 0%, transparent 65%)",
        }}
      />

      <Container>
        <SectionHeading
          title="TryHackMe"
          subtitle="Hacking Progress"
          accent="#1E6F44"
        />

        <div ref={ref}>
          {/* ── Stat cards ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {STAT_CONFIG.map(({ key, label, icon, accent }) => (
              <StatCard
                key={key}
                icon={icon}
                label={label}
                value={profileData.tryhackmeStats[key]}
                accent={accent}
              />
            ))}
          </motion.div>

          {/* ── Bottom: Terminal + Info ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Terminal */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <TerminalCard
                title="aryan@tryhackme ~ "
                lines={thmTerminalLines}
              />
            </motion.div>

            {/* Info panel */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              {/* Description */}
              <div
                className="p-6 rounded-2xl border border-[#181A1B]/12"
                style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={16} className="text-[#1E6F44]" />
                  <span className="text-xs font-mono font-bold text-[#1E6F44] tracking-widest uppercase">
                    About my journey
                  </span>
                </div>
                <p className="text-[#5C615D] text-sm leading-relaxed">
                  TryHackMe is my primary hands-on learning platform. I regularly
                  complete rooms covering web exploitation, network pentesting,
                  OSINT, and SOC workflows — applying real attack and defence
                  techniques in guided labs.
                </p>
              </div>

              {/* Focus areas */}
              <div
                className="p-6 rounded-2xl border border-[#181A1B]/12"
                style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(20px)" }}
              >
                <p className="text-xs font-mono font-bold text-[#8C908D] tracking-widest uppercase mb-4">
                  Focus Areas
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Web Exploitation",
                    "Network Security",
                    "OSINT",
                    "Cryptography",
                    "SOC & Blue Team",
                    "Linux Privilege Esc",
                  ].map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                      style={{
                        background: "rgba(30,111,68,0.06)",
                        border: "1px solid rgba(30,111,68,0.15)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                        style={{ background: "#1E6F44" }}
                      />
                      <span className="text-[#181A1B] text-xs font-semibold">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href={profileData.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-[#181A1B] text-[#F6F5F0] hover:bg-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B] transition-all duration-300"
              >
                <ExternalLink size={15} />
                View TryHackMe Profile
              </motion.a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TryHackMe;
