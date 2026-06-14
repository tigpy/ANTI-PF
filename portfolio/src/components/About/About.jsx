import { motion } from "framer-motion";
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
          background: "radial-gradient(circle, rgba(76,201,240,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateY(-50%)",
        }}
      />

      <Container>
        <SectionHeading
          title="About Me"
          subtitle="Who I Am"
          accent="#00FF9D"
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: summary text ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Decorative quote mark */}
            <div
              className="text-6xl font-bold font-poppins leading-none mb-1 select-none"
              style={{ color: "rgba(0,255,157,0.12)" }}
            >
              "
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-[1.9] mb-8">
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
                  className="px-3 py-1.5 rounded-full text-xs font-medium font-mono"
                  style={{
                    background: "rgba(0,255,157,0.06)",
                    border: "1px solid rgba(0,255,157,0.18)",
                    color: "#00FF9D",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-10 pt-8 border-t border-white/8 grid grid-cols-3 gap-6">
              {[
                { value: "3+",   label: "Projects Built" },
                { value: "50+",  label: "THM Rooms" },
                { value: "2026", label: "Graduated" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold font-poppins" style={{ color: "#00FF9D" }}>
                    {value}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: info cards ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            {/* Education */}
            <AboutCard icon={GraduationCap} title="Education" accent="#00FF9D">
              <p className="font-semibold text-white text-base leading-snug mb-1">
                {profileData.education.degree}
              </p>
              <p className="text-gray-400 text-sm">{profileData.education.college}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
                <span className="text-gray-500 text-xs">{profileData.education.year}</span>
                <span
                  className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: "rgba(0,255,157,0.1)", color: "#00FF9D" }}
                >
                  CGPA {profileData.education.cgpa}
                </span>
              </div>
            </AboutCard>

            {/* Location */}
            <AboutCard icon={MapPin} title="Location" accent="#4CC9F0">
              <p className="font-semibold text-white text-base">{profileData.location}</p>
              <p className="text-gray-500 text-xs mt-1">India (IST — UTC+5:30)</p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Open to remote roles and on-site opportunities in Mumbai.
              </p>
            </AboutCard>

            {/* Interests */}
            <AboutCard icon={Zap} title="Interests" accent="#00FF9D">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {profileData.interests.map((interest) => (
                  <div key={interest} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00FF9D" }} />
                    <span className="text-gray-300 text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </AboutCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
