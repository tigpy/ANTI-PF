import { useEffect, useRef } from "react";

// ── PERFORMANCE DETECTION HELPER ─────────────────────────────
const detectPerformance = () => {
  const isMobile = !window.matchMedia("(pointer: fine)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const isLowEnd = cores <= 2 || (isMobile && cores <= 4);

  if (isMobile) {
    if (isLowEnd) {
      return {
        fps: 20,
        nodeCount: 12,
        maxPackets: 4,
        floaterCount: 8,
        enableSphere: false,
      };
    } else {
      return {
        fps: 30,
        nodeCount: 18,
        maxPackets: 6,
        floaterCount: 12,
        enableSphere: false, // Mobile disables 3D sphere to prevent layout/battery drain
      };
    }
  } else {
    if (isLowEnd) {
      return {
        fps: 60,
        nodeCount: 30,
        maxPackets: 12,
        floaterCount: 20,
        enableSphere: true,
      };
    } else {
      return {
        fps: 120,
        nodeCount: 50,
        maxPackets: 20,
        floaterCount: 30,
        enableSphere: true,
      };
    }
  }
};

// ── PACKET ENGINE (Nodes & Packet Trails) ────────────────────
class PacketEngine {
  constructor(nodeCount, maxPackets) {
    this.nodeCount = nodeCount;
    this.maxPackets = maxPackets;
    this.nodes = [];
    this.packets = [];
    this.paused = false;
    this.lastSpawn = 0;
    this.spawnInterval = 500; // ms
  }

  init(W, H) {
    this.nodes = Array.from({ length: this.nodeCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.015,
      type: Math.random() > 0.88 ? "hub" : "node",
    }));
    this.packets = [];
  }

  resize(W, H) {
    this.nodes.forEach((n) => {
      n.x = Math.min(n.x, W);
      n.y = Math.min(n.y, H);
    });
  }

  update(W, H, timestamp) {
    if (this.paused) return;

    // Move nodes
    this.nodes.forEach((n) => {
      n.pulse += n.pulseSpeed;
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Move packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.t += p.speed;

      const cx = p.sx + (p.dx - p.sx) * p.t;
      const cy = p.sy + (p.dy - p.sy) * p.t;

      p.trail.push({ x: cx, y: cy });
      if (p.trail.length > 12) p.trail.shift();

      if (p.t >= 1) {
        this.packets.splice(i, 1);
      }
    }

    // Spawn packets
    if (timestamp - this.lastSpawn > this.spawnInterval) {
      this.lastSpawn = timestamp;
      if (this.packets.length < this.maxPackets && this.nodes.length > 1) {
        const src = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        const dst = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        if (src && dst && src !== dst) {
          const distSq = (dst.x - src.x) ** 2 + (dst.y - src.y) ** 2;
          if (distSq < 90000 && distSq > 3600) { // between 60px and 300px
            this.packets.push({
              sx: src.x, sy: src.y,
              dx: dst.x, dy: dst.y,
              t: 0,
              speed: 0.003 + Math.random() * 0.005,
              color: Math.random() > 0.55 ? "#1E6F44" : "#C25E29",
              size: Math.random() * 2 + 1.2,
              trail: [],
            });
          }
        }
      }
    }
  }

  draw(ctx, isDark) {
    if (this.paused) return;

    // Draw grid lines between close nodes
    ctx.lineWidth = 0.5;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[j].x - this.nodes[i].x;
        const dy = this.nodes[j].y - this.nodes[i].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 22500) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / 150) * (isDark ? 0.065 : 0.04);
          ctx.strokeStyle = `rgba(43, 98, 130, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    this.nodes.forEach((n) => {
      const glow = Math.sin(n.pulse) * 0.5 + 0.5;
      if (n.type === "hub") {
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
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 98, 130, ${0.2 + glow * 0.2})`;
        ctx.fill();
      }
    });

    // Draw packets
    this.packets.forEach((p) => {
      // Draw trails
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

      // Draw head
      const cx = p.sx + (p.dx - p.sx) * p.t;
      const cy = p.sy + (p.dy - p.sy) * p.t;
      ctx.beginPath();
      ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }
}

