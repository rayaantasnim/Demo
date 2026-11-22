import React, {useState} from 'react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {GoldenVaultInspector} from '../components/GoldenVaultInspector';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

const COMMUNITY_FAQS = [
  {
    q: 'How is Contribution ELO earned and what Wallet rewards does it unlock?',
    a: 'Accepted Blog-to-Lab exposition articles award +5 Contribution ELO and approved Community or Exclusive Academy Guidebook theorems award +2 Contribution ELO directly to your personal @handle. Hitting +50, +100, +250, and +500 Contribution ELO unlocks automatic free Arithmo Wallet Credit milestones.',
  },
  {
    q: 'Why can only 2000+ ELO Sentinels post answers in Expert Q&A?',
    a: 'Every student (0+ ELO) can read all Q&A threads freely, while write permissions require 2000+ ELO Sentinel standing or higher. Pairing human rigor with ForumModerator AI & ProofGrader AI keeps discussions 100% signal with zero spam.',
  },
  {
    q: 'How do 5×4 Golden Vaults avoid leaking onto public client code?',
    a: 'Co-Founders Rayaan Tasnim and Jalees Habib compile Schema v1.2 Vaults via JSON-Converter into a private repository, served exclusively on-demand via Read-Only GitHub PAT + Cloudflare Worker proxy only after contest locks open.',
  },
];

