import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Code2, Server, Cloud, Wrench } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SkillTab from "./SkillTab";
import SkillBar from "./SkillBar";
import { SectionHeading, Container, Badge } from "../common";
import { skillsData } from "../../data/skillsData";
import { staggerContainer, staggerItem } from "../../animations/staggerCards";
import { fadeUp } from "../../animations/fadeUp";

const TAB_ICONS = {
  Cybersecurity: Shield,
  Programming:   Code2,
  Backend:       Server,
  Cloud:         Cloud,
  Tools:         Wrench,
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeCategory = skillsData.find((c) => c.category === activeTab);

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
      // bg handled globally
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Container>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="What I Work With"
          accent="#00FF9D"
        />

        <div ref={ref}>
          {/* Tab bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {skillsData.map(({ category }) => (
              <SkillTab
                key={category}
                label={category}
                isActive={activeTab === category}
                onClick={() => setActiveTab(category)}
                icon={TAB_ICONS[category]}
              />
            ))}
          </motion.div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className="rounded-3xl p-8 md:p-10 border border-white/10"
                style={{
                  background: "rgba(19,27,46,0.55)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/8">
                  <div className="flex items-center gap-3">
                    {TAB_ICONS[activeTab] && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(0,255,157,0.1)",
                          border: "1px solid rgba(0,255,157,0.2)",
                        }}
                      >
                        {(() => {
                          const Icon = TAB_ICONS[activeTab];
                          return <Icon size={18} color="#00FF9D" />;
                        })()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-semibold font-poppins">
                        {activeTab}
                      </h3>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {activeCategory?.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Badge pills */}
                  <div className="hidden md:flex flex-wrap gap-1.5 max-w-sm justify-end">
                    {activeCategory?.skills.map(({ name }) => (
                      <Badge key={name} variant="default" size="sm">
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skill bars grid — no stagger wrapper so bars animate instantly on tab switch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {activeCategory?.skills.map(({ name, level }) => (
                    <SkillBar key={name} name={name} level={level} />
                  ))}
                </div>

                {/* Mobile badge pills */}
                <div className="md:hidden mt-8 pt-6 border-t border-white/8 flex flex-wrap gap-2">
                  {activeCategory?.skills.map(({ name }) => (
                    <Badge key={name} variant="default" size="sm">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All-skills quick-view row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-2 justify-center"
          >
            {skillsData.flatMap((cat) =>
              cat.skills.map(({ name }) => (
                <Badge key={`${cat.category}-${name}`} variant="outline" size="sm">
                  {name}
                </Badge>
              ))
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Skills;
