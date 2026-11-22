import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes hardware-accelerated GSAP + ScrollTrigger choreography across the page:
 * - Fixed `.ae-scroll-progress` top bar scrub
 * - `[data-3d-reveal]` perspective tilt entrance (`once: true`)
 * - `[data-3d-parallax]` continuous vertical depth scrub
 * - `[data-count]` smooth numeric telemetry count-ups
 */
export function initGsapChoreography(pageKey?: string): () => void {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const progressBar = document.querySelector<HTMLElement>('.ae-scroll-progress');
  const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

  if (reducedMotion) {
    if (progressBar) progressBar.style.transform = 'scaleX(1)';
    document.querySelectorAll<HTMLElement>('[data-3d-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    countEls.forEach((el) => {
      const target = el.getAttribute('data-count');
      const suffix = el.getAttribute('data-count-suffix') || '';
      if (target) el.textContent = `${Number(target).toLocaleString()}${suffix}`;
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    if (progressBar) {
      gsap.fromTo(
        progressBar,
        {scaleX: 0},
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        },
      );
    }

    document.querySelectorAll<HTMLElement>('[data-3d-reveal]').forEach((el, idx) => {
      gsap.fromTo(
        el,
        {opacity: 0, y: 38, rotationX: 7, transformPerspective: 1100},
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.72,
          delay: Math.min((idx % 3) * 0.05, 0.15),
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        },
      );
    });

    document.querySelectorAll<HTMLElement>('[data-3d-parallax]').forEach((el) => {
      const depth = Number(el.getAttribute('data-3d-parallax-depth') || 22);
      gsap.fromTo(
        el,
        {y: -depth * 0.4},
        {
          y: depth * 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        },
      );
    });

    countEls.forEach((el) => {
      const rawTarget = Number(el.getAttribute('data-count') || '0');
      const suffix = el.getAttribute('data-count-suffix') || '';
      if (!Number.isFinite(rawTarget) || rawTarget <= 0) return;

      const state = {val: 0};
      gsap.to(state, {
        val: rawTarget,
        duration: 1.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(state.val).toLocaleString()}${suffix}`;
        },
      });
    });
  });

  const refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 160);

  // Safety guarantee so no reveal target stays invisible on ultra-short viewports
  const safetyTimer = window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-3d-reveal]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.15 && getComputedStyle(el).opacity === '0') {
        gsap.to(el, {opacity: 1, y: 0, rotationX: 0, duration: 0.4, clearProps: 'transform'});
      }
    });
  }, 750);

  void pageKey;

  return () => {
    window.clearTimeout(refreshTimer);
    window.clearTimeout(safetyTimer);
    ctx.revert();
  };
}
