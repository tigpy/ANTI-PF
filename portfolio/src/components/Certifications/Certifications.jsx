import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <Container>
          <SectionHeading
            title="Certifications"
            subtitle="Credentials & Learning"
            accent="#00FF9D"
          />

          <div ref={ref}>
            {/* ── Completed ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={16} className="text-[#00FF9D]" />
                <span className="text-sm font-mono text-gray-400 tracking-widest uppercase">
                  Completed
                </span>
                <div className="flex-1 h-px bg-white/8" />
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,255,157,0.08)", color: "#00FF9D", border: "1px solid rgba(0,255,157,0.2)" }}
                >
                  {completed.length} earned
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
            >
              {completed.map((cert) => (
                <CertCard key={cert.id} cert={cert} onOpenLightbox={setActiveImage} />
              ))}
            </motion.div>

            {/* ── Pursuing ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={16} className="text-[#FF9900]" />
                <span className="text-sm font-mono text-gray-400 tracking-widest uppercase">
                  Currently Pursuing
                </span>
                <div className="flex-1 h-px bg-white/8" />
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,153,0,0.08)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.2)" }}
                >
                  {pursuing.length} in progress
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {pursuing.map((cert) => (
                <CertCard key={cert.id} cert={cert} onOpenLightbox={setActiveImage} />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10"
              style={{
                background: "rgba(13,20,38,0.9)",
                boxShadow: "0 0 50px rgba(0,0,0,0.8)",
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setActiveImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-black/60 border border-white/10 text-gray-300 hover:text-white transition-all duration-200"
              >
                <X size={16} />
              </motion.button>
              
              <img
                src={activeImage}
                alt="Certificate Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;
