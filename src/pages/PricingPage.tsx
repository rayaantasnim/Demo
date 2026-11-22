import React, {useState} from 'react';
import {MEDIA} from '../assets/media';
import {FaqAccordion, SectionHeader, WalletCheckoutSimulator} from '../components/CommercialPrimitives';
import {CyberMediaFrame, HeroReveal, ResilientImage, ScrollReveal, SpotlightCard} from '../components/MotionPrimitives';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {GENESIS_EARLY_BIRD_PERKS, SHADOW_BOT_PACKS} from '../data/ecosystem';

const TOPUP_OPTIONS = [5, 10, 25, 50] as const;

const PRICING_FAQS = [
  {
    q: 'Why can I only complete plan and pack checkouts with Arithmo Wallet credits?',
    a: 'Routing Lemon Squeezy (global MoR) and bKash/Nagad (local BD) strictly into closed-loop Wallet top-ups keeps item checkout instantaneous (+10% automatic top-up bonus), supports @handle friend gifting, and enables our 60-second Cancellation Grace window before credits deduct.',
  },
  {
    q: 'How does the 1-minute (60s) Cancellation Grace window work?',
    a: 'After clicking Confirm Final Order on our internal checkout page, a live 60-second timer begins. If you change your mind within 60 seconds, cancelling returns 100% of held Arithmo Credits immediately with zero penalty.',
  },
  {
    q: 'Can I unlock Plus, Pro, or Singularity completely free without paying?',
    a: 'Yes! Advancing along the meritocratic Headquarters ELO Ladder automatically grants Plus at 100+ HQ ELO, Pro at 300+ HQ ELO, Singularity at 750+ HQ ELO, and 100% Unlimited Pay-As-You-Go + Headquarters AI at 1000+ Prime Sovereign.',
  },
  {
    q: 'Are Shadow Bot Gauntlet quotas enforced strictly on every plan?',
    a: 'Yes: Free (10/mo, max 1/day, ±200 ELO), Plus (20/mo, max 2/day, ±200 ELO), Pro (50/mo, max 3/day, Unbounded 0–3200+), and Singularity (150/mo, no daily cap, max 2/hr, Unbounded). Pay-As-You-Go Shadow Bot Packs expand quota anytime.',
  },
];

