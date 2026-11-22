import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {AlertOctagon, Lock, MonitorX, ShieldAlert, ShieldCheck} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

type QprtPhase = 'p1' | 'p2' | 'p3' | 'p4';
type Module7Round = 'daily' | 'mega';
type LockdownVector = 'newtab' | 'appswitch' | 'split' | 'clipboard' | 'devtools';

const LOCKDOWN_VECTORS: Record<
  LockdownVector,
  {
    label: string;
    event: string;
    escalation: string;
    consequence: string;
    severity: string;
  }
> = {
  newtab: {
    label: 'Open New Tab',
    event: 'Window blur + window.open / hotkey intercept detected inside Full-Screen Lockdown',
    escalation: 'Immediate Violation Warning + MBTS Flag #1 Logged',
    consequence: 'Tab spawn blocked; repeat breach triggers auto-submit of active proof buffer.',
    severity: 'Flag +1 · Auto-Log',
  },
  appswitch: {
    label: 'Switch Tab / External App',
    event: 'visibilitychange / focus-loss duration > 1.2s during active rated contest',
    escalation: 'Immediate Integrity Flag Escalation to ChronoVault',
    consequence: 'Cumulative switches auto-terminate round session & submit current snapshot.',
    severity: 'Auto-Submit Threshold',
  },
  split: {
    label: 'Split-Screen / Resize',
    event: 'Viewport geometry drop below full-screen aspect threshold (split-screen resize)',
    escalation: 'Canvas Paused + Mandatory Full-Screen Re-Lock Prompt',
    consequence: 'Problem text obscures cleanly until full-screen lock is restored or match terminates.',
    severity: 'Canvas Obscured',
  },
  clipboard: {
    label: 'External Copy-Paste',
    event: 'Non-session clipboard paste / copy-exfil attempt on problem statement',
    escalation: 'Clipboard Sanitized + Entropy Flag Recorded',
    consequence: 'External LaTeX paste blocked; problem statements cannot be copied to external LLMs.',
    severity: 'Paste Blocked',
  },
  devtools: {
    label: 'DevTools Inspect',
    event: 'F12 / Ctrl+Shift+I / viewport debugger timing anomaly triggered',
    escalation: 'Immediate Disqualification Protocol (Flagged Round)',
    consequence: 'Instant session lock, rating nullification (-5 ELO), and 11-Flag Blackhole strike.',
    severity: 'Immediate DQ',
  },
};

const SECURITY_FAQS = [
  {
    q: 'Why is Full-Screen & App/Tab Lockdown mandatory on live rated contests?',
    a: 'Even strong problemsets lose competitive integrity if solvers toggle tabs to external CAS tools or copy statements into AI chats. Mandatory Live Contest Full-Screen & App/Tab Lockdown enforces closed-book exam discipline identically across web and mobile PWA viewports.',
  },
  {
    q: 'Does Optional Module 7 record or upload my webcam video stream?',
    a: 'Never. Module 7 runs Adaptive Gaze Guard (4.5s off-canvas check) and 3-Axis Audio Trap entirely in-browser via client WebRTC frames. Zero raw video or audio ever hits remote storage—keeping full compliance with COPPA/GDPR-K youth privacy.',
  },
  {
    q: 'What if an internet outage drops my connection during Sunday Mega?',
    a: 'GridShield AI pings every 10 seconds and freezes the entire contest clock (FROZEN) after 30 consecutive seconds of server/ISP outage while your IndexedDB Offline Vault preserves every keystroke locally.',
  },
];

