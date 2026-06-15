import { m } from "framer-motion";
import { Trophy, Target, Shield, Flame, ExternalLink, Terminal } from "lucide-react";
import { useInView } from "react-intersection-observer";
import StatCard from "./StatCard";
import { SectionHeading, Container, TerminalCard } from "../common";
import { profileData } from "../../data/profileData";
import { staggerContainer } from "../../animations/staggerCards";
import { slideLeft } from "../../animations/slideLeft";
import { slideRight } from "../../animations/slideRight";

const STAT_CONFIG = [
  { key: "rank",   label: "Global Rank",     icon: Trophy,   accent: "var(--accent-green)" },
  { key: "rooms",  label: "Rooms Completed", icon: Target,   accent: "var(--accent-teal)" },
  { key: "badges", label: "Badges Earned",   icon: Shield,   accent: "var(--accent-green)" },
  { key: "streak", label: "Current Streak",  icon: Flame,    accent: "var(--accent-orange)" },
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
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent-green) 3%, transparent) 0%, transparent 65%)",
        }}
      />

      <Container>
        <SectionHeading
          title="TryHackMe"
          subtitle="Hacking Progress"
          accent="var(--accent-green)"
        />

        <div ref={ref}>
          {/* ── Stat cards ── */}
          <m.div
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
          </m.div>

          {/* ── Bottom: Terminal + Info ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Terminal */}
            <m.div
              variants={slideLeft}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <TerminalCard
                title="aryan@tryhackme ~ "
                lines={thmTerminalLines}
              />
            </m.div>

            {/* Info panel */}
            <m.div
              variants={slideRight}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              {/* Description */}
              <div
                className="p-6 rounded-2xl border border-border-color"
                style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={16} className="text-accent-green" />
                  <span className="text-xs font-mono font-bold text-accent-green tracking-widest uppercase">
                    About my journey
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  TryHackMe is my primary hands-on learning platform. I regularly
                  complete rooms covering web exploitation, network pentesting,
                  OSINT, and SOC workflows — applying real attack and defence
                  techniques in guided labs.
                </p>
              </div>

              {/* Focus areas */}
              <div
                className="p-6 rounded-2xl border border-border-color"
                style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)" }}
              >
                <p className="text-xs font-mono font-bold text-text-muted tracking-widest uppercase mb-4">
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
                        background: "color-mix(in srgb, var(--accent-green) 6%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--accent-green) 15%, transparent)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                        style={{ background: "var(--accent-green)" }}
                      />
                      <span className="text-text-primary text-xs font-semibold">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <m.a
                href={profileData.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-text-primary text-bg-primary hover:bg-accent-green hover:shadow-[3px_3px_0px_var(--border-color)] transition-all duration-300"
              >
                <ExternalLink size={15} />
                View TryHackMe Profile
              </m.a>
            </m.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TryHackMe;