export const PricingPage: React.FC = () => {
  const [selectedTopup, setSelectedTopup] = useState<number>(25);

  const bonus = Number((selectedTopup * 0.1).toFixed(2));
  const totalCredits = Number((selectedTopup + bonus).toFixed(2));

  return (
    <>
      {/* Section 1: Zero Pay-to-Win Constitutional Charter */}
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
                  01 · Zero Pay-to-Win Constitutional Charter · 100% Arithmo Wallet Checkout
                </div>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Subscriptions, Shadow Bot Packs &amp; Arithmo Wallet
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.14}>
                <p className="ae-prose text-base sm:text-lg text-slate-300 leading-relaxed prose-measure">
                  Every daily contest, Sunday Mega Arena, 1v1 Bullet Blitz, Virtual Gym ghost run, and Top 128 World
                  Cup qualification is <span className="text-white font-semibold">100% Free Forever</span>. All paid
                  subscriptions, Shadow Bot Gauntlet packs, and Token bundles clear exclusively via closed-loop{' '}
                  <span className="text-cyan-300 font-semibold">Arithmo Wallet Credits</span> protected by a live
                  1-minute cancellation grace window.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href="#wallet-checkout" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap">
                    Test Wallet Checkout &amp; 60s Grace
                  </a>
                  <a href="#shadow-packs" className="btn-glass px-5 py-3 text-sm whitespace-nowrap">
                    Compare 5 Shadow Bot Packs
                  </a>
                </div>
              </HeroReveal>
            </div>
            <div className="lg:col-span-5">
              <HeroReveal delay={0.18} className="h-full">
                <div className="h-full min-h-[260px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame">
                  <ResilientImage
                    src={MEDIA.priceHero}
                    alt="Zero Pay-to-Win transparent pricing infrastructure"
                    loading="eager"
                    accentColor="#10B981"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/45 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-mono-tabular text-emerald-300 mb-1">
                      First 50 Singularity · Next 100 Pro · 5 Founding Academies
                    </div>
                    <div className="font-display text-lg font-bold text-white">
                      Compute Subsidized · Never ELO-for-Sale
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 4 Personal Subscription Plans (Including Exact Shadow Bot Gauntlet Quotas) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Personal Plans ($0 to $12.99/mo · 7-Day One-Time Free Trial on Paid Tiers)"
            title="4 Personal Subscription Tiers & Shadow Bot Quotas"
            subtitle="Unlocked free through Headquarters stewardship (100+ to 750+ HQ ELO) or reserved early via Genesis Launch Verified Cohorts."
          />

          <div className="ae-bento-grid grid md:grid-cols-2 gap-6 mb-8">
            <SpotlightCard className="rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono-tabular text-slate-400">Plan 01</div>
              <h3 className="font-display text-xl font-bold text-white">Free</h3>
              <div className="font-mono-tabular text-2xl font-bold text-white">
                $0.00<span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>
                  · <span className="text-white font-semibold">5</span> monthly queries on Arithmo Personal AI: General
                  (1x)
                </li>
                <li>
                  · <span className="text-cyan-300 font-semibold">Shadow Bot Gauntlet:</span> 10/mo · max 1/day ·
                  &plusmn;200 ELO band
                </li>
                <li>
                  · <span className="text-white font-semibold">5</span> lifetime free 1v1 pool duels (&plusmn;100 ELO)
                </li>
                <li>· All Daily &amp; Sunday Mega Contests + Unlimited Solo Virtual Gym</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-cyan-400/35">
              <div className="text-xs font-mono-tabular text-cyan-300">Plan 02 · Unlocked Free @ 100+ HQ ELO</div>
              <h3 className="font-display text-xl font-bold text-white">Plus</h3>
              <div className="font-mono-tabular text-2xl font-bold text-cyan-300">
                $2.99<span className="text-xs text-slate-400 font-normal">/mo · 7-Day Trial</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>
                  · <span className="text-white font-semibold">40</span> monthly queries on Arithmo Personal AI: General
                  (1x)
                </li>
                <li>
                  · <span className="text-cyan-300 font-semibold">Shadow Bot Gauntlet:</span> 20/mo · max 2/day ·
                  &plusmn;200 ELO band
                </li>
                <li>
                  · <span className="text-white font-semibold">5</span> daily 1v1 Bullet Blitz challenges
                </li>
                <li>· 100% Ad-Free UI, 10 Virtual Gym runs &amp; 200 bookmark vault</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-violet-400/40">
              <div className="text-xs font-mono-tabular text-violet-300">Plan 03 · Next 100 Handles FREE 3 Mo</div>
              <h3 className="font-display text-xl font-bold text-white">Pro</h3>
              <div className="font-mono-tabular text-2xl font-bold text-violet-300">
                $5.99<span className="text-xs text-slate-400 font-normal">/mo · 7-Day Trial</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>
                  · <span className="text-white font-semibold">150</span> monthly AI queries (30 Premium 2x + 120
                  General 1x)
                </li>
                <li>
                  · <span className="text-violet-300 font-semibold">Shadow Bot Gauntlet:</span> 50/mo · max 3/day ·
                  Unbounded (0–3200+)
                </li>
                <li>· 20 daily 1v1 matches + Direct @handle Friend Challenges</li>
                <li>· Unlimited Virtual Gym, Private Rooms &amp; Smart Mistake Deck</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 space-y-3 border-amber-400/45">
              <div className="text-xs font-mono-tabular text-amber-300">Plan 04 · First 50 Handles FREE 3 Mo</div>
              <h3 className="font-display text-xl font-bold text-white">Singularity</h3>
              <div className="font-mono-tabular text-2xl font-bold text-amber-300">
                $12.99<span className="text-xs text-slate-400 font-normal">/mo · 7-Day Trial</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
                <li>
                  · <span className="text-white font-semibold">100% UNLIMITED</span> Arithmo Personal AI: Premium (2x
                  Hybrid)
                </li>
                <li>
                  · <span className="text-amber-300 font-semibold">Shadow Bot Gauntlet:</span> 150/mo · no daily cap ·
                  max 2/hr · Unbounded
                </li>
                <li>· Unlimited 1v1 Duels &amp; Private Group Rooms</li>
                <li>· Arithmo Forge Hosting (1500+ ELO) &amp; Priority Forensic Appeals</li>
              </ul>
            </SpotlightCard>
          </div>

          {/* Early-Bird Cohort Strip */}
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {GENESIS_EARLY_BIRD_PERKS.map((perk) => (
              <div key={perk.title} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                <div className="font-mono-tabular" style={{color: perk.accentColor}}>
                  {perk.badge}
                </div>
                <div className="font-display font-bold text-white text-sm">{perk.title}</div>
                <div className="text-slate-400">{perk.allocation}</div>
              </div>
            ))}
          </div>
          <CyberMediaFrame
            src={MEDIA.priceTiers}
            alt="Personal Olympiad tiers from Free Forever to Singularity with organic HQ unlocks"
            kicker="Merit-Unlocked Subscription Tiers"
            title="Free Competition Forever · Upgrade via Wallet or HQ ELO"
            summary="Every personal tier unlocks organically at 100+, 300+, and 750+ Headquarters ELO—while Genesis Launch cohorts secure early access perks cleanly."
            accentColor="#00F0FF"
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 3: Interactive 100% Arithmo Wallet Checkout & 60s Cancellation Grace Simulator */}
      <section id="wallet-checkout" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Exclusive Wallet Settlement & Buyer Protection"
            title="100% Arithmo Wallet Checkout & 1-Minute Cancellation Grace"
            subtitle="Lemon Squeezy and bKash/Nagad top up your closed-loop Wallet exclusively. Try triggering an Insufficient Balance alert, loading credits (+10% Bonus), confirming an order, and testing the live 60-second abort countdown."
          />
          <WalletCheckoutSimulator />
          <div className="mt-6 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[165px] relative media-frame">
              <ResilientImage
                src={MEDIA.priceWallet}
                alt="Arithmo Wallet closed-loop Lemon Squeezy and bKash/Nagad preload ledger"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">Closed-Loop Credit Settlement (+10% Bonus)</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Wallet top-up stays non-withdrawable, exempts ELO from cash purchase, and settles instant
                subscriptions, Shadow Bot quotas, or @handle friend gifts inside strict Firestore ledgers.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: 5 Dedicated Shadow Bot Pay-As-You-Go Packs */}
      <section id="shadow-packs" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · Precision Bot Training Add-Ons"
            title="5 Dedicated Shadow Bot Pay-As-You-Go Packs"
            subtitle="Expand monthly Gauntlet limits or remove ±200 ELO calibration caps without switching monthly subscriptions."
          />
          <div className="mb-6 rounded-2xl border border-violet-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.priceBotPacks}
                alt="Precision Shadow Bot Gauntlet pack add-ons up to 3200+ ELO"
                loading="lazy"
                accentColor="#8B5CF6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Zero Subscription Lock-In</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Scale Unbounded Shadow Bot challenges cleanly on-demand whenever preparing for regional or national
                Olympiad qualifiers—without upgrading your monthly plan tier.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHADOW_BOT_PACKS.map((pack) => (
              <SpotlightCard key={pack.id} className="rounded-2xl p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span style={{color: pack.accent}}>{pack.quotaUnit}</span>
                    <span className="text-emerald-300 font-bold">${pack.price.toFixed(2)}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{pack.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pack.summary}</p>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
                  {pack.perks.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: 8 Core Pay-As-You-Go Token Packs Storefront */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Zero Expiration on Core Token Packs · @handle Friend Gifting Enabled"
            title="8-Pack Core AI, Duel & Post-Mortem Store"
          />
          <div className="ae-bento-grid grid md:grid-cols-2 gap-5">
            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">Pack 01</div>
              <div className="font-display font-bold text-white">AI General Starter Pack</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$0.99 · 20 Tokens</div>
              <p className="text-xs text-slate-400">
                20 permanent no-deadline tokens for Arithmo Personal AI: General (1x).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-cyan-300">Pack 02</div>
              <div className="font-display font-bold text-white">AI Premium 2x Deep Pack</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$2.99 · 30 Tokens</div>
              <p className="text-xs text-slate-400">
                30 permanent tokens for Arithmo Personal AI: Premium (2x) Hybrid Models &amp; High Priority.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Pack 03</div>
              <div className="font-display font-bold text-white">24-Hour AI Grandmaster Sprint</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$3.99 · 24 Hours</div>
              <p className="text-xs text-slate-400">
                24 hours of UNLIMITED access to BOTH General (1x) and Premium (2x) models.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-violet-300">Pack 04</div>
              <div className="font-display font-bold text-white">Duelist 5-Pack</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$0.99 · 5 Tokens</div>
              <p className="text-xs text-slate-400">
                5 permanent tokens for 1v1 Bullet Blitz &amp; Direct Friend Challenges (@handle/Link).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-amber-300">Pack 05</div>
              <div className="font-display font-bold text-white">24-Hour Unlimited Arena &amp; Room Pass</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$1.99 · 24 Hours</div>
              <p className="text-xs text-slate-400">
                24 hours of UNLIMITED 1v1 duels + Private Virtual Gym Rooms (max 10 members).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-amber-300">Pack 06</div>
              <div className="font-display font-bold text-white">Forge Contest Host Token</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$2.49 · 1 Host Pass</div>
              <p className="text-xs text-slate-400">
                One-time pass to host 1 custom contest on Subsite #10 (Arithmo Forge) (1500+ ELO required).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-emerald-300">Pack 07</div>
              <div className="font-display font-bold text-white">Deep Contest Post-Mortem &amp; Mistake Deck</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$0.99 · Full Report</div>
              <p className="text-xs text-slate-400">
                Solve-time heatmap, weak-tag report &amp; 50-card spaced-repetition deck per completed round.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-xs font-mono-tabular text-rose-300">Pack 08</div>
              <div className="font-display font-bold text-white">Arithmo Wallet Credit Bundles</div>
              <div className="text-lg font-mono-tabular text-emerald-300">$5 / $10 / $25 / $50</div>
              <p className="text-xs text-slate-400">
                Instant +10% free bonus credit usable for packs, friend @handle gifting, and academy dues.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.priceCorePacks}
                alt="Permanent zero-expiration AI, Duelist, and Mistake Deck token bundles"
                loading="lazy"
                accentColor="#10B981"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-emerald-300">Lifetime Token Persistence &amp; @handle Gifting</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Core Token packs never expire across semesters or summer Olympiad camps—and any Arithmo Wallet holder
                can gift AI or Duelist packs directly to teammates via verified <code className="text-cyan-300">@handle</code>.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Closed-Loop Arithmo Wallet (+10% Bonus Calculator) & Contribution ELO Rewards */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Closed-Loop Credits + Earned Contribution Milestones"
            title="Arithmo Wallet (+10% Top-Up Bonus & Contribution ELO Grants)"
          />
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                  Preload <span className="text-white font-semibold">Arithmo Credits</span> ($5–$50) via{' '}
                  <span className="text-cyan-300">Lemon Squeezy</span> or{' '}
                  <span className="text-rose-300">bKash/Nagad</span> with an automatic{' '}
                  <span className="text-emerald-400 font-semibold">+10% Top-Up Bonus</span>. Earn automatic free wallet
                  credit grants at <span className="font-mono-tabular text-cyan-300">+50</span>,{' '}
                  <span className="font-mono-tabular text-cyan-300">+100</span>,{' '}
                  <span className="font-mono-tabular text-cyan-300">+250</span>, and{' '}
                  <span className="font-mono-tabular text-cyan-300">+500 Contribution ELO</span> milestones via approved
                  Forge problemsetting, Blog-to-Lab promotions (+5), and Guidebooks (+2).
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {TOPUP_OPTIONS.map((amount) => {
                    const isActive = selectedTopup === amount;
                    return (
                      <button
                        key={amount}
                        type="button"
                        data-wallet-topup={amount}
                        onClick={() => setSelectedTopup(amount)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-mono-tabular transition-colors whitespace-nowrap ${
                          isActive
                            ? 'border-cyan-400 bg-cyan-400/15 text-white font-semibold'
                            : 'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        ${amount} Top-Up
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-6 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4 text-center">
                  <div className="text-xs text-slate-400">Cash Deposit</div>
                  <div id="wallet-selected-amount" className="font-mono-tabular text-xl font-bold text-white mt-1">
                    ${selectedTopup.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-400/35 bg-emerald-400/10 p-4 text-center">
                  <div className="text-xs text-emerald-300">+10% Wallet Bonus</div>
                  <div id="wallet-bonus-amount" className="font-mono-tabular text-xl font-bold text-emerald-300 mt-1">
                    +${bonus.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 p-4 text-center">
                  <div className="text-xs text-cyan-300">Final Balance</div>
                  <div id="wallet-total-credit" className="font-mono-tabular text-lg font-bold text-white mt-1">
                    ${totalCredits.toFixed(2)} Credits
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CyberMediaFrame
            src={MEDIA.priceBonus}
            alt="Arithmo Wallet automatic 10 percent top-up bonus and Contribution ELO milestones"
            kicker="Closed-Loop +10% Top-Up & Contribution Grants"
            title="Instant Bonus Credits & +50 to +500 Contribution ELO Rewards"
            summary="Every cash wallet top-up adds +10% bonus credits immediately, while verified Forge problemsetting, Blog-to-Lab articles, and Guidebook theorems grant free credits."
            accentColor="#10B981"
            reverse
            className="mt-6"
          />
        </ScrollReveal>
      </section>

      {/* Section 7: Institutional vs Personal Value Comparison */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Personal vs. Institutional Scaling"
            title="Individual Competitors vs. Schools & Academies"
          />
          <div className="ae-deep-grid grid md:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-cyan-400/30">
              <div className="text-xs font-mono-tabular text-cyan-300">Personal Contenders</div>
              <h3 className="font-display text-xl font-bold text-white">Individual Growth &amp; Self-Study</h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Includes Free-forever rated arenas across all 5 topics, optional AI token &amp; Shadow Bot packs
                ($0.99+), and automatic free subscription upgrades unlocked purely through Headquarters stewardship (100+
                to 1000+ HQ ELO).
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-3 border-violet-400/30">
              <div className="text-xs font-mono-tabular text-violet-300">Schools &amp; Academies</div>
              <h3 className="font-display text-xl font-bold text-white">
                Cohort Analytics &amp; Inter-Academy Clashes
              </h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                Starts at $29.99/mo with $0.99/member dues (first 5 Founding Academies lock 25% OFF for 3 months),
                waiving up to 10 Admin seats and unlocking Guild AI Batch Radar, Virtual Edu Labs, and Inter-Academy
                Clashes.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[160px] relative media-frame">
              <ResilientImage
                src={MEDIA.priceZeroPtw}
                alt="Constitutional Zero Pay-to-Win guarantee isolating compute subscriptions from ELO"
                loading="lazy"
                accentColor="#10B981"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col justify-center space-y-1.5">
              <div className="text-xs font-mono-tabular text-emerald-300">Verified Zero Pay-to-Win Firewall</div>
              <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                Subscriptions fund Gemini/Qwen-Math hybrid mentoring, Mistake Decks, and private training rooms—while
                Daily Contests, Sunday Mega, and World Cup qualification always remain 100% Free Forever.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Billing Terms, Guardian Custodianship & Billing FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Ethical Youth-First Billing, Custodianship & FAQ"
            title="Transparent Billing Terms & Commercial FAQ"
          />
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300">
                Merchant of Record + Guardian Custodianship
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Zero-Refund Post-Grace &amp; Closed-Loop Integrity
              </h3>
              <p className="ae-prose text-sm text-slate-300 leading-relaxed">
                After the <span className="text-emerald-300 font-semibold">1-minute (60s) Cancellation Grace window</span>{' '}
                closes and compute tokens provision, purchases operate under a strict{' '}
                <span className="text-white font-semibold">1-month minimum cycle &amp; Zero-Refund policy</span>. Global
                VAT/GST is managed via <span className="text-white font-semibold">Lemon Squeezy / Paddle</span> MoR and
                local Bangladesh settlement runs via <span className="text-white font-semibold">bKash/Nagad</span>{' '}
                under Parent/Guardian Financial Custodianship.
              </p>
              <a href="pioneers.html" className="btn-cyber px-5 py-2.5 text-xs whitespace-nowrap inline-flex">
                Read Governance &amp; Equity Charter
              </a>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[155px] w-full relative media-frame mt-2">
                <ResilientImage
                  src={MEDIA.priceGrace}
                  alt="60-second Cancellation Grace window and Guardian Custodianship ledger"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <FaqAccordion items={PRICING_FAQS} accentClass="text-emerald-300" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
