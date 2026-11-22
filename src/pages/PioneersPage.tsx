import React, {useState} from 'react';
import {
  Coffee,
  Crown,
  FileCode2,
  Users,
} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {GoldenVaultInspector} from '../components/GoldenVaultInspector';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

const GENESIS_EVOLUTION = [
  {
    era: 'Pre-Era Origin',
    name: 'Prime-Factor.app',
    desc: 'Initial browser utilities for modular congruences, deterministic BigInt primality checks, and client-side number theory speed drills.',
    color: 'text-slate-300',
  },
  {
    era: 'Architectural Leap',
    name: 'Arithmo-Core-SDK (engine.js)',
    desc: 'Unified 14 federated GitHub Pages sites around zero-copy JSON schemas, Read-Shield edge caching, and Cloudflare Worker proxies.',
    color: 'text-cyan-300',
  },
  {
    era: 'Full Production Form',
    name: 'Arithmo-Edge (Olympiad Edge)',
    desc: 'Global 5-Arena real-time ELO platform with 60 titles, 42 AI engines, QPRT-4 security, and custom .com launch in 2 months.',
    color: 'text-amber-300',
  },
];

const PATRON_IMPACT_OPTIONS = [
  {
    id: 'coffee-5',
    amount: 5,
    label: '$5 · Edge Compute Coffee',
    detail: 'Covers ~400 stateless SymPy proof evaluations and helps keep Daily Mon–Sat rated rounds 100% Free Forever.',
  },
  {
    id: 'domain-20',
    amount: 20,
    label: '$20 · Custom .com & DNS Guardian',
    detail: 'Funds domain renewal and Cloudflare Edge security certificate overhead ahead of our custom .com launch in 2 months.',
  },
  {
    id: 'fellowship-50',
    amount: 50,
    label: '$50 · Olympiad Student Archive Sponsor',
    detail: 'Supports multi-month printable guidebook distribution and Subsite #13 historical Olympiad indexing for students worldwide.',
  },
];

const PIONEERS_FAQS = [
  {
    q: 'How did Prime-Factor.app evolve into Arithmo-Edge?',
    a: 'Arithmo-Edge began as Prime-Factor.app—lightweight client-side BigInt factorization and prime testing tools built by Rayaan Tasnim. Partnering with Jalees Habib, those client-compute primitives scaled into the 14-portal Olympiad Edge federation.',
  },
  {
    q: 'How are finances and legal agreements handled given Founder Rayaan Tasnim is 13 years old?',
    a: 'Under our Guardian Financial Custodianship framework inside the 14-Point Global & Bangladesh Legal Shield, all subscription revenues, Academy settlements, and Patron contributions sit in transparent Parent/Guardian fiduciary custody until statutory adulthood.',
  },
  {
    q: 'What is the Dual IP Boundary between open GitHub portals and Private Golden Vaults?',
    a: 'Our 14 GitHub Pages repositories openly showcase frontend engineering and architectural craft under github.com/Arithmo-Edge, while Private 5×4 Golden Vaults (Schema v1.2), Cloudflare Worker keys, and anti-cheat thresholds remain strictly confidential proprietary IP.',
  },
  {
    q: 'Does supporting the founders via Wall of Patrons give any rated advantage?',
    a: 'Never. Every Patron receipt carries a constitutional Zero ELO Advantage guarantee: 0 ELO points, 0 contest hints, and 0 moderation powers.',
  },
];

