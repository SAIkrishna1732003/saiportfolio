import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "motion/react";
import profileImg from "@/assets/profile.jpg";
import {
  Mail, Phone, Linkedin, Github, Download, Shield, Network,
  Search, Bug, Lock, GraduationCap, Briefcase, Award, ArrowUpRight,
  Sparkles, Zap, Activity,
} from "lucide-react";
import {
  Particles, Meteors, Aurora, Typing, MagicCard, BlurFade, Shimmer, Marquee, Counter,
} from "@/components/fx";
import { Glitch, Terminal, ThreatFeed, HoloGlobe, StatTile } from "@/components/cyberfx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sai Krishna K M — SOC Analyst & Cybersecurity Portfolio" },
      { name: "description", content: "Portfolio of Sai Krishna K M, aspiring SOC Analyst specializing in network security monitoring, threat detection, and DNS traffic analysis." },
      { property: "og:title", content: "Sai Krishna K M — SOC Analyst" },
      { property: "og:description", content: "Cybersecurity portfolio — projects, skills, and experience in threat detection and network security." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { icon: Network, name: "Nmap" }, { icon: Search, name: "Wireshark" },
  { icon: Terminal, name: "Splunk" }, { icon: Shield, name: "Wazuh" },
  { icon: Bug, name: "Nessus" }, { icon: Lock, name: "John the Ripper" },
  { icon: Terminal, name: "Hydra" }, { icon: Search, name: "Shodan" },
  { icon: Network, name: "Netdiscover" }, { icon: Bug, name: "Dirb" },
  { icon: Search, name: "Subfinder" }, { icon: Shield, name: "SIEM" },
];

const GITHUB_URL = "https://github.com/saikrishna172003";

const PROJECTS = [
  { title: "AI Automation & Log Analysis Assistant", tag: "AI · SOC · Automation", href: GITHUB_URL,
    desc: "Intelligent cybersecurity system that automates log monitoring and threat detection. Web dashboard, AI chatbot, automated alerts, and security report generation.",
    stack: ["Python", "FastAPI", "OpenAI", "React", "PostgreSQL", "Docker"],
    highlights: ["Real-time log ingestion & parsing", "LLM-powered triage assistant", "Automated PDF incident reports"] },
  { title: "Network Anomaly Detection with AI", tag: "ML · Wireshark · Unsupervised", href: GITHUB_URL,
    desc: "AI-based network anomaly detection capturing real-time traffic via Wireshark. Uses K-Means clustering and Isolation Forest to flag traffic spikes and abnormal connections.",
    stack: ["Python", "Scikit-learn", "Wireshark", "Pandas", "Matplotlib"],
    highlights: ["Live PCAP feature extraction", "Hybrid K-Means + Isolation Forest", "Anomaly scoring dashboard"] },
  { title: "AI-Powered Threat Intel Aggregator", tag: "Threat Intel · LLM · Gradio", href: GITHUB_URL,
    desc: "Aggregates threat data from RSS feeds, GitHub and security blogs. Auto-extracts IOCs and summarizes intel with Ollama LLMs in an interactive Gradio dashboard.",
    stack: ["Python", "Ollama", "Gradio", "BeautifulSoup", "RegEx"],
    highlights: ["Multi-source intel ingestion", "Automatic IOC extraction", "LLM summaries with citations"] },
  { title: "DNS Traffic Monitoring & Suspicious Domain Detection", tag: "DNS · Wireshark · C2", href: GITHUB_URL,
    desc: "Live DNS query analysis to spot phishing domains, DNS tunneling and command-and-control communications by inspecting query frequency and domain behavior.",
    stack: ["Python", "Scapy", "Wireshark", "Entropy Analysis"],
    highlights: ["Real-time DNS sniffing", "Entropy-based DGA detection", "C2 beaconing alerts"] },
  { title: "Online Courier Management System", tag: "PHP · MySQL · Full-stack", href: GITHUB_URL,
    desc: "Full-stack courier platform with role-based access, real-time shipment tracking, billing and automated reporting — digitizing the parcel lifecycle.",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Apache"],
    highlights: ["Role-based access (admin/staff/customer)", "Live shipment tracking", "Automated billing & invoices"] },
];

type Project = (typeof PROJECTS)[number];


