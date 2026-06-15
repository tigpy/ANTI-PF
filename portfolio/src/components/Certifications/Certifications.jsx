import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import CertCard from "./CertCard";
import { SectionHeading, Container } from "../common";
import { certificationsData } from "../../data/certificationsData";
import { staggerContainer } from "../../animations/staggerCards";
import { fadeUp } from "../../animations/fadeUp";

const Certifications = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeImage, setActiveImage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    if (!activeImage) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImage]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const completed = certificationsData.filter((c) => c.status === "Completed");
  const pursuing  = certificationsData.filter((c) => c.status === "Pursuing");

  return (
    <>
      <section id="certifications" className="py-32 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 3%, transparent) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <Container>
          <SectionHeading
            title="Certifications"
            subtitle="Credentials & Learning"
            accent="var(--accent-green)"
          />

          <div ref={ref}>
            {/* ── Completed ── */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={16} className="text-accent-green" />
                <span className="text-sm font-bold font-mono text-text-secondary tracking-widest uppercase">
                  Completed
                </span>
                <div className="flex-1 h-px bg-border-color/60" />
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "color-mix(in srgb, var(--accent-green) 8%, transparent)",
                    color: "var(--accent-green)",
                    border: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)"
                  }}
                >
                  {completed.length} earned
                </span>
              </div>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
            >
              {completed.map((cert) => (
                <CertCard key={cert.id} cert={cert} onOpenLightbox={setActiveImage} />
              ))}
            </m.div>

            {/* ── Pursuing ── */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={16} className="text-accent-orange" />
                <span className="text-sm font-bold font-mono text-text-secondary tracking-widest uppercase">
                  Currently Pursuing
                </span>
                <div className="flex-1 h-px bg-border-color/60" />
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "color-mix(in srgb, var(--accent-orange) 8%, transparent)",
                    color: "var(--accent-orange)",
                    border: "1px solid color-mix(in srgb, var(--accent-orange) 20%, transparent)"
                  }}
                >
                  {pursuing.length} in progress
                </span>
              </div>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {pursuing.map((cert) => (
                <CertCard key={cert.id} cert={cert} onOpenLightbox={setActiveImage} />
              ))}
            </m.div>
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-55 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-text-primary"
              style={{
                background: "var(--bg-tertiary)",
                boxShadow: "4px 4px 0px var(--text-primary)",
              }}
            >
              {/* Close Button */}
              <m.button
                onClick={() => setActiveImage(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-bg-secondary border border-border-color text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[2px_2px_0px_var(--text-primary)] transition-all duration-200"
              >
                <X size={16} />
              </m.button>
              
              <img
                src={activeImage}
                alt="Certificate Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;
