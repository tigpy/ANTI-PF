import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { profileData } from "../../data/profileData";
import { cyberSynth } from "../../utils/synth";
import { addSnifferLog } from "../../utils/sniffer";

const CHARS = " .:-=+*#%@";

const ProfileImage = () => {
  const [showAscii, setShowAscii] = useState(false);
  const [asciiText, setAsciiText] = useState("");
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const generateAscii = () => {
    const img = imgRef.current;
    if (!img) return;

    try {
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas 2D context retrieval failed");
      const width = 50;
      const height = 50;
      canvas.width = width;
      canvas.height = height;

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let ascii = "";

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a < 50) {
            ascii += " ";
          } else {
            // Standard relative luminance formula
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            const charIdx = Math.floor((gray / 255) * (CHARS.length - 1));
            ascii += CHARS[charIdx];
          }
        }
        ascii += "\n";
      }

      setAsciiText(ascii);
    } catch (e) {
      console.warn("CORS/Canvas security block: fallback ASCII text grid active.", e);
      // Fallback matrix of initials if canvas reading is blocked (CORS)
      let fallback = "";
      for (let y = 0; y < 45; y++) {
        for (let x = 0; x < 45; x++) {
          fallback += (x + y) % 3 === 0 ? "█" : (x % 2 === 0 ? "▒" : " ");
        }
        fallback += "\n";
      }
      setAsciiText(fallback);
    }
  };

  const handleToggle = () => {
    const nextState = !showAscii;
    setShowAscii(nextState);
    cyberSynth.playChime();
    addSnifferLog(`[SYS] PROFILE FILTER SWITCHED: ${nextState ? "ASCII" : "RAW_DATA"}`);
    if (nextState) {
      generateAscii();
    }
  };

  // Run on mount once image is loaded
  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        generateAscii();
      } else {
        imgRef.current.onload = generateAscii;
      }
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 select-none">
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Outer rotating gradient ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin-ring"
        style={{
          background: "conic-gradient(from 0deg, #1E6F44, #C25E29, transparent, #1E6F44)",
          padding: "3.5px",
          borderRadius: "50%",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "#F6F5F0" }}
        />
      </div>

      {/* Inner static glow ring */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          boxShadow: "0 0 25px rgba(30,111,68,0.08), inset 0 0 25px rgba(30,111,68,0.03)",
        }}
      />

      {/* Profile Container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        className="relative z-10 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full overflow-hidden border-2 border-[#181A1B]/15 bg-[#FAF9F6]"
      >
        {!showAscii ? (
          <img
            ref={imgRef}
            src="/assets/profile/profile.png"
            alt={profileData.name}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            onLoad={generateAscii}
            onError={(e) => {
              // Fallback avatar if image not found
              e.target.style.display = "none";
              e.target.parentElement.style.background =
                "linear-gradient(135deg, #EFECE3 0%, #FAF9F6 100%)";
              const initials = document.createElement("span");
              initials.textContent = "AS";
              initials.style.cssText =
                "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:700;color:#1E6F44;font-family:Poppins,sans-serif;";
              e.target.parentElement.appendChild(initials);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#F6F5F0] overflow-hidden">
            {/* Scanline CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%)] bg-[size:100%_3px]" />
            <pre className="text-[3px] md:text-[3.5px] lg:text-[4px] leading-[3px] md:leading-[3.5px] lg:leading-[4px] font-mono tracking-[0.5px] text-[#1E6F44] font-bold text-center select-none w-full h-full flex items-center justify-center">
              {asciiText}
            </pre>
          </div>
        )}
      </motion.div>

      {/* Floating Filter Switch Badge */}
      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 z-20 flex items-center px-2 py-0.5 rounded border border-[#181A1B] text-[9px] font-mono font-bold bg-[#EFECE3] text-[#181A1B] hover:bg-[#FAF9F6] shadow-[1.5px_1.5px_0px_#181A1B] active:translate-y-[1px] active:shadow-none transition-all"
        title="Toggle Monospace ASCII Filter"
      >
        <span>{showAscii ? "[RAW_IMG]" : "[ASCII]"}</span>
      </button>

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-mono whitespace-nowrap"
        style={{
          background: "#FAF9F6",
          border: "2.5px solid #181A1B",
          boxShadow: "2.5px 2.5px 0px #181A1B",
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#1E6F44] animate-pulse" />
        <span className="text-[#1E6F44]">Available for opportunities</span>
      </motion.div>
    </div>
  );
};

export default ProfileImage;

