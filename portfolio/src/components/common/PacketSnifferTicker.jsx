import React, { useState, useEffect } from 'react';
import { subscribeSniffer } from '../../utils/sniffer';

export default function PacketSnifferTicker() {
  const [logs, setLogs] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeSniffer((newLogs) => {
      setLogs([...newLogs]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[99] hidden lg:block font-mono text-[10px] w-80 border border-text-primary bg-bg-secondary shadow-[3px_3px_0px_var(--text-primary)]">
      {/* Ticker Header */}
      <div 
        className="flex items-center justify-between border-b border-text-primary bg-text-primary text-bg-primary px-2 py-1 cursor-pointer select-none"
        onClick={() => setMinimized(!minimized)}
      >
        <span>[SYS_PACKET_SNIFFER: ON]</span>
        <span>{minimized ? '[+]' : '[-]'}</span>
      </div>

      {/* Ticker Content */}
      {!minimized && (
        <div className="p-2 space-y-1 max-h-24 overflow-y-auto scrollbar-none bg-bg-tertiary relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[size:100%_3px]" />
          {logs.slice(0, 4).map((log, index) => {
            let color = 'text-text-primary'; // charcoal
            if (log.includes('[WARN]') || log.includes('ERR')) {
              color = 'text-accent-orange'; // terracotta orange
            } else if (log.includes('[SYS]')) {
              color = 'text-accent-teal'; // blueprint blue / teal
            } else if (log.includes('PORTFOLIO') || log.includes('200 OK')) {
              color = 'text-accent-green'; // forest green / deep green
            }
            return (
              <div key={index} className={`truncate ${color}`}>
                {log}
              </div>
            );
          })}
        </div>
      )}
    </div>

  );
}