export const SecurityQprt4Page: React.FC = () => {
  const [phase, setPhase] = useState<QprtPhase>('p1');
  const [module7Mode, setModule7Mode] = useState<Module7Round>('daily');
  const [lockVector, setLockVector] = useState<LockdownVector>('appswitch');
  const [strikeCount, setStrikeCount] = useState<number>(1);

  const activeVector = LOCKDOWN_VECTORS[lockVector];

  const triggerLockSim = (vec: LockdownVector) => {
    setLockVector(vec);
    setStrikeCount((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  return (
    <>
      {/* Section 1: Interactive QPRT-4 4-Phase Resilience Explorer */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#F43F5E" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-10">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · arithmo-edge.github.io/hq-core/ · QPRT-4 Defense-in-Depth
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  QPRT-4 Resilience, Live Lockdown &amp; Legal Shield
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Quantitative Olympiad ratings demand fault-tolerant infrastructure and strict exam lockdown. Explore{' '}
                  <span className="text-white font-semibold">The Arithmo-Edge Quad-Phase Resilience Theory (QPRT-4)</span>
                  , mandatory <span className="text-white font-semibold">Live Rated Full-Screen &amp; App/Tab Lockdown</span>
                  , adaptive <span className="text-white font-semibold">Module 7</span> proctoring,{' '}
                  <span className="font-mono-tabular text-cyan-300">MBTS</span> clustering, and our 14-Point Legal
                  Shield.
                </p>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.16} className="h-full">
                <div className="h-full min-h-[260px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group">
                  <ResilientImage
                    src={MEDIA.secHero}
                    alt="QPRT-4 cryptographic cybersecurity protection"
                    loading="eager"
                    accentColor="#F43F5E"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">
                      The Arithmo-Edge Quad-Phase Resilience Theory (QPRT-4)
                    </div>
                    <div className="font-display text-lg font-bold text-white">
                      Full-Screen Lockdown · 30s Hot-Swap · 2-Min Rejudge
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <ScrollReveal>
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl mb-6">
                {(
                  [
                    {id: 'p1', label: 'Phase I · Pre-Exam Preventive Shield'},
                    {id: 'p2', label: 'Phase II · In-Exam Real-Time Stabilization'},
                    {id: 'p3', label: 'Phase III · Post-Exam Forensic Rectification'},
                    {id: 'p4', label: 'Phase IV · Post-Cycle Evolutionary Archival'},
                  ] as const
                ).map((item) => {
                  const active = phase === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-qprt-phase={item.id}
                      onClick={() => setPhase(item.id)}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors ${
                        active ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div
                data-qprt-panel="p1"
                className={`grid md:grid-cols-3 gap-5${phase === 'p1' ? '' : ' hidden'}`}
              >
                <div className="rounded-xl border border-cyan-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-cyan-300">PlagioGuard AI</div>
                  <div className="font-display text-xl font-bold text-white">&gt;75% Similarity Block</div>
                  <p className="ae-prose text-xs text-slate-400">
                    <code className="text-slate-200">PlagioGuard AI</code> blocks any draft problem exceeding{' '}
                    <code className="text-cyan-300">&gt;75%</code> AoPS or historical corpus similarity before round
                    lock.
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-cyan-300">AxiomCheck AI</div>
                  <div className="font-display text-xl font-bold text-white">100% Python/SymPy Proof Check</div>
                  <p className="ae-prose text-xs text-slate-400">
                    <code className="text-slate-200">AxiomCheck AI</code> runs{' '}
                    <code className="text-cyan-300">100% Python/SymPy</code> deterministic proof and
                    boundary-condition verification prior to contest launch.
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-cyan-300">QuantumShuffler AI</div>
                  <div className="font-display text-xl font-bold text-white">2 Standby Reserves / Segment</div>
                  <p className="ae-prose text-xs text-slate-400">
                    <code className="text-slate-200">QuantumShuffler AI</code> locks{' '}
                    <span className="text-white font-semibold">2 standby reserve problems per segment</span> in
                    encrypted cold vaults for instant fail-over.
                  </p>
                </div>
              </div>

              <div
                data-qprt-panel="p2"
                className={`grid md:grid-cols-2 gap-5${phase === 'p2' ? '' : ' hidden'}`}
              >
                <div className="rounded-xl border border-violet-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-violet-300">GridShield AI · 10s Ping</div>
                  <div className="font-display text-lg font-bold text-white">30s Outage Clock Freeze</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Pings every <code className="text-violet-300">10s</code> and freezes contest clocks (
                    <code className="text-rose-300">FROZEN</code>) after 30s outage, appending exact recovery time.
                  </p>
                </div>
                <div className="rounded-xl border border-violet-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-violet-300">PulseWatcher AI · Leak Guard</div>
                  <div className="font-display text-lg font-bold text-white">30s Hot-Swap + 10m Bonus</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Executes a <span className="text-white font-semibold">30-second</span> reserve problem hot-swap
                    plus +10 min global bonus time on confirmed leaks.
                  </p>
                </div>
                <div className="rounded-xl border border-violet-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-violet-300">App &amp; Tab Lockdown</div>
                  <div className="font-display text-lg font-bold text-white">Mandatory Full-Screen Lock</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Blocks new tabs, app switches, split-screen, clipboard exfiltration, and DevTools triggers.
                  </p>
                </div>
                <div className="rounded-xl border border-violet-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-violet-300">Biometric Integrity</div>
                  <div className="font-display text-lg font-bold text-white">Optional Module 7</div>
                  <p className="ae-prose text-xs text-slate-400">
                    <strong>Optional Module 7</strong> (<code className="text-violet-300">4.5s</code> Gaze + 3-Axis
                    Audio) user-selectable Mon–Sat, mandatory Sunday Mega.
                  </p>
                </div>
              </div>

              <div
                data-qprt-panel="p3"
                className={`grid md:grid-cols-3 gap-5${phase === 'p3' ? '' : ' hidden'}`}
              >
                <div className="rounded-xl border border-amber-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-amber-300">Find the Flaw + Rejudge</div>
                  <div className="font-display text-xl font-bold text-white">2-Min SymPy Global Rejudge</div>
                  <p className="ae-prose text-xs text-slate-400">
                    <code className="text-slate-200">Find the Flaw</code> (<code className="text-amber-300">6h</code>{' '}
                    daily / <code className="text-amber-300">2h</code> Sunday Mega) +{' '}
                    <span className="text-white font-semibold">2-minute</span> SymPy Global Rejudge across all
                    scores.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-amber-300">Behavioral Forensics</div>
                  <div className="font-display text-xl font-bold text-white">MBTS Telemetry Clustering</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Correlates keystroke entropy, LaTeX backtrack cadence, and multi-session timing signatures.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-amber-300">Rating Safeguard</div>
                  <div className="font-display text-xl font-bold text-white">
                    Zero-Dampening Asymmetric Shield
                  </div>
                  <p className="ae-prose text-xs text-slate-400">
                    Ensures legitimate high-ELO wins and post-rejudge restorations propagate without artificial
                    dampening.
                  </p>
                </div>
              </div>

              <div
                data-qprt-panel="p4"
                className={`grid md:grid-cols-2 gap-5${phase === 'p4' ? '' : ' hidden'}`}
              >
                <div className="rounded-xl border border-emerald-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-emerald-300">
                    ChronoVault AI + ComplianceGuard AI
                  </div>
                  <div className="font-display text-xl font-bold text-white">24-Hour Zero-PII JSONL Archival</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Scrubs all PII and pushes <code className="text-emerald-300">Zero-PII JSONL</code> vectors to
                    the cold archival store every 24 hours.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-400/25 bg-slate-950/70 p-5 space-y-2">
                  <div className="text-xs font-mono-tabular text-emerald-300">Evolutionary Benchmark Loop</div>
                  <div className="font-display text-xl font-bold text-white">Contamination-Free Feedback</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Anonymized trajectories calibrate future difficulty curves under permanent COPPA/GDPR-K bounds.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Mandatory Live Rated Contest Full-Screen & App/Tab Lockdown Simulator */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Zero-Bypass Exam Containment"
            title="Mandatory Live Rated Contest Full-Screen & App/Tab Lockdown"
            accentClass="text-rose-300"
            subtitle="Whenever a competitor launches a live rated contest, client containment actively blocks new tabs, tab/app switches, split-screen resizing, clipboard copy-paste, and DevTools—escalating directly to auto-submission or disqualification."
          />

          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-rose-400/35 space-y-6">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(LOCKDOWN_VECTORS) as LockdownVector[]).map((vec) => {
                const item = LOCKDOWN_VECTORS[vec];
                const active = lockVector === vec;
                return (
                  <button
                    key={vec}
                    type="button"
                    data-lock-vector={vec}
                    onClick={() => triggerLockSim(vec)}
                    className={`px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'border-rose-400 bg-rose-500/15 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:text-white'
                    }`}
                  >
                    Simulate: {item.label}
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-rose-300 flex items-center gap-1.5">
                    <MonitorX className="w-4 h-4" />
                    <span data-lock-label="">Intercepted Breach Vector: {activeVector.label}</span>
                  </span>
                  <span data-lock-severity="" className="text-amber-300">{activeVector.severity}</span>
                </div>
                <div data-lock-event="" className="font-mono-tabular text-xs text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg p-3">
                  {activeVector.event}
                </div>
                <p className="ae-prose text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong>Enforcement Action:</strong> <span data-lock-consequence="">{activeVector.consequence}</span>
                </p>
              </div>

              <div className="lg:col-span-5 rounded-xl border border-rose-400/30 bg-rose-500/10 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-rose-300">
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                  <span data-lock-strike="">Live Escalation Telemetry (Simulated Strike {strikeCount}/3)</span>
                </div>
                <div data-lock-escalation="" className="font-display text-lg font-bold text-white">{activeVector.escalation}</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  At 3/3 Containment Breaches (or single DevTools inspection), the active session is auto-submitted and
                  routed directly into the 11-Flag Blackhole Escalation Ladder.
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-800 aspect-[16/10] max-h-[140px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.secLockdown}
                    alt="Mandatory live contest Full-Screen and App/Tab Lockdown isolation"
                    loading="lazy"
                    accentColor="#F43F5E"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Optional vs Mandatory Module 7 Proctoring Switcher */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-mono-tabular text-cyan-300">03 · Module 7 Privacy Mode Selector</div>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  Optional vs. Mandatory Module 7
                </h2>
                <p className="ae-prose text-sm text-slate-300">
                  Students maintain full agency on Mon–Sat daily rounds while safeguarding prestige on Sunday Mega &amp;
                  World Cup finals.
                </p>
                <label htmlFor="module7-round-type" className="block text-xs font-mono-tabular text-slate-400 pt-2">
                  Select Contest Tier
                </label>
                <select
                  id="module7-round-type"
                  value={module7Mode}
                  onChange={(e) => setModule7Mode(e.target.value as Module7Round)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white"
                >
                  <option value="daily">Daily Rated Contests (Mon–Sat)</option>
                  <option value="mega">Sunday Mega Arena &amp; Top 128 World Cup</option>
                </select>
              </div>
              <div className="lg:col-span-7 rounded-xl border border-cyan-400/35 bg-slate-950/80 p-6 space-y-3">
                <div className="text-xs font-mono-tabular text-cyan-300 uppercase">Enforcement Policy</div>
                <p data-m7-mega="" className={`ae-prose text-sm sm:text-base text-white leading-relaxed${module7Mode === 'mega' ? '' : ' hidden'}`}>
                  <span className="text-amber-300 font-semibold">Mandatory Verification:</span> Sunday Mega Arena
                  Contests and the Top 128 Annual World Cup require explicit opt-in verification via Module 7 (
                  <span className="font-mono-tabular">4.5s</span> Gaze Guard + 3-Axis Audio Trap). Local telemetry runs
                  in-browser—no raw camera video ever hits servers.
                </p>
                <p data-m7-daily="" className={`ae-prose text-sm sm:text-base text-white leading-relaxed${module7Mode === 'daily' ? '' : ' hidden'}`}>
                  <span className="text-emerald-400 font-semibold">Optional Client Choice:</span> During Monday–Saturday
                  daily rounds and practice sessions, Module 7 webcam gaze / 3-axis microphone proctoring is{' '}
                  <strong>100% optional</strong>. Solvers can toggle it on solely for Verified HonestyScore
                  calibration.
                </p>
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[155px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.secModule7}
                    alt="Client-side Module 7 Adaptive Gaze Guard and 3-Axis Audio telemetry"
                    loading="lazy"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: MBTS Behavioral Telemetry Clustering */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300">04 · MBTS Clustering</div>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Mathematical Behavioral Telemetry Signatures
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                <span className="text-white font-semibold">MBTS Clustering</span> builds a multidimensional baseline per
                contestant—measuring LaTeX backtrack cadence, scratchpad solve intervals, keystroke entropy, and mouse
                hesitation across clean rounds—flagging sudden synthetic bursts without false-positive bans on fast
                human prodigies.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-cyan-300 font-semibold">Solve Cadence</div>
                  <p className="text-slate-400 mt-1">Compares lemma discovery time against historical solve slopes.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-violet-300 font-semibold">Keystroke Entropy</div>
                  <p className="text-slate-400 mt-1">Detects mechanical transcription vs. exploratory LaTeX editing.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-emerald-300 font-semibold">Cohort Clustering</div>
                  <p className="text-slate-400 mt-1">Spots synchronized wrong-step bursts across colluding rooms.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 media-frame h-80 relative">
              <ResilientImage
                src={MEDIA.secChronoVault}
                alt="MBTS telemetry clustering and ChronoVault integrity analytics"
                loading="lazy"
                accentColor="#00F0FF"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: 11-Flag Blackhole Escalation Ladder */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Progressive Fair-Play Sanctions"
            title="11-Flag &ldquo;Blackhole&rdquo; Escalation Ladder"
            subtitle="Progressive ELO nullification brackets escalate cleanly from minor rating lockouts up to permanent Gmail and hardware/IP blacklisting."
          />
          <div className="ae-bento-grid-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SpotlightCard className="rounded-2xl p-5 space-y-2 border-emerald-400/25">
              <div className="text-xs font-mono-tabular text-emerald-300">Flags 1 &amp; 2 · 1 Plus Contest Lockdown</div>
              <h3 className="font-display font-bold text-white">-5 ELO + 1 Match Nullified</h3>
              <p className="ae-prose text-xs text-slate-300">
                Immediate <span className="text-white font-semibold">-5 ELO</span> deduction plus the next{' '}
                <span className="text-white font-semibold">1</span> positive rated match&apos;s ELO gain nullified to 0.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2 border-amber-400/30">
              <div className="text-xs font-mono-tabular text-amber-300">Flags 3 through 8 · 2 Plus Contest Lockdown</div>
              <h3 className="font-display font-bold text-white">Next 2 Positive Matches Nullified</h3>
              <p className="ae-prose text-xs text-slate-300">
                Next <span className="text-white font-semibold">2</span> positive rated matches&apos; ELO gains are
                nullified to <span className="font-mono-tabular text-amber-300">0 ELO</span>.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2 border-orange-400/35">
              <div className="text-xs font-mono-tabular text-orange-300">
                Flag 9 · 3 Plus Contest Lockdown (Final Warning)
              </div>
              <h3 className="font-display font-bold text-white">Next 3 Matches Nullified + Final Warning</h3>
              <p className="ae-prose text-xs text-slate-300">
                Next <span className="text-white font-semibold">3</span> positive rated matches&apos; ELO gains are
                nullified with an account-wide Final Warning.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2 border-rose-400/35">
              <div className="text-xs font-mono-tabular text-rose-300">Flag 10 · 1-Month Temporary Ban</div>
              <h3 className="font-display font-bold text-white">30-Day Suspension + Hardware Reset</h3>
              <p className="ae-prose text-xs text-slate-300">
                Mandatory <span className="text-white font-semibold">30-day</span> suspension followed by a mandatory
                hardware security reset before match re-entry.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2 border-rose-500/50 md:col-span-2 lg:col-span-2">
              <div className="text-xs font-mono-tabular text-rose-400">Flag 11 · Permanent Gmail &amp; IP/Device Ban</div>
              <h3 className="font-display font-bold text-white">Irreversible Blacklist + 7-Day Appeal Window</h3>
              <p className="ae-prose text-xs text-slate-300">
                Irreversible <span className="text-white font-semibold">permanent Gmail blacklist + IP/hardware ban</span>{' '}
                (retaining <span className="text-cyan-300">7-day</span> restricted access to the{' '}
                <span className="font-mono-tabular text-cyan-300">Subsite #11</span> Forensic Appeal Portal).
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-rose-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
              <ResilientImage
                src={MEDIA.secBlackhole}
                alt="11-Flag Blackhole security escalation deterrence system"
                loading="lazy"
                accentColor="#F43F5E"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-rose-300">Deterministic Escalation &amp; Due Process</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every sanction strike is cryptographically logged inside ChronoVault and reversible exclusively via
                Chief Arbiter review and the 5-minute Live Video Skill Audit.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: 4-Signal Alt / Sockpuppet Neutralization Engine */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Anti-Smurf & Anti-Farming Defense"
            title="4-Signal Alt / Sockpuppet Neutralization Engine"
          />
          <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="text-xs font-mono-tabular text-cyan-300">Signal 01</div>
              <h3 className="font-display font-bold text-white">Hardware &amp; WebGL Fingerprint</h3>
              <p className="text-xs text-slate-400">
                Detects shared GPU/canvas entropy across supposedly independent freshman accounts.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="text-xs font-mono-tabular text-violet-300">Signal 02</div>
              <h3 className="font-display font-bold text-white">Notation Micro-Style</h3>
              <p className="text-xs text-slate-400">
                Identifies idiosyncratic LaTeX macros, variable naming habits, and bracket spacing.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="text-xs font-mono-tabular text-emerald-300">Signal 03</div>
              <h3 className="font-display font-bold text-white">Academy &amp; ISP Co-Location</h3>
              <p className="text-xs text-slate-400">
                Separates legitimate shared school computer labs (via Academy KYB whitelist) from home smurf farms.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="text-xs font-mono-tabular text-amber-300">Signal 04</div>
              <h3 className="font-display font-bold text-white">Rapid Rating Velocity</h3>
              <p className="text-xs text-slate-400">
                Quarantines &ldquo;new initiates&rdquo; solving 2400+ Archon lemmas in &lt;4 minutes during placement
                rounds.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.secAltEngine}
            alt="4-Signal anti-smurf and alt-account neutralization telemetry"
            kicker="Anti-Smurf Defense Grid"
            title="Hardware, Notation, Subnet & Velocity Fusion"
            summary="Cross-correlates WebGL fingerprints, LaTeX macro habits, KYB-whitelisted school labs, and anomaly placement slopes to stop rating manipulation."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 7: 4-Step Forensic Appeal & 5-Min Live Video Skill Audit */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Due Process & Zero-Mistake Reinstatement"
            title="4-Step Forensic Appeal & 5-Min Live Video Skill Audit"
          />
          <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="font-mono-tabular text-xs text-cyan-300">Step 01</div>
              <h3 className="font-display font-bold text-white">Encrypted Appeal Docket</h3>
              <p className="ae-prose text-xs text-slate-300">
                Contenders unlock full SHA-256 ChronoVault timelines, IndexedDB draft proofs, and MBTS flag summaries.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="font-mono-tabular text-xs text-violet-300">Step 02</div>
              <h3 className="font-display font-bold text-white">Chief Arbiter Review</h3>
              <p className="ae-prose text-xs text-slate-300">
                A 750+ Chief Arbiter cross-examines telemetry logs with Supreme Headquarters AI diagnostics.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="font-mono-tabular text-xs text-emerald-300">Step 03</div>
              <h3 className="font-display font-bold text-white">5-Min Live Video Skill Audit</h3>
              <p className="ae-prose text-xs text-slate-300">
                Appellant explains their flagged contest solution verbally while solving a live unseen lemma on
                whiteboard.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="font-mono-tabular text-xs text-amber-300">Step 04</div>
              <h3 className="font-display font-bold text-white">Full Exoneration &amp; Restore</h3>
              <p className="ae-prose text-xs text-slate-300">
                Successful defense purges flags immediately, restores ELO, and issues a verified human-prodigy clearance
                badge.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.secAppeal}
            alt="4-Step Forensic Appeal workflow and 5-minute Live Video Skill Audit"
            kicker="Due Process & Zero-False-Positive Audit"
            title="Encrypted SHA-256 Appeals & 5-Min Live Skill Verification"
            summary="Every appellant inspects full ChronoVault proof logs and presents an unseen whiteboard lemma live before a 750+ Chief Arbiter for instant exoneration."
            accentColor="#10B981"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 8: 14-Point Legal Shield & Security FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Statutory Protection & Bangladesh / Global Compliance"
            title="14-Point Global & Bangladesh Legal Compliance Shield & FAQ"
            subtitle="Designed by Rayaan Tasnim to unify Bangladesh statutory governance, international youth privacy, and global Merchant of Record tax compliance."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs mb-10">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">01. Bangladesh Bank FX &amp; PRC Compliance:</span>{' '}
              Cross-border software/SaaS export inflows strictly channeled for Proceeds Realization Certificate (PRC).
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">02. NBR e-TIN IT/ITES Export Tax Records:</span> Full
              National Board of Revenue (NBR) <code>e-TIN</code> alignment and IT/ITES export documentation.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">03. Zero-NID Data Minimization (BD Cyber Act):</span>{' '}
              Strict consent trails and zero National ID (NID) harvesting under Bangladesh Cyber Security laws.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">04. Merchant of Record VAT (Lemon Squeezy):</span>{' '}
              Automated global VAT/GST collection, invoicing, and remittance via Merchant of Record infrastructure.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">05. Local Jurisdiction in Dhaka, Bangladesh:</span> Terms
              of Service governed under exclusive local dispute jurisdiction in Dhaka, Bangladesh.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">06. COPPA &amp; GDPR-K Youth Privacy:</span> Parental
              consent hooks, zero ad-tracking, and underage telemetry encryption across all student accounts.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">07. EU GDPR Article 17 &amp; 24h PII Scrub:</span> Right to
              Erasure workflows plus 24-hour PII purging by ChronoVault AI &amp; ComplianceGuard AI.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">08. EU Digital Services Act (DSA) Due Process:</span>{' '}
              Transparent flag notices and mandatory 4-Step Forensic Appeals (including 7-day Flag 11 portal access).
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">09. Copyright Act &amp; Zero-Copy Genome:</span> Abstract
              theorem graph distillation + <code>&gt;75%</code> AoPS similarity block guarantees original IP.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">10. Guardian Financial Custodianship:</span> Minor founder
              revenue held under verified parent/guardian fiduciary governance until legal majority.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">11. Zero Gambling / Pay-to-Win Separation:</span>{' '}
              Subscriptions, Arithmo Wallet credits, and Patron donations grant zero ELO or moderation weight.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">12. Closed-Loop Wallet &amp; Academy KYB:</span>{' '}
              Non-withdrawable Arithmo Credits plus KYB checks prevent money-laundering and seat reselling.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-cyan-300 font-semibold">13. Client-Side Biometrics &amp; Optional Module 7:</span>{' '}
              Video/audio frames run locally in-browser and never enter raw DB dumps.
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:col-span-2">
              <span className="text-cyan-300 font-semibold">14. Fair Rejudge &amp; Sealed Quorum Protection:</span>{' '}
              2-min SymPy Global Rejudges protect contenders on flawed problems while suspended &lt;3 quorum sets remain
              permanently sealed.
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
              <ResilientImage
                src={MEDIA.secLegal}
                alt="14-Point Global and Bangladesh statutory legal compliance architecture"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">
                Bangladesh Statutory Governance × EU GDPR-K &amp; DSA
              </div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Engineered so young global mathematicians compete under strict youth privacy, Guardian Financial
                Custodianship, Zero-NID minimization, and verified Merchant of Record tax handling.
              </p>
            </div>
          </div>

          <FaqAccordion items={SECURITY_FAQS} accentClass="text-rose-300" />
        </ScrollReveal>
      </section>
    </>
  );
};
