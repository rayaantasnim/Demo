import React, {useState} from 'react';
import {Building2, CheckCircle2, FileCheck2, ShieldAlert} from 'lucide-react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';

type AcademyTierKey = 'general' | 'premium' | 'supreme' | 'enterprise';

interface AcademyTierConfig {
  label: string;
  base: number;
  firstMonth?: number;
  max: number;
  due: number;
  admins: string;
  tokens: number;
  perks: string;
}

const ACADEMY_TIERS: Record<AcademyTierKey, AcademyTierConfig> = {
  general: {
    label: 'Academy General ($29.99/mo · Max 100 · $0.99/member)',
    base: 29.99,
    max: 100,
    due: 0.99,
    admins: '1–5 Admins',
    tokens: 20,
    perks: 'Standard Institutional Dashboard · Inter-Academy Clash & Edu Lab Paid Add-ons',
  },
  premium: {
    label: 'Academy Premium ($49.99/mo · Max 500 · $2.99/member)',
    base: 49.99,
    max: 500,
    due: 2.99,
    admins: '1–5 Admins',
    tokens: 80,
    perks: 'Batch Radar Included · Inter-Academy Clash ($4.99) & Virtual Edu Lab ($2.99/24h)',
  },
  supreme: {
    label: 'Academy Supreme ($79.99/mo · Max 1,000 · $6.99/member)',
    base: 79.99,
    max: 1000,
    due: 6.99,
    admins: '1–5 Admins',
    tokens: 200,
    perks: 'ALL Institutional Add-ons FREE (Clash, Guidebook $14.99/mo, Edu Lab, On-Demand Contests)',
  },
  enterprise: {
    label: 'Academy Enterprise ($149.99 1st mo / $79.99/mo · Unlimited)',
    base: 79.99,
    firstMonth: 149.99,
    max: 2000,
    due: 5.99,
    admins: '1–10 Admins',
    tokens: 200,
    perks:
      'Unlimited Roster Scaling · $5.99/member (<1,000) / $7.99/member (>1,000) · +15 Guild AI Tokens per 50 extra members · All Supreme Perks Free',
  },
};

const ACADEMY_FAQS = [
  {
    q: 'How do the First 5 Founding Academies claim 25% OFF for 3 months?',
    a: 'Submit institutional credentials via the instant Pop-Up KYB verification modal during onboarding. Once manual registry checks approve your school or math club among the first 5 Founding Academies, a 25% discount applies automatically across your first 3 monthly invoices.',
  },
  {
    q: 'Does a student’s classroom Task homework affect their personal global ELO?',
    a: 'Never. Dual-Handle Context Routing (@student vs @student-academyname) isolates classroom assignments, internal drills, and Virtual Edu Labs from personal arena ratings—updating Academy standings only during approved Inter-Academy Clashes.',
  },
  {
    q: 'Who earns Contribution ELO from the Exclusive Academy Guidebook?',
    a: 'All Exclusive Academy Guidebooks are HQ-authored deep Olympiad masterworks ($14.99/mo; 100% Free on Supreme & Enterprise). Whenever an enrolled Member or Mentor has a theorem curated and verified by Arithmo GuideCurator AI + HQ, it publishes globally and grants +2 Contribution ELO to their personal @handle (academies hold no Contribution ELO).',
  },
];

