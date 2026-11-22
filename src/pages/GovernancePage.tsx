import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  CheckCircle2,
  Coffee,
  Crown,
  Lock,
  Scale,
  UserCheck,
  XCircle,
} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

type HqTierKey = 'sentinel' | 'architect' | 'coordinator' | 'arbiter' | 'sovereign';

interface HqTierSpec {
  key: HqTierKey;
  buttonLabel: string;
  buttonSub: string;
  subColor: string;
  title: string;
  elo: string;
  minElo: number;
  subscriptionGrant: string;
  perks: string;
  duties: string;
  authorityScope: string;
}

const HQ_TIERS: HqTierSpec[] = [
  {
    key: 'sentinel',
    buttonLabel: '1. Core Sentinel',
    buttonSub: '100+ HQ ELO · Free Plus',
    subColor: 'text-cyan-300',
    title: 'Core Sentinel',
    elo: '100+ HQ ELO',
    minElo: 100,
    subscriptionGrant: 'Free Plus ($2.99/mo value)',
    perks: 'Free Plus Subscription Perks ($2.99/mo value) + Full Rated Public Competing (Conflict-Free Rounds Only)',
    duties: 'Entry Headquarters stewardship, problem testing verification, and live round queue triage.',
    authorityScope: 'Live problemset QA & queue triage',
  },
  {
    key: 'architect',
    buttonLabel: '2. Problem Architect',
    buttonSub: '300+ HQ ELO · Free Pro',
    subColor: 'text-violet-300',
    title: 'Problem Architect',
    elo: '300+ HQ ELO',
    minElo: 300,
    subscriptionGrant: 'Free Pro ($5.99/mo value)',
    perks: 'Free Pro Subscription Perks ($5.99/mo value) + Full Rated Public Competing (Conflict-Free Rounds Only)',
    duties: 'Audits Forge submissions, enforces >75% AoPS similarity blocks, and validates SymPyVeritas checks.',
    authorityScope: 'Forge problem audit & SymPy validation',
  },
  {
    key: 'coordinator',
    buttonLabel: '3. Round Coordinator',
    buttonSub: '500+ HQ ELO · Free Pro+',
    subColor: 'text-emerald-300',
    title: 'Round Coordinator',
    elo: '500+ HQ ELO',
    minElo: 500,
    subscriptionGrant: 'Free Pro+ Priority Suite',
    perks: 'Free Pro+ Perks + Priority Coordination Tools + Rated Public Competing (Conflict-Free Rounds Only)',
    duties: 'Operates T-30s Pre-Match Contract Page, handles live clarifications, and authorizes 30s reserve hot-swaps.',
    authorityScope: 'Live contest ops & reserve hot-swap',
  },
  {
    key: 'arbiter',
    buttonLabel: '4. Chief Arbiter',
    buttonSub: '750+ HQ ELO · Singularity + HQ AI',
    subColor: 'text-amber-300',
    title: 'Chief Arbiter',
    elo: '750+ HQ ELO',
    minElo: 750,
    subscriptionGrant: 'Free Singularity ($12.99/mo) + HQ AI',
    perks: 'Free Singularity Subscription Perks ($12.99/mo value) + Headquarters AI Access + Rated Public Competing',
    duties: 'Chairs 4-Step Forensic Appeals, conducts 5-min Live Skill Audits, and queries Supreme Headquarters AI.',
    authorityScope: '4-Step Forensic Appeals & Supreme HQ AI',
  },
  {
    key: 'sovereign',
    buttonLabel: '5. Prime Sovereign (Top 3)',
    buttonSub: '1000+ HQ ELO · All Unlimited',
    subColor: 'text-rose-300',
    title: 'Prime Sovereign',
    elo: '1000+ HQ ELO (Top 3 · Flag-Immune)',
    minElo: 1000,
    subscriptionGrant: '100% Unlimited All Plans & Packs + HQ AI',
    perks: '100% UNLIMITED Free Access to ALL Paid & Pay-As-You-Go Features + Supreme Headquarters AI',
    duties: 'Final constitutional governance, Prime Sovereign Certificate endorsements, and Strict Positional Chronology oversight.',
    authorityScope: 'Constitutional quorum & induction certification',
  },
];

