"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number;
  hue: number;
};

type Nebula = {
  x: number;
  y: number;
  radius: number;
  colors: [string, string];
  driftX: number;
  driftY: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  length: number;
};

type SpaceBackgroundProps = {
  starCount?: number;
  shootingStarFrequency?: number;
  className?: string;
};

export default function SpaceBackground({
  starCount = 220,
  shootingStarFrequency = 0.0025,
  className = "",
}: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let shootingStars: ShootingStar[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function createStars() {
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: rand(0.4, 1.6),
        baseAlpha: rand(0.25, 1),
        twinkleSpeed: rand(0.005, 0.02),
        twinklePhase: rand(0, Math.PI * 2),
        depth: rand(0.15, 1),
        hue: Math.random() < 0.15 ? rand(190, 230) : 210,
      }));
    }

    function createNebulae() {
      const palettes: [string, string][] = isLight
        ? [
            ["rgba(127, 70, 244, 0.09)", "rgba(127, 70, 244, 0)"],
            ["rgba(37, 80, 217, 0.08)", "rgba(37, 80, 217, 0)"],
            ["rgba(233, 84, 172, 0.06)", "rgba(233, 84, 172, 0)"],
          ]
        : [
            ["rgba(88, 60, 180, 0.18)", "rgba(88, 60, 180, 0)"],
            ["rgba(30, 90, 160, 0.16)", "rgba(30, 90, 160, 0)"],
            ["rgba(150, 40, 120, 0.12)", "rgba(150, 40, 120, 0)"],
          ];
      nebulae = Array.from({ length: 3 }, (_, i) => ({
        x: rand(0.15, 0.85) * width,
        y: rand(0.15, 0.85) * height,
        radius: rand(0.35, 0.55) * Math.max(width, height),
        colors: palettes[i % palettes.length],
        driftX: rand(-0.03, 0.03),
        driftY: rand(-0.02, 0.02),
        phase: rand(0, Math.PI * 2),
      }));
    }

    function spawnShootingStar() {
      const startX = rand(0, width * 0.7);
      const startY = rand(0, height * 0.3);
      const angle = rand(0.35, 0.55) * Math.PI;
      const speed = rand(9, 15);
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        length: rand(80, 160),
      });
    }

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
      createNebulae();
    }

    function handleMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    let frame = 0;
    let animationId: number;

    function draw() {
      frame++;

      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      ctx!.clearRect(0, 0, width, height);

      const bgGrad = ctx!.createLinearGradient(0, 0, 0, height);
      if (isLight) {
        bgGrad.addColorStop(0, "#f2f3fb");
        bgGrad.addColorStop(1, "#faf7ff");
      } else {
        bgGrad.addColorStop(0, "#05060f");
        bgGrad.addColorStop(1, "#0a0716");
      }
      ctx!.fillStyle = bgGrad;
      ctx!.fillRect(0, 0, width, height);

      nebulae.forEach((n) => {
        n.x += n.driftX * (prefersReducedMotion ? 0 : 1);
        n.y += n.driftY * (prefersReducedMotion ? 0 : 1);
        const pulse = 1 + Math.sin(frame * 0.002 + n.phase) * 0.05;
        const offsetX = mouseX * 12 * (0.3 + n.radius / width);
        const offsetY = mouseY * 12 * (0.3 + n.radius / width);
        const grad = ctx!.createRadialGradient(
          n.x + offsetX,
          n.y + offsetY,
          0,
          n.x + offsetX,
          n.y + offsetY,
          n.radius * pulse
        );
        grad.addColorStop(0, n.colors[0]);
        grad.addColorStop(1, n.colors[1]);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, width, height);
      });

      stars.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed * (prefersReducedMotion ? 0.3 : 1);
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase)) * (isLight ? 0.22 : 1);
        const px = s.x + mouseX * 18 * s.depth;
        const py = s.y + mouseY * 18 * s.depth;
        const lightness = isLight ? 45 : 88;

        ctx!.beginPath();
        ctx!.fillStyle = `hsla(${s.hue}, 80%, ${lightness}%, ${alpha})`;
        ctx!.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx!.fill();

        if (s.radius > 1.1) {
          ctx!.beginPath();
          ctx!.fillStyle = `hsla(${s.hue}, 80%, ${lightness}%, ${alpha * 0.15})`;
          ctx!.arc(px, py, s.radius * 3, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      if (!prefersReducedMotion && Math.random() < shootingStarFrequency) {
        spawnShootingStar();
      }
      shootingStars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.02;

        const tailX = star.x - Math.cos(Math.atan2(star.vy, star.vx)) * star.length;
        const tailY = star.y - Math.sin(Math.atan2(star.vy, star.vx)) * star.length;

        const grad = ctx!.createLinearGradient(star.x, star.y, tailX, tailY);
        const headColor = isLight ? "127, 70, 244" : "255, 255, 255";
        grad.addColorStop(0, `rgba(${headColor},${star.life * (isLight ? 0.35 : 1)})`);
        grad.addColorStop(1, `rgba(${headColor},0)`);

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(star.x, star.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      });
      shootingStars = shootingStars.filter((s) => s.life > 0);

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [starCount, shootingStarFrequency, isLight]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`}
    />
  );
}