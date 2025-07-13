"use client";

import { useEffect, useRef } from "react";

export default function FlameGradientCSS() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, 32, 32);

      // Create radial gradient
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      
      // Animate colors
      const hue1 = 220 + Math.sin(time) * 20;
      const hue2 = 270 + Math.sin(time * 0.8) * 30;
      
      gradient.addColorStop(0, `hsla(${hue1}, 100%, 60%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 50%, 0.6)`);
      gradient.addColorStop(1, `hsla(${hue2}, 100%, 40%, 0)`);

      // Draw circle
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-8 h-8" style={{ filter: 'blur(2px)' }}>
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        className="absolute inset-0 w-full h-full"
      />
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}