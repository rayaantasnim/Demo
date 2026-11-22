import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NAV_ROUTES, PageId, TARGET_MIDNIGHT_MS} from '../data/ecosystem';
import {initGsapChoreography} from '../lib/gsapChoreography';
import {MotionProvider} from './MotionPrimitives';

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, TARGET_MIDNIGHT_MS - Date.now());
    return {
      days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
      hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
      minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
      seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
    };
  });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, TARGET_MIDNIGHT_MS - Date.now());
      setTimeLeft({
        days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    };
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return timeLeft;
}

export const SiteShell: React.FC<{
  pageId: PageId;
  children: React.ReactNode;
}> = ({pageId, children}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerPanelRef = useRef<HTMLElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const countdown = useCountdown();

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  // Body scroll lock while drawer overlay is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // GSAP ScrollTrigger global progress bar, 3D reveals, depth parallax & telemetry counters
  useEffect(() => {
    const cleanup = initGsapChoreography(pageId);
    return cleanup;
  }, [pageId]);

  // Rock-solid single-tap/click outside-drawer dismissal + Escape listener
  useEffect(() => {
    if (!drawerOpen) return;

    const handleOutsideEvent = (event: Event) => {
      const target = event.target as Node | null;
      if (!target) return;
      const panelEl = drawerPanelRef.current;
      const toggleEl = toggleBtnRef.current;
      if (panelEl && panelEl.contains(target)) return;
      if (toggleEl && toggleEl.contains(target)) return;
      setDrawerOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideEvent, true);
    document.addEventListener('touchstart', handleOutsideEvent, {capture: true, passive: true});
    document.addEventListener('click', handleOutsideEvent, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideEvent, true);
      document.removeEventListener('touchstart', handleOutsideEvent, true);
      document.removeEventListener('click', handleOutsideEvent, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  return (
    <MotionProvider>
      <div className="min-h-screen flex flex-col">
        {/* Shared Fixed Glassmorphism Navbar */}
        <header className="fixed top-0 left-0 right-0 w-full z-[1000] glass-nav">
          <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <a href="index.html" className="nav-brand-link shrink-0" aria-label="Arithmo Edge Home">
                <img src="favicon.jpg" alt="Arithmo Edge Logo" className="nav-brand-logo" />
              </a>
              <div className="flex flex-col min-w-0">
                <a
                  href="index.html"
                  className="font-display text-lg sm:text-xl font-bold tracking-tight brand-gradient leading-tight whitespace-nowrap w-fit"
                >
                  Arithmo Edge
                </a>
                <p className="nav-tagline hidden md:block text-[11px] lg:text-xs text-slate-400">
                  The World&apos;s First Real-Time ELO-Rated Competitive Mathematics &amp; Olympiad Mega-Ecosystem
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="https://github.com/Arithmo-Edge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arithmo-Edge GitHub Organization"
                className="btn-glass px-3.5 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0"
              >
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <button
                ref={toggleBtnRef}
                id="nav-drawer-toggle"
                type="button"
                onClick={toggleDrawer}
                aria-label={drawerOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={drawerOpen}
                aria-controls="nav-drawer-panel"
                className="btn-glass w-11 h-11 p-0 flex items-center justify-center text-slate-100 shrink-0"
              >
                <svg
                  id="nav-icon-open"
                  className={`w-5 h-5 ${drawerOpen ? 'hidden' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <svg
                  id="nav-icon-close"
                  className={`w-5 h-5 ${drawerOpen ? '' : 'hidden'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="ae-scroll-progress" aria-hidden="true" />

        {/* Right-Side Slide-In Overlay Navigation Drawer (01-13) — rendered unconditionally for static SSR */}
        <div
          id="nav-drawer-backdrop"
          onClick={closeDrawer}
          aria-hidden={!drawerOpen}
          style={{
            visibility: drawerOpen ? 'visible' : 'hidden',
            opacity: drawerOpen ? 1 : 0,
            pointerEvents: drawerOpen ? 'auto' : 'none',
            transition: 'opacity 200ms ease',
          }}
          className="fixed inset-0 z-[1050] bg-slate-950/75 backdrop-blur-md"
        />
        <aside
          ref={drawerPanelRef}
          id="nav-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden={!drawerOpen}
          aria-label="Ecosystem Page Navigation"
          style={{
            visibility: drawerOpen ? 'visible' : 'hidden',
            pointerEvents: drawerOpen ? 'auto' : 'none',
            transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="fixed top-0 right-0 z-[1060] h-full w-full max-w-md glass-drawer flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div>
                <span className="font-display text-lg font-bold brand-gradient">Arithmo Edge</span>
                <p className="text-xs text-slate-400">Powered by Olympiad Edge · 13-Page Showcase</p>
              </div>
              <button
                id="nav-drawer-close"
                type="button"
                onClick={closeDrawer}
                aria-label="Close Navigation Menu"
                className="btn-glass w-11 h-11 p-0 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 p-3.5 rounded-xl border border-cyan-400/25 bg-slate-900/75">
              <div className="flex items-center justify-between text-xs text-cyan-300 mb-2">
                <span className="font-medium">Global Launch Target</span>
                <span className="font-mono-tabular text-slate-400">Dec 31, 2026 · 12:00 AM</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center" data-countdown="">
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 py-1.5">
                  <div className="font-mono-tabular text-base font-bold text-white" data-cd="days">
                    {countdown.days}
                  </div>
                  <div className="text-[10px] text-slate-400">Days</div>
                </div>
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 py-1.5">
                  <div className="font-mono-tabular text-base font-bold text-white" data-cd="hours">
                    {countdown.hours}
                  </div>
                  <div className="text-[10px] text-slate-400">Hours</div>
                </div>
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 py-1.5">
                  <div className="font-mono-tabular text-base font-bold text-white" data-cd="minutes">
                    {countdown.minutes}
                  </div>
                  <div className="text-[10px] text-slate-400">Mins</div>
                </div>
                <div className="rounded-lg bg-slate-950/80 border border-slate-800 py-1.5">
                  <div className="font-mono-tabular text-base font-bold text-cyan-400" data-cd="seconds">
                    {countdown.seconds}
                  </div>
                  <div className="text-[10px] text-slate-400">Secs</div>
                </div>
              </div>
            </div>

            <nav className="mt-5 grid gap-1.5">
              {NAV_ROUTES.map((route) => {
                const active = route.href === pageId;
                return (
                  <a
                    key={route.href}
                    href={route.href}
                    data-page={route.href}
                    onClick={closeDrawer}
                    className={`drawer-link-item flex items-center gap-3 px-3.5 py-2.5 rounded-lg border text-sm transition-colors ${
                      active
                        ? 'border-cyan-400/50 bg-cyan-400/10 text-white font-medium'
                        : 'border-transparent hover:border-slate-700 hover:bg-slate-900/70 text-slate-300'
                    }`}
                  >
                    <span className="font-mono-tabular text-xs text-cyan-400">{route.num}</span>
                    <span>{route.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by Olympiad Edge</span>
            <a
              href="https://github.com/Arithmo-Edge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              github.com/Arithmo-Edge
            </a>
          </div>
        </aside>

        {/* Main Page Content */}
        <main className="flex-1">{children}</main>

        {/* Flagship Cyber-Glass Global Footer */}
        <footer className="ae-footer">
          <div className="ae-footer-aurora" aria-hidden="true" />
          <div className="ae-footer-aurora-glow" aria-hidden="true" />

          <div className="ae-container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Column 1: Brand Identity & Live Status */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="favicon.jpg"
                    alt="Arithmo Edge Logo"
                    width={36}
                    height={36}
                    className="ae-footer-logo"
                  />
                  <div>
                    <a
                      href="index.html"
                      className="font-display text-xl font-bold brand-gradient leading-tight inline-block"
                    >
                      Arithmo Edge
                    </a>
                    <div className="text-[11px] text-slate-400">Powered by Olympiad Edge</div>
                  </div>
                </div>

                <p className="text-sm text-slate-300/90 leading-relaxed ae-prose">
                  The World&apos;s First Real-Time ELO-Rated Competitive Mathematics &amp; Olympiad Mega-Ecosystem,
                  Powered by Olympiad Edge. Launching V1.0 on Dec 16, 2026; custom .com domain follows in 2 months.
                </p>

                <div className="ae-footer-status">
                  <span className="text-emerald-400" aria-hidden="true">●</span>
                  <span>GENESIS BUILD ACTIVE · 14 PORTALS · 42 AI ENGINES</span>
                </div>
              </div>

              {/* Column 2: 13-Page Showcase Matrix */}
              <div className="lg:col-span-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 mb-3">
                  13-Page Showcase Matrix
                </h3>
                <nav
                  aria-label="Footer 13-Page Showcase Matrix"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-400"
                >
                  {NAV_ROUTES.map((route) => {
                    const isActive = route.href === pageId;
                    const routeName = route.label.replace(/^\d+\.\s*/, '');
                    return (
                      <a
                        key={route.href}
                        href={route.href}
                        aria-current={isActive ? 'page' : undefined}
                        className="ae-footer-matrix-link"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="font-mono-tabular text-[11px] text-cyan-400 shrink-0">
                            {route.num}
                          </span>
                          <span className="truncate">{routeName}</span>
                        </span>
                        <span className="ae-footer-arrow shrink-0" aria-hidden="true">
                          →
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Column 3: Connect & Community (Exact 4-Button 2x2 Grid + Direct Text Links) */}
              <div className="lg:col-span-3 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 mb-3">
                  Connect &amp; Community
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://github.com/Arithmo-Edge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ae-footer-social-btn"
                    aria-label="GitHub Arithmo-Edge Organization"
                  >
                    <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="mailto:rayaantasnim@gmail.com"
                    data-tone="violet"
                    className="ae-footer-social-btn"
                    aria-label="Email Arithmo Edge Founder"
                  >
                    <svg className="w-4 h-4 text-violet-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/rayaan-tasnim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ae-footer-social-btn"
                    aria-label="LinkedIn Profile Rayaan Tasnim"
                  >
                    <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@jaleeshabib"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tone="rose"
                    className="ae-footer-social-btn"
                    aria-label="YouTube Channel Jalees Habib"
                  >
                    <svg className="w-4 h-4 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>YouTube</span>
                  </a>
                </div>

                <div className="pt-1 space-y-1.5 text-[11px] font-mono-tabular text-slate-400">
                  <div>
                    <a
                      href="https://github.com/Arithmo-Edge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300/90 hover:text-cyan-200 hover:underline break-all"
                    >
                      https://github.com/Arithmo-Edge
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/rayaan-tasnim/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-300/90 hover:text-sky-200 hover:underline break-all"
                    >
                      https://www.linkedin.com/in/rayaan-tasnim/
                    </a>
                  </div>
                  <div>
                    <a
                      href="mailto:rayaantasnim@gmail.com"
                      className="text-slate-300 hover:text-cyan-200 hover:underline break-all"
                    >
                      rayaantasnim@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed">
              <hr className="ae-footer-hr" />
              <center className="leading-relaxed">
                Authorized by Rayaan Tasnim <br />
                © All Rights Reserved <br />
                © Arithmo-Edge 2026<br />
                Powered by Olympiad Edge
              </center>
            </div>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
};
