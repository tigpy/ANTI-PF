import { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

const ContactForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const inputClass = `w-full px-4 py-3 rounded-xl text-text-primary text-sm placeholder-text-muted transition-all duration-300 outline-none font-medium
    bg-bg-secondary border border-border-color
    focus:border-accent-green focus:ring-1 focus:ring-accent-green/35`;

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
          <label className="text-xs font-mono font-bold text-text-muted tracking-wider uppercase">Name</label>
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
          <label className="text-xs font-mono font-bold text-text-muted tracking-wider uppercase">Email</label>
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
        <label className="text-xs font-mono font-bold text-text-muted tracking-wider uppercase">Subject</label>
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
        <label className="text-xs font-mono font-bold text-text-muted tracking-wider uppercase">Message</label>
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
      <m.button
        type="submit"
        disabled={status === "sending"}
        whileHover={status !== "sending" ? { scale: 1.02 } : {}}
        whileTap={status !== "sending" ? { scale: 0.98 } : {}}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-text-primary text-bg-primary hover:bg-accent-green hover:shadow-[3px_3px_0px_var(--text-primary)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
      </m.button>

      {/* Feedback messages */}
      <AnimatePresence>
        {status === "success" && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
            style={{
              background: "color-mix(in srgb, var(--accent-green) 8%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)",
              color: "var(--accent-green)"
            }}
          >
            <CheckCircle size={15} />
            Message sent successfully! I'll get back to you soon.
          </m.div>
        )}
        {status === "error" && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
            style={{
              background: "color-mix(in srgb, var(--accent-orange) 8%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent-orange) 20%, transparent)",
              color: "var(--accent-orange)"
            }}
          >
            <AlertCircle size={15} />
            Something went wrong. Please try again later.
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;
