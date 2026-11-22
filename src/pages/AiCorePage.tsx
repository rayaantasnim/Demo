import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {BookOpenCheck, Cpu, ShieldCheck} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {AI_ENGINES_42, AiEngineEntry} from '../data/ecosystem';

type FilterGroup = 'all' | AiEngineEntry['group'];
type PinchSignal = 'gaze' | 'paste' | 'audio';
type TokenScenario = 'greeting' | 'duplicate' | 'multi' | 'premium';
type GenomeSource = 'BdMO' | 'IMO' | 'APMO' | 'Putnam' | 'RMM' | 'BMO';

const GENOME_DISTILLATIONS: Record<
  GenomeSource,
  {
    fullName: string;
    graphNodes: string[];
    syntheticOutput: string;
    copyrightNote: string;
  }
> = {
  BdMO: {
    fullName: 'Bangladesh Mathematical Olympiad Corpus',
    graphNodes: ['Parity Invariant → Modular Descent (mod 4 / mod 8)', 'Symmetric Diophantine Bounding', 'Pigeonhole Remainder Splitting'],
    syntheticOutput: 'Synthesizes fresh integer sequences with isomorphic p-adic structure and brand-new domain stories.',
    copyrightNote: 'Zero verbatim problem strings stored or reproduced — abstract logic skeleton only.',
  },
  IMO: {
    fullName: 'International Mathematical Olympiad Shortlist/Archive',
    graphNodes: ['Vieta Jumping Root Flip', 'Semi-Perimeter Homothety Composition', 'Turán Graph Extremal Coloring'],
    syntheticOutput: 'Distills multi-lemma transitions into original Segment 3 & 4 Grandmaster challenges vetted by SymPy.',
    copyrightNote: 'PlagioGuard enforces <25% lexical overlap (>75% similarity blocked pre-publication).',
  },
  APMO: {
    fullName: 'Asian Pacific Mathematical Olympiad',
    graphNodes: ['Cyclic Root of Unity Filtering', 'Weighted Cauchy-Schwarz Substitution', 'Grid Tiling Monovariant'],
    syntheticOutput: 'Emits parameterized Olympiad warm-up variants tuned across 1600–2400 ELO calibration curves.',
    copyrightNote: 'Pure structural graph extraction — zero copy of original APMO wording or diagrams.',
  },
  Putnam: {
    fullName: 'William Lowell Putnam Mathematical Competition',
    graphNodes: ['Polynomial Interpolant Finite Differences', 'Matrix Trace Spectrum Identity', 'Generating Function Convolution'],
    syntheticOutput: 'Constructs clean discrete/algebraic synthesis problems free from tedious calculus traps.',
    copyrightNote: 'Theorem graph distillation preserves deductive symmetry while purging copyrighted phrasing.',
  },
  RMM: {
    fullName: 'Romanian Master of Mathematics',
    graphNodes: ['Projective Cross-Ratio Harmonics', 'Extremal Minimal Counterexample Loop', 'Ultrafilter / Prime Density Bound'],
    syntheticOutput: 'Powers Vanguard (2700–2999) and Apex (3000+) Shadow Bot benchmark calibrations.',
    copyrightNote: 'Clean structural representation checked deterministically by Python/SymPy sandboxes.',
  },
  BMO: {
    fullName: 'Balkan & British Mathematical Olympiad',
    graphNodes: ['Radical Axis Coaxality Chain', 'Dirichlet Box Congruence Reduction', 'Functional Equation Injectivity Split'],
    syntheticOutput: 'Feeds Secondary & Higher Secondary Warm-Up Championship practice sets with Socratic step trees.',
    copyrightNote: 'Zero-Copy Mathematical Genome guarantees 100% original Arithmo-Edge intellectual property.',
  },
};

const SOFT_PINCH_PAYLOADS: Record<
  PinchSignal,
  {
    tag: string;
    title: string;
    desc: string;
    json: string;
    message: string;
    tagClass: string;
  }
