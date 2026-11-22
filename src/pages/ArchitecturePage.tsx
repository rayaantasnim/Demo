import React, {useState} from 'react';
import {Globe2, Server, Zap} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {
  CyberMediaFrame,
  HeroReveal,
  ResilientImage,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import {PortalExplorer14} from '../components/PortalExplorer14';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {PORTALS_14, factorizeBigInt, isMillerRabinPrime} from '../data/ecosystem';

const ARCH_FAQS = [
  {
    q: 'Why does Arithmo-Edge split into 14 websites instead of 1 monolithic SPA?',
    a: 'Isolating the 5 Core Arenas, Contest Portal, Standings, Personal AI, Academy SaaS, Forge, Socials, Headquarters, and Database into separate micro-frontends ensures zero blast-radius coupling—allowing a high-traffic Sunday Mega round on Subsite #6 to never degrade Subsite #7 Standings or Subsite #9 Academy homework.',
  },
  {
    q: 'Are real-time operations triggered via slow GitHub Actions runners?',
    a: 'No! All live contest ticks, AI inference calls, Wallet credits, and Read-Shield leaderboard updates run in real time over Cloudflare Workers + Firebase Cloud Firestore edge orchestration—eliminating GitHub Actions CI delays completely from live user flows.',
  },
  {
    q: 'Will existing arithmo-edge.github.io links break when the custom .com domain launches in 2 months?',
    a: 'No. Every arithmo-edge.github.io portal stays canonical and synchronized with Arithmo-Core-SDK (engine.js), while our custom .com domain launches alongside full V4.0 production in 2 months.',
  },
];

export const ArchitecturePage: React.FC = () => {
  const [selectedPortalId, setSelectedPortalId] = useState<string>(PORTALS_14[0].id);

  const [mathInput, setMathInput] = useState('1047290013');
  const [mathResult, setMathResult] = useState<{
    statusText: string;
    statusTone: 'emerald' | 'cyan' | 'amber' | 'rose';
    factorsText: string;
    timeText: string;
  }>(() => {
    const val = 1047290013n;
    const t0 = performance.now();
    const isP = isMillerRabinPrime(val);
    const factors = factorizeBigInt(val);
    const ms = Math.max(0.01, performance.now() - t0).toFixed(2);
    return {
      statusText: isP ? 'Verified Prime (Miller-Rabin 7-base)' : 'Composite Integer Verified',
      statusTone: isP ? 'emerald' : 'cyan',
      factorsText: `${val.toString()} = ${factors.map((f) => f.toString()).join(' × ')}`,
      timeText: `Solved deterministically in-browser in ${ms} ms`,
    };
  });

  const runFactorizer = () => {
    const clean = mathInput.trim().replace(/[^0-9]/g, '');
    if (!clean) {
      setMathResult({
        statusText: 'Enter a valid positive integer',
        statusTone: 'rose',
        factorsText: '—',
        timeText: '0.00 ms',
      });
      return;
    }
    if (clean.length > 18) {
      setMathResult({
        statusText: 'Capped at 18 digits for instant UI demo',
        statusTone: 'amber',
        factorsText: 'Shorten integer to <= 18 digits',
        timeText: '0.00 ms',
      });
      return;
    }

    const n = BigInt(clean);
    const t0 = performance.now();
    if (n < 2n) {
      setMathResult({
        statusText: 'Unit / Zero (Neither Prime nor Composite)',
        statusTone: 'amber',
        factorsText: n.toString(),
        timeText: `${(performance.now() - t0).toFixed(2)} ms`,
      });
      return;
    }

    const isP = isMillerRabinPrime(n);
    const factors = factorizeBigInt(n);
    const elapsed = (performance.now() - t0).toFixed(2);
    setMathResult({
      statusText: isP ? 'Verified Prime (Miller-Rabin 7-base)' : 'Composite Integer Verified',
      statusTone: isP ? 'emerald' : 'cyan',
      factorsText: `${n.toString()} = ${factors.map((f) => f.toString()).join(' × ')}`,
      timeText: `Solved deterministically in-browser in ${elapsed} ms`,
    });
  };

  const statusToneClass =
    mathResult.statusTone === 'emerald'
      ? 'text-xs font-semibold text-emerald-400'
      : mathResult.statusTone === 'rose'
        ? 'text-xs font-semibold text-rose-400'
        : mathResult.statusTone === 'amber'
          ? 'text-xs font-semibold text-amber-300'
          : 'text-xs font-semibold text-cyan-300';

  return (
    <>
      {/* Section 1: Federated Micro-Frontend Thesis */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#10B981" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · Federated Micro-Frontend Thesis · arithmo-edge.github.io (Custom .com in 2 Months)
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  14-Website Federated Edge Architecture
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Arithmo-Edge deploys <span className="text-white font-semibold">1 Core Portal + 13 Subsites</span> as
                  isolated micro-frontends on Free Forever GitHub Pages (
                  <code className="font-mono-tabular text-cyan-300">arithmo-edge.github.io/...</code>), coordinated in
                  real time via <span className="text-white font-semibold">Cloudflare Workers + Firebase</span> edge
                  orchestration and <code className="font-mono-tabular text-cyan-300">Arithmo-Core-SDK (engine.js)</code>.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 text-xs text-slate-300 pt-1">
                  <span>Zero GitHub Actions in Live Flow</span>
                  <span aria-hidden="true">·</span>
                  <span>Cloudflare Workers + Firebase</span>
                  <span aria-hidden="true">·</span>
                  <span>98% Read-Shield Cost Reduction</span>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.16} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group">
                  <ResilientImage
                    src={MEDIA.archHero}
                    alt="Federated node lattice representing 14 Arithmo-Edge portals"
                    loading="eager"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs text-cyan-300 font-mono-tabular">github.com/Arithmo-Edge</div>
                    <p className="ae-prose text-sm text-slate-200 mt-1">
                      Each subsite enforces its own domain security boundary while synchronizing Auth, 10 Core ELOs, and
                      Arithmo Wallet state in milliseconds.
                    </p>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive 14-Portal Explorer */}
      <section
        id="portal-explorer"
        className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60"
      >
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Interactive 14-Portal Explorer"
            title="Inspect Every Portal on arithmo-edge.github.io"
            subtitle="Filter across the Core Portal, 5 Mathematical Arenas, Contest Portal, Standings, AI Tutoring, Academies, Forge, Socials, HQ, and Subsite #13 Arithmo Database."
            action={
              <span className="text-xs text-slate-400">
                Subsite #13 (Arithmo Database) launches after Subsites #1–#12
              </span>
            }
          />
        </ScrollReveal>

        <PortalExplorer14
          selectedPortalId={selectedPortalId}
          onSelectPortalId={(id) => setSelectedPortalId(id)}
        />

        <div className="mt-8">
          <SpotlightCard className="rounded-2xl overflow-hidden group">
            <div className="grid md:grid-cols-12 items-stretch">
              <div className="md:col-span-4 min-h-[190px] media-frame">
                <ResilientImage
                  src={MEDIA.archDataLake}
                  alt="Arithmo Database world Olympiad archives and cold storage lake"
                  loading="lazy"
                  accentColor="#10B981"
                />
              </div>
              <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono-tabular text-emerald-400">
                    13 · Post-Launch Global Knowledge Archive · arithmo-edge.github.io/arithmo-database/
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    Subsite #13: Arithmo Database &amp; Editorials
                  </h3>
                  <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                    Catalogs concluded Arithmo rounds across the 5 arenas (never leaking suspended &lt;3 quorum sets)
                    alongside <span className="text-white font-medium">IMO, Putnam, RMM, BMO, and BdMO</span>—with
                    AI-Generated Step-by-Step Editorials.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="arch-jump-db"
                    type="button"
                    onClick={() => {
                      setSelectedPortalId('database');
                      document.getElementById('portal-explorer')?.scrollIntoView({behavior: 'smooth', block: 'start'});
                    }}
                    className="btn-glass px-4 py-2 text-xs whitespace-nowrap"
                  >
                    Inspect Subsite #13 in Explorer &uarr;
                  </button>
                  <a href="roadmap.html" className="text-xs text-emerald-300 hover:underline whitespace-nowrap">
                    Read Rollout Timeline &rarr;
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Section 3: Zero GitHub Actions Real-Time Cloudflare Workers + Firebase Edge Orchestration */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Zero GitHub Actions Live Runtime"
            title="Real-Time Cloudflare Workers + Firebase Edge Orchestration"
            subtitle="Static GitHub Pages serves only immutable UI bundles. Every live contest clock, ELO calculation, Shadow Bot step, Wallet lock, and Golden Vault fetch executes instantaneously at the edge."
          />

          <div className="grid md:grid-cols-3 gap-5">
            <SpotlightCard className="rounded-2xl p-6 space-y-2.5 border-cyan-400/30">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-300">
                <Zap className="w-4 h-4" />
                <span>Sub-50ms Edge Workers</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">Instant Contest &amp; Bot Dispatch</h3>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cloudflare Workers handle live queue matching (60s Ranked Pool, 5m Rival Links), Read-Only Golden Vault
                fetching, and Gemini/Qwen-Math API routing without spinning cold CI runners.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2.5 border-violet-400/30">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-violet-300">
                <Server className="w-4 h-4" />
                <span>Firebase Real-Time Ledger</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">Atomic Firestore Transactions</h3>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Closed-loop Wallet balances, 60-second order grace holds, Gmail SSO sessions, and live 14-board rating
                deltas execute inside strict Firestore security rules.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2.5 border-emerald-400/30">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-300">
                <Globe2 className="w-4 h-4" />
                <span>Custom .com in 2 Months</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">Dual GitHub Pages + .com Topology</h3>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Current public showcase runs seamlessly at{' '}
                <code className="font-mono-tabular text-cyan-300">arithmo-edge.github.io</code> while our dedicated{' '}
                <code className="font-mono-tabular text-emerald-300">.com</code> custom domain joins production in 2
                months.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[180px] relative media-frame">
              <ResilientImage
                src={MEDIA.archCloudflare}
                alt="Cloudflare Workers global edge proxy routing zero-latency contests"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-transparent" />
              <div className="absolute bottom-3.5 left-4 right-4 text-xs font-mono-tabular text-cyan-300">
                Cloudflare Workers Edge Routing · Zero Cold CI Delays
              </div>
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-2">
              <div className="text-xs font-mono-tabular text-cyan-300">Edge Security Proxy Architecture</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                GitHub Actions never touches live match ticks, rating adjustments, or AI prompts. Cloudflare Edge
                Workers validate tokens serverlessly before querying Firebase Cloud Firestore or encrypted Golden Vault
                repositories.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Centralized Arithmo-Core-SDK Sync */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs text-cyan-300 font-medium">04 · Centralized SDK Backbone</p>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Arithmo-Core-SDK (engine.js) Cross-Portal Sync
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                Every subsite imports the shared <code className="font-mono-tabular text-cyan-300">engine.js</code>{' '}
                runtime from <code className="font-mono-tabular">github.com/Arithmo-Edge/Arithmo-Core-SDK</code>. This
                guarantees unified Firebase Auth session hydration, synchronized 10 Core ELO telemetry, closed-loop
                Arithmo Wallet deduction checks, and instantaneous QPRT-4 contest lockouts without duplicating business
                logic across 14 repositories.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono-tabular text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="text-cyan-400">Arithmo-Core-SDK (engine.js) Federated Handshake</div>
                <pre className="leading-relaxed">{`1. Hydrate Gmail SSO Session & @handle Claim (Firebase Auth)
2. Resolve Dual-Handle Context (Personal vs Academy @handle)
3. Sync 10 Core Arena ELOs + HQ ELO + Contribution ELO
4. Enforce Full-Screen Lockdown & Hard-Lock on Subsite #8/#9
5. Dispatch AES-256 Telemetry & IndexedDB Offline Checkpoints`}</pre>
              </div>
              <div className="rounded-2xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[210px] w-full relative media-frame">
                <ResilientImage
                  src={MEDIA.archMobile}
                  alt="Responsive multi-device SDK synchronization across mobile and desktop portals"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-xs font-mono-tabular text-cyan-300">
                  Unified engine.js Across All 7 Device Breakpoints
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Dual-Storage Hybrid Data Lake */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Dual-Storage Hybrid Data Lake"
            title="Hot Cloud Firestore + Cold 24-Hour Private GitHub Zero-PII JSONL Lake"
          />
          <div className="ae-deep-grid grid lg:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="text-xs font-mono-tabular text-cyan-300">Hot Storage Layer · Real-Time State</div>
              <h3 className="font-display text-xl font-bold text-white">Unified Cloud Firestore</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Handles sub-second live match scores, 14 real-time leaderboards, active{' '}
                <code className="font-mono-tabular text-cyan-300">1v1 Bullet Blitz</code> rooms,{' '}
                <code className="font-mono-tabular text-cyan-300">Arithmo Wallet</code> ledger transactions,{' '}
                <code className="font-mono-tabular text-cyan-300">donors</code> Patron Wall webhooks, and live
                clarifications during active 100-minute contests.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="text-xs font-mono-tabular text-emerald-300">
                Cold Storage Layer · 24h Zero-PII Nightly Compaction
              </div>
              <h3 className="font-display text-xl font-bold text-white">Private Zero-PII JSONL Data Lake</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Every 24 hours, automated background pipelines strip all PII (emails, legal names, IPs), flush
                concluded submissions, <code className="font-mono-tabular text-emerald-300">MBTS</code> telemetry, and{' '}
                <code className="font-mono-tabular text-emerald-300">Find the Flaw</code> traces into compressed{' '}
                <code className="font-mono-tabular">.jsonl</code> shards—keeping hot Firestore lean while calibrating AI
                difficulty curves.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.archHotCold}
              alt="Hot Cloud Firestore state coupled with nightly cold Zero-PII JSONL GitHub archival"
              kicker="Automated 24h PII Scrubbing Pipeline"
              title="Sub-Millisecond Hot Reads Meets Immutable Cold Archival"
              summary="All PII leaves the analytics path before nightly shards compact into GitHub cold storage, keeping Firestore billing lean at any student volume."
              accentColor="#10B981"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Zero-Cost Caching & Read-Shield Engineering */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Zero-Cost Edge Defense"
            title="Caching & Read-Shield Engineering"
          />
          <div className="ae-bento-grid ae-bento-grid-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="text-xs font-mono-tabular text-cyan-300">Cloudflare Worker Edge Proxy</div>
              <h3 className="font-display text-lg font-bold text-white">Token &amp; PAT Isolation</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Proxies read-only Golden Vault <code className="font-mono-tabular">.json</code> problem sets and
                Gemini/Qwen-Math API dispatches without exposing credentials on static GitHub Pages clients.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="text-xs font-mono-tabular text-violet-300">Read-Shield Snapshot Pattern</div>
              <h3 className="font-display text-lg font-bold text-white">98% Firestore Read Reduction</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Public standings and archive indexes compile into static JSON snapshots served at the edge, shielding
                Firestore quotas from traffic spikes.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="text-xs font-mono-tabular text-emerald-300">Stale-While-Revalidate</div>
              <h3 className="font-display text-lg font-bold text-white">Deterministic Local Cache</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Contest statements, LaTeX templates, and guidebook chapters cache cleanly in browser storage for instant
                resume across flaky connections.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[175px] relative media-frame">
              <ResilientImage
                src={MEDIA.archPwa}
                alt="PWA offline IndexedDB resilience and static edge snapshot caching"
                loading="lazy"
                accentColor="#10B981"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-emerald-300">IndexedDB + Read-Shield Snapshot Layer</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Even if a rural competitor loses broadband mid-contest, IndexedDB keystroke persistence and stale-while-revalidate
                PWA caches keep every proof draft intact until ChronoVault reconnects.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Client-Side Deterministic Math Engine (Interactive) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-400/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-cyan-300 font-medium">07 · Client-Side Deterministic Math Engine</p>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  Live Browser Execution: Miller-Rabin + Brent-Pollard&apos;s Rho
                </h2>
              </div>
              <span className="font-mono-tabular text-xs text-slate-400">
                Zero Server Latency · Web Audio API · IndexedDB Vault
              </span>
            </div>

            <p className="ae-prose text-sm text-slate-300 leading-relaxed prose-measure">
              Numerical validation, primality screening, and factor verification run deterministically inside the
              contestant&apos;s browser using <span className="text-white font-medium">BigInt Miller-Rabin</span> and{' '}
              <span className="text-white font-medium">Brent-Pollard&apos;s Rho</span>, paired with{' '}
              <span className="text-white font-medium">Web Audio API</span> timer cues and{' '}
              <span className="text-white font-medium">IndexedDB</span> offline persistence.
            </p>

            <div className="grid md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5">
                <label htmlFor="det-math-input" className="text-xs text-slate-400 block mb-1.5">
                  Enter Integer (&le; 18 digits) to Test Live:
                </label>
                <input
                  id="det-math-input"
                  type="text"
                  value={mathInput}
                  onChange={(e) => setMathInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') runFactorizer();
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 font-mono-tabular text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <button id="det-math-run" type="button" onClick={runFactorizer} className="btn-cyber w-full py-3 px-4 text-sm">
                  Factorize in Browser
                </button>
              </div>
              <div className="md:col-span-4 p-3.5 rounded-xl bg-slate-950/85 border border-slate-800">
                <div id="det-math-prime" className={statusToneClass}>{mathResult.statusText}</div>
                <div id="det-math-factors" className="font-mono-tabular text-sm text-white mt-0.5 break-all">{mathResult.factorsText}</div>
                <div id="det-math-time" className="font-mono-tabular text-[11px] text-slate-400 mt-0.5">{mathResult.timeText}</div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden grid md:grid-cols-12 items-stretch bg-slate-950/60">
              <div className="md:col-span-4 aspect-[16/10] md:aspect-auto min-h-[150px] relative media-frame">
                <ResilientImage
                  src={MEDIA.archBigInt}
                  alt="In-browser deterministic BigInt Miller-Rabin primality code execution"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
              </div>
              <div className="md:col-span-8 p-5 flex flex-col justify-center space-y-1">
                <div className="text-xs font-mono-tabular text-cyan-300">Deterministic Zero-Round-Trip Computation</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike legacy servers that choke under simultaneous prime checks, BigInt Miller-Rabin (7-base) and
                  Brent-Pollard&apos;s Rho verify numeric invariants directly inside the contestant&apos;s browser tab.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Open-Source Repositories & Architecture FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Core Repositories & Infrastructure FAQ"
            title="github.com/Arithmo-Edge & Architecture Q&A"
          />
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
              <SpotlightCard
                asAnchorHref="https://github.com/Arithmo-Edge"
                className="rounded-2xl p-5 space-y-2 h-full"
              >
                <div className="font-mono-tabular text-xs text-cyan-400">BluePrint</div>
                <h3 className="font-display text-base font-bold text-white">Architecture Spec</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  QPRT-4 mathematical proofs, 14-portal contracts, and governance constitutions.
                </p>
              </SpotlightCard>
              <SpotlightCard
                asAnchorHref="https://github.com/Arithmo-Edge"
                className="rounded-2xl p-5 space-y-2 h-full"
              >
                <div className="font-mono-tabular text-xs text-violet-400">JSON-Converter</div>
                <h3 className="font-display text-base font-bold text-white">Schema v1.2 Studio</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  LaTeX-to-JSON validator powering the Co-Founders&apos; 5×4 Golden Vault.
                </p>
              </SpotlightCard>
              <SpotlightCard
                asAnchorHref="https://github.com/Arithmo-Edge"
                className="rounded-2xl p-5 space-y-2 h-full"
              >
                <div className="font-mono-tabular text-xs text-emerald-400">Arithmo-Core-SDK</div>
                <h3 className="font-display text-base font-bold text-white">engine.js Runtime</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  Synchronizes Auth, Dual-Handles, Wallet ledger, and 10 Core Arena ELOs.
                </p>
              </SpotlightCard>
            </div>
            <div className="lg:col-span-5">
              <FaqAccordion items={ARCH_FAQS} />
            </div>
          </div>
          <div className="mt-8">
            <CyberMediaFrame
              src={MEDIA.archRepos}
              alt="Open-source Arithmo-Edge repositories including BluePrint, JSON-Converter, and Arithmo-Core-SDK"
              kicker="Transparent Open Architecture"
              title="Auditable SDKs & Schema Contracts on GitHub"
              summary="Verify our public mathematical specifications, Schema v1.2 studio converters, and client-side BigInt primitives directly inside github.com/Arithmo-Edge."
              accentColor="#00F0FF"
              reverse
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
