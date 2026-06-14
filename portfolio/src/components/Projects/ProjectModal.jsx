import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    Cybersecurity: "#00FF9D",
    AI:            "#4CC9F0",
    Web:           "#A78BFA",
    Cloud:         "#FF9900",
  };
  const accent = categoryColor[project.category] || "#00FF9D";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      >
        {/* Modal panel */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10"
          style={{
            background: "rgba(13,20,38,0.97)",
            backdropFilter: "blur(30px)",
            boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 30px ${accent}15`,
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${accent}, #4CC9F0, transparent)` }}
          />

          {/* Large Project Image */}
          {project.image && (
            <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden border-b border-white/10">
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
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${accent}12`,
                      border: `1px solid ${accent}25`,
                      color: accent,
                    }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold font-poppins text-white leading-tight">
                  {project.title}
                </h2>
                <p className="text-gray-500 text-sm font-mono mt-1">{project.subtitle}</p>
              </div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Key features */}
            <div className="mb-8">
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: accent }}>
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
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: accent }}>
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
                <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: accent }}>
                  Architecture Information
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/8">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 text-sm font-medium transition-all duration-200"
                >
                  <Github size={15} />
                  GitHub Repository
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${accent}40` }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, #4CC9F0)`,
                    color: "#0B1020",
                  }}
                >
                  <ExternalLink size={15} />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProjectModal;
