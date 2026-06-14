import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import ContactForm from "./ContactForm";
import { TerminalCard, SectionHeading, Container } from "../common";
import { profileData } from "../../data/profileData";
import { slideLeft } from "../../animations/slideLeft";
import { slideRight } from "../../animations/slideRight";
import { staggerContainer, staggerItem } from "../../animations/staggerCards";

const contactTerminalLines = [
  { prompt: true,  text: "cat contact.txt" },
  { prompt: false, text: `email   → ${profileData.email}` },
  { prompt: false, text: `location→ ${profileData.location}` },
  { prompt: false, text: `status  → Open to opportunities` },
  { prompt: true,  text: "echo $RESPONSE_TIME" },
  { prompt: false, text: "Usually within 24 hours" },
  { prompt: true,  text: "echo $AVAILABILITY" },
  { prompt: false, text: "Remote / On-site Mumbai" },
];

const contactInfo = [
  { icon: Mail,    label: "Email",    value: profileData.email,    href: `mailto:${profileData.email}` },
  { icon: MapPin,  label: "Location", value: profileData.location, href: null },
];

const socials = [
  { icon: FaGithub,   label: "GitHub",     href: profileData.github,    accent: "#ffffff" },
  { icon: FaLinkedin, label: "LinkedIn",   href: profileData.linkedin,  accent: "#4CC9F0" },
  { icon: SiTryhackme,label: "TryHackMe",  href: profileData.tryhackme, accent: "#00FF9D" },
];

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      // bg handled globally
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(0,255,157,0.05) 0%, transparent 60%)",
        }}
      />

      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Contact Me"
          accent="#00FF9D"
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: info + terminal ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Heading */}
            <div>
              <h3 className="text-white text-2xl font-bold font-poppins mb-3">
                Let's work together
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm currently open to internship opportunities, freelance projects,
                and collaborations in cybersecurity, AI-security, and full-stack
                development. Feel free to reach out!
              </p>
            </div>

            {/* Contact info items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-3"
            >
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 transition-all duration-300 hover:border-[#00FF9D]/25"
                  style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(16px)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,255,157,0.1)", border: "1px solid rgba(0,255,157,0.2)" }}
                  >
                    <Icon size={16} color="#00FF9D" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-[#00FF9D] transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, accent }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 text-gray-400 transition-all duration-300 hover:bg-white/8"
                    style={{ background: "rgba(19,27,46,0.55)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accent;
                      e.currentTarget.style.borderColor = `${accent}40`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${accent}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <TerminalCard
              title="aryan@contact ~ "
              lines={contactTerminalLines}
            />
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="p-8 rounded-3xl border border-white/10"
            style={{ background: "rgba(19,27,46,0.55)", backdropFilter: "blur(20px)" }}
          >
            <p className="text-xs font-mono text-[#00FF9D] tracking-widest uppercase mb-6">
              Send a message
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
