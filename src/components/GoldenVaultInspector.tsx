import React, {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArenaKey, GOLDEN_VAULT_SAMPLES} from '../data/ecosystem';

const VAULT_KEYS: ArenaKey[] = ['nt', 'alg', 'geo', 'comb', 'mixed'];

export const GoldenVaultInspector: React.FC<{pathPrefix?: string}> = ({
  pathPrefix = 'Repository Object Path:',
}) => {
  const [selected, setSelected] = useState<ArenaKey>('nt');
  const active = GOLDEN_VAULT_SAMPLES[selected];

  return (
    <div data-vault-root="" className="glass-panel rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {VAULT_KEYS.map((key) => {
          const item = GOLDEN_VAULT_SAMPLES[key];
          const isCurrent = selected === key;
          return (
            <button
              key={key}
              type="button"
              data-vault-arena={key}
              onClick={() => setSelected(key)}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap ${
                isCurrent
                  ? 'border-cyan-400 bg-cyan-400/10 text-white'
                  : 'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="text-xs font-mono-tabular text-amber-300 break-all">
          {pathPrefix} <span id="vault-json-path" data-vault-path="" className="text-white">{active.path}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={selected}
            id="vault-json-sample"
            data-vault-sample=""
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6}}
            transition={{duration: 0.18}}
            className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 text-xs font-mono-tabular text-cyan-300 overflow-x-auto"
          >
            {active.json}
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
};
