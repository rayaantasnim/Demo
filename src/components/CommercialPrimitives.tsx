import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock,
  Link2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Swords,
  UserCheck,
  Wallet,
} from 'lucide-react';
import {
  ARENA_CATALOG,
  ArenaKey,
  SHADOW_BOT_PACKS,
  SHADOW_BOT_PERSONAS,
  resolveShadowBotPersona,
} from '../data/ecosystem';

export const SectionHeader: React.FC<{
  kicker: string;
  title: string;
  subtitle?: string;
  accentClass?: string;
  action?: React.ReactNode;
}> = ({kicker, title, subtitle, accentClass = 'text-cyan-300', action}) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8" data-3d-reveal="true">
      <div className="space-y-1.5 max-w-3xl">
        <p className={`text-xs font-mono-tabular font-semibold tracking-wide ${accentClass}`}>{kicker}</p>
        <h2 className="section-title-fluid font-display font-bold ae-title-gradient">{title}</h2>
        {subtitle && <p className="ae-prose text-sm sm:text-base text-slate-300 prose-measure pt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export interface FaqItem {
  q: string;
  a: string;
}

export const FaqAccordion: React.FC<{items: FaqItem[]; accentClass?: string}> = ({
  items,
  accentClass = 'text-cyan-300',
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div data-faq-accordion="" className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.q}
            data-faq-item=""
            className={`rounded-2xl border transition-colors ${
              isOpen ? 'border-cyan-400/40 bg-slate-900/75' : 'border-slate-800 bg-slate-950/65 hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              data-faq-trigger=""
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
            >
              <span className="font-display text-sm sm:text-base font-semibold text-white">{item.q}</span>
              <ChevronDown
                data-faq-icon=""
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${accentClass} ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div data-faq-panel="" className={`overflow-hidden ${isOpen ? '' : 'hidden'}`}>
              <div className="px-5 pb-4 pt-1 border-t border-slate-800/70 ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ============================================================================
 * 1. Home Page: No-Login 60-Second Guest Math Duel Live Widget
 * ============================================================================ */
interface GuestProblem {
  id: string;
  arenaKey: ArenaKey;
  arenaLabel: string;
  statement: string;
  hint: string;
  answer: string;
  explanation: string;
  baseElo: number;
}

const GUEST_PROBLEMS: GuestProblem[] = [
  {
    id: 'nt-2026',
    arenaKey: 'nt',
    arenaLabel: 'Number Theory · Subsite #1',
    statement: 'Find the remainder when 2²⁰²⁶ + 3²⁰²⁶ is divided by 5.',
    hint: 'Euler / mod-4 cyclicity: 2² ≡ −1 (mod 5) and 3² ≡ −1 (mod 5). Determine (−1)¹⁰¹³ + (−1)¹⁰¹³ modulo 5.',
    answer: '3',
    explanation:
      'Since 2² ≡ −1 (mod 5), 2²⁰²⁶ = (2²)¹⁰¹³ ≡ −1 ≡ 4 (mod 5). Likewise 3² ≡ −1 (mod 5) gives 3²⁰²⁶ ≡ 4 (mod 5). Thus 4 + 4 = 8 ≡ 3 (mod 5).',
    baseElo: 1620,
  },
  {
    id: 'alg-vieta',
    arenaKey: 'alg',
    arenaLabel: 'Algebra · Subsite #2',
    statement: 'Let r and s be the roots of x² − 14x + 29 = 0. Compute the exact integer value of r² + s².',
    hint: 'Apply Vieta’s formulas: find (r + s) and (r·s), then rewrite r² + s² as (r + s)² − 2rs.',
    answer: '138',
    explanation: 'By Vieta’s formulas, r + s = 14 and rs = 29. Therefore r² + s² = 14² − 2(29) = 196 − 58 = 138.',
    baseElo: 1580,
  },
  {
    id: 'comb-paths',
    arenaKey: 'comb',
    arenaLabel: 'Combinatorics · Subsite #4',
    statement: 'How many 6-bit binary strings contain no two adjacent 1s? (Include 000000 in your count.)',
    hint: 'Let Fₙ count valid n-bit strings ending in 0 or 1: F₁ = 2, F₂ = 3, and Fₙ = Fₙ₋₁ + Fₙ₋₂.',
    answer: '21',
    explanation: 'Using the shifted Fibonacci recurrence F₁ = 2, F₂ = 3: F₃ = 5, F₄ = 8, F₅ = 13, F₆ = 21.',
    baseElo: 1680,
  },
  {
    id: 'geo-cyclic',
    arenaKey: 'geo',
    arenaLabel: 'Geometry · Subsite #3',
    statement: 'In convex cyclic quadrilateral ABCD, ∠ABC = 112° and ∠BAD = 84°. Find the degree measure of ∠CDA.',
    hint: 'Remember that opposite interior angles of any quadrilateral inscribed in a circle are supplementary (sum to 180°).',
    answer: '68',
    explanation: 'Since ABCD is cyclic, ∠ABC + ∠CDA = 180°. Thus ∠CDA = 180° − 112° = 68°.',
    baseElo: 1460,
  },
  {
    id: 'nt-tau',
    arenaKey: 'nt',
    arenaLabel: 'Number Theory · Subsite #1',
    statement: 'How many positive integer divisors does N = 2⁴ · 3² · 5¹ possess?',
    hint: 'For a prime factorization p₁^a₁ · p₂^a₂ · p₃^a₃, multiply (aᵢ + 1) across every prime factor.',
    answer: '30',
    explanation: 'By the divisor-counting function τ(N) = (4 + 1)(2 + 1)(1 + 1) = 5 × 3 × 2 = 30 positive divisors.',
    baseElo: 1350,
  },
  {
    id: 'alg-rec',
    arenaKey: 'alg',
    arenaLabel: 'Algebra · Subsite #2',
    statement: 'A sequence satisfies a₁ = 2, a₂ = 5, and aₙ₊₂ = 3aₙ₊₁ − 2aₙ for all n ≥ 1. Compute a₆.',
    hint: 'Compute a₃ and a₄ first, or solve the characteristic polynomial r² − 3r + 2 = 0 to find a closed form.',
    answer: '95',
    explanation: 'Successive terms: a₁ = 2, a₂ = 5, a₃ = 11, a₄ = 23, a₅ = 47, a₆ = 3(47) − 2(23) = 95 (or aₙ = 3·2ⁿ⁻¹ − 1).',
    baseElo: 1740,
  },
  {
    id: 'geo-radii',
    arenaKey: 'geo',
    arenaLabel: 'Geometry · Subsite #3',
    statement: 'Right triangle ABC has legs AB = 12 and AC = 16. Find the integer sum R + r of its circumradius R and inradius r.',
    hint: 'For any right triangle with legs a, b and hypotenuse c, R = c/2 and r = (a + b − c)/2 — notice how c cancels!',
    answer: '14',
    explanation:
      'Hypotenuse c = √(12² + 16²) = 20, giving R = 10 and r = (12 + 16 − 20)/2 = 4. Directly, R + r = (a + b)/2 = 28/2 = 14.',
    baseElo: 1520,
  },
  {
    id: 'comb-decagon',
    arenaKey: 'comb',
    arenaLabel: 'Combinatorics · Subsite #4',
    statement:
      'All diagonals of a convex 10-gon are drawn, with no three concurrent inside. How many interior intersection points exist?',
    hint: 'Every set of 4 vertices forms a convex quadrilateral whose two diagonals cross at a unique interior point.',
    answer: '210',
    explanation: 'Each 4-vertex subset determines uniquely 1 interior intersection point: C(10, 4) = (10·9·8·7)/24 = 210.',
    baseElo: 1850,
  },
];

const RESERVED_HANDLES = new Set([
  'admin',
  'administrator',
  'hq',
  'prime_sovereign',
  'root',
  'staff',
  'support',
  'arithmo',
  'rayaan',
  'jalees',
  'moderator',
  'system',
]);

function resolveArenaBracketTitle(arenaKey: ArenaKey, elo: number): string {
  const titles = ARENA_CATALOG[arenaKey].titles;
  const matched = titles.find((t) => elo >= t.min && elo <= t.max);
  return matched ? matched.title : titles[0].title;
}

export const GuestDuelWidget: React.FC = () => {
  const [problemIdx, setProblemIdx] = useState(0);
  const [phase, setPhase] = useState<'ready' | 'running' | 'solved' | 'timeout'>('ready');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [inputVal, setInputVal] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [wrongMsg, setWrongMsg] = useState<string | null>(null);
  const [shakeError, setShakeError] = useState(false);
  const [estimatedElo, setEstimatedElo] = useState<number | null>(null);

  // Sandbox handle preview state (strictly under construction preview)
  const [handleInput, setHandleInput] = useState('');
  const [handleNotice, setHandleNotice] = useState<{
    valid: boolean;
    handle: string;
    message: string;
  } | null>(null);

  const answerInputRef = React.useRef<HTMLInputElement | null>(null);
  const problem = GUEST_PROBLEMS[problemIdx];

  useEffect(() => {
    if (phase !== 'running') return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhase('timeout');
          setWrongMsg(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const startDuel = () => {
    setSecondsLeft(60);
    setInputVal('');
    setWrongMsg(null);
    setShakeError(false);
    setEstimatedElo(null);
    setPhase('running');
    window.requestAnimationFrame(() => {
      answerInputRef.current?.focus();
    });
  };

  const switchProblem = () => {
    const nextIdx = (problemIdx + 1) % GUEST_PROBLEMS.length;
    setProblemIdx(nextIdx);
    setSecondsLeft(60);
    setInputVal('');
    setShowHint(false);
    setWrongMsg(null);
    setShakeError(false);
    setEstimatedElo(null);
    setPhase('ready');
  };

  const submitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== 'running') return;
    const cleaned = inputVal.trim();
    if (!cleaned) {
      setWrongMsg('Enter an integer answer before verifying.');
      setShakeError(true);
      window.setTimeout(() => setShakeError(false), 450);
      return;
    }

    if (cleaned === problem.answer) {
      const speedBonus = Math.max(0, Math.round(secondsLeft * 1.45)) - (showHint ? 60 : 0);
      setEstimatedElo(Math.max(1200, problem.baseElo + speedBonus));
      setWrongMsg(null);
      setShakeError(false);
      setPhase('solved');
    } else {
      setWrongMsg(
        `Incorrect (${cleaned}). Check boundary cases, signs, or modular remainders—your 60s clock is still running!`
      );
      setShakeError(false);
      window.requestAnimationFrame(() => setShakeError(true));
      window.setTimeout(() => setShakeError(false), 480);
      answerInputRef.current?.focus();
    }
  };

  const rawCleanedHandle = handleInput.trim().replace(/^@+/, '').toLowerCase();
  const handleSyntaxValid =
    rawCleanedHandle.length >= 3 &&
    rawCleanedHandle.length <= 20 &&
    /^[a-z0-9_]+$/.test(rawCleanedHandle) &&
    !RESERVED_HANDLES.has(rawCleanedHandle);

  const handleValidationStatus = (() => {
    if (!rawCleanedHandle) return 'Enter 3–20 characters (lowercase a–z, 0–9, _) to validate syntax.';
    if (rawCleanedHandle.length < 3 || rawCleanedHandle.length > 20)
      return 'Invalid length: @handles must be between 3 and 20 characters.';
    if (!/^[a-z0-9_]+$/.test(rawCleanedHandle))
      return 'Invalid character: use only lowercase letters (a–z), digits (0–9), or underscores (_).';
    if (RESERVED_HANDLES.has(rawCleanedHandle))
      return `Reserved system handle (@${rawCleanedHandle}). Choose a personal competitor handle.`;
    return `Syntax Valid: @${rawCleanedHandle} passes all 3–20 char & tombstone checks.`;
  })();

  const previewHandleFormat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawCleanedHandle) {
      setHandleNotice({
        valid: false,
        handle: '',
        message: 'Type a candidate @handle (3–20 chars: a–z, 0–9, _) to run format validation.',
      });
      return;
    }
    if (!handleSyntaxValid) {
      setHandleNotice({
        valid: false,
        handle: `@${rawCleanedHandle}`,
        message: handleValidationStatus,
      });
      return;
    }
    setHandleNotice({
      valid: true,
      handle: `@${rawCleanedHandle}`,
      message: `Format Verified (@${rawCleanedHandle}): Live account registration & First-50 Singularity claiming officially open on December 16, 2026 (V1.0 Public Launch). No account or handle has been claimed yet during Under Construction preview.`,
    });
  };

  const bracketTitle = estimatedElo ? resolveArenaBracketTitle(problem.arenaKey, estimatedElo) : null;

  return (
    <div data-guest-duel-root="" className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-400/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div data-gd-meta="" className="text-xs font-mono-tabular text-cyan-300">
            Guest Duel Sandbox · Problem {problemIdx + 1} of {GUEST_PROBLEMS.length} · Deterministic Client Grading
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            60-Second Guest Math Duel &amp; Instant ELO Estimator
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div
            data-gd-clock-wrap=""
            className={`rounded-xl bg-slate-950/90 border px-4 py-2 text-center min-w-[104px] transition-colors ${
              secondsLeft < 10 && phase === 'running' ? 'border-rose-500/70' : 'border-slate-800'
            }`}
          >
            <div className="text-[10px] text-slate-400 font-mono-tabular">CLOCK</div>
            <div
              data-gd-clock=""
              className={`font-mono-tabular text-xl font-bold ${
                secondsLeft < 10 && phase === 'running'
                  ? 'text-rose-400 animate-pulse'
                  : phase === 'solved'
                  ? 'text-emerald-400'
                  : 'text-cyan-300'
              }`}
            >
              00:{String(secondsLeft).padStart(2, '0')}
            </div>
          </div>
          <button
            type="button"
            data-gd-switch=""
            onClick={switchProblem}
            className="btn-glass px-3.5 py-2.5 text-xs whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Problem</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
            <span data-gd-arena="" className="text-violet-300">{problem.arenaLabel}</span>
            <span data-gd-elo="" className="text-slate-400">Baseline Calibration: {problem.baseElo} ELO</span>
          </div>

          <div className="rounded-xl bg-slate-950/85 border border-slate-800 p-5 space-y-3">
            <p data-gd-statement="" className="text-sm sm:text-base text-white font-medium leading-relaxed">{problem.statement}</p>
            <div
              data-gd-hint-box=""
              className={`rounded-lg border border-amber-400/30 bg-amber-400/10 p-3.5 text-xs text-amber-200 leading-relaxed ${
                showHint ? '' : 'hidden'
              }`}
            >
              <span className="font-semibold text-amber-300">Strategic Hint (-60 speed weight): </span>
              <span data-gd-hint-text="">{problem.hint}</span>
            </div>
          </div>

          <form data-gd-form="" onSubmit={submitAnswer} className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            <button
              type="button"
              data-gd-start=""
              onClick={startDuel}
              className={`btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0 ${phase === 'ready' ? '' : 'hidden'}`}
            >
              <Swords className="w-4 h-4" />
              <span>Start 60s Guest Duel</span>
            </button>

            <input
              ref={answerInputRef}
              data-gd-input=""
              type="text"
              inputMode="numeric"
              aria-label="Enter numeric Olympiad answer"
              placeholder={phase === 'ready' ? 'Click Start 60s Guest Duel...' : 'Enter exact integer...'}
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (wrongMsg) setWrongMsg(null);
              }}
              disabled={phase === 'ready' || phase === 'solved' || phase === 'timeout'}
              className={`flex-1 min-w-[160px] rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 font-mono-tabular text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-50 transition-all ${
                shakeError ? 'ae-shake-rose' : ''
              }`}
            />
            <button
              type="submit"
              data-gd-submit=""
              disabled={phase !== 'running'}
              className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0 disabled:opacity-45 disabled:cursor-not-allowed"
            >
              Verify Answer
            </button>
            <button
              type="button"
              data-gd-hint-btn=""
              onClick={() => setShowHint((prev) => !prev)}
              className="btn-glass px-3.5 py-3 text-xs whitespace-nowrap shrink-0"
            >
              {showHint ? 'Hide Hint' : 'Hint'}
            </button>
          </form>

          <div
            data-gd-wrong=""
            className={`rounded-xl border border-rose-500/45 bg-rose-500/10 p-4 text-xs text-rose-200 flex items-center justify-between gap-3 ${
              wrongMsg && phase === 'running' ? '' : 'hidden'
            }`}
          >
            <span data-gd-wrong-text="">{wrongMsg ?? ''}</span>
          </div>

          <div
            data-gd-timeout=""
            className={`rounded-xl border border-rose-400/35 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-200 space-y-2 ${
              phase === 'timeout' ? '' : 'hidden'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong id="gd-timeout-title" className="text-white">
                00:00 Timeout Reached — Official Ground Truth: {problem.answer}
              </strong>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-gd-retry=""
                  onClick={startDuel}
                  className="btn-glass px-3 py-1.5 text-xs whitespace-nowrap shrink-0"
                >
                  Retry Same Problem
                </button>
                <button
                  type="button"
                  data-gd-next=""
                  onClick={switchProblem}
                  className="btn-cyber px-3 py-1.5 text-xs whitespace-nowrap shrink-0"
                >
                  Next Problem &rarr;
                </button>
              </div>
            </div>
            <p data-gd-timeout-explain="" className="text-slate-200 leading-relaxed">{problem.explanation}</p>
          </div>

          <div
            data-gd-solved=""
            className={`rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-200 space-y-1.5 ${
              phase === 'solved' ? '' : 'hidden'
            }`}
          >
            <div className="font-semibold flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span data-gd-solved-time="">Verified Accepted in {60 - secondsLeft}s!</span>
            </div>
            <p data-gd-solved-explain="" className="text-slate-200 leading-relaxed">{problem.explanation}</p>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono-tabular text-cyan-300">Instant Telemetry Estimate</span>
            <span className="font-mono-tabular text-slate-400">Guest Sandbox (Unrated)</span>
          </div>

          <div
            data-gd-elo-card=""
            className={`rounded-xl border p-4 text-center space-y-1 transition-all ${
              estimatedElo
                ? 'border-emerald-400/45 bg-emerald-500/10'
                : 'border-slate-800 bg-slate-900/70'
            }`}
          >
            <div className="text-xs text-slate-400">Estimated Arena Readiness</div>
            <div data-gd-elo-val="" className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              {estimatedElo ? `${estimatedElo} ELO` : phase === 'timeout' ? '00:00 · Retry' : '— — —'}
            </div>
            <div data-gd-elo-sub="" className="text-xs font-mono-tabular text-violet-300">
              {estimatedElo
                ? `${estimatedElo} ELO · ${bracketTitle} (${resolveShadowBotPersona(estimatedElo).name} Bot Tier)`
                : 'Press Start 60s Guest Duel & solve before 00:00'}
            </div>
          </div>

          <form
            data-gd-handle-form=""
            onSubmit={previewHandleFormat}
            className={`space-y-3 pt-3 border-t border-slate-800/80 rounded-xl transition-all ${
              phase === 'solved' ? 'p-3 border border-emerald-400/35 bg-emerald-500/5' : ''
            }`}
          >
            <div className="space-y-1">
              <label htmlFor="guest-handle-claim" className="block text-xs text-white font-semibold">
                Preview Your Future <span className="font-mono-tabular text-cyan-300">@handle</span> (Sandbox Only)
              </label>
              <div className="rounded-lg border border-amber-400/35 bg-amber-400/10 px-3 py-2 text-[11px] text-amber-200 leading-snug">
                ⚠️ Platform Under Construction — Live @handle claiming &amp; First-50 Singularity spots open on Dec 16,
                2026 (V1.0 Launch)
              </div>
            </div>

            <div className="flex gap-2">
              <input
                id="guest-handle-claim"
                type="text"
                placeholder="@your_handle"
                value={handleInput}
                onChange={(e) => {
                  setHandleInput(e.target.value);
                  setHandleNotice(null);
                }}
                className="flex-1 min-w-0 rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 font-mono-tabular text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
              <button type="submit" data-gd-handle-btn="" className="btn-cyber px-3.5 py-2.5 text-xs whitespace-nowrap shrink-0">
                Notify / Preview Format
              </button>
            </div>

            <div
              data-gd-handle-status=""
              className={`text-[11px] leading-relaxed ${
                !rawCleanedHandle
                  ? 'text-slate-400'
                  : handleSyntaxValid
                  ? 'text-emerald-300'
                  : 'text-rose-300'
              }`}
            >
              {handleValidationStatus}
            </div>

            <div
              role="status"
              data-gd-handle-notice=""
              className={`rounded-lg border p-3 text-xs leading-relaxed ${
                !handleNotice
                  ? 'hidden '
                  : handleNotice.valid
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-100'
                  : 'border-rose-400/40 bg-rose-500/10 text-rose-200'
              }`}
            >
              {handleNotice?.message ?? ''}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. Arenas & ELO Page: Interactive 3-Button Contest Tab & Shadow Bot Gauntlet
 * ============================================================================ */
type ArenaContestMode = 'ranked' | 'rival' | 'shadow';

export const ShadowBotGauntletWidget: React.FC = () => {
  const [arenaKey, setArenaKey] = useState<ArenaKey>('nt');
  const [contestMode, setContestMode] = useState<ArenaContestMode>('shadow');
  const [userElo, setUserElo] = useState<number>(1650);
  const [botElo, setBotElo] = useState<number>(1700);
  const [preferUnratedAbove, setPreferUnratedAbove] = useState<boolean>(false);

  // Ranked Pool 60s -> Stealth ELO-Mirror Bot state
  const [poolState, setPoolState] = useState<'idle' | 'searching' | 'stealth'>('idle');
  const [poolTimer, setPoolTimer] = useState<number>(60);

  // Direct Rival Challenge 5-min URL expiry state
  const [rivalHandle, setRivalHandle] = useState<string>('@euler_seeker');
  const [rivalSeconds, setRivalSeconds] = useState<number>(300);
  const [rivalFallbackOptIn, setRivalFallbackOptIn] = useState<boolean>(true);
  const [rivalState, setRivalState] = useState<'draft' | 'active' | 'expired' | 'pool30' | 'stealth'>('draft');

  const arena = ARENA_CATALOG[arenaKey];
  const matchedPersona = resolveShadowBotPersona(botElo);
  const isBelowUser = botElo < userElo;
  const effectiveRated = !isBelowUser && !preferUnratedAbove;

  useEffect(() => {
    if (poolState !== 'searching') return;
    const t = window.setInterval(() => {
      setPoolTimer((prev) => {
        if (prev <= 1) {
          setPoolState('stealth');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [poolState]);

  useEffect(() => {
    if (rivalState !== 'active' && rivalState !== 'pool30') return;
    const t = window.setInterval(() => {
      setRivalSeconds((prev) => {
        if (prev <= 1) {
          if (rivalState === 'active') {
            setRivalState(rivalFallbackOptIn ? 'pool30' : 'expired');
            return rivalFallbackOptIn ? 30 : 0;
          }
          setRivalState('stealth');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [rivalState, rivalFallbackOptIn]);

  const handleUserEloChange = (next: number) => {
    setUserElo(next);
    setBotElo(Math.min(3200, next + 50));
    setPreferUnratedAbove(false);
  };

  return (
    <div id="shadow-bot-gauntlet-root" className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono-tabular text-cyan-300">
            Live Inside Subsites #1–#5 · Contest Portals Host Official Contests Only
          </p>
          <h3 className="section-title-fluid font-display font-bold text-white">
            3-Button Arena Contest Tab &amp; Shadow Bot Gauntlet
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['nt', 'alg', 'geo', 'comb', 'mixed'] as ArenaKey[]).map((key) => {
            const info = ARENA_CATALOG[key];
            const active = key === arenaKey;
            return (
              <button
                key={key}
                type="button"
                data-sbg-arena={key}
                onClick={() => setArenaKey(key)}
                className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'border-cyan-400 bg-slate-800 text-white font-semibold'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white'
                }`}
              >
                {info.key === 'comb' ? 'Combinatorics' : info.key === 'mixed' ? 'Mixed' : info.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Button Contest Tab Switcher */}
      <div className="grid md:grid-cols-3 gap-3">
        <button
          type="button"
          data-sbg-mode="ranked"
          onClick={() => setContestMode('ranked')}
          className={`text-left rounded-xl border p-4 transition-all ${
            contestMode === 'ranked'
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-800 bg-slate-950/70 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono-tabular text-cyan-300 mb-1">
            <span>Button 01</span>
            <span>60s Pool</span>
          </div>
          <div className="font-display text-base font-bold text-white">Ranked Arena Duel</div>
          <p className="text-xs text-slate-400 mt-1">±100 ELO global matchmaking with 60s Stealth ELO-Mirror fallback.</p>
        </button>

        <button
          type="button"
          data-sbg-mode="rival"
          onClick={() => setContestMode('rival')}
          className={`text-left rounded-xl border p-4 transition-all ${
            contestMode === 'rival'
              ? 'border-violet-400 bg-violet-400/10'
              : 'border-slate-800 bg-slate-950/70 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono-tabular text-violet-300 mb-1">
            <span>Button 02</span>
            <span>5-Min URL</span>
          </div>
          <div className="font-display text-base font-bold text-white">Direct Rival Challenge</div>
          <p className="text-xs text-slate-400 mt-1">
            5-min invite link; zero quota deduction on expiry, or 30s pool fallback.
          </p>
        </button>

        <button
          type="button"
          data-sbg-mode="shadow"
          onClick={() => setContestMode('shadow')}
          className={`text-left rounded-xl border p-4 transition-all ${
            contestMode === 'shadow'
              ? 'border-amber-400 bg-amber-400/10'
              : 'border-slate-800 bg-slate-950/70 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono-tabular text-amber-300 mb-1">
            <span>Button 03</span>
            <span>0–3200+</span>
          </div>
          <div className="font-display text-base font-bold text-white">Shadow Bot Gauntlet</div>
          <p className="text-xs text-slate-400 mt-1">
            Exact-ELO slider mapped to 12 Bot Personas (Spark through Apex).
          </p>
        </button>
      </div>

      {/* Mode 1: Ranked Arena Duel */}
      <div
        data-sbg-panel="ranked"
        className={`rounded-2xl border border-cyan-400/30 bg-slate-950/85 p-6 space-y-5 ${
          contestMode === 'ranked' ? '' : 'hidden'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div data-sbg-subsite="" className="text-xs font-mono-tabular text-cyan-300">
              {arena.subsite} · Ranked Global Pool
            </div>
            <h4 className="font-display text-lg font-bold text-white mt-0.5">
              60-Second Global Search → Stealth ELO-Mirror Bot
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              data-sbg-queue-btn=""
              onClick={() => {
                setPoolTimer(60);
                setPoolState('searching');
              }}
              className="btn-cyber px-4 py-2 text-xs whitespace-nowrap shrink-0"
            >
              Queue Ranked Duel ({userElo} ±100 ELO)
            </button>
            <button
              type="button"
              data-sbg-sim-fallback=""
              onClick={() => {
                setPoolTimer(0);
                setPoolState('stealth');
              }}
              className={`btn-glass px-4 py-2 text-xs whitespace-nowrap shrink-0 ${
                poolState === 'searching' ? '' : 'hidden'
              }`}
            >
              Simulate 60s No-Human Fallback
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
            <div className="text-slate-400">Queue Window Status</div>
            <div data-sbg-pool-status="" className="font-mono-tabular text-base font-bold text-white">
              {poolState === 'idle' && 'Standby · Ready to Queue'}
              {poolState === 'searching' && `Searching ±100 ELO Pool (${poolTimer}s left)`}
              {poolState === 'stealth' && 'Matched: @tasnim_nt_04 (Stealth Mirror)'}
            </div>
            <p className="text-slate-400">Silent seamless handoff at T=60s eliminates infinite empty lobby waits.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
            <div className="text-slate-400">Opponent ELO Mirror</div>
            <div data-sbg-pool-elo="" className="font-mono-tabular text-base font-bold text-cyan-300">
              {poolState === 'stealth' ? `${userElo} ELO (Exact Live Mirror)` : `${userElo - 100} – ${userElo + 100} ELO`}
            </div>
            <p className="text-slate-400">Realistic human-like @handle &amp; authentic solve cadence envelope.</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 space-y-1">
            <div className="text-emerald-300">Rating &amp; Anti-Inflation Guard</div>
            <div className="font-mono-tabular text-base font-bold text-white">100% Rated · 0.75× K-Factor</div>
            <p className="text-slate-300">Counts as full official rated match while capping bot-farming variance.</p>
          </div>
        </div>
      </div>

      {/* Mode 2: Direct Rival Challenge */}
      <div
        data-sbg-panel="rival"
        className={`rounded-2xl border border-violet-400/30 bg-slate-950/85 p-6 space-y-5 ${
          contestMode === 'rival' ? '' : 'hidden'
        }`}
      >
        <div className="grid lg:grid-cols-12 gap-5 items-end">
          <div className="lg:col-span-4 space-y-2">
            <label htmlFor="rival-handle-input" className="block text-xs text-slate-400 font-mono-tabular">
              Target Rival @handle
            </label>
            <input
              id="rival-handle-input"
              type="text"
              value={rivalHandle}
              onChange={(e) => setRivalHandle(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 font-mono-tabular text-xs text-white focus:border-violet-400 focus:outline-none"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer py-2.5">
              <input
                type="checkbox"
                data-sbg-rival-fallback=""
                checked={rivalFallbackOptIn}
                onChange={(e) => setRivalFallbackOptIn(e.target.checked)}
                className="accent-violet-400 w-4 h-4"
              />
              <span>Convert to Global Pool (30s Stealth Bot) if unaccepted</span>
            </label>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
            <button
              type="button"
              data-sbg-rival-mint=""
              onClick={() => {
                setRivalSeconds(300);
                setRivalState('active');
              }}
              className="btn-cyber px-4 py-2.5 text-xs whitespace-nowrap shrink-0"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Mint 5-Min Link</span>
            </button>
            <button
              type="button"
              data-sbg-rival-ff=""
              onClick={() => {
                if (rivalFallbackOptIn) {
                  setRivalSeconds(30);
                  setRivalState('pool30');
                } else {
                  setRivalSeconds(0);
                  setRivalState('expired');
                }
              }}
              className={`btn-glass px-3.5 py-2.5 text-xs whitespace-nowrap shrink-0 ${
                rivalState === 'active' ? '' : 'hidden'
              }`}
            >
              Fast-Forward 5m
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div data-sbg-rival-status="" className="font-mono-tabular text-violet-300">
              {rivalState === 'draft' && `Invite URL: ${arena.subsite}duel/pending-${rivalHandle.replace('@', '')}`}
              {rivalState === 'active' &&
                `LIVE INVITE (${Math.floor(rivalSeconds / 60)}:${String(rivalSeconds % 60).padStart(2, '0')} remaining): awaiting ${rivalHandle}`}
              {rivalState === 'expired' && 'Invite Expired at 5:00 — ZERO Quota Deduction!'}
              {rivalState === 'pool30' && `Converted to Global Pool (${rivalSeconds}s to Stealth Bot Fallback)`}
              {rivalState === 'stealth' && 'Stealth ELO-Mirror Bot Engaged (100% Rated · 0.75× K-Factor)'}
            </div>
            <p className="text-slate-400">
              Unaccepted rival URLs self-expire after exactly 5 minutes with zero daily or token pack deduction.
            </p>
          </div>
          <span className="font-mono-tabular text-emerald-300 shrink-0">Quota Deducted: 0 Tokens</span>
        </div>
      </div>

      {/* Mode 3: Shadow Bot Gauntlet (0-3200+ Slider -> 12 Bot Personas) */}
      <div
        data-sbg-panel="shadow"
        className={`rounded-2xl border border-amber-400/30 bg-slate-950/85 p-6 space-y-6 ${
          contestMode === 'shadow' ? '' : 'hidden'
        }`}
      >
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="gauntlet-user-elo" className="text-slate-300 font-medium">
                  Your Live Arena ELO
                </label>
                <span data-sbg-user-val="" className="font-mono-tabular text-cyan-300 font-bold">{userElo} ELO</span>
              </div>
              <input
                id="gauntlet-user-elo"
                type="range"
                min={0}
                max={3150}
                step={25}
                value={userElo}
                onChange={(e) => handleUserEloChange(Number(e.target.value))}
                className="w-full cyber-range"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="gauntlet-bot-elo" className="text-slate-300 font-medium">
                  Shadow Bot Exact ELO Slider (0–3200+)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-sbg-reset-bot=""
                    onClick={() => setBotElo(Math.min(3200, userElo + 50))}
                    className="font-mono-tabular text-[11px] text-amber-300 hover:underline whitespace-nowrap"
                  >
                    Reset Default (+50)
                  </button>
                  <span data-sbg-bot-val="" className="font-mono-tabular text-amber-300 font-bold">{botElo}</span>
                </div>
              </div>
              <input
                id="gauntlet-bot-elo"
                type="range"
                min={0}
                max={3200}
                step={5}
                value={botElo}
                onChange={(e) => setBotElo(Number(e.target.value))}
                className="w-full cyber-range"
              />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Match Rating Rule</span>
                <span
                  data-sbg-rule-badge=""
                  className={`font-mono-tabular font-semibold ${
                    effectiveRated ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {effectiveRated ? '100% RATED (≥ User ELO)' : 'UNRATED SPARRING'}
                </span>
              </div>
              <p data-sbg-below-note="" className={`text-amber-200/90 ${isBelowUser ? '' : 'hidden'}`}>
                Because Bot ELO (<span data-sbg-below-bot="">{botElo}</span>) is below your Live ELO (
                <span data-sbg-below-user="">{userElo}</span>), this duel is{' '}
                <strong>mandatory Unrated</strong> to block low-tier ELO farming.
              </p>
              <label data-sbg-unrated-wrap="" className={`flex items-center gap-2 text-slate-300 cursor-pointer pt-1 ${isBelowUser ? 'hidden' : ''}`}>
                <input
                  type="checkbox"
                  data-sbg-prefer-unrated=""
                  checked={preferUnratedAbove}
                  onChange={(e) => setPreferUnratedAbove(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
                <span>Opt into Unrated Sparring (Default is Rated when Bot ≥ User ELO)</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div
              data-sbg-bot-card=""
              className="rounded-2xl border p-5 bg-slate-900/80 space-y-3"
              style={{
                borderColor: matchedPersona.accentColor,
                boxShadow: `0 0 32px ${matchedPersona.accentColor}20`,
              }}
            >
              <div className="flex items-center justify-between text-xs font-mono-tabular">
                <span data-sbg-bot-tier="" style={{color: matchedPersona.accentColor}}>
                  Tier {String(matchedPersona.tierNum).padStart(2, '0')} · {arena.name}
                </span>
                <span data-sbg-bot-range="" className="text-slate-400">
                  {matchedPersona.maxElo >= 3600
                    ? '3000+ Band'
                    : `${matchedPersona.minElo}–${matchedPersona.maxElo} Band`}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Bot className="w-7 h-7 shrink-0" style={{color: matchedPersona.accentColor}} />
                <div>
                  <div data-sbg-bot-name="" className="font-display text-2xl font-bold text-white">
                    {botElo} · {matchedPersona.name} BOT
                  </div>
                  <div data-sbg-bot-tele="" className="text-xs text-slate-400 font-mono-tabular">{matchedPersona.telemetryProfile}</div>
                </div>
              </div>
              <p data-sbg-bot-style="" className="text-xs sm:text-sm text-slate-300 leading-relaxed">{matchedPersona.style}</p>
            </div>

            <div>
              <div className="text-xs font-mono-tabular text-slate-400 mb-2">
                Click Any of the 12 Canonical Shadow Bot Personas:
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {SHADOW_BOT_PERSONAS.map((persona) => {
                  const active = persona.name === matchedPersona.name;
                  return (
                    <button
                      key={persona.name}
                      type="button"
                      data-sbg-persona={persona.exampleElo}
                      data-sbg-persona-name={persona.name}
                      onClick={() => setBotElo(persona.exampleElo)}
                      className={`rounded-lg border px-2.5 py-2 text-left transition-all ${
                        active
                          ? 'bg-slate-800 border-cyan-400 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="font-display text-xs font-bold truncate" style={active ? {color: persona.accentColor} : undefined}>
                        {persona.name}
                      </div>
                      <div className="font-mono-tabular text-[10px]">
                        {persona.minElo >= 3000 ? '3000+' : `${persona.minElo}–${persona.maxElo}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. Contests Page: 3-Mode Dynamic Contest Dashboard Footer Credits
 * ============================================================================ */
type CreditMode = 'human' | 'vault' | 'ai';

export const DynamicCreditsPreview: React.FC = () => {
  const [creditMode, setCreditMode] = useState<CreditMode>('human');

  return (
    <div data-credits-root="" className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono-tabular text-cyan-300">T-30s &amp; Contest Dashboard Footer Attribution</p>
          <h3 className="section-title-fluid font-display font-bold text-white">
            3-Mode Dynamic Contest Dashboard Footer Credits
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          {(
            [
              {id: 'human', label: '01 · Human-Authored Round'},
              {id: 'vault', label: '02 · HQ Golden Vault'},
              {id: 'ai', label: '03 · Autonomous AI Engines'},
            ] as const
          ).map((tab) => {
            const active = creditMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-credits-tab={tab.id}
                onClick={() => setCreditMode(tab.id)}
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
        data-credits-panel="human"
        className={`rounded-xl border border-cyan-400/30 bg-slate-950/85 p-5 space-y-4 ${
          creditMode === 'human' ? '' : 'hidden'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
          <span className="text-cyan-300">Example: BdMO Warm-Up Championship / Forge Open Round</span>
          <span className="text-slate-400">Rendered on Contest Footer</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono-tabular text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900/75 p-3">
            <div className="text-slate-400">Written by</div>
            <div className="text-white font-semibold mt-1">&quot;@jaleeshabib&quot;</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/75 p-3">
            <div className="text-slate-400">Tested by</div>
            <div className="text-white font-semibold mt-1">&quot;@dhaka_sentinel&quot;</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/75 p-3">
            <div className="text-slate-400">Audit by</div>
            <div className="text-white font-semibold mt-1">&quot;@archon_rigor&quot;</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/75 p-3">
            <div className="text-slate-400">Finalized by</div>
            <div className="text-cyan-300 font-semibold mt-1">&quot;@rayaantasnim&quot;</div>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono-tabular">
          Canonical Template: Written by &quot;----&quot; · Tested by &quot;-----&quot; · Audit by &quot;-----&quot; · Finalized by &quot;--------------&quot;
        </div>
      </div>

      <div
        data-credits-panel="vault"
        className={`rounded-xl border border-amber-400/35 bg-slate-950/85 p-5 space-y-2 ${
          creditMode === 'vault' ? '' : 'hidden'
        }`}
      >
        <div className="text-xs font-mono-tabular text-amber-300">
          Official Sunday Mega / Co-Founders Golden Vault Contest Footer
        </div>
        <div className="font-display text-lg sm:text-xl font-bold text-white">
          &quot;All Credit goes to the respective HQ Core team&quot;
        </div>
        <p className="text-xs text-slate-300">
          Used whenever contest sets originate from internal Golden Vault curation and multi-reviewer HQ Core teams
          to safeguard uniform impartiality.
        </p>
      </div>

      <div
        data-credits-panel="ai"
        className={`rounded-xl border border-violet-400/35 bg-slate-950/85 p-5 space-y-2 ${
          creditMode === 'ai' ? '' : 'hidden'
        }`}
      >
        <div className="text-xs font-mono-tabular text-violet-300">
          Daily Automated / SymPy-Verified Contest Footer
        </div>
        <div className="font-display text-lg sm:text-xl font-bold text-white">
          &quot;Autonomous Creation by Arithmo Back End AI Engines&quot;
        </div>
        <p className="text-xs text-slate-300">
          Displayed when Question-Forge &amp; Anti-LLM Agents synthesize, verify via Python/SymPy, and calibrate
          standard daily rounds with zero human leak surface.
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. Pricing Page: 100% Arithmo Wallet Checkout + 60s Cancellation Grace Simulator
 * ============================================================================ */
interface CheckoutCatalogItem {
  id: string;
  category: string;
  name: string;
  price: number;
  perks: string[];
}

const CHECKOUT_ITEMS: CheckoutCatalogItem[] = [
  {
    id: 'plus-plan',
    category: 'Personal Plan',
    name: 'Plus Monthly ($2.99)',
    price: 2.99,
    perks: ['40 AI General (1x) queries/mo', '20 Shadow Bot Gauntlets/mo (max 2/day, ±200 ELO)', 'Ad-Free UI & 10 Virtual Gym runs'],
  },
  {
    id: 'pro-plan',
    category: 'Personal Plan',
    name: 'Pro Monthly ($5.99)',
    price: 5.99,
    perks: ['150 AI queries (30 Premium 2x + 120 General 1x)', '50 Shadow Bot Gauntlets/mo (max 3/day, Unbounded)', 'Smart Mistake Deck & Private Rooms'],
  },
  {
    id: 'singularity-plan',
    category: 'Personal Plan',
    name: 'Singularity Monthly ($12.99)',
    price: 12.99,
    perks: ['Unlimited AI Premium (2x Hybrid)', '150 Shadow Bot Gauntlets/mo (max 2/hr, Unbounded)', 'Forge Contest Hosting + Priority Appeals'],
  },
  ...SHADOW_BOT_PACKS.map((p) => ({
    id: p.id,
    category: 'Shadow Bot Pack',
    name: `${p.name} ($${p.price.toFixed(2)})`,
    price: p.price,
    perks: p.perks,
  })),
  {
    id: 'ai-general-20',
    category: 'Core Token Pack',
    name: 'AI General Starter 20-Pack ($0.99)',
    price: 0.99,
    perks: ['20 permanent AI General (1x) tokens', 'Zero expiration deadline', 'Supports @handle gifting'],
  },
  {
    id: 'ai-grandmaster-24h',
    category: 'Core Token Pack',
    name: '24-Hour AI Grandmaster Sprint ($3.99)',
    price: 3.99,
    perks: ['24h Unlimited General (1x) & Premium (2x)', 'Gemini Pro + Qwen-Math + SymPy access', 'Instant activation'],
  },
];

export const WalletCheckoutSimulator: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number>(1.5);
  const [selectedTopupAmt, setSelectedTopupAmt] = useState<number>(10);
  const [rail, setRail] = useState<'lemonsqueezy' | 'bkash'>('lemonsqueezy');
  const [selectedItemId, setSelectedItemId] = useState<string>(CHECKOUT_ITEMS[1].id);
  const [stage, setStage] = useState<'browse' | 'insufficient' | 'checkout' | 'grace' | 'provisioned' | 'cancelled'>('browse');
  const [graceSeconds, setGraceSeconds] = useState<number>(60);
  const [statusLog, setStatusLog] = useState<string>('Wallet starts at $1.50 so you can test Insufficient Balance or +10% Top-Ups.');

  const selectedItem = CHECKOUT_ITEMS.find((i) => i.id === selectedItemId) ?? CHECKOUT_ITEMS[0];

  useEffect(() => {
    if (stage !== 'grace') return;
    const t = window.setInterval(() => {
      setGraceSeconds((prev) => {
        if (prev <= 1) {
          setWalletBalance((bal) => Number(Math.max(0, bal - selectedItem.price).toFixed(2)));
          setStage('provisioned');
          setStatusLog(`Order finalized after 60s grace window. $${selectedItem.price.toFixed(2)} deducted from Arithmo Wallet.`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [stage, selectedItem.price]);

  const handleTopup = () => {
    const bonus = Number((selectedTopupAmt * 0.1).toFixed(2));
    const credited = Number((selectedTopupAmt + bonus).toFixed(2));
    setWalletBalance((prev) => Number((prev + credited).toFixed(2)));
    setStatusLog(
      `Loaded $${selectedTopupAmt.toFixed(2)} + $${bonus.toFixed(2)} (+10% Bonus) = $${credited.toFixed(2)} via ${
        rail === 'lemonsqueezy' ? 'Lemon Squeezy (Global MoR)' : 'bKash / Nagad (Local BD Rail)'
      }.`,
    );
    if (stage === 'insufficient') setStage('browse');
  };

  const handleProceed = () => {
    if (walletBalance < selectedItem.price) {
      setStage('insufficient');
      return;
    }
    setStage('checkout');
  };

  const handleConfirmFinalOrder = () => {
    setGraceSeconds(60);
    setStage('grace');
  };

  const handleCancelGrace = () => {
    setStage('cancelled');
    setStatusLog(`Cancelled cleanly inside 60s grace window. $0.00 deducted — Wallet stays $${walletBalance.toFixed(2)}.`);
  };

  const handleFinalizeNow = () => {
    setWalletBalance((bal) => Number(Math.max(0, bal - selectedItem.price).toFixed(2)));
    setGraceSeconds(0);
    setStage('provisioned');
    setStatusLog(`Order finalized immediately. $${selectedItem.price.toFixed(2)} deducted from Arithmo Wallet.`);
  };

  return (
    <div data-wallet-sim="" className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-400/35 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-mono-tabular text-cyan-300">
            100% Arithmo Wallet-Only Checkout · Interactive 60s Cancellation Grace Window
          </div>
          <h3 className="section-title-fluid font-display font-bold text-white">
            Live Arithmo Wallet &amp; Internal Checkout Simulator
          </h3>
        </div>
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 flex items-center gap-3">
          <Wallet className="w-5 h-5 text-emerald-300 shrink-0" />
          <div>
            <div className="text-[10px] font-mono-tabular text-emerald-200 uppercase">Closed-Loop Wallet Balance</div>
            <div data-ws-balance="" className="font-mono-tabular text-xl font-bold text-white">${walletBalance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Top-Up Column */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-4">
          <div className="text-xs font-mono-tabular text-cyan-300">Step 1 · Fund Arithmo Wallet (+10% Bonus)</div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Lemon Squeezy</strong> and <strong>bKash / Nagad</strong> exclusively top up your closed-loop{' '}
            <em>Arithmo Wallet</em>. All plans and packs are checked out strictly using internal Wallet Credits.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              data-ws-rail="lemonsqueezy"
              onClick={() => setRail('lemonsqueezy')}
              className={`px-3 py-2 rounded-lg border text-xs whitespace-nowrap ${
                rail === 'lemonsqueezy'
                  ? 'border-cyan-400 bg-cyan-400/15 text-white font-semibold'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}
            >
              Lemon Squeezy (Global)
            </button>
            <button
              type="button"
              data-ws-rail="bkash"
              onClick={() => setRail('bkash')}
              className={`px-3 py-2 rounded-lg border text-xs whitespace-nowrap ${
                rail === 'bkash'
                  ? 'border-rose-400 bg-rose-500/15 text-white font-semibold'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}
            >
              bKash / Nagad (BD)
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 25, 50].map((amt) => (
              <button
                key={amt}
                type="button"
                data-ws-topup-amt={amt}
                onClick={() => setSelectedTopupAmt(amt)}
                className={`py-2 rounded-lg border font-mono-tabular text-xs transition-colors ${
                  selectedTopupAmt === amt
                    ? 'border-emerald-400 bg-emerald-400/15 text-white font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <button type="button" data-ws-topup-btn="" onClick={handleTopup} className="btn-cyber w-full py-2.5 text-xs">
            Load ${selectedTopupAmt.toFixed(2)} + ${(selectedTopupAmt * 0.1).toFixed(2)} Bonus into Wallet
          </button>

          <div data-ws-log="" className="text-[11px] font-mono-tabular text-slate-400 border-t border-slate-800 pt-2.5">
            {statusLog}
          </div>
        </div>

        {/* Internal Checkout Column */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950/85 p-5 space-y-4">
          <div className="text-xs font-mono-tabular text-violet-300">
            Step 2 · Wallet-Only Internal Checkout &amp; 60s Grace Window
          </div>

          <div className="grid sm:grid-cols-2 gap-3 items-end">
            <div>
              <label htmlFor="wallet-item-select" className="block text-xs text-slate-400 mb-1.5">
                Choose Subscription or Token Pack
              </label>
              <select
                id="wallet-item-select"
                value={selectedItemId}
                onChange={(e) => {
                  setSelectedItemId(e.target.value);
                  setStage('browse');
                }}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                {CHECKOUT_ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    [{item.category}] {item.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" data-ws-proceed="" onClick={handleProceed} className="btn-cyber py-2.5 px-4 text-xs whitespace-nowrap">
              Proceed to Wallet Checkout (${selectedItem.price.toFixed(2)})
            </button>
          </div>

          <div
            data-ws-stage="insufficient"
            className={`rounded-xl border border-rose-400/45 bg-rose-500/10 p-4 space-y-2 text-xs ${
              stage === 'insufficient' ? '' : 'hidden'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Insufficient Balance in Arithmo Wallet</span>
            </div>
            <p className="text-slate-200">
              Required: <strong data-ws-req-price="">${selectedItem.price.toFixed(2)}</strong> · Available:{' '}
              <strong data-ws-avail-bal="">${walletBalance.toFixed(2)}</strong>. Direct card payments are disabled at item checkout—top up
              your Arithmo Wallet on the left via Lemon Squeezy or bKash/Nagad (+10% Bonus) first.
            </p>
          </div>

          <div
            data-ws-stage="checkout"
            className={`rounded-xl border border-cyan-400/40 bg-slate-900/90 p-5 space-y-3 ${
              stage === 'checkout' ? '' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono-tabular">
              <span className="text-cyan-300">INTERNAL ARITHMO CHECKOUT PAGE</span>
              <span className="text-emerald-300">Balance Sufficient</span>
            </div>
            <div data-ws-sel-name="" className="font-display text-lg font-bold text-white">{selectedItem.name}</div>
            <ul data-ws-sel-perks="" className="text-xs text-slate-300 space-y-1">
              {selectedItem.perks.map((perk) => (
                <li key={perk}>· {perk}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Zero external redirects · Protected by 60s Cancellation Grace
              </span>
              <button type="button" data-ws-confirm="" onClick={handleConfirmFinalOrder} className="btn-cyber px-4 py-2 text-xs">
                Confirm Final Order (${selectedItem.price.toFixed(2)})
              </button>
            </div>
          </div>

          <div
            data-ws-stage="grace"
            className={`rounded-xl border border-amber-400/45 bg-amber-400/10 p-5 space-y-3 ${
              stage === 'grace' ? '' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                <Clock className="w-4 h-4 shrink-0" />
                <span>1-Minute Cancellation Grace Countdown Active</span>
              </div>
              <span data-ws-grace-sec="" className="font-mono-tabular text-2xl font-bold text-white">{graceSeconds}s</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Credits are held pending finalization. Cancel before <strong>0s</strong> for an automatic $0 penalty abort,
              or allow the timer to complete to provision <strong data-ws-sel-name="">{selectedItem.name}</strong>.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" data-ws-cancel-grace="" onClick={handleCancelGrace} className="btn-glass px-4 py-2 text-xs text-rose-300">
                Cancel Order (Zero Deduction)
              </button>
              <button type="button" data-ws-finalize-now="" onClick={handleFinalizeNow} className="btn-cyber px-4 py-2 text-xs">
                Finalize Provisioning Now
              </button>
            </div>
          </div>

          <div
            data-ws-stage="provisioned"
            className={`rounded-xl border border-emerald-400/45 bg-emerald-500/10 p-4 text-xs space-y-1 ${
              stage === 'provisioned' ? '' : 'hidden'
            }`}
          >
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Provisioned Cleanly: <span data-ws-sel-name="">{selectedItem.name}</span></span>
            </div>
            <p className="text-slate-200">
              Synced across all 14 sites via <code className="font-mono-tabular">Arithmo-Core-SDK (engine.js)</code>.
            </p>
          </div>

          <div
            data-ws-stage="cancelled"
            className={`rounded-xl border border-slate-700 bg-slate-900/75 p-4 text-xs text-slate-300 flex items-center gap-2 ${
              stage === 'cancelled' ? '' : 'hidden'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>Order safely aborted inside the 60-second grace window. No Arithmo Credits were deducted.</span>
          </div>

          <div
            data-ws-stage="browse"
            className={`rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-400 space-y-1 ${
              stage === 'browse' ? '' : 'hidden'
            }`}
          >
            <div className="text-slate-200 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Selected Preview: <span data-ws-browse-name="">{selectedItem.name}</span></span>
            </div>
            <p data-ws-browse-perks="">{selectedItem.perks.join(' · ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