export const SocialsForgePage: React.FC = () => {
  const [contribBlogs, setContribBlogs] = useState<number>(4);
  const [contribNotes, setContribNotes] = useState<number>(6);
  const totalContribElo = contribBlogs * 5 + contribNotes * 2;

  const unlockedMilestone =
    totalContribElo >= 500
      ? 'Unlocked +500 Milestone Bonus Tier'
      : totalContribElo >= 250
        ? 'Unlocked +250 Milestone Bonus Tier'
        : totalContribElo >= 100
          ? 'Unlocked +100 Milestone Bonus Tier'
          : totalContribElo >= 50
            ? 'Unlocked +50 Milestone Bonus Tier'
            : `${50 - totalContribElo} Contribution ELO until first +50 Wallet Reward`;

  return (
    <>
      {/* Section 1: Decentralized Topic-Segmented KaTeX Blogs & DMs */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#8B5CF6" secondaryHex="#F59E0B" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · arithmo-edge.github.io/socials/ &amp; /arithmo-forge/
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Socials, Arithmo Forge &amp; Dual Guidebooks
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Instead of noisy unmoderated feeds, <span className="text-white font-semibold">Arithmo Socials</span>{' '}
                  separates KaTeX exposition blogs, <span className="font-mono-tabular text-cyan-300">@handle</span>{' '}
                  peer DMs, gated <span className="text-white font-semibold">2000+ Expert Q&amp;A</span>, and{' '}
                  <span className="text-white font-semibold">Arithmo Forge</span> problemsetting into clean
                  meritocratic channels.
                </p>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[260px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.forgeHero}
                    alt="Mathematical community publishing and problem authoring"
                    loading="eager"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">Topic-Segmented KaTeX Stream</div>
                    <div className="font-display text-lg font-bold text-white">
                      +5 Contribution ELO (Blog-to-Lab) · +2 Contribution ELO (Guidebook)
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AI-Curated Blog-to-Lab Promotion & Interactive Contribution ELO Estimator */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Arithmo BlogScout AI Pipeline"
            title="AI-Curated Blog-to-Lab Promotion (+5 Contribution ELO)"
            subtitle="Quality over engagement bait: likes alone grant zero ELO. Only verified theorem exposition promoted to Arithmo Labs or Guidebooks earns permanent Contribution ELO and Wallet milestones."
          />

          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                Every theorem derivation or geometric inversion walkthrough published inside Arithmo Socials is indexed
                across Number Theory, Algebra, Geometry, and Combinatorics. When{' '}
                <span className="text-white font-semibold">Arithmo BlogScout AI</span> and Problem Architects promote a
                post into an interactive training Lab, the author earns{' '}
                <span className="text-emerald-400 font-semibold">+5 Contribution ELO</span>; HQ-accepted Guidebook
                contributions grant <span className="text-cyan-300 font-semibold">+2 Contribution ELO</span>.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4 space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="contrib-blogs" className="text-slate-300">
                      Blog-to-Lab Promotions (+5)
                    </label>
                    <span id="contrib-blogs-val" className="font-mono-tabular text-emerald-300 font-bold">{contribBlogs}</span>
                  </div>
                  <input
                    id="contrib-blogs"
                    type="range"
                    min={0}
                    max={80}
                    value={contribBlogs}
                    onChange={(e) => setContribBlogs(Number(e.target.value))}
                    className="w-full cyber-range"
                  />
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4 space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="contrib-notes" className="text-slate-300">
                      Guidebook Chapters (+2)
                    </label>
                    <span id="contrib-notes-val" className="font-mono-tabular text-cyan-300 font-bold">{contribNotes}</span>
                  </div>
                  <input
                    id="contrib-notes"
                    type="range"
                    min={0}
                    max={80}
                    value={contribNotes}
                    onChange={(e) => setContribNotes(Number(e.target.value))}
                    className="w-full cyber-range"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 space-y-3 border-emerald-400/35">
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-emerald-300">Projected Personal Contribution ELO</span>
                <span className="text-slate-400">Standings Board #13</span>
              </div>
              <div id="contrib-total-elo" className="font-mono-tabular text-4xl font-bold text-white">+{totalContribElo} Contribution ELO</div>
              <div id="contrib-milestone" className="text-xs font-mono-tabular text-cyan-300">{unlockedMilestone}</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                Automatic Wallet Credit grants fire at +50, +100, +250, and +500 Contribution ELO, alongside +200
                Contribution ELO eligibility toward Headquarters Core Sentinel induction.
              </p>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[155px] w-full relative media-frame mt-2">
                <ResilientImage
                  src={MEDIA.forgeBlogs}
                  alt="Blog-to-Lab KaTeX mathematical exposition streams"
                  loading="lazy"
                  accentColor="#10B981"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Strictly Gated 2000+ ELO Verified Expert Q&A Forum */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · High-Signal Mathematical Discourse"
            title="Strictly Gated 2000+ ELO Verified Expert Q&A Forum"
          />
          <div className="ae-bento-grid-3 grid md:grid-cols-3 gap-6">
            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-cyan-400/30">
              <div className="text-xs font-mono-tabular text-cyan-300">Universal Read Access</div>
              <h3 className="font-display text-lg font-bold text-white">Open to Every Student</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Initiate and Scout can browse canonical proof explanations, subtle counterexamples, and Olympiad
                techniques without spam.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-violet-400/35">
              <div className="text-xs font-mono-tabular text-violet-300">Write-Access Gate</div>
              <h3 className="font-display text-lg font-bold text-white">2000+ ELO Verified Sentinels+</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Only contenders holding 2000+ Sentinel tier or above may post authoritative answers inside Expert Q&amp;A
                threads.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-amber-400/30">
              <div className="text-xs font-mono-tabular text-amber-300">Arithmo ForumModerator AI &amp; ProofGrader AI</div>
              <h3 className="font-display text-lg font-bold text-white">Zero Noise Moderation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-white font-semibold">Arithmo ForumModerator AI</span> enforces clean discourse
                while <span className="text-white font-semibold">Arithmo ProofGrader AI</span> runs automatic lemma
                citation and LaTeX checks across every solved question.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-violet-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.forgeQa}
                alt="2000+ ELO Sentinel Verified Expert Q&A collaboration forum"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Signal-Over-Noise Proof Mentoring</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Initiates ask freely without intimidation while verified 2000+ Sentinels provide clean, peer-checked
                derivations moderated by ForumModerator AI.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Arithmo Forge Studio & 5-Pillar Legal Problem Engine */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · arithmo-edge.github.io/arithmo-forge/"
            title="Arithmo Forge & 5-Pillar Legal Problem Engine"
            subtitle="Unlocked strictly at 1500+ Arena ELO with 6 consecutive clean matches:"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5 border-cyan-400/30">
              <div className="text-cyan-300 font-semibold">Pillar 01 · Similarity Block</div>
              <p className="text-slate-400">
                PlagioGuard enforces strict &gt;75% AoPS &amp; historical archive similarity rejection.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-4 space-y-1.5 border-violet-400/30">
              <div className="text-violet-300 font-semibold">Pillar 02 · Red-Team Attack</div>
              <p className="text-slate-400">
                AdversarialRedTeam AI hammers drafts for boundary counterexamples (n=0, p=2).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-4 space-y-1.5 border-emerald-400/30">
              <div className="text-emerald-300 font-semibold">Pillar 03 · SymPy Veritas</div>
              <p className="text-slate-400">
                Deterministic symbolic execution confirms official solutions and alternate paths.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-4 space-y-1.5 border-amber-400/30">
              <div className="text-amber-300 font-semibold">Pillar 04 · ELO Calibration</div>
              <p className="text-slate-400">
                DifficultyCalibrator aligns point curves across General &amp; Expert divisions.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-4 space-y-1.5 border-rose-400/30">
              <div className="text-rose-300 font-semibold">Pillar 05 · Authorship Transfer</div>
              <p className="text-slate-400">
                Legal originality attestation + Problem Architect audit before contest deployment.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.forgeStudio}
                alt="Arithmo Forge 5-Pillar problemsetting and SymPy authoring workbench"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">1500+ ELO Problemsetting Workbench</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every human-authored Olympiad draft runs PlagioGuard similarity defense, AdversarialRedTeam stress tests,
                and SymPyVeritas symbolic confirmation prior to T-30s contract publication.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: Interactive Co-Founders' Private 5x4 Golden Vault (Schema v1.2) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <div className="mb-8">
            <div className="text-xs font-mono-tabular text-amber-300 mb-2">
              05 · Arithmo-Edge-Golden-Vault · Schema v1.2 · JSON-Converter Studio
            </div>
            <h2 className="section-title-fluid font-display font-bold text-white">
              Interactive Co-Founders&apos; 5×4 Golden Vault Preview
            </h2>
            <p className="ae-prose text-sm sm:text-base text-slate-400 prose-measure mt-2">
              Click any of the 5 arenas below to inspect the Private{' '}
              <span className="font-mono-tabular text-amber-300">Arithmo-Edge-Golden-Vault</span> Schema v1.2 JSON
              authored via{' '}
              <a
                href="https://github.com/Arithmo-Edge/JSON-Converter"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tabular text-cyan-300 hover:underline"
              >
                JSON-Converter
              </a>{' '}
              by <span className="text-white font-semibold">Rayaan Tasnim</span> &amp;{' '}
              <span className="text-white font-semibold">Jalees Habib</span> across 4 progressive difficulty segments.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="space-y-6">
            <GoldenVaultInspector pathPrefix="Repository Object Path:" />
            <div className="rounded-2xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
              <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[155px] relative media-frame">
                <ResilientImage
                  src={MEDIA.forgeGoldenVault}
                  alt="Co-Founders 5x4 Private Golden Vault Schema v1.2 compilation"
                  loading="lazy"
                  accentColor="#F59E0B"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
                <div className="text-xs font-mono-tabular text-amber-300">Schema v1.2 Vault Isolation</div>
                <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Unplayed Golden Vault sets remain read-protected behind Cloudflare Workers + Read-Only GitHub PATs
                  until the official contest clock unlocks them.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Dual Guidebooks Architecture */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Living Knowledge Compendiums · Verified by Arithmo GuideCurator AI"
            title="Dual Guidebooks Architecture"
          />
          <div className="ae-deep-grid grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-cyan-400/35">
              <div className="text-xs font-mono-tabular text-cyan-300">Community Guidebook · Free</div>
              <h3 className="font-display text-xl font-bold text-white">+2 Contribution ELO per Approved Note</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                A collaborative theorem reference spanning modular lifting, functional equations, projective geometry,
                and bijective counting. Verified student tips audited by{' '}
                <span className="text-white font-semibold">Arithmo GuideCurator AI</span> earn{' '}
                <span className="text-emerald-400 font-semibold">+2 Contribution ELO</span>.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-violet-400/35">
              <div className="text-xs font-mono-tabular text-violet-300">
                Exclusive Academy Guidebook · $14.99/mo (3-Day Grace Period · 100% Free on Supreme &amp; Enterprise)
              </div>
              <h3 className="font-display text-xl font-bold text-white">HQ-Authored Deep Olympiad Masterwork</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                An HQ-authored deep Olympiad masterwork curated for Academy cohorts. Any Academy Member or Mentor whose
                contributed theorem is verified by{' '}
                <span className="text-white font-semibold">Arithmo GuideCurator AI</span> + HQ publishes{' '}
                <span className="text-white font-semibold">globally across all academies</span> and personally earns{' '}
                <span className="text-emerald-400 font-semibold">+2 Contribution ELO</span> on their personal{' '}
                <span className="font-mono-tabular text-cyan-300">@handle</span>{' '}
                <span className="text-slate-400 italic">(academies hold no Contribution ELO)</span>.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.forgeGuidebook}
                alt="Dual Community and Academy Guidebooks verified theorem compendium"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">
                GuideCurator AI · Printable KaTeX Theorem Chapters
              </div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Community contributors earn personal Contribution ELO for clean theorem proofs published across both
                open Community chapters and Academy masterbooks.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Subsite #11 Forensic Appeal & Community Transparency Desk */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Due Process & Flag 11 Recovery Portal"
            title="Subsite #11 Forensic Appeal Portal & DM Safety"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 space-y-2.5 border-rose-400/30">
              <div className="text-xs font-mono-tabular text-rose-300">7-Day Restricted Appeal Access</div>
              <h3 className="font-display text-lg font-bold text-white">Transparent Forensic Review Docket</h3>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Even if a contender hits Flag 11, Subsite #11 retains a 7-day read/appeal window to download SHA-256
                ChronoVault packets and schedule a 5-min Live Video Skill Audit with a 750+ Chief Arbiter.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-6 space-y-2.5 border-emerald-400/30">
              <div className="text-xs font-mono-tabular text-emerald-300">Encrypted Peer Messaging</div>
              <h3 className="font-display text-lg font-bold text-white">Hard-Locked DMs During Rated Windows</h3>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct <code className="font-mono-tabular text-cyan-300">@handle</code> DMs automatically suspend while
                either solver has an active rated contest lock—blocking mid-round problem sharing cleanly.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.forgeAppeal}
            alt="Subsite #11 Forensic Appeal Portal and hard-locked DM safety during live contests"
            kicker="Fair-Play Appeal & Messaging Isolation"
            title="Subsite #11 7-Day Appeal Docket & Contest DM Hard-Lock"
            summary="Encrypted SHA-256 ChronoVault dockets remain accessible for 7-day forensic appeal scheduling while direct @handle DMs pause automatically during live rated rounds."
            accentColor="#F43F5E"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 8: Community, Forge & Guidebook FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Community, Publishing & Forge FAQ"
            title="Contribution ELO, Problemsetting & Vault Security Questions"
          />
          <FaqAccordion items={COMMUNITY_FAQS} accentClass="text-violet-300" />
          <CyberMediaFrame
            src={MEDIA.forgeFaq}
            alt="Community Contribution ELO, Expert Q&A curation, and Golden Vault FAQ"
            kicker="Peer-Audited Knowledge Ecosystem"
            title="Sentinel-Gated Q&A & Read-Only Schema v1.2 Vault Protection"
            summary="High-signal discussions pair 2000+ Sentinel peer proof answers with Cloudflare-proxied Schema v1.2 vaults that never leak into client-side bundles."
            accentColor="#8B5CF6"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
