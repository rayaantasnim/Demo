/**
 * Verified Unique Pexels Cloud Media Manifest (78 Unique Photo IDs — 6 per TSX Page × 13 Pages)
 * Every single Pexels photo ID here is strictly HTTP-200 verified and used once across all TSX components,
 * with zero overlap against any meta/JSON-LD Pexels IDs in the 13 HTML entry files.
 */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

export const MEDIA = {
  // 01. HomePage (index.html)
  homeHero: pexels(36633067),
  homeArenas: pexels(6202994),
  homeEarlyBird: pexels(6801874),
  homeSecurity: pexels(3861969),
  homeWallet: pexels(5077040),
  homeRollout: pexels(30815774),

  // 02. WhyArithmoPage (why-arithmo.html)
  whyHero: pexels(6256067),
  whyEloGauntlet: pexels(4602495),
  whyProofs: pexels(22690752),
  whyHybridAi: pexels(18069299),
  whyFairness: pexels(2881222),
  whyStakeholders: pexels(3184291),

  // 03. ArchitecturePage (architecture.html)
  archHero: pexels(373543),
  archCloudflare: pexels(4497591),
  archBigInt: pexels(270348),
  archDataLake: pexels(325229),
  archMobile: pexels(1181263),
  archPwa: pexels(4497576),

  // 04. ArenasEloPage (arenas-elo.html)
  arenasHero: pexels(5412327),
  arenasShadow: pexels(34657183),
  arenasFormula: pexels(5412189),
  arenasZeroFrag: pexels(5412396),
  arenasAllRounder: pexels(30182768),
  arenasMatchmaking: pexels(5960157),

  // 05. ContestsPage (contests.html)
  contestsHero: pexels(6238050),
  contestsQuorum: pexels(28397730),
  contestsToph: pexels(1181244),
  contestsBdmo: pexels(5412285),
  contestsFlaw: pexels(33688463),
  contestsWorldCup: pexels(38819435),

  // 06. AiCorePage (ai-core.html)
  aiHero: pexels(8386440),
  aiDualModel: pexels(3861972),
  aiSympy: pexels(546819),
  aiGenome: pexels(30472477),
  aiTokenMeter: pexels(6802042),
  aiSoftPinch: pexels(3861971),

  // 07. SecurityQprt4Page (security-qprt4.html)
  secHero: pexels(5483147),
  secLockdown: pexels(1181354),
  secModule7: pexels(2599244),
  secChronoVault: pexels(4497197),
  secBlackhole: pexels(4792731),
  secLegal: pexels(2409566),

  // 08. AcademiesPage (academies.html)
  acadHero: pexels(16173473),
  acadKyb: pexels(8197545),
  acadGuildAi: pexels(8197503),
  acadDualHandle: pexels(12056501),
  acadAntiResell: pexels(36834057),
  acadGuidebook: pexels(31390421),

  // 09. PricingPage (pricing.html)
  priceHero: pexels(3861958),
  priceWallet: pexels(6801872),
  priceGrace: pexels(5980743),
  priceBotPacks: pexels(7566201),
  priceCorePacks: pexels(8370752),
  priceZeroPtw: pexels(6777579),

  // 10. SocialsForgePage (socials-forge.html)
  forgeHero: pexels(256502),
  forgeStudio: pexels(3781338),
  forgeGoldenVault: pexels(29279398),
  forgeBlogs: pexels(6549588),
  forgeQa: pexels(8199562),
  forgeGuidebook: pexels(36457238),

  // 11. GovernancePage (governance.html)
  govHero: pexels(1181675),
  govHqLadder: pexels(19391054),
  govSovereigns: pexels(8422238),
  govChronology: pexels(32148154),
  govPrivilege: pexels(32551694),
  govPatrons: pexels(15061616),

  // 12. RoadmapPage (roadmap.html)
  roadHero: pexels(7387475),
  roadTimeline: pexels(17906484),
  roadV1V3: pexels(3825569),
  roadDatabase: pexels(32525143),
  roadPwa: pexels(1406885),
  roadSpinOffs: pexels(39289023),

  // 13. PioneersPage (pioneers.html)
  pionHero: pexels(3183150),
  pionRayaan: pexels(325114),
  pionJalees: pexels(5412401),
  pionEquity: pexels(5980738),
  pionPrimeFactor: pexels(7013909),
  pionVault: pexels(31826500),

  // Additional Section Imagery (33 Unique HTTP-200 IDs for Zero Text-Only Sections)
  homeGuestDuel: pexels(1181271),
  homePortals: pexels(1181298),
  homePioneers: pexels(1181316),
  homeShowcase: pexels(1181359),

  whyMatrix: pexels(1181671),
  whyCohort: pexels(1181676),

  archHotCold: pexels(1181677),
  archRepos: pexels(1181712),

  arenasContestTab: pexels(1181715),
  arenasSimulator: pexels(1181772),
  arenasMatrix: pexels(207691),

  contestsCredits: pexels(207692),
  contestsLifecycle: pexels(256417),
  contestsDualMode: pexels(256431),

  aiLockout: pexels(256455),
  aiHqVault: pexels(256490),

  secAltEngine: pexels(267507),
  secAppeal: pexels(267885),

  acadRoster: pexels(301920),
  acadHierarchy: pexels(3183132),
  acadFaq: pexels(3183197),

  priceTiers: pexels(3184292),
  priceBonus: pexels(3184325),

  forgeAppeal: pexels(3184339),
  forgeFaq: pexels(3184465),

  govPioneers: pexels(355952),
  govFaq: pexels(4145354),

  roadHolding: pexels(4144923),
  roadCutover: pexels(5212320),
  roadFaq: pexels(5212345),

  pionCouncil: pexels(5212653),
  pionPatronage: pexels(5428003),
  pionFaq: pexels(5428012),
} as const;
