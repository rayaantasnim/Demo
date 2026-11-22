import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Database,
  Globe2,
  Layers,
  Lock,
  Smartphone,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {
  DECIMAL_ROLLOUT_SERIES,
  GENESIS_EARLY_BIRD_PERKS,
  RolloutSeriesId,
} from '../data/ecosystem';

interface FlagshipMilestone {
  id: string;
  version: string;
  title: string;
  summary: string;
  specs: string[];
  accentClass: string;
}

const V10_MILESTONES: FlagshipMilestone[] = [
  {
    id: 'v10-0',
    version: 'V10.0',
    title: 'Standalone AI Portals, TokenMeter & Academy Enterprise',
    summary:
      'Isolates Subsite #8 (Arithmo Personal AI) and Subsite #9 (Arithmo Guild AI) alongside Academy Enterprise SaaS and Dynamic Semantic Token Metering.',
    specs: [
      'In-Chat Dual-Model Selector: Gemini (1x General) vs Qwen-Math-72B + SymPy Hybrid (2x Premium)',
      'Subsite #9 Guild AI Team Collaboration & Cohort Batch Radar',
      'Zero-PII Cold Storage JSONL export for clean ethical reasoning training',
    ],
    accentClass: 'text-cyan-300',
  },
  {
    id: 'v10-1',
    version: 'V10.1',
    title: 'Top 128 Annual World Cup (Rotating Golden Crown)',
    summary:
      'Invites the top 128 global competitors by Overall All-Rounder ELO into a 6-round Progressive Half-Elimination Bracket (128 → 64 → 32 → 16 → 8 → 4 → Champion).',
    specs: [
      'Round-by-round high-stakes Olympiad duel bracket streamed cleanly via Arithmo Standings',
      'Permanent rotating Golden Crown honor on the defending Champion’s global @handle',
      'Zero entry fee — 100% merit-seeded from public Free Forever rated arenas',
    ],
    accentClass: 'text-amber-300',
  },
  {
    id: 'v10-2',
    version: 'V10.2',
    title: '14-Portal Offline Installable PWA + T-15m Push Alerts',
    summary:
      'Upgrades every GitHub Pages micro-frontend into an installable Offline-First Progressive Web App backed by Service Workers & IndexedDB.',
    specs: [
      'Survives mid-contest ISP blackouts cleanly via local QPRT-4 ChronoVault state serialization',
      'Automatic T-15 minute countdown push alerts before Daily Rated & Sunday Mega bells',
      'Mobile-tuned Touch Numpad in General Mode & responsive KaTeX Workspace across 7 breakpoints',
    ],
    accentClass: 'text-emerald-300',
  },
  {
    id: 'v10-3',
    version: 'V10.3',
    title: 'AI Smart Mistake Deck (7-Day Spaced Repetition Engine)',
    summary:
      'Automatically converts every missed contest problem and weak hidden Olympiad tag into a 7-day spaced-repetition mastery deck.',
    specs: [
      'Targets exact weak sub-skills (e.g., LTE valuations, Cauchy-Schwarz equality cases, directed angles)',
      'Auto-syncs missed Shadow Bot Gauntlet and Sunday Mega problems post-embargo',
      'Unlocked inside Pro & Singularity personal plans and Academy Enterprise cohorts',
    ],
    accentClass: 'text-violet-300',
  },
];

interface SpinOffCompany {
  num: string;
  name: string;
  vertical: string;
  trigger: string;
  revenueModel: string;
  synergy: string;
  borderClass: string;
  textClass: string;
}

