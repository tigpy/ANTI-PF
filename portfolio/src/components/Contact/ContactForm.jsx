import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

const ContactForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const inputClass = `w-full px-4 py-3 rounded-xl text-[#181A1B] text-sm placeholder-[#8C908D] transition-all duration-300 outline-none font-medium
    bg-[#FAF9F6] border border-[#181A1B]/15
    focus:border-[#1E6F44] focus:ring-1 focus:ring-[#1E6F44]/35`;

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
          <label className="text-xs font-mono font-bold text-[#8C908D] tracking-wider uppercase">Name</label>
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
          <label className="text-xs font-mono font-bold text-[#8C908D] tracking-wider uppercase">Email</label>
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
        <label className="text-xs font-mono font-bold text-[#8C908D] tracking-wider uppercase">Subject</label>
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
        <label className="text-xs font-mono font-bold text-[#8C908D] tracking-wider uppercase">Message</label>
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
        whileHover={status !== "sending" ? { scale: 1.02 } : {}}
        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-[#181A1B] text-[#F6F5F0] hover:bg-[#1E6F44] hover:shadow-[3px_3px_0px_#181A1B] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
            style={{ background: "rgba(30,111,68,0.08)", border: "1px solid rgba(30,111,68,0.2)", color: "#1E6F44" }}
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
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
            style={{ background: "rgba(194,94,41,0.08)", border: "1px solid rgba(194,94,41,0.2)", color: "#C25E29" }}
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
