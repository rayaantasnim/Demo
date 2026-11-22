import React, {useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';
import {
  ARENA_CATALOG,
  GOLDEN_VAULT_SAMPLES,
  PORTALS_14,
  PortalCategoryKey,
  PortalNode,
} from '../data/ecosystem';

type FilterTab = 'all' | PortalCategoryKey;
type DetailTab = 'overview' | 'subsystems' | 'arena_deep_dive';

const FILTER_OPTIONS: Array<{id: FilterTab; label: string; count: number}> = [
  {id: 'all', label: 'All 14 Sites', count: 14},
  {id: 'arena', label: '5 Core Arenas', count: 5},
  {id: 'competition', label: 'Contests, Standings & DB', count: 3},
  {id: 'platform', label: 'AI, Academies, Forge & Socials', count: 4},
  {id: 'core', label: 'Core & HQ Command', count: 2},
];

interface PortalExplorer14Props {
  selectedPortalId?: string;
  onSelectPortalId?: (id: string) => void;
}

export const PortalExplorer14: React.FC<PortalExplorer14Props> = ({
  selectedPortalId: controlledPortalId,
  onSelectPortalId,
}) => {
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalPortalId, setInternalPortalId] = useState<string>(PORTALS_14[0].id);
  const selectedPortalId = controlledPortalId ?? internalPortalId;
  const setSelectedPortalId = (id: string) => {
    setInternalPortalId(id);
    onSelectPortalId?.(id);
  };
  const [detailTab, setDetailTab] = useState<DetailTab>('overview');
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const inspectorRef = useRef<HTMLDivElement | null>(null);

  const filteredPortals = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PORTALS_14.filter((p) => {
      const catMatch = filterTab === 'all' || p.category === filterTab;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = [
        p.tag,
        p.shortTitle,
        p.titleHeader,
        p.roleSummary,
        p.displayUrl,
        p.desc,
        p.architectureIntro,
        p.aiSecurityStack,
        ...(p.syllabusTopics ?? []),
        ...p.subsystems.map((s) => `${s.name} ${s.detail}`),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filterTab, searchQuery]);

  const selectedPortal: PortalNode = useMemo(() => {
    const found = filteredPortals.find((p) => p.id === selectedPortalId);
    if (found) return found;
    if (filteredPortals.length > 0) return filteredPortals[0];
    return PORTALS_14.find((p) => p.id === selectedPortalId) ?? PORTALS_14[0];
  }, [filteredPortals, selectedPortalId]);

  const activeGlobalIndex = PORTALS_14.findIndex((p) => p.id === selectedPortal.id);
  const effectiveDetailTab: DetailTab =
    detailTab === 'arena_deep_dive' && !selectedPortal.arenaKey ? 'overview' : detailTab;

  const selectPortal = (portal: PortalNode, scrollMobile = false) => {
    setSelectedPortalId(portal.id);
    if (!portal.arenaKey && detailTab === 'arena_deep_dive') {
      setDetailTab('overview');
    }
    if (scrollMobile && typeof window !== 'undefined' && window.innerWidth < 1024) {
      inspectorRef.current?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
  };

  const stepPortal = (delta: number) => {
    const nextIdx = (activeGlobalIndex + delta + PORTALS_14.length) % PORTALS_14.length;
    const nextPortal = PORTALS_14[nextIdx];
    if (filterTab !== 'all' && nextPortal.category !== filterTab) {
      setFilterTab('all');
    }
    if (searchQuery) setSearchQuery('');
    selectPortal(nextPortal);
  };

  const handleCopyUrl = async (portal: PortalNode) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(portal.fullUrl);
      }
      setCopiedUrlId(portal.id);
      window.setTimeout(() => {
        setCopiedUrlId((prev) => (prev === portal.id ? null : prev));
      }, 2000);
    } catch {
      setCopiedUrlId(portal.id);
      window.setTimeout(() => {
        setCopiedUrlId((prev) => (prev === portal.id ? null : prev));
      }, 2000);
    }
  };

  const arenaData = selectedPortal.arenaKey ? ARENA_CATALOG[selectedPortal.arenaKey] : null;
  const vaultSample = selectedPortal.arenaKey ? GOLDEN_VAULT_SAMPLES[selectedPortal.arenaKey] : null;

  return (
    <div data-portal-explorer-14="" className="space-y-6">
      {/* Top Filter & Search Toolbar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter 14 ecosystem portals by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FILTER_OPTIONS.map((opt) => {
              const active = filterTab === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  data-pe-filter={opt.id}
                  aria-selected={active}
                  onClick={() => setFilterTab(opt.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors border ${
                    active
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-semibold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {opt.label} ({opt.count})
                </button>
              );
            })}
          </div>

          {/* Search Box & Count */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                id="pe-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search arena, subsite, or engine..."
                aria-label="Search the 14 Arithmo-Edge portals"
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="button"
                data-pe-clear=""
                onClick={() => setSearchQuery('')}
                aria-label="Clear portal search"
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 ${
                  searchQuery ? '' : 'hidden'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <span data-pe-count="" className="font-mono-tabular text-xs text-slate-400 whitespace-nowrap shrink-0">
              {filteredPortals.length} / 14 shown
            </span>
          </div>
        </div>
      </div>

      {/* Master-Detail Split Explorer */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Directory List (14 Portals) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div
            data-pe-empty=""
            className={`glass-panel rounded-2xl p-8 text-center border border-slate-800 space-y-3 ${
              filteredPortals.length === 0 ? '' : 'hidden'
            }`}
          >
            <div className="font-display text-lg font-bold text-white">No Matching Portals</div>
            <p className="text-xs sm:text-sm text-slate-400">
              No subsite matches &ldquo;<span data-pe-empty-query="">{searchQuery}</span>&rdquo; under the current category filter.
            </p>
            <button
              type="button"
              data-pe-reset=""
              onClick={() => {
                setFilterTab('all');
                setSearchQuery('');
              }}
              className="btn-glass px-4 py-2 text-xs"
            >
              Reset Search &amp; Filters
            </button>
          </div>

          <div data-pe-list="" className={`grid sm:grid-cols-2 lg:grid-cols-1 gap-2.5 ${filteredPortals.length === 0 ? 'hidden' : ''}`}>
            {PORTALS_14.map((node) => {
              const inFilter = filteredPortals.some((f) => f.id === node.id);
              const active = node.id === selectedPortal.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  data-pe-item={node.id}
                  data-pe-cat={node.category}
                  onClick={() => selectPortal(node, true)}
                  aria-current={active ? 'true' : undefined}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    !inFilter ? 'hidden ' : ''
                  }${
                    active
                      ? 'bg-slate-900/95 border-cyan-400/70 shadow-[0_0_24px_rgba(0,240,255,0.12)]'
                      : 'bg-slate-900/45 border-slate-800/90 hover:border-slate-600 hover:bg-slate-900/75'
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono-tabular">
                      <span className="font-bold" style={{color: node.accentColor}}>
                        {node.tag}
                      </span>
                      <span className="text-slate-600" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-slate-400 truncate">{node.categoryLabel}</span>
                    </div>
                    <div className="font-display font-bold text-white text-sm sm:text-base truncate">
                      {node.shortTitle}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1">{node.roleSummary}</div>
                    <div className="font-mono-tabular text-[11px] text-slate-500 truncate">
                      {node.displayUrl}
                    </div>
                  </div>
                  <span
                    data-pe-status=""
                    className={`shrink-0 mt-1 text-xs font-mono-tabular whitespace-nowrap ${
                      active ? 'text-cyan-300 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {active ? 'Active' : 'View'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detailed Specification Inspector */}
        <div ref={inspectorRef} className="lg:col-span-7 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPortal.id}
              data-pe-card=""
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.18}}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden"
              style={{borderColor: `${selectedPortal.accentColor}44`}}
            >
              {/* Inspector Header */}
              <div className="p-6 sm:p-7 border-b border-slate-800/80 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular">
                    <span data-pe-tag="" className="font-semibold" style={{color: selectedPortal.accentColor}}>
                      {selectedPortal.tag}
                    </span>
                    <span className="text-slate-600" aria-hidden="true">
                      /
                    </span>
                    <span data-pe-catlabel="" className="text-slate-300">{selectedPortal.categoryLabel}</span>
                  </div>

                  {/* Sequential 1..14 Tour Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      data-pe-prev=""
                      onClick={() => stepPortal(-1)}
                      aria-label="Previous portal"
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-600 inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>
                    <span data-pe-index="" className="font-mono-tabular text-xs text-slate-400 px-2 whitespace-nowrap">
                      {String(activeGlobalIndex + 1).padStart(2, '0')} / 14
                    </span>
                    <button
                      type="button"
                      data-pe-next=""
                      onClick={() => stepPortal(1)}
                      aria-label="Next portal"
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-600 inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 data-pe-title="" className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {selectedPortal.titleHeader}
                  </h3>
                  <p data-pe-role="" className="text-xs sm:text-sm text-slate-300 mt-1">{selectedPortal.roleSummary}</p>
                </div>

                {/* Canonical URL Bar + Copy Action */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/85 border border-slate-800">
                  <code data-pe-url="" className="font-mono-tabular text-xs text-cyan-300 break-all">
                    {selectedPortal.fullUrl}
                  </code>
                  <button
                    type="button"
                    data-pe-copy=""
                    onClick={() => handleCopyUrl(selectedPortal)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:border-cyan-400 hover:text-white inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    {copiedUrlId === selectedPortal.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Inspector Sub-Navigation Tabs */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    data-pe-tab="overview"
                    onClick={() => setDetailTab('overview')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                      effectiveDetailTab === 'overview'
                        ? 'bg-slate-800 text-white border-cyan-400/70'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Overview &amp; Specifications
                  </button>
                  <button
                    type="button"
                    data-pe-tab="subsystems"
                    onClick={() => setDetailTab('subsystems')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                      effectiveDetailTab === 'subsystems'
                        ? 'bg-slate-800 text-white border-cyan-400/70'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Subsystems &amp; SDK Sync ({selectedPortal.subsystems.length})
                  </button>
                  <button
                    type="button"
                    data-pe-tab="arena_deep_dive"
                    onClick={() => setDetailTab('arena_deep_dive')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                      selectedPortal.arenaKey && arenaData ? '' : 'hidden '
                    }${
                      effectiveDetailTab === 'arena_deep_dive'
                        ? 'bg-slate-800 text-white border-cyan-400/70'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    12 Ranks, Syllabus &amp; Vault
                  </button>
                </div>
              </div>

              {/* Inspector Tab Content */}
              <div className="p-6 sm:p-7 space-y-6">
                <div data-pe-panel="overview" className={`space-y-6 ${effectiveDetailTab === 'overview' ? '' : 'hidden'}`}>
                  {/* Original Canonical Description + Rich Architectural Introduction */}
                  <div className="space-y-3">
                    <p data-pe-desc="" className="ae-prose text-sm text-slate-200 leading-relaxed">{selectedPortal.desc}</p>
                    <p data-pe-intro="" className="ae-prose text-sm text-slate-300 leading-relaxed">
                      {selectedPortal.architectureIntro}
                    </p>
                  </div>

                  {/* 4-Cell Technical Specification Table (Hairline Dividers) */}
                  <div className="grid sm:grid-cols-2 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                    <div className="p-3.5 border-b sm:border-r border-slate-800">
                      <div className="text-[11px] font-mono-tabular text-slate-400">Schedule &amp; Cadence</div>
                      <div data-pe-schedule="" className="text-xs sm:text-sm text-white font-medium mt-1">
                        {selectedPortal.schedule}
                      </div>
                    </div>
                    <div className="p-3.5 border-b border-slate-800">
                      <div className="text-[11px] font-mono-tabular text-slate-400">ELO &amp; Ranking Scope</div>
                      <div data-pe-elotracks="" className="text-xs sm:text-sm text-white font-medium mt-1">
                        {selectedPortal.eloTracks}
                      </div>
                    </div>
                    <div className="p-3.5 border-b sm:border-b-0 sm:border-r border-slate-800">
                      <div className="text-[11px] font-mono-tabular text-slate-400">AI &amp; Security Stack</div>
                      <div data-pe-stack="" className="text-xs sm:text-sm text-cyan-200 font-medium mt-1">
                        {selectedPortal.aiSecurityStack}
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="text-[11px] font-mono-tabular text-slate-400">Locked Visual Theme</div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium mt-1">
                        <span
                          aria-hidden="true"
                          data-pe-swatch=""
                          className="w-3 h-3 rounded-sm shrink-0 border border-white/20"
                          style={{backgroundColor: selectedPortal.accentColor}}
                        />
                        <span data-pe-themelabel="">{selectedPortal.themeLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="space-y-2.5">
                    <div data-pe-caps-title="" className="text-xs font-mono-tabular text-cyan-300">
                      Core Capabilities on {selectedPortal.shortTitle}
                    </div>
                    <ul data-pe-caps="" className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {selectedPortal.keyCapabilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 pb-2 border-b border-slate-800/60 last:border-b-0 last:pb-0"
                        >
                          <span
                            aria-hidden="true"
                            className="font-mono-tabular text-xs font-bold mt-0.5 shrink-0"
                            style={{color: selectedPortal.accentColor}}
                          >
                            &rarr;
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arena Quick Syllabus Teaser (when viewing any of the 5 Arenas) */}
                  <div
                    data-pe-teaser=""
                    className={`pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 ${
                      arenaData && selectedPortal.syllabusTopics ? '' : 'hidden'
                    }`}
                  >
                    <div data-pe-teaser-text="" className="text-xs text-slate-300">
                      {arenaData && (
                        <>
                          <span className="font-semibold text-white">{arenaData.name}:</span> 12 canonical titles (
                          <span className="font-mono-tabular text-slate-400">
                            {arenaData.titles[0].title} &rarr; {arenaData.titles[arenaData.titles.length - 1].title}
                          </span>
                          )
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      data-pe-open-deep=""
                      onClick={() => setDetailTab('arena_deep_dive')}
                      className="btn-glass px-3.5 py-2 text-xs whitespace-nowrap"
                    >
                      Inspect 12 Ranks &amp; Golden Vault &rarr;
                    </button>
                  </div>
                </div>

                <div data-pe-panel="subsystems" className={`space-y-6 ${effectiveDetailTab === 'subsystems' ? '' : 'hidden'}`}>
                  {/* Subsystems Breakdown */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono-tabular text-cyan-300">
                      Dedicated Portal Subsystems &amp; User Workflows
                    </div>
                    <div data-pe-subsystems="" className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/60">
                      {selectedPortal.subsystems.map((sub) => (
                        <div key={sub.name} className="p-4 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="font-display font-bold text-white text-sm sm:text-base">
                              {sub.name}
                            </div>
                            <span
                              className="font-mono-tabular text-[11px] font-medium"
                              style={{color: selectedPortal.accentColor}}
                            >
                              {sub.scope}
                            </span>
                          </div>
                          <p className="ae-prose text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {sub.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arithmo-Core-SDK Sync Hooks */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono-tabular text-violet-300">
                      Arithmo-Core-SDK (engine.js) Cross-Portal Sync Hooks
                    </div>
                    <ul data-pe-hooks="" className="space-y-2 text-xs text-slate-300 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                      {selectedPortal.sdkSyncHooks.map((hook, idx) => (
                        <li key={hook} className="flex items-start gap-2.5">
                          <span className="font-mono-tabular text-slate-500 shrink-0">
                            0{idx + 1}.
                          </span>
                          <span>{hook}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  data-pe-panel="arena_deep_dive"
                  className={`space-y-6 ${effectiveDetailTab === 'arena_deep_dive' && arenaData ? '' : 'hidden'}`}
                >
                  {/* Curriculum Topics & Tag Masking Rule */}
                  <div data-pe-deep-syllabus-wrap="" className={`space-y-3 ${selectedPortal.syllabusTopics ? '' : 'hidden'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div data-pe-deep-syllabus-title="" className="text-xs font-mono-tabular text-cyan-300">
                        {arenaData ? `${arenaData.name} Olympiad Syllabus Domains` : ''}
                      </div>
                      <span className="text-[11px] text-amber-300 font-mono-tabular">
                        #Tags Hidden During Live Rated Contests
                      </span>
                    </div>
                    <div data-pe-deep-syllabus="" className="grid sm:grid-cols-2 gap-x-6 gap-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                      {(selectedPortal.syllabusTopics ?? []).map((topic, idx) => (
                        <div key={topic} className="flex items-start gap-2">
                          <span className="font-mono-tabular text-slate-500 shrink-0">
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full 12-Tier Canonical Progression Matrix */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-mono-tabular text-cyan-300">
                        Complete 12-Tier Rank Progression · (General + Expert) / 2
                      </div>
                      <span className="text-[11px] text-slate-400">
                        1500+ Forge · 2000+ Expert Q&amp;A &amp; Peer Review
                      </span>
                    </div>
                    <div data-pe-deep-ranks="" className="grid sm:grid-cols-2 gap-2">
                      {(arenaData?.titles ?? []).map((t, idx) => {
                        const isMilestone = t.min === 1400 || t.min === 2000 || t.min >= 3000;
                        return (
                          <div
                            key={t.title}
                            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs ${
                              isMilestone
                                ? 'bg-slate-900/90 border-slate-700 text-white'
                                : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                            }`}
                          >
                            <span className="truncate font-medium">
                              <span className="font-mono-tabular text-slate-500 mr-1.5">
                                {String(idx + 1).padStart(2, '0')}.
                              </span>
                              <span style={t.min >= 3000 && arenaData ? {color: arenaData.color} : undefined}>
                                {t.title}
                              </span>
                            </span>
                            <span className="font-mono-tabular text-[11px] text-slate-400 shrink-0">
                              {t.max >= 9999 ? `${t.min}+` : `${t.min}–${t.max}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Private Golden Vault Schema v1.2 Live Sample */}
                  <div data-pe-deep-vault-wrap="" className={`space-y-2 ${vaultSample ? '' : 'hidden'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-mono-tabular text-amber-300">
                        Private 5×4 Golden Vault Sample (Schema v1.2)
                      </div>
                      <span data-pe-deep-vault-path="" className="font-mono-tabular text-[11px] text-slate-400 truncate max-w-full">
                        {vaultSample?.path ?? ''}
                      </span>
                    </div>
                    <pre data-pe-deep-vault-json="" className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono-tabular text-[11px] text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
                      {vaultSample?.json ?? ''}
                    </pre>
                  </div>
                </div>

                {/* Access Policy & Deep-Dive Navigation Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 min-w-0 flex-1">
                    <span className="text-slate-200 font-semibold">Access Policy: </span>
                    <span data-pe-access="">{selectedPortal.access}</span>
                  </div>
                  <a
                    data-pe-doclink=""
                    href={selectedPortal.relatedDocPage.href}
                    className="btn-cyber px-4 py-2 text-xs whitespace-nowrap shrink-0"
                  >
                    <span>{selectedPortal.relatedDocPage.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
