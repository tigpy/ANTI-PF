import React, { useEffect, useRef } from 'react';

export default function Oscilloscope({ className = '', color = '#1E6F44' }) {
  const canvasRef = useRef(null);
  const mouseActivity = useRef(0);
  const scrollActivity = useRef(0);

  useEffect(() => {
    const handleMouseMove = () => {
      mouseActivity.current = Math.min(mouseActivity.current + 2, 10);
    };

    const handleScroll = () => {
      scrollActivity.current = Math.min(scrollActivity.current + 4, 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = null;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      console.warn("Canvas 2D context retrieval failed/blocked:", e);
      return;
    }

    if (!ctx) return;
    let animId;

    const resize = () => {
      try {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        if (ctx && typeof ctx.scale === 'function') {
          ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        }
      } catch (err) {
        console.warn("Canvas resize hook failed:", err);
      }
    };

    try {
      resize();
      window.addEventListener('resize', resize);
    } catch (err) {
      console.warn("Canvas resize listener setup failed:", err);
    }

    let phase = 0;

    const draw = () => {
      try {
        animId = requestAnimationFrame(draw);
        if (!canvas || !ctx) return;

        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        // Clear with very slight transparency to leave a small phosphor trail
        ctx.fillStyle = 'rgba(246, 245, 240, 0.25)'; // matching ivory cream bg
        ctx.fillRect(0, 0, width, height);

        // Draw oscilloscope grid lines
        ctx.strokeStyle = '#E2DFD5'; // sand grid lines
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        // Vertical grid
        for (let x = 20; x < width; x += 20) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        // Horizontal grid
        for (let y = 20; y < height; y += 20) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Decay activity inputs over time
        mouseActivity.current *= 0.95;
        scrollActivity.current *= 0.95;

        const activity = mouseActivity.current + scrollActivity.current;

        // Render double trace line
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        const centerY = height / 2;

        for (let x = 0; x < width; x++) {
          // Compose multiple sine waves + noise based on activity
          const baseFreq = 0.02;
          const activeFreq = 0.05 + activity * 0.01;
          const amplitude = 3 + activity * 1.5 + Math.sin(phase * 0.1) * 2;
          
          const y = centerY + 
                    Math.sin(x * baseFreq + phase) * (10 + activity) + 
                    Math.sin(x * activeFreq - phase * 1.5) * amplitude + 
                    (Math.random() - 0.5) * (1 + activity * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Clear shadow properties for next elements
        ctx.shadowBlur = 0;

        // Draw readout labels
        ctx.fillStyle = '#181A1B'; // charcoal text
        ctx.font = '9px monospace';
        ctx.fillText(`SIG: VCO_TRC_1`, 8, 14);
        ctx.fillText(`SWP: ${(baseFreq * 100).toFixed(1)}Hz`, 8, 26);
        ctx.fillText(`AMP: ${activity > 0.1 ? (activity * 12).toFixed(0) + 'mV' : '12mV'}`, 8, 38);
        ctx.fillText(`STA: ${activity > 2 ? 'ACTIVE' : 'READY'}`, width - 68, 14);

        phase += 0.15;
      } catch (err) {
        console.warn("Canvas draw frame error:", err);
      }
    };

    try {
      draw();
    } catch (err) {
      console.warn("Canvas initial draw execution failed:", err);
    }

    return () => {
      try {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
      } catch (err) {}
    };
  }, [color]);

  return (
    <div className={`relative border border-[#181A1B] bg-[#F6F5F0] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Scanline CRT overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.06)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
    </div>
  );
}
