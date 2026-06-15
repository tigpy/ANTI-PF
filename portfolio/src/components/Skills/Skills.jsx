import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Shield, Code2, Server, Cloud, Wrench } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SkillTab from "./SkillTab";
import SkillBar from "./SkillBar";
import { SectionHeading, Container, Badge } from "../common";
import { skillsData } from "../../data/skillsData";
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
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 6%, transparent) 0%, color-mix(in srgb, var(--accent-green) 1.5%, transparent) 45%, transparent 70%)",
        }}
      />

      <Container>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="What I Work With"
          accent="var(--accent-green)"
        />

        <div ref={ref}>
          {/* Tab bar */}
          <m.div
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
          </m.div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className="rounded-3xl p-8 md:p-10 border-2 border-border-color"
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "4px 4px 0px var(--text-primary)",
                }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-color/60">
                  <div className="flex items-center gap-3">
                    {TAB_ICONS[activeTab] && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: "color-mix(in srgb, var(--accent-green) 8%, transparent)",
                          border: "1px solid color-mix(in srgb, var(--accent-green) 25%, transparent)",
                        }}
                      >
                        {(() => {
                          const Icon = TAB_ICONS[activeTab];
                          return <Icon size={18} style={{ color: "var(--accent-green)" }} />;
                        })()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-text-primary font-bold font-poppins text-lg">
                        {activeTab}
                      </h3>
                      <p className="text-text-muted text-xs mt-0.5 font-semibold">
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

                {/* Skill bars grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {activeCategory?.skills.map(({ name, level }) => (
                    <SkillBar key={name} name={name} level={level} />
                  ))}
                </div>

                {/* Mobile badge pills */}
                <div className="md:hidden mt-8 pt-6 border-t border-border-color/60 flex flex-wrap gap-2">
                  {activeCategory?.skills.map(({ name }) => (
                    <Badge key={name} variant="default" size="sm">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          {/* All-skills quick-view row */}
          <m.div
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
          </m.div>
        </div>
      </Container>
    </section>
  );
};

export default Skills;
