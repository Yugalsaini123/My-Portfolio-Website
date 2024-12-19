import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #0d1117;
  overflow: hidden;
`;

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Particle configuration
    const config = {
      maxParticles: 150,
      particleSize: 2,
      maxSpeed: 0.5,
      connectionDistance: 120,
      backgroundColor: '#0d1117',
      particleColor: 'rgba(255, 255, 255, 0.7)'
    };

    const particles = [];

    // Enhanced Vector class for more robust calculations
    class Vector {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }

      subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
      }

      multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      }

      magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }

      normalize() {
        const mag = this.magnitude();
        if (mag > 0) {
          this.x /= mag;
          this.y /= mag;
        }
        return this;
      }
    }

    // Improved Particle class
    class Particle {
      constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(
          (Math.random() - 0.5) * config.maxSpeed * 2,
          (Math.random() - 0.5) * config.maxSpeed * 2
        );
        this.size = config.particleSize;
      }

      update(width, height) {
        // Wrap around screen instead of bouncing
        this.pos.x = (this.pos.x + this.vel.x + width) % width;
        this.pos.y = (this.pos.y + this.vel.y + height) % height;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
      }
    }

    // Resize canvas with high-DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the canvas back down
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale the drawing context
      ctx.scale(dpr, dpr);
    };

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < config.maxParticles; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    // Draw connections between particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].pos.x - particles[j].pos.x;
          const dy = particles[i].pos.y - particles[j].pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = 1 - (distance / config.connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
            ctx.lineTo(particles[j].pos.x, particles[j].pos.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear with background
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections
      drawConnections();

      // Continue animation
      requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    initParticles();
    animate();

    // Resize event listener with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </Container>
  );
};

export default ParticleBackground;