const SPIN_OFF_COMPANIES: SpinOffCompany[] = [
  {
    num: 'Spin-Off 01',
    name: 'AI Reasoning Data & Foundation Model Lab',
    vertical: 'Synthetic & Human Olympiad Corpus',
    trigger: '250k+ verified SymPy & proof-checked Zero-PII Cold Storage JSONL trajectories',
    revenueModel: 'Enterprise dataset licensing + negative RLHF theorem-proving evaluation suites',
    synergy: 'Powered directly by anonymized Cold Lake pipelines without ever touching user PII.',
    borderClass: 'border-cyan-400/35',
    textClass: 'text-cyan-300',
  },
  {
    num: 'Spin-Off 02',
    name: 'Zero-Cheat Exam Proctoring SaaS',
    vertical: 'B2B Browser Integrity API (Module 7)',
    trigger: '1M+ clean QPRT-4 & optional webcam/audio contest sessions benchmarked',
    revenueModel: 'Per-examinee SaaS seat licensing for national Olympiads & STEM admissions tests',
    synergy: 'Commercializes Adaptive Gaze Guard, 3-Axis Audio Trap & Full-Screen Lockdown externally.',
    borderClass: 'border-violet-400/35',
    textClass: 'text-violet-300',
  },
  {
    num: 'Spin-Off 03',
    name: 'Global Quant & Tech Talent Recruitment Network',
    vertical: 'Verified High-ELO Hiring Bridge',
    trigger: '5,000+ Archon/Vanguard/Singularity-rated solvers (2400–3000+ ELO)',
    revenueModel: '$20k–$50k placement fee per verified quantitative or algorithmic engineering hire',
    synergy: 'Replaces unverified resume screening with tamper-proof 6-hour Find-the-Flaw audited ratings.',
    borderClass: 'border-emerald-400/35',
    textClass: 'text-emerald-300',
  },
  {
    num: 'Spin-Off 04',
    name: 'Automated Formal Math & Code Verification Engine',
    vertical: 'AxiomCheck + SymPy Audit Cloud',
    trigger: '99.9% deterministic grading parity across 5 Core Arenas',
    revenueModel: 'R&D lab verification API for cryptographic algorithms & quantitative proofs',
    synergy: 'Extends Arithmo-Edge’s SymPyVeritas and AxiomCheck agents to external enterprise proofs.',
    borderClass: 'border-amber-400/35',
    textClass: 'text-amber-300',
  },
  {
    num: 'Spin-Off 05',
    name: 'Global Institutional LMS & Accredited Digital University',
    vertical: 'Academy Arena White-Label Network',
    trigger: '1,000+ onboarded KYB schools and coaching academies worldwide',
    revenueModel: 'Institutional multi-tier SaaS ($19.99–$79.99 base + per-seat) + QR ELO transcripts',
    synergy: 'Scales Subsite #9 Batch Radar, Dual-Handle accounts, and 5-Layer Anti-Reselling globally.',
    borderClass: 'border-rose-400/35',
    textClass: 'text-rose-300',
  },
  {
    num: 'Spin-Off 06',
    name: 'Competitive Math E-Sports & Live Broadcasting',
    vertical: 'Top 128 World Cup & Bullet Blitz Media',
    trigger: 'Annual World Cup crown viewer milestones across regional hubs',
    revenueModel: 'Global broadcast sponsorships, tournament merchandising & collegiate league rights',
    synergy: 'Turns Subsite #5 Mixed Olympiad & 1v1 Bullet Blitz into a spectator intellectual sport.',
    borderClass: 'border-cyan-400/35',
    textClass: 'text-cyan-300',
  },
  {
    num: 'Spin-Off 07',
    name: 'Decentralized Research & Academic Publishing Network',
    vertical: 'Arithmo Socials + Guidebooks',
    trigger: 'Peer-reviewed 2000+ Sentinel/Archon monographs across Blog-to-Lab',
    revenueModel: 'Print-on-demand Olympiad compendiums & open institutional journal indexing',
    synergy: 'Bridges Subsite #11 KaTeX community blogs directly into Subsite #13 Arithmo Database.',
    borderClass: 'border-violet-400/35',
    textClass: 'text-violet-300',
  },
  {
    num: 'Spin-Off 08',
    name: 'Cognitive Analytics & Neuro-Learning Health-Tech API',
    vertical: 'V10.3 Spaced Repetition Telemetry',
    trigger: 'Multi-year endurance curves across timed Olympiad & Smart Mistake Deck training',
    revenueModel: 'EdTech cognitive pacing API & research partnerships on mathematical mastery retention',
    synergy: 'Transforms Smart Mistake Deck cadence insights into adaptive learning diagnostics.',
    borderClass: 'border-emerald-400/35',
    textClass: 'text-emerald-300',
  },
];