const CERTS_FOLDER = "https://drive.google.com/drive/folders/1VA_tFW2Fsgo2BzeBs9JZgNDzjmBLhZA1?usp=drive_link";
const CERTS: { name: string; href: string }[] = [
  { name: "Cisco — Introduction to Cybersecurity", href: "https://drive.google.com/file/d/17wNnJ1vRKVzrIdqMG8AYDe8vruSEzKT7/view?usp=drive_link" },
  { name: "Cisco — Networking Academy Program", href: "https://drive.google.com/file/d/10hDIMdimSNZaaEUNfaTXbpa1KXIicBGl/view?usp=drive_link" },
  { name: "Cisco — Cyber Threat Management", href: "https://drive.google.com/file/d/1nIWDROKQ0im7JVAk_8H5EstKR-JfMJxZ/view?usp=drive_link" },
  { name: "Cisco — Junior Cybersecurity Analyst", href: "https://drive.google.com/file/d/1B7su0w-KiEvo27m83iLP98DxiKVgDrlT/view?usp=drive_link" },
  { name: "Cisco — Cybersecurity Defense Analyst", href: "https://drive.google.com/file/d/1lv9LEVXcHk8Qe2YXHSLDtQWsxR8GPC8h/view?usp=drive_link" },
  { name: "IBM — Python 101 for Data Science", href: CERTS_FOLDER },
  { name: "IBM — SQL and Relational Database 101", href: CERTS_FOLDER },
];

