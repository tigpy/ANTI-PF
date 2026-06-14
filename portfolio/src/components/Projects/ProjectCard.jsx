import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Badge, TiltWrapper } from "../common";
import { staggerItem } from "../../animations/staggerCards";
import DecryptProjectDescription from "./DecryptProjectDescription";

const ProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const categoryColor = {
    Cybersecurity: "#1E6F44", // Vintage Green
    AI:            "#2B6282", // Blueprint Blue
    Web:           "#6366F1", // Indigo
    Cloud:         "#C25E29", // Rust Orange
  };

  const accent = categoryColor[project.category] || "#1E6F44";

  return (
    <TiltWrapper maxRotation={6} className="flex flex-col h-full">
      <motion.div
        variants={staggerItem}
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex flex-col rounded-3xl border-2 border-[#181A1B]/15 overflow-hidden group transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[4px_4px_0px_#181A1B] h-full"
        style={{ background: "rgba(239, 236, 227, 0.7)", backdropFilter: "blur(20px)" }}
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
                background: `${accent}12`,
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
          <div className="relative overflow-hidden aspect-video w-full border-b border-[#181A1B]/10">
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
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
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
          <h3 className="text-[#181A1B] font-bold font-poppins text-lg leading-snug mb-1 group-hover:text-[#1E6F44] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[#8C908D] text-xs font-mono font-semibold mb-3">{project.subtitle}</p>

          {/* Description */}
          <DecryptProjectDescription 
            text={project.description} 
            isHovered={isHovered} 
            accent={accent} 
          />

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
          <div className="flex items-center gap-2 pt-4 border-t border-[#181A1B]/10">
            {/* Details button */}
            <motion.button
              onClick={() => onOpenModal(project)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
              style={{
                background: `${accent}12`,
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#EFECE3] border border-[#181A1B]/15 text-[#5C615D] hover:text-[#181A1B] hover:border-[#181A1B] hover:shadow-[1.5px_1.5px_0px_#181A1B] transition-all duration-200"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#EFECE3] border border-[#181A1B]/15 text-[#5C615D] hover:text-[#2B6282] hover:border-[#2B6282] hover:shadow-[1.5px_1.5px_0px_#181A1B] transition-all duration-200"
              >
                <ExternalLink size={12} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </TiltWrapper>
  );
};

export default ProjectCard;