export const PioneersPage: React.FC = () => {
  const [vestingMonth, setVestingMonth] = useState<number>(12);
  const [selectedPatronOption, setSelectedPatronOption] = useState<string>(PATRON_IMPACT_OPTIONS[0].id);

  const rayaanPersonalVested = ((vestingMonth / 24) * 40).toFixed(1);
  const systemReserveHeld = ((vestingMonth / 24) * 20).toFixed(1);
  const jaleesPersonalVested = ((vestingMonth / 24) * 40).toFixed(1);
  const activePatronOption =
    PATRON_IMPACT_OPTIONS.find((p) => p.id === selectedPatronOption) || PATRON_IMPACT_OPTIONS[0];

  return (
    <>
      {/* Section 1: Pioneer Manifesto & Prime-Factor.app -> Arithmo-Edge Genesis Origin */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#8B5CF6" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-10">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · Prime-Factor.app Pre-Era &rarr; Arithmo-Edge Full Form · Custom .com in 2 Months
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">Pioneer Contributors</h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Arithmo-Edge was built from scratch by two young Olympiad architects determined to democratize
                  real-time ELO mathematics globally without Venture Capital corruption or pay-to-win shortcuts—hosted
                  on Free Forever GitHub Pages under{' '}
                  <span className="font-mono-tabular text-cyan-300">github.com/Arithmo-Edge</span> alongside our upcoming
                  custom <code className="font-mono-tabular text-cyan-300">.com</code> production launch in 2 months.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 text-xs font-mono-tabular text-slate-300 pt-1">
                  <span>60% / 40% Founders Equity</span>
                  <span aria-hidden="true">·</span>
                  <span>24-Month Vesting Schedule</span>
                  <span aria-hidden="true">·</span>
                  <span>Guardian Custodianship Shield</span>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.pionHero}
                    alt="Arithmo-Edge Pioneer Contributors founding architecture"
                    loading="eager"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">Powered by Olympiad Edge</div>
                    <div className="font-display text-lg font-bold text-white">
                      Built by Young Architects for the World
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <HeroReveal delay={0.24}>
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              {GENESIS_EVOLUTION.map((stage) => (
                <div key={stage.name} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1.5">
                  <div className={`text-xs font-mono-tabular ${stage.color}`}>{stage.era}</div>
                  <div className="font-display text-base font-bold text-white">{stage.name}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[150px] relative media-frame">
                <ResilientImage
                  src={MEDIA.pionPrimeFactor}
                  alt="Prime-Factor.app pre-era evolution into 14-portal Arithmo-Edge"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-8 p-5 flex flex-col justify-center space-y-1">
                <div className="text-xs font-mono-tabular text-cyan-300">Prime-Factor.app Pre-Era &rarr; Arithmo-Edge</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  From single-page browser primality checks to 14 synchronized competitive math portals backed by
                  Cloudflare Workers and Firebase.
                </p>
              </div>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Section 2: Founder Profile — Rayaan Tasnim */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border-cyan-400/35">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-tabular text-cyan-300">
                  02 · Founder &amp; Chief System Architect (13 Years Old)
                </div>
                <h2 className="section-title-fluid font-display font-bold text-white">Rayaan Tasnim</h2>
                <div className="space-y-1.5 text-xs font-mono-tabular">
                  <div className="text-slate-300">
                    Reserved Constitutional Title:{' '}
                    <span className="text-cyan-300 font-semibold">Core System Architect</span>
                  </div>
                  <div className="text-slate-300">
                    Equity Allocation:{' '}
                    <span className="text-emerald-400 font-semibold">60% Voting &amp; Economic Split</span>
                  </div>
                  <div className="text-slate-300">
                    Direct Contact:{' '}
                    <a href="mailto:rayaantasnim@gmail.com" className="text-cyan-400 hover:underline">
                      rayaantasnim@gmail.com
                    </a>
                  </div>
                  <div className="text-slate-300">
                    Organization Hub:{' '}
                    <a
                      href="https://github.com/Arithmo-Edge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      github.com/Arithmo-Edge
                    </a>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-cyan-400/25 aspect-[16/10] max-h-[160px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.pionRayaan}
                    alt="Rayaan Tasnim Core System Architect 14-portal engineering workspace"
                    loading="lazy"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                  Rayaan Tasnim conceived Olympiad Edge and designed the entire{' '}
                  <span className="text-white font-semibold">14-Website Federated Micro-Frontend Architecture</span>,{' '}
                  <span className="font-mono-tabular text-cyan-300">Arithmo-Core-SDK (engine.js)</span>, the{' '}
                  <span className="text-white font-semibold">42-Engine AI Orchestration Layer</span>,{' '}
                  <span className="text-white font-semibold">QPRT-4 Security Resilience</span>, Dual-Storage Hot
                  Firebase + Cold 24-hour Zero-PII Lake, and the{' '}
                  <span className="text-white font-semibold">
                    14-Point Global &amp; Bangladesh Legal Compliance Shield
                  </span>
                  .
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-cyan-300 font-semibold">Infrastructure</div>
                    <p className="text-slate-400 mt-1">
                      14 isolated GitHub Pages sites + Cloudflare Worker Edge Proxies.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-cyan-300 font-semibold">Security &amp; Law</div>
                    <p className="text-slate-400 mt-1">
                      QPRT-4 ChronoVault, 11-Flag Ladder, COPPA/GDPR-K &amp; DSA compliance.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-cyan-300 font-semibold">Client Compute</div>
                    <p className="text-slate-400 mt-1">
                      Zero-call BigInt Miller-Rabin &amp; Brent-Pollard&apos;s Rho factorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Co-Founder Profile — Jalees Habib */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border-violet-400/35">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-tabular text-violet-300">
                  03 · Co-Founder &amp; Chief Mathematical Engineer
                </div>
                <h2 className="section-title-fluid font-display font-bold text-white">Jalees Habib</h2>
                <div className="space-y-1.5 text-xs font-mono-tabular">
                  <div className="text-slate-300">
                    Reserved Constitutional Title:{' '}
                    <span className="text-violet-300 font-semibold">Chief Mathematical Architect</span>
                  </div>
                  <div className="text-slate-300">
                    Equity Allocation:{' '}
                    <span className="text-emerald-400 font-semibold">40% Co-Founder Split (24-mo Vesting)</span>
                  </div>
                  <div className="text-slate-300">
                    Domain Authority:{' '}
                    <span className="text-white">5 Core Arenas · 60 Titles · Golden Vault</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-violet-400/25 aspect-[16/10] max-h-[160px] w-full relative media-frame">
                  <ResilientImage
                    src={MEDIA.pionJalees}
                    alt="Jalees Habib Chief Mathematical Architect proof and Golden Vault calibration"
                    loading="lazy"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                  Jalees Habib co-engineered the mathematical core of Arithmo-Edge: calibrating the{' '}
                  <span className="text-white font-semibold">5 Core Arenas</span> and{' '}
                  <span className="text-white font-semibold">60 progressive ELO titles</span>, eliminating topic
                  fragmentation by nesting sub-branches inside non-rating tags, validating Python/SymPy proof-grading
                  rubrics, and co-authoring the uncontaminated{' '}
                  <span className="font-mono-tabular text-violet-300">5×4 Private Golden Vault</span> problem sets.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-violet-300 font-semibold">ELO Calibrations</div>
                    <p className="text-slate-400 mt-1">
                      General/Expert split rating + Overall All-Rounder weighted aggregate.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-violet-300 font-semibold">Proof Standards</div>
                    <p className="text-slate-400 mt-1">0–7 Olympiad proof rubric &amp; Find-the-Flaw adversarial rules.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                    <div className="text-violet-300 font-semibold">Golden Vault IP</div>
                    <p className="text-slate-400 mt-1">
                      Original curated Schema v1.2 problem sets suppressed during live rounds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Co-Founder Equity & Governance Charter (40% + 20% + 40% behind 60% / 40%) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Co-Founder Equity &amp; Governance Charter"
            title="40% + 20% + 40% Allocation Behind the 60% / 40% Split"
            subtitle="While our legal voting/governance instrument reads 60% / 40% on paper, day-to-day economic ownership operates as an equal 40% + 40% founder partnership plus a 20% System &amp; Upgrade Reserve held under Rayaan's Executive Mandate—paired with 24-month vesting and Guardian Custodianship."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            {/* Sleek Glassmorphism 3-Bar + 24-Month Vesting Breakdown */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-tabular text-cyan-300">
                    True 3-Bar Equity &amp; Reserve Architecture · 24-Month Vesting Simulator
                  </div>
                  <h3 data-vesting-month="" className="font-display text-lg font-bold text-white">Month {vestingMonth} of 24</h3>
                </div>
                <div className="flex flex-wrap gap-4 font-mono-tabular text-xs">
                  <span data-vest-r="" className="text-cyan-300">Personal · Rayaan: {rayaanPersonalVested}% / 40%</span>
                  <span data-vest-s="" className="text-amber-300">System Reserve: {systemReserveHeld}% / 20%</span>
                  <span data-vest-j="" className="text-violet-300">Personal · Jalees: {jaleesPersonalVested}% / 40%</span>
                </div>
              </div>

              {/* Full 40% / 20% / 40% Allocation Bar */}
              <div className="space-y-2">
                <div className="grid grid-cols-10 gap-1.5 text-[11px] font-mono-tabular text-slate-300 text-center">
                  <div className="col-span-4 rounded-lg border border-cyan-400/40 bg-cyan-400/15 py-2 px-2 text-cyan-200 font-semibold truncate">
                    40% Personal · Rayaan
                  </div>
                  <div className="col-span-2 rounded-lg border border-amber-400/40 bg-amber-400/15 py-2 px-2 text-amber-200 font-semibold truncate">
                    20% System &amp; Upgrade Reserve
                  </div>
                  <div className="col-span-4 rounded-lg border border-violet-400/40 bg-violet-400/15 py-2 px-2 text-violet-200 font-semibold truncate">
                    40% Personal · Jalees
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden flex">
                  <div
                    data-bar-r=""
                    className="h-full bg-cyan-400 transition-all duration-200"
                    style={{width: `${(vestingMonth / 24) * 40}%`}}
                  />
                  <div
                    data-bar-s=""
                    className="h-full bg-amber-400 transition-all duration-200"
                    style={{width: `${(vestingMonth / 24) * 20}%`}}
                  />
                  <div
                    data-bar-j=""
                    className="h-full bg-violet-400 transition-all duration-200"
                    style={{width: `${(vestingMonth / 24) * 40}%`}}
                  />
                </div>
              </div>

              <input
                id="vesting-slider"
                type="range"
                min={0}
                max={24}
                step={1}
                aria-label="Simulate vesting month from 0 to 24"
                value={vestingMonth}
                onChange={(e) => setVestingMonth(Number(e.target.value))}
                className="w-full cyber-range"
              />
            </div>

            {/* 3-Pillar Equity Breakdown */}
            <div className="ae-bento-grid-3 grid md:grid-cols-3 gap-6">
              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-cyan-400/35">
                <div className="text-xs font-mono-tabular text-cyan-300">40% Personal Stake · Rayaan Tasnim</div>
                <h3 className="font-display text-lg font-bold text-white">Core System Architect</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Equal personal founder stake recognizing full-stack systems engineering, 14-portal infrastructure,{' '}
                  <span className="font-mono-tabular text-cyan-300">QPRT-4</span> security, and AI pipeline orchestration.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-amber-400/35">
                <div className="text-xs font-mono-tabular text-amber-300">
                  20% Treasury · Under Rayaan&apos;s Executive Mandate
                </div>
                <h3 className="font-display text-lg font-bold text-white">System Operations &amp; Upgrade Reserve</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Specifically ring-fenced to cover ongoing system costs, AI API tokens, domain/edge infrastructure, and
                  future platform upgrades while enabling rapid, decisive executive execution without operational
                  bottlenecks.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-violet-400/35">
                <div className="text-xs font-mono-tabular text-violet-300">40% Personal Stake · Jalees Habib</div>
                <h3 className="font-display text-lg font-bold text-white">Chief Mathematical Architect</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Equal personal co-founder stake recognizing Olympiad mathematical synthesis,{' '}
                  <span className="font-mono-tabular text-violet-300">5 × 4</span> Golden Question Bank authorship,
                  proof-based grading standards, and anti-LLM verification.
                </p>
              </SpotlightCard>
            </div>

            {/* Vesting, Guardian Custodianship & Dual IP Boundary */}
            <div className="ae-bento-grid-3 grid md:grid-cols-3 gap-6">
              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-cyan-400/30">
                <div className="text-xs font-mono-tabular text-cyan-300">24-Month Equal-Cadence Vesting</div>
                <h3 className="font-display text-lg font-bold text-white">Unified Launch Alignment</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Both 40% personal stakes vest smoothly across 24 months, aligning Rayaan Tasnim &amp; Jalees Habib
                  through V4.0 Grand Singularity, custom .com cutover, Arithmo Database, and holding spin-offs.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-violet-400/30">
                <div className="text-xs font-mono-tabular text-violet-300">Guardian Financial Custodianship</div>
                <h3 className="font-display text-lg font-bold text-white">Verified Legal Fiduciary Shield</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  All subscription revenue, Academy settlements, and Wall of Patrons contributions sit inside transparent
                  Parent/Guardian fiduciary custody until statutory adulthood.
                </p>
              </SpotlightCard>

              <SpotlightCard className="rounded-2xl p-6 space-y-2 border-emerald-400/30">
                <div className="text-xs font-mono-tabular text-emerald-300">Dual IP Boundary</div>
                <h3 className="font-display text-lg font-bold text-white">Public Showcase vs. Secret Vaults</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  14 frontend portals showcase open UI/UX architecture publicly, while Private Golden Vaults, anti-cheat
                  thresholds, and Worker keys remain proprietary Olympiad Edge IP.
                </p>
              </SpotlightCard>
            </div>

            <div className="rounded-2xl border border-slate-800 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[155px] relative media-frame">
                <ResilientImage
                  src={MEDIA.pionEquity}
                  alt="40% + 20% + 40% Equity and 24-month vesting charter"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
                <div className="text-xs font-mono-tabular text-cyan-300">20% System Reserve + Guardian Custodianship</div>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Balancing 40% personal Rayaan &amp; 40% personal Jalees stakes with a dedicated 20% operations reserve
                  ensures server tokens, custom .com infrastructure, and future upgrades never stall.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Interactive Private 5x4 Golden Vault (Schema v1.2) + JSON-Converter Inspector */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Arithmo-Edge-Golden-Vault · Read-Only PAT + Cloudflare Worker Proxy · JSON-Converter"
            title="Private 5×4 Golden Vault (Schema v1.2) Inspector"
            subtitle="Co-authored using JSON-Converter: 5 Arenas × 4 Segments × 10 Problems per set, ingested solely by Arithmo GoldenVault Miner AI and suppressed during active rated contests."
            action={
              <a
                href="https://github.com/Arithmo-Edge/JSON-Converter"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass px-4 py-2.5 text-xs whitespace-nowrap shrink-0"
              >
                <FileCode2 className="w-4 h-4 text-cyan-300" />
                <span>Inspect JSON-Converter Repo</span>
              </a>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            <GoldenVaultInspector pathPrefix="Vault Object Path:" />
            <div className="rounded-2xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[155px] relative media-frame">
                <ResilientImage
                  src={MEDIA.pionVault}
                  alt="JSON-Converter Schema v1.2 Private 5x4 Golden Vault archive"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
                <div className="text-xs font-mono-tabular text-amber-300">
                  Sealed 5×4 Golden Vault · Proprietary Olympiad Edge IP
                </div>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Problem payloads stay cryptographically isolated inside private Schema v1.2 stores and are fetched
                  strictly on-demand during verified match windows.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Honorary Prime Sovereign Council & Hall of Architects */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Meritocratic Hall of Distinction"
            title="Honorary Prime Sovereign Council"
            subtitle="Immutable roster recognizing founding constitutional stewards and open-2026 Olympiad Sovereign nominations."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-3 bg-slate-950/90 border-b border-slate-800 px-5 py-3 text-xs font-mono-tabular text-slate-400">
                <div>@handle</div>
                <div>HQ ELO</div>
                <div>Reserved / Honorary Title</div>
              </div>
              <div className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                <div className="grid grid-cols-3 px-5 py-4 items-center gap-2">
                  <span className="font-mono-tabular text-cyan-300 font-semibold">@rayaantasnim</span>
                  <span className="font-mono-tabular text-amber-300 font-semibold">1000+ HQ ELO</span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Core System Architect</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 px-5 py-4 items-center gap-2">
                  <span className="font-mono-tabular text-violet-300 font-semibold">@jaleeshabib</span>
                  <span className="font-mono-tabular text-amber-300 font-semibold">1000+ HQ ELO</span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Chief Mathematical Architect</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 px-5 py-4 items-center gap-2">
                  <span className="font-mono-tabular text-slate-300">@olympiad-fellows</span>
                  <span className="font-mono-tabular text-emerald-300 font-semibold">Open 2026 Cohort</span>
                  <span className="text-slate-300">Honorary Prime Sovereign · Merit Nomination</span>
                </div>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.pionCouncil}
            alt="Honorary Prime Sovereign Council and open 2026 Olympiad Sovereign nominations"
            kicker="Hall of Sovereign Distinction"
            title="Founding Stewards & Open-2026 Merit Nominations"
            summary="Permanent ledger honoring Core System Architect @rayaantasnim, Chief Mathematical Architect @jaleeshabib, and incoming 1000+ HQ ELO Sovereign fellows."
            accentColor="#F59E0B"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 7: Wall of Patrons Interactive Impact Preview & Direct Support CTA */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Buy Me a Coffee · Support the 13-Year-Old System Architect"
            title="Transparent Patronage &amp; Infrastructure Allocation"
            subtitle="Preview how Patron contributions sustain Free Forever arenas and domain overhead without ever selling ELO points or contest advantage."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border-amber-400/40 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {PATRON_IMPACT_OPTIONS.map((opt) => {
                const active = opt.id === selectedPatronOption;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-pion-patron={opt.id}
                    onClick={() => setSelectedPatronOption(opt.id)}
                    className={`text-left rounded-2xl border p-5 space-y-2 transition-all ${
                      active
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-800 bg-slate-950/75 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="text-amber-300 font-bold">{opt.label}</span>
                      <span className="text-emerald-300">0 ELO Boost</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{opt.detail}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center pt-2 border-t border-slate-800/80">
              <div className="lg:col-span-8 space-y-2">
                <div className="text-xs font-mono-tabular text-amber-300 flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span data-pion-patron-label="">Selected Support Impact: {activePatronOption.label}</span>
                </div>
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  <span data-pion-patron-detail="">{activePatronOption.detail}</span> By constitutional charter, every dollar stays segregated inside Guardian
                  Financial Custodianship and grants <strong className="text-emerald-300">0 ELO advantage</strong>.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <a
                  data-pion-patron-mailto=""
                  href={`mailto:rayaantasnim@gmail.com?subject=${encodeURIComponent(
                    `Arithmo-Edge Wall of Patrons Support (${activePatronOption.label})`,
                  )}`}
                  className="btn-cyber px-5 py-3 text-sm text-center whitespace-nowrap"
                >
                  Support via Direct Patronage
                </a>
                <a
                  href="https://github.com/Arithmo-Edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass px-5 py-3 text-sm text-center whitespace-nowrap"
                >
                  Contribute at github.com/Arithmo-Edge
                </a>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.pionPatronage}
            alt="Wall of Patrons infrastructure underwriting with zero ELO influence"
            kicker="Wall of Patrons Firewall"
            title="Pure Infrastructure Support · Zero Match or Rating Leverage"
            summary="Patrons directly fund custom .com domains, SymPy verification sandboxes, and free community guidebooks while ratings remain strictly meritocratic."
            accentColor="#10B981"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 8: Pioneer Custodianship & Open Collaboration FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Founders &amp; Compliance FAQ"
            title="Origin, Custodianship &amp; Contribution Questions"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <FaqAccordion items={PIONEERS_FAQS} accentClass="text-cyan-300" />
            </div>
            <SpotlightCard className="lg:col-span-4 rounded-2xl p-6 space-y-4 border-violet-400/30">
              <Users className="w-6 h-6 text-violet-300" />
              <h3 className="font-display text-lg font-bold text-white">Open Federation &amp; Audits</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore the full 14-website architecture, 5-tier HQ governance ladder, or institutional academy
                onboarding before our Dec 31, 2026 Midnight launch.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a href="governance.html" className="btn-cyber px-4 py-2.5 text-xs text-center whitespace-nowrap">
                  Explore HQ Governance Ladder
                </a>
                <a href="architecture.html" className="btn-glass px-4 py-2.5 text-xs text-center whitespace-nowrap">
                  Inspect 14-Portal Federation
                </a>
              </div>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.pionFaq}
            alt="Pioneer Custodianship FAQ, Guardian Financial Custodianship, and open audit model"
            kicker="Custodianship & Open Audit FAQ"
            title="Guardian Financial Oversight & 14-Repo Architecture Transparency"
            summary="Explore how Guardian Financial Custodianship, vesting schedules, and schema standards protect students, contributors, and institutional partners globally."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
