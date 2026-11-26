import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Users,
  Briefcase,
  BookOpen,
  Layers,
} from 'lucide-react';
import {
  CONCEJO_MEMBERS,
  DEPORTE_POLI_IMAGE,
  NEWS_CULTURA_IMAGE,
  NEWS_SALUD_IMAGE,
  TRAMITES_DATA,
  WORKSHOPS_DATA,
} from '../data/municipalData';
import { ExternalRedirectTarget, PageId, WorkshopEvent } from '../types/portal';
import { DependenciesMap } from './DependenciesMap';
import { LeyKarinForm, OpirForm, VeterinariaForm } from './FormsSection';
import { TramiteIcon } from './MunicipalShield';

interface InternalPagesViewProps {
  pageId: Exclude<PageId, 'inicio'>;
  onNavigate: (page: PageId) => void;
  onRequestRedirect: (target: ExternalRedirectTarget) => void;
  onSelectWorkshop: (workshop: WorkshopEvent) => void;
}

const PageBanner: React.FC<{
  section: string;
  title: string;
  subtitle: string;
  onBack: () => void;
}> = ({ section, title, subtitle, onBack }) => (
  <div className="bg-[#662D91] text-white py-10 lg:py-12 border-b border-white/10">
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 space-y-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E4D6ED] hover:text-white cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>Volver al Inicio</span>
      </button>
      <p className="text-sm font-semibold text-[#E4D6ED]">{section}</p>
      <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white text-balance">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