const ROADMAP_FAQS = [
  {
    q: 'When does the custom .com domain launch relative to arithmo-edge.github.io?',
    a: 'Our custom .com domain launches alongside the full production ecosystem in 2 months. All arithmo-edge.github.io/Introductory-Landing-Page/ and 14 portal endpoints remain intact and synchronized via Arithmo-Core-SDK.',
  },
  {
    q: 'What happens to question sets if an official contest has fewer than 3 registered competitors?',
    a: 'If a round falls below the minimum 3-competitor quorum, the round is safely suspended with zero ELO or streak loss, and those unplayed question sets are NEVER leaked to Arithmo Database (Subsite #13) or Virtual Gym—they stay sealed for future contests.',
  },
  {
    q: 'How does Arithmo-Edge maintain ~$160–$680/mo Year-1 profitability without burning VC capital?',
    a: 'By serving static frontends across Free Forever GitHub Pages, cutting Firestore costs by 98% via Read-Shield snapshots, running BigInt primality and factorization client-side, and metering AI queries dynamically with TokenMeter.',
  },
  {
    q: 'How do the 8 spin-off companies relate to free competitor access?',
    a: 'Competitive access across the 5 Core Arenas, Daily contests, Sunday Mega, and World Cup qualifiers stays 100% Free Forever. Enterprise spin-offs monetize institutional LMS tooling, zero-cheat proctoring SaaS, verified recruitment, and ethical research datasets.',
  },
];

