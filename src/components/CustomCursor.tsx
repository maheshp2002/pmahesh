'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';

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

export default function CustomCursor() {
  const isPointerDevice = useSyncExternalStore(subscribePointer, getPointerSnapshot, getPointerServerSnapshot);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPointerDevice) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    let currentScale = 1;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let lastMoveTime = 0;
    let frameCount = 0;
    let currentIsLight: boolean | null = null;

    let animationFrameId: number;

    const checkIsLightBackground = (x: number, y: number): boolean => {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
        return !document.documentElement.classList.contains('dark');
      }

      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      let curr = el;

      while (curr && curr !== document.body && curr !== document.documentElement) {
        const bg = window.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
            if (a > 0.3) {
              const r = parseInt(match[1], 10);
              const g = parseInt(match[2], 10);
              const b = parseInt(match[3], 10);
              const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
              return luminance > 135;
            }
          }
        }
        curr = curr.parentElement;
      }

      return !document.documentElement.classList.contains('dark');
    };

    const updateCursorColor = (x: number, y: number) => {
      const isLight = checkIsLightBackground(x, y);
      if (currentIsLight === isLight) return;
      currentIsLight = isLight;
      if (cursor) {
        // Auto dark on white/light background, auto white on black/dark background
        cursor.style.borderColor = isLight
          ? 'rgba(17, 17, 20, 0.75)'
          : 'rgba(255, 255, 255, 0.75)';
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = performance.now();

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        cursor.style.opacity = '1';
        updateCursorColor(targetX, targetY);
      }
    };

    const onScroll = () => {
      if (!isVisible) return;
      updateCursorColor(targetX, targetY);
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-interactive]'
      );
      if (interactiveEl) {
        isHovered = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-interactive]'
      );
      if (interactiveEl) {
        isHovered = false;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursor.style.opacity = '1';
    };

    // 60-120fps direct hardware transform with smooth interpolation
    const render = () => {
      // Controlled lerp factor for smooth trailing
      const posLerp = 0.18;
      currentX += (targetX - currentX) * posLerp;
      currentY += (targetY - currentY) * posLerp;

      // Base: 20px diameter.
      // - Moving state: expands to 30px (scale = 30 / 20 = 1.5)
      // - Hovering state: expands to 42px (scale = 42 / 20 = 2.1) and maintains size
      // - Normal state: 20px (scale = 1.0)
      // - Click state: 85% of current size (desiredScale * 0.85)
      const isMoving = performance.now() - lastMoveTime < 130;

      let desiredScale = 1.0;
      if (isHovered) {
        desiredScale = 2.1; // 42px
      } else if (isMoving) {
        desiredScale = 1.5; // 30px
      } else {
        desiredScale = 1.0; // 20px
      }

      if (isClicking) {
        desiredScale *= 0.85; // 85% reduction during click
      }

      // Smooth continuous ease-out interpolation without jitter or sudden jumps
      const scaleLerp = 0.14;
      currentScale += (desiredScale - currentScale) * scaleLerp;

      // Direct DOM style mutation avoiding React re-renders
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;

      // Periodic background detection while moving or scrolling (every 4 frames ≈ 15-30fps check)
      frameCount++;
      if (frameCount % 4 === 0 && isVisible) {
        updateCursorColor(targetX, targetY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-9999 w-5 h-5 rounded-full border opacity-0 will-change-transform"
      style={{
        boxSizing: 'border-box',
        borderColor: 'rgba(255, 255, 255, 0.75)',
        transition: 'border-color 0.25s ease-out, opacity 0.2s ease-out',
      }}
    />
  );
}
