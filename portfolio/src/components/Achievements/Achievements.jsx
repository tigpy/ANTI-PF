import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AchievementCard from "./AchievementCard";
import { SectionHeading, Container } from "../common";
import { achievementsData } from "../../data/achievementsData";
import { staggerContainer } from "../../animations/staggerCards";

const Achievements = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(76,201,240,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container>
        <SectionHeading
          title="Achievements"
          subtitle="Milestones & Recognition"
          accent="#00FF9D"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {achievementsData.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Achievements;
