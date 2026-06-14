import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Badge } from "../common";
import { staggerItem } from "../../animations/staggerCards";

const ProjectCard = ({ project, onOpenModal }) => {
  const categoryColor = {
    Cybersecurity: "#00FF9D",
    AI:            "#4CC9F0",
    Web:           "#A78BFA",
    Cloud:         "#FF9900",
  };

  const accent = categoryColor[project.category] || "#00FF9D";

  return (
    <motion.div
      variants={staggerItem}
      layout
      className="relative flex flex-col rounded-3xl border border-white/10 overflow-hidden group transition-all duration-300 hover:border-[#00FF9D]/30 hover:shadow-[0_0_35px_rgba(0,255,157,0.1)]"
      style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full transition-all duration-500 group-hover:opacity-100 opacity-60"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            Featured
          </span>
        </div>
      )}

      {/* Project Thumbnail */}
      {project.image && (
        <div className="relative overflow-hidden aspect-video w-full border-b border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Category + year row */}
        <div className="flex items-center justify-between mb-4">
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
        </div>

        {/* Title + subtitle */}
        <h3 className="text-white font-bold font-poppins text-lg leading-snug mb-1 group-hover:text-[#00FF9D] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-500 text-xs font-mono mb-3">{project.subtitle}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" size="sm">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/8">
          {/* Details button */}
          <motion.button
            onClick={() => onOpenModal(project)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}25`,
              color: accent,
            }}
          >
            <Eye size={12} />
            Details
          </motion.button>

          {/* GitHub */}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              <Github size={12} />
              GitHub
            </motion.a>
          )}

          {/* Live */}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400 hover:text-[#4CC9F0] hover:border-[#4CC9F0]/30 transition-all duration-200"
            >
              <ExternalLink size={12} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