export const RoadmapPage: React.FC = () => {
  const [seriesFilter, setSeriesFilter] = useState<RolloutSeriesId>('all');
  const [pinnedStepCode, setPinnedStepCode] = useState<string>('V1.0');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(V10_MILESTONES[0].id);
  const [horizonView, setHorizonView] = useState<'year1' | 'year20'>('year1');
  const [selectedSpinOffNum, setSelectedSpinOffNum] = useState<string>(SPIN_OFF_COMPANIES[0].num);

  const visibleSeries =
    seriesFilter === 'all'
      ? DECIMAL_ROLLOUT_SERIES
      : DECIMAL_ROLLOUT_SERIES.filter((s) => s.id === seriesFilter);
  const activeMilestone = V10_MILESTONES.find((m) => m.id === selectedMilestoneId) || V10_MILESTONES[0];
  const activeSpinOff = SPIN_OFF_COMPANIES.find((s) => s.num === selectedSpinOffNum) || SPIN_OFF_COMPANIES[0];

  return (
    <>
      {/* Section 1: Version Evolution Hero & Interactive Horizon Overview */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#F59E0B" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-10">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · V1.0–V4.0 Decimal Release + V10.0–V11.0+ &amp; 20-Year Strategy · Custom .com in 2 Months
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Evolution Roadmap &amp; 8 Spin-Off Companies
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Trace Arithmo-Edge&apos;s journey from <span className="font-mono-tabular text-cyan-300">Prime-Factor.app</span>{' '}
                  and <span className="font-mono-tabular text-cyan-300">V1.0–V4.0</span> Decimal Rollout waves through
                  our <span className="text-white font-semibold">V10.0–V10.3</span> breakthroughs, the{' '}
                  <span className="text-white font-semibold">December 31, 2026 Midnight</span> Global Launch, custom{' '}
                  <code className="font-mono-tabular text-cyan-300">.com</code> activation in 2 months,{' '}
                  <span className="font-mono-tabular text-cyan-300">V11.0+ Arithmo Database</span>, and Olympiad Edge&apos;s
                  8 spin-off verticals.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3">
                  <a href="#decimal-rollout" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    Explore V1.0–V4.0 Rollout
                  </a>
                  <a href="#spinoffs" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    Inspect 8 Spin-Off Verticals
                  </a>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.roadHero}
                    alt="Mathematical archives and Olympiad Edge horizon"
                    loading="eager"
                    accentColor="#F59E0B"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">
                      V3.2 → V11.0+ → 20-Year Holding Horizon
                    </div>
                    <div className="font-display text-lg font-bold text-white">
                      Olympiad Edge Alphabet-Style Holding Structure
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <HeroReveal delay={0.24}>
            <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-slate-700/70">
                <div className="text-xs font-mono-tabular text-slate-400">V3.2 – V6.0 · Foundation</div>
                <h3 className="font-display font-bold text-white">Single-Repo Prototype</h3>
                <p className="text-xs text-slate-300">
                  Initial KaTeX contest client, Prime-Factor.app tools, and earliest Number Theory ELO curves.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-violet-400/35">
                <div className="text-xs font-mono-tabular text-violet-300">V7.0 – V9.5 · Split &amp; AI</div>
                <h3 className="font-display font-bold text-white">14-Portal Federation</h3>
                <p className="text-xs text-slate-300">
                  Migrated arenas into 14 isolated GitHub Pages sites linked via Arithmo-Core-SDK and 42 AI engines.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-cyan-400/45">
                <div className="text-xs font-mono-tabular text-cyan-300">V10.0 – V10.3 · Launch Era</div>
                <h3 className="font-display font-bold text-white">QPRT-4 &amp; Global Launch</h3>
                <p className="text-xs text-slate-300">
                  ChronoVault resilience, Module 7 toggle, Zero-Copy Genome, and custom .com launch in 2 months.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-amber-400/45">
                <div className="text-xs font-mono-tabular text-amber-300">V11.0+ · Post-Launch</div>
                <h3 className="font-display font-bold text-white">Arithmo Database &amp; API</h3>
                <p className="text-xs text-slate-300">
                  Permanent indexed repository of IMO/Putnam/RMM/BMO/BdMO sets, SymPy proofs &amp; AI editorials.
                </p>
              </SpotlightCard>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Section 2: Decimal Release Rollout Timeline (V1.0 – V4.0 Grand Singularity) */}
      <section
        id="decimal-rollout"
        className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60"
      >
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Canonical 26-Day Launch Sequence · Dec 6 – Dec 31, 2026"
            title="Decimal Release Rollout Timeline (V1.0 – V4.0 Grand Singularity)"
            subtitle="Filter across Phase 0 Core Build through Series 4 Grand Singularity to inspect every canonical milestone from Arithmo-Core-SDK and the 5 Core Arenas to the Dec 31, 2026 Midnight World Cup and 14th Portal unlock."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-8">
            {/* Interactive Series Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div
                role="tablist"
                aria-label="Filter Decimal Release Rollout Series"
                className="flex flex-wrap gap-2"
              >
                {(
                  [
                    {id: 'all', label: 'All Series'},
                    {id: 'phase-0', label: 'Phase 0: Core Build'},
                    {id: 'series-1', label: 'Series 1: V1.0–V1.3'},
                    {id: 'series-2', label: 'Series 2: V2.0–V2.3'},
                    {id: 'series-3', label: 'Series 3: V3.0–V3.3'},
                    {id: 'series-4', label: 'Series 4: V4.0 Grand Singularity'},
                  ] as const
                ).map((tab) => {
                  const isActive = seriesFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      data-series-filter={tab.id}
                      onClick={() => {
                        setSeriesFilter(tab.id);
                        if (tab.id !== 'all') {
                          const targetSeries = DECIMAL_ROLLOUT_SERIES.find((s) => s.id === tab.id);
                          if (targetSeries?.steps[0]) {
                            setPinnedStepCode(targetSeries.steps[0].code);
                          }
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap shrink-0 transition-all ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-semibold'
                          : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-mono-tabular text-slate-400 flex items-center gap-2 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <span data-milestone-count="">
                  Showing {visibleSeries.reduce((acc, s) => acc + s.steps.length, 0)} Canonical Milestones
                </span>
              </div>
            </div>

            {/* Filtered Series Blocks */}
            <div className="space-y-8">
              {DECIMAL_ROLLOUT_SERIES.map((series) => {
                const isSingleStep = series.steps.length === 1;
                const isSeriesHidden = seriesFilter !== 'all' && series.id !== seriesFilter;
                return (
                  <div
                    key={series.id}
                    data-series-block={series.id}
                    data-step-count={series.steps.length}
                    className={`rounded-2xl border border-slate-800/90 bg-slate-950/65 p-5 sm:p-6 space-y-5${
                      isSeriesHidden ? ' hidden' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
                          <span className="font-bold" style={{color: series.accentColor}}>
                            {series.badge}
                          </span>
                          <span className="text-slate-500" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-slate-300">{series.dateRange}</span>
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">{series.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-400">{series.tagline}</p>
                      </div>
                      <span className="font-mono-tabular text-xs text-slate-400 shrink-0">
                        {series.steps.length === 1 ? '1 Major Gate' : `${series.steps.length} Decimal Releases`}
                      </span>
                    </div>

                    <div className={`grid gap-4 ${isSingleStep ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                      {series.steps.map((step) => {
                        const isPinned = pinnedStepCode === step.code;
                        return (
                          <button
                            key={step.code}
                            type="button"
                            data-step-card={step.code}
                            onClick={() => setPinnedStepCode(step.code)}
                            className={`text-left spotlight-card rounded-2xl border p-5 space-y-3 transition-all ${
                              isPinned
                                ? 'border-cyan-400/70 bg-slate-900/90'
                                : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                              <span className="font-bold" style={{color: step.accentColor}}>
                                {step.code}
                              </span>
                              <span className="text-slate-400">{step.date}</span>
                            </div>

                            <h4 className="font-display text-base sm:text-lg font-bold text-white">{step.title}</h4>

                            <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {step.summary}
                            </p>

                            <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                              {step.highlights.map((hl) => (
                                <li key={hl} className="flex items-start gap-2">
                                  <CheckCircle2
                                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                    style={{color: step.accentColor}}
                                  />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[185px] relative media-frame">
                <ResilientImage
                  src={MEDIA.roadTimeline}
                  alt="Decimal Rollout Timeline from Core Build to V4.0 Grand Singularity"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-mono-tabular text-cyan-300">
                  Phase 0 (Dec 6–15) &rarr; Grand Singularity (Dec 31 Midnight)
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[185px] relative media-frame">
                <ResilientImage
                  src={MEDIA.roadV1V3}
                  alt="Series 1 to Series 3 progressive rollout across Arenas, AI, and Academy SaaS"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-mono-tabular text-amber-300">
                  Series 1–3 Decimal Milestones · V1.0 – V3.3
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: V10.0–V10.3 Flagship Architectural Milestones */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Release Engineering Deep-Dive"
            title="V10.0–V10.3 Flagship Architectural Milestones"
            subtitle="Inspect the four foundational system leaps powering Personal AI, World Cup brackets, Offline PWA resilience, and 7-day spaced repetition."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 space-y-2.5">
              {V10_MILESTONES.map((item) => {
                const active = item.id === selectedMilestoneId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-v10-btn={item.id}
                    onClick={() => setSelectedMilestoneId(item.id)}
                    className={`w-full text-left rounded-xl border p-4 transition-colors flex items-center justify-between gap-3 ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-display text-sm font-bold text-white">{item.title}</span>
                    <span className={`font-mono-tabular text-xs shrink-0 ${item.accentClass}`}>{item.version}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              {V10_MILESTONES.map((m) => (
                <div
                  key={m.id}
                  data-v10-panel={m.id}
                  className={`space-y-4${m.id === selectedMilestoneId ? '' : ' hidden'}`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className={m.accentClass}>{m.version} Specification</span>
                    <span className="text-slate-400">Zero-Copy Edge Ready</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{m.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{m.summary}</p>
                  <div className="space-y-2.5 pt-2">
                    {m.specs.map((spec) => (
                      <div
                        key={spec}
                        className="rounded-xl border border-slate-800 bg-slate-950/75 p-3.5 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                      >
                        {m.id === 'v10-1' ? (
                          <Trophy className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        ) : m.id === 'v10-2' ? (
                          <Smartphone className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                        )}
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.roadPwa}
                alt="14-Portal Offline Installable PWA and V10.3 Smart Mistake Deck"
                loading="lazy"
                accentColor="#10B981"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-emerald-300">V10.2 Offline PWA + V10.3 Mistake Deck</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Installable Service Workers keep IndexedDB contest scratchpads responsive during rural blackouts, while
                post-contest Mistake Decks convert missed tags into targeted 7-day flashcards.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Subsite #13 Arithmo Database & Sealed Quorum Protection */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300">
                04 · Subsite #13 · arithmo-edge.github.io/arithmo-database/
              </div>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Arithmo Database (14th Portal · Post Subsites #1–#12)
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                Launching as our 14th federated portal right after Subsites #1–#12 go live,{' '}
                <span className="text-white font-semibold">Arithmo Database</span> indexes{' '}
                <span className="text-white font-semibold">all completed past Arithmo-Edge contests</span> across the 5
                Core Arenas alongside international &amp; national Olympiad archives (
                <span className="font-mono-tabular text-cyan-300">IMO, Putnam, RMM, BMO, BdMO</span>) and{' '}
                <span className="text-white font-semibold">AI-Generated Step-by-Step Editorials</span>.
              </p>
              <div className="rounded-xl border border-amber-400/35 bg-amber-400/10 p-4 text-xs sm:text-sm text-amber-100 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>
                  <strong>Suspended &lt;3 Quorum Protection:</strong> Rounds suspended due to fewer than 3 registered
                  competitors are <strong>NEVER leaked</strong> to Arithmo Database or Virtual Gym—their unused problems
                  remain cryptographically sealed for future official rounds.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 space-y-4 border-cyan-400/30">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-300">
                <Database className="w-4 h-4" />
                <span>Structured Corpus &amp; Editorial Deliverables</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1">
                  <div className="text-white font-semibold">5-Arena Contest Archive</div>
                  <p className="text-slate-400">Complete post-embargo rounds categorized by General &amp; Expert tracks.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1">
                  <div className="text-white font-semibold">IMO · Putnam · BdMO Corpus</div>
                  <p className="text-slate-400">Historic national &amp; global Olympiad sets with post-round topic tags.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1">
                  <div className="text-white font-semibold">AI Step-by-Step Editorials</div>
                  <p className="text-slate-400">SymPy-verified walkthroughs attached to every released database item.</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-1">
                  <div className="text-white font-semibold">Un-Leaked Sealed Vault</div>
                  <p className="text-slate-400">Zero accidental exposure of suspended &lt;3 competitor rounds.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[160px] w-full relative media-frame">
                <ResilientImage
                  src={MEDIA.roadDatabase}
                  alt="Subsite #13 Arithmo Database indexed Olympiad archives and SymPy editorials"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Interactive Year-1 Bootstrapped vs. 20-Year Holding Horizon */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Disciplined Execution Horizon"
            title="Year-1 Bootstrapped Economics vs. 20-Year Holding Group"
            subtitle="Switch between Year-1 zero-burn unit economics and our 20-year institutional scale blueprint across 8 autonomous companies."
            action={
              <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                <button
                  type="button"
                  data-horizon-btn="year1"
                  onClick={() => setHorizonView('year1')}
                  className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                    horizonView === 'year1' ? 'bg-emerald-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Year-1 Bootstrapped
                </button>
                <button
                  type="button"
                  data-horizon-btn="year20"
                  onClick={() => setHorizonView('year20')}
                  className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                    horizonView === 'year20' ? 'bg-violet-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  20-Year Holding Horizon
                </button>
              </div>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="ae-deep-grid grid md:grid-cols-2 gap-6">
            <div data-horizon-card="year1">
              <SpotlightCard
                className={`rounded-2xl p-6 sm:p-8 space-y-4 transition-colors h-full ${
                  horizonView === 'year1' ? 'border-emerald-400/60 bg-emerald-500/5' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular text-emerald-300">
                  <span>Year 1 · Zero-Burn Disciplined Launch</span>
                  <span>~$160–$680/mo Net Profit</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Bootstrapped Global Foundation</h3>
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  Generates <span className="font-mono-tabular text-emerald-300 font-semibold">~$160–$680/mo</span> net
                  profit from Day 1 by hosting 14 sites on Free Forever GitHub Pages, reducing Firestore reads by{' '}
                  <span className="font-mono-tabular text-white">98%</span> via Read-Shield snapshots, running BigInt
                  computations on user CPUs, and pricing Pro ($5.99), Singularity ($12.99), and Academy seats sustainably.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-tabular">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/75 p-3">
                    <div className="text-slate-400">Infra Cost Floor</div>
                    <div className="text-white font-bold mt-0.5">$0/mo GitHub Pages</div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/75 p-3">
                    <div className="text-slate-400">Burn Rate</div>
                    <div className="text-emerald-300 font-bold mt-0.5">$0 VC Debt</div>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            <div data-horizon-card="year20">
              <SpotlightCard
                className={`rounded-2xl p-6 sm:p-8 space-y-4 transition-colors h-full ${
                  horizonView === 'year20' ? 'border-violet-400/60 bg-violet-500/5' : 'border-slate-800'
                }`}
              >
              <div className="flex items-center justify-between text-xs font-mono-tabular text-violet-300">
                <span>20-Year Holding Horizon</span>
                <span>$1.5B–$3.0B Valuation Target</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Olympiad Edge Holding Group</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Scales across 8 specialized verticals to{' '}
                <span className="font-mono-tabular text-violet-300 font-semibold">$140M–$300M/yr</span> annual revenue and{' '}
                <span className="font-mono-tabular text-emerald-300 font-semibold">$100M–$225M/yr</span> net profit at{' '}
                <span className="font-mono-tabular text-white font-semibold">~75% margin</span>—while preserving 100%
                Free Forever rated competition for students everywhere.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-tabular">
                <div className="rounded-lg border border-slate-800 bg-slate-950/75 p-3">
                  <div className="text-slate-400">Projected Operating Margin</div>
                  <div className="text-white font-bold mt-0.5">~75% Net Efficiency</div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/75 p-3">
                  <div className="text-slate-400">Holding Architecture</div>
                  <div className="text-amber-300 font-bold mt-0.5">8 Autonomous Spin-Offs</div>
                </div>
              </div>
            </SpotlightCard>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.roadHolding}
            alt="Year-1 zero-burn execution and 20-year Olympiad Edge Holding Group horizon"
            kicker="Bootstrapped Discipline → 20-Year Scale"
            title="Zero VC Debt Year-1 Unit Economics & 75% Holding Margin"
            summary="Read-Shield 98% Firestore read savings and Free Forever GitHub Pages hosting generate sustainable profit from Day 1 while building toward 8 global spin-offs."
            accentColor="#10B981"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 6: Interactive 8 Multi-Million Dollar Spin-Off Companies Explorer */}
      <section id="spinoffs" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Olympiad Edge 8 Canonical Spin-Off Verticals"
            title="The 8 Multi-Million Dollar Spin-Off Companies"
            subtitle="Click any vertical below to inspect its spin-off maturity trigger, enterprise revenue engine, and synergy with Arithmo-Edge’s core data & infrastructure."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
              {SPIN_OFF_COMPANIES.map((spinoff) => {
                const active = spinoff.num === selectedSpinOffNum;
                return (
                  <button
                    key={spinoff.num}
                    type="button"
                    data-spinoff-btn={spinoff.num}
                    onClick={() => setSelectedSpinOffNum(spinoff.num)}
                    className={`text-left spotlight-card rounded-2xl p-5 space-y-2 border transition-all ${
                      active ? 'border-cyan-400 bg-slate-800/90' : `${spinoff.borderClass} hover:border-slate-500`
                    }`}
                  >
                    <div className={`text-xs font-mono-tabular ${spinoff.textClass}`}>{spinoff.num}</div>
                    <h3 className="font-display font-bold text-white text-sm sm:text-base">{spinoff.name}</h3>
                    <p className="text-xs text-slate-400">{spinoff.vertical}</p>
                  </button>
                );
              })}
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-400/30">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 space-y-2">
                  <div data-spinoff-num="" className={`text-xs font-mono-tabular ${activeSpinOff.textClass}`}>{activeSpinOff.num}</div>
                  <h3 data-spinoff-name="" className="font-display text-2xl font-bold text-white">{activeSpinOff.name}</h3>
                  <div data-spinoff-vert="" className="text-xs font-mono-tabular text-slate-400">{activeSpinOff.vertical}</div>
                </div>
                <div className="md:col-span-7 grid sm:grid-cols-3 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                    <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Activation Trigger</span>
                    </div>
                    <p data-spinoff-trig="" className="text-slate-300 leading-relaxed">{activeSpinOff.trigger}</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                    <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Commercial Engine</span>
                    </div>
                    <p data-spinoff-rev="" className="text-slate-300 leading-relaxed">{activeSpinOff.revenueModel}</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                    <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Federation Synergy</span>
                    </div>
                    <p data-spinoff-syn="" className="text-slate-300 leading-relaxed">{activeSpinOff.synergy}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 grid lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-4 aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 relative media-frame">
                  <ResilientImage
                    src={MEDIA.roadSpinOffs}
                    alt="Olympiad Edge 20-year holding structure and 8 autonomous enterprise spin-offs"
                    loading="lazy"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
                <div className="lg:col-span-8 space-y-1.5">
                  <div className="text-xs font-mono-tabular text-violet-300">Alphabet-Style Holding Synergy</div>
                  <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Every spin-off company compounds around verified Arithmo-Edge mathematical rigor—from B2B Module 7
                    exam proctoring and quant hiring bridges to ethical Zero-PII reasoning datasets—while keeping core
                    student arenas 100% Free Forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Genesis Launch Early-Bird Incentives & Custom .com Cutover */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Dec 31, 2026 Cohort + Custom .com in 2 Months"
            title="Genesis Launch Scarcity Window &amp; Edge Cutover"
            subtitle="All arithmo-edge.github.io links remain live forever while our custom .com domain activates alongside full production in 2 months."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {GENESIS_EARLY_BIRD_PERKS.map((perk) => (
              <SpotlightCard key={perk.title} className="rounded-2xl p-5 space-y-2 border-slate-800">
                <div className="text-xs font-mono-tabular" style={{color: perk.accentColor}}>
                  {perk.badge}
                </div>
                <h3 className="font-display text-lg font-bold text-white">{perk.title}</h3>
                <div className="text-[11px] font-mono-tabular text-slate-400">{perk.allocation}</div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{perk.detail}</p>
              </SpotlightCard>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/30 bg-slate-950/80 p-5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-cyan-300 shrink-0" />
              <span className="text-slate-200">
                Dual Edge Continuity: <span className="font-mono-tabular text-cyan-300">arithmo-edge.github.io/...</span>{' '}
                + Custom <span className="font-mono-tabular text-white">.com</span> Production Domain in 2 Months
              </span>
            </div>
            <a href="pricing.html" className="btn-glass px-4 py-2 text-xs whitespace-nowrap shrink-0">
              Preview Wallet &amp; Early-Bird Tiers
            </a>
          </div>
          <CyberMediaFrame
            src={MEDIA.roadCutover}
            alt="Genesis Launch Cohort rewards and dual edge custom domain cutover"
            kicker="Genesis Cutover Continuity"
            title="Permanent GitHub Pages Edge + Custom .com Production Domain"
            summary="Every existing federated arithmo-edge.github.io portal stays permanently online as the flagship custom .com production domain rolls out within two months."
            accentColor="#00F0FF"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 8: Global Contributor Onboarding CTA & Roadmap FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Long-Horizon FAQ &amp; Partnerships"
            title="Roadmap Questions &amp; Federation Onboarding"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <FaqAccordion items={ROADMAP_FAQS} accentClass="text-cyan-300" />
            </div>
            <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border-cyan-400/35">
              <div className="text-xs font-mono-tabular text-cyan-300">Join Before Midnight Dec 31, 2026</div>
              <h3 className="font-display text-2xl font-bold text-white">
                Partner With Olympiad Edge &amp; Pioneers
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Schools, open-source contributors, problemsetters, and patrons can connect directly via{' '}
                <span className="font-mono-tabular text-cyan-300">github.com/Arithmo-Edge</span> or{' '}
                <span className="font-mono-tabular text-cyan-300">rayaantasnim@gmail.com</span>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="pioneers.html" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                  Meet the Pioneers
                </a>
                <a
                  href="mailto:rayaantasnim@gmail.com"
                  className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0"
                >
                  Contact Founder
                </a>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.roadFaq}
            alt="Global contributor onboarding before Dec 31, 2026 Grand Singularity"
            kicker="Open Federation Onboarding"
            title="Connect Ahead of Dec 31, 2026 V4.0 Grand Singularity"
            summary="Academies, problemsetters, open-source engineers, and educational patrons collaborate directly through github.com/Arithmo-Edge ahead of full cutover."
            accentColor="#8B5CF6"
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
