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
    <div className="fixed bottom-4 right-4 z-[99] hidden lg:block font-mono text-[10px] w-80 border border-[#181A1B] bg-[#EFECE3] shadow-[3px_3px_0px_#181A1B]">
      {/* Ticker Header */}
      <div 
        className="flex items-center justify-between border-b border-[#181A1B] bg-[#181A1B] text-[#FAF9F6] px-2 py-1 cursor-pointer select-none"
        onClick={() => setMinimized(!minimized)}
      >
        <span>[SYS_PACKET_SNIFFER: ON]</span>
        <span>{minimized ? '[+]' : '[-]'}</span>
      </div>

      {/* Ticker Content */}
      {!minimized && (
        <div className="p-2 space-y-1 max-h-24 overflow-y-auto scrollbar-none bg-[#FAF9F6] relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[size:100%_3px]" />
          {logs.slice(0, 4).map((log, index) => {
            let color = 'text-[#181A1B]'; // charcoal
            if (log.includes('[WARN]') || log.includes('ERR')) {
              color = 'text-[#C25E29]'; // terracotta orange
            } else if (log.includes('[SYS]')) {
              color = 'text-[#2B6282]'; // blueprint blue
            } else if (log.includes('PORTFOLIO') || log.includes('200 OK')) {
              color = 'text-[#1E6F44]'; // forest green
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
