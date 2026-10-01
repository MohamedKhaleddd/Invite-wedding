import React, { useEffect, useRef } from 'react';

export default function LivingBackground({ intensity = 'normal' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const mouseTrail = [];

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      // Add mouse trail sparkles
      if (Math.random() > 0.4) {
        mouseTrail.push({
          x: e.clientX,
          y: e.clientY,
          radius: Math.random() * 3 + 1.5,
          alpha: 0.9,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: Math.random() > 0.3 ? '212, 184, 124' : '232, 221, 202'
        });
        if (mouseTrail.length > 40) mouseTrail.shift();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const isMobile = width < 768;
    const particleCount = isMobile ? (intensity === 'high' ? 35 : 25) : (intensity === 'high' ? 95 : 65);
    const leafCount = isMobile ? 8 : 16;

    // Floating Starlight Sparkles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      color: Math.random() > 0.35 ? '181, 154, 99' : Math.random() > 0.5 ? '232, 221, 202' : '118, 132, 97'
    }));

    // Floating Golden Leaves & Petals
    const leaves = Array.from({ length: leafCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02,
      fallSpeed: Math.random() * 0.6 + 0.3,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(181, 154, 99, 0.4)' : 'rgba(89, 99, 72, 0.35)'
    }));

    // Moving Ambient Light Orbs
    const blobs = [
      { x: width * 0.2, y: height * 0.25, radius: Math.min(width, height) * 0.45, speedX: 0.0008, speedY: 0.0006, color: 'rgba(89, 99, 72, 0.3)' }, // Olive
      { x: width * 0.8, y: height * 0.7, radius: Math.min(width, height) * 0.5, speedX: -0.0006, speedY: -0.0009, color: 'rgba(181, 154, 99, 0.22)' }, // Soft Gold
      { x: width * 0.5, y: height * 0.4, radius: Math.min(width, height) * 0.38, speedX: 0.0009, speedY: -0.0007, color: 'rgba(48, 56, 42, 0.4)' }, // Deep Olive
      { x: width * 0.3, y: height * 0.8, radius: Math.min(width, height) * 0.4, speedX: -0.0007, speedY: 0.0008, color: 'rgba(212, 184, 124, 0.18)' }, // Warm Light
      { x: width * 0.75, y: height * 0.2, radius: Math.min(width, height) * 0.35, speedX: 0.0005, speedY: 0.0007, color: 'rgba(118, 132, 97, 0.25)' }, // Light Olive
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base background gradient
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#1E2419');
      baseGrad.addColorStop(0.5, '#282F23');
      baseGrad.addColorStop(1, '#151813');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw sweeping light rays
      const rayAngle = Math.sin(time * 0.2) * 0.1 - 0.2;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rayAngle);
      const rayGrad = ctx.createLinearGradient(-width, -height, width, height);
      rayGrad.addColorStop(0, 'rgba(181, 154, 99, 0.0)');
      rayGrad.addColorStop(0.4, `rgba(181, 154, 99, ${0.04 + Math.sin(time) * 0.02})`);
      rayGrad.addColorStop(0.6, `rgba(232, 221, 202, ${0.03 + Math.cos(time * 0.8) * 0.015})`);
      rayGrad.addColorStop(1, 'rgba(181, 154, 99, 0.0)');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(-width * 1.5, -height * 1.5, width * 3, height * 3);
      ctx.restore();

      // Draw light blobs
      blobs.forEach((blob, idx) => {
        const curX = blob.x + Math.sin(time * 20 * blob.speedX + idx) * (width * 0.12);
        const curY = blob.y + Math.cos(time * 20 * blob.speedY + idx) * (height * 0.12);

        const parallaxX = (mouseX - width / 2) * (0.018 * (idx + 1));
        const parallaxY = (mouseY - height / 2) * (0.018 * (idx + 1));

        const radGrad = ctx.createRadialGradient(
          curX + parallaxX,
          curY + parallaxY,
          0,
          curX + parallaxX,
          curY + parallaxY,
          blob.radius
        );
        radGrad.addColorStop(0, blob.color);
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // Draw & animate floating starlight particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * 2 + p.pulse) * 0.25;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.y < -15) p.y = height + 15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        const finalAlpha = Math.max(0.08, Math.min(0.85, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${finalAlpha})`;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = `rgba(${p.color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw & animate falling golden leaves
      leaves.forEach((leaf) => {
        leaf.sway += leaf.swaySpeed;
        leaf.x += Math.sin(leaf.sway) * 0.8;
        leaf.y += leaf.fallSpeed;
        leaf.rotation += leaf.rotSpeed;

        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.fillStyle = leaf.color;

        // Draw leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size);
        ctx.quadraticCurveTo(leaf.size * 0.6, -leaf.size * 0.2, 0, leaf.size);
        ctx.quadraticCurveTo(-leaf.size * 0.6, -leaf.size * 0.2, 0, -leaf.size);
        ctx.fill();

        // Leaf stem line
        ctx.strokeStyle = 'rgba(232, 221, 202, 0.25)';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size);
        ctx.lineTo(0, leaf.size);
        ctx.stroke();

        ctx.restore();
      });

      // Render mouse sparkles trail
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const pt = mouseTrail[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.025;

        if (pt.alpha <= 0) {
          mouseTrail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pt.color}, ${pt.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${pt.color}, ${pt.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Animated rotating SVG botanical ring ornaments in top-right and bottom-left */}
      <svg
        className="absolute -top-32 -right-32 w-[450px] h-[450px] text-gold/15 animate-spin-slow pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      >
        <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="95" strokeWidth="0.5" />
        <path d="M100 10 L100 190 M10 100 L190 100" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>
      <svg
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-gold/10 animate-spin-slow pointer-events-none"
        style={{ animationDirection: 'reverse', animationDuration: '35s' }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      >
        <circle cx="100" cy="100" r="85" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="70" strokeWidth="0.5" />
      </svg>
      
      {/* Film grain texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-35 mix-blend-overlay" />
    </div>
  );
}
