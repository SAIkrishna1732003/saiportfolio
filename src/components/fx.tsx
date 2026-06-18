"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

/* ---------- Particles background ---------- */
export function Particles({ count = 60, color = "rgba(120,230,220,0.6)" }: { count?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 120 * dpr) {
            ctx.strokeStyle = `rgba(120,230,220,${0.18 * (1 - d / (120 * dpr))})`;
            ctx.lineWidth = dpr * 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count, color]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ---------- Meteors (deterministic, hydration-safe) ---------- */
export function Meteors({ number = 18 }: { number?: number }) {
  // Seeded pseudo-random so SSR and client match
  const rand = (i: number, salt: number) => {
    const x = Math.sin(i * 9301 + salt * 49297) * 233280;
    return x - Math.floor(x);
  };
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: number }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-0.5 w-0.5 rounded-full bg-primary shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor-var"
          style={{
            top: `${(rand(i, 1) * 60 - 20).toFixed(4)}%`,
            left: `${(rand(i, 2) * 100).toFixed(4)}%`,
            "--meteor-duration": `${(rand(i, 3) * 4 + 4).toFixed(4)}s`,
            "--meteor-delay": `${(rand(i, 4) * 5).toFixed(4)}s`,
          } as CSSProperties}
        >
          <span className="absolute top-1/2 -translate-y-1/2 h-px w-[60px] bg-gradient-to-r from-primary to-transparent" />
        </span>
      ))}
    </div>
  );
}

/* ---------- Aurora text ---------- */
export function Aurora({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block bg-clip-text text-transparent animate-aurora ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, oklch(0.9 0.18 180), oklch(0.85 0.2 150), oklch(0.78 0.2 260), oklch(0.9 0.18 180))",
        backgroundSize: "200% 100%",
      }}>
      {children}
    </span>
  );
}

/* ---------- Typing ---------- */
export function Typing({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text.length + 1 === cur.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, del ? 40 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[0.9em] translate-y-[2px] bg-primary ml-1 animate-pulse" />
    </span>
  );
}

/* ---------- Magic Card (spotlight + tilt) ---------- */
export function MagicCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const [pos, setPos] = useState({ x: -200, y: -200 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        setPos({ x, y });
        mx.set(x / r.width - 0.5);
        my.set(y / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); setPos({ x: -200, y: -200 }); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/60 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, oklch(0.82 0.17 180 / 0.18), transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, oklch(0.9 0.2 180 / 0.35), transparent 60%)`,
          WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ---------- BlurFade on view ---------- */
export function BlurFade({ children, delay = 0, y = 20, className = "" }:
  { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Shimmer button ---------- */
export function Shimmer({ children, className = "", as = "button", ...rest }:
  { children: ReactNode; className?: string; as?: "button" | "a"; [k: string]: any }) {
  const Cmp: any = as;
  return (
    <Cmp
      {...rest}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.82_0.17_180/0.35)] hover:shadow-[0_0_50px_oklch(0.82_0.17_180/0.55)] transition-shadow ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Cmp>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ children, speed = 30 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      <div className="flex gap-6 w-max animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {children}{children}
      </div>
    </div>
  );
}

/* ---------- Counter ---------- */
export function Counter({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = Number.isInteger(to) ? Math.round(val).toString() : val.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}
