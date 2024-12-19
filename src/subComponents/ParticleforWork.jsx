import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PortfolioBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Vector class for 2D vector operations
    class Vector {
      constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
      }

      static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
      }

      static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }

      dist(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }

    // Particle class
    class Particle {
      constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        // ctx.fill();
      }

      // Wrap around screen
      wrap(width, height) {
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
      }
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Particle system
    const particles = [];
    const particleCount = 80;

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width, 
          Math.random() * canvas.height
        ));
      }
    };

    // Draw connections between close particles
    const drawConnections = () => {
      const connectionDistance = 15;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = particles[i].pos.dist(particles[j].pos);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
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
      // Clear canvas
    //   ctx.fillStyle = 'rgba(13, 17, 23, 0.8)';
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.wrap(canvas.width, canvas.height);
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

    // Resize event listener
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </Container>
  );
};

export default PortfolioBackground;