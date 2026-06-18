"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

/* ---------- Glitch text ---------- */
export function Glitch({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={children}>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="absolute inset-0 z-0 text-primary opacity-70 animate-glitch1 mix-blend-screen">{children}</span>
      <span aria-hidden className="absolute inset-0 z-0 text-accent opacity-70 animate-glitch2 mix-blend-screen">{children}</span>
    </span>
  );
}

/* ---------- Terminal that auto-types lines ---------- */
const TERMINAL_LINES = [
  { cmd: "whoami", out: "sai.krishna — soc analyst @ bengaluru" },
  { cmd: "nmap -sS -p- target.internal", out: "[+] 1024 ports scanned · 3 open · 1 suspicious" },
  { cmd: "tshark -i eth0 -Y 'dns'", out: "[*] capturing dns · 412 queries · 2 anomalies flagged" },
  { cmd: "splunk search 'index=sec sourcetype=auth'", out: "[!] brute-force pattern detected · 192.168.4.21" },
  { cmd: "wazuh --alerts --level high", out: "[ok] 0 unresolved · system healthy" },
];

export function Terminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"cmd" | "out" | "wait">("cmd");

  useEffect(() => {
    const line = TERMINAL_LINES[step % TERMINAL_LINES.length];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "cmd") {
      if (typed.length < line.cmd.length) {
        t = setTimeout(() => setTyped(line.cmd.slice(0, typed.length + 1)), 45);
      } else {
        t = setTimeout(() => setPhase("out"), 400);
      }
    } else if (phase === "out") {
      t = setTimeout(() => setPhase("wait"), 700);
    } else {
      t = setTimeout(() => {
        setStep((s) => s + 1);
        setTyped("");
        setPhase("cmd");
      }, 1600);
    }
    return () => clearTimeout(t);
  }, [typed, phase, step]);

  const history = TERMINAL_LINES.slice(Math.max(0, step - 2), step).concat(
    phase !== "cmd" ? [TERMINAL_LINES[step % TERMINAL_LINES.length]] : []
  );

  return (
    <div className="relative rounded-xl border border-primary/30 bg-[oklch(0.12_0.02_250)]/90 backdrop-blur overflow-hidden font-mono text-[12px] leading-relaxed">
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2 bg-black/30">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.22_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.18_85)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.2_150)]" />
        <span className="ml-2 text-[10px] text-muted-foreground tracking-wide">sai@soc — zsh</span>
        <span className="ml-auto text-[10px] text-primary">● live</span>
      </div>
      <div className="p-4 min-h-[200px] text-foreground/90">
        {history.map((l, i) => (
          <div key={`${step}-${i}`} className="mb-1.5">
            <div><span className="text-primary">➜ </span><span className="text-accent">~ </span>{l.cmd}</div>
            {(i < history.length - 1 || phase === "wait") && (
              <div className="text-muted-foreground pl-3">{l.out}</div>
            )}
          </div>
        ))}
        {phase === "cmd" && (
          <div>
            <span className="text-primary">➜ </span><span className="text-accent">~ </span>{typed}
            <span className="inline-block w-1.5 h-3 translate-y-[2px] bg-primary ml-0.5 animate-pulse" />
          </div>
        )}
        {phase === "out" && (
          <div className="text-muted-foreground pl-3 animate-[fade-in_0.3s_ease-out]">
            {TERMINAL_LINES[step % TERMINAL_LINES.length].out}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Live threat feed ---------- */
const FEED_POOL = [
  { lvl: "HIGH", src: "192.168.4.21", evt: "brute force · ssh" },
  { lvl: "MED", src: "10.0.12.7", evt: "port scan detected" },
  { lvl: "LOW", src: "172.16.3.55", evt: "anomalous dns query" },
  { lvl: "MED", src: "203.0.113.9", evt: "suspicious user-agent" },
  { lvl: "HIGH", src: "198.51.100.4", evt: "c2 beacon pattern" },
  { lvl: "LOW", src: "10.0.4.18", evt: "geo-velocity alert" },
  { lvl: "MED", src: "192.168.9.12", evt: "lateral movement" },
  { lvl: "HIGH", src: "45.33.32.156", evt: "exfiltration attempt" },
];

export function ThreatFeed() {
  const [items, setItems] = useState(() => FEED_POOL.slice(0, 4).map((x, i) => ({ ...x, id: i, t: initialStamp(i) })));
  const next = useRef(items.length);
  useEffect(() => {
    setItems((arr) => arr.map((it, i) => ({ ...it, t: tStamp(i) })));
    const id = setInterval(() => {
      const pick = FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)];
      setItems((arr) => [{ ...pick, id: next.current++, t: tStamp(0) }, ...arr].slice(0, 5));
    }, 1700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 bg-black/20">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">LIVE THREAT FEED</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          STREAMING
        </span>
      </div>
      <div className="p-2 space-y-1">
        {items.map((it) => (
          <motion.div key={it.id}
            initial={{ opacity: 0, x: -16, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 rounded-md px-2.5 py-1.5 font-mono text-[11px] hover:bg-primary/5"
          >
            <span className="text-muted-foreground tabular-nums">{it.t}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
              it.lvl === "HIGH" ? "bg-destructive/20 text-destructive" :
              it.lvl === "MED" ? "bg-[oklch(0.78_0.18_80)]/20 text-[oklch(0.85_0.2_85)]" :
              "bg-primary/20 text-primary"
            }`}>{it.lvl}</span>
            <span className="text-foreground/80 truncate">{it.src}</span>
            <span className="text-muted-foreground truncate">› {it.evt}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function initialStamp(off: number) {
  return `12:${String(59 - off).padStart(2, "0")}:00`;
}

function tStamp(off: number) {
  const d = new Date(Date.now() - off * 60000);
  return d.toTimeString().slice(0, 8);
}

/* ---------- Holographic wireframe globe (SVG, animated) ---------- */
export function HoloGlobe() {
  return (
    <div className="relative aspect-square w-full max-w-[420px] mx-auto" style={{ perspective: 800 }}>
      {/* outer rotating ring */}
      <div aria-hidden className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, oklch(0.82 0.17 180 / 0.6) 30%, transparent 60%, oklch(0.78 0.2 150 / 0.6) 90%, transparent 100%)",
          WebkitMask: "radial-gradient(closest-side, transparent 64%, black 65%, black 68%, transparent 69%)",
                  mask: "radial-gradient(closest-side, transparent 64%, black 65%, black 68%, transparent 69%)",
        }}
      />
      {/* glow */}
      <div aria-hidden className="absolute inset-6 rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.17 180 / 0.5), transparent 65%)" }} />

      {/* wireframe globe */}
      <svg viewBox="0 0 200 200" className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]">
        <defs>
          <radialGradient id="globeGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.82 0.17 180)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.16 0.02 250)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#globeGrad)" />
        {/* latitudes */}
        <g fill="none" stroke="oklch(0.82 0.17 180 / 0.45)" strokeWidth="0.6">
          {[20, 40, 60, 80].map((r) => (
            <ellipse key={`lat${r}`} cx="100" cy="100" rx="80" ry={r} />
          ))}
          {/* longitudes (rotated ellipses) */}
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <ellipse key={`lon${a}`} cx="100" cy="100" rx="80" ry="30"
              transform={`rotate(${a} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="80" stroke="oklch(0.82 0.17 180 / 0.7)" />
        </g>
        {/* nodes */}
        {[
          [60, 70], [140, 90], [80, 130], [120, 140], [100, 60], [150, 120], [55, 110],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="oklch(0.9 0.2 150)">
              <animate attributeName="r" values="1.5;3.5;1.5" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* arcs between nodes */}
        <g fill="none" stroke="oklch(0.78 0.2 150 / 0.8)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 3">
          <path d="M60 70 Q 100 30 140 90" />
          <path d="M80 130 Q 110 170 150 120" />
          <path d="M55 110 Q 100 90 120 140" />
        </g>
      </svg>

      {/* orbit rings */}
      <div aria-hidden className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "30s" }}>
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <span className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
      </div>
      <div aria-hidden className="absolute inset-6 animate-spin-slow" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
        <div className="absolute inset-0 rounded-full border border-accent/30" />
        <span className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
      </div>

      {/* HUD readouts */}
      <HudTag className="top-2 left-2">N · 12.97° / E · 77.59°</HudTag>
      <HudTag className="top-2 right-2">SCAN · 0xA37F</HudTag>
      <HudTag className="bottom-2 left-2">UPLINK · OK</HudTag>
      <HudTag className="bottom-2 right-2">LAT · 12ms</HudTag>
    </div>
  );
}

function HudTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute font-mono text-[9px] tracking-widest text-primary/90 border border-primary/40 bg-background/60 backdrop-blur px-1.5 py-0.5 rounded ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Live stat tile ---------- */
export function StatTile({ label, value, suffix = "", trend, icon }:
  { label: string; value: ReactNode; suffix?: string; trend?: string; icon?: ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur p-4 hover:border-primary/50 transition">
      <div aria-hidden className="absolute -inset-px opacity-0 group-hover:opacity-100 transition"
        style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.82 0.17 180 / 0.15), transparent 70%)" }} />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="relative mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
        {suffix && <span className="text-sm text-primary">{suffix}</span>}
      </div>
      {trend && <div className="relative mt-1 font-mono text-[10px] text-accent">{trend}</div>}
    </div>
  );
}
