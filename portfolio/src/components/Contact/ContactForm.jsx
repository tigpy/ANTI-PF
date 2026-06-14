import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { glass } from "../../styles/glass";

const ContactForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const inputClass = `w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 transition-all duration-300 outline-none
    bg-[rgba(11,16,32,0.6)] border border-white/10
    focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D]/30`;

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      setStatus("success");
      setFields({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-gray-500 tracking-wider uppercase">Name</label>
          <input
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Aryan Singh"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-gray-500 tracking-wider uppercase">Email</label>
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-gray-500 tracking-wider uppercase">Subject</label>
        <input
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          required
          placeholder="Let's collaborate on a project"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-gray-500 tracking-wider uppercase">Message</label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={status !== "sending" ? { scale: 1.02, boxShadow: "0 0 24px rgba(0,255,157,0.35)" } : {}}
        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #00FF9D, #4CC9F0)",
          color: "#0B1020",
        }}
      >
        {status === "sending" ? (
          <>
            <Loader size={15} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </motion.button>

      {/* Feedback messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(0,255,157,0.08)", border: "1px solid rgba(0,255,157,0.2)", color: "#00FF9D" }}
          >
            <CheckCircle size={15} />
            Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
          >
            <AlertCircle size={15} />
            Something went wrong. Please try again later.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;
