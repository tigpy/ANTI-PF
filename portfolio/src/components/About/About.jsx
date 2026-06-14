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
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Decorative quote mark */}
            <div
              className="text-6xl font-bold font-poppins leading-none mb-1 select-none"
              style={{ color: "rgba(30,111,68,0.12)" }}
            >
              "
            </div>

            <p className="text-[#5C615D] text-base md:text-lg leading-[1.9] mb-8">
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
                    background: "rgba(30,111,68,0.06)",
                    border: "1px solid rgba(30,111,68,0.18)",
                    color: "#1E6F44",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-10 pt-8 border-t border-[#181A1B]/10 grid grid-cols-3 gap-6">
              {[
                { value: "3+",   label: "Projects Built" },
                { value: "50+",  label: "THM Rooms" },
                { value: "2026", label: "Graduated" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold font-poppins" style={{ color: "#1E6F44" }}>
                    {value}
                  </p>
                  <p className="text-[#8C908D] text-xs mt-1 font-semibold">{label}</p>
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
            <AboutCard icon={GraduationCap} title="Education" accent="#1E6F44">
              <p className="font-bold text-[#181A1B] text-base leading-snug mb-1">
                {profileData.education.degree}
              </p>
              <p className="text-[#5C615D] text-sm">{profileData.education.college}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#181A1B]/10">
                <span className="text-[#8C908D] text-xs font-semibold">{profileData.education.year}</span>
                <span
                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: "rgba(30,111,68,0.08)", color: "#1E6F44" }}
                >
                  CGPA {profileData.education.cgpa}
                </span>
              </div>
            </AboutCard>

            {/* Location */}
            <AboutCard icon={MapPin} title="Location" accent="#2B6282">
              <p className="font-bold text-[#181A1B] text-base">{profileData.location}</p>
              <p className="text-[#8C908D] text-xs font-semibold mt-1">India (IST — UTC+5:30)</p>
              <p className="text-[#5C615D] text-sm mt-3 leading-relaxed">
                Open to remote roles and on-site opportunities in Mumbai.
              </p>
            </AboutCard>

            {/* Interests */}
            <AboutCard icon={Zap} title="Interests" accent="#1E6F44">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {profileData.interests.map((interest) => (
                  <div key={interest} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1E6F44" }} />
                    <span className="text-[#181A1B] font-semibold text-sm">{interest}</span>
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
