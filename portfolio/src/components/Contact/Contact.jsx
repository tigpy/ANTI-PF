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
  { icon: FaGithub,   label: "GitHub",     href: profileData.github,    accent: "#181A1B" },
  { icon: FaLinkedin, label: "LinkedIn",   href: profileData.linkedin,  accent: "#2B6282" },
  { icon: SiTryhackme,label: "TryHackMe",  href: profileData.tryhackme, accent: "#1E6F44" },
];

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(30,111,68,0.035) 0%, transparent 60%)",
        }}
      />

      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Contact Me"
          accent="#1E6F44"
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
              <h3 className="text-[#181A1B] text-2xl font-bold font-poppins mb-3">
                Let's work together
              </h3>
              <p className="text-[#5C615D] text-sm leading-relaxed">
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
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#181A1B]/12 transition-all duration-300 hover:border-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B]"
                  style={{ background: "rgba(239, 236, 227, 0.65)", backdropFilter: "blur(16px)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(30,111,68,0.08)", border: "1px solid rgba(30,111,68,0.25)" }}
                  >
                    <Icon size={16} color="#1E6F44" />
                  </div>
                  <div>
                    <p className="text-[#8C908D] text-xs font-mono font-bold uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-[#181A1B] text-sm font-bold hover:text-[#1E6F44] transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#181A1B] text-sm font-bold">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono font-bold text-[#8C908D] uppercase tracking-widest mb-3">
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#181A1B]/12 text-[#5C615D] transition-all duration-300 hover:bg-[#EAE6DC]"
                    style={{ background: "rgba(239, 236, 227, 0.65)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accent;
                      e.currentTarget.style.borderColor = "#181A1B";
                      e.currentTarget.style.boxShadow = "2px 2px 0px #181A1B";
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
            className="p-8 rounded-3xl border-2 border-[#181A1B]/15"
            style={{
              background: "rgba(239, 236, 227, 0.7)",
              backdropFilter: "blur(20px)",
              boxShadow: "4px 4px 0px #181A1B"
            }}
          >
            <p className="text-xs font-mono font-bold text-[#1E6F44] tracking-widest uppercase mb-6">
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
