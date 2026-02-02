import { useEffect, useRef } from "react";

const TouchRipple = () => {
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const particles = useRef([]);
  const touches = useRef([]);
  const waves = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    const isMobile = window.innerWidth < 768;

    // Desktop: Floating wave lines
    class Wave {
      constructor(index) {
        this.index = index;
        this.y = (height / 5) * (index + 1);
        this.amplitude = 30 + Math.random() * 20;
        this.frequency = 0.003 + Math.random() * 0.002;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = 0.0005 + Math.random() * 0.001;
        this.opacity = 0.25 + Math.random() * 0.12;
      }

      update(time) {
        this.phase = time * this.speed;
      }

      draw(ctx, time) {
        ctx.beginPath();
        ctx.moveTo(0, this.y);

        for (let x = 0; x <= width; x += 5) {
          const y =
            this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(194, 65, 12, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary wave with offset
        ctx.beginPath();
        ctx.moveTo(0, this.y);

        for (let x = 0; x <= width; x += 5) {
          const y =
            this.y +
            Math.sin(x * this.frequency + this.phase + Math.PI) *
              this.amplitude *
              0.5;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(194, 65, 12, ${this.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Desktop-specific elements
    const initWaves = () => {
      waves.current = [];
      for (let i = 0; i < 4; i++) {
        waves.current.push(new Wave(i));
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.offsetHeight;
      if (!isMobile) {
        initWaves();
      }
    };
    resize();
    window.addEventListener("resize", resize);

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = isMobile ? 200 : 300;
        this.opacity = 1;
        this.speed = isMobile ? 4 : 3;
        this.lineWidth = 3;
      }

      update() {
        this.radius += this.speed;
        this.opacity = 1 - this.radius / this.maxRadius;
        this.lineWidth = 3 * this.opacity;
        return this.radius < this.maxRadius;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(194, 65, 12, ${this.opacity * 0.6})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();

        // Inner ripple
        if (this.radius > 20) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius - 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 33, 71, ${this.opacity * 0.4})`;
          ctx.lineWidth = this.lineWidth * 0.5;
          ctx.stroke();
        }
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
        return this.life > 0;
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size,
        );
        gradient.addColorStop(0, `rgba(194, 65, 12, ${this.life * 0.8})`);
        gradient.addColorStop(1, `rgba(194, 65, 12, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    class TouchPoint {
      constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.radius = 0;
        this.targetRadius = 30;
        this.pulsePhase = 0;
      }

      update() {
        this.radius += (this.targetRadius - this.radius) * 0.2;
        this.pulsePhase += 0.1;
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 5;

        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius + pulse + 20,
        );
        outerGradient.addColorStop(0, "rgba(194, 65, 12, 0.3)");
        outerGradient.addColorStop(0.5, "rgba(194, 65, 12, 0.1)");
        outerGradient.addColorStop(1, "rgba(194, 65, 12, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse + 20, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Main circle
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius + pulse,
        );
        gradient.addColorStop(0, "rgba(194, 65, 12, 0.6)");
        gradient.addColorStop(0.7, "rgba(194, 65, 12, 0.3)");
        gradient.addColorStop(1, "rgba(194, 65, 12, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(194, 65, 12, 0.9)";
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(194, 65, 12, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Desktop: Floating orbs
    class Orb {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 40 + 20;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.001 + Math.random() * 0.002;
        this.hue = Math.random() > 0.5 ? "blue" : "orange";
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(ctx, time) {
        const pulse =
          Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.3 + 0.7;
        const radius = this.radius * pulse;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          radius,
        );

        if (this.hue === "orange") {
          gradient.addColorStop(0, `rgba(194, 65, 12, ${0.15 * pulse})`);
          gradient.addColorStop(0.5, `rgba(194, 65, 12, ${0.08 * pulse})`);
          gradient.addColorStop(1, "rgba(194, 65, 12, 0)");
        } else {
          gradient.addColorStop(0, `rgba(0, 33, 71, ${0.12 * pulse})`);
          gradient.addColorStop(0.5, `rgba(0, 33, 71, ${0.06 * pulse})`);
          gradient.addColorStop(1, "rgba(0, 33, 71, 0)");
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Ambient floating particles
    const initAmbientParticles = () => {
      const ambientParticles = [];
      const count = isMobile ? 20 : 30;

      for (let i = 0; i < count; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }

      return ambientParticles;
    };

    let ambientParticles = initAmbientParticles();

    let orbs = [];
    if (!isMobile) {
      initWaves();
      for (let i = 0; i < 5; i++) {
        orbs.push(new Orb());
      }
    }

    const updateAmbientParticles = () => {
      ambientParticles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
      });
    };

    const drawAmbientParticles = () => {
      ambientParticles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 33, 71, ${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      ambientParticles.forEach((p1, i) => {
        ambientParticles.forEach((p2, j) => {
          if (i < j) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 33, 71, ${(1 - dist / 100) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
    };

    let animationFrame;
    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Desktop: Draw waves and orbs
      if (!isMobile) {
        waves.current.forEach((wave) => {
          wave.update(time);
          wave.draw(ctx, time);
        });

        orbs.forEach((orb) => {
          orb.update(time);
          orb.draw(ctx, time);
        });
      }

      // Draw ambient background particles
      updateAmbientParticles();
      drawAmbientParticles();

      // Update and draw ripples
      ripples.current = ripples.current.filter((ripple) => {
        const alive = ripple.update();
        if (alive) ripple.draw(ctx);
        return alive;
      });

      // Update and draw explosion particles
      particles.current = particles.current.filter((particle) => {
        const alive = particle.update();
        if (alive) particle.draw(ctx);
        return alive;
      });

      // Update and draw active touch points
      touches.current.forEach((touch) => {
        touch.update();
        touch.draw(ctx);
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate(0);

    // Touch/Mouse interaction
    const createRipple = (x, y) => {
      ripples.current.push(new Ripple(x, y));

      // Create explosion particles
      const particleCount = isMobile ? 8 : 12;
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new Particle(x, y));
      }
    };

    const handleStart = (e) => {
      const rect = canvas.getBoundingClientRect();

      if (e.touches) {
        // Multi-touch support
        Array.from(e.touches).forEach((touch) => {
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;

          createRipple(x, y);
          touches.current.push(new TouchPoint(x, y, touch.identifier));
        });
      } else {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        createRipple(x, y);
        touches.current.push(new TouchPoint(x, y, 0));
      }
    };

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      if (e.touches) {
        Array.from(e.touches).forEach((touch) => {
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;

          const existingTouch = touches.current.find(
            (t) => t.id === touch.identifier,
          );
          if (existingTouch) {
            const dx = x - existingTouch.x;
            const dy = y - existingTouch.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 20) {
              createRipple(x, y);
              existingTouch.x = x;
              existingTouch.y = y;
            } else {
              existingTouch.x = x;
              existingTouch.y = y;
            }
          }
        });
      } else {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (touches.current.length > 0) {
          const touch = touches.current[0];
          const dx = x - touch.x;
          const dy = y - touch.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 30) {
            createRipple(x, y);
          }
          touch.x = x;
          touch.y = y;
        }
      }
    };

    const handleEnd = (e) => {
      if (e.touches) {
        // Remove ended touches
        const activeTouchIds = Array.from(e.touches).map((t) => t.identifier);
        touches.current = touches.current.filter((t) =>
          activeTouchIds.includes(t.id),
        );
      } else {
        touches.current = [];
      }
    };

    // Add event listeners
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      cancelAnimationFrame(animationFrame);
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
        zIndex: 0,
        pointerEvents: "none", // Allow clicks to pass through to content
      }}
    />
  );
};

export default TouchRipple;
