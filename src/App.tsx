import { useEffect, useState } from 'react';
import { ExternalRedirectTarget, NewsArticle, PageId, WorkshopEvent } from './types/portal';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { NewsArticleView } from './components/NewsArticleView';
import { InternalPagesView } from './components/InternalPagesView';
import { Footer } from './components/Footer';
import { ExternalRedirectModal } from './components/ExternalRedirectModal';
import { WorkshopModal } from './components/WorkshopModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('inicio');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopEvent | null>(null);
  const [redirectTarget, setRedirectTarget] = useState<ExternalRedirectTarget | null>(null);

  const [fontScale, setFontScale] = useState<number>(1);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const handleNavigate = (page: PageId) => {
    setSelectedArticle(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeFontScale = (delta: number) => {
    setFontScale((prev) => {
      const next = Math.min(1.25, Math.max(1, Number((prev + delta).toFixed(3))));
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white hc-surface text-[#1A2332]">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestRedirect={setRedirectTarget}
        fontScale={fontScale}
        onChangeFontScale={handleChangeFontScale}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast((prev) => !prev)}
      />

      <main id="contenido-principal" className="flex-1">
        {selectedArticle ? (
          <NewsArticleView
            article={selectedArticle}
            onBackHome={() => handleNavigate('inicio')}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'inicio' ? (
          <HomeView
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            onSelectWorkshop={setSelectedWorkshop}
            onRequestRedirect={setRedirectTarget}
          />
        ) : (
          <InternalPagesView
            pageId={currentPage}
            onNavigate={handleNavigate}
            onRequestRedirect={setRedirectTarget}
            onSelectWorkshop={setSelectedWorkshop}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onRequestRedirect={setRedirectTarget}
      />

      <ExternalRedirectModal
        target={redirectTarget}
        onClose={() => setRedirectTarget(null)}
      />

      <WorkshopModal
        workshop={selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
      />
    </div>
  );
}