> = {
  gaze: {
    tag: 'SP-409 · Module 7 Gaze Drift',
    title: '4.8s Off-Canvas Gaze Shift',
    desc: 'Triggers advisory workspace alignment prompt without deducting ELO or issuing a hard flag.',
    json: '{"signal_id":"SP-409","cipher":"AES-256-GCM","source":"Module7_GazeGuard","duration_s":4.8,"flag_level":"ADVISORY_SOFT_PINCH"}',
    message:
      'Arithmo Personal AI Advisory: "Notice: Focus drifted off-canvas for 4.8s during your last practice trial. Keep scratchpad work centered to ensure smooth Sunday Mega verification."',
    tagClass: 'text-cyan-300',
  },
  paste: {
    tag: 'SP-412 · LaTeX Entropy Spike',
    title: 'Large External Paste Burst',
    desc: 'Advises composing steps organically inside Drag-and-Drop LaTeX for full ProofGrader clarity.',
    json: '{"signal_id":"SP-412","cipher":"AES-256-GCM","source":"MBTS_EntropyCheck","burst_chars":640,"flag_level":"ADVISORY_SOFT_PINCH"}',
    message:
      'Arithmo Personal AI Advisory: "Tip: Large external blocks were pasted quickly. Composing intermediate modular steps inside the Drag-and-Drop LaTeX Editor improves ProofGrader clarity and protects MBTS signature alignment."',
    tagClass: 'text-violet-300',
  },
  audio: {
    tag: 'SP-418 · 3-Axis Audio Trap',
    title: 'Multi-Voice Acoustic Detection',
    desc: 'Prompts quiet workspace verification ahead of Sunday Mega mandatory Module 7 enforcement.',
    json: '{"signal_id":"SP-418","cipher":"AES-256-GCM","source":"Module7_AudioTrap","voices_detected":2,"flag_level":"ADVISORY_SOFT_PINCH"}',
    message:
      'Arithmo Personal AI Advisory: "Room Notice: Ambient secondary speech was detected by the 3-Axis Audio Trap. Remember Sunday Mega Arena requires a silent solo environment."',
    tagClass: 'text-emerald-300',
  },
};

const AI_FAQS = [
  {
    q: 'How does Zero-Copy Mathematical Genome Distillation differ from scraping contest PDFs?',
    a: 'Arithmo-Edge never stores, indexes verbatim, or regurgitates copyrighted Olympiad text. Instead, Question-Forge engines extract abstract theorem dependency graphs (e.g., LTE -> order mod p -> bounding) from BdMO, IMO, APMO, Putnam, RMM, and BMO styles to synthesize fresh problems vetted via SymPy and PlagioGuard (>75% similarity block).',
  },
  {
    q: 'Are Gemini or Qwen-Math API keys ever embedded in our GitHub Pages repositories?',
    a: 'Never. All frontend repositories stay 100% secret-free. Authenticated requests sign a short-lived Firebase JWT routed through Cloudflare Workers + Firebase edge orchestration directly to Gemini Pro/Flash, Qwen-Math, and Python/SymPy sandboxes.',
  },
  {
    q: 'Does Arithmo Personal AI ever leak solutions during live rated contests?',
    a: 'No. At T-0 launch of any live rated contest, Cloudflare Worker edge middleware enforces an instant Hard-Lock across Subsite #8 (Arithmo Personal AI) and Subsite #9 (Arithmo Guild AI) until the submission window closes.',
  },
];

