import { useState, useEffect, useCallback } from "react";

/**
 * useTypewriter — character-by-character typing animation.
 *
 * @param {string[]} texts  — array of strings to cycle through
 * @param {number}   speed  — ms per character (default: 80)
 * @param {number}   pause  — ms to pause at full word (default: 1800)
 *
 * @returns { displayText, isTyping }
 */
const useTypewriter = (texts = [], speed = 80, pause = 1800) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const tick = useCallback(() => {
    const current = texts[index % texts.length];

    if (!isDeleting) {
      setDisplayText(current.slice(0, charIndex + 1));
      setCharIndex((c) => c + 1);

      if (charIndex + 1 === current.length) {
        setIsTyping(false);
        setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      setDisplayText(current.slice(0, charIndex - 1));
      setCharIndex((c) => c - 1);

      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setIsTyping(true);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
  }, [texts, index, charIndex, isDeleting, pause]);

  useEffect(() => {
    if (texts.length === 0) return;
    const timeout = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [tick, speed, isDeleting]);

  return { displayText, isTyping };
};

export default useTypewriter;
