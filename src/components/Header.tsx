import React, { useEffect, useRef, useState } from 'react';
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Contrast,
  ArrowRight,
  Car,
  Store,
  Trash2,
  Receipt,
  IdCard,
  Home,
} from 'lucide-react';
import { ExternalRedirectTarget, PageId } from '../types/portal';
import { MunicipalShield } from './MunicipalShield';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onRequestRedirect: (target: ExternalRedirectTarget) => void;
  fontScale: number;
  onChangeFontScale: (delta: number) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

type DropdownKey = 'municipio' | 'tramites' | 'servicios' | 'cultura' | null;

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onRequestRedirect,
  fontScale,
  onChangeFontScale,
  highContrast,
  onToggleHighContrast,
}) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const go = (page: PageId) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    onNavigate(page);
  };

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-white border-b border-[#DDE3EA] hc-surface shadow-xs"
    >
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#662D91] focus:text-white focus:rounded-md focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      {/* Barra Superior Institucional (Desktop) — compacta y accesible */}
      <div className="hidden lg:block bg-[#662D91] text-white text-[13px] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 h-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a
              href="tel:1425"
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#E4D6ED] transition-colors whitespace-nowrap shrink-0"
              title="Llamar a Seguridad Pública y Emergencias Comunales"
            >
              <Phone className="w-3.5 h-3.5 text-[#CBB1DC]" aria-hidden="true" />
              <span>Emergencias y Seguridad Pública: 1425</span>
            </a>
            <span className="text-white/30" aria-hidden="true">|</span>
            <span className="text-white/85 whitespace-nowrap">
              Atención presencial: Lun a Vie 08:30 a 14:00 hrs
            </span>
          </div>

          <div className="flex items-center gap-5">
            <nav aria-label="Accesos institucionales superiores" className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => go('transparencia')}
                className="text-white/90 hover:text-white hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ley de Transparencia
              </button>
              <button
                type="button"
                onClick={() => go('portal-lobby')}
                className="text-white/90 hover:text-white hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Portal de Lobby
              </button>
              <button
                type="button"
                onClick={() =>
                  onRequestRedirect({
                    title: 'Webmail Funcionarios Municipales',
                    gatewayName: 'Correo Institucional Municipalidad de Conchalí',
                    url: 'https://webmail.conchali.cl',
                    description:
                      'Acceso exclusivo para funcionarias y funcionarios municipales al sistema de correo institucional.',
                  })
                }
                className="inline-flex items-center gap-1 text-white/90 hover:text-white hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Webmail Funcionarios</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </button>
            </nav>

            <span className="text-white/30" aria-hidden="true">|</span>

            {/* Selector de Accesibilidad WCAG 2.1 AA */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Herramientas de accesibilidad">
              <button
                type="button"
                onClick={() => onChangeFontScale(-0.125)}
                disabled={fontScale <= 1}
                aria-label="Disminuir tamaño de texto"
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40 text-xs font-bold cursor-pointer transition-colors"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale(0.125)}
                disabled={fontScale >= 1.25}
                aria-label="Aumentar tamaño de texto"
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40 text-xs font-bold cursor-pointer transition-colors"
              >
                A+
              </button>
              <button
                type="button"
                onClick={onToggleHighContrast}
                aria-pressed={highContrast}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  highContrast
                    ? 'bg-[#FFD400] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Contrast className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Alto Contraste</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-16 lg:h-[72px] flex items-center justify-between gap-4">
        {/* Identidad Institucional */}
        <button
          type="button"
          onClick={() => go('inicio')}
          className="flex items-center gap-2.5 text-left cursor-pointer shrink-0 group"
        >
          <MunicipalShield className="w-8 h-9 lg:w-9 lg:h-10 shrink-0" />
          <span className="font-display font-bold text-[17px] lg:text-[18px] tracking-tight text-[#662D91] hc-text whitespace-nowrap shrink-0">
            Municipalidad de Conchalí
          </span>
        </button>

        {/* Menú Principal Desktop */}
        <nav aria-label="Menú principal" className="hidden lg:flex items-center gap-5 xl:gap-6">
          <button
            type="button"
            onClick={() => go('inicio')}
            className={`text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
              currentPage === 'inicio'
                ? 'text-[#662D91] border-[#7A48A0] hc-link'
                : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
            }`}
          >
            Inicio
          </button>

          {/* Dropdown Municipio */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('municipio')}
              aria-expanded={openDropdown === 'municipio'}
              className={`inline-flex items-center gap-1 text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
                currentPage.startsWith('municipio-')
                  ? 'text-[#662D91] border-[#7A48A0] hc-link'
                  : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
              }`}
            >
              <span>Municipio</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'municipio' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {openDropdown === 'municipio' && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-white hc-card border border-[#DDE3EA] rounded-lg shadow-lg py-2 z-50">
                {[
                  { id: 'municipio-alcaldia' as PageId, label: 'Alcaldía' },
                  { id: 'municipio-concejo' as PageId, label: 'Concejo Municipal' },
                  { id: 'municipio-organigrama' as PageId, label: 'Organigrama Municipal' },
                  { id: 'municipio-dependencias' as PageId, label: 'Dependencias Municipales' },
                  { id: 'municipio-cuenta-publica' as PageId, label: 'Cuenta Pública' },
                  { id: 'municipio-plan-regulador' as PageId, label: 'Plan Regulador Comunal' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="w-full text-left px-4 py-2.5 text-[15px] text-[#1A2332] hc-text hover:bg-[#F4F6F9] hover:text-[#662D91] font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Megamenú Trámites y Pagos */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('tramites')}
              aria-expanded={openDropdown === 'tramites'}
              className={`inline-flex items-center gap-1 text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
                currentPage.startsWith('tramites-')
                  ? 'text-[#662D91] border-[#7A48A0] hc-link'
                  : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
              }`}
            >
              <span>Trámites y Pagos</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'tramites' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {openDropdown === 'tramites' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[680px] bg-white hc-card border border-[#DDE3EA] rounded-xl shadow-xl p-6 z-50">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE3EA]">
                  <div>
                    <p className="font-display font-bold text-[#662D91] hc-text text-base">
                      Trámites, Pagos y Licencias Municipales
                    </p>
                    <p className="text-sm text-[#4A5568] hc-muted">
                      Acceso directo a plataformas de pago oficiales y reserva de horas
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => go('tramites-todos')}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#7A48A0] hover:underline whitespace-nowrap cursor-pointer"
                  >
                    <span>Ver todos los trámites</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      id: 'tramites-circulacion' as PageId,
                      title: 'Permisos de Circulación',
                      desc: 'Renovación anual, traslado y pagos online',
                      icon: Car,
                    },
                    {
                      id: 'tramites-patentes' as PageId,
                      title: 'Patentes Comerciales',
                      desc: 'Comerciales, industriales, alcoholes y PYME',
                      icon: Store,
                    },
                    {
                      id: 'tramites-aseo' as PageId,
                      title: 'Derechos de Aseo',
                      desc: 'Pago por rol SII y postulación a exención',
                      icon: Trash2,
                    },
                    {
                      id: 'tramites-tag' as PageId,
                      title: 'Multas TAG',
                      desc: 'Consulta empadronada y pago Juzgado Policía Local',
                      icon: Receipt,
                    },
                    {
                      id: 'tramites-licencia' as PageId,
                      title: 'Licencias de Conducir',
                      desc: 'Primera licencia, renovación y hora psicotécnico',
                      icon: IdCard,
                    },
                    {
                      id: 'tramites-residencia' as PageId,
                      title: 'Certificado de Residencia',
                      desc: 'Gestión con Junta de Vecinos y requisitos',
                      icon: Home,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => go(item.id)}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F4F6F9] text-left transition-colors cursor-pointer group"
                      >
                        <div className="p-2 rounded-md bg-[#F2ECF6] text-[#7A48A0] group-hover:bg-[#662D91] group-hover:text-white transition-colors shrink-0">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="font-semibold text-[15px] text-[#662D91] hc-text">
                            {item.title}
                          </div>
                          <div className="text-[13px] text-[#4A5568] hc-muted leading-snug">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Servicios a la Comunidad */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('servicios')}
              aria-expanded={openDropdown === 'servicios'}
              className={`inline-flex items-center gap-1 text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
                currentPage.startsWith('servicios-')
                  ? 'text-[#662D91] border-[#7A48A0] hc-link'
                  : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
              }`}
            >
              <span>Servicios</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'servicios' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {openDropdown === 'servicios' && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-white hc-card border border-[#DDE3EA] rounded-lg shadow-lg py-2 z-50">
                {[
                  { id: 'servicios-dideco' as PageId, label: 'DIDECO y Asistencia Social' },
                  { id: 'servicios-rsh' as PageId, label: 'Registro Social de Hogares' },
                  { id: 'servicios-omil' as PageId, label: 'OMIL Empleo y Capacitación' },
                  { id: 'servicios-veterinaria' as PageId, label: 'Atención Veterinaria / Zoonosis' },
                  { id: 'servicios-adulto-mayor' as PageId, label: 'Programa Adulto Mayor' },
                  { id: 'servicios-salud-educacion' as PageId, label: 'Salud (CESFAM) y Educación' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="w-full text-left px-4 py-2.5 text-[15px] text-[#1A2332] hc-text hover:bg-[#F4F6F9] hover:text-[#662D91] font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Cultura y Deporte */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('cultura')}
              aria-expanded={openDropdown === 'cultura'}
              className={`inline-flex items-center gap-1 text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
                currentPage.startsWith('cultura-')
                  ? 'text-[#662D91] border-[#7A48A0] hc-link'
                  : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
              }`}
            >
              <span>Cultura y Deporte</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'cultura' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {openDropdown === 'cultura' && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-white hc-card border border-[#DDE3EA] rounded-lg shadow-lg py-2 z-50">
                {[
                  { id: 'cultura-biblioteca' as PageId, label: 'Biblioteca Pública Municipal' },
                  { id: 'cultura-leganes' as PageId, label: 'Centro Cultural Leganés' },
                  { id: 'cultura-polideportivo' as PageId, label: 'Polideportivo y Balneario Municipal' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="w-full text-left px-4 py-2.5 text-[15px] text-[#1A2332] hc-text hover:bg-[#F4F6F9] hover:text-[#662D91] font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => go('contacto-opir')}
            className={`text-[15px] font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer ${
              currentPage === 'contacto-opir'
                ? 'text-[#662D91] border-[#7A48A0] hc-link'
                : 'text-[#1A2332] border-transparent hover:text-[#7A48A0] hc-text'
            }`}
          >
            Contacto / OPIR
          </button>
        </nav>

        {/* Botón CTA Principal + Botón Menú Móvil */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => go('tramites-todos')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-[15px] transition-colors whitespace-nowrap shrink-0 cursor-pointer hc-btn-primary"
          >
            <span>Trámites en Línea</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#DDE3EA] text-[#662D91] hc-text hover:bg-[#F4F6F9] cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Responsivo (Mobile-First, botones >= 44px) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white hc-surface border-t border-[#DDE3EA] max-h-[82vh] overflow-y-auto px-4 py-4 space-y-3">
          {/* Accesibilidad + Emergencia rápida */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DDE3EA]">
            <a
              href="tel:1425"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#662D91] text-white text-sm font-semibold"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Emergencias: 1425</span>
            </a>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChangeFontScale(-0.125)}
                className="min-w-[44px] min-h-[44px] rounded-lg border border-[#DDE3EA] font-bold text-sm"
                aria-label="Disminuir tamaño de texto"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale(0.125)}
                className="min-w-[44px] min-h-[44px] rounded-lg border border-[#DDE3EA] font-bold text-sm"
                aria-label="Aumentar tamaño de texto"
              >
                A+
              </button>
              <button
                type="button"
                onClick={onToggleHighContrast}
                aria-pressed={highContrast}
                className={`min-h-[44px] px-3 rounded-lg border text-sm font-semibold ${
                  highContrast ? 'bg-[#FFD400] text-black border-black' : 'border-[#DDE3EA]'
                }`}
              >
                Contraste
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => go('tramites-todos')}
            className="w-full py-3 px-4 rounded-lg bg-[#237A3B] text-white font-semibold text-base text-center hc-btn-primary"
          >
            Trámites en Línea
          </button>

          <button
            type="button"
            onClick={() => go('inicio')}
            className="w-full text-left py-3 px-2 font-semibold text-base border-b border-[#DDE3EA]"
          >
            Inicio
          </button>

          {/* Acordeón Municipio */}
          <div className="border-b border-[#DDE3EA]">
            <button
              type="button"
              onClick={() => setMobileSection((s) => (s === 'municipio' ? null : 'municipio'))}
              className="w-full flex items-center justify-between py-3 px-2 font-semibold text-base"
            >
              <span>Municipio</span>
              <ChevronDown className={`w-5 h-5 ${mobileSection === 'municipio' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'municipio' && (
              <div className="pl-4 pb-3 space-y-1">
                {[
                  { id: 'municipio-alcaldia' as PageId, label: 'Alcaldía' },
                  { id: 'municipio-concejo' as PageId, label: 'Concejo Municipal' },
                  { id: 'municipio-organigrama' as PageId, label: 'Organigrama' },
                  { id: 'municipio-dependencias' as PageId, label: 'Dependencias Municipales' },
                  { id: 'municipio-cuenta-publica' as PageId, label: 'Cuenta Pública' },
                  { id: 'municipio-plan-regulador' as PageId, label: 'Plan Regulador Comunal' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="block w-full text-left py-2.5 text-[15px] text-[#4A5568] hc-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Acordeón Trámites */}
          <div className="border-b border-[#DDE3EA]">
            <button
              type="button"
              onClick={() => setMobileSection((s) => (s === 'tramites' ? null : 'tramites'))}
              className="w-full flex items-center justify-between py-3 px-2 font-semibold text-base"
            >
              <span>Trámites y Pagos</span>
              <ChevronDown className={`w-5 h-5 ${mobileSection === 'tramites' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'tramites' && (
              <div className="pl-4 pb-3 space-y-1">
                {[
                  { id: 'tramites-circulacion' as PageId, label: 'Permisos de Circulación' },
                  { id: 'tramites-patentes' as PageId, label: 'Patentes Comerciales' },
                  { id: 'tramites-aseo' as PageId, label: 'Derechos de Aseo' },
                  { id: 'tramites-tag' as PageId, label: 'Multas TAG' },
                  { id: 'tramites-licencia' as PageId, label: 'Licencias de Conducir' },
                  { id: 'tramites-residencia' as PageId, label: 'Certificado de Residencia' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="block w-full text-left py-2.5 text-[15px] text-[#4A5568] hc-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Acordeón Servicios */}
          <div className="border-b border-[#DDE3EA]">
            <button
              type="button"
              onClick={() => setMobileSection((s) => (s === 'servicios' ? null : 'servicios'))}
              className="w-full flex items-center justify-between py-3 px-2 font-semibold text-base"
            >
              <span>Servicios a la Comunidad</span>
              <ChevronDown className={`w-5 h-5 ${mobileSection === 'servicios' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'servicios' && (
              <div className="pl-4 pb-3 space-y-1">
                {[
                  { id: 'servicios-dideco' as PageId, label: 'DIDECO y Asistencia Social' },
                  { id: 'servicios-rsh' as PageId, label: 'Registro Social de Hogares' },
                  { id: 'servicios-omil' as PageId, label: 'OMIL Empleo' },
                  { id: 'servicios-veterinaria' as PageId, label: 'Atención Veterinaria / Zoonosis' },
                  { id: 'servicios-adulto-mayor' as PageId, label: 'Adulto Mayor' },
                  { id: 'servicios-salud-educacion' as PageId, label: 'Salud y Educación' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="block w-full text-left py-2.5 text-[15px] text-[#4A5568] hc-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Acordeón Cultura y Deporte */}
          <div className="border-b border-[#DDE3EA]">
            <button
              type="button"
              onClick={() => setMobileSection((s) => (s === 'cultura' ? null : 'cultura'))}
              className="w-full flex items-center justify-between py-3 px-2 font-semibold text-base"
            >
              <span>Cultura y Deporte</span>
              <ChevronDown className={`w-5 h-5 ${mobileSection === 'cultura' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'cultura' && (
              <div className="pl-4 pb-3 space-y-1">
                {[
                  { id: 'cultura-biblioteca' as PageId, label: 'Biblioteca Pública' },
                  { id: 'cultura-leganes' as PageId, label: 'Centro Cultural Leganés' },
                  { id: 'cultura-polideportivo' as PageId, label: 'Polideportivo y Balneario Municipal' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="block w-full text-left py-2.5 text-[15px] text-[#4A5568] hc-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => go('contacto-opir')}
            className="w-full text-left py-3 px-2 font-semibold text-base border-b border-[#DDE3EA]"
          >
            Contacto / Oficina de Partes Digital (OPIR)
          </button>

          <div className="pt-2 flex flex-wrap gap-3 text-sm text-[#7A48A0] font-semibold">
            <button type="button" onClick={() => go('transparencia')}>
              Ley de Transparencia
            </button>
            <button type="button" onClick={() => go('portal-lobby')}>
              Portal de Lobby
            </button>
            <button type="button" onClick={() => go('denuncia-ley-karin')}>
              Canal Ley Karin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
