import React, { useState, useEffect, useRef } from 'react';
import { cyberSynth } from '../../utils/synth';

const GLYPHS = '!@#$%^&*()_+-=[]{}|;:\x3c\x3e?,./0123456789ABCDEF█▒░';

export default function DecryptText({ text, className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const animationFrame = useRef(null);

  const startScramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const originalText = text;
    const length = originalText.length;
    let iteration = 0;
    const maxIterations = length * 3; // total ticks

    const scramble = () => {
      let scrambled = '';
      
      for (let i = 0; i < length; i++) {
        // Characters before the current progress resolve
        if (i < iteration / 3) {
          scrambled += originalText[i];
        } else {
          // Scramble characters ahead of progress
          if (originalText[i] === ' ') {
            scrambled += ' ';
          } else {
            scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
      }

      setDisplayText(scrambled);

      // Play tick sound periodically (throttled slightly so it doesn't overload Web Audio)
      if (iteration % 2 === 0) {
        cyberSynth.playTick();
      }

      if (iteration < maxIterations) {
        iteration++;
        animationFrame.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(originalText);
        isAnimating.current = false;
      }
    };

    animationFrame.current = requestAnimationFrame(scramble);
  };

  useEffect(() => {
    // Sync if text prop changes
    setDisplayText(text);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [text]);

  return (
    <span 
      className={`inline-block select-none cursor-pointer ${className}`} 
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
}
