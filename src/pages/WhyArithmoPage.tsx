import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  XCircle,
} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {DynamicCreditsPreview, SectionHeader} from '../components/CommercialPrimitives';
import {
  CyberMediaFrame,
  HeroReveal,
  ResilientImage,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {ARENA_CATALOG, SHADOW_BOT_PERSONAS} from '../data/ecosystem';

type MatrixCategory = 'all' | 'elo' | 'proofs' | 'ai-fairness';

interface ComparisonRow {
  id: string;
  dimension: string;
  category: Exclude<MatrixCategory, 'all'>;
  legacy: string;
  arithmo: string;
  edgeReason: string;
}

const COMPARISON_MATRIX: ComparisonRow[] = [
  {
    id: 'elo-system',
    dimension: '01 · Real-Time ELO Rating',
    category: 'elo',
    legacy: 'None — unrated forum threads or flat point tallies',
    arithmo: '10 Core ELOs + 60 Rank Tiers ((General + Expert) / 2)',
    edgeReason:
      'Every arena runs independent General (velocity) & Expert (proof) ELOs across 12 titles per arena, syncing live across all 14 portals.',
  },
  {
    id: 'duels-bots',
    dimension: '02 · 1v1 Live Bullet Duels & Shadow Bot Gauntlet',
    category: 'elo',
    legacy: 'Async forum replies waiting hours or days for peer feedback',
    arithmo: '60s Pool Ranked Duels, 5-min Rival URLs & 12 Shadow Bots (Spark–Apex BOT)',
    edgeReason:
      'Zero waiting lobby: if no human matches within 60s, Stealth ELO-Mirror bots engage at 100% Rated (0.75× K-factor), or calibrate against any ELO 0–3200+.',
  },
  {
    id: 'find-flaw',
    dimension: '03 · Post-Contest Find the Flaw Proof Auditing',
    category: 'proofs',
    legacy: 'Unverified solutions accumulate upvotes without adversarial stress testing',
    arithmo: '6h Mega / 2h Daily Find the Flaw hacking + 2-min SymPy Global Rejudge',
    edgeReason:
      'Codeforces-style post-contest hacking validates logical boundary cases, directed angles, and injectivity proofs with transparent ELO redistribution.',
  },
  {
    id: 'proof-grading',
    dimension: '04 · Proof-Based Grading + 2000+ ELO Peer Review',
    category: 'proofs',
    legacy: 'Simple multiple-choice / final-integer quizzes that miss deduction flaws',
    arithmo: '0–7 Olympiad Rubric (ProofGrader + SymPy + 2000+ Sentinel Peer Review)',
    edgeReason:
      'Combines deterministic SymPy symbolic validation with high-ELO Sentinel auditing for authentic IMO/BdMO-grade deduction.',
  },
  {
    id: 'latex-geogebra',
    dimension: '05 · In-Browser Drag-and-Drop LaTeX + GeoGebra',
    category: 'proofs',
    legacy: 'Raw manual BBCode/ASCII math typing & external desktop diagram files',
    arithmo: 'Unified 3-Column Toph-Style Workspace with Live LaTeX & GeoGebra Studio',
    edgeReason:
      'Construct circles, inversions, and radical axes in Expert Column 2 right beside live clarifications and KaTeX proof blocks.',
  },
  {
    id: 'anti-llm',
    dimension: '06 · Anti-LLM Question Synthesis (AdversarialRedTeam AI)',
    category: 'ai-fairness',
    legacy: 'Standard textbook problems trivially solved by off-the-shelf LLMs in 3 seconds',
    arithmo: 'AdversarialRedTeam AI + >75% AoPS similarity rejection + Sealed Vaults',
    edgeReason:
      'Multi-agent adversarial stress testing eliminates brittle heuristic shortcuts and keeps official contest sets outside external training scrapes.',
  },
  {
    id: 'guest-entry',
    dimension: '07 · Frictionless Guest Entry',
    category: 'elo',
    legacy: 'Mandatory email registration wall before touching a single interactive tool',
    arithmo: 'Instant Zero-Login 60s Guest Math Duels & Unrated Exploration',
    edgeReason:
      'Solve live problems and project your provisional ELO instantly on the homepage before claiming a unique @handle.',
  },
  {
    id: 'zero-p2w',
    dimension: '08 · Zero Pay-to-Win Guarantee',
    category: 'ai-fairness',
    legacy: 'Paywalled contest mock banks, boosted mentor queues, or paid advantage tiers',
    arithmo: '100% Free Forever Arenas, Daily Contests, Sunday Mega & World Cup',
    edgeReason:
      'Subscriptions and Wallet packs fund optional AI compute and convenience tools only—money can NEVER purchase ELO points or contest advantage.',
  },
  {
    id: 'academy-arena',
    dimension: '09 · Institutional Academy Arena',
    category: 'ai-fairness',
    legacy: 'Manual Google Forms & scattered spreadsheets for Olympiad coaching batches',
    arithmo: '4 Academy Tiers + KYB Onboarding + Dual-Handles + Task Tab + Guild AI',
    edgeReason:
      'Schools track Batch Radar mastery, assign homework via the Task tab, and protect institutional billing with 5-Layer Anti-Reselling.',
  },
  {
    id: 'database-ai',
    dimension: '10 · Arithmo Database AI Editorials',
    category: 'ai-fairness',
    legacy: 'Incomplete external wiki comments or missing solution steps for beginners',
    arithmo: 'Subsite #13 Archive (IMO, Putnam, RMM, BMO, BdMO) + AI Step Editorials',
    edgeReason:
      'Every released contest and historical Olympiad item pairs SymPy verification with structured step-by-step editorials while keeping <3 quorum rounds sealed.',
  },
];

type StakeholderId = 'student' | 'academy' | 'setter';

interface StakeholderSpec {
  id: StakeholderId;
  label: string;
  kicker: string;
  headline: string;
  summary: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
}

const STAKEHOLDERS: StakeholderSpec[] = [
  {
    id: 'student',
    label: 'A · Solo Olympiad Students',
    kicker: 'Meritocratic Growth · 100% Free Forever Competing',
    headline: 'Turn Isolated PDF Grinding into Electrifying Live ELO Mastery',
    summary:
      'Whether preparing for BdMO, BMO, RMM, or IMO, students jump straight from 60-second guest calibration into Monday–Saturday Daily Arenas, Shadow Bot sparring, and Sunday Mega qualifiers toward the Top 128 Annual World Cup.',
    highlights: [
      'Measurable skill telemetry across 5 Core Arenas & 60 progression titles',
      'Zero-wait Ranked Duels (60s pool + Stealth Mirror) & 12 named Shadow Bots',
      'V10.3 AI Smart Mistake Deck turning every contest miss into 7-day flashcards',
      'Free Printable KaTeX Guidebooks + First 50 @handles claim 3 mos FREE Singularity',
    ],
    ctaLabel: 'Explore 5 Arenas & 60 ELO Tiers',
    ctaHref: 'arenas-elo.html',
    accentColor: '#00F0FF',
  },
  {
    id: 'academy',
    label: 'B · Schools, Colleges & Math Clubs',
    kicker: 'Subsite #9 Academy Arena · Founding 25% Discount',
    headline: 'Institutional Batch Analytics & Homework Pipelines Without Spreadsheets',
    summary:
      'Coaches, universities, and regional Olympiad camps deploy turnkey batch training powered by Arithmo Guild AI, Pop-Up KYB verification, isolated Dual-Handle student routing, and the HQ-authored Exclusive Academy Guidebook.',
    highlights: [
      'First 5 KYB-Approved Founding Academies unlock 25% OFF for 3 months',
      'Batch Radar diagnostics pinpointing exact arena/topic weaknesses per cohort',
      'Built-in Task homework dispatch tab & private custom warm-up rooms',
      '5-Layer Anti-Reselling architectural shield protecting institutional seat integrity',
    ],
    ctaLabel: 'Inspect Arithmo Academy Arena',
    ctaHref: 'academies.html',
    accentColor: '#8B5CF6',
  },
  {
    id: 'setter',
    label: 'C · Problemsetters & Mentors',
    kicker: 'Subsites #10–#12 · Forge, Socials & HQ Command Ladder',
    headline: 'Publish Audited Olympiad Originals & Rise to Prime Sovereign',
    summary:
      'Elite solvers (1500+ ELO) author original problems inside Arithmo Forge under our 5-Pillar Legal Engine, mentor peers in 2000+ ELO Find the Flaw reviews, and advance up the 5-Tier Monotonic HQ Ladder to earn Plus, Pro, and Singularity organically.',
    highlights: [
      'Arithmo Forge (1500+ ELO) 5-stage audit pipeline + >75% AoPS similarity block',
      'Arithmo Socials KaTeX blogs awarding Blog-to-Lab +5 ELO + Contribution ELO',
      'HQ Competitor Privilege: retain full public rated competing on conflict-free rounds',
      '3-Mode dynamic Contest Dashboard credits preserving transparent author attribution',
    ],
    ctaLabel: 'Inspect Socials, Forge & HQ Ladder',
    ctaHref: 'socials-forge.html',
    accentColor: '#F59E0B',
  },
];

export const WhyArithmoPage: React.FC = () => {
  const [matrixCategory, setMatrixCategory] = useState<MatrixCategory>('all');
  const [selectedRowId, setSelectedRowId] = useState<string>(COMPARISON_MATRIX[0].id);
  const [selectedBotName, setSelectedBotName] = useState<string>('Vanguard');
  const [stakeholderId, setStakeholderId] = useState<StakeholderId>('student');

  const visibleRows =
    matrixCategory === 'all'
      ? COMPARISON_MATRIX
      : COMPARISON_MATRIX.filter((r) => r.category === matrixCategory);
  const activeRow =
    COMPARISON_MATRIX.find((r) => r.id === selectedRowId) || visibleRows[0] || COMPARISON_MATRIX[0];
  const activeBot =
    SHADOW_BOT_PERSONAS.find((b) => b.name === selectedBotName) || SHADOW_BOT_PERSONAS[10];
  const activeStakeholder =
    STAKEHOLDERS.find((s) => s.id === stakeholderId) || STAKEHOLDERS[0];

  return (
    <>
      {/* Section 1: The Manifesto Hero — Why Competitive Math Needed a Revolution */}
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
                  02 · Executive &amp; Student Manifesto · Powered by Olympiad Edge · Custom .com in 2 Months
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Why Competitive Math Needed a Revolution
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  For decades, Olympiad preparation has been trapped between static downloadable PDFs, 20-year-old
                  thread forums like <span className="text-white font-semibold">AoPS</span>, and shallow multiple-choice
                  quiz apps that reward guessing over deductive rigor.{' '}
                  <span className="text-white font-semibold">Arithmo-Edge</span> fuses the live competitive pulse of{' '}
                  <span className="text-cyan-300 font-semibold">Codeforces</span> and{' '}
                  <span className="text-cyan-300 font-semibold">Chess.com</span> directly into pure Olympiad
                  mathematics.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3">
                  <a href="#comparison-matrix" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    <span>Legacy vs. Arithmo-Edge Matrix</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="architecture.html" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    03. 14-Site Architecture
                  </a>
                </div>
              </HeroReveal>
            </div>

            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[290px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.whyHero}
                    alt="Real-time ELO competitive Olympiad mathematics architecture"
                    loading="eager"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">
                      10 Core ELOs · 60 Rank Tiers · Zero Pay-to-Win
                    </div>
                    <div className="font-display text-lg font-bold text-white">
                      Where Pure Proof Meets Real-Time Sport
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <HeroReveal delay={0.24}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-rose-300">Legacy PDFs &amp; Forums</div>
                <div className="font-display text-lg font-bold text-white mt-1">Zero Live ELO Loop</div>
                <p className="text-xs text-slate-400 mt-1">No live matchmaking, no clock pressure, unverified solutions</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-amber-300">Shallow MCQ Quiz Apps</div>
                <div className="font-display text-lg font-bold text-white mt-1">No Proof Authenticity</div>
                <p className="text-xs text-slate-400 mt-1">Guessable options miss Olympiad deduction &amp; edge cases</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-cyan-300">Arithmo-Edge Engine</div>
                <div className="font-display text-lg font-bold text-white mt-1">Codeforces × Chess.com</div>
                <p className="text-xs text-slate-400 mt-1">10 Core ELOs, Shadow Bots, SymPy grading &amp; Find the Flaw</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-emerald-300">Access Policy</div>
                <div className="font-display text-lg font-bold text-white mt-1">100% Free Forever</div>
                <p className="text-xs text-slate-400 mt-1">Compete across all 5 Arenas &amp; World Cup with $0 barriers</p>
              </div>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Section 2: Interactive "Legacy Platforms vs. Arithmo-Edge" Comparison Matrix */}
      <section
        id="comparison-matrix"
        className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60"
      >
        <ScrollReveal>
          <SectionHeader
            kicker="02 · 10-Point Architectural Superiority Audit"
            title="Legacy Platforms vs. Arithmo-Edge Comparison Matrix"
            subtitle="Filter across 10 decisive dimensions or click any row to inspect why static forums and multiple-choice quiz apps cannot match Arithmo-Edge’s competitive engine."
            action={
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                {(
                  [
                    {id: 'all', label: 'All 10 Dimensions'},
                    {id: 'elo', label: 'ELO & Duels'},
                    {id: 'proofs', label: 'Proofs & Grading'},
                    {id: 'ai-fairness', label: 'AI & Integrity'},
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-matrix-cat={tab.id}
                    onClick={() => {
                      setMatrixCategory(tab.id);
                      const first =
                        tab.id === 'all'
                          ? COMPARISON_MATRIX[0]
                          : COMPARISON_MATRIX.find((r) => r.category === tab.id);
                      if (first) setSelectedRowId(first.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                      matrixCategory === tab.id
                        ? 'bg-cyan-400 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl overflow-x-auto border border-slate-800">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-12 bg-slate-950/90 border-b border-slate-800 px-5 py-3.5 text-xs font-mono-tabular text-slate-400">
                  <div className="col-span-4">Decisive Dimension</div>
                  <div className="col-span-4 text-rose-300">Legacy Platforms (PDFs · Forums · MCQ)</div>
                  <div className="col-span-4 text-cyan-300">Arithmo-Edge Ecosystem</div>
                </div>
                <div className="divide-y divide-slate-800/70">
                  {COMPARISON_MATRIX.map((row) => {
                    const active = row.id === selectedRowId;
                    const hidden = matrixCategory !== 'all' && row.category !== matrixCategory;
                    return (
                      <button
                        key={row.id}
                        type="button"
                        data-matrix-row={row.id}
                        data-cat={row.category}
                        data-dim={row.dimension}
                        data-arithmo={row.arithmo}
                        data-reason={row.edgeReason}
                        onClick={() => setSelectedRowId(row.id)}
                        className={`w-full text-left grid grid-cols-12 px-5 py-4 gap-4 items-center text-xs sm:text-sm transition-colors ${
                          active ? 'bg-cyan-400/10' : 'hover:bg-slate-900/60'
                        }${hidden ? ' hidden' : ''}`}
                      >
                        <div className="col-span-4 font-display font-bold text-white">{row.dimension}</div>
                        <div className="col-span-4 text-slate-400 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{row.legacy}</span>
                        </div>
                        <div className="col-span-4 text-emerald-200 font-medium flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                          <span>{row.arithmo}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/35 bg-slate-950/85 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <div data-matrix-verdict-dim="" className="text-xs font-mono-tabular text-cyan-300">
                  Selected Verdict · {activeRow.dimension}
                </div>
                <div data-matrix-verdict-title="" className="font-display text-lg font-bold text-white">{activeRow.arithmo}</div>
                <p data-matrix-verdict-reason="" className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeRow.edgeReason}</p>
              </div>
              <a href="architecture.html" className="btn-glass px-4 py-2.5 text-xs whitespace-nowrap shrink-0">
                Inspect Architecture →
              </a>
            </div>
            <CyberMediaFrame
              src={MEDIA.whyMatrix}
              alt="Benchmark comparison contrasting static math forums with real-time Arithmo-Edge infrastructure"
              kicker="Architectural Comparison Telemetry"
              title="Why Static Asynchronous Forums Cannot Match Real-Time ELO"
              summary="Live clocks, deterministic BigInt & SymPy verification, isolated arena ratings, and blinded peer review eliminate guessing games and rating stagnation."
              accentColor="#00F0FF"
              reverse
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Uniqueness #1 — Real-Time ELO & Shadow Bot Gauntlet */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Uniqueness Pillar #1 · Subsites #1–#5"
            title="Real-Time ELO Progression &amp; 12-Persona Shadow Bot Gauntlet"
            subtitle="Students stick with Olympiad math when every solved lemma advances transparent General, Expert, and average-based Rank Tiers—paired with zero-wait 1v1 matchmaking and calibrated sparring bots."
            action={
              <a href="arenas-elo.html" className="btn-cyber px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                Simulate 60 Ranks &amp; Bot Slider →
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <SpotlightCard className="rounded-2xl p-6 space-y-3 border-cyan-400/30">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-300">
                  <Swords className="w-4 h-4" />
                  <span>5 Core Arenas · 60 Rank Tiers · Zero-Wait 1v1</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">Isolated General + Expert ELO Engine</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Each of the 5 Core Arenas (<span className="text-white font-medium">Number Theory, Algebra, Geometry, Combinatorics &amp; Permutation, Mixed Mathematical Olympiad</span>) maintains separate General (velocity) &amp; Expert (proof) tracks, combining via{' '}
                  <code className="font-mono-tabular text-cyan-300">(General + Expert) / 2</code> for 12 titles per arena (60 total).
                </p>
                <div className="grid grid-cols-5 gap-1.5 pt-2 text-[11px] font-mono-tabular text-center">
                  {Object.values(ARENA_CATALOG).map((arena) => (
                    <div
                      key={arena.key}
                      className="rounded-lg border border-slate-800 bg-slate-950/80 py-2 px-1"
                      style={{color: arena.color}}
                    >
                      {arena.key.toUpperCase()}
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-violet-400/30">
                <div className="text-xs font-mono-tabular text-violet-300">1v1 Arena Contest Tab Architecture</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">Ranked Arena Duel</strong> searches ±100 ELO for 60s before engaging a{' '}
                  <strong className="text-cyan-300">100% Rated Stealth ELO-Mirror Bot</strong> (0.75× K-factor).{' '}
                  <strong className="text-white">Direct Rival Challenge</strong> mints 5-min invite URLs with zero quota
                  deduction on expiry.
                </p>
              </SpotlightCard>

              <div className="rounded-2xl border border-slate-800 overflow-hidden relative aspect-[16/10] media-frame">
                <ResilientImage
                  src={MEDIA.whyEloGauntlet}
                  alt="Head-to-head real-time strategy matchmaking and ELO sparring gauntlet"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-xs font-mono-tabular text-cyan-300">
                  Zero-Wait Lobby · 60s Stealth ELO Mirror + 12 Shadow Bots
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono-tabular text-amber-300">12 Named Sparring Bots (0–3200+)</div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    Click Any Bot Persona to Inspect Calibration
                  </h3>
                </div>
                <span className="font-mono-tabular text-xs text-slate-400">Spark → 2885 · Vanguard → 3000+ · Apex BOT</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {SHADOW_BOT_PERSONAS.map((bot) => {
                  const active = bot.name === activeBot.name;
                  return (
                    <button
                      key={bot.name}
                      type="button"
                      data-why-bot={bot.name}
                      data-bot-elo={bot.exampleElo}
                      data-bot-tele={bot.telemetryProfile}
                      data-bot-style={bot.style}
                      data-bot-accent={bot.accentColor}
                      onClick={() => setSelectedBotName(bot.name)}
                      className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-cyan-400 bg-slate-800 text-white'
                          : 'border-slate-800 bg-slate-950/75 text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <div className="font-display text-xs font-bold truncate" style={active ? {color: bot.accentColor} : undefined}>
                        {bot.name}
                      </div>
                      <div className="font-mono-tabular text-[10px]">
                        {bot.minElo >= 3000 ? '3000+' : `${bot.minElo}–${bot.maxElo}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                data-why-bot-card=""
                className="rounded-xl border bg-slate-950/85 p-4 flex flex-wrap items-center justify-between gap-4"
                style={{borderColor: activeBot.accentColor}}
              >
                <div className="flex items-center gap-3">
                  <Bot data-why-bot-icon="" className="w-6 h-6 shrink-0" style={{color: activeBot.accentColor}} />
                  <div>
                    <div data-why-bot-name="" className="font-display text-base font-bold text-white">
                      {activeBot.exampleElo} · {activeBot.name} BOT
                    </div>
                    <div data-why-bot-tele="" className="text-xs font-mono-tabular text-slate-400">{activeBot.telemetryProfile}</div>
                  </div>
                </div>
                <p data-why-bot-style="" className="text-xs text-slate-300 max-w-sm">{activeBot.style}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Uniqueness #2 — True Olympiad Authenticity (Proofs, Find the Flaw & BdMO Warm-Ups) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Uniqueness Pillar #2 · Subsite #6 Contest Engine"
            title="True Olympiad Authenticity: Proofs, Find the Flaw &amp; BdMO Warm-Ups"
            subtitle="Serious mathematicians trust Arithmo-Edge because official rounds combine formal proof rubrics, adversarial hacking, preserved <3 quorum sets, and transparent 3-mode author credits."
            action={
              <a href="contests.html" className="btn-glass px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                Explore Contest Engine →
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-cyan-400/30">
                <Trophy className="w-5 h-5 text-cyan-300" />
                <h3 className="font-display text-base font-bold text-white">7-Day Calendar &amp; Sunday Mega</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Daily rotated Mon–Sat rounds culminate in Sunday Mega Arena (100 min, 10 Qs, Max 2 subs/Q, T+3h finalization).
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-violet-400/30">
                <Scale className="w-5 h-5 text-violet-300" />
                <h3 className="font-display text-base font-bold text-white">Proof Grading + 2000+ Peer Audit</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  0–7 Olympiad proof rubric graded via ProofGrader AI, SymPy, 2000+ Sentinel reviewers, and post-contest Find the Flaw.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-amber-400/30">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-display text-base font-bold text-white">BdMO Special Warm-Up</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Human-authored Default Expert-Only Rated Warm-Up Championship divided cleanly by Primary, Junior, Secondary &amp; Higher Secondary.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-emerald-400/30">
                <Lock className="w-5 h-5 text-emerald-300" />
                <h3 className="font-display text-base font-bold text-white">&lt; 3 Quorum Sealing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Suspended rounds (&lt; 3 competitors) trigger zero ELO loss and never leak to Arithmo Database or Virtual Gym.
                </p>
              </SpotlightCard>
            </div>

            <div className="rounded-2xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
              <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto min-h-[200px] relative media-frame">
                <ResilientImage
                  src={MEDIA.whyProofs}
                  alt="Olympiad handwritten proof derivation and LaTeX peer audit validation"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-xs font-mono-tabular text-amber-300">
                  0–7 IMO Proof Rubric · SymPy + 2000+ Sentinel Peer Review
                </div>
              </div>
              <div className="lg:col-span-7 p-6 flex flex-col justify-center space-y-2">
                <div className="text-xs font-mono-tabular text-amber-300">Beyond Guessing Final Digits</div>
                <h3 className="font-display text-lg font-bold text-white">
                  Full Deductive Rigor with Post-Contest Find the Flaw Audits
                </h3>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Expert rounds combine in-browser GeoGebra diagramming, Drag-and-Drop KaTeX lemmas, 2000+ ELO blind
                  grading, and 2-minute global SymPy rejudging whenever an official counterexample is surfaced.
                </p>
              </div>
            </div>

            <DynamicCreditsPreview />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Uniqueness #3 — 42 Hybrid AI Engines & Zero-Copy Mathematical Genome */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Uniqueness Pillar #3 · Subsites #8, #9 &amp; #13"
            title="42 Hybrid AI Engines &amp; Zero-Copy Mathematical Genome"
            subtitle="AI at Arithmo-Edge accelerates post-contest mastery and problem synthesis while staying strictly locked out of live competition sessions."
            action={
              <a href="ai-core.html" className="btn-glass px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                Inspect All 42 AI Engines →
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-4 rounded-2xl border border-cyan-400/25 overflow-hidden relative min-h-[240px] media-frame">
              <ResilientImage
                src={MEDIA.whyHybridAi}
                alt="Hybrid symbolic SymPy and neural math orchestration"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="text-xs font-mono-tabular text-cyan-300">Hard-Locked During Live Contests</div>
                <div className="font-display text-base font-bold text-white">
                  1× Gemini + 2× Qwen-Math-72B + SymPy
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-cyan-400/30">
                <div className="text-xs font-mono-tabular text-cyan-300">Subsite #8 · Arithmo Personal AI</div>
                <h3 className="font-display text-base font-bold text-white">In-Chat Dual-Model Selector</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Switch seamlessly between General (1× Gemini) and Premium Hybrid (2× Qwen-Math-72B + Python SymPy) with
                  dynamic semantic token metering.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-violet-400/30">
                <div className="text-xs font-mono-tabular text-violet-300">Subsite #9 · Arithmo Guild AI</div>
                <h3 className="font-display text-base font-bold text-white">Cohort Batch Intelligence</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Powers institutional Academy rosters with Batch Radar analytics, automated Task homework sets, and
                  weakness clustering.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-emerald-400/30">
                <div className="text-xs font-mono-tabular text-emerald-300">Subsite #13 · Arithmo Database</div>
                <h3 className="font-display text-base font-bold text-white">AI Step-by-Step Editorials</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pairs past Arithmo contests and historical IMO, Putnam, RMM, BMO &amp; BdMO sets with SymPy-verified
                  walkthroughs.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-amber-400/30">
                <div className="text-xs font-mono-tabular text-amber-300">Zero-Copy Mathematical Genome</div>
                <h3 className="font-display text-base font-bold text-white">Original Difficulty Distillation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extracts structural difficulty signatures from BdMO, IMO, APMO, Putnam, RMM &amp; BMO without copying
                  problems—and stays embargoed during live contests.
                </p>
              </SpotlightCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Uniqueness #4 — QPRT-4 Ironclad Fairness & Zero Pay-to-Win Charter */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Uniqueness Pillar #4 · Subsite Security"
            title="QPRT-4 Ironclad Fairness &amp; Zero Pay-to-Win Charter"
            subtitle="Trust is the currency of competitive math. Our engineering enforces live contest integrity and legally forbids purchasing rating advantages."
            action={
              <a href="security-qprt4.html" className="btn-glass px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                Inspect QPRT-4 Charter →
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-cyan-400/30">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
                <h3 className="font-display text-base font-bold text-white">App &amp; Full-Screen Lockdown</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mandatory live contest Full-Screen &amp; Tab/App Lockdown with Soft-Pinch AI alerts (`Arithmo Alert AI`) paired with optional Module 7 webcam/gaze verification on daily rounds.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-violet-400/30">
                <Cpu className="w-5 h-5 text-violet-300" />
                <h3 className="font-display text-base font-bold text-white">30s Hot-Swap &amp; GridShield</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mid-contest anomalies trigger 30-second reserve problem swaps, ChronoVault ISP outage freezes, and automated GridShield global clock pauses.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-amber-400/30">
                <Lock className="w-5 h-5 text-amber-300" />
                <h3 className="font-display text-base font-bold text-white">11-Flag Progressive Ladder</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Auditable telemetry flags escalate from 3-day cooloffs to Flag 11 permanent IP/device blackhole with 4-Step Forensic Appeals.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-5 space-y-2 border-emerald-400/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <h3 className="font-display text-base font-bold text-white">Zero Pay-to-Win Ironclad Promise</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Paid tiers ($2.99–$12.99) and Wallet packs never sell ELO points, match boosts, or contest privileges. Competitive advancement is strictly meritocratic.
                </p>
              </SpotlightCard>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[280px] media-frame">
              <ResilientImage
                src={MEDIA.whyFairness}
                alt="QPRT-4 cryptographic fairness and zero pay-to-win charter"
                loading="lazy"
                accentColor="#10B981"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/50 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-1">
                <div className="text-xs font-mono-tabular text-emerald-300">14-Point Legal &amp; COPPA/GDPR-K Shield</div>
                <div className="font-display text-xl font-bold text-white">
                  Money Never Buys ELO on Arithmo-Edge
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Built for Every Stakeholder (Interactive Persona Switcher) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Three Core Ecosystem Constituencies"
            title="Built for Every Olympiad Stakeholder"
            subtitle="Switch personas below to see how solo students, schools/math clubs, and problemsetters extract distinct compound value."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="grid md:grid-cols-3 gap-3">
              {STAKEHOLDERS.map((person) => {
                const active = person.id === stakeholderId;
                return (
                  <button
                    key={person.id}
                    type="button"
                    data-stakeholder-tab={person.id}
                    onClick={() => setStakeholderId(person.id)}
                    className={`text-left rounded-xl border p-4 transition-all flex items-center gap-3 ${
                      active
                        ? 'border-cyan-400 bg-slate-800/90 text-white'
                        : 'border-slate-800 bg-slate-950/75 text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {person.id === 'student' && <GraduationCap className="w-5 h-5 text-cyan-300 shrink-0" />}
                    {person.id === 'academy' && <Building2 className="w-5 h-5 text-violet-300 shrink-0" />}
                    {person.id === 'setter' && <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />}
                    <span className="font-display text-sm font-bold">{person.label}</span>
                  </button>
                );
              })}
            </div>

            {STAKEHOLDERS.map((s) => (
              <div
                key={s.id}
                data-stakeholder-panel={s.id}
                className={`rounded-2xl border border-slate-800 bg-slate-950/85 p-6 sm:p-8 grid lg:grid-cols-12 gap-6 items-center ${
                  s.id === stakeholderId ? '' : 'hidden'
                }`}
              >
                <div className="lg:col-span-6 space-y-3">
                  <div className="text-xs font-mono-tabular" style={{color: s.accentColor}}>
                    {s.kicker}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {s.headline}
                  </h3>
                  <p className="ae-prose text-sm text-slate-300 leading-relaxed">{s.summary}</p>
                  <div className="pt-2">
                    <a
                      href={s.ctaHref}
                      className="btn-cyber px-5 py-2.5 text-xs sm:text-sm inline-flex whitespace-nowrap shrink-0"
                    >
                      {s.ctaLabel} →
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 grid gap-2.5">
                  {s.highlights.map((hl) => (
                    <div
                      key={hl}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{color: s.accentColor}}
                      />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-800 overflow-hidden grid lg:grid-cols-12 items-stretch bg-slate-950/75">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[170px] relative media-frame">
                <ResilientImage
                  src={MEDIA.whyStakeholders}
                  alt="Students, academies, and Olympiad coaches collaborating on shared math goals"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
              </div>
              <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-center space-y-1.5">
                <div className="text-xs font-mono-tabular text-cyan-300">Unified Tri-Stakeholder Flywheel</div>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Students earn transparent merit rankings, Schools &amp; Coaching Centers deploy verified KYB cohorts,
                  and elite Problemsetters govern Golden Vaults without sacrificing live competing privileges.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Genesis Launch Call-to-Action (Dec 16 – Dec 31, 2026) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border-cyan-400/35 space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono-tabular text-cyan-300">
                  08 · Genesis Rollout Window · Dec 16 – Dec 31, 2026 Midnight
                </div>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  Claim Your @handle in the Founding Cohort
                </h2>
                <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                  Begin immediately with <span className="text-white font-semibold">No-Login 60-Second Guest Access</span>{' '}
                  or lock in Genesis Early-Bird launch perks as all 14 portals come online toward Midnight Dec 31, 2026.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="architecture.html" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    <span>03. 14-Site Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="arenas-elo.html" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    04. 5 Arenas &amp; 60 ELO Tiers
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 grid gap-3 text-xs">
                <div className="rounded-xl border border-amber-400/35 bg-amber-400/10 p-4">
                  <div className="font-mono-tabular text-amber-300 font-bold">First 50 Verified @handles</div>
                  <div className="font-display text-base font-bold text-white mt-0.5">3 Months FREE Singularity</div>
                  <p className="text-slate-300 mt-1">Unlimited AI Premium hybrid, Private Rooms &amp; 150/mo Shadow Bots.</p>
                </div>
                <div className="rounded-xl border border-violet-400/35 bg-violet-400/10 p-4">
                  <div className="font-mono-tabular text-violet-300 font-bold">Next 100 Verified @handles</div>
                  <div className="font-display text-base font-bold text-white mt-0.5">3 Months FREE Pro</div>
                  <p className="text-slate-300 mt-1">150 monthly AI queries + Smart Mistake Deck + 50/mo Unbounded Bots.</p>
                </div>
                <div className="rounded-xl border border-cyan-400/35 bg-cyan-400/10 p-4">
                  <div className="font-mono-tabular text-cyan-300 font-bold">No-Login Guest Sandbox</div>
                  <div className="font-display text-base font-bold text-white mt-0.5">Instant 60-Second Math Duel</div>
                  <p className="text-slate-300 mt-1">Test your provisional Olympiad ELO right from the Home Command Deck.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.whyCohort}
              alt="Founding cohort onboarding ahead of December 2026 Genesis release"
              kicker="Founding Rollout Window · Dec 16 – Dec 31, 2026"
              title="Enter Before V4.0 Grand Singularity Unlocks"
              summary="Verify early to secure permanent Genesis status across all 14 federated portals, unlocked prior to our custom .com edge cutover."
              accentColor="#8B5CF6"
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
