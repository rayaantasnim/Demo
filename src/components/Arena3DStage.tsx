import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ARENA_CATALOG, ArenaKey} from '../data/ecosystem';

const ORDERED_KEYS: ArenaKey[] = ['nt', 'alg', 'geo', 'comb', 'mixed'];

interface Arena3DStageProps {
  activeKey: ArenaKey;
  onSelect: (key: ArenaKey) => void;
}

export const Arena3DStage: React.FC<Arena3DStageProps> = ({activeKey, onSelect}) => {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const activeIdx = Math.max(0, ORDERED_KEYS.indexOf(activeKey));

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetRot = -activeIdx * 72;
    if (reduced) {
      wheel.style.transform = `translateZ(-230px) rotateY(${targetRot}deg)`;
      return;
    }
    gsap.to(wheel, {
      rotateY: targetRot,
      duration: 0.78,
      ease: 'power3.out',
    });
  }, [activeIdx]);

  const stepArena = (delta: number) => {
    const next = (activeIdx + delta + ORDERED_KEYS.length) % ORDERED_KEYS.length;
    onSelect(ORDERED_KEYS[next]);
  };

  const currentArena = ARENA_CATALOG[activeKey];

  return (
    <div data-arena-3d-stage="" className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono-tabular text-cyan-300">
            Interactive 3D Polyhedral Arena Stage (GSAP rotateY Prism)
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            Orbit All 5 Federated Subsites in 3D Space
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-arena-3d-step="-1"
            onClick={() => stepArena(-1)}
            aria-label="Rotate 3D Stage Previous Arena"
            className="btn-glass w-10 h-10 p-0 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span
            data-arena-3d-badge=""
            className="font-mono-tabular text-xs font-semibold px-3 py-1.5 rounded-lg border bg-slate-950/80"
            style={{borderColor: `${currentArena.color}66`, color: currentArena.color}}
          >
            {activeIdx + 1} / 5 · {currentArena.code}
          </span>
          <button
            type="button"
            data-arena-3d-step="1"
            onClick={() => stepArena(1)}
            aria-label="Rotate 3D Stage Next Arena"
            className="btn-glass w-10 h-10 p-0 flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop 3D Perspective Stage */}
      <div className="hidden sm:flex items-center justify-center h-[230px] overflow-hidden ae-stage-perspective relative">
        <div
          ref={wheelRef}
          data-arena-3d-wheel=""
          className="relative w-[290px] h-[185px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-230px) rotateY(0deg)',
          }}
        >
          {ORDERED_KEYS.map((key, idx) => {
            const info = ARENA_CATALOG[key];
            const isActive = key === activeKey;
            const angle = idx * 72;
            return (
              <button
                key={key}
                type="button"
                data-arena-3d-card={key}
                data-arena-select-key={key}
                onClick={() => onSelect(key)}
                className="absolute inset-0 w-full h-full rounded-2xl p-5 text-left flex flex-col justify-between transition-colors cursor-pointer"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(230px)`,
                  backfaceVisibility: 'hidden',
                  background: isActive
                    ? 'linear-gradient(155deg, rgba(16, 26, 52, 0.96), rgba(6, 10, 22, 0.98))'
                    : 'linear-gradient(155deg, rgba(10, 16, 34, 0.86), rgba(4, 7, 16, 0.94))',
                  border: `1.5px solid ${isActive ? info.color : 'rgba(148, 163, 184, 0.22)'}`,
                  boxShadow: isActive ? `0 0 32px ${info.color}33` : 'none',
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span style={{color: info.color}}>{info.code}</span>
                  <span className="text-slate-400">Subsite #{idx + 1}</span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-white leading-tight">{info.name}</div>
                  <div className="text-[11px] font-mono-tabular text-slate-400 mt-1 truncate">{info.subsite}</div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono-tabular pt-2 border-t border-slate-800/80">
                  <span className="text-slate-300">{info.titles[0].title}</span>
                  <span style={{color: info.color}}>&rarr; {info.titles[11].title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Clean Interactive Card Stack Fallback */}
      <div className="sm:hidden grid grid-cols-1 gap-2.5">
        {ORDERED_KEYS.map((key, idx) => {
          const info = ARENA_CATALOG[key];
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              data-arena-3d-mobile={key}
              data-arena-select-key={key}
              onClick={() => onSelect(key)}
              className="rounded-xl p-3.5 text-left border transition-all flex items-center justify-between gap-3"
              style={{
                background: isActive ? 'rgba(15, 24, 48, 0.92)' : 'rgba(7, 11, 24, 0.72)',
                borderColor: isActive ? info.color : 'rgba(148, 163, 184, 0.2)',
              }}
            >
              <div className="min-w-0">
                <div className="text-[11px] font-mono-tabular" style={{color: info.color}}>
                  #{idx + 1} · {info.code}
                </div>
                <div className="font-display text-sm font-bold text-white truncate">{info.name}</div>
              </div>
              <span className="text-[11px] font-mono-tabular shrink-0" style={{color: info.color}}>
                {info.titles[11].title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
