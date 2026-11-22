import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {SiteShell} from './components/SiteShell';
import {PageId} from './data/ecosystem';
import {HomePage} from './pages/HomePage';
import {WhyArithmoPage} from './pages/WhyArithmoPage';
import {ArchitecturePage} from './pages/ArchitecturePage';
import {ArenasEloPage} from './pages/ArenasEloPage';
import {ContestsPage} from './pages/ContestsPage';
import {AiCorePage} from './pages/AiCorePage';
import {SecurityQprt4Page} from './pages/SecurityQprt4Page';
import {AcademiesPage} from './pages/AcademiesPage';
import {PricingPage} from './pages/PricingPage';
import {SocialsForgePage} from './pages/SocialsForgePage';
import {GovernancePage} from './pages/GovernancePage';
import {RoadmapPage} from './pages/RoadmapPage';
import {PioneersPage} from './pages/PioneersPage';

const PAGE_MAP: Record<PageId, React.ComponentType> = {
  'index.html': HomePage,
  'why-arithmo.html': WhyArithmoPage,
  'architecture.html': ArchitecturePage,
  'arenas-elo.html': ArenasEloPage,
  'contests.html': ContestsPage,
  'ai-core.html': AiCorePage,
  'security-qprt4.html': SecurityQprt4Page,
  'academies.html': AcademiesPage,
  'pricing.html': PricingPage,
  'socials-forge.html': SocialsForgePage,
  'governance.html': GovernancePage,
  'roadmap.html': RoadmapPage,
  'pioneers.html': PioneersPage,
};

function resolvePageId(rootEl: HTMLElement): PageId {
  const fromData = rootEl.dataset.page as PageId | undefined;
  if (fromData && fromData in PAGE_MAP) {
    return fromData;
  }
  const pathName = (window.location.pathname.split('/').pop() || 'index.html') as PageId;
  if (pathName in PAGE_MAP) {
    return pathName;
  }
  return 'index.html';
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const pageId = resolvePageId(rootElement);
  const PageComponent = PAGE_MAP[pageId];
  createRoot(rootElement).render(
    <React.StrictMode>
      <SiteShell pageId={pageId}>
        <PageComponent />
      </SiteShell>
    </React.StrictMode>
  );
}
