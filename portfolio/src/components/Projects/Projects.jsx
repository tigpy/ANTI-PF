import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { SectionHeading, Container } from "../common";
import { projectsData } from "../../data/projectsData";
import { staggerContainer } from "../../animations/staggerCards";
import { fadeUp } from "../../animations/fadeUp";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <>
      <section
        id="projects"
        className="py-20 relative overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent-teal) 3%, transparent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <Container>
          <SectionHeading
            title="Projects"
            subtitle="What I've Built"
            accent="var(--accent-green)"
          />

          <div ref={ref}>
            {/* Filter bar */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <FilterBar active={activeFilter} onChange={setActiveFilter} />
            </m.div>

            {/* Project count */}
            <m.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              className="text-center text-text-muted text-sm font-mono font-bold mb-8 -mt-6"
            >
              Showing{" "}
              <span style={{ color: "var(--accent-green)" }}>{filtered.length}</span>{" "}
              project{filtered.length !== 1 ? "s" : ""}
              {activeFilter !== "All" && ` in ${activeFilter}`}
            </m.p>

            {/* Cards grid */}
            <AnimatePresence mode="wait">
              <m.div
                key={activeFilter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenModal={setSelectedProject}
                  />
                ))}
              </m.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Modal — rendered outside section so it overlays everything */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