export const InternalPagesView: React.FC<InternalPagesViewProps> = ({
  pageId,
  onNavigate,
  onRequestRedirect,
  onSelectWorkshop,
}) => {
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('Todas');
  const [licenciaDia, setLicenciaDia] = useState('Jueves 27 de noviembre · 09:30 hrs');
  const [licenciaTipo, setLicenciaTipo] = useState('Renovación Licencia Clase B');
  const [licenciaReservada, setLicenciaReservada] = useState(false);

  const filteredCatalog = useMemo(() => {
    return TRAMITES_DATA.filter((t) => {
      const matchesCat = catalogCategory === 'Todas' || t.category === catalogCategory;
      const q = catalogSearch.trim().toLowerCase();
      const matchesQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q));
      return matchesCat && matchesQ;
    });
  }, [catalogCategory, catalogSearch]);

  // 1. PÁGINA CATÁLOGO COMPLETO DE TRÁMITES
  if (pageId === 'tramites-todos') {
    return (
      <div>
        <PageBanner
          section="Trámites y Pagos Municipales"
          title="Catálogo Completo de Trámites en Línea y Presenciales"
          subtitle="Encuentra requisitos, costos oficiales, plazos de respuesta y accede a las plataformas de pago municipal."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#F4F6F9] hc-surface p-4 rounded-xl border border-[#DDE3EA]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-[#4A5568] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <label htmlFor="cat-search" className="sr-only">Filtrar trámites</label>
              <input
                id="cat-search"
                type="search"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Filtrar por palabra clave (ej. TAG, licencia, aseo)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#1A2332] text-base"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['Todas', 'Pagos y Patentes', 'Tránsito', 'Social y Salud', 'Atención Ciudadana'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCatalogCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                    catalogCategory === cat
                      ? 'bg-[#662D91] text-white hc-btn-primary'
                      : 'bg-white text-[#4A5568] border border-[#DDE3EA] hover:text-[#662D91]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map((t) => (
              <article
                key={t.id}
                className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-[#F2ECF6] text-[#7A48A0]">
                      <TramiteIcon name={t.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-[#4A5568] hc-muted">{t.mode}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#7A48A0]">{t.category}</p>
                  <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">{t.title}</h2>
                  <p className="text-[15px] text-[#4A5568] hc-muted">{t.shortDesc}</p>
                  <p className="text-xs text-[#4A5568] hc-muted pt-1">
                    <strong>Sede:</strong> {t.officeLocation}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#DDE3EA] flex flex-col gap-2">
                  {t.externalPaymentUrl && t.externalGatewayName ? (
                    <button
                      type="button"
                      onClick={() =>
                        onRequestRedirect({
                          title: t.title,
                          gatewayName: t.externalGatewayName!,
                          url: t.externalPaymentUrl!,
                          description: t.shortDesc,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-sm cursor-pointer hc-btn-primary"
                    >
                      <span>{t.actionLabel}</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => onNavigate(t.targetPage)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#662D91] text-[#662D91] hc-text font-semibold text-sm hover:bg-[#F4F6F9] cursor-pointer"
                  >
                    <span>Ver ficha completa y requisitos</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. FICHAS INDIVIDUALES DE TRÁMITES Y PAGOS
  const tramiteMap: Partial<Record<PageId, string>> = {
    'tramites-circulacion': 'permiso-circulacion',
    'tramites-patentes': 'patentes-comerciales',
    'tramites-aseo': 'derechos-aseo',
    'tramites-tag': 'multas-tag',
    'tramites-licencia': 'licencia-conducir',
    'tramites-residencia': 'certificado-residencia',
  };

  if (tramiteMap[pageId]) {
    const tramite = TRAMITES_DATA.find((t) => t.id === tramiteMap[pageId])!;
    return (
      <div>
        <PageBanner
          section={`Trámites y Pagos · ${tramite.category}`}
          title={tramite.title}
          subtitle={tramite.shortDesc}
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4">
              <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                Documentos y Requisitos Obligatorios
              </h2>
              <ul className="space-y-3 text-base text-[#1A2332] hc-text">
                {tramite.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#237A3B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Módulo interactivo de reserva para Licencias de Conducir */}
            {pageId === 'tramites-licencia' && (
              <section className="bg-[#F4F6F9] hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4">
                <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                  Pre-reserva de Bloque Horario en Gabinete Psicotécnico
                </h2>
                {licenciaReservada ? (
                  <div className="p-5 rounded-lg bg-[#237A3B]/10 border border-[#237A3B]/30 space-y-2">
                    <p className="font-bold text-[#662D91] hc-text">
                      Pre-reserva registrada para {licenciaTipo}
                    </p>
                    <p className="text-[15px] text-[#1A2332] hc-text">
                      Bloque seleccionado: <strong>{licenciaDia}</strong> en Edificio Dorsal (Av. Dorsal 1904). Preséntate 15 minutos antes con tu cédula de identidad vigente y certificado de residencia.
                    </p>
                    <button
                      type="button"
                      onClick={() => setLicenciaReservada(false)}
                      className="text-sm font-semibold text-[#7A48A0] underline cursor-pointer pt-1"
                    >
                      Modificar bloque horario
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lic-tipo" className="block text-sm font-semibold mb-1.5">
                          Tipo de trámite
                        </label>
                        <select
                          id="lic-tipo"
                          value={licenciaTipo}
                          onChange={(e) => setLicenciaTipo(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#1A2332]"
                        >
                          <option>Renovación Licencia Clase B</option>
                          <option>Primera Licencia Clase B</option>
                          <option>Control Licencia Profesional (A1-A5)</option>
                          <option>Duplicado por Extravío o Deterioro</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="lic-dia" className="block text-sm font-semibold mb-1.5">
                          Próximos bloques disponibles
                        </label>
                        <select
                          id="lic-dia"
                          value={licenciaDia}
                          onChange={(e) => setLicenciaDia(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#1A2332]"
                        >
                          <option>Jueves 27 de noviembre · 09:30 hrs</option>
                          <option>Viernes 28 de noviembre · 10:15 hrs</option>
                          <option>Lunes 01 de diciembre · 08:45 hrs</option>
                          <option>Martes 02 de diciembre · 11:30 hrs</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLicenciaReservada(true)}
                      className="px-5 py-2.5 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold cursor-pointer hc-btn-primary"
                    >
                      Confirmar pre-reserva presencial
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#F4F6F9] hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">
                Información del Trámite
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-[#4A5568] hc-muted">Valor / Arancel</dt>
                  <dd className="text-[#1A2332] hc-text font-medium mt-0.5">{tramite.cost}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#4A5568] hc-muted">Tiempo de respuesta</dt>
                  <dd className="text-[#1A2332] hc-text font-medium mt-0.5">{tramite.processingTime}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#4A5568] hc-muted">Unidad responsable</dt>
                  <dd className="text-[#1A2332] hc-text font-medium mt-0.5">{tramite.officeLocation}</dd>
                </div>
              </dl>

              {tramite.externalPaymentUrl && tramite.externalGatewayName ? (
                <button
                  type="button"
                  onClick={() =>
                    onRequestRedirect({
                      title: tramite.title,
                      gatewayName: tramite.externalGatewayName!,
                      url: tramite.externalPaymentUrl!,
                      description: tramite.shortDesc,
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-base cursor-pointer hc-btn-primary"
                >
                  <span>{tramite.actionLabel}</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('contacto-opir')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#662D91] hover:bg-[#4A2068] text-white font-semibold text-base cursor-pointer hc-btn-primary"
                >
                  <span>Consultar vía OPIR</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // 3. CONTACTO / OPIR
  if (pageId === 'contacto-opir') {
    return (
      <div>
        <PageBanner
          section="Atención Ciudadana"
          title="Contacto y Oficina de Partes Digital (OPIR)"
          subtitle="Ingresa solicitudes formales, cartas dirigidas a Alcaldía, reclamos de servicios municipales o sugerencias vecinales con número de seguimiento."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <OpirForm />
          </div>
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#F4F6F9] hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">
                Canales de Atención Presencial y Telefónica
              </h2>
              <div className="space-y-3 text-[15px] text-[#4A5568] hc-muted">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#662D91] hc-text block">Edificio Consistorial:</strong>
                    Av. Independencia 3499, Conchalí
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#662D91] hc-text block">Horario OIRS / OPIR:</strong>
                    Lunes a viernes de 08:30 a 14:00 hrs
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#662D91] hc-text block">Mesa Central / Emergencias:</strong>
                    +56 2 2828 6000 · Fono Seguridad 1425 (24/7)
                  </span>
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDE3EA]">
                <button
                  type="button"
                  onClick={() => onNavigate('denuncia-ley-karin')}
                  className="text-sm font-semibold text-[#7A48A0] hover:underline cursor-pointer"
                >
                  Ir al Canal Reservado de Denuncia Ley Karin →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // 4. ATENCIÓN VETERINARIA / ZOONOSIS
  if (pageId === 'servicios-veterinaria') {
    return (
      <div>
        <PageBanner
          section="Servicios a la Comunidad · Tenencia Responsable"
          title="Atención Veterinaria Municipal y Zoonosis"
          subtitle="Agenda esterilizaciones, vacunación antirrábica, implantación de microchip y controles primarios para perros y gatos de vecinos de Conchalí."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <VeterinariaForm />
          </div>
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#F4F6F9] hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">
                Indicaciones previas a tu cita
              </h2>
              <ul className="space-y-2.5 text-sm text-[#4A5568] hc-muted">
                <li>• Para cirugías de esterilización, la mascota debe acudir con 8 horas de ayuno de sólidos y líquidos.</li>
                <li>• Perros deben asistir con correa y collar (bozal si es de carácter nervioso); gatos obligatoriamente en jaula transportadora.</li>
                <li>• Presentar cédula de identidad del tutor y comprobante de domicilio en Conchalí.</li>
                <li>• Clínica Veterinaria Municipal ubicada en <strong>Calle Sagitario 1655</strong>.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // 5. DENUNCIA LEY KARIN
  if (pageId === 'denuncia-ley-karin') {
    return (
      <div>
        <PageBanner
          section="Integridad y Probidad · Ley N° 21.643"
          title="Canal Reservado de Denuncia Ley Karin"
          subtitle="Procedimiento confidencial de prevención, investigación y sanción del acoso laboral, sexual y violencia en el trabajo en la Municipalidad de Conchalí."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-12 space-y-6">
          <div className="p-5 rounded-xl bg-[#F4F6F9] hc-card border border-[#DDE3EA] text-[15px] text-[#1A2332] hc-text">
            <strong>Garantía de confidencialidad:</strong> Todas las presentaciones recibidas en este canal son derivadas directamente al Comité de Integridad y Contraloría Municipal, resguardando la identidad de la persona denunciante y activando medidas de protección inmediatas.
          </div>
          <LeyKarinForm />
        </div>
      </div>
    );
  }

  // 6. MUNICIPIO SUB-PÁGINAS
  if (pageId === 'municipio-dependencias') {
    return (
      <div>
        <PageBanner
          section="Municipio · Presencia Territorial"
          title="Dependencias Municipales de Conchalí"
          subtitle="Direcciones exactas, teléfonos de atención y horarios de funcionamiento de nuestras cinco sedes comunales."
          onBack={() => onNavigate('inicio')}
        />
        <DependenciesMap onNavigate={onNavigate} />
      </div>
    );
  }

  if (pageId === 'municipio-concejo') {
    return (
      <div>
        <PageBanner
          section="Municipio · Gobierno Local"
          title="Honorable Concejo Municipal de Conchalí"
          subtitle="Conoce a las concejalas, concejales, comisiones de trabajo y horarios de atención a la comunidad."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 space-y-6">
          <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F6F9] hc-surface border-b border-[#DDE3EA] text-sm font-bold text-[#662D91] hc-text">
                  <th className="py-3.5 px-5">Autoridad</th>
                  <th className="py-3.5 px-5">Cargo</th>
                  <th className="py-3.5 px-5">Comisión Principal</th>
                  <th className="py-3.5 px-5">Atención Vecinal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE3EA] text-[15px]">
                {CONCEJO_MEMBERS.map((m) => (
                  <tr key={m.name} className="hover:bg-[#F4F6F9]/60">
                    <td className="py-4 px-5 font-semibold text-[#662D91] hc-text">{m.name}</td>
                    <td className="py-4 px-5 text-[#4A5568] hc-muted">{m.role}</td>
                    <td className="py-4 px-5 text-[#1A2332] hc-text">{m.commission}</td>
                    <td className="py-4 px-5 text-[#4A5568] hc-muted">{m.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (
    pageId === 'municipio-alcaldia' ||
    pageId === 'municipio-organigrama' ||
    pageId === 'municipio-cuenta-publica' ||
    pageId === 'municipio-plan-regulador'
  ) {
    const infoMap = {
      'municipio-alcaldia': {
        title: 'Alcaldía de Conchalí',
        subtitle: 'Conducción estratégica municipal, audiencias ciudadanas y coordinación de direcciones comunales.',
        cards: [
          {
            h: 'Gestión de Cercanía y Terreno',
            p: 'La Alcaldía coordina semanalmente operativos barriales junto a Juntas de Vecinos, priorizando seguridad preventiva 1425, luminarias LED y mantención de plazas.',
          },
          {
            h: 'Audiencias Ciudadanas (Ley de Lobby)',
            p: 'Las vecinas, vecinos y organizaciones sociales pueden solicitar audiencia formal con el Alcalde a través de Secretaría Municipal o el Portal de Lobby.',
          },
          {
            h: 'Ubicación de Gabinete',
            p: 'Edificio Consistorial · Av. Independencia 3499, Piso 2 · Atención de lunes a viernes de 08:30 a 14:00 hrs.',
          },
        ],
      },
      'municipio-organigrama': {
        title: 'Organigrama Municipal',
        subtitle: 'Estructura orgánica vigente conforme a la Ley N° 18.695 Orgánica Constitucional de Municipalidades.',
        cards: [
          {
            h: 'Unidades Asesoras y Control',
            p: 'Secretaría Municipal, Secretaría Comunal de Planificación (SECPLA), Dirección de Asesoría Jurídica y Dirección de Control Interno.',
          },
          {
            h: 'Direcciones de Servicios a la Comunidad',
            p: 'Dirección de Desarrollo Comunitario (DIDECO), Dirección de Obras Municipales (DOM), Dirección de Tránsito y Transporte Público, y Dirección de Medio Ambiente, Aseo y Ornato.',
          },
          {
            h: 'Corporaciones y Seguridad',
            p: 'Dirección de Seguridad Pública (Fono 1425), Corporación de Salud y Educación (CORESAM), Corporación Cultural y Corporación de Deportes.',
          },
        ],
      },
      'municipio-cuenta-publica': {
        title: 'Cuenta Pública y Gestión Presupuestaria',
        subtitle: 'Resumen de ejecución financiera, obras comunales entregadas y metas cumplidas ante el Concejo y la comunidad.',
        cards: [
          {
            h: 'Inversión en Infraestructura y Veredas',
            p: 'Más de $4.850 millones ejecutados en pavimentación participativa, accesibilidad universal en Av. Dorsal y recambio de luminarias LED.',
          },
          {
            h: 'Protección Social y Salud Primaria',
            p: '142.000 prestaciones en los cuatro CESFAM comunales, extensión horaria vespertina y operación continua de la Farmacia Popular.',
          },
          {
            h: 'Seguridad Preventiva 1425',
            p: 'Ampliación de la flota de patrullaje mixto y 96 cámaras de televigilancia operando 24/7 en sectores prioritarios.',
          },
        ],
      },
      'municipio-plan-regulador': {
        title: 'Plan Regulador Comunal (PRC) y Ordenanzas',
        subtitle: 'Instrumento de planificación territorial, zonificación urbana, usos de suelo y certificados de informaciones previas.',
        cards: [
          {
            h: 'Zonificación Residencial y Mixta',
            p: 'Regula alturas de edificación, coeficientes de constructibilidad y protección de barrios residenciales consolidados de Conchalí.',
          },
          {
            h: 'Ejes Comerciales y Estructurantes',
            p: 'Normativa específica para corredores de Av. Independencia, Av. Dorsal, Av. Zapadores y entorno de estaciones de Metro Línea 3.',
          },
          {
            h: 'Certificados en Línea DOM',
            p: 'Solicita Certificado de Informaciones Previas (CIP), Zonificación o Permiso de Edificación en Av. Dorsal 1904.',
          },
        ],
      },
    }[pageId];

    return (
      <div>
        <PageBanner
          section="Municipio · Gestión Institucional"
          title={infoMap.title}
          subtitle={infoMap.subtitle}
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoMap.cards.map((c) => (
            <div key={c.h} className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-2.5">
              <Building2 className="w-6 h-6 text-[#7A48A0]" aria-hidden="true" />
              <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">{c.h}</h2>
              <p className="text-[15px] text-[#4A5568] hc-muted leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. SERVICIOS A LA COMUNIDAD (DIDECO, RSH, OMIL, ADULTO MAYOR, SALUD Y EDUCACIÓN)
  if (
    pageId === 'servicios-dideco' ||
    pageId === 'servicios-rsh' ||
    pageId === 'servicios-omil' ||
    pageId === 'servicios-adulto-mayor' ||
    pageId === 'servicios-salud-educacion'
  ) {
    return (
      <div>
        <PageBanner
          section="Servicios a la Comunidad"
          title={
            pageId === 'servicios-dideco'
              ? 'DIDECO — Dirección de Desarrollo Comunitario'
              : pageId === 'servicios-rsh'
              ? 'Registro Social de Hogares (RSH) en Conchalí'
              : pageId === 'servicios-omil'
              ? 'OMIL — Oficina Municipal de Intermediación Laboral'
              : pageId === 'servicios-adulto-mayor'
              ? 'Programa y Casa del Adulto Mayor'
              : 'Salud Primaria (CESFAM) y Educación Comunal'
          }
          subtitle="Programas sociales, acompañamiento familiar, intermediación laboral y red de salud y educación pública para vecinos de Conchalí."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {pageId === 'servicios-omil' && (
              <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-6 h-6 text-[#237A3B]" aria-hidden="true" />
                  <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                    Ofertas Laborales Vigentes en la Zona Norte
                  </h2>
                </div>
                <div className="divide-y divide-[#DDE3EA]">
                  {[
                    { cargo: 'Operario/a de Bodega y Logística (Centro Industrial Vespucio Norte)', jornada: 'Lunes a viernes · Renta líquida $610.000', vacantes: '8 vacantes' },
                    { cargo: 'Administrativo/a de Facturación y Atención Clientes', jornada: 'Lunes a viernes · Sector Av. Independencia', vacantes: '3 vacantes' },
                    { cargo: 'Auxiliar de Aseo Clínico (Red Salud Conchalí)', jornada: 'Turnos diurnos · Contrato indefinido tras evaluación', vacantes: '5 vacantes' },
                  ].map((job) => (
                    <div key={job.cargo} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#662D91] hc-text">{job.cargo}</p>
                        <p className="text-sm text-[#4A5568] hc-muted">{job.jornada} · {job.vacantes}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('contacto-opir')}
                        className="px-4 py-2 rounded-lg bg-[#237A3B] text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer hc-btn-primary"
                      >
                        Postular vía OMIL
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pageId === 'servicios-rsh' && (
              <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4">
                <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                  Actualización y Trámites del Registro Social de Hogares
                </h2>
                <p className="text-[15px] text-[#4A5568] hc-muted leading-relaxed">
                  Puedes ingresar con tu ClaveÚnica al portal oficial del Ministerio de Desarrollo Social y Familia, o acudir presencialmente a los módulos de DIDECO en <strong>Calle Sagitario 1655</strong> (08:30 a 14:00 hrs) para recibir apoyo de asistentes sociales en cambios de domicilio, incorporación de integrantes o rectificación de ingresos.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onRequestRedirect({
                        title: 'Portal Ciudadano Registro Social de Hogares',
                        gatewayName: 'Ministerio de Desarrollo Social y Familia — Gobierno de Chile',
                        url: 'https://www.registrosocial.gob.cl',
                        description: 'Serás redirigido al sitio oficial del Registro Social de Hogares para ingresar con tu ClaveÚnica.',
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#237A3B] text-white font-semibold text-sm cursor-pointer hc-btn-primary"
                  >
                    <span>Ir a registrosocial.gob.cl</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {pageId === 'servicios-salud-educacion' && (
              <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] overflow-hidden">
                <img
                  src={NEWS_SALUD_IMAGE}
                  alt="Recepción de CESFAM municipal en Conchalí"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 sm:p-8 space-y-4">
                  <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                    Red de Atención Primaria de Salud (CESFAM) y Farmacia Popular
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {[
                      { name: 'CESFAM Lucas Sierra', dir: 'Av. Barón de Juras Reales 3995 · Horario 08:00 a 20:00 hrs' },
                      { name: 'CESFAM Juanita Aguirre', dir: 'Calle Altona 1825 · Horario 08:00 a 20:00 hrs' },
                      { name: 'CESFAM Symon Ojeda', dir: 'Calle José María Caro 1950 · Horario 08:00 a 20:00 hrs' },
                      { name: 'CESFAM Dr. Alberto Bachelet', dir: 'Av. La Palmilla 3780 · Horario 08:00 a 20:00 hrs' },
                    ].map((c) => (
                      <div key={c.name} className="p-4 rounded-lg bg-[#F4F6F9] hc-surface border border-[#DDE3EA]">
                        <p className="font-bold text-[#662D91] hc-text">{c.name}</p>
                        <p className="text-[#4A5568] hc-muted mt-1">{c.dir}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(pageId === 'servicios-dideco' || pageId === 'servicios-adulto-mayor') && (
              <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4">
                <Users className="w-7 h-7 text-[#7A48A0]" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl text-[#662D91] hc-text">
                  {pageId === 'servicios-dideco'
                    ? 'Programas Sociales y Atención Vecinal DIDECO'
                    : 'Acompañamiento Integral para Personas Mayores'}
                </h2>
                <p className="text-[15px] text-[#4A5568] hc-muted leading-relaxed">
                  {pageId === 'servicios-dideco'
                    ? 'DIDECO articula el acceso a subsidios estatales (SUF, Subsidio de Agua Potable, Pensión Garantizada Universal), asistencia social de emergencia, oficina de la vivienda, mujer, discapacidad e inclusión laboral.'
                    : 'El Programa Adulto Mayor ofrece talleres de estimulación cognitiva, podología preventiva, clubes comunitarios, turismo social y acompañamiento preferente para exención de derechos de aseo.'}
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-[#F4F6F9] hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-3">
              <h3 className="font-display font-bold text-lg text-[#662D91] hc-text">
                Sede Central DIDECO
              </h3>
              <p className="text-sm text-[#4A5568] hc-muted">
                <strong>Dirección:</strong> Calle Sagitario 1655, Conchalí
              </p>
              <p className="text-sm text-[#4A5568] hc-muted">
                <strong>Horario:</strong> Lunes a viernes · 08:30 a 14:00 hrs
              </p>
              <p className="text-sm text-[#4A5568] hc-muted font-mono-tabular">
                <strong>Teléfono:</strong> +56 2 2828 6300
              </p>
              <button
                type="button"
                onClick={() => onNavigate('servicios-veterinaria')}
                className="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#662D91] text-white font-semibold text-sm cursor-pointer hc-btn-primary"
              >
                Ir a Hora Veterinaria
              </button>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // 8. CULTURA Y DEPORTE
  if (
    pageId === 'cultura-biblioteca' ||
    pageId === 'cultura-leganes' ||
    pageId === 'cultura-polideportivo'
  ) {
    const isDeporte = pageId === 'cultura-polideportivo';
    return (
      <div>
        <PageBanner
          section="Cultura, Educación y Deporte"
          title={
            pageId === 'cultura-biblioteca'
              ? 'Biblioteca Pública Municipal de Conchalí'
              : pageId === 'cultura-leganes'
              ? 'Centro Cultural Leganés'
              : 'Polideportivo y Balneario Municipal'
          }
          subtitle="Espacios abiertos gratuitos para el encuentro comunitario, la lectura, las artes escénicas y la vida saludable."
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-[#DDE3EA]">
              <img
                src={isDeporte ? DEPORTE_POLI_IMAGE : NEWS_CULTURA_IMAGE}
                alt={
                  isDeporte
                    ? 'Cancha multipropósito del Polideportivo Municipal de Conchalí'
                    : 'Talleres comunitarios y lectura en el Centro Cultural y Biblioteca de Conchalí'
                }
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <BookOpen className="w-7 h-7 text-[#7A48A0]" aria-hidden="true" />
              <h2 className="font-display font-bold text-2xl text-[#662D91] hc-text">
                {isDeporte
                  ? 'Infraestructura Deportiva y Piscina Temperada'
                  : 'Programación Cultural y Préstamo de Libros'}
              </h2>
              <p className="text-base text-[#4A5568] hc-muted leading-relaxed">
                {isDeporte
                  ? 'Ubicado en Av. Diego Silva Henríquez 1325, el Polideportivo ofrece escuelas gratuitas de natación, básquetbol, futsal, gimnasia rítmica e hidrogimnasia para adultos mayores, con horario extendido hasta las 21:00 horas.'
                  : 'Contamos con préstamo gratuito a domicilio, sala de lectura infantil, computadores con acceso a internet (BiblioRedes), teatro comunitario, exposiciones y talleres permanentes para todas las edades.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {WORKSHOPS_DATA.slice(0, 2).map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onSelectWorkshop(w)}
                    className="p-4 rounded-xl border border-[#DDE3EA] bg-[#F4F6F9] hover:border-[#7A48A0] text-left cursor-pointer"
                  >
                    <p className="text-xs font-bold text-[#7A48A0]">
                      {w.day} {w.month} · {w.time}
                    </p>
                    <p className="font-bold text-sm text-[#662D91] hc-text mt-1">{w.title}</p>
                    <p className="text-xs text-[#237A3B] font-semibold mt-2">Inscribirme ahora →</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. TRANSPARENCIA Y LOBBY
  if (pageId === 'transparencia' || pageId === 'portal-lobby') {
    const isLobby = pageId === 'portal-lobby';
    return (
      <div>
        <PageBanner
          section="Probidad y Gobierno Abierto"
          title={
            isLobby
              ? 'Portal de Lobby y Gestión de Intereses (Ley N° 20.730)'
              : 'Ley de Transparencia Activa y Pasiva (Ley N° 20.285)'
          }
          subtitle={
            isLobby
              ? 'Registro público de audiencias, viajes y donativos de las autoridades y sujetos pasivos de la Ilustre Municipalidad de Conchalí.'
              : 'Acceso público a dotación de personal, remuneraciones, compras públicas, licitaciones, ordenanzas y solicitudes de acceso a la información.'
          }
          onBack={() => onNavigate('inicio')}
        />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: isLobby ? 'Solicitar Audiencia Ley de Lobby' : 'Transparencia Activa Municipal',
              desc: isLobby
                ? 'Agenda una audiencia formal con el Alcalde, Concejales o Directores Municipales.'
                : 'Consulta nóminas de planta, contrata y honorarios, presupuesto vigente y transferencias.',
              url: isLobby ? 'https://www.leylobby.gob.cl' : 'https://www.portaltransparencia.cl',
            },
            {
              title: isLobby ? 'Registro de Audiencias Realizadas' : 'Solicitud de Información (Transparencia Pasiva)',
              desc: isLobby
                ? 'Revisa el historial público de reuniones sostenidas por sujetos pasivos comunales.'
                : 'Ingresa un requerimiento de información pública con plazo legal de respuesta de 20 días hábiles.',
              url: isLobby ? 'https://www.leylobby.gob.cl' : 'https://www.portaltransparencia.cl',
            },
            {
              title: 'Compras Públicas y Licitaciones',
              desc: 'Accede a las órdenes de compra y licitaciones vigentes de la municipalidad en Mercado Público.',
              url: 'https://www.mercadopublico.cl',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#7A48A0]" aria-hidden="true" />
                <h2 className="font-display font-bold text-lg text-[#662D91] hc-text">{item.title}</h2>
                <p className="text-[15px] text-[#4A5568] hc-muted">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onRequestRedirect({
                    title: item.title,
                    gatewayName: 'Plataforma Oficial del Estado de Chile',
                    url: item.url,
                    description: item.desc,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#662D91] text-white font-semibold text-sm cursor-pointer hc-btn-primary"
              >
                <span>Acceder al portal oficial</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. FICHA TÉCNICA WORDPRESS (Para arquitectos y equipo TI municipal)
  return (
    <div>
      <PageBanner
        section="Documentación de Arquitectura Web"
        title="Especificación Técnica WordPress (Kadence / GeneratePress + FSE)"
        subtitle="Arquitectura recomendada para implementación en producción WordPress con Core Web Vitals en verde, WCAG 2.1 AA y formularios validados."
        onBack={() => onNavigate('inicio')}
      />
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#662D91] hc-text">
            <Layers className="w-5 h-5 text-[#7A48A0]" aria-hidden="true" />
            <h2 className="font-display font-bold text-lg">1. Tema Base, FSE y Rendimiento</h2>
          </div>
          <ul className="space-y-2 text-[15px] text-[#4A5568] hc-muted">
            <li>• <strong>Tema:</strong> Kadence Theme o GeneratePress Premium (base CSS &lt; 30 KB, sin jQuery bloqueante).</li>
            <li>• <strong>Constructor:</strong> Gutenberg Nativo (GenerateBlocks / Kadence Blocks) para Home y entradas de noticias, logrando LCP &lt; 1.6s y CLS 0.00 en móvil.</li>
            <li>• <strong>Caché y Media:</strong> WP Rocket / LiteSpeed Cache + conversión automática a WebP/AVIF y precarga de fuentes locales (Plus Jakarta Sans y Public Sans).</li>
          </ul>
        </div>

        <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#662D91] hc-text">
            <FileCheck2 className="w-5 h-5 text-[#7A48A0]" aria-hidden="true" />
            <h2 className="font-display font-bold text-lg">2. Custom Post Types y Formularios</h2>
          </div>
          <ul className="space-y-2 text-[15px] text-[#4A5568] hc-muted">
            <li>• <strong>CPTs (ACF Pro):</strong> <code>tramite_municipal</code>, <code>dependencia_comunal</code>, <code>taller_agenda</code> y entradas nativas por categoría (Obras, Comunidad, Cultura, Salud).</li>
            <li>• <strong>Formularios (Fluent Forms Pro / CF7):</strong> OPIR Digital, Hora Veterinaria y Ley Karin con hook JS/PHP de validación Módulo 11 de RUT chileno, adjuntos PDF/JPG (&le; 5 MB) y envío automático de Folio por SMTP institucional.</li>
            <li>• <strong>Accesibilidad WCAG 2.1 AA:</strong> Skip links, contraste &ge; 4.5:1, navegación por teclado en megamenú y controles de tamaño tipográfico persistentes en <code>localStorage</code>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
