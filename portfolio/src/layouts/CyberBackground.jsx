import { useEffect, useRef } from "react";

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = null;
    try {
      ctx = canvas.getContext("2d");
    } catch (e) {
      console.warn("Background canvas context retrieval failed/blocked:", e);
      return;
    }

    if (!ctx) return;

    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight; // Constrain canvas height to viewport to prevent massive repaints

    const resize = () => {
      try {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
      } catch (err) {}
    };
    resize();

    // ── NODE NETWORK ──────────────────────────────────────────
    // Limit to a constant 50 nodes regardless of page length to optimize CPU computations
    const NODE_COUNT = 50;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.015,
      type: Math.random() > 0.88 ? "hub" : "node", // hubs are larger, brighter
    }));

    // ── PACKET SYSTEM ─────────────────────────────────────────
    const packets = [];
    const spawnPacket = () => {
      if (packets.length > 20) return;
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      const dst = nodes[Math.floor(Math.random() * nodes.length)];
      if (src === dst) return;
      const dist = Math.hypot(dst.x - src.x, dst.y - src.y);
      if (dist > 300 || dist < 60) return;
      packets.push({
        sx: src.x, sy: src.y,
        dx: dst.x, dy: dst.y,
        t: 0,
        speed: 0.003 + Math.random() * 0.005,
        color: Math.random() > 0.55 ? "#1E6F44" : "#C25E29", // Green vs Rust Orange
        size: Math.random() * 2 + 1.2,
        trail: [],
      });
    };
    const spawnInterval = setInterval(spawnPacket, 400);

    // ── SCAN LINE ─────────────────────────────────────────────
    let scanY = 0;
    const SCAN_SPEED = 0.35;

    // ── HEX DIGITS (floating watermark characters) ─────────────
    const hexChars = "0123456789ABCDEF<>[]{}$%@#";
    const floaters = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      char: hexChars[Math.floor(Math.random() * hexChars.length)],
      alpha: Math.random() * 0.05 + 0.015, // Very subtle watermarks
      size: Math.floor(Math.random() * 6) + 8,
      speed: Math.random() * 0.12 + 0.04,
      changeTimer: Math.random() * 80,
    }));

    // ── 3D VECTOR SPHERE GENERATION ────────────────────────────
    const spherePoints = [];
    const R = 190; // sphere radius
    const rings = 8;
    const pointsPerRing = 12;
    for (let i = 0; i < rings; i++) {
      const phi = (Math.PI * i) / (rings - 1);
      for (let j = 0; j < pointsPerRing; j++) {
        const theta = (2 * Math.PI * j) / pointsPerRing;
        const x = R * Math.sin(phi) * Math.cos(theta);
        const y = R * Math.cos(phi);
        const z = R * Math.sin(phi) * Math.sin(theta);
        spherePoints.push({ x, y, z });
      }
    }

    // ── GRID ──────────────────────────────────────────────────
    const GRID = 80;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Blueprint Grid Lines (very faint sand-charcoal in light / light grey in dark)
      ctx.strokeStyle = isDark ? "rgba(250, 249, 246, 0.018)" : "rgba(24, 26, 27, 0.015)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // 2. Subtle screen refresh line
      scanY = (scanY + SCAN_SPEED) % H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 4);
      scanGrad.addColorStop(0, "rgba(30,111,68,0)");
      scanGrad.addColorStop(0.7, "rgba(30,111,68,0.005)");
      scanGrad.addColorStop(1, "rgba(30,111,68,0.025)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 80, W, 84);

      // 3. Node connections (blueprint slate-blue)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distSq = dx * dx + dy * dy;
          // Compare against squared threshold (150 * 150 = 22500) to bypass Math.sqrt
          if (distSq < 22500) {
            const dist = Math.sqrt(distSq); // Only calculate root when nodes are close
            const alpha = (1 - dist / 150) * 0.075;
            ctx.strokeStyle = `rgba(43, 98, 130, ${alpha})`;
            ctx.lineWidth = 0.5;
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
          // Hub: forest green glowing rings
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(30, 111, 68, ${0.04 + glow * 0.07})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(30, 111, 68, ${0.35 + glow * 0.25})`;
          ctx.fill();
        } else {
          // Standard node: blueprint slate-blue
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(43, 98, 130, ${0.2 + glow * 0.2})`;
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
        if (p.trail.length > 12) p.trail.shift();

        // Draw trail
        p.trail.forEach((pt, ti) => {
          const alpha = (ti / p.trail.length) * 0.45;
          const r = (ti / p.trail.length) * p.size;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        // Head dot
        ctx.beginPath();
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.t >= 1) packets.splice(i, 1);
      }

      // 6. Floating hex chars (charcoal watermarks)
      floaters.forEach((f) => {
        f.y += f.speed;
        f.changeTimer--;
        if (f.changeTimer <= 0) {
          f.char = hexChars[Math.floor(Math.random() * hexChars.length)];
          f.changeTimer = 60 + Math.random() * 90;
          f.alpha = Math.random() * 0.05 + 0.015;
        }
        if (f.y > H) { f.y = 0; f.x = Math.random() * W; }

        ctx.font = `${f.size}px 'JetBrains Mono', monospace`;
        const charColorBase = isDark ? "250, 249, 246" : "24, 26, 27";
        ctx.fillStyle = `rgba(${charColorBase}, ${f.alpha})`;
        ctx.fillText(f.char, f.x, f.y);
      });

      // 7. Interactive 3D Rotating Vector Globe in Hero Background
      const sphereCenterX = W > 1024 ? W * 0.78 : W * 0.5;
      const sphereCenterY = W > 1024 ? 350 : 280;

      let sphereAngleX = (Date.now() * 0.00018) % (Math.PI * 2);
      let sphereAngleY = (Date.now() * 0.00025) % (Math.PI * 2);

      const projected = spherePoints.map((p) => {
        // Rotate Y
        const cosY = Math.cos(sphereAngleY);
        const sinY = Math.sin(sphereAngleY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate X
        const cosX = Math.cos(sphereAngleX);
        const sinX = Math.sin(sphereAngleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const fov = 420;
        const scale = fov / (fov + z2);
        const projX = sphereCenterX + x1 * scale;
        const projY = sphereCenterY + y2 * scale;

        return { x: projX, y: projY, z: z2, scale };
      });

      // Draw latitude circles
      ctx.strokeStyle = "rgba(43, 98, 130, 0.06)"; // Faint blueprint slate-blue
      ctx.lineWidth = 0.55;
      for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        for (let j = 0; j < pointsPerRing; j++) {
          const idx = i * pointsPerRing + j;
          const p = projected[idx];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw longitude arcs
      for (let j = 0; j < pointsPerRing; j++) {
        ctx.beginPath();
        for (let i = 0; i < rings; i++) {
          const idx = i * pointsPerRing + j;
          const p = projected[idx];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw glowing coordinate intersection nodes on front-facing sphere hemisphere
      projected.forEach((p) => {
        if (p.z < 0) { // Front face nodes (z is negative as fov + z2 fov is camera focal)
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(30, 111, 68, 0.22)"; // Vintage green nodes
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(spawnInterval);
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