export const AcademiesPage: React.FC = () => {
  const [tierKey, setTierKey] = useState<AcademyTierKey>('general');
  const [rawMembers, setRawMembers] = useState<number>(100);
  const [foundingDiscount, setFoundingDiscount] = useState<boolean>(true);
  const [contextMode, setContextMode] = useState<'personal' | 'academy'>('academy');
  const [kybModalOpen, setKybModalOpen] = useState<boolean>(false);

  const tier = ACADEMY_TIERS[tierKey];
  const members = tierKey === 'enterprise' ? rawMembers : Math.min(rawMembers, tier.max);
  const sliderMax = tierKey === 'enterprise' ? 2000 : tier.max;

  let memberFeeSum = 0;
  let tokens = tier.tokens;
  if (tierKey === 'enterprise') {
    const under1000 = Math.min(members, 1000);
    const over1000 = Math.max(0, members - 1000);
    memberFeeSum = under1000 * 5.99 + over1000 * 7.99;
    tokens = 200 + Math.floor(over1000 / 50) * 15;
  } else {
    memberFeeSum = members * tier.due;
  }

  const rawTotal = tier.base + memberFeeSum;
  const discountedTotal = foundingDiscount ? rawTotal * 0.75 : rawTotal;
  const baseDisplay = tierKey === 'enterprise' ? '$149.99 1st mo / $79.99 base' : `$${tier.base.toFixed(2)}/mo`;
  const dueDisplay = tierKey === 'enterprise' ? '$5.99 (<1k) / $7.99 (>1k)' : `$${tier.due.toFixed(2)}/member`;

  const handleTierChange = (nextKey: AcademyTierKey) => {
    setTierKey(nextKey);
    const nextTier = ACADEMY_TIERS[nextKey];
    if (nextKey !== 'enterprise' && rawMembers > nextTier.max) {
      setRawMembers(nextTier.max);
    }
  };

  return (
    <>
      {/* Section 1: B2B Institutional Olympiad Vision */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#8B5CF6" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />
        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <HeroReveal delay={0.02}>
                <div className="text-xs text-cyan-300 font-medium">
                  01 · arithmo-edge.github.io/academy/ · First 5 Founding Academies = 25% OFF for 3 Months
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">Arithmo Academy Arena</h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Built for Olympiad training centers, high schools, university math guilds, and national coaching
                  programs. Scale rosters from 100 to 2,000+ students, waive 1–10 Admin seat dues, deploy{' '}
                  <span className="text-white font-semibold">Batch Radar &amp; Arithmo Guild AI</span>, and compete in
                  rated <span className="text-white font-semibold">Inter-Academy Clashes</span>.
                </p>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[280px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.acadHero}
                    alt="Institutional mathematics academy collaboration"
                    loading="eager"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-cyan-300 mb-1">Dual-Context Institutional SaaS</div>
                    <div className="font-display text-lg font-bold text-white">
                      KYB-Verified Schools · 6 Dedicated Guild AI Engines
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Academy Roster, Guild AI & Founding 25% Discount Calculator */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Real-Time Institutional Estimator"
            title="Interactive Roster, Guild AI & Founding 25% Discount Calculator"
            subtitle="Toggle the First 5 Founding Academies 25% Early-Bird discount across all 4 institutional tiers."
          />

          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <label htmlFor="acad-tier-select" className="block text-xs font-mono-tabular text-slate-400 mb-2">
                    Select Academy Tier
                  </label>
                  <select
                    id="acad-tier-select"
                    value={tierKey}
                    onChange={(e) => handleTierChange(e.target.value as AcademyTierKey)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {(Object.keys(ACADEMY_TIERS) as AcademyTierKey[]).map((key) => (
                      <option key={key} value={key}>
                        {ACADEMY_TIERS[key].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <label htmlFor="acad-members-slider" className="text-slate-400">
                      Active Roster Size
                    </label>
                    <span id="acad-members-val" className="font-mono-tabular text-cyan-300 font-semibold">
                      {members.toLocaleString()} Members
                    </span>
                  </div>
                  <input
                    id="acad-members-slider"
                    type="range"
                    min={10}
                    max={sliderMax}
                    value={members}
                    step={10}
                    onChange={(e) => setRawMembers(Number(e.target.value))}
                    className="cyber-range w-full"
                  />
                </div>

                <label className="flex items-center gap-2.5 rounded-xl border border-amber-400/35 bg-amber-400/10 p-3.5 text-xs text-amber-200 cursor-pointer">
                  <input
                    id="acad-founding-check"
                    type="checkbox"
                    checked={foundingDiscount}
                    onChange={(e) => setFoundingDiscount(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span>
                    Apply <strong>Founding Academy Cohort: 25% OFF (First 3 Months)</strong>
                  </span>
                </label>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300 space-y-1">
                  <div className="text-cyan-300 font-semibold">Included Fee-Waived Governance:</div>
                  <div id="acad-roles-cap">{tier.admins} (100% Fee Waived) · 1–15 Mentors</div>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-5">
                  <div className="text-xs text-slate-400">Base Subscription</div>
                  <div id="acad-base-fee" className="font-mono-tabular text-xl font-bold text-white mt-1">{baseDisplay}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-5">
                  <div className="text-xs text-slate-400">Per-Member Monthly Due</div>
                  <div id="acad-member-due" className="font-mono-tabular text-xl font-bold text-white mt-1">{dueDisplay}</div>
                </div>
                <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 p-5">
                  <div id="acad-total-label" className="text-xs text-cyan-300">
                    {foundingDiscount ? 'Founding 25% OFF Invoice (Mo 1–3)' : 'Projected Monthly Total'}
                  </div>
                  <div id="acad-monthly-total" className="font-mono-tabular text-2xl font-bold text-white mt-1">
                    ${discountedTotal.toFixed(2)}/mo
                  </div>
                  <div
                    id="acad-raw-strike"
                    className={`font-mono-tabular text-[11px] text-slate-400 line-through mt-0.5${
                      foundingDiscount ? '' : ' hidden'
                    }`}
                  >
                    Standard: ${rawTotal.toFixed(2)}/mo
                  </div>
                </div>
                <div className="rounded-xl border border-violet-400/40 bg-violet-400/10 p-5">
                  <div className="text-xs text-violet-300">Monthly Guild AI Allowance</div>
                  <div id="acad-guild-tokens" className="font-mono-tabular text-xl font-bold text-white mt-1">
                    {tokens} Guild AI Messages/mo
                  </div>
                </div>
                <div className="sm:col-span-2 rounded-xl border border-slate-800 bg-slate-950/75 p-4 text-xs text-slate-300">
                  <span className="text-cyan-300 font-semibold">Included Suite &amp; Add-ons:</span>{' '}
                  <span id="acad-addons-summary">{tier.perks}</span>
                </div>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.acadRoster}
            alt="Real-time institutional roster calculator and Founding Academy cohort seats"
            kicker="Founding Cohort Telemetry"
            title="Transparent Institutional Forecasting & Fee-Waived Governance"
            summary="Model monthly member dues, Guild AI allocations, and early-bird 25% cohort discounts across starter math clubs through national universities."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 3: All 4 Academy Tiers & Member Dues Comparison Matrix */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Institutional Tier Breakdown"
            title="All 4 Academy Tiers & Member Dues"
          />
          <div className="ae-bento-grid grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono-tabular text-slate-400">Tier 01 · Starter Club</div>
              <h3 className="font-display text-xl font-bold text-white">Academy General</h3>
              <div className="font-mono-tabular text-2xl font-bold text-cyan-300">
                $29.99<span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>· Max 100 Members ($0.99/member due)</li>
                <li>· 1–5 Admins (100% Fee Waived)</li>
                <li>· 1–15 Mentors · 20 Guild AI Messages/mo</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-violet-400/35">
              <div className="text-xs font-mono-tabular text-violet-300">Tier 02 · Growing School</div>
              <h3 className="font-display text-xl font-bold text-white">Academy Premium</h3>
              <div className="font-mono-tabular text-2xl font-bold text-violet-300">
                $49.99<span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>· Max 500 Members ($2.99/member due)</li>
                <li>· 1–5 Admins + 1–15 Mentors</li>
                <li>· 80 Guild AI Messages/mo + Batch Radar</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-cyan-400/45">
              <div className="text-xs font-mono-tabular text-cyan-300">Tier 03 · All-Inclusive</div>
              <h3 className="font-display text-xl font-bold text-white">Academy Supreme</h3>
              <div className="font-mono-tabular text-2xl font-bold text-cyan-300">
                $79.99<span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>· Max 1,000 Members ($6.99/member due)</li>
                <li>· 200 Guild AI Messages/mo</li>
                <li>
                  · <span className="text-emerald-300 font-semibold">ALL Paid Add-ons FREE</span> (Clash, Edu Lab,
                  Guidebook)
                </li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-amber-400/45">
              <div className="text-xs font-mono-tabular text-amber-300">Tier 04 · National / University</div>
              <h3 className="font-display text-xl font-bold text-white">Academy Enterprise</h3>
              <div className="font-mono-tabular text-xl font-bold text-amber-300">
                $149.99 <span className="text-xs text-slate-400 font-normal">1st mo / $79.99 base</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                <li>· Unlimited Members ($5.99 &lt;1,000 / $7.99 &gt;1,000)</li>
                <li>· 1–10 Admins (Waived) + 1–15 Mentors</li>
                <li>· +15 Guild AI Tokens per 50 extra members · All Perks Free</li>
              </ul>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-violet-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
              <ResilientImage
                src={MEDIA.acadGuildAi}
                alt="Arithmo Guild AI cohort batch radar and institutional seat analytics"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Arithmo Guild AI &amp; Batch Radar</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every institutional tier unlocks centralized homework workflows, automated cohort weakness clustering,
                and up to 10 completely fee-waived Admin faculty seats.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: 3-Role Academy Hierarchy & Centralized Task Tab */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Governance & Classroom Operations"
            title="3-Role Hierarchy, Centralized Task Tab & Batch Radar"
          />
          <div className="ae-bento-grid-3 grid md:grid-cols-3 gap-6">
            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-cyan-400/30">
              <div className="text-xs font-mono-tabular text-cyan-300">Role 01 · Admins (1–5 or 1–10)</div>
              <h3 className="font-display text-lg font-bold text-white">Seat-Waived Governors</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All 1–5 Admins (1–10 on Enterprise) have monthly seat dues waived. Manage KYB verification, Guild AI
                budgets, Inter-Academy Clashes, and Mentor permissions.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-violet-400/30">
              <div className="text-xs font-mono-tabular text-violet-300">Role 02 · Mentors (1–15)</div>
              <h3 className="font-display text-lg font-bold text-white">Instructors &amp; Problem Curators</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Assign practice sets inside the Centralized Task Tab, inspect Batch Radar cohort bottlenecks, and run
                Virtual Edu Lab proof walkthroughs.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-2 border-emerald-400/30">
              <div className="text-xs font-mono-tabular text-emerald-300">Role 03 · Enrolled Members</div>
              <h3 className="font-display text-lg font-bold text-white">Synchronized Student Contenders</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Complete institutional assignments in the Task Tab under academy-scoped handles while climbing personal
                arena ELOs independently.
              </p>
            </SpotlightCard>
          </div>
          <CyberMediaFrame
            src={MEDIA.acadHierarchy}
            alt="3-Role Academy hierarchy uniting seat-waived admins, mentors, and students"
            kicker="3-Role Institutional Flow"
            title="Admin Governors, Mentor Curators & Synchronized Task Tabs"
            summary="Separate institutional oversight from student personal ratings while empowering mentors with unified Task Tab assignments and Batch Radar heatmaps."
            accentColor="#8B5CF6"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 5: Interactive Dual-Handle Context Switcher & Pop-Up KYB Preview */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Clean Context Separation & Manual KYB Onboarding"
            title="Interactive Dual-Handle Context Switcher & Pop-Up KYB"
          />
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="ae-prose text-sm sm:text-base text-slate-300 leading-relaxed">
                A student studying under Dhaka Math Club carries both a personal handle (
                <span className="font-mono-tabular text-cyan-300">@username</span>) and an isolated academy workspace key
                (<span className="font-mono-tabular text-violet-300">@username-academyname</span>). New institutions
                complete manual <strong>Pop-Up KYB verification</strong> prior to Clash &amp; seat provisioning.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  data-acad-ctx="personal"
                  onClick={() => setContextMode('personal')}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap ${
                    contextMode === 'personal'
                      ? 'border-cyan-400 bg-cyan-400/15 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Active Scope: @student (Personal)
                </button>
                <button
                  type="button"
                  data-acad-ctx="academy"
                  onClick={() => setContextMode('academy')}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap ${
                    contextMode === 'academy'
                      ? 'border-violet-400 bg-violet-400/15 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Active Scope: @student-dhakamath (Academy)
                </button>
                <button
                  type="button"
                  data-acad-kyb-toggle=""
                  onClick={() => setKybModalOpen((prev) => !prev)}
                  className="btn-glass px-4 py-2 text-xs whitespace-nowrap"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span data-acad-kyb-label="">{kybModalOpen ? 'Hide Pop-Up KYB Spec' : 'Preview Pop-Up KYB Modal'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel rounded-2xl p-6 space-y-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span data-acad-ctx-handle="" className={contextMode === 'personal' ? 'text-cyan-300' : 'text-violet-300'}>
                    {contextMode === 'personal' ? '@student' : '@student-dhakamath'}
                  </span>
                  <span className="text-slate-400">engine.js Active Context</span>
                </div>
                <div data-acad-ctx-title="" className="font-display text-lg font-bold text-white">
                  {contextMode === 'personal'
                    ? 'Global Arena ELO + Closed-Loop Wallet Mode'
                    : 'Institutional Classroom & Task Tab Mode'}
                </div>
                <p data-acad-ctx-desc="" className="text-xs text-slate-300 leading-relaxed">
                  {contextMode === 'personal'
                    ? 'Scores update 10 Core Arena ELOs, 1v1 Bullet Blitz rankings, Personal AI quotas, and individual World Cup standings.'
                    : 'Scores update Academy Task Tab mastery, Batch Radar mentor heatmaps, Virtual Edu Lab sessions, and official Inter-Academy Clashes.'}
                </p>
              </div>

              <div
                data-acad-kyb-panel=""
                className={`rounded-2xl border border-cyan-400/40 bg-slate-950/90 p-5 space-y-2.5 text-xs${
                  kybModalOpen ? '' : ' hidden'
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>Pop-Up KYB Institutional Verification Packet</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Official school/club domain &amp; registry ID</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Lead Admin Gmail SSO &amp; faculty letter</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Campus subnet whitelist (anti-alt guard)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Anti-Reselling Covenant e-signature</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] relative media-frame">
                  <ResilientImage
                    src={MEDIA.acadDualHandle}
                    alt="Dual-handle identity routing isolating personal ELO from classroom homework"
                    loading="lazy"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono-tabular text-cyan-300">
                    Dual-Handle Scope Isolation
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 overflow-hidden aspect-[16/10] relative media-frame">
                  <ResilientImage
                    src={MEDIA.acadKyb}
                    alt="Pop-Up KYB verification credential packet for Founding Academies"
                    loading="lazy"
                    accentColor="#8B5CF6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono-tabular text-violet-300">
                    Pop-Up KYB Registry Shield
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: 5-Layer Institutional Anti-Reselling Shield */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · SaaS Seat Integrity"
            title="5-Layer Institutional Anti-Reselling Shield"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5">
              <div className="text-cyan-300 font-semibold">01 · KYB Entity Bind</div>
              <p className="text-slate-400">
                Seats bind strictly to verified school/academy domains and registration IDs.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5">
              <div className="text-violet-300 font-semibold">02 · Member Churn Throttle</div>
              <p className="text-slate-400">Blocks rapid swap/resell rotation of enrolled student handles mid-month.</p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5">
              <div className="text-emerald-300 font-semibold">03 · Geo-IP Coherence</div>
              <p className="text-slate-400">
                Flags disparate commercial resale subnets masquerading as one local campus.
              </p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5">
              <div className="text-amber-300 font-semibold">04 · Guild Token Watermark</div>
              <p className="text-slate-400">Audits anomalous 24/7 API bot harvesting against Guild AI quotas.</p>
            </SpotlightCard>
            <SpotlightCard className="rounded-2xl p-4 space-y-1.5">
              <div className="text-rose-300 font-semibold">05 · Contractual Revocation</div>
              <p className="text-slate-400">Immediate suspension of third-party gray-market seat brokers.</p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-rose-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.acadAntiResell}
                alt="5-Layer institutional Anti-Reselling covenant protection"
                loading="lazy"
                accentColor="#F43F5E"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-rose-300">Verified School Subnet Protection</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Academy seats cannot be brokered on third-party marketplaces—preserving fair founding discounts strictly
                for accredited schools, universities, and genuine Olympiad math clubs.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Add-Ons, Dual Standings & HQ-Authored Academy Guidebook */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Institutional Add-Ons, Standings & Guidebook"
            title="Paid Add-Ons (Free on Supreme+) & Dual Academy Standings"
          />
          <div className="ae-deep-grid grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300">
                À-La-Carte Add-ons (Free on Supreme &amp; Enterprise)
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Institutional Add-On Modules</h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between gap-3 border-b border-slate-800 pb-2">
                  <span className="text-white">Inter-Academy Clash Ticket</span>
                  <span className="font-mono-tabular text-cyan-300 whitespace-nowrap">$4.99 / clash</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-slate-800 pb-2">
                  <span className="text-white">HQ-Authored Academy Guidebook ($14.99/mo · +2 Personal ELO)</span>
                  <span className="font-mono-tabular text-cyan-300 whitespace-nowrap">$14.99 / mo</span>
                </div>
                <div className="flex justify-between gap-3 border-b border-slate-800 pb-2">
                  <span className="text-white">Virtual Edu Lab (Collaborative Board)</span>
                  <span className="font-mono-tabular text-cyan-300 whitespace-nowrap">$2.99 / 24h</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-white">Supreme &amp; Enterprise Tiers</span>
                  <span className="font-mono-tabular text-emerald-400 font-semibold whitespace-nowrap">
                    ALL INCLUDED FREE
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border-violet-400/30">
              <div className="text-xs font-mono-tabular text-violet-300">arithmo-edge.github.io/standings/</div>
              <h3 className="font-display text-2xl font-bold text-white">Dual Academy Standings System</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Small elite Olympiad boutiques and giant urban schools compete fairly across two parallel institutional
                rankings:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-cyan-300 font-semibold text-sm">Academy Score</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Computed from the Top 50% Roster Average ELO—rewarding deep cohort-wide mastery.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-amber-300 font-semibold text-sm">Academy Prestige</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Sum of Top 15 Members&apos; ELO + Inter-Academy Clash crowns—spotlighting peak Olympiad talent.
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[160px] w-full relative media-frame">
                <ResilientImage
                  src={MEDIA.acadGuidebook}
                  alt="HQ-authored Exclusive Academy Guidebook Olympiad reference curriculum"
                  loading="lazy"
                  accentColor="#8B5CF6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/35 to-transparent" />
                <div className="absolute bottom-2.5 left-4 right-4 text-xs font-mono-tabular text-violet-300">
                  Exclusive Academy Guidebook · +2 Personal Contribution ELO
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Institutional Onboarding FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · School & Club Procurement FAQ"
            title="Institutional Onboarding & KYB Questions"
          />
          <FaqAccordion items={ACADEMY_FAQS} />
          <CyberMediaFrame
            src={MEDIA.acadFaq}
            alt="Institutional KYB verification and Olympiad school onboarding FAQ"
            kicker="Verified Institutional Onboarding"
            title="Manual KYB Approval & Inter-Academy Clash Readiness"
            summary="Schools and Olympiad clubs clear Pop-Up KYB verification rapidly to activate subnet anti-smurf safeguards, fee-waived Admin seats, and Clash tickets."
            accentColor="#10B981"
            className="mt-6"
          />
        </ScrollReveal>
      </section>
    </>
  );
};
