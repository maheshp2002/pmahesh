'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

function subscribePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(pointer: fine)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getPointerSnapshot() {
  return window.matchMedia('(pointer: fine)').matches;
}

function getPointerServerSnapshot() {
  return false;
}

export default function CreativeCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPointerDevice = useSyncExternalStore(subscribePointer, getPointerSnapshot, getPointerServerSnapshot);
  const [isHovered, setIsHovered] = useState(false);

  // Position and velocity tracking
  const mouseRef = useRef({ x: -200, y: -200, prevX: -200, prevY: -200, vx: 0, vy: 0, speed: 0 });
  const cursorRef = useRef({ x: -200, y: -200, angle: 0, stretch: 1 });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isLightModeRef = useRef(false);

  useEffect(() => {
    if (!isPointerDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize handler
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Track Theme
    const checkTheme = () => {
      isLightModeRef.current = document.documentElement.classList.contains('light');
    };
    checkTheme();
    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const m = mouseRef.current;

      m.vx = clientX - m.prevX;
      m.vy = clientY - m.prevY;
      m.speed = Math.hypot(m.vx, m.vy);
      m.prevX = clientX;
      m.prevY = clientY;
      m.x = clientX;
      m.y = clientY;

      // Spawn Antigravity Stardust / Gravity Wake Particles when moving
      if (m.speed > 1.2 && particlesRef.current.length < 90) {
        const count = Math.min(3, Math.floor(m.speed / 8) + 1);
        for (let i = 0; i < count; i++) {
          const spread = (Math.random() - 0.5) * 12;
          const isLight = isLightModeRef.current;
          
          particlesRef.current.push({
            x: clientX + spread,
            y: clientY + spread,
            // Negative vy simulates antigravity upward float
            vx: (Math.random() - 0.5) * 1.5 - m.vx * 0.08,
            vy: -Math.random() * 1.4 - 0.4 - m.vy * 0.08,
            size: Math.random() * 2.5 + 1.0,
            alpha: 0.85,
            maxAlpha: 0.85,
            decay: Math.random() * 0.025 + 0.015,
            color: isLight ? '30, 30, 36' : '255, 255, 255'
          });
        }
      }

      // Check hover state on interactive targets
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Click Ripple / Shockwave
    const handleMouseDown = (e: MouseEvent) => {
      const isLight = isLightModeRef.current;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 52,
        alpha: 0.9,
        color: isLight ? '20, 20, 25' : '255, 255, 255'
      });

      // Burst of antigravity micro-particles
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3.5 + 1.5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8, // buoyancy
          size: Math.random() * 2.8 + 1.2,
          alpha: 1,
          maxAlpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: isLight ? '30, 30, 36' : '255, 255, 255'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    // Render Loop
    let time = 0;
    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const m = mouseRef.current;
      const cur = cursorRef.current;
      const isLight = isLightModeRef.current;

      // Smooth follow for cursor core
      const ease = 0.32;
      cur.x += (m.x - cur.x) * ease;
      cur.y += (m.y - cur.y) * ease;

      // Velocity-based stretching and rotation
      const targetSpeed = Math.min(m.speed, 40);
      const targetStretch = 1 + (targetSpeed / 40) * 0.95;
      cur.stretch += (targetStretch - cur.stretch) * 0.2;

      if (m.speed > 0.5) {
        const targetAngle = Math.atan2(m.vy, m.vx);
        // Smooth angle interpolation
        let diff = targetAngle - cur.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        cur.angle += diff * 0.25;
      }

      // 1. Render Gravitational Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 2.2;
        rip.alpha -= 0.035;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rip.color}, ${rip.alpha * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render Antigravity Floating Stardust Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.alpha / p.maxAlpha), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.7})`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render Orbital Gravitational Satellites
      if (cur.x > 0 && cur.y > 0) {
        const orbitRadius = isHovered ? 26 : 18;
        const numSatellites = 2;

        for (let i = 0; i < numSatellites; i++) {
          const orbitAngle = time * 2.2 + (i * Math.PI);
          const satX = cur.x + Math.cos(orbitAngle) * orbitRadius;
          const satY = cur.y + Math.sin(orbitAngle) * (orbitRadius * 0.7);

          ctx.save();
          ctx.beginPath();
          ctx.arc(satX, satY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? 'rgba(30, 30, 35, 0.7)' : 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
          ctx.restore();
        }

        // 4. Render Outer Gravitational Halo Ring
        ctx.save();
        ctx.translate(cur.x, cur.y);
        ctx.beginPath();
        const haloRadius = isHovered ? 24 : 14;
        ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? (isHovered ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.28)')
          : (isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.35)');
        ctx.lineWidth = isHovered ? 1.8 : 1.0;
        ctx.stroke();

        if (isHovered) {
          ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)';
          ctx.fill();
        }
        ctx.restore();

        // 5. Render Fluid Aerodynamic Cursor Core (Stretches with Velocity)
        ctx.save();
        ctx.translate(cur.x, cur.y);
        ctx.rotate(cur.angle);
        ctx.scale(cur.stretch, 1 / Math.sqrt(cur.stretch));

        ctx.beginPath();
        const coreRadius = isHovered ? 3.5 : 2.5;
        ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#111114' : '#FFFFFF';
        ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      themeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-9999 select-none"
    />
  );
}
