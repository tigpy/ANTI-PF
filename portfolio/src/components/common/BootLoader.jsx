import React, { useState, useEffect, useRef } from 'react';
import { cyberSynth } from '../../utils/synth';
import { safeSessionStorage } from '../../utils/storage';

export default function BootLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const BOOT_LOGS = [
    'GEMINI COPROCESSOR BIOS v4.3.0.2',
    'COPYRIGHT (C) 2026 DEEPMIND LABS INC.',
    '----------------------------------------',
    'RAM CHECK: 65,536 KB - OK',
    'CHECKING MAIN STORAGE DRIVES... OK',
    'MOUNTING FILE SYSTEMS: /dev/sda1 -> /var/www... OK',
    'DETECTING TARGET PERIPHERALS...',
    '  - KEYBOARD INPUT MATRIX [DETECTED]',
    '  - MOUSE VECTOR OVERRIDE [DETECTED]',
    '  - WEB AUDIO SYNTH REGISTERED [READY]',
    'PORT CONFIGURATION: INCOMING SUITE ON PORT 443',
    'ESTABLISHING DECRYPT LAYERS...',
    '  - MODULE: HERO_GRID... CONNECTED',
    '  - MODULE: RETRO_CANVAS_3D... STABLE',
    '  - CONFIG: COLOR_MAP_FOREST_GREEN... SEEDED',
    '  - DECOY SECURITY SYSTEMS... ARMED',
    '----------------------------------------',
    'BOOT STATUS: SUCCESSFUL.',
    'PREPARING CYBER SCHEMATIC INTERFACE...',
    'DECRYPTING PORTFOLIO DATA...'
  ];

  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const skipBoot = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsDone(true);
    cyberSynth.playChime();
    safeSessionStorage.setItem('cyber_booted', 'true');
    setTimeout(() => {
      onCompleteRef.current();
    }, 600); // match fade transition
  };

  useEffect(() => {
    // Check if user has already seen the boot screen in this session
    const hasBooted = safeSessionStorage.getItem('cyber_booted') === 'true';
    if (hasBooted) {
      onCompleteRef.current();
      return;
    }

    // Play boot sound if audio is enabled
    setTimeout(() => {
      cyberSynth.playBoot();
    }, 100);

    let lineCount = 0;
    intervalRef.current = setInterval(() => {
      if (lineCount < BOOT_LOGS.length) {
        const nextLine = BOOT_LOGS[lineCount];
        setLogs((prev) => [...prev, nextLine]);
        lineCount++;
        
        // Small tick sound for line write
        cyberSynth.playTick();
        
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(intervalRef.current);
        // Completed loading, initiate grid wipe
        setTimeout(() => {
          setIsDone(true);
          safeSessionStorage.setItem('cyber_booted', 'true');
          setTimeout(() => {
            onCompleteRef.current();
          }, 600);
        }, 300);
      }
    }, 70); // speed of line logs printing

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // If already booted in session, don't render anything
  if (typeof window !== 'undefined' && safeSessionStorage.getItem('cyber_booted') === 'true') {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 font-mono text-sm transition-all duration-500 ease-in-out bg-[#181A1B] text-[#FAF9F6] ${
        isDone ? 'opacity-0 translate-y-[-100vh]' : 'opacity-100 translate-y-0'
      }`}
      onClick={skipBoot}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
      
      {/* Scrollable BIOS log stream */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto max-w-2xl scrollbar-none space-y-1 whitespace-pre-wrap">
        {logs.map((log, index) => {
          let colorClass = 'text-[#FAF9F6]'; // default cream
          if (log.includes('[READY]') || log.includes('[DETECTED]') || log.includes('SUCCESSFUL') || log.includes('OK')) {
            colorClass = 'text-[#1E6F44]'; // forest green
          } else if (log.startsWith('---') || log.includes('GEMINI')) {
            colorClass = 'text-[#2B6282]'; // blueprint blue
          }
          return (
            <div key={index} className={colorClass}>
              {log}
            </div>
          );
        })}
        
        {/* Blinking cursor at the end of the logs */}
        {logs.length < BOOT_LOGS.length && (
          <div className="inline-block w-2.5 h-4 bg-[#1E6F44] animate-pulse ml-0.5" />
        )}
      </div>

      {/* Footer hint */}
      <div className="text-right text-[#FAF9F6]/40 text-xs mt-4">
        <span>CLICK OR PRESS ESC TO BYPASS BOOT</span>
      </div>
    </div>
  );
}
