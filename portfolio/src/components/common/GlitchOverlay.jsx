import React, { useState, useEffect } from 'react';
import { cyberSynth } from '../../utils/synth';
import { addSnifferLog } from '../../utils/sniffer';

export default function GlitchOverlay() {
  const [active, setActive] = useState(false);
  const [reason, setReason] = useState('');

  const triggerGlitch = (cause) => {
    setActive(true);
    setReason(cause);
    cyberSynth.playAlarm();
    addSnifferLog(`[WARN] SECURITY ANOMALY: ${cause} -> INTRUSION OVERLAY ENGAGED`);

    // Glitch timeout to restore normal view
    setTimeout(() => {
      setActive(false);
    }, 2500);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      // Intercept right click for hacker theme gamification
      e.preventDefault();
      triggerGlitch("CTX_MENU_BLOCK_TRAP");
    };

    const handleKeyDown = (e) => {
      // Intercept F12
      if (e.key === 'F12') {
        e.preventDefault();
        triggerGlitch("F12_KEY_BYPASS_ATTEMPT");
      }
      // Intercept Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        triggerGlitch("DEVTOOLS_HOTKEY_DETECTION");
      }
      // Intercept Ctrl+U (View source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        triggerGlitch("VIEW_SOURCE_TRAP");
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6 bg-[#C25E29] text-[#F6F5F0] font-mono select-none">
      {/* Glitching grids and CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(246,245,240,0)_50%,rgba(24,26,27,0.25)_50%)] bg-[size:100%_8px]" />
      
      {/* Visual Glitch Vibrations */}
      <div className="space-y-6 text-center max-w-lg z-10 animate-bounce">
        <div className="border-4 border-[#F6F5F0] p-4 bg-[#181A1B] text-[#C25E29] shadow-[6px_6px_0px_#FAF9F6]">
          <h2 className="text-xl font-bold tracking-widest">[ SECURITY TRAP ENGAGED ]</h2>
        </div>
        
        <div className="space-y-2 text-left bg-[#181A1B] p-5 border-2 border-[#F6F5F0] text-sm text-[#FAF9F6]/90 shadow-[4.5px_4.5px_0px_#C25E29]">
          <div>SYS_TIME: {new Date().toLocaleTimeString()}</div>
          <div>VIOLATION: <span className="text-[#C25E29] font-bold">{reason}</span></div>
          <div>COUNTERMEASURE: DECOY MATRIX DUMP</div>
          <div>ESTIMATED TRACE ROUTE: 127.0.0.1 {"->"} LOCALHOST</div>
          <div className="text-xs text-[#FAF9F6]/50 mt-4 animate-pulse">
            RESTABILIZING SYSTEM UPLINK IN 2.5s...
          </div>
        </div>
      </div>
    </div>
  );
}