function Portfolio() {
  // Cursor glow
  const cx = useMotionValue(-300), cy = useMotionValue(-300);
  useEffect(() => {
    const m = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [cx, cy]);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30 overflow-hidden">
      {/* Cursor follow glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-30 h-[480px] w-[480px] rounded-full mix-blend-screen"
        style={{
          x: useSpring(useTransform(cx, (v) => v - 240), { stiffness: 120, damping: 25 }),
          y: useSpring(useTransform(cy, (v) => v - 240), { stiffness: 120, damping: 25 }),
          background: "radial-gradient(closest-side, oklch(0.82 0.17 180 / 0.18), transparent 70%)",
        }}
      />

      {/* Animated grid + scan line */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] animate-grid"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* Nav */}
      <Nav />

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-6">
        <Hero />

        {/* Skills marquee strip */}
        <div className="relative -mx-6 border-y border-border/60 bg-card/30 py-6">
          <Marquee speed={35}>
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-6 text-muted-foreground">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm whitespace-nowrap">{s.name}</span>
                <span className="text-border">/</span>
              </div>
            ))}
          </Marquee>
        </div>

        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />

        <footer className="py-10 border-t border-border/60 mt-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} Sai Krishna K M · All systems operational</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Built with care · Bengaluru
          </span>
        </footer>
      </main>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all ${scrolled ? "bg-background/80 border-border/80" : "bg-background/40 border-transparent"}`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="relative h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />
            <span className="absolute inset-0 rounded-full bg-primary" />
          </span>
          <span className="font-semibold tracking-tight">sai.krishna</span>
          <span className="text-muted-foreground">/SOC</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
              className="relative px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors group">
              {n.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-primary" />
            </a>
          ))}
        </nav>
        <a href="/Sai_Krishna_K_M_Resume.pdf" download
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 hover:scale-105 transition">
          <Download className="h-3.5 w-3.5" /> Resume
        </a>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative pt-12 pb-0 md:pt-14">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div aria-hidden className="absolute inset-0 -z-10"><Particles count={70} /></div>
      <Meteors number={18} />

      {/* Top status ticker */}
      <BlurFade>
        <div className="mb-8 flex items-center gap-3 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 font-mono text-[10px] text-muted-foreground overflow-hidden">
          <span className="flex items-center gap-1.5 text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            SYSTEM
          </span>
          <span className="text-border">|</span>
          <span>UPLINK 0xA37F</span>
          <span className="text-border">|</span>
          <span>NODE bengaluru-01</span>
          <span className="text-border">|</span>
          <span className="text-primary">SOC // ARMED</span>
          <span className="text-border">|</span>
          <span className="hidden sm:inline">SHIFT 0xA37F·9C</span>
          <span className="ml-auto hidden md:inline text-primary">▲ all systems nominal</span>
        </div>
      </BlurFade>

      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
        <div>
          <BlurFade delay={0.05}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
              <Glitch>HUNTING</Glitch>{" "}
              <span className="text-muted-foreground">/</span>{" "}
              <Glitch>THREATS</Glitch>
              <br />
              <Aurora>one packet at a time.</Aurora>
            </h1>
          </BlurFade>

          <BlurFade delay={0.15}>
            <div className="mt-5 font-mono text-sm md:text-base text-muted-foreground">
              <span className="text-primary">$ role --current </span>
              <Typing words={["soc analyst", "threat hunter", "network defender", "packet whisperer"]} />
            </div>
          </BlurFade>

          <BlurFade delay={0.22}>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm <span className="text-foreground font-medium">Sai Krishna K M</span> — an aspiring SOC Analyst focused on network monitoring, anomaly detection and DNS traffic analysis. Currently pursuing M.Tech in Cyber Security at REVA University.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Shimmer as="a" href="#projects">
                Initiate scan <ArrowUpRight className="h-4 w-4" />
              </Shimmer>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:-translate-y-0.5 transition">
                Open channel
              </a>
              <a href="/Sai_Krishna_K_M_Resume.pdf" download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:-translate-y-0.5 transition">
                <Download className="h-4 w-4" /> Resume.pdf
              </a>
            </div>
          </BlurFade>

          {/* Live terminal */}
          <BlurFade delay={0.4}>
            <div className="mt-8">
              <Terminal />
            </div>
          </BlurFade>

          {/* Live stat tiles */}
          <BlurFade delay={0.5}>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatTile label="PROJECTS" value={<Counter to={5} suffix="+" />} icon={<Zap className="h-3.5 w-3.5 text-primary" />} trend="▲ +2 this qtr" />
              <StatTile label="CERTS" value={<Counter to={7} />} icon={<Award className="h-3.5 w-3.5 text-accent" />} trend="cisco · ibm" />
              <StatTile label="CGPA" value={<Counter to={8.7} />} icon={<GraduationCap className="h-3.5 w-3.5 text-primary" />} trend="b.tech · aiml" />
              <StatTile label="UPTIME" value="100" suffix="%" icon={<Activity className="h-3.5 w-3.5 text-accent" />} trend="● online" />
            </div>
          </BlurFade>
        </div>

        {/* Right column: hologram profile + globe + threat feed */}
        <div className="space-y-5">
          <BlurFade delay={0.2} y={30}>
            <HologramCard />
          </BlurFade>
          <BlurFade delay={0.35}>
            <ThreatFeed />
          </BlurFade>
          <BlurFade delay={0.45}>
            <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur p-4 overflow-hidden">
              <div className="absolute top-3 left-4 font-mono text-[10px] tracking-widest text-muted-foreground z-10">
                GLOBAL · THREAT MAP
              </div>
              <HoloGlobe />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

function HologramCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 });
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* rotating ring */}
      <div aria-hidden className="absolute -inset-6 rounded-3xl opacity-50 blur-2xl animate-spin-slow"
        style={{ background: "conic-gradient(from 0deg, transparent, oklch(0.82 0.17 180 / 0.5), transparent, oklch(0.78 0.2 150 / 0.5), transparent)" }} />

      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-primary/30 bg-card/70 backdrop-blur p-2 animate-glow"
      >
        {/* scan line */}
        <div aria-hidden className="absolute inset-2 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan" />
        </div>
        {/* corner brackets */}
        {[
          "top-3 left-3 border-t-2 border-l-2",
          "top-3 right-3 border-t-2 border-r-2",
          "bottom-[88px] left-3 border-b-2 border-l-2",
          "bottom-[88px] right-3 border-b-2 border-r-2",
        ].map((c) => <span key={c} className={`pointer-events-none absolute h-5 w-5 border-primary ${c}`} />)}

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <img src={profileImg} alt="Sai Krishna K M" width={768} height={768}
            className="rounded-xl w-full aspect-[5/4] object-cover object-top" />
          {/* scanline overlay */}
          <div aria-hidden className="absolute inset-0 rounded-xl pointer-events-none mix-blend-overlay opacity-30"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, oklch(0.82 0.17 180 / 0.6) 2px 3px)" }} />
        </div>

        {/* HUD readouts */}
        <div className="absolute top-5 right-5 rounded-md border border-primary/40 bg-background/70 backdrop-blur px-2 py-1 font-mono text-[10px] text-primary flex items-center gap-1.5" style={{ transform: "translateZ(60px)" }}>
          <Activity className="h-2.5 w-2.5" /> ONLINE
        </div>
        <div className="absolute top-5 left-5 rounded-md border border-accent/40 bg-background/70 backdrop-blur px-2 py-1 font-mono text-[10px] text-accent" style={{ transform: "translateZ(60px)" }}>
          ID · 0x4S1K
        </div>

        <div className="px-3 pt-2 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Sai Krishna K M</div>
              <div className="text-xs text-muted-foreground font-mono">SOC Analyst · Bengaluru, IN</div>
            </div>
            <div className="flex gap-1.5">
              <SocialIcon href="https://www.linkedin.com/" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://github.com/" label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a aria-label={label} href={href} target="_blank" rel="noreferrer"
      className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:border-primary/60 hover:text-primary hover:rotate-6 hover:scale-110 transition">
      {children}
    </a>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="Profile">
      <div className="grid md:grid-cols-3 gap-10">
        <BlurFade className="md:col-span-2">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Aspiring cybersecurity professional with a focus on{" "}
            <span className="text-foreground">network security monitoring</span>,{" "}
            <span className="text-foreground">anomaly detection</span> and{" "}
            <span className="text-foreground">DNS traffic analysis</span>. I enjoy
            identifying suspicious activity and turning raw telemetry into
            actionable threat intelligence — and I'm constantly learning by shipping practical SOC tooling.
          </p>
        </BlurFade>
        <BlurFade delay={0.1}>
          <div className="space-y-3">
            <InfoRow icon={GraduationCap} label="Pursuing" value="M.Tech Cyber Security" />
            <InfoRow icon={Briefcase} label="Last role" value="HAL — Data Intern" />
            <InfoRow icon={Shield} label="Focus" value="SOC · Threat Detection" />
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="02 / Skills" title="Tools of the trade">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {SKILLS.map(({ icon: Icon, name }, i) => (
          <BlurFade key={name} delay={i * 0.04}>
            <div className="group relative flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur px-4 py-3.5 hover:border-primary/60 hover:-translate-y-1 transition overflow-hidden">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.82 0.17 180 / 0.15), transparent 70%)" }} />
              <Icon className="relative h-4 w-4 text-primary group-hover:scale-125 group-hover:rotate-12 transition" />
              <span className="relative text-sm font-medium">{name}</span>
            </div>
          </BlurFade>
        ))}
      </div>
      <BlurFade delay={0.2}>
        <div className="mt-8 rounded-2xl border border-border bg-card/40 p-6">
          <div className="text-xs font-mono text-muted-foreground mb-3">// soft skills</div>
          <div className="flex flex-wrap gap-2">
            {["Leadership", "Communication", "Teamwork", "Creative Thinking", "Team Management"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition">
                {s}
              </span>
            ))}
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="03 / Journey" title="Experience & Education">
      <div className="grid md:grid-cols-2 gap-6">
        <BlurFade>
          <TimelineCard icon={Briefcase} title="Data Intern" org="Hindustan Aeronautics Limited (HAL)" date="Feb 2025 – May 2025"
            points={[
              "Analyzed flight control and sensor data for performance and stability evaluation.",
              "Preprocessed, cleaned and validated aerospace datasets.",
              "Drove control-system reliability improvements through data insights.",
              "Hands-on exposure to avionics and flight control architectures.",
            ]} />
        </BlurFade>
        <div className="space-y-6">
          <BlurFade delay={0.1}>
            <TimelineCard icon={GraduationCap} title="M.Tech, Cyber Security"
              org="REVA Academy for Corporate Excellence · REVA University" date="Nov 2025 – Nov 2027"
              points={["Advanced study in offensive & defensive security."]} />
          </BlurFade>
          <BlurFade delay={0.2}>
            <TimelineCard icon={GraduationCap} title="B.Tech, AI & ML"
              org="New Horizon College, Bengaluru" date="Jan 2023 – May 2025 · CGPA 8.7"
              points={["Foundations in ML, data systems and applied AI."]} />
          </BlurFade>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <Section id="projects" eyebrow="04 / Work" title="Selected projects">
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <BlurFade
            key={p.title}
            delay={i * 0.08}
            className={i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1 ? "md:col-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setActive(p)}
              className="block h-full w-full text-left"
            >
              <MagicCard className="p-6 h-full cursor-pointer">
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <div className="mt-1 text-xs font-mono text-primary">{p.tag}</div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded border border-border/60 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono text-primary opacity-70 group-hover:opacity-100 transition">
                    <Sparkles className="h-3.5 w-3.5" /> view details
                  </div>
                </div>
              </MagicCard>
            </button>
          </BlurFade>
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl border-primary/30 bg-background/95 backdrop-blur-xl">
        {project && (
          <>
            <DialogHeader>
              <div className="font-mono text-xs text-primary">{project.tag}</div>
              <DialogTitle className="text-2xl tracking-tight">{project.title}</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed pt-2">
                {project.desc}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Highlights</div>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm">
                    <span className="text-primary mt-1">▸</span>
                    <span className="text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Tech stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs font-mono rounded border border-primary/30 bg-primary/5 text-primary">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                <Github className="h-4 w-4" /> View on GitHub
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted/30 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}


function Certifications() {
  return (
    <Section id="certifications" eyebrow="05 / Credentials" title="Certifications">
      <div className="grid sm:grid-cols-2 gap-3">
        {CERTS.map((c, i) => (
          <BlurFade key={c.name} delay={i * 0.05}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 hover:border-accent/60 hover:translate-x-1 transition cursor-pointer"
            >
              <Award className="h-4 w-4 text-accent shrink-0 group-hover:rotate-12 transition" />
              <span className="text-sm flex-1">{c.name}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-accent transition">view ↗</span>
            </a>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="06 / Contact" title="Let's connect">
      <BlurFade>
        <div className="relative rounded-3xl border border-border p-8 md:p-12 overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--color-card), color-mix(in oklab, var(--color-primary) 10%, var(--color-card)))" }}>
          <div aria-hidden className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full opacity-30 blur-3xl animate-pulse"
            style={{ background: "var(--gradient-primary)" }} />
          <div aria-hidden className="absolute inset-0 opacity-50"><Particles count={30} /></div>

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                Have a role, project or <Aurora>CTF idea?</Aurora>
              </h3>
              <p className="mt-3 text-muted-foreground">
                I'm open to SOC analyst opportunities, internships and security research collaborations.
              </p>
              <Shimmer as="a" href="mailto:saikrish172003@gmail.com" className="mt-6">
                <Mail className="h-4 w-4" /> saikrish172003@gmail.com
              </Shimmer>
            </div>
            <div className="space-y-3">
              <ContactRow icon={Mail} label="Email" value="saikrish172003@gmail.com" href="mailto:saikrish172003@gmail.com" />
              <ContactRow icon={Phone} label="Phone" value="+91 91414 28452" href="tel:+919141428452" />
              <ContactRow icon={Linkedin} label="LinkedIn" value="Sai Krishna" href="https://www.linkedin.com/" />
              <ContactRow icon={Github} label="GitHub" value="Sai Krishna" href="https://github.com/" />
            </div>
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 md:py-28 scroll-mt-20">
      <BlurFade>
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-xs text-primary mb-3">{eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border via-primary/40 to-transparent max-w-xs hidden md:block" />
        </div>
      </BlurFade>
      {children}
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur px-4 py-3 hover:border-primary/50 transition">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function TimelineCard({ icon: Icon, title, org, date, points }:
  { icon: React.ComponentType<{ className?: string }>; title: string; org: string; date: string; points: string[] }) {
  return (
    <MagicCard className="p-6">
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg border border-primary/40 bg-primary/10 grid place-items-center text-primary shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold tracking-tight">{title}</h3>
            <div className="text-sm text-muted-foreground">{org}</div>
            <div className="mt-1 font-mono text-xs text-primary">{date}</div>
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </MagicCard>
  );
}

function ContactRow({ icon: Icon, label, value, href }:
  { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href: string }) {
  return (
    <a href={href}
      className="group flex items-center gap-4 rounded-xl border border-border bg-background/40 backdrop-blur px-4 py-3 hover:border-primary/50 hover:translate-x-1 transition">
      <Icon className="h-4 w-4 text-primary" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
    </a>
  );
}