// ── SPHERE ENGINE (3D Projecting Globe) ──────────────────────
class SphereEngine {
  constructor() {
    this.points = [];
    this.paused = false;
    this.R = 190;
    this.rings = 8;
    this.pointsPerRing = 12;
    this.angleX = 0;
    this.angleY = 0;

    // Generate globe points
    for (let i = 0; i < this.rings; i++) {
      const phi = (Math.PI * i) / (this.rings - 1);
      for (let j = 0; j < this.pointsPerRing; j++) {
        const theta = (2 * Math.PI * j) / this.pointsPerRing;
        const x = this.R * Math.sin(phi) * Math.cos(theta);
        const y = this.R * Math.cos(phi);
        const z = this.R * Math.sin(phi) * Math.sin(theta);
        this.points.push({ x, y, z });
      }
    }
  }

  update() {
    if (this.paused) return;
    this.angleX = (Date.now() * 0.00018) % (Math.PI * 2);
    this.angleY = (Date.now() * 0.00025) % (Math.PI * 2);
  }

  draw(ctx, W) {
    if (this.paused) return;

    const sphereCenterX = W > 1024 ? W * 0.78 : W * 0.5;
    const sphereCenterY = W > 1024 ? 350 : 280;

    const projected = this.points.map((p) => {
      const cosY = Math.cos(this.angleY);
      const sinY = Math.sin(this.angleY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      const cosX = Math.cos(this.angleX);
      const sinX = Math.sin(this.angleX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 420;
      const scale = fov / (fov + z2);
      const projX = sphereCenterX + x1 * scale;
      const projY = sphereCenterY + y2 * scale;

      return { x: projX, y: projY, z: z2, scale };
    });

    // Draw latitude circles
    ctx.strokeStyle = "rgba(43, 98, 130, 0.06)";
    ctx.lineWidth = 0.55;
    for (let i = 0; i < this.rings; i++) {
      ctx.beginPath();
      for (let j = 0; j < this.pointsPerRing; j++) {
        const idx = i * this.pointsPerRing + j;
        const p = projected[idx];
        if (j === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw longitude arcs
    for (let j = 0; j < this.pointsPerRing; j++) {
      ctx.beginPath();
      for (let i = 0; i < this.rings; i++) {
        const idx = i * this.pointsPerRing + j;
        const p = projected[idx];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Draw coordinate dots on the front hemisphere
    projected.forEach((p) => {
      if (p.z < 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(30, 111, 68, 0.22)";
        ctx.fill();
      }
    });
  }
}

// ── NOISE ENGINE (Floating Hex Watermarks) ──────────────────
class NoiseEngine {
  constructor(count) {
    this.count = count;
    this.floaters = [];
    this.paused = false;
    this.hexChars = "0123456789ABCDEF<>[]{}$%@#";
  }

  init(W, H) {
    this.floaters = Array.from({ length: this.count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      char: this.hexChars[Math.floor(Math.random() * this.hexChars.length)],
      alpha: Math.random() * 0.05 + 0.015,
      size: Math.floor(Math.random() * 6) + 8,
      speed: Math.random() * 0.12 + 0.04,
      changeTimer: Math.random() * 80,
    }));
  }

  update(W, H) {
    if (this.paused) return;

    this.floaters.forEach((f) => {
      f.y += f.speed;
      f.changeTimer--;
      if (f.changeTimer <= 0) {
        f.char = this.hexChars[Math.floor(Math.random() * this.hexChars.length)];
        f.changeTimer = 60 + Math.random() * 90;
        f.alpha = Math.random() * 0.05 + 0.015;
      }
      if (f.y > H) {
        f.y = 0;
        f.x = Math.random() * W;
      }
    });
  }

  draw(ctx, isDark) {
    if (this.paused) return;

    const charColorBase = isDark ? "250, 249, 246" : "24, 26, 27";
    this.floaters.forEach((f) => {
      ctx.font = `${f.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(${charColorBase}, ${f.alpha})`;
      ctx.fillText(f.char, f.x, f.y);
    });
  }
}

// ── RADAR ENGINE (Refresh Scanline Overlay) ──────────────────
class RadarEngine {
  constructor() {
    this.scanY = 0;
    this.scanSpeed = 0.35;
    this.paused = false;
  }

  update(H) {
    if (this.paused) return;
    this.scanY = (this.scanY + this.scanSpeed) % H;
  }

  draw(ctx, W) {
    if (this.paused) return;

    const scanGrad = ctx.createLinearGradient(0, this.scanY - 80, 0, this.scanY + 4);
    scanGrad.addColorStop(0, "rgba(30,111,68,0)");
    scanGrad.addColorStop(0.7, "rgba(30,111,68,0.005)");
    scanGrad.addColorStop(1, "rgba(30,111,68,0.025)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, this.scanY - 80, W, 84);
  }
}

// ── COMPONENT ────────────────────────────────────────────────
const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = null;
    try {
      ctx = canvas.getContext("2d");
    } catch (e) {
      console.warn("Background canvas context blocked/failed:", e);
      return;
    }
    if (!ctx) return;

    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const perf = detectPerformance();

    // Init Engines
    const packetEngine = new PacketEngine(perf.nodeCount, perf.maxPackets);
    const sphereEngine = perf.enableSphere ? new SphereEngine() : null;
    const noiseEngine = new NoiseEngine(perf.floaterCount);
    const radarEngine = new RadarEngine();

    const resize = () => {
      try {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        packetEngine.resize(W, H);
        noiseEngine.init(W, H);
      } catch (e) {
        console.warn(e);
      }
    };

    packetEngine.init(W, H);
    noiseEngine.init(W, H);
    resize();

    // IntersectionObserver to pause the 3D sphere when Hero is offscreen
    let heroObserver;
    const heroEl = document.getElementById("hero");
    if (heroEl && sphereEngine) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          sphereEngine.paused = !entry.isIntersecting;
        },
        { threshold: 0.01 }
      );
      heroObserver.observe(heroEl);
    } else if (sphereEngine) {
      sphereEngine.paused = true;
    }

    // Loop timers for throttling
    let lastPacketTime = 0;
    let lastSphereTime = 0;
    let lastNoiseTime = 0;
    let lastRadarTime = 0;

    const packetInterval = 1000 / perf.fps;
    const sphereInterval = 1000 / perf.fps;
    const noiseInterval = 1000 / Math.min(perf.fps, 30); // 30 FPS cap for Hex characters
    const radarInterval = 1000 / perf.fps;

    const GRID = 80;
    const drawGrid = (isDark) => {
      ctx.strokeStyle = isDark ? "rgba(250, 249, 246, 0.018)" : "rgba(24, 26, 27, 0.015)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    };

    const tick = (timestamp) => {
      const isDark = document.documentElement.classList.contains("dark");
      let needsRedraw = false;

      // Update Packet Physics
      if (!packetEngine.paused && timestamp - lastPacketTime >= packetInterval) {
        packetEngine.update(W, H, timestamp);
        lastPacketTime = timestamp - ((timestamp - lastPacketTime) % packetInterval);
        needsRedraw = true;
      }

      // Update 3D Globe Projection
      if (sphereEngine && !sphereEngine.paused && timestamp - lastSphereTime >= sphereInterval) {
        sphereEngine.update();
        lastSphereTime = timestamp - ((timestamp - lastSphereTime) % sphereInterval);
        needsRedraw = true;
      }

      // Update Floating Noise Characters
      if (!noiseEngine.paused && timestamp - lastNoiseTime >= noiseInterval) {
        noiseEngine.update(W, H);
        lastNoiseTime = timestamp - ((timestamp - lastNoiseTime) % noiseInterval);
        needsRedraw = true;
      }

      // Update Screen Sweep Line
      if (!radarEngine.paused && timestamp - lastRadarTime >= radarInterval) {
        radarEngine.update(H);
        lastRadarTime = timestamp - ((timestamp - lastRadarTime) % radarInterval);
        needsRedraw = true;
      }

      // Render Step
      if (needsRedraw) {
        ctx.clearRect(0, 0, W, H);

        // 1. Grid
        drawGrid(isDark);

        // 2. Radar/Scanline overlay
        radarEngine.draw(ctx, W);

        // 3. Nodes and Connections
        packetEngine.draw(ctx, isDark);

        // 4. Floating Characters
        noiseEngine.draw(ctx, isDark);

        // 5. 3D Rotating Sphere
        if (sphereEngine) {
          sphereEngine.draw(ctx, W);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (heroObserver) heroObserver.disconnect();
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
