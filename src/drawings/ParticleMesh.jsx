import { useEffect, useRef } from "react";

const ParticleMesh = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 110;
    const MAX_DIST = 120;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          this.x += Math.cos(angle) * force * 6;
          this.y += Math.sin(angle) * force * 6;
        } else {
          // Ease back to base
          this.x += (this.baseX - this.x) * 0.02;
          this.y += (this.baseY - this.y) * 0.02;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,33,71,0.6)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.current.push(new Particle());
      }
    };
    initParticles();

    const connect = () => {
      for (let a = 0; a < particles.current.length; a++) {
        for (let b = a; b < particles.current.length; b++) {
          const dx = particles.current[a].x - particles.current[b].x;
          const dy = particles.current[a].y - particles.current[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            ctx.strokeStyle = `rgba(0,33,71,${1 - dist / MAX_DIST})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles.current[a].x, particles.current[a].y);
            ctx.lineTo(particles.current[b].x, particles.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.current.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      requestAnimationFrame(animate);
    };
    animate();

    // Mouse & touch
    const move = (e) => {
      mouse.current.x = e.touches ? e.touches[0].clientX : e.clientX;
      mouse.current.y = e.touches ? e.touches[0].clientY : e.clientY;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
};

export default ParticleMesh;
