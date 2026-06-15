import { useEffect } from "react";
import { m } from "framer-motion";
import { X, ExternalLink, CheckCircle } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Badge } from "../common";

const ProjectModal = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const categoryColor = {
    Cybersecurity: "var(--accent-green)",
    AI:            "var(--accent-teal)",
    Web:           "var(--accent-teal)",
    Cloud:         "var(--accent-orange)",
  };
  const accent = categoryColor[project.category] || "var(--accent-green)";

  return (
    <>
      {/* Backdrop */}
      <m.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        {/* Modal panel */}
        <m.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-border-color"
          style={{
            background: "var(--bg-tertiary)",
            boxShadow: "4px 4px 0px var(--text-primary)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${accent}, var(--accent-teal), transparent)` }}
          />

          {/* Large Project Image */}
          {project.image && (
            <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden border-b border-border-color/60">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                      color: accent,
                    }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-bg-secondary border border-border-color text-text-secondary">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold font-poppins text-text-primary leading-tight">
                  {project.title}
                </h2>
                <p className="text-text-muted text-sm font-mono font-semibold mt-1">{project.subtitle}</p>
              </div>

              {/* Close button */}
              <m.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-bg-secondary border border-border-color text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[2px_2px_0px_var(--text-primary)] transition-all duration-200 cursor-pointer"
              >
                <X size={16} />
              </m.button>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Key features */}
            <div className="mb-8">
              <p className="text-xs font-mono font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>
                Key Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={14}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: accent }}
                    />
                    <span className="text-text-primary font-semibold text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-xs font-mono font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="default" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Architecture Information */}
            {project.architecture && (
              <div className="mb-8">
                <p className="text-xs font-mono font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>
                  Architecture Information
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-border-color">
              {project.github && (
                <m.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-secondary border border-border-color text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[2.5px_2.5px_0px_var(--text-primary)] text-sm font-bold transition-all duration-200"
                >
                  <Github size={15} />
                  GitHub Repository
                </m.a>
              )}
              {project.live && (
                <m.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-text-primary text-bg-primary hover:bg-accent-green hover:shadow-[2.5px_2.5px_0px_var(--text-primary)] transition-all duration-200"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </m.a>
              )}
            </div>
          </div>
        </m.div>
      </m.div>
    </>
  );
};

export default ProjectModal;
