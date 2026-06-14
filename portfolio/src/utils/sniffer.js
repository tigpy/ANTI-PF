let listeners = [];
let logs = [];

// Initialize with a few startup diagnostics
if (typeof window !== 'undefined') {
  const time = new Date().toLocaleTimeString('en-US', { hour12: false });
  logs = [
    `[${time}] [CTF] INSTRUCTION: ESCAPE ENCRYPTION CORE VIA 'SHELL' BYPASS.`,
    `[${time}] [PORTFOLIO] SYSTEM LISTENING ON SECURITY PORT 443...`,
    `[${time}] [SYS] RETRO CYBER SCHEMATIC MATRIX READY.`
  ];
}

export const addSnifferLog = (text) => {
  if (typeof window === 'undefined') return;
  const time = new Date().toLocaleTimeString('en-US', { hour12: false });
  const entry = `[${time}] ${text}`;
  
  // Prevent duplicate mouse coordinate logging spams
  if (text.startsWith('[SYS] MOUSE_') && logs.length > 0 && logs[0].includes('[SYS] MOUSE_')) {
    // Replace the last mouse log instead of piling up
    logs[0] = entry;
  } else {
    logs = [entry, ...logs].slice(0, 30); // Maintain last 30 logs
  }
  
  listeners.forEach(listener => {
    try {
      listener(logs);
    } catch (e) {
      // safe bypass
    }
  });
};

export const subscribeSniffer = (listener) => {
  listeners.push(listener);
  listener(logs);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
