import { m } from "framer-motion";
import { GraduationCap, MapPin, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import AboutCard from "./AboutCard";
import { SectionHeading, Container } from "../common";
import { profileData } from "../../data/profileData";
import { slideLeft } from "../../animations/slideLeft";
import { slideRight } from "../../animations/slideRight";
import { staggerContainer } from "../../animations/staggerCards";

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(43,98,130,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateY(-50%)",
        }}
      />

      <Container>
        <SectionHeading
          title="About Me"
          subtitle="Who I Am"
          accent="#1E6F44"
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: summary text ── */}
          <m.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Decorative quote mark */}
            <div
              className="text-6xl font-bold font-poppins leading-none mb-1 select-none"
              style={{ color: "color-mix(in srgb, var(--accent-green) 12%, transparent)" }}
            >
              "
            </div>

            <p className="text-text-secondary text-base md:text-lg leading-[1.9] mb-8">
              {profileData.summary}
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "B.Sc. Information Technology",
                "TryHackMe Labs",
                "AI-powered Security",
                "SOC Operations",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-bold font-mono"
                  style={{
                    background: "color-mix(in srgb, var(--accent-green) 6%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--accent-green) 18%, transparent)",
                    color: "var(--accent-green)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-10 pt-8 border-t border-border-color/60 grid grid-cols-3 gap-6">
              {[
                { value: "3+",   label: "Projects Built" },
                { value: "50+",  label: "THM Rooms" },
                { value: "2026", label: "Graduated" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold font-poppins" style={{ color: "var(--accent-green)" }}>
                    {value}
                  </p>
                  <p className="text-text-muted text-xs mt-1 font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </m.div>

          {/* ── Right: info cards ── */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            {/* Education */}
            <AboutCard icon={GraduationCap} title="Education" accent="var(--accent-green)">
              <p className="font-bold text-text-primary text-base leading-snug mb-1">
                {profileData.education.degree}
              </p>
              <p className="text-text-secondary text-sm">{profileData.education.college}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-color/60">
                <span className="text-text-muted text-xs font-semibold">{profileData.education.year}</span>
                <span
                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--accent-green) 8%, transparent)", color: "var(--accent-green)" }}
                >
                  CGPA {profileData.education.cgpa}
                </span>
              </div>
            </AboutCard>

            {/* Location */}
            <AboutCard icon={MapPin} title="Location" accent="var(--accent-teal)">
              <p className="font-bold text-text-primary text-base">{profileData.location}</p>
              <p className="text-text-muted text-xs font-semibold mt-1">India (IST — UTC+5:30)</p>
              <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                Open to remote roles and on-site opportunities in Mumbai.
              </p>
            </AboutCard>

            {/* Interests */}
            <AboutCard icon={Zap} title="Interests" accent="var(--accent-green)">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {profileData.interests.map((interest) => (
                  <div key={interest} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-green)" }} />
                    <span className="text-text-primary font-semibold text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </AboutCard>
          </m.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
