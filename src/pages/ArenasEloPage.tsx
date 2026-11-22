import React, {useState} from 'react';
import {ShieldCheck, Swords} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {Arena3DStage} from '../components/Arena3DStage';
import {FaqAccordion, SectionHeader, ShadowBotGauntletWidget} from '../components/CommercialPrimitives';
import {
  CyberMediaFrame,
  HeroReveal,
  ResilientImage,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {ARENA_CATALOG, ArenaKey, SHADOW_BOT_PERSONAS} from '../data/ecosystem';

const ARENA_KEYS: ArenaKey[] = ['nt', 'alg', 'geo', 'comb', 'mixed'];

const ARENA_FAQS = [
  {
    q: 'Can I launch 1v1 Bullet Blitz or Shadow Bot Gauntlets from the Contest Portal?',
    a: 'No. By strict domain separation, all 1v1 duels, Direct Rival Challenges, and Shadow Bot Gauntlets reside strictly inside the 5 Core Arenas (Subsites #1–#5). The Contest Portal (Subsite #6) hosts Live and Upcoming Scheduled Contests only.',
  },
  {
    q: 'How does the 60-second Ranked Arena Duel Stealth Bot work without inflating ELO?',
    a: 'If no human within ±100 ELO accepts within 60 seconds, a Stealth ELO-Mirror Bot silently steps in matching your exact live ELO under a realistic human-like @handle. The duel remains 100% Rated, while a 0.75× K-factor guard throttles farmable variance.',
  },
  {
    q: 'Why is Shadow Bot Gauntlet forced Unrated when set below my Live ELO?',
    a: 'To guarantee zero rating farming against weak sparring bots. Any custom slider target strictly below your Live ELO is mandatory Unrated; targets at or above your Live ELO default to 100% Rated unless you opt into Unrated training.',
  },
  {
    q: 'What happens if my Direct Rival Challenge URL expires after 5 minutes?',
    a: 'Expired rival links return ZERO quota or pack token deduction automatically. Optionally, you may opt in to convert unaccepted 5-minute invitations into the Global Pool with a 30-second Stealth Bot fallback.',
  },
];

export const ArenasEloPage: React.FC = () => {
  const [selectedArenaKey, setSelectedArenaKey] = useState<ArenaKey>('nt');
  const [genElo, setGenElo] = useState<number>(1500);
  const [expElo, setExpElo] = useState<number>(1700);

  const arena = ARENA_CATALOG[selectedArenaKey];
  const avg = Math.round((genElo + expElo) / 2);
  const matchedTier =
    arena.titles.find((t) => avg >= t.min && avg <= t.max) ?? arena.titles[arena.titles.length - 1];

  const unlockNotice =
    avg >= 2000
      ? 'Unlocked: Grandmaster Peer Review (Expert Segments 1 & 2) + 2000+ Expert Q&A + Arithmo Forge Problemsetting + HQ Consideration'
      : avg >= 1500
        ? 'Unlocked: Arithmo Forge Problemsetting Eligible (requires 6 clean matches at this rating)'
        : 'Training Band: Earn 1500+ ELO & 6 clean matches to unlock Arithmo Forge problemsetting';

  return (
    <>
      {/* Section 1: Strict No-Mixed ELO Policy Hero */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#8B5CF6" secondaryHex="#00F0FF" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-violet-300 font-medium">
                  01 · Subsites #1–#5 · Strict No-Mixed ELO Policy · 10 Core Arena ELOs
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  5 Core Arenas, 60 Tiers &amp; Shadow Bot Gauntlet
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Arithmo-Edge prohibits single-bucket rating inflation through its{' '}
                  <span className="text-white font-semibold">Strict No-Mixed ELO Policy</span>: every competitor
                  maintains <span className="text-white font-semibold">10 isolated Core Arena ELOs</span> (separate
                  General &amp; Expert ratings across all 5 arenas) alongside direct in-arena{' '}
                  <span className="text-white font-semibold">1v1 &amp; Shadow Bot Gauntlet</span> matchmaking.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href="#shadow-bot-gauntlet" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap">
                    Launch 3-Button Bot &amp; 1v1 Tab
                  </a>
                  <a href="#elo-simulator" className="btn-glass px-5 py-3 text-sm whitespace-nowrap">
                    Open 60-Tier Badge Simulator
                  </a>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.16} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group">
                  <ResilientImage
                    src={MEDIA.arenasHero}
                    alt="Head-to-head Olympiad arena duel visualization"
                    loading="eager"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs text-rose-300 font-mono-tabular">Subsites #1–#5 Own 1v1 &amp; Bot Zones</div>
                    <p className="ae-prose text-sm text-slate-200 mt-1">
                      10 Core Arena ELOs track competitive skill; Contribution ELO and HQ ELO govern publishing and
                      moderation separately.
                    </p>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Strict Zone Separation — Arenas vs Contest Portal */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Domain Separation Boundary"
            title="1v1 & Bot Zones Live Inside the 5 Arenas · Contest Portal Hosts Contests Only"
            subtitle="Eliminating UI clutter by isolating real-time sparring from multi-segment scheduled tournaments."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-cyan-400/35">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-300">
                <Swords className="w-4 h-4" />
                <span>Inside Subsites #1–#5 (Each Core Arena)</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">3-Button Arena Contest &amp; Bot Play Tab</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Every arena embeds the 3-Button <code className="font-mono-tabular text-cyan-300">Contest</code> Tab
                exclusively for <strong>Ranked Arena Duels</strong> (60s pool &rarr; Stealth Bot),{' '}
                <strong>Direct Rival Challenges</strong> (5-min URL), and the <strong>Shadow Bot Gauntlet</strong>{' '}
                (0–3200+ custom slider across 12 Bot Personas).
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-amber-400/35">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Inside Subsite #6 (Contest Portal)</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">Live &amp; Upcoming Scheduled Contests Only</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                The dedicated <a href="contests.html" className="text-amber-300 underline">Contest Portal</a> showcases
                only Daily Scheduled Rounds, Sunday Mega Arena, Custom Human-Authored Warm-Up Championships (like BdMO),
                and Top 128 World Cup brackets—zero 1v1 spam.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[175px] relative media-frame">
              <ResilientImage
                src={MEDIA.arenasMatchmaking}
                alt="1v1 chess-clock Olympiad matchmaking across isolated arenas"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Clean Domain Partitioning</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Separating fast 1v1 matchmaking &amp; Bot Gauntlets inside Subsites #1–#5 ensures scheduled Daily
                Contests and Sunday Mega rounds on Subsite #6 remain uncluttered and distraction-free.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Interactive 3-Button Contest Tab & Shadow Bot Gauntlet */}
      <section
        id="shadow-bot-gauntlet"
        className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60"
      >
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Interactive Matchmaking & 12-Bot Persona Engine"
            title="Test the 3-Button Arena Contest Tab Live"
            subtitle="Switch between Ranked Arena Duel, Direct Rival Challenge, and the 0–3200+ Shadow Bot Gauntlet slider mapped to all 12 canonical personas."
          />
          <ShadowBotGauntletWidget />
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.arenasContestTab}
              alt="3-Button Arena Contest Tab hosting Ranked Duels, Direct Rivals, and Shadow Bot Gauntlet"
              kicker="Live In-Arena Control Deck"
              title="Three Distinct Matchmaking Engines Inside Subsites #1–#5"
              summary="Instant 60-second Stealth Bot backfill, zero-deduction 5-minute Rival links, and full 0–3200+ Shadow Bot Gauntlets co-exist inside one clean interface."
              accentColor="#00F0FF"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: 12 Predefined Bot Personas Full Roster */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · 12 Predefined Shadow Bot Personas (0–3200+)"
            title="Every ELO Bracket Has a Calibrated Olympiad Bot Archetype"
            subtitle="From introductory Spark (0–499) up to Vanguard (e.g., 2885 · Vanguard BOT) and Apex (3000+ · Apex BOT)."
          />
          <div className="mb-6 rounded-2xl border border-violet-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[175px] relative media-frame">
              <ResilientImage
                src={MEDIA.arenasShadow}
                alt="12 named Shadow Bot personalities spanning 0 to 3200+ ELO"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Dynamic Sparring Telemetry</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Shadow Bot mirrors realistic solve pacing, theorem preferences, and hint hesitation at its assigned
                rating band—preventing ELO farming below your live rating while pushing ceiling growth above it.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHADOW_BOT_PERSONAS.map((bot) => (
              <SpotlightCard key={bot.name} className="rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span style={{color: bot.accentColor}}>Bot #{String(bot.tierNum).padStart(2, '0')}</span>
                  <span className="text-slate-400">
                    {bot.minElo >= 3000 ? '3000+' : `${bot.minElo}–${bot.maxElo}`}
                  </span>
                </div>
                <div className="font-display text-base font-bold text-white">
                  {bot.exampleElo} · {bot.name} BOT
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{bot.style}</p>
                <div className="text-[11px] font-mono-tabular text-slate-500 pt-1">{bot.telemetryProfile}</div>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Average-Based 12-Tier Rank Formula */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs text-cyan-300 font-medium">05 · Average-Based 12-Tier Rank Formula</p>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Balancing Speed Computation &amp; Olympiad Proof Rigor
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                While <code className="font-mono-tabular text-cyan-300">General ELO</code> and{' '}
                <code className="font-mono-tabular text-violet-300">Expert ELO</code> update independently on separate
                leaderboards on Subsite #7, your visible{' '}
                <span className="text-white font-semibold">12-Tier Rank Badge</span> in any arena is dynamically resolved
                from their exact arithmetic midpoint.
              </p>
            </div>
            <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-cyan-400/35 text-center space-y-2">
              <div className="text-xs text-slate-400">Canonical Rank Formula</div>
              <div className="font-mono-tabular text-lg sm:text-xl font-bold text-cyan-300">
                Arena Rank ELO = (General ELO + Expert ELO) / 2
              </div>
              <div className="text-xs text-slate-400">Evaluated identically across all 5 arenas (0–3200 scale)</div>
              <div className="rounded-xl overflow-hidden aspect-[16/10] max-h-[150px] w-full relative media-frame mt-3">
                <ResilientImage
                  src={MEDIA.arenasFormula}
                  alt="Mathematical formula balancing General speed and Expert proof ratings"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Interactive Dual-Slider 60-Tier ELO Simulator */}
      <section id="elo-simulator" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-cyan-300 font-medium">06 · Interactive Dual-Slider Simulator</p>
                <h2 className="section-title-fluid font-display font-bold text-white">
                  60-Title Arena Rank Badge Explorer
                </h2>
              </div>
              <div className="font-mono-tabular text-xs text-slate-400">Range: 0–3200 General &amp; Expert ELO</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {ARENA_KEYS.map((key) => {
                const info = ARENA_CATALOG[key];
                const isSelected = key === selectedArenaKey;
                return (
                  <button
                    key={key}
                    type="button"
                    data-arena-select={key}
                    data-arena-select-key={key}
                    onClick={() => setSelectedArenaKey(key)}
                    className={`px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-800 ring-2 ring-cyan-400 text-white'
                        : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    {info.key === 'comb' ? 'Combinatorics' : info.key === 'mixed' ? 'Mixed Olympiad' : info.name} (
                    {info.color})
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-4 p-5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <label htmlFor="sim-gen-elo" className="text-slate-200 font-medium">
                        General ELO
                      </label>
                      <span id="sim-gen-val" className="font-mono-tabular font-bold text-cyan-300">{genElo}</span>
                    </div>
                    <input
                      id="sim-gen-elo"
                      type="range"
                      min={0}
                      max={3200}
                      step={10}
                      value={genElo}
                      onChange={(e) => setGenElo(Number(e.target.value))}
                      className="w-full cyber-range"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <label htmlFor="sim-exp-elo" className="text-slate-200 font-medium">
                        Expert ELO
                      </label>
                      <span id="sim-exp-val" className="font-mono-tabular font-bold text-violet-300">{expElo}</span>
                    </div>
                    <input
                      id="sim-exp-elo"
                      type="range"
                      min={0}
                      max={3200}
                      step={10}
                      value={expElo}
                      onChange={(e) => setExpElo(Number(e.target.value))}
                      className="w-full cyber-range"
                    />
                  </div>
                </div>

                <div
                  id="sim-badge-box"
                  className="p-6 rounded-2xl bg-slate-950/90 border space-y-3 transition-all"
                  style={{
                    borderColor: arena.color,
                    boxShadow: `0 0 36px ${arena.color}22`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span id="sim-arena-name">{arena.name}</span>
                    <span id="sim-arena-subsite" className="font-mono-tabular truncate">{arena.subsite}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Computed 12-Tier Rank Title</div>
                      <div
                        id="sim-rank-title"
                        className="font-display text-2xl sm:text-3xl font-bold tracking-tight"
                        style={{color: arena.color}}
                      >
                        {matchedTier.title}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-400">Average ELO</div>
                      <div id="sim-avg-val" className="font-mono-tabular text-3xl font-bold text-white">{avg}</div>
                    </div>
                  </div>
                  <div id="sim-unlocks" className="pt-3 border-t border-slate-800/80 text-xs text-slate-300">{unlockNotice}</div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <div className="text-xs text-slate-400 mb-2">
                  Active Arena 12-Tier Progression Ladder (Live Highlighted)
                </div>
                <div id="sim-ladder-list" className="grid sm:grid-cols-2 gap-2">
                  {arena.titles.map((t) => {
                    const isCurrent = t.title === matchedTier.title;
                    return (
                      <div
                        key={t.title}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${
                          isCurrent
                            ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.18)]'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <span className="font-medium truncate" style={isCurrent ? {color: arena.color} : undefined}>
                          {t.title}
                        </span>
                        <span className="font-mono-tabular shrink-0 text-[11px]">
                          {t.max >= 9999 ? `${t.min}+` : `${t.min}–${t.max}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Arena3DStage activeKey={selectedArenaKey} onSelect={setSelectedArenaKey} />
            <CyberMediaFrame
              src={MEDIA.arenasSimulator}
              alt="60-Title Olympiad progression badges and dual General + Expert ELO telemetry"
              kicker="Balanced Speed & Proof Progression"
              title="60 Distinct Titles Synchronized Across 5 Federated Domains"
              summary="Rotating the 3D prism switches domain color coding, live unlock thresholds, and the complete 12-tier badge progression ladder in real time."
              accentColor={arena.color}
              reverse
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Zero-Fragmentation Olympiad Tag Policy */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs text-amber-300 font-medium">07 · Zero-Fragmentation Olympiad Tag Policy</p>
              <h2 className="section-title-fluid font-display font-bold text-white">
                Tags Locked in Rated Rounds · Unlocked in Practice
              </h2>
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                In authentic Olympiads like the IMO or Putnam, problems never arrive pre-labeled with the theorem
                required to solve them. Sub-topics such as{' '}
                <span className="font-mono-tabular text-cyan-300">#Modular-Arithmetic</span>,{' '}
                <span className="font-mono-tabular text-violet-300">#Vieta-Jumping</span>,{' '}
                <span className="font-mono-tabular text-amber-300">#Inversion</span>, and{' '}
                <span className="font-mono-tabular text-emerald-300">#Pigeonhole</span> are{' '}
                <span className="text-white font-semibold">strictly hidden during live rated contests</span> and unlocked
                exclusively during unrated practice and{' '}
                <code className="font-mono-tabular text-cyan-300">Arithmo Database</code> review.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <SpotlightCard className="rounded-xl p-5 border-rose-500/35 space-y-1.5">
                  <div className="text-xs font-mono-tabular text-rose-400">Live Rated Mode</div>
                  <div className="font-semibold text-white text-sm">Topic Hints Stripped</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Only Arena domain and Segment difficulty appear; TagArchitect suppresses sub-topic strings client
                    &amp; edge side.
                  </p>
                </SpotlightCard>
                <SpotlightCard className="rounded-xl p-5 border-emerald-500/35 space-y-1.5">
                  <div className="text-xs font-mono-tabular text-emerald-400">Unrated Practice &amp; Database</div>
                  <div className="font-semibold text-white text-sm">Granular Theorem Search</div>
                  <p className="ae-prose text-xs text-slate-400">
                    Full tag filtering unlocks post-contest so WeaknessTargetedGen AI can target specific lemma gaps.
                  </p>
                </SpotlightCard>
              </div>
              <div className="rounded-2xl border border-amber-400/25 overflow-hidden aspect-[16/10] max-h-[195px] w-full relative media-frame">
                <ResilientImage
                  src={MEDIA.arenasZeroFrag}
                  alt="Zero-fragmentation Olympiad problem statements without pre-labeled topic hints"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-mono-tabular text-amber-300">
                  Tags Hidden in Rated Mode &rarr; Unlocked in Arithmo Database
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Complete 60-Title Rank Matrix Breakdown */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Complete 60-Title Rank Matrix"
            title="All 5 Specialized Mathematical Arenas & Overall All-Rounder"
          />

          <div className="ae-bento-grid ae-bento-grid-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ARENA_KEYS.slice(0, 4).map((key, idx) => {
              const info = ARENA_CATALOG[key];
              return (
                <SpotlightCard key={key} className="rounded-2xl p-6 space-y-3">
                  <h3 className="font-display text-lg font-bold" style={{color: info.color}}>
                    {idx + 1}. {info.name} ({info.color})
                  </h3>
                  <div className="text-xs font-mono-tabular text-slate-300 space-y-1.5">
                    {info.titles.map((t, tIdx) => {
                      const isPeak = tIdx === info.titles.length - 1;
                      return (
                        <div
                          key={t.title}
                          className={`flex justify-between ${isPeak ? 'font-semibold' : ''}`}
                          style={isPeak ? {color: info.color} : undefined}
                        >
                          <span>{t.title}</span>
                          <span className={isPeak ? '' : 'text-slate-400'}>
                            {t.max >= 9999 ? `${t.min}+` : `${t.min}–${t.max}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </SpotlightCard>
              );
            })}

            <SpotlightCard className="rounded-2xl p-6 space-y-3 md:col-span-2 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-[#F43F5E]">
                  5. Mixed Mathematical Olympiad (#F43F5E)
                </h3>
                <span className="text-xs text-slate-400">Primary Anchor for Overall All-Rounder Rating</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs font-mono-tabular text-slate-300">
                {ARENA_CATALOG.mixed.titles.map((t, tIdx) => {
                  const isPeak = tIdx === ARENA_CATALOG.mixed.titles.length - 1;
                  return (
                    <div
                      key={t.title}
                      className={`flex justify-between ${isPeak ? 'text-[#F43F5E] font-semibold' : ''}`}
                    >
                      <span>{t.title}</span>
                      <span className={isPeak ? '' : 'text-slate-400'}>
                        {t.max >= 9999 ? `${t.min}+` : `${t.min}–${t.max}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          </div>
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.arenasMatrix}
              alt="Complete 60-Title rank matrix across Number Theory, Algebra, Geometry, Combinatorics, and Mixed Olympiad"
              kicker="Strict No-Mixed ELO Policy"
              title="Complete Isolation Prevents Rating Inflation Across Branches"
              summary="Mastery in Geometry never inflates Number Theory matchmaking, while Overall All-Rounder rewards balanced excellence culminating in the Top 128 World Cup."
              accentColor="#F43F5E"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 9: 1v1 Underdog Rules & Arenas FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="09 · Anti-Farming Safeguards & Matchmaking FAQ"
            title="Pairwise Farming Caps, System Expectation Override & FAQ"
          />
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <SpotlightCard className="rounded-2xl p-6 space-y-2">
                  <div className="font-mono-tabular text-xs text-amber-300">Anti-Collusion Limit</div>
                  <h3 className="font-display text-lg font-bold text-white">24h 2-Match Pairwise Cap</h3>
                  <p className="ae-prose text-sm text-slate-300">
                    Any two <code className="font-mono-tabular text-amber-300">@handles</code> can play at most 2 rated
                    1v1 matches in a rolling 24-hour window, neutralizing ELO win-trading rings.
                  </p>
                </SpotlightCard>
                <SpotlightCard className="rounded-2xl p-6 space-y-2">
                  <div className="font-mono-tabular text-xs text-emerald-300">System Expectation Override</div>
                  <h3 className="font-display text-lg font-bold text-white">+ΔR Underdog Protection</h3>
                  <p className="ae-prose text-sm text-slate-300">
                    When a lower-rated solver faces a 2000+ Sentinel and outperforms expected score margin, System
                    Expectation Override protects against harsh rating drops.
                  </p>
                </SpotlightCard>
              </div>
              <SpotlightCard className="rounded-2xl overflow-hidden border-rose-400/30 grid sm:grid-cols-12 items-stretch">
                <div className="sm:col-span-4 min-h-[150px] relative media-frame">
                  <ResilientImage
                    src={MEDIA.arenasAllRounder}
                    alt="Overall All-Rounder composite ranking and World Cup qualification track"
                    loading="lazy"
                    accentColor="#F43F5E"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
                </div>
                <div className="sm:col-span-8 p-6 space-y-2">
                  <div className="text-xs font-mono-tabular text-rose-300">
                    Overall All-Rounder Composite Rating &amp; World Cup Seeding
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Anchored on Subsite #5 (Mixed Olympiad)
                  </h3>
                  <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                    Published publicly on Subsite #7 Standings (<code className="font-mono-tabular">All Rounders</code>),
                    the composite aggregates all 5 arenas with primary weight on Mixed Olympiad &amp; Sunday Mega results
                    to qualify top solvers for the Top 128 Annual World Cup.
                  </p>
                </div>
              </SpotlightCard>
            </div>
            <div className="lg:col-span-5">
              <FaqAccordion items={ARENA_FAQS} />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
