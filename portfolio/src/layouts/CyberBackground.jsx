import { useEffect, useRef } from "react";

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = window.innerWidth;
    let H = document.documentElement.scrollHeight;

    const resize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // ── NODE NETWORK ──────────────────────────────────────────
    const NODE_COUNT = Math.floor((W * H) / 28000);
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02,
      type: Math.random() > 0.85 ? "hub" : "node", // hubs are larger, brighter
    }));

    // ── PACKET SYSTEM ─────────────────────────────────────────
    const packets = [];
    const spawnPacket = () => {
      if (packets.length > 28) return;
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      const dst = nodes[Math.floor(Math.random() * nodes.length)];
      if (src === dst) return;
      const dist = Math.hypot(dst.x - src.x, dst.y - src.y);
      if (dist > 320 || dist < 60) return;
      packets.push({
        sx: src.x, sy: src.y,
        dx: dst.x, dy: dst.y,
        t: 0,
        speed: 0.004 + Math.random() * 0.006,
        color: Math.random() > 0.4 ? "#00FF9D" : "#4CC9F0",
        size: Math.random() * 2 + 1.2,
        trail: [],
      });
    };
    setInterval(spawnPacket, 320);

    // ── SCAN LINE ─────────────────────────────────────────────
    let scanY = 0;
    const SCAN_SPEED = 0.4;

    // ── HEX DIGITS (floating) ─────────────────────────────────
    const hexChars = "0123456789ABCDEF";
    const floaters = Array.from({ length: 38 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      char: hexChars[Math.floor(Math.random() * hexChars.length)],
      alpha: Math.random() * 0.12 + 0.03,
      size: Math.floor(Math.random() * 6) + 8,
      speed: Math.random() * 0.18 + 0.06,
      changeTimer: Math.random() * 80,
    }));

    // ── GRID ──────────────────────────────────────────────────
    const GRID = 60;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 1. Grid
      ctx.strokeStyle = "rgba(76,201,240,0.028)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // 2. Scan line
      scanY = (scanY + SCAN_SPEED) % H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 4);
      scanGrad.addColorStop(0, "rgba(0,255,157,0)");
      scanGrad.addColorStop(0.7, "rgba(0,255,157,0.018)");
      scanGrad.addColorStop(1, "rgba(0,255,157,0.06)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 64);

      // 3. Node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12;
            ctx.strokeStyle = `rgba(76,201,240,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Nodes
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;

        if (n.type === "hub") {
          // Hub: glowing ring + dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,255,157,${0.06 + glow * 0.1})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,157,${0.5 + glow * 0.4})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(76,201,240,${0.25 + glow * 0.35})`;
          ctx.fill();
        }

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // 5. Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;

        const cx = p.sx + (p.dx - p.sx) * p.t;
        const cy = p.sy + (p.dy - p.sy) * p.t;

        // Trail
        p.trail.push({ x: cx, y: cy });
        if (p.trail.length > 14) p.trail.shift();

        // Draw trail
        p.trail.forEach((pt, ti) => {
          const alpha = (ti / p.trail.length) * 0.55;
          const r = (ti / p.trail.length) * p.size;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(")", `,${alpha})`).replace("rgb(", "rgba(");
          // simple alpha approach:
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        // Head dot
        ctx.beginPath();
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.t >= 1) packets.splice(i, 1);
      }

      // 6. Floating hex chars
      floaters.forEach((f) => {
        f.y += f.speed;
        f.changeTimer--;
        if (f.changeTimer <= 0) {
          f.char = hexChars[Math.floor(Math.random() * hexChars.length)];
          f.changeTimer = 40 + Math.random() * 80;
          f.alpha = Math.random() * 0.1 + 0.025;
        }
        if (f.y > H) { f.y = 0; f.x = Math.random() * W; }

        ctx.font = `${f.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(0,255,157,${f.alpha})`;
        ctx.fillText(f.char, f.x, f.y);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
    />
  );
};

export default CyberBackground;
