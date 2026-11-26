import React from 'react';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';
import { NEWS_DATA } from '../data/municipalData';
import { NewsArticle, PageId } from '../types/portal';

interface NewsArticleViewProps {
  article: NewsArticle;
  onBackHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onNavigate: (page: PageId) => void;
}

export const NewsArticleView: React.FC<NewsArticleViewProps> = ({
  article,
  onBackHome,
  onSelectArticle,
  onNavigate,
}) => {
  const related = NEWS_DATA.filter((n) => n.id !== article.id).slice(0, 2);

  return (
    <article className="bg-white hc-surface py-10 lg:py-14">
      <div className="max-w-[960px] mx-auto px-4 lg:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A48A0] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a Portada de Noticias</span>
          </button>
        </nav>

        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#4A5568] hc-muted">
            <span className="text-[#7A48A0]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {article.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" aria-hidden="true" />
              {article.author}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#662D91] hc-text leading-tight text-balance">
            {article.title}
          </h1>

          <p className="text-lg text-[#4A5568] hc-muted leading-relaxed">
            {article.summary}
          </p>

          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#662D91] hc-text">
            <MapPin className="w-4 h-4 text-[#237A3B]" aria-hidden="true" />
            <span>{article.locationTag}</span>
          </p>
        </header>

        <figure className="mb-8 rounded-xl overflow-hidden border border-[#DDE3EA] bg-[#F2ECF6]">
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full max-h-[480px] object-cover"
          />
          <figcaption className="px-4 py-2.5 text-xs text-[#4A5568] hc-muted bg-[#F4F6F9] hc-surface border-t border-[#DDE3EA]">
            {article.imageAlt} · Archivo Comunicaciones Ilustre Municipalidad de Conchalí.
          </figcaption>
        </figure>

        <div className="max-w-prose space-y-5 text-[17px] text-[#1A2332] hc-text leading-[1.75]">
          {article.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-[#F4F6F9] hc-card border border-[#DDE3EA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">
              ¿Tienes dudas o deseas realizar un requerimiento sobre este proyecto?
            </h2>
            <p className="text-sm text-[#4A5568] hc-muted">
              Comunícate directamente con nuestra Oficina de Partes Digital (OPIR).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contacto-opir')}
            className="px-5 py-2.5 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-sm whitespace-nowrap shrink-0 cursor-pointer hc-btn-primary"
          >
            Ir a Contacto / OPIR
          </button>
        </div>

        <section className="mt-12 pt-8 border-t border-[#DDE3EA]">
          <h2 className="font-display font-bold text-xl text-[#662D91] hc-text mb-5">
            Otras noticias recientes de Conchalí
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectArticle(rel)}
                className="text-left p-5 rounded-xl border border-[#DDE3EA] hover:border-[#7A48A0] bg-white hc-card transition-colors cursor-pointer"
              >
                <p className="text-xs font-semibold text-[#7A48A0] mb-1">
                  {rel.category} · {rel.date}
                </p>
                <h3 className="font-display font-bold text-base text-[#662D91] hc-text leading-snug">
                  {rel.title}
                </h3>
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};
