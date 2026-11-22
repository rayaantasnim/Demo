import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Award, CalendarClock, Lock, ShieldAlert, Trophy} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {DynamicCreditsPreview, FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

type ContestTab = 'general' | 'expert' | 'contract';
type FlawOption = 'valid-gap' | 'problem-flaw' | 'invalid-hack';
type BdmoCat = 'Primary' | 'Junior' | 'Secondary' | 'Higher Secondary';

const BDMO_CATS: Record<
  BdmoCat,
  {
    gradeSpan: string;
    focus: string;
    ratedMode: string;
    duration: string;
  }
> = {
  Primary: {
    gradeSpan: 'Grades 3–5 · National Foundation Track',
    focus: 'Parity, modular clock puzzles, combinatorial counting & clean divisibility proofs.',
    ratedMode: 'Default Expert-Only Rated (Zero ELO-Segment Fragmentation)',
    duration: '90 Minutes · Max 2 Subs/Q · T+2h Audit',
  },
  Junior: {
    gradeSpan: 'Grades 6–8 · Olympiad Emerging Track',
    focus: 'Angle chasing, Diophantine factorizations, functional substitutions & Pigeonhole bounds.',
    ratedMode: 'Default Expert-Only Rated (Categorized by Academic Division)',
    duration: '100 Minutes · Max 2 Subs/Q · T+2h Audit',
  },
  Secondary: {
    gradeSpan: 'Grades 9–10 · National Camp Track',
    focus: 'LTE, cyclic radical axes, Cauchy-Schwarz inequalities & extremal invariant constructions.',
    ratedMode: 'Default Expert-Only Rated + 2000+ Peer Review Eligible',
    duration: '120 Minutes · Max 2 Subs/Q · T+3h Audit',
  },
  'Higher Secondary': {
    gradeSpan: 'Grades 11–12 · IMO Selection Warm-Up Track',
    focus: 'Projective harmonic bundles, Vieta jumping, polynomial roots of unity & graph Turán bounds.',
    ratedMode: 'Default Expert-Only Rated · Golden Vault + Authored Audit',
    duration: '150 Minutes · Max 2 Subs/Q · T+3h Audit',
  },
};

const CONTEST_FAQS = [
  {
    q: 'What happens if fewer than 3 competitors register for a scheduled or warm-up round?',
    a: 'Under the Minimum 3-Competitor Quorum rule, any contest with fewer than 3 active contenders is cleanly Suspended before lock. Registered users suffer zero ELO or streak loss, and the sealed problem set is NEVER pushed to Arithmo Database or Virtual Gym—preserving 100% novelty for future rounds.',
  },
  {
    q: 'Why are Special Warm-Up Championships divided by Primary, Junior, Secondary, and Higher Secondary?',
    a: 'National preparation rounds like the BdMO Warm-Up Championship mirror authentic school Olympiad divisions rather than arbitrary ELO bands, defaulting to Expert-Only Rated proof competition across each age division.',
  },
  {
    q: 'What is enforced during Mandatory Live Rated Contest Full-Screen & App/Tab Lockdown?',
    a: 'During live rated sessions, new tabs, browser tab/app switches, split-screen views, clipboard copy-paste, and DevTools triggers are actively blocked—causing immediate integrity flag escalation and automatic submission or disqualification upon repeated breach.',
  },
];

export const ContestsPage: React.FC = () => {
  const [contestTab, setContestTab] = useState<ContestTab>('general');
  const [bdmoCategory, setBdmoCategory] = useState<BdmoCat>('Secondary');
  const [quorumCount, setQuorumCount] = useState<number>(2);
  const [numpadVal, setNumpadVal] = useState<string>('0');
  const [numpadStatus, setNumpadStatus] = useState<{text: string; cls: string}>({
    text: 'Ready for integer input',
    cls: 'text-xs text-slate-400 text-center',
  });
  const [selectedFlaw, setSelectedFlaw] = useState<FlawOption | null>(null);

  const handleNumpadKey = (key: string) => {
    if (key === 'CLR') {
      setNumpadVal('0');
      setNumpadStatus({text: 'Input cleared', cls: 'text-xs text-slate-400 text-center'});
    } else if (key === 'DEL') {
      setNumpadVal((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (key === 'SUBMIT') {
      if (numpadVal === '2026') {
        setNumpadStatus({
          text: 'Verified AC · Instant deterministic answer match!',
          cls: 'text-xs text-emerald-400 font-semibold text-center',
        });
      } else {
        setNumpadStatus({
          text: 'Incorrect integer · Routed to Second-Chance Overtime Loop',
          cls: 'text-xs text-amber-300 text-center',
        });
      }
    } else {
      setNumpadVal((prev) => (prev === '0' ? key : prev.length < 10 ? prev + key : prev));
    }
  };

  const flawFeedback =
    selectedFlaw === 'valid-gap'
      ? {
          cls: 'p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-sm text-emerald-200',
          content: (
            <>
              <strong>Opponent Proof Flaw Verified (+5 to +50 pts):</strong> Division by (<em>a &minus; b</em>) fails
              when <em>p</em> | (<em>a &minus; b</em>). Opponent submission loses credit for unhandled boundary case;
              auditor earns bonus ELO points.
            </>
          ),
        }
      : selectedFlaw === 'problem-flaw'
        ? {
            cls: 'p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-sm text-cyan-200',
            content: (
              <>
                <strong>Official Problem Flaw Confirmed (+25 to +100 pts):</strong> Counterexample <em>p</em> = 2,{' '}
                <em>a</em> = 3, <em>b</em> = 1 satisfies 2 | (9 &minus; 1). Triggers automatic <strong>2-minute</strong>{' '}
                SymPy Global Rejudge across all standings.
              </>
            ),
          }
        : selectedFlaw === 'invalid-hack'
          ? {
              cls: 'p-4 rounded-xl bg-rose-500/10 border border-rose-400/40 text-sm text-rose-200',
              content: (
                <>
                  <strong>False Hack Penalty (-10 pts):</strong> Prime factorization <em>p</em> | (<em>a</em> &minus;{' '}
                  <em>b</em>)(<em>a</em> + <em>b</em>) implies <em>p</em> | (<em>a</em> &minus; <em>b</em>) or{' '}
                  <em>p</em> | (<em>a</em> + <em>b</em>) holds by Euclid&apos;s Lemma. Deducts -10 points to prevent
                  spam challenges.
                </>
              ),
            }
          : null;

  return (
    <>
      {/* Section 1: Hero + 7-Day Zero-Rest Calendar */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#F59E0B" secondaryHex="#00F0FF" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-amber-300 font-medium">
                  01 · Subsite #6 · arithmo-edge.github.io/contests/ · Live &amp; Upcoming Contests Only
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Contest Engine, Warm-Ups &amp; Find the Flaw
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Strictly focused on <span className="text-white font-semibold">Live &amp; Upcoming Contests</span>{' '}
                  (while 1v1 and Bot zones live inside Subsites #1–#5), the Contest Engine operates a{' '}
                  <span className="text-white font-semibold">7-Day Zero-Rest Calendar</span>, Special Warm-Up
                  Championships, 3-Competitor Quorum seals, and Top 128 Annual World Cup brackets.
                </p>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.16} className="h-full">
                <div className="h-full min-h-[260px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group">
                  <ResilientImage
                    src={MEDIA.contestsHero}
                    alt="Global competitive mathematics Contest Engine stage"
                    loading="eager"
                    accentColor="#F59E0B"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs text-amber-300 font-mono-tabular">Sunday Mega Arena · NO Rest Day</div>
                    <p className="ae-prose text-sm text-slate-200 mt-1">
                      Core HQ authored · Default Expert Mode only · 100 min · 10 Qs · max 2 subs/Q · 2h Find the Flaw +
                      1h MBTS = T+3h finalization.
                    </p>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <ScrollReveal>
            <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-[#00F0FF]">Monday</div>
                <h2 className="font-display text-base font-bold text-white">Number Theory</h2>
                <p className="text-xs text-slate-300">17:00 UTC Expert (0+ ELO) · 20:00 UTC General</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-[#8B5CF6]">Tuesday</div>
                <h2 className="font-display text-base font-bold text-white">Algebra</h2>
                <p className="text-xs text-slate-300">17:00 UTC Expert (0+ ELO) · 20:00 UTC General</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-[#F59E0B]">Wednesday</div>
                <h2 className="font-display text-base font-bold text-white">Geometry</h2>
                <p className="text-xs text-slate-300">17:00 UTC Expert (0+ ELO) · 20:00 UTC General</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-[#10B981]">Thursday</div>
                <h2 className="font-display text-base font-bold text-white">Combinatorics &amp; Permutation</h2>
                <p className="text-xs text-slate-300">17:00 UTC Expert (0+ ELO) · 20:00 UTC General</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-[#F43F5E]">Friday</div>
                <h2 className="font-display text-base font-bold text-white">Mixed Mathematical Olympiad</h2>
                <p className="text-xs text-slate-300">17:00 UTC Expert (0+ ELO) · 20:00 UTC General</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5">
                <div className="font-mono-tabular text-xs text-cyan-300">Saturday · Special Theme Episodes</div>
                <h2 className="font-display text-base font-bold text-white">Rotating Olympiad Editions</h2>
                <p className="text-xs text-slate-300">
                  IMO Simulation · Number Theory Contest · Arithmo Special · Olympiad Challenge · Math Query
                </p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl p-5 space-y-1.5 border-rose-500/40 bg-rose-500/5 md:col-span-2">
                <div className="font-mono-tabular text-xs text-rose-400">Sunday · NO Rest Day</div>
                <h2 className="font-display text-base font-bold text-white">Sunday Mega Arena Contest</h2>
                <p className="text-xs text-slate-300">
                  Core HQ Authored · Expert Only · Mandatory Module 7 · T+3h Finalization
                </p>
              </SpotlightCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Custom-Scheduled Special & Warm-Up Contests (BdMO Warm-Up Championship) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Custom-Scheduled Human-Authored Special & Warm-Up Contests"
            title="BdMO Warm-Up Championship & Real Academic Divisions"
            subtitle="Beyond the 7-day calendar, Arithmo-Edge runs human-authored Warm-Up Championships segmented by real Olympiad school divisions (Primary, Junior, Secondary, Higher Secondary) instead of ELO bands—defaulting to Expert-Only Rated proof rounds."
          />

          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-400/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-300">
                  <CalendarClock className="w-4 h-4" />
                  <span>Featured Series · Default Expert-Only Rated</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  BdMO Warm-Up Championship Division Explorer
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Primary', 'Junior', 'Secondary', 'Higher Secondary'] as BdmoCat[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    data-bdmo-cat={cat}
                    onClick={() => setBdmoCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
                      bdmoCategory === cat
                        ? 'border-amber-400 bg-amber-400/15 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                <div className="text-slate-400 font-mono-tabular">Selected Olympiad Division</div>
                <div data-bdmo-title="" className="font-display text-base font-bold text-white">{bdmoCategory} Division</div>
                <div data-bdmo-span="" className="text-amber-300">{BDMO_CATS[bdmoCategory].gradeSpan}</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                <div className="text-slate-400 font-mono-tabular">Proof &amp; Curriculum Focus</div>
                <div data-bdmo-focus="" className="text-slate-200 leading-relaxed">{BDMO_CATS[bdmoCategory].focus}</div>
              </div>
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 space-y-1">
                <div className="text-emerald-300 font-mono-tabular">Rating &amp; Format Lock</div>
                <div data-bdmo-mode="" className="text-white font-semibold">{BDMO_CATS[bdmoCategory].ratedMode}</div>
                <div data-bdmo-dur="" className="text-slate-300">{BDMO_CATS[bdmoCategory].duration}</div>
              </div>
            </div>
            <div className="rounded-xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch bg-slate-950/60">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
                <ResilientImage
                  src={MEDIA.contestsBdmo}
                  alt="BdMO Warm-Up Championship academic Olympiad divisions"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-8 p-5 flex flex-col justify-center space-y-1.5">
                <div className="text-xs font-mono-tabular text-amber-300">
                  Human-Authored Special Warm-Up Championship
                </div>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tailored to authentic regional and international Olympiad age tiers—preserving strict Expert-Only Rated
                  discipline across Primary through Higher Secondary cohorts.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Minimum 3-Competitor Quorum (< 3 = Suspended Round) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Integrity Threshold & Uncontaminated Question Sealing"
            title="Minimum 3-Competitor Quorum & Suspended Round Shield"
            subtitle="Test how Arithmo-Edge handles low-turnout special rounds without punishing registered solvers or leaking sealed Golden Vault problems."
          />

          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="quorum-slider" className="text-slate-300 font-medium">
                  Registered Competitors at T-0 Launch
                </label>
                <span data-quorum-count="" className="font-mono-tabular text-lg font-bold text-cyan-300">{quorumCount} Users</span>
              </div>
              <input
                id="quorum-slider"
                type="range"
                min={0}
                max={20}
                value={quorumCount}
                onChange={(e) => setQuorumCount(Number(e.target.value))}
                className="w-full cyber-range"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-slate-400">
                <span>0 (Empty)</span>
                <span>2 (Below Quorum)</span>
                <span>3+ (Active Launch)</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                data-quorum-suspended=""
                className={`rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 space-y-2${
                  quorumCount < 3 ? '' : ' hidden'
                }`}
              >
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>ROUND SUSPENDED (&lt; 3 Competitors)</span>
                </div>
                <p className="ae-prose text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong>Zero ELO or Streak Loss:</strong> Registered competitors keep 100% of their ELO and daily
                  streaks. Crucially, the unused problem set is{' '}
                  <span className="text-white font-semibold underline">
                    NEVER leaked to Arithmo Database or Virtual Gym
                  </span>{' '}
                  and stays cryptographically sealed for a future contest.
                </p>
              </div>
              <div
                data-quorum-active=""
                className={`rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-5 space-y-2${
                  quorumCount >= 3 ? '' : ' hidden'
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>
                    QUORUM MET (<span data-quorum-count-inline="">{quorumCount}</span> Competitors) — RATED LAUNCH AUTHORIZED
                  </span>
                </div>
                <p className="ae-prose text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Minimum 3-competitor quorum satisfied. T-30s Contract unlocks authorship credentials, Full-Screen
                  Lockdown engages, and post-round archives publish cleanly to Virtual Gym &amp; Arithmo Database.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
              <ResilientImage
                src={MEDIA.contestsQuorum}
                alt="Cryptographic 3-competitor quorum seal preserving uncontaminated Golden Vault problems"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">Zero-Leak Contest Problem Preservation</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Any round falling under the 3-competitor quorum never reveals its Golden Vault items to Virtual Gym or
                Arithmo Database—protecting problemsetters&apos; originality and registered contestants&apos; ratings.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Interactive 3-Mode Dynamic Contest Dashboard Footer Credits */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Authorship Transparency & Flexible Credit Engine"
            title="Interactive 3-Mode Dynamic Contest Footer Credits"
            subtitle="Depending on whether a round is human-authored, drawn from Core HQ Golden Vaults, or generated autonomously by AI engines, the Contest Dashboard dynamically renders exact attribution."
          />
          <DynamicCreditsPreview />
          <CyberMediaFrame
            src={MEDIA.contestsCredits}
            alt="Dynamic 3-mode contest attribution footer credits for human, HQ, and AI rounds"
            kicker="Transparent Authorship Attribution"
            title="Live Footer Credits for Human, Core HQ & Autonomous Rounds"
            summary="Every contest footer renders verified Problemsetter, Auditor, and Tester @handles—preserving attribution clarity across human-authored specials and autonomous daily sprints."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 5: Multi-Stage Registration & T-30s Pre-Match Contract */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Deterministic Round Admission & T-30s Contract"
            title="Three-Stage Launch Lifecycle & Authorship Verification"
          />
          <div className="ae-bento-grid ae-bento-grid-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="font-mono-tabular text-xs text-cyan-300">Stage 1 · Pre-Registration &amp; Mode Select</div>
              <h3 className="font-display text-lg font-bold text-white">4-Segment Contract Binding</h3>
              <p className="ae-prose text-sm text-slate-300">
                Competitors register with a <code className="font-mono-tabular text-cyan-300">@handle</code> (Rated) or
                enter as Unrated Guests (0 ELO), selecting General Velocity Flow or Expert 4-Segment Proof tracks.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="font-mono-tabular text-xs text-amber-300">Stage 2 · T-30s Contract Lock</div>
              <h3 className="font-display text-lg font-bold text-white">Names &amp; @handles Attribution</h3>
              <p className="ae-prose text-sm text-slate-300">
                Opens 30 seconds before launch displaying round rules + Problemsetters, Auditors, and Testers alongside
                full-screen lockdown consent.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-2">
              <div className="font-mono-tabular text-xs text-emerald-300">Stage 3 · T-0 Live Launch</div>
              <h3 className="font-display text-lg font-bold text-white">AI Hard-Lock &amp; App Lockdown</h3>
              <p className="ae-prose text-sm text-slate-300">
                Subsite #8 hard-locks automatically; Mandatory Full-Screen &amp; App/Tab Lockdown + IndexedDB offline
                vault activate across the session.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.contestsLifecycle}
            alt="Three-stage registration, T-30s contract lock, and T-0 full-screen launch"
            kicker="Deterministic Admission Lifecycle"
            title="Pre-Registration → T-30s Contract → T-0 Lockdown"
            summary="Structured transition gates verify handle standing, publish authorship credits 30 seconds before lock, and engage IndexedDB offline resilience at T-0."
            accentColor="#8B5CF6"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 6: General Mode Velocity Flow vs Expert 3-Column Dashboard Switcher */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-cyan-300 font-medium">06 · Interactive Dual-Mode Interface Switcher</p>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  General Velocity Flow vs. Expert 3-Column Toph-Style Dashboard
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                {(
                  [
                    {id: 'general', label: 'General Velocity Flow'},
                    {id: 'expert', label: 'Expert 3-Column Dashboard'},
                    {id: 'contract', label: 'T-30s Pre-Match Contract'},
                  ] as const
                ).map((tab) => {
                  const active = contestTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-contest-tab={tab.id}
                      onClick={() => setContestTab(tab.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                        active ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              data-contest-panel="general"
              className={`grid lg:grid-cols-12 gap-8 items-start${contestTab === 'general' ? '' : ' hidden'}`}
            >
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display text-xl font-bold text-white">
                  General Velocity Flow + Overtime Loop + Zen Focus Mode
                </h3>
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  Single-problem sequential interface engineered for rapid arithmetic and Olympiad computation.
                  Missed items enter the <span className="text-white font-medium">Second-Chance Overtime Loop</span>
                  , paired with a native <span className="text-white font-medium">Mobile Touch Numpad</span> and
                  distraction-free <span className="text-white font-medium">Zen Focus Mode</span>.
                </p>
                <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="text-cyan-300 font-semibold">
                    Sample Problem (Enter 2026 on the Touch Numpad):
                  </div>
                  <p>
                    Find the smallest positive integer <span className="font-mono-tabular text-white">n &gt; 2025</span>{' '}
                    such that <span className="font-mono-tabular text-white">gcd(n, 2026) = 2026</span>.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-sm mx-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Mobile Touch Numpad</span>
                    <span>Zen Focus Ready</span>
                  </div>
                  <div
                    id="general-numpad-display"
                    className="font-mono-tabular text-2xl font-bold text-right px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300"
                  >
                    {numpadVal}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'DEL'].map((k) => (
                      <button
                        key={k}
                        type="button"
                        data-numpad-key={k}
                        onClick={() => handleNumpadKey(k)}
                        className={`btn-glass py-3 ${
                          k === 'CLR'
                            ? 'text-xs text-rose-300'
                            : k === 'DEL'
                              ? 'text-xs text-amber-300'
                              : 'font-mono-tabular text-base'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    data-numpad-key="SUBMIT"
                    onClick={() => handleNumpadKey('SUBMIT')}
                    className="btn-cyber w-full py-2.5 text-sm"
                  >
                    Submit General Answer
                  </button>
                  <div id="general-numpad-status" className={numpadStatus.cls}>{numpadStatus.text}</div>
                </div>
              </div>
            </div>

            <div
              data-contest-panel="expert"
              className={`space-y-6${contestTab === 'expert' ? '' : ' hidden'}`}
            >
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-tabular text-cyan-400">
                    Column 1 · Problem List &amp; Clarifications
                  </div>
                  <h4 className="font-display font-bold text-white">4-Segment Contract Navigation</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex justify-between">
                      <span>Segment 1 · Foundational</span>
                      <span className="font-mono-tabular text-emerald-400">Max 2 Subs</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Segment 2 · Intermediate</span>
                      <span className="font-mono-tabular text-emerald-400">Max 2 Subs</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Segment 3 · Advanced Proof</span>
                      <span className="font-mono-tabular text-amber-300">Peer Review</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Segment 4 · Grandmaster</span>
                      <span className="font-mono-tabular text-rose-300">Proof-Based</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-tabular text-violet-400">
                    Column 2 · Statement &amp; GeoGebra Tool
                  </div>
                  <h4 className="font-display font-bold text-white">Zero-Fragmentation Statement View</h4>
                  <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                    Topic tags remain hidden. Geometry problems embed an interactive GeoGebra-style Geometry
                    canvas.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-tabular text-amber-400">
                    Column 3 · Drag-and-Drop LaTeX Editor
                  </div>
                  <h4 className="font-display font-bold text-white">Proof-Based Grading + Peer Review</h4>
                  <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                    Compose structured proofs using Drag-and-Drop LaTeX blocks with max 2 submissions per problem.
                  </p>
                </div>
              </div>
            </div>

            <div data-contest-panel="contract" className={contestTab === 'contract' ? '' : 'hidden'}>
              <div className="p-6 rounded-xl bg-slate-950/85 border border-cyan-400/30 space-y-4 max-w-3xl">
                <div className="flex items-center justify-between text-xs text-cyan-300">
                  <span>T-30s Pre-Match Contract Page</span>
                  <span className="font-mono-tabular">Opens 30s Before Lock</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">Verified Authorship Attribution</h3>
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  Displays ONLY Names &amp; <code className="font-mono-tabular text-cyan-300">@handles</code> of
                  Problemsetters, Auditors, and Testers alongside round segment rules and mandatory Full-Screen
                  Lockdown terms.
                </p>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.contestsDualMode}
            alt="General Velocity Flow and Expert 3-column Olympiad proof workspace"
            kicker="Dual-Mode Interface Telemetry"
            title="Zero-Latency General Flow & Toph-Style Expert Workspace"
            summary="General runners sweep sequential tasks on touch numpads while Expert contenders draft multi-lemma LaTeX proofs alongside embedded geometry tools."
            accentColor="#10B981"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 7: Interactive Find the Flaw Proof-Audit Demo */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs text-rose-300 font-medium mb-1">
                  07 · Post-Contest Hacking (6h Daily / 2h Sunday Mega)
                </p>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  Interactive <span className="text-cyan-300">Find the Flaw</span> Proof-Audit Demo
                </h2>
              </div>
              <span className="font-mono-tabular text-xs text-slate-400">
                Guests without @handle can participate too
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/85 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">
                Target Proof Snippet Under Audit (Expert Segment 3 · Number Theory)
              </div>
              <p className="font-mono-tabular text-sm text-slate-200 leading-relaxed">
                &ldquo;Let <em>p</em> be a prime dividing <em>a</em>² &minus; <em>b</em>². Assuming <em>a</em> &minus;{' '}
                <em>b</em> &ne; 0, we divide both sides by (<em>a</em> &minus; <em>b</em>) in &Zopf;
                <sub>
                  <em>p</em>
                </sub>{' '}
                to deduce <em>p</em> | (<em>a</em> + <em>b</em>), and claim <em>p</em> must be odd for all primes{' '}
                <em>p</em>.&rdquo;
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                type="button"
                data-flaw-option="valid-gap"
                onClick={() => setSelectedFlaw('valid-gap')}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedFlaw === 'valid-gap'
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-cyan-400/50'
                }`}
              >
                <div className="text-xs font-mono-tabular text-emerald-400">Opponent Hack (+5 to +50 pts)</div>
                <div className="font-semibold text-white text-sm mt-1">
                  Expose Division by Zero Case (a = b mod p)
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Audit opponent submission for unhandled <em>a</em> &equiv; <em>b</em> (mod <em>p</em>) branch.
                </div>
              </button>
              <button
                type="button"
                data-flaw-option="problem-flaw"
                onClick={() => setSelectedFlaw('problem-flaw')}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedFlaw === 'problem-flaw'
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-cyan-400/50'
                }`}
              >
                <div className="text-xs font-mono-tabular text-cyan-400">Official Problem Flaw (+25 to +100 pts)</div>
                <div className="font-semibold text-white text-sm mt-1">Submit Counterexample p = 2</div>
                <div className="text-xs text-slate-400 mt-1">
                  Triggers 2-min SymPy Global Rejudge across the entire contest standing.
                </div>
              </button>
              <button
                type="button"
                data-flaw-option="invalid-hack"
                onClick={() => setSelectedFlaw('invalid-hack')}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedFlaw === 'invalid-hack'
                    ? 'border-rose-400 bg-rose-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-rose-400/50'
                }`}
              >
                <div className="text-xs font-mono-tabular text-rose-400">False Claim (-10 pts Penalty)</div>
                <div className="font-semibold text-white text-sm mt-1">Challenge Valid Prime Factorization</div>
                <div className="text-xs text-slate-400 mt-1">Test unsuccessful hack penalty enforcement.</div>
              </button>
            </div>

            <div
              id="flaw-audit-result"
              className={
                flawFeedback
                  ? flawFeedback.cls
                  : 'p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-300'
              }
            >
              {flawFeedback ? (
                flawFeedback.content
              ) : (
                <>
                  Select an audit action above to simulate the{' '}
                  <span className="text-white font-medium">Find the Flaw</span> resolution engine.
                </>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden grid md:grid-cols-12 items-stretch bg-slate-950/60">
              <div className="md:col-span-4 aspect-[16/10] md:aspect-auto min-h-[155px] relative media-frame">
                <ResilientImage
                  src={MEDIA.contestsFlaw}
                  alt="Post-contest Find the Flaw proof audit and SymPy global rejudge window"
                  loading="lazy"
                  accentColor="#F43F5E"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
              </div>
              <div className="md:col-span-8 p-5 flex flex-col justify-center space-y-1">
                <div className="text-xs font-mono-tabular text-rose-300">Adversarial Proof Peer-Hacking</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unverified proof steps, missing boundary branches, or flawed problem statements face deterministic
                  verification and transparent T+2h/T+3h standing finalization.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </section>

      {/* Section 8: Proof-Based Grading, 2000+ Peer Review & LaTeX + GeoGebra Studio */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Proof-Based Grading + 2000+ ELO Peer Review & Native Authoring"
            title="Hybrid ProofGrader AI, Drag-and-Drop LaTeX & GeoGebra Studio"
          />
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <SpotlightCard className="lg:col-span-5 rounded-2xl overflow-hidden flex flex-col">
              <div className="h-52 media-frame">
                <ResilientImage
                  src={MEDIA.contestsToph}
                  alt="GeoGebra Geometry construction and LaTeX proof editor"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
              </div>
              <div className="p-6 flex-1 space-y-2">
                <div className="text-xs font-mono-tabular text-amber-300">Expert Column 2 &amp; 3 Workbench</div>
                <h3 className="font-display text-lg font-bold text-white">
                  Zero External Tools Required
                </h3>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Construct circumcircles, radical axes, and inversions directly in Expert Column 2&apos;s GeoGebra-style
                  canvas while assembling modular congruence &amp; induction blocks in Column 3&apos;s Drag-and-Drop
                  LaTeX editor.
                </p>
              </div>
            </SpotlightCard>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <SpotlightCard className="rounded-2xl p-6 space-y-2">
                <div className="text-xs font-mono-tabular text-cyan-300">Max 2 Submissions/Q</div>
                <h3 className="font-display text-base font-bold text-white">Anti-Guessing Proof Discipline</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  Capping submissions at 2 per Expert problem enforces authentic IMO scratchpad verification before
                  final proof submission.
                </p>
              </SpotlightCard>
              <SpotlightCard className="rounded-2xl p-6 space-y-2">
                <div className="text-xs font-mono-tabular text-emerald-300">2000+ ELO Sentinels</div>
                <h3 className="font-display text-base font-bold text-white">Blind Peer Calibration</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  Qualified 2000+ ELO reviewers audit anonymized Expert Segments 1–2 jointly with ProofGrader AI for
                  Contribution ELO.
                </p>
              </SpotlightCard>
              <SpotlightCard className="rounded-2xl p-6 space-y-2 sm:col-span-2">
                <div className="text-xs font-mono-tabular text-violet-300">IndexedDB Keystroke Recovery</div>
                <h3 className="font-display text-base font-bold text-white">Millisecond Local Auto-Save</h3>
                <p className="ae-prose text-xs text-slate-300 leading-relaxed">
                  Every LaTeX lemma and GeoGebra construction point persists locally in IndexedDB so temporary ISP drops
                  never erase competition progress.
                </p>
              </SpotlightCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 9: Virtual Gym, Top 128 World Cup & Contest FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="09 · Virtual Gym, Top 128 Annual World Cup (👑) & FAQ"
            title="Historical Replay & Global Half-Elimination Crown Bracket"
          />
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <SpotlightCard className="rounded-2xl p-6 space-y-3">
                <div className="text-xs font-mono-tabular text-violet-300">Virtual Gym (#/Virtual)</div>
                <h3 className="font-display text-xl font-bold text-white">Ghost Leaderboard Simulation</h3>
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  Replay any concluded round (with quorum ≥ 3) under identical 100-minute constraints. Your run
                  interleaves live with a <span className="font-mono-tabular text-violet-300">#/Virtual</span> ghost
                  badge and projects rating delta without modifying historical official standings.
                </p>
              </SpotlightCard>
              <SpotlightCard className="rounded-2xl overflow-hidden border-amber-400/35">
                <div className="h-44 relative media-frame">
                  <ResilientImage
                    src={MEDIA.contestsWorldCup}
                    alt="Top 128 Annual World Cup Golden Crown half-elimination championship stage"
                    loading="lazy"
                    accentColor="#F59E0B"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-xs font-mono-tabular text-amber-300">
                    Top 128 Annual World Cup (👑) · Mandatory Module 7
                  </div>
                </div>
                <div className="p-6 space-y-2.5">
                  <h3 className="font-display text-xl font-bold text-white">6-Round Progressive Half-Elimination</h3>
                  <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                    The top 128 All-Rounder &amp; Mixed Olympiad contenders battle across 6 Progressive Half-Elimination
                    brackets (
                    <code className="font-mono-tabular text-amber-200">
                      128 &rarr; 64 &rarr; 32 &rarr; 16 &rarr; 8 &rarr; 4 &rarr; Champion
                    </code>
                    ) under mandatory Module 7 + Full-Screen Lockdown, awarding permanent{' '}
                    <span className="text-amber-300 font-semibold">👑 Golden Crowns</span>.
                  </p>
                </div>
              </SpotlightCard>
            </div>
            <div className="lg:col-span-6">
              <FaqAccordion items={CONTEST_FAQS} accentClass="text-amber-300" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