interface ConflictScenario {
  id: string;
  label: string;
  roundName: string;
  involvement: string;
  canCompeteRated: boolean;
  reason: string;
}

const CONFLICT_SCENARIOS: ConflictScenario[] = [
  {
    id: 'unrelated-mega',
    label: 'Sunday Mega Arena #48',
    roundName: 'Sunday Mega Arena #48 (Golden Vault Curated)',
    involvement: 'No authoring, auditing, or test-solving touchpoint',
    canCompeteRated: true,
    reason:
      'Conflict-free round: Under HQ Competitor Privilege, the HQ officer enters with full public rated ELO rights and QPRT-4 lockdown identical to any normal contestant.',
  },
  {
    id: 'authored-warmup',
    label: 'BdMO Warm-Up Round (Author)',
    roundName: 'BdMO Warm-Up Championship — Higher Secondary',
    involvement: 'Authored Question #3 via Arithmo Forge',
    canCompeteRated: false,
    reason:
      'Automatic Contest Lockout triggered: Authoring any problem in the round seals rated registration and shifts the HQ member into Observer / Clarification Desk mode.',
  },
  {
    id: 'tested-tuesday',
    label: 'Tuesday Algebra Sprint (Tester)',
    roundName: 'Tuesday Algebra Expert Round (17:00 UTC)',
    involvement: 'Test-solved problem set at T-48h for SymPy difficulty calibration',
    canCompeteRated: false,
    reason:
      'Automatic Contest Lockout triggered: Pre-contest test-solvers possess prior problem knowledge and are blocked from rated entry for that specific round.',
  },
  {
    id: 'peer-audit',
    label: 'Thursday Combinatorics (Uninvolved)',
    roundName: 'Thursday Combinatorics General + Expert',
    involvement: 'Audited Friday Mixed instead; zero access to Thursday vault',
    canCompeteRated: true,
    reason:
      'Conflict-free round: Cloudflare Worker vault permissions isolate per-round access tokens, preserving full rated competing eligibility on Thursday.',
  },
];

const PATRON_TIERS = [
  {
    id: 'coffee',
    amount: '$5',
    title: 'Domain & DNS Steward',
    allocation: 'Covers 1 month of custom .com DNS + Cloudflare edge routing overhead for free arenas.',
    eloBoost: '0 ELO',
    perk: 'Name & @handle permanently inscribed on Wall of Patrons',
  },
  {
    id: 'worker',
    amount: '$15',
    title: 'SymPy Sandbox Sponsor',
    allocation: 'Funds ~1,200 stateless Python/SymPy deterministic grading calls for unpaid student rounds.',
    eloBoost: '0 ELO',
    perk: 'Wall of Patrons inscription + transparent infrastructure ledger receipt',
  },
  {
    id: 'fellow',
    amount: '$50',
    title: 'Olympiad Fellowship Patron',
    allocation: 'Sponsors 15 underserved Olympiad students with contest backup infrastructure & printable guidebooks.',
    eloBoost: '0 ELO',
    perk: 'Featured Fellowship Patron entry (zero moderation or competitive authority)',
  },
];

