import React, { useState } from "react";
import { m } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Badge, TiltWrapper } from "../common";
import { staggerItem } from "../../animations/staggerCards";
import DecryptProjectDescription from "./DecryptProjectDescription";

const ProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const categoryColor = {
    Cybersecurity: "var(--accent-green)", // Vintage Green / Teal
    AI:            "var(--accent-teal)",  // Blueprint Blue / Teal Blue
    Web:           "var(--accent-teal)",  // Blueprint Blue / Teal Blue
    Cloud:         "var(--accent-orange)", // Rust Orange / Terracotta
  };

  const accent = categoryColor[project.category] || "var(--accent-green)";

  return (
    <TiltWrapper maxRotation={6} className="flex flex-col h-full">
      <m.div
        variants={staggerItem}
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex flex-col rounded-3xl border-2 border-border-color overflow-hidden group transition-all duration-300 hover:border-accent-green hover:shadow-[4px_4px_0px_var(--text-primary)] h-full"
        style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", "--project-accent": accent }}
      >
        {/* Top accent bar */}
        <div
          className="h-0.5 w-full transition-all duration-500 group-hover:opacity-100 opacity-60"
          style={{ background: "linear-gradient(90deg, var(--project-accent), transparent)" }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
              style={{
                background: "color-mix(in srgb, var(--project-accent) 7%, transparent)",
                border: "1px solid color-mix(in srgb, var(--project-accent) 18%, transparent)",
                color: "var(--project-accent)",
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Project Thumbnail */}
        {project.image && (
          <div className="relative overflow-hidden aspect-video w-full border-b border-border-color/30">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
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
                background: "color-mix(in srgb, var(--project-accent) 7%, transparent)",
                border: "1px solid color-mix(in srgb, var(--project-accent) 15%, transparent)",
                color: "var(--project-accent)",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title + subtitle */}
          <h3 className="text-text-primary font-bold font-poppins text-lg leading-snug mb-1 group-hover:text-accent-green transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-text-muted text-xs font-mono font-semibold mb-3">{project.subtitle}</p>

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
          <div className="flex items-center gap-2 pt-4 border-t border-border-color/60">
            {/* Details button */}
            <m.button
              onClick={() => onOpenModal(project)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
              style={{
                background: "color-mix(in srgb, var(--project-accent) 7%, transparent)",
                border: "1px solid color-mix(in srgb, var(--project-accent) 15%, transparent)",
                color: "var(--project-accent)",
              }}
            >
              <Eye size={12} />
              Details
            </m.button>

            {/* GitHub */}
            {project.github && (
              <m.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-bg-secondary border border-border-color text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[1.5px_1.5px_0px_var(--text-primary)] transition-all duration-200"
              >
                <Github size={12} />
                GitHub
              </m.a>
            )}

            {/* Live */}
            {project.live && (
              <m.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-bg-secondary border border-border-color text-text-secondary hover:text-accent-teal hover:border-accent-teal hover:shadow-[1.5px_1.5px_0px_var(--text-primary)] transition-all duration-200"
              >
                <ExternalLink size={12} />
                Live Demo
              </m.a>
            )}
          </div>
        </div>
      </m.div>
    </TiltWrapper>
  );
};

export default React.memo(ProjectCard);
