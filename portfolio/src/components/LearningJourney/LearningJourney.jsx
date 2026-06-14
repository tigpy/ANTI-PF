import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen } from "lucide-react";
import TimelineItem from "./TimelineItem";
import { SectionHeading, Container } from "../common";
import { learningJourneyData } from "../../data/learningJourneyData";
import { staggerContainer } from "../../animations/staggerCards";
import { fadeUp } from "../../animations/fadeUp";

const LearningJourney = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="learning"
      className="py-20 relative overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(30,111,68,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Container>
        <SectionHeading
          title="Learning Journey"
          subtitle="Always Growing"
          accent="#1E6F44"
        />

        <div ref={ref}>
          {/* Intro line */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center gap-3 justify-center mb-14"
          >
            <BookOpen size={15} className="text-[#1E6F44]" />
            <p className="text-[#5C615D] text-sm font-semibold text-center max-w-lg">
              Continuously expanding my skills across cloud security, AI, and threat intelligence.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line — desktop */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
              style={{ background: "linear-gradient(180deg, transparent, rgba(30,111,68,0.25), transparent)" }}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-8"
            >
              {learningJourneyData.map((item, i) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={i}
                  isLast={i === learningJourneyData.length - 1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LearningJourney;