const GOVERNANCE_FAQS = [
  {
    q: 'Can any user buy HQ ELO, moderation authority, or Prime Sovereign seats?',
    a: 'No. Subscriptions, AI Token Packs, and Wall of Patrons contributions grant strictly 0 HQ ELO, 0 public ELO, and 0 moderation authority. HQ roles are earned exclusively through audited mathematical contributions, test-solving rigor, and Prime Sovereign Certificates.',
  },
  {
    q: 'What is Strict Positional Chronology on the HQ board?',
    a: 'Advancing to any higher HQ tier requires BOTH reaching the target HQ ELO bracket AND manual Prime Sovereign Certificate endorsement. Under Strict Positional Chronology, a lower-ranked HQ member never overtakes a senior higher-ranked member on the HQ hierarchy even if their raw HQ ELO surpasses the senior member’s score.',
  },
  {
    q: 'Can Headquarters staff still compete for Top 128 World Cup and rated arena titles?',
    a: 'Yes, via HQ Competitor Privilege. Any HQ member can compete as a regular rated contestant in all public matches and World Cup qualifiers except in the specific rounds they authored, audited, or test-solved.',
  },
  {
    q: 'Who accesses the Supreme Headquarters AI?',
    a: 'Supreme Headquarters AI is restricted strictly to verified 750+ HQ ELO Chief Arbiters and Top 3 Prime Sovereigns inside the isolated arithmo-edge.github.io/hq-core/ war-room to assist with 4-Step Forensic Appeals and vault integrity audits.',
  },
];