export const AiCorePage: React.FC = () => {
  const [aiFilter, setAiFilter] = useState<FilterGroup>('all');
  const [pinchSignal, setPinchSignal] = useState<PinchSignal>('gaze');
  const [tokenScenario, setTokenScenario] = useState<TokenScenario>('duplicate');
  const [multiN, setMultiN] = useState<number>(3);
  const [genomeSource, setGenomeSource] = useState<GenomeSource>('BdMO');

  const visibleEngines =
    aiFilter === 'all' ? AI_ENGINES_42 : AI_ENGINES_42.filter((engine) => engine.group === aiFilter);

  const tokenCostDisplay =
    tokenScenario === 'greeting'
      ? {
          cost: '0 Tokens',
          explain: 'Zero-rated social politeness ("hello", "thank you", "got it") consumes zero student tokens.',
        }
      : tokenScenario === 'multi'
        ? {
            cost: `-${multiN} Tokens`,
            explain: `Bundled multi-problem request across ${multiN} sub-problems deducts ${multiN} token(s) linearly.`,
          }
        : tokenScenario === 'premium'
          ? {
              cost: '-2 Tokens (2x Hybrid)',
              explain: 'Deep Gemini Pro + Qwen-Math + SymPy verification pipeline deducts a transparent 2x token weight.',
            }
          : {
              cost: '-1 Token',
              explain: 'Duplicate or repeated clarification of the same problem deducts a fixed -1 token.',
            };

  const activeGenome = GENOME_DISTILLATIONS[genomeSource];

  return (
    <>
      {/* Section 1: 42 Specialized Neural & Symbolic Engines Overview */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#10B981" secondaryHex="#00F0FF" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · arithmo-edge.github.io/arithmo-ai/ · 42 Orchestrated Engines (2+2+24+12+1+1)
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  42-Engine Hybrid Neural &amp; Symbolic AI Core
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Arithmo-Edge replaces monolithic chat wrappers with{' '}
                  <span className="text-white font-semibold">42 canonical, single-responsibility engines</span> (
                  <span className="font-mono-tabular text-cyan-300">2 + 2 + 24 + 12 + 1 + 1</span>)—combining{' '}
                  <span className="text-white font-medium">Google Gemini (Pro &amp; Flash) + Qwen-Math + Python/SymPy</span>{' '}
                  across <span className="text-cyan-300">Arithmo Personal AI</span>,{' '}
                  <span className="text-violet-300">Arithmo Guild AI</span>,{' '}
                  <span className="text-amber-300">Arithmo Alert AI</span>, and Supreme{' '}
                  <span className="text-rose-300">Headquarters AI</span>.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="ae-kpi-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
                  <div className="rounded-xl border border-violet-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-violet-300">2</div>
                    <div className="text-[11px] text-slate-400">Personal &amp; Guild</div>
                  </div>
                  <div className="rounded-xl border border-sky-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-sky-300">2</div>
                    <div className="text-[11px] text-slate-400">Foundation</div>
                  </div>
                  <div className="rounded-xl border border-cyan-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-cyan-300">24</div>
                    <div className="text-[11px] text-slate-400">QPRT-4 Guardians</div>
                  </div>
                  <div className="rounded-xl border border-emerald-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-emerald-300">12</div>
                    <div className="text-[11px] text-slate-400">Forge &amp; Anti-LLM</div>
                  </div>
                  <div className="rounded-xl border border-amber-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-amber-300">1</div>
                    <div className="text-[11px] text-slate-400">Alert AI</div>
                  </div>
                  <div className="rounded-xl border border-rose-400/30 bg-slate-950/75 p-3 text-center">
                    <div className="font-mono-tabular text-xl font-bold text-rose-300">1</div>
                    <div className="text-[11px] text-slate-400">Headquarters AI</div>
                  </div>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.16} className="h-full">
                <div className="h-full min-h-[320px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group">
                  <ResilientImage
                    src={MEDIA.aiHero}
                    alt="Arithmo AI neural orchestration core"
                    loading="eager"
                    accentColor="#10B981"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">2 + 2 + 24 + 12 + 1 + 1 = 42 Engines</div>
                    <div className="font-display text-lg font-bold text-white">
                      Zero Raw Keys · Deterministic Python/SymPy Proofs
                    </div>
                    <p className="ae-prose text-xs text-slate-300 mt-1">
                      Orchestrated in real time via Cloudflare Workers + Firebase edge proxy—zero GitHub Actions latency.
                    </p>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive 42-Engine Catalog Filter */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono-tabular text-cyan-300 mb-2">
                02 · Complete 42-Engine Canonical Directory
              </div>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Interactive 6-Group AI Filter
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl">
              {(
                [
                  {id: 'all', label: 'All 42'},
                  {id: 'public', label: 'Personal & Guild (2)'},
                  {id: 'foundation', label: 'Foundation (2)'},
                  {id: 'guardians', label: 'QPRT-4 Guardians (24)'},
                  {id: 'forge', label: 'Forge & Anti-LLM (12)'},
                  {id: 'deterrence', label: 'Alert AI (1)'},
                  {id: 'supreme', label: 'HQ AI (1)'},
                ] as const
              ).map((btn) => {
                const active = aiFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    data-ai-filter={btn.id}
                    onClick={() => setAiFilter(btn.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                      active ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="ae-bento-grid-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_ENGINES_42.map((engine) => (
            <div
              key={engine.name}
              data-ai-group={engine.group}
              className={aiFilter !== 'all' && aiFilter !== engine.group ? 'hidden' : ''}
            >
              <SpotlightCard className={`rounded-2xl p-5 space-y-2 h-full ${engine.borderClass}`}>
                <div className={`text-xs font-mono-tabular ${engine.badgeClass}`}>{engine.badge}</div>
                <h3 className="font-display font-bold text-white">{engine.name}</h3>
                <p className="ae-prose text-xs text-slate-300">{engine.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.05}>
          <div className="mt-8 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[175px] relative media-frame">
              <ResilientImage
                src={MEDIA.aiDualModel}
                alt="In-chat dual-model orchestration switching Gemini Flash and Qwen-Math-72B SymPy"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">
                Single-Responsibility Micro-Agents · 1× General vs 2× Hybrid
              </div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Toggle between Gemini Flash for conversational Socratic coaching and Qwen-Math-72B + Python/SymPy
                deterministic symbolic execution—never leaking raw keys onto GitHub Pages frontends.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Hybrid Neural + Deterministic Pipeline */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 media-frame h-80 relative group">
              <ResilientImage
                src={MEDIA.aiSympy}
                alt="Dual Gemini Pro and Flash, Qwen-Math, and SymPy verification sandbox"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono-tabular text-cyan-300">
                Stage 1: Gemini Pro &amp; Flash Synthesis &rarr; Stage 2: Qwen-Math Audit &rarr; Stage 3: Python / SymPy
                Execution
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300">03 · Zero-Hallucination Math Pipeline</div>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Gemini Pro &amp; Flash + Qwen-Math + Python/SymPy Sandbox
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                Language models alone hallucinate subtle algebraic identities and modular exceptions. In Arithmo-Edge,
                neural reasoning never settles a mathematical verdict solo:{' '}
                <span className="text-white font-semibold">Gemini Pro &amp; Flash</span> orchestrate deep proof parsing
                and low-latency Socratic hints, <span className="text-white font-semibold">Qwen-Math</span>{' '}
                cross-verifies competition theorems, and deterministic{' '}
                <span className="font-mono-tabular text-cyan-300">Python / SymPy</span> executes exact symbolic &amp;
                integer verification before returning a verdict.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-mono-tabular text-cyan-300">Client Zero-Call Offload</div>
                  <div className="text-sm font-semibold text-white mt-1">Miller-Rabin &amp; Brent-Pollard&apos;s Rho</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Basic modular primes &amp; factorizations execute at zero server token cost via client BigInt.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-xs font-mono-tabular text-violet-300">Cloudflare Workers + Firebase</div>
                  <div className="text-sm font-semibold text-white mt-1">Zero-Key Edge Proxy</div>
                  <p className="text-xs text-slate-400 mt-1">
                    All AI credentials live exclusively inside Cloudflare Worker secrets with real-time Firebase rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Zero-Copy Mathematical Genome Distillation */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Copyright-Clean Original Problem Synthesis"
            title="Zero-Copy Mathematical Genome Distillation"
            subtitle="Instead of copying copyrighted contest statements, our engines distill pure abstract theorem & logic graphs from classic traditions (BdMO, IMO, APMO, Putnam, RMM, BMO) to generate 100% original problems."
          />

          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-400/30 space-y-6">
            <div className="flex flex-wrap gap-2">
              {(['BdMO', 'IMO', 'APMO', 'Putnam', 'RMM', 'BMO'] as GenomeSource[]).map((src) => (
                <button
                  key={src}
                  type="button"
                  data-genome-btn={src}
                  onClick={() => setGenomeSource(src)}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap shrink-0 transition-colors ${
                    genomeSource === src
                      ? 'border-emerald-400 bg-emerald-500/15 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white'
                  }`}
                >
                  {src} Tradition
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-300">
                  <Cpu className="w-4 h-4" />
                  <span data-genome-title="">Extracted Abstract Theorem Graph ({genomeSource})</span>
                </div>
                <div data-genome-fullname="" className="font-display text-lg font-bold text-white">{activeGenome.fullName}</div>
                <ul data-genome-nodes="" className="space-y-2 text-xs font-mono-tabular text-cyan-200">
                  {activeGenome.graphNodes.map((node) => (
                    <li key={node} className="rounded-lg border border-slate-800 bg-slate-900/75 px-3 py-2">
                      {node}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-violet-300">
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Zero-Copy Synthetic Output</span>
                  </div>
                  <p data-genome-output="" className="ae-prose text-sm text-slate-200 leading-relaxed">{activeGenome.syntheticOutput}</p>
                </div>
                <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4 text-xs text-emerald-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero-Copy Legal Shield:</strong> <span data-genome-note="">{activeGenome.copyrightNote}</span>
                  </span>
                </div>
                <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[175px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.aiGenome}
                    alt="Zero-Copy Mathematical Genome abstract theorem graph distillation"
                    loading="lazy"
                    accentColor="#10B981"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Interactive Zero-Leak "Soft-Pinch" Warning Simulator */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="mb-8">
            <div className="text-xs font-mono-tabular text-cyan-300 mb-2">
              05 · Arithmo Alert AI · Zero-Leak Deterrence
            </div>
            <h2 className="section-title-fluid font-display font-bold text-white">
              Interactive &ldquo;Soft-Pinch&rdquo; Warning Simulator
            </h2>
            <p className="ae-prose text-sm sm:text-base text-slate-400 prose-measure mt-2">
              <span className="text-white font-semibold">Arithmo Alert AI</span> (working alongside{' '}
              <span className="text-white font-semibold">Arithmo Personal AI</span>) coaches integrity habits via
              encrypted AES-256-GCM signals without shaming students or leaking anti-cheat weights.
            </p>
          </div>

          <div className="ae-deep-grid grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              {(['gaze', 'paste', 'audio'] as PinchSignal[]).map((sigKey) => {
                const payload = SOFT_PINCH_PAYLOADS[sigKey];
                const active = pinchSignal === sigKey;
                return (
                  <button
                    key={sigKey}
                    type="button"
                    data-pinch-signal={sigKey}
                    onClick={() => setPinchSignal(sigKey)}
                    className={`w-full text-left spotlight-card rounded-2xl p-5 transition-all ${
                      active ? 'border-cyan-400 bg-cyan-400/10' : ''
                    }`}
                  >
                    <div className={`text-xs font-mono-tabular ${payload.tagClass}`}>{payload.tag}</div>
                    <div className="font-display font-bold text-white mt-1">{payload.title}</div>
                    <p className="text-xs text-slate-400 mt-1">{payload.desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div>
                <div className="text-xs font-mono-tabular text-slate-400 uppercase mb-2">
                  Encrypted Wire Envelope (Zero Anti-Cheat Leak)
                </div>
                <pre id="soft-pinch-json" className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 text-xs font-mono-tabular text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                  {SOFT_PINCH_PAYLOADS[pinchSignal].json}
                </pre>
              </div>
              <div className="rounded-xl border border-violet-400/35 bg-violet-400/10 p-5">
                <div className="text-xs font-mono-tabular text-violet-300 mb-1.5">Personal AI Soft-Pinch Output</div>
                <p id="soft-pinch-msg" className="ae-prose text-sm text-white leading-relaxed">{SOFT_PINCH_PAYLOADS[pinchSignal].message}</p>
              </div>
              <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[165px] w-full relative media-frame">
                <ResilientImage
                  src={MEDIA.aiSoftPinch}
                  alt="Encrypted Soft-Pinch advisory signal telemetry pipeline"
                  loading="lazy"
                  accentColor="#8B5CF6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Interactive Semantic Token Economy Meter */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="mb-8">
            <div className="text-xs font-mono-tabular text-cyan-300 mb-2">06 · Fair Semantic Token Economics</div>
            <h2 className="section-title-fluid font-display font-bold text-white">
              Interactive Semantic Token Meter
            </h2>
            <p className="ae-prose text-sm sm:text-base text-slate-400 prose-measure mt-2">
              Arithmo-Edge never charges students arbitrary character fees for greetings or phrasing clarifications. Test
              Semantic Token deduction across all 4 billing behaviors:
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {(
                [
                  {id: 'greeting', tag: 'Zero-Rated', tagCls: 'text-emerald-400', label: 'Greeting / Thanks'},
                  {id: 'duplicate', tag: 'Standard Clarification', tagCls: 'text-cyan-300', label: 'Duplicate / Follow-Up'},
                  {id: 'multi', tag: 'Bundled Request', tagCls: 'text-violet-300', label: 'Multi-Query (-N)'},
                  {id: 'premium', tag: 'Deep Verification', tagCls: 'text-amber-300', label: 'Premium 2x Hybrid'},
                ] as const
              ).map((item) => {
                const active = tokenScenario === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-token-scenario={item.id}
                    onClick={() => setTokenScenario(item.id)}
                    className={`text-left rounded-xl border p-4 transition-colors ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-700 bg-slate-950/70 hover:border-cyan-400/60'
                    }`}
                  >
                    <div className={`text-xs font-mono-tabular ${item.tagCls}`}>{item.tag}</div>
                    <div className="font-display font-bold text-white mt-1">{item.label}</div>
                  </button>
                );
              })}
            </div>
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <label htmlFor="token-multi-n" className="block text-xs font-mono-tabular text-slate-400">
                  Multi-Query Sub-Problems (N = <span data-token-multi-val="">{multiN}</span>)
                </label>
                <input
                  id="token-multi-n"
                  type="range"
                  min={2}
                  max={8}
                  value={multiN}
                  onChange={(e) => setMultiN(Number(e.target.value))}
                  className="w-full cyber-range"
                />
                <div className="text-xs text-slate-400">
                  Adjusts <span className="text-white font-semibold">-N</span> scaling dynamically when Multi-Query
                  mode is active.
                </div>
              </div>
              <div className="md:col-span-8 rounded-xl border border-cyan-400/30 bg-slate-950/75 p-5 flex flex-col sm:flex-row gap-5 items-center">
                <div className="flex-1 space-y-2">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Computed Deduction</div>
                  <div id="token-meter-cost" className="font-mono-tabular text-2xl sm:text-3xl font-bold text-cyan-300">
                    {tokenCostDisplay.cost}
                  </div>
                  <p id="token-meter-explain" className="ae-prose text-sm text-slate-300 leading-relaxed">{tokenCostDisplay.explain}</p>
                </div>
                <div className="w-full sm:w-44 aspect-[16/10] rounded-lg overflow-hidden border border-slate-800 shrink-0 relative media-frame">
                  <ResilientImage
                    src={MEDIA.aiTokenMeter}
                    alt="Semantic TokenMeter usage economics telemetry"
                    loading="lazy"
                    accentColor="#00F0FF"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Strict Contest Lockout & Cloudflare Workers Zero-Secret Hosting */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="ae-bento-grid grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-rose-400/30">
              <div className="text-xs font-mono-tabular text-rose-300">
                07 · Contest Hard-Lock &amp; Find the Flaw Integrity
              </div>
              <h3 className="font-display text-xl font-bold text-white">Real-Time Session Isolation</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                The millisecond a participant enters any live rated round, QPRT-4 Guardians sever access to{' '}
                <span className="text-white font-semibold">Arithmo Personal AI</span> (Subsite #8) and{' '}
                <span className="text-white font-semibold">Arithmo Guild AI</span> (Subsite #9). Post-contest{' '}
                <span className="text-white font-semibold">Find the Flaw</span> audits trigger{' '}
                <span className="text-white font-semibold">2-min</span> SymPy Global Rejudges.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-emerald-400/30">
              <div className="text-xs font-mono-tabular text-emerald-300">07 · Zero GitHub Actions AI Latency</div>
              <h3 className="font-display text-xl font-bold text-white">Cloudflare Workers + Firebase Orchestration</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Zero raw Gemini or Qwen-Math keys touch GitHub Pages bundles. Every live inference call runs in real time
                over Cloudflare Workers + Firebase edge orchestration, keeping sub-second tutoring snappy while protecting
                secrets.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.aiLockout}
            alt="Real-time contest hard-lock isolation and Cloudflare Workers edge orchestration"
            kicker="Edge Isolation & Hard-Lock Shield"
            title="Zero-Leak Contest Cutoff & Cloudflare Workers Proxy"
            summary="QPRT-4 severs AI tutoring Subsites #8 and #9 the instant a rated clock starts while running zero-secret edge inference exclusively via Cloudflare Workers."
            accentColor="#F43F5E"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 8: GoldenVault Miner, Supreme Headquarters AI & AI FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Supreme Command, Golden Vault Ingestion & AI FAQ"
            title="GoldenVault Miner, Headquarters AI & Governance Guarantees"
          />

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border-amber-400/30">
              <div className="text-xs font-mono-tabular text-amber-300">GoldenVault Miner &amp; Headquarters AI</div>
              <h3 className="font-display text-xl font-bold text-white">
                Read-Only Schema v1.2 Vaults &amp; Sovereign Overlord AI
              </h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                <span className="text-white font-semibold">GoldenVault Miner</span> ingests Co-Founders&apos; private
                5&times;4 JSON vaults via Read-Only GitHub PAT + Cloudflare Worker Proxy under{' '}
                <span className="font-mono-tabular text-amber-300">Schema v1.2</span>. Above operational teams, the 1
                Supreme Command Overlord AI—<span className="text-white font-semibold">Headquarters AI</span> on{' '}
                <span className="text-white font-semibold">Subsite #12</span>—serves exclusively{' '}
                <span className="text-cyan-300">750+ Chief Arbiters</span> and{' '}
                <span className="text-amber-300">1000+ Prime Sovereigns</span>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="governance.html" className="btn-cyber px-4 py-2.5 text-xs">
                  Inspect Headquarters Hierarchy
                </a>
                <a href="pioneers.html" className="btn-glass px-4 py-2.5 text-xs">
                  Inspect Schema v1.2 Vault
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <FaqAccordion items={AI_FAQS} accentClass="text-emerald-300" />
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.aiHqVault}
            alt="GoldenVault Miner Schema v1.2 ingestion and Supreme Headquarters AI command"
            kicker="Schema v1.2 Vault & Sovereign Command"
            title="GoldenVault Miner & Subsite #12 Headquarters AI"
            summary="Read-only Cloudflare proxies ingest Co-Founders' private 5×4 Schema v1.2 Golden Vaults while Supreme Headquarters AI serves Chief Arbiters and Prime Sovereigns."
            accentColor="#F59E0B"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
