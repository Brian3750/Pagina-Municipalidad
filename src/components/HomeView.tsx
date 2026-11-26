import React, { useMemo, useState } from 'react';
import {
  Search,
  ArrowRight,
  Calendar,
  MapPin,
  ExternalLink,
  Car,
  IdCard,
  HeartPulse,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import {
  HERO_IMAGE,
  NEWS_DATA,
  TRAMITES_DATA,
  WORKSHOPS_DATA,
} from '../data/municipalData';
import institutionalColorStrip from '../assets/images/institutional-color-strip.png';
import {
  ExternalRedirectTarget,
  NewsArticle,
  PageId,
  TramiteItem,
  WorkshopEvent,
} from '../types/portal';
import { TramiteIcon } from './MunicipalShield';
import { DependenciesMap } from './DependenciesMap';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onSelectWorkshop: (workshop: WorkshopEvent) => void;
  onRequestRedirect: (target: ExternalRedirectTarget) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectArticle,
  onSelectWorkshop,
  onRequestRedirect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [newsFilter, setNewsFilter] = useState<'Todas' | NewsArticle['category']>('Todas');

  const featuredTramites = useMemo(
    () => TRAMITES_DATA.filter((t) => t.featured),
    []
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return TRAMITES_DATA.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q))
    ).slice(0, 6);
  }, [searchQuery]);

  const filteredNews = useMemo(() => {
    const list =
      newsFilter === 'Todas'
        ? NEWS_DATA
        : NEWS_DATA.filter((n) => n.category === newsFilter);
    return list.slice(0, 3);
  }, [newsFilter]);

  const handleTramiteAction = (t: TramiteItem) => {
    if (t.externalPaymentUrl && t.externalGatewayName) {
      onRequestRedirect({
        title: t.title,
        gatewayName: t.externalGatewayName,
        url: t.externalPaymentUrl,
        description: t.shortDesc,
      });
    } else {
      onNavigate(t.targetPage);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onNavigate(searchResults[0].targetPage);
    } else {
      onNavigate('tramites-todos');
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION FUNCIONAL */}
      <section className="relative bg-[#662D91] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Centro Cívico y Plaza de la Ilustre Municipalidad de Conchalí"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#4A2068]/95 via-[#662D91]/85 to-[#662D91]/55"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-6 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm sm:text-base font-semibold text-[#E4D6ED]">
              Ilustre Municipalidad de Conchalí · Región Metropolitana
            </p>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] tracking-tight text-white text-balance">
              Conchalí avanza contigo: Gestión transparente y cercana
            </h1>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
              Realiza tus pagos municipales, agenda horas médicas o veterinarias, ingresa solicitudes por Oficina de Partes Digital y conoce las obras en tu barrio.
            </p>

            {/* Buscador Inteligente de Trámites */}
            <div className="relative pt-2 max-w-2xl">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                aria-label="Buscador inteligente de trámites municipales"
                className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl shadow-xl border border-white/20"
              >
                <div className="relative flex-1 flex items-center">
                  <Search
                    className="w-5 h-5 text-[#4A5568] ml-3 shrink-0"
                    aria-hidden="true"
                  />
                  <label htmlFor="buscador-tramites" className="sr-only">
                    ¿Qué trámite buscas hoy?
                  </label>
                  <input
                    id="buscador-tramites"
                    type="search"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué trámite buscas hoy? Ej: Licencia de conducir, Aseo, Subsidio..."
                    className="w-full px-3 py-2.5 text-base text-[#1A2332] placeholder:text-[#64748B] bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer hc-btn-primary"
                >
                  Buscar trámite
                </button>
              </form>

              {/* Resultados en vivo del buscador */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 bg-white hc-card text-[#1A2332] rounded-xl shadow-2xl border border-[#DDE3EA] z-30 overflow-hidden"
                  role="region"
                  aria-label="Resultados sugeridos de trámites"
                >
                  {searchResults.length > 0 ? (
                    <ul className="divide-y divide-[#DDE3EA]">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onMouseDown={() => onNavigate(item.targetPage)}
                            className="w-full px-4 py-3 text-left hover:bg-[#F4F6F9] flex items-center justify-between gap-4 transition-colors cursor-pointer"
                          >
                            <div>
                              <p className="font-semibold text-[15px] text-[#662D91] hc-text">
                                {item.title}
                              </p>
                              <p className="text-xs text-[#4A5568] hc-muted">
                                {item.category} · {item.mode}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#7A48A0] shrink-0" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-[#4A5568]">
                      No encontramos un trámite exacto con "{searchQuery}".{' '}
                      <button
                        type="button"
                        onMouseDown={() => onNavigate('contacto-opir')}
                        className="font-semibold text-[#7A48A0] underline cursor-pointer"
                      >
                        Consúltanos vía OPIR
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4 Botones de Acceso Rápido */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white/80 mb-2.5">
                Accesos rápidos frecuentes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-3xl">
                {[
                  {
                    label: 'Permiso Circulación',
                    page: 'tramites-circulacion' as PageId,
                    icon: Car,
                  },
                  {
                    label: 'Licencia de Conducir',
                    page: 'tramites-licencia' as PageId,
                    icon: IdCard,
                  },
                  {
                    label: 'Hora Veterinaria',
                    page: 'servicios-veterinaria' as PageId,
                    icon: HeartPulse,
                  },
                  {
                    label: 'Oficina Partes OPIR',
                    page: 'contacto-opir' as PageId,
                    icon: FileText,
                  },
                ].map((quick) => {
                  const Icon = quick.icon;
                  return (
                    <button
                      key={quick.label}
                      type="button"
                      onClick={() => onNavigate(quick.page)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/12 hover:bg-white/22 border border-white/25 text-white font-semibold text-sm transition-colors text-left cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-[#E4D6ED] shrink-0" aria-hidden="true" />
                      <span className="truncate">{quick.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <img
        src={institutionalColorStrip}
        alt=""
        width={1024}
        height={17}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="block h-[17px] w-full object-fill"
      />

      {/* 2. GRILLA DE TRÁMITES MÁS BUSCADOS (8 Tarjetas Interactivas) */}
      <section className="py-16 lg:py-20 bg-[#F4F6F9] hc-surface border-b border-[#DDE3EA]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#7A48A0] mb-1">
                Ventanilla Única Municipal
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#662D91] hc-text text-balance">
                Trámites y Servicios Más Buscados
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tramites-todos')}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#662D91] hc-link hover:text-[#7A48A0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explorar catálogo completo de trámites</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredTramites.map((tramite) => (
              <article
                key={tramite.id}
                className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 flex flex-col justify-between hover:border-[#7A48A0] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 rounded-lg bg-[#F2ECF6] text-[#7A48A0]">
                      <TramiteIcon name={tramite.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-[#4A5568] hc-muted">
                      {tramite.mode}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#7A48A0] mb-1">
                    {tramite.category}
                  </p>
                  <h3 className="font-display font-bold text-lg text-[#662D91] hc-text leading-snug">
                    {tramite.title}
                  </h3>
                  <p className="text-[15px] text-[#4A5568] hc-muted mt-2 leading-relaxed">
                    {tramite.shortDesc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#DDE3EA] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleTramiteAction(tramite)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer hc-btn-primary ${
                      tramite.isPrimaryOnlineAction
                        ? 'bg-[#237A3B] hover:bg-[#195F31] text-white'
                        : 'bg-[#662D91] hover:bg-[#4A2068] text-white'
                    }`}
                  >
                    <span>{tramite.actionLabel}</span>
                    {tramite.externalPaymentUrl ? (
                      <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>

                  {tramite.externalPaymentUrl && (
                    <button
                      type="button"
                      onClick={() => onNavigate(tramite.targetPage)}
                      className="text-xs font-semibold text-[#7A48A0] hover:underline py-1 cursor-pointer"
                    >
                      Ver requisitos y guía paso a paso
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN DE NOTICIAS Y ACTUALIDAD COMUNAL */}
      <section className="py-16 lg:py-20 bg-white hc-surface">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#7A48A0] mb-1">
                Prensa e Información Comunal
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#662D91] hc-text text-balance">
                Noticias y Actualidad de Conchalí
              </h2>
            </div>

            {/* Filtro por categorías */}
            <div
              className="flex flex-wrap gap-1.5 p-1 bg-[#F4F6F9] hc-card rounded-lg border border-[#DDE3EA]"
              role="group"
              aria-label="Filtrar noticias por categoría"
            >
              {(['Todas', 'Obras', 'Comunidad', 'Cultura', 'Salud'] as const).map((cat) => {
                const active = newsFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewsFilter(cat)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#662D91] text-white hc-btn-primary'
                        : 'text-[#4A5568] hc-muted hover:text-[#662D91]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="bg-white hc-card rounded-xl border border-[#DDE3EA] overflow-hidden flex flex-col justify-between hover:border-[#7A48A0] transition-colors"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#F2ECF6] overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="sr-only">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#4A5568] hc-muted mb-2">
                      <span className="text-[#7A48A0]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#662D91] hc-text leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-[15px] text-[#4A5568] hc-muted mt-2.5 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#662D91] hc-link hover:text-[#7A48A0] transition-colors cursor-pointer"
                  >
                    <span>Leer noticia completa</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AGENDA DE ACTIVIDADES Y TALLERES */}
      <section className="py-16 lg:py-20 bg-[#662D91] text-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#E4D6ED] mb-1">
                Participación, Cultura y Deporte
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white text-balance">
                Agenda de Actividades y Talleres Comunitarios
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('cultura-leganes')}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#E4D6ED] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Ver programación Centro Cultural Leganés</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WORKSHOPS_DATA.map((ev) => (
              <article
                key={ev.id}
                className="bg-white text-[#1A2332] hc-card rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-5"
              >
                {/* Bloque de fecha destacado */}
                <div className="flex sm:flex-col items-center justify-center gap-1.5 sm:gap-0 px-4 py-2.5 sm:w-20 sm:h-20 rounded-lg bg-[#662D91] text-white shrink-0">
                  <span className="font-display font-extrabold text-2xl leading-none font-mono-tabular">
                    {ev.day}
                  </span>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#E4D6ED]">
                    {ev.month}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#7A48A0] mb-1">
                    <span>{ev.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#4A5568] hc-muted">
                      {ev.spotsAvailable} cupos disponibles
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#662D91] hc-text leading-snug">
                    {ev.title}
                  </h3>

                  <div className="mt-2 space-y-1 text-sm text-[#4A5568] hc-muted">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7A48A0] shrink-0" aria-hidden="true" />
                      <span>{ev.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7A48A0] shrink-0" aria-hidden="true" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectWorkshop(ev)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-sm transition-colors cursor-pointer hc-btn-primary"
                    >
                      <span>Inscribirme / Ver detalles</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MAPA INTERACTIVO DE DEPENDENCIAS MUNICIPALES */}
      <DependenciesMap onNavigate={onNavigate} />
    </div>
  );
};