export const GovernancePage: React.FC = () => {
  const [activeTierKey, setActiveTierKey] = useState<HqTierKey>('sentinel');
  const [contribElo, setContribElo] = useState<number>(240);
  const [cleanStreak, setCleanStreak] = useState<number>(6);
  const [certSigned, setCertSigned] = useState<boolean>(true);
  const [userConsent, setUserConsent] = useState<boolean>(true);
  const [directProdigyMode, setDirectProdigyMode] = useState<boolean>(false);

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CONFLICT_SCENARIOS[0].id);
  const [selectedPatronId, setSelectedPatronId] = useState<string>(PATRON_TIERS[0].id);
  const [patronFilter, setPatronFilter] = useState<'all' | 'founders' | 'cohort'>('all');

  const activeTier = HQ_TIERS.find((t) => t.key === activeTierKey) || HQ_TIERS[0];
  const activeScenario = CONFLICT_SCENARIOS.find((s) => s.id === selectedScenarioId) || CONFLICT_SCENARIOS[0];
  const activePatron = PATRON_TIERS.find((p) => p.id === selectedPatronId) || PATRON_TIERS[0];

  const standardEligible = contribElo >= 200 && cleanStreak >= 6 && certSigned && userConsent;
  const inductionApproved = standardEligible || (directProdigyMode && certSigned && userConsent);

  const sovereignRows = [
    {
      handle: '@rayaantasnim',
      elo: '1000+ (Founder)',
      title: 'Core System Architect',
      kind: 'founders',
      accent: 'text-cyan-300',
    },
    {
      handle: '@jaleeshabib',
      elo: '1000+ (Co-Founder)',
      title: 'Chief Mathematical Architect',
      kind: 'founders',
      accent: 'text-violet-300',
    },
    {
      handle: '@sovereign-seat-01',
      elo: '1000+ (Launch Cohort)',
      title: 'Honorary Prime Sovereign',
      kind: 'cohort',
      accent: 'text-slate-200',
    },
  ];

  return (
    <>
      {/* Section 1: Headquarters Core War-Room & Supreme Headquarters AI */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#F59E0B" secondaryHex="#00F0FF" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-10">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · arithmo-edge.github.io/hq-core/ · Custom .com Domain in 2 Months
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Headquarters Governance &amp; Wall of Patrons
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Authority at Arithmo-Edge cannot be purchased with subscriptions or Patronage. Governance inside the{' '}
                  <span className="text-white font-semibold">Headquarters Core War-Room</span> is earned strictly along
                  the monotonic <span className="font-mono-tabular text-cyan-300">HQ ELO Ladder</span>—unlocking Plus,
                  Pro, Singularity, and Supreme <span className="text-white font-semibold">Headquarters AI</span>{' '}
                  through audited platform stewardship.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3">
                  <a href="#hq-ladder" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    Inspect 5-Tier HQ Ladder
                  </a>
                  <a href="#conflict-privilege" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    Test HQ Competitor Privilege
                  </a>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.govHero}
                    alt="Headquarters Core War-Room and constitutional governance"
                    loading="eager"
                    accentColor="#F59E0B"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-amber-300 mb-1">Supreme Headquarters AI</div>
                    <div className="font-display text-lg font-bold text-white">
                      Restricted to 750+ Chief Arbiters &amp; Top 3 Prime Sovereigns
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <HeroReveal delay={0.24}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-cyan-300">5 Monotonic Tiers</div>
                <div className="font-display text-lg font-bold text-white mt-1">100 → 1000+ HQ ELO</div>
                <div className="text-xs text-slate-400 mt-1">Earn Plus, Pro &amp; Singularity free via merit</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-violet-300">3-Gate Induction</div>
                <div className="font-display text-lg font-bold text-white mt-1">+200 Contrib + 6 Clean</div>
                <div className="text-xs text-slate-400 mt-1">100% trust score + Sovereign Certificate</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-emerald-300">Conflict-Free Privilege</div>
                <div className="font-display text-lg font-bold text-white mt-1">Full Rated Competing</div>
                <div className="text-xs text-slate-400 mt-1">Blocked only on authored/audited rounds</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs font-mono-tabular text-amber-300">Patronage Firewall</div>
                <div className="font-display text-lg font-bold text-white mt-1">0 ELO · 0 Authority</div>
                <div className="text-xs text-slate-400 mt-1">Cryptographic separation of wallet &amp; rank</div>
              </div>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Section 2: Pioneer Contributors & Reserved Titles */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Founding Constitutional Stewardship"
            title="Pioneer Contributors &amp; Reserved Titles"
            subtitle="Two permanent founding constitutional titles anchor the entire 14-portal federation with Guardian Financial Custodianship."
            action={
              <a href="pioneers.html" className="btn-cyber px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                View Full Pioneer Dossier →
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="ae-deep-grid grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 border-cyan-400/35 space-y-3">
              <div className="text-xs font-mono-tabular text-cyan-300">
                Founder &amp; Chief System Architect · Reserved Title: Core System Architect
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Rayaan Tasnim (13 Years Old)</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Architect behind the 14-website GitHub Pages federation, 42-AI engine routing, QPRT-4 ChronoVault,
                14-Point Legal Compliance Shield, and{' '}
                <span className="font-mono-tabular text-cyan-300">Arithmo-Core-SDK</span> (60% Equity Allocation ·
                1000+ HQ ELO).
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono-tabular text-slate-400">
                <span>@rayaantasnim</span>
                <span>·</span>
                <span>Prime Sovereign Quorum</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 sm:p-8 border-violet-400/35 space-y-3">
              <div className="text-xs font-mono-tabular text-violet-300">
                Co-Founder &amp; Chief Mathematical Engineer · Reserved Title: Chief Mathematical Architect
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Jalees Habib</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Co-architect of the 5 Core Arenas, zero-fragmentation taxonomy, SymPy verification rubrics, and the
                Co-Founders&apos; Private 5×4 Golden Vault problem standard (40% Equity Allocation · 24-month vesting ·
                1000+ HQ ELO).
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono-tabular text-slate-400">
                <span>@jaleeshabib</span>
                <span>·</span>
                <span>Prime Sovereign Quorum</span>
              </div>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.govPioneers}
            alt="Founding constitutional stewardship by Rayaan Tasnim and Jalees Habib"
            kicker="Founding Stewardship Charter"
            title="Core System Architect & Chief Mathematical Architect"
            summary="Constitutional roles anchor the 14-portal federation with strict 60%/40% equity vesting, Guardian Financial Custodianship, and Prime Sovereign oversight."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 3: Interactive 5-Tier Monotonic HQ Ladder */}
      <section id="hq-ladder" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Never Sold · Strictly Earned"
            title="Interactive 5-Tier Monotonic HQ Ladder"
            subtitle="Inspect each HQ tier to see the exact subscription value unlocked organically, public rated competition rights, and war-room responsibilities."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              {HQ_TIERS.map((tier) => {
                const isActive = activeTierKey === tier.key;
                return (
                  <button
                    key={tier.key}
                    type="button"
                    data-hq-tier={tier.key}
                    onClick={() => setActiveTierKey(tier.key)}
                    className={`w-full text-left spotlight-card rounded-xl p-4 flex items-center justify-between gap-3 transition-colors ${
                      isActive ? 'border-cyan-400 bg-cyan-400/10' : 'hover:border-slate-600'
                    }`}
                  >
                    <span className="font-display font-bold text-white text-sm">{tier.buttonLabel}</span>
                    <span className={`font-mono-tabular text-xs ${tier.subColor} text-right`}>{tier.buttonSub}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div id="hq-inspect-elo" className="text-xs font-mono-tabular text-cyan-300">{activeTier.elo}</div>
                    <h3 id="hq-inspect-title" className="font-display text-2xl sm:text-3xl font-bold text-white">{activeTier.title}</h3>
                  </div>
                  <div data-hq-grant="" className="rounded-xl border border-slate-700 bg-slate-950/90 px-3.5 py-2 text-xs font-mono-tabular text-amber-300">
                    {activeTier.subscriptionGrant}
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                  <div className="text-xs text-emerald-300 font-semibold mb-1">
                    Earned Platform &amp; Competitor Perks
                  </div>
                  <div id="hq-inspect-perks" className="text-sm text-white">{activeTier.perks}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4">
                  <div className="text-xs text-cyan-300 font-semibold mb-1">Governance &amp; War-Room Duties</div>
                  <p id="hq-inspect-duties" className="text-sm text-slate-300 leading-relaxed">{activeTier.duties}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                    <div className="text-slate-400 font-mono-tabular">Primary Scope</div>
                    <div data-hq-scope="" className="text-white font-semibold mt-1">{activeTier.authorityScope}</div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                    <div className="text-slate-400 font-mono-tabular">Chronology Lock</div>
                    <div className="text-white font-semibold mt-1">Requires Sovereign Certificate + Consent</div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[150px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.govHqLadder}
                    alt="5-Tier monotonic HQ governance architectural ladder"
                    loading="lazy"
                    accentColor="#F59E0B"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Interactive HQ Induction Protocol & Strict Positional Chronology Simulator */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Anti-Cronyism Promotion Safeguards"
            title="HQ Induction Protocol &amp; Strict Positional Chronology"
            subtitle="Test the 3-Gate Standard Induction requirements (+200 Contribution ELO, 6 clean rated matches, Sovereign Certificate + Consent) or rare Direct Sovereign Induction."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="hq-contrib-elo" className="text-slate-300 font-medium">
                      Gate 1: Audited Contribution ELO (Minimum +200)
                    </label>
                    <span data-ind-contrib-val="" className="font-mono-tabular text-cyan-300 font-bold">+{contribElo} ELO</span>
                  </div>
                  <input
                    id="hq-contrib-elo"
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    value={contribElo}
                    onChange={(e) => setContribElo(Number(e.target.value))}
                    className="w-full cyber-range"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="hq-clean-streak" className="text-slate-300 font-medium">
                      Gate 2: Consecutive Clean Rated Matches (100% Trust Score)
                    </label>
                    <span data-ind-streak-val="" className="font-mono-tabular text-emerald-300 font-bold">{cleanStreak} / 6 Matches</span>
                  </div>
                  <input
                    id="hq-clean-streak"
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={cleanStreak}
                    onChange={(e) => setCleanStreak(Number(e.target.value))}
                    className="w-full cyber-range"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/75 p-3 cursor-pointer">
                    <input
                      id="hq-cert-signed"
                      type="checkbox"
                      checked={certSigned}
                      onChange={(e) => setCertSigned(e.target.checked)}
                      className="accent-cyan-400 w-4 h-4"
                    />
                    <span className="text-slate-200">Gate 3a: Prime Sovereign Certificate Issued</span>
                  </label>
                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/75 p-3 cursor-pointer">
                    <input
                      id="hq-user-consent"
                      type="checkbox"
                      checked={userConsent}
                      onChange={(e) => setUserConsent(e.target.checked)}
                      className="accent-cyan-400 w-4 h-4"
                    />
                    <span className="text-slate-200">Gate 3b: Affirmative User Consent Signed</span>
                  </label>
                </div>

                <label className="flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5 text-xs text-amber-200 cursor-pointer">
                  <input
                    id="hq-direct-prodigy"
                    type="checkbox"
                    checked={directProdigyMode}
                    onChange={(e) => setDirectProdigyMode(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span>
                    Simulate Rare <strong>Direct Sovereign Induction</strong> (Extraordinary IMO/Putnam Prodigy Override
                    by Top 3 Prime Sovereigns)
                  </span>
                </label>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div
                  data-ind-box=""
                  className={`rounded-2xl border p-5 space-y-3 ${
                    inductionApproved
                      ? 'border-emerald-400/40 bg-emerald-500/10'
                      : 'border-amber-400/35 bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span data-ind-status-label="" className={inductionApproved ? 'text-emerald-300' : 'text-amber-300'}>
                      Induction Gate Evaluation
                    </span>
                    <span data-ind-status-badge="" className="text-white font-semibold">
                      {inductionApproved ? 'APPROVED FOR CORE SENTINEL (100 HQ ELO)' : 'PENDING GATE COMPLETION'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {inductionApproved ? (
                      <UserCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-6 h-6 text-amber-300 shrink-0" />
                    )}
                    <div data-ind-headline="" className="font-display text-lg font-bold text-white">
                      {directProdigyMode && !standardEligible && certSigned && userConsent
                        ? 'Direct Sovereign Induction Pathway Active'
                        : inductionApproved
                        ? 'All 3 Standard Gates Satisfied'
                        : 'Incomplete Standard Gate Checklist'}
                    </div>
                  </div>
                  <p data-ind-desc="" className="text-xs text-slate-200 leading-relaxed">
                    {inductionApproved
                      ? 'Candidate enters at Core Sentinel (100+ HQ ELO), unlocks Free Plus perks, and retains full conflict-free public competing eligibility.'
                      : 'Core Sentinel requires +200 Contribution ELO, 6 consecutive clean rated matches (100% trust score), an official Prime Sovereign Certificate, and affirmative user consent.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5 space-y-2.5">
                  <div className="text-xs font-mono-tabular text-violet-300">Strict Positional Chronology Rule</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Even if a newly inducted member accumulates higher raw HQ ELO (e.g., <span className="font-mono-tabular text-white">620 HQ ELO</span>)
                    than an earlier-inducted senior officer (<span className="font-mono-tabular text-white">540 HQ ELO</span>),
                    Strict Positional Chronology guarantees the junior member <span className="text-white font-semibold">never overtakes</span>{' '}
                    the senior member on the HQ command roster without dual Sovereign Certification.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 overflow-hidden aspect-[16/10] max-h-[155px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.govChronology}
                    alt="Strict Positional Chronology anti-cronyism induction verification vault"
                    loading="lazy"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: HQ Competitor Privilege (Conflict-Free Public Competing Matrix) */}
      <section id="conflict-privilege" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Fair-Play Recusal Telemetry"
            title="HQ Competitor Privilege &amp; Round Recusal Simulator"
            subtitle="Headquarters stewards never sacrifice their competitive career: they compete for full rated public ELO on every round except the exact problemsets they touched."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-2">
              {CONFLICT_SCENARIOS.map((sc) => {
                const active = sc.id === selectedScenarioId;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    data-conflict-btn={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    {sc.label}
                  </button>
                );
              })}
            </div>

            <div className="grid md:grid-cols-12 gap-5 items-stretch">
              <div className="md:col-span-5 rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
                <div className="text-xs font-mono-tabular text-slate-400">Selected Contest Environment</div>
                <div data-conflict-round="" className="font-display text-lg font-bold text-white">{activeScenario.roundName}</div>
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-xs text-slate-400 font-mono-tabular">HQ Pre-Match Touchpoint</div>
                  <div data-conflict-involve="" className="text-sm text-cyan-300 font-medium mt-1">{activeScenario.involvement}</div>
                </div>
              </div>

              <div
                data-conflict-box=""
                className={`md:col-span-7 rounded-xl border p-5 flex flex-col justify-between gap-3 ${
                  activeScenario.canCompeteRated
                    ? 'border-emerald-400/35 bg-emerald-500/10'
                    : 'border-rose-400/35 bg-rose-500/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {activeScenario.canCompeteRated ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span data-conflict-status="" className="font-display text-lg font-bold text-white">
                    {activeScenario.canCompeteRated
                      ? 'Clearance Granted · Full Rated Public Entry'
                      : 'Recusal Enforced · Rated Registration Sealed'}
                  </span>
                </div>
                <p data-conflict-reason="" className="text-sm text-slate-200 leading-relaxed">{activeScenario.reason}</p>
                <div className="text-xs font-mono-tabular text-slate-300">
                  Enforcement Layer: Cloudflare Worker Token Isolation + 100% Immutable Audit Log
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden grid md:grid-cols-12 items-stretch bg-slate-950/60">
              <div className="md:col-span-4 aspect-[16/10] md:aspect-auto min-h-[150px] relative media-frame">
                <ResilientImage
                  src={MEDIA.govPrivilege}
                  alt="HQ Competitor Privilege recusal isolation firewall"
                  loading="lazy"
                  accentColor="#10B981"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="md:col-span-8 p-5 flex flex-col justify-center space-y-1">
                <div className="text-xs font-mono-tabular text-emerald-300">Conflict-Free Competitive Fairness</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Officers retain full rated eligibility across all rounds they did not author, test-solve, or inspect,
                  backed by hardware-isolated Cloudflare Worker access scopes.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Honorary Prime Sovereign Council */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Lifetime Distinctions"
            title="Honorary Prime Sovereign Council"
            subtitle="Permanent recognition format (@handle | HQ ELO | Honorary Title) honoring architectural stewards and elite Olympiad problemsetters."
            action={
              <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                {(
                  [
                    {id: 'all', label: 'All Seats'},
                    {id: 'founders', label: 'Founding Architects'},
                    {id: 'cohort', label: '2026 Cohort'},
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-sov-filter={tab.id}
                    onClick={() => setPatronFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                      patronFilter === tab.id ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
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
          <div className="glass-panel rounded-2xl overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-3 bg-slate-950/90 border-b border-slate-800 px-5 py-3 text-xs font-mono-tabular text-slate-400">
                <div>@handle</div>
                <div>HQ ELO</div>
                <div>Honorary Title</div>
              </div>
              <div className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                {sovereignRows.map((row) => (
                  <div
                    key={row.handle}
                    data-sov-row=""
                    data-kind={row.kind}
                    className={`grid grid-cols-3 px-5 py-4 items-center gap-2${
                      patronFilter !== 'all' && row.kind !== patronFilter ? ' hidden' : ''
                    }`}
                  >
                    <span className={`font-mono-tabular font-semibold ${row.accent}`}>{row.handle}</span>
                    <span className="font-mono-tabular text-amber-300 font-semibold">{row.elo}</span>
                    <span className="text-white font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{row.title}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[155px] relative media-frame">
              <ResilientImage
                src={MEDIA.govSovereigns}
                alt="Honorary Prime Sovereign Council lifetime constitutional stewardship"
                loading="lazy"
                accentColor="#F59E0B"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-amber-300">Top 3 Prime Sovereign Quorum (1000+ HQ ELO)</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Governs constitutional amendments, Direct Sovereign Inductions, and Prime Sovereign Certificate
                endorsements without ever monetizing rank titles.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Wall of Patrons Accountability Ledger */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Buy Me a Coffee · Zero ELO Advantage Guarantee"
            title="Wall of Patrons Accountability Ledger"
            subtitle="Inspect how philanthropic support sustains free education infrastructure while remaining cryptographically walled off from ratings, hints, or moderation power."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-amber-400/35 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {PATRON_TIERS.map((tier) => {
                const active = tier.id === selectedPatronId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    data-gov-patron-btn={tier.id}
                    onClick={() => setSelectedPatronId(tier.id)}
                    className={`text-left rounded-2xl border p-5 transition-all space-y-2 ${
                      active
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-800 bg-slate-950/75 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="text-amber-300 font-bold">{tier.amount} Tier</span>
                      <span className="text-emerald-300">{tier.eloBoost}</span>
                    </div>
                    <div className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{tier.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{tier.allocation}</p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div data-gov-patron-title="" className="text-xs font-mono-tabular text-emerald-300">
                  Selected Ledger Allocation ({activePatron.amount} · {activePatron.title})
                </div>
                <div data-gov-patron-perk="" className="text-sm text-white font-semibold">{activePatron.perk}</div>
                <p className="text-xs text-slate-400">
                  Guarantee: <strong className="text-emerald-300">0 ELO points, 0 contest advantage, 0 moderation authority</strong>.
                </p>
              </div>
              <a href="pioneers.html" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                Open Wall of Patrons &amp; Support
              </a>
            </div>
            <div className="rounded-xl border border-slate-800 overflow-hidden grid md:grid-cols-12 items-stretch bg-slate-950/60">
              <div className="md:col-span-4 aspect-[16/10] md:aspect-auto min-h-[150px] relative media-frame">
                <ResilientImage
                  src={MEDIA.govPatrons}
                  alt="Wall of Patrons infrastructure ledger separated from ELO governance"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="md:col-span-8 p-5 flex flex-col justify-center space-y-1">
                <div className="text-xs font-mono-tabular text-emerald-300">Zero ELO · Zero Authority Patronage Firewall</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Philanthropic support directly underwrites custom .com DNS, SymPy workers, and free regional guidebooks
                  with a permanent zero-leverage guarantee.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Governance FAQ & Cross-Navigation */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Constitutional Safeguards FAQ"
            title="Headquarters &amp; Accountability Questions"
            action={
              <a href="security-qprt4.html" className="btn-glass px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
                Inspect QPRT-4 Security Charter
              </a>
            }
          />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <FaqAccordion items={GOVERNANCE_FAQS} accentClass="text-amber-300" />
            </div>
            <SpotlightCard className="lg:col-span-4 rounded-2xl p-6 space-y-4 border-cyan-400/30">
              <Scale className="w-6 h-6 text-cyan-300" />
              <h3 className="font-display text-lg font-bold text-white">Dual-Verified Stewardship</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every HQ promotion, contest recusal, and Patron receipt is auditable under our 14-Point Legal Shield and
                Guardian Financial Custodianship.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a href="pioneers.html" className="btn-cyber px-4 py-2.5 text-xs text-center whitespace-nowrap">
                  Meet the Founders &amp; Golden Vault
                </a>
                <a href="roadmap.html" className="btn-glass px-4 py-2.5 text-xs text-center whitespace-nowrap">
                  View Decimal Rollout &amp; Spin-Offs
                </a>
              </div>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.govFaq}
            alt="Headquarters constitutional accountability, conflict recusal, and Patron audits"
            kicker="Constitutional Governance FAQ"
            title="Zero-Leverage Patronage & Automatic Conflict Recusal"
            summary="Every HQ arbiter recuses automatically on authored contests while financial patronage remains cryptographically separated from ELO and match adjudication."
            accentColor="#F59E0B"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
