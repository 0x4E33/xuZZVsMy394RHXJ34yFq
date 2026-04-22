"use client";

import { useEffect, useRef } from "react";

export function CyberGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastViewportRef = useRef<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = parseInt(getComputedStyle(canvas).width, 10) || window.innerWidth;
    let height = parseInt(getComputedStyle(canvas).height, 10) || window.innerHeight;
    let animationFrameId: number;
    let resizeFrameId: number | undefined;
    let isRunning = false;

    const nodes: Node[] = [];
    const NODES_COUNT = 450; // Increased density for better point cloud feel
    const GLOBE_RADIUS = Math.min(width, height) * 0.45; // Enlarge globe size for prominence
    const GRID_SIZE = 64;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    class Node {
      x: number;
      y: number;
      z: number;
      phi: number;
      theta: number;
      renderedX: number;
      renderedY: number;

      constructor() {
        this.theta = Math.random() * Math.PI * 2;
        this.phi = Math.acos(Math.random() * 2 - 1);
        
        this.x = GLOBE_RADIUS * Math.sin(this.phi) * Math.cos(this.theta);
        this.y = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta);
        this.z = GLOBE_RADIUS * Math.cos(this.phi);
        
        this.renderedX = 0;
        this.renderedY = 0;
      }

      project(rotX: number, rotY: number) {
        // Rotate around Y
        const x1 = this.x * Math.cos(rotY) - this.z * Math.sin(rotY);
        const z1 = this.x * Math.sin(rotY) + this.z * Math.cos(rotY);
        
        // Rotate around X
        const y2 = this.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = this.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const perspective = 1200 / (1200 + z2);
        this.renderedX = x1 * perspective + width / 2;
        this.renderedY = y2 * perspective + height / 2;

        return { x: this.renderedX, y: this.renderedY, z: z2, p: perspective };
      }
    }

    const init = () => {
      width = parseInt(getComputedStyle(canvas).width, 10) || window.innerWidth;
      height = parseInt(getComputedStyle(canvas).height, 10) || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      lastViewportRef.current = { width, height };
      nodes.length = 0;
      for(let i=0; i<NODES_COUNT; i++) {
        nodes.push(new Node());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Auto rotation + Mouse interaction
      targetRotationY += 0.002; // Base auto-spin
      
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      const projected = nodes.map(node => node.project(currentRotationX, currentRotationY));
      
      // Sort by Z to draw back nodes first
      projected.sort((a, b) => b.z - a.z);

      const grid = new Map<string, typeof projected>();

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        
        // Fading for nodes in the back
        const alpha = Math.max(0.1, 1 - (p1.z + GLOBE_RADIUS) / (GLOBE_RADIUS * 2));
        
        const cellX = Math.floor(p1.x / GRID_SIZE);
        const cellY = Math.floor(p1.y / GRID_SIZE);

        // Use a spatial grid so nearby-node checks scale with local density instead of O(n^2).
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
            const neighborKey = `${cellX + offsetX}:${cellY + offsetY}`;
            const neighbors = grid.get(neighborKey);

            if (!neighbors) {
              continue;
            }

            for (const p2 of neighbors) {
              const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

              if (dist < 60 * Math.min(p1.p, p2.p)) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.4})`;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }

        const ownKey = `${cellX}:${cellY}`;
        const cell = grid.get(ownKey);
        if (cell) {
          cell.push(p1);
        } else {
          grid.set(ownKey, [p1]);
        }
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2 * p1.p, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 1.5})`;
        ctx.fill();
        
        // Random highlights (simulation of network activity - much slower now)
        if (Math.random() > 0.999) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 6 * p1.p, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha + 0.2})`;
          ctx.fill();
        }
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
      const nextWidth = parseInt(getComputedStyle(canvas).width, 10) || window.innerWidth;
      const nextHeight = parseInt(getComputedStyle(canvas).height, 10) || window.innerHeight;
      const previousViewport = lastViewportRef.current;

      // Ignore mobile browser toolbar height changes so the globe doesn't reinitialize while scrolling.
      if (
        previousViewport &&
        window.matchMedia("(max-width: 767px)").matches &&
        previousViewport.width === nextWidth &&
        previousViewport.height !== nextHeight
      ) {
        return;
      }

      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }

      resizeFrameId = requestAnimationFrame(init);
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX - width / 2);
      mouseY = (e.clientY - height / 2);
      
      // Shift rotation target based on mouse
      targetRotationY = mouseX * 0.001;
      targetRotationX = mouseY * 0.001;
    };

    const handleVisibilityChange = () => {
      const shouldRun = document.visibilityState === "visible";
      if (shouldRun && !isRunning) {
        isRunning = true;
        animate();
      } else if (!shouldRun && isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener("resize", handleResize, {passive: true});
    window.addEventListener("pointermove", handlePointerMove, {passive: true});
    document.addEventListener("visibilitychange", handleVisibilityChange);
    init();
    isRunning = true;
    animate();

    return () => {
      isRunning = false;
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-80 pointer-events-none mt-16 scale-110">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/30 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
