import React, { useState } from 'react';
import { Clock, MapPin, Navigation, Phone, TrainFront } from 'lucide-react';
import { DEPENDENCIES_DATA } from '../data/municipalData';
import { MunicipalDependency, PageId } from '../types/portal';

interface DependenciesMapProps {
  onNavigate?: (page: PageId) => void;
}

export const DependenciesMap: React.FC<DependenciesMapProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>(DEPENDENCIES_DATA[0].id);
  const [filterType, setFilterType] = useState<'all' | MunicipalDependency['type']>('all');

  const filtered =
    filterType === 'all'
      ? DEPENDENCIES_DATA
      : DEPENDENCIES_DATA.filter((d) => d.type === filterType);

  const selected =
    filtered.find((d) => d.id === selectedId) || filtered[0] || DEPENDENCIES_DATA[0];

  const filterTabs: { id: 'all' | MunicipalDependency['type']; label: string }[] = [
    { id: 'all', label: 'Todas las sedes (5)' },
    { id: 'consistorial', label: 'Consistorial' },
    { id: 'transito', label: 'Tránsito y Obras' },
    { id: 'social', label: 'DIDECO Social' },
    { id: 'seguridad', label: 'Seguridad 1425' },
    { id: 'deporte', label: 'Deporte' },
  ];

  return (
    <section
      id="dependencias-mapa"
      className="py-16 lg:py-20 bg-[#F4F6F9] hc-surface border-t border-[#DDE3EA]"
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#7A48A0] mb-1.5">
              Atención Presencial en Territorio
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#662D91] hc-text text-balance">
              Mapa de Dependencias Municipales y Horarios de Atención
            </h2>
            <p className="text-base text-[#4A5568] hc-muted mt-2">
              Selecciona una sede en el plano comunal o filtra por área para revisar dirección exacta, teléfonos y líneas de Metro cercanas.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-1.5 p-1 bg-white hc-card rounded-lg border border-[#DDE3EA]"
            role="tablist"
            aria-label="Filtrar dependencias municipales"
          >
            {filterTabs.map((tab) => {
              const active = filterType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilterType(tab.id);
                    const match =
                      tab.id === 'all'
                        ? DEPENDENCIES_DATA[0]
                        : DEPENDENCIES_DATA.find((d) => d.type === tab.id);
                    if (match) setSelectedId(match.id);
                  }}
                  className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#662D91] text-white hc-btn-primary'
                      : 'text-[#4A5568] hc-muted hover:text-[#662D91] hover:bg-[#F4F6F9]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Mapa Esquemático Interactivo de Conchalí */}
          <div className="lg:col-span-7 bg-white hc-card rounded-xl border border-[#DDE3EA] p-4 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#DDE3EA]">
              <div>
                <h3 className="font-display font-bold text-base text-[#662D91] hc-text">
                  Plano Comunal de Conchalí — Ejes Principales
                </h3>
                <p className="text-xs text-[#4A5568] hc-muted">
                  Haz clic en un marcador numerado para ver los detalles de la sede
                </p>
              </div>
              <span className="text-xs font-mono-tabular font-semibold text-[#662D91] hc-text">
                Región Metropolitana
              </span>
            </div>

            <div className="relative w-full aspect-[16/10] bg-[#F2ECF6] rounded-lg border border-[#CBD5E1] overflow-hidden">
              {/* Plano vial vectorial realista de ejes de Conchalí */}
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full"
                role="img"
                aria-label="Mapa esquemático de dependencias municipales de Conchalí"
              >
                <rect width="800" height="500" fill="#F5F3FF" />
                {/* Parques / áreas verdes referenciales */}
                <rect x="40" y="40" width="120" height="75" rx="8" fill="#D5EAD9" />
                <rect x="610" y="95" width="140" height="90" rx="8" fill="#D5EAD9" />
                <rect x="190" y="340" width="110" height="70" rx="8" fill="#D5EAD9" />

                {/* Cuadrícula urbana suave */}
                <g stroke="#DCE5EE" strokeWidth="1.5">
                  <line x1="0" y1="120" x2="800" y2="120" />
                  <line x1="0" y1="215" x2="800" y2="215" />
                  <line x1="0" y1="305" x2="800" y2="305" />
                  <line x1="0" y1="400" x2="800" y2="400" />
                  <line x1="160" y1="0" x2="160" y2="500" />
                  <line x1="290" y1="0" x2="290" y2="500" />
                  <line x1="520" y1="0" x2="520" y2="500" />
                  <line x1="670" y1="0" x2="670" y2="500" />
                </g>

                {/* Autopista Américo Vespucio Norte */}
                <path d="M 0 65 L 800 50" stroke="#94A3B8" strokeWidth="10" />
                <path d="M 0 65 L 800 50" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 6" />
                <text x="24" y="46" fill="#334155" fontSize="12" fontWeight="700">
                  Av. Américo Vespucio Norte
                </text>

                {/* Eje Av. Independencia */}
                <path d="M 380 0 L 380 500" stroke="#662D91" strokeOpacity="0.22" strokeWidth="14" />
                <text
                  x="394"
                  y="475"
                  fill="#662D91"
                  fontSize="13"
                  fontWeight="700"
                >
                  Av. Independencia (Eje Metro L3)
                </text>

                {/* Eje Av. Dorsal */}
                <path d="M 0 285 L 800 285" stroke="#7A48A0" strokeOpacity="0.24" strokeWidth="12" />
                <text x="24" y="272" fill="#662D91" fontSize="13" fontWeight="700">
                  Av. Dorsal
                </text>

                {/* Eje Av. Diego Silva Henríquez / El Guanaco */}
                <path d="M 595 0 L 595 500" stroke="#94A3B8" strokeOpacity="0.45" strokeWidth="8" />
                <text x="606" y="455" fill="#334155" fontSize="12" fontWeight="600">
                  Av. Diego Silva Henríquez
                </text>

                {/* Calle Sagitario */}
                <path d="M 140 330 L 380 330" stroke="#7A48A0" strokeOpacity="0.25" strokeWidth="7" />
                <text x="142" y="320" fill="#334155" fontSize="12" fontWeight="600">
                  Calle Sagitario
                </text>

                {/* Estaciones Metro Línea 3 */}
                {[
                  { x: 380, y: 120, label: 'M Los Libertadores' },
                  { x: 380, y: 230, label: 'M Conchalí' },
                  { x: 380, y: 365, label: 'M Vivaceta' },
                ].map((m) => (
                  <g key={m.label}>
                    <circle cx={m.x} cy={m.y} r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                    <text x={m.x + 12} y={m.y + 4} fill="#991B1B" fontSize="11" fontWeight="700">
                      {m.label}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Marcadores Interactivos sobre el plano */}
              {filtered.map((dep, idx) => {
                const isSelected = dep.id === selected.id;
                return (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => setSelectedId(dep.id)}
                    style={{
                      left: `${dep.mapCoords.x}%`,
                      top: `${dep.mapCoords.y}%`,
                    }}
                    aria-pressed={isSelected}
                    aria-label={`Seleccionar ${dep.shortName} en ${dep.address}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold text-xs transition-transform cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-[#237A3B] text-white scale-105 z-20 ring-2 ring-white'
                        : 'bg-[#662D91] text-white hover:bg-[#7A48A0] z-10'
                    }`}
                  >
                    <span className="font-mono-tabular font-bold">{idx + 1}.</span>
                    <span className="whitespace-nowrap">{dep.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Lista rápida inferior */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {DEPENDENCIES_DATA.map((dep, idx) => {
                const isSelected = dep.id === selected.id;
                return (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => {
                      setFilterType('all');
                      setSelectedId(dep.id);
                    }}
                    className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#662D91] bg-[#662D91]/5 text-[#662D91]'
                        : 'border-[#DDE3EA] hover:bg-[#F4F6F9] text-[#4A5568]'
                    }`}
                  >
                    <span className="block text-[11px] font-mono-tabular font-bold text-[#7A48A0]">
                      Sede 0{idx + 1}
                    </span>
                    <span className="block text-xs font-semibold truncate text-[#662D91] hc-text">
                      {dep.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha Detallada de la Dependencia Seleccionada */}
          <div className="lg:col-span-5 bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#7A48A0] mb-1">
                  Dependencia Municipal Seleccionada
                </p>
                <h3 className="font-display font-bold text-xl text-[#662D91] hc-text">
                  {selected.name}
                </h3>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#DDE3EA] text-[15px]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">Dirección exacta</p>
                    <p className="text-[#4A5568] hc-muted">{selected.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">Horario de atención</p>
                    <p className="text-[#4A5568] hc-muted">{selected.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">Teléfono de contacto</p>
                    <p className="text-[#4A5568] hc-muted font-mono-tabular">
                      {selected.phone}
                      {selected.emergencyPhone ? ` · Emergencias ${selected.emergencyPhone}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrainFront className="w-5 h-5 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">Acceso Transporte Público</p>
                    <p className="text-[#4A5568] hc-muted">{selected.metroAccess}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DDE3EA]">
                <p className="font-display font-bold text-sm text-[#662D91] hc-text mb-2">
                  Trámites y unidades en esta sede:
                </p>
                <ul className="space-y-1.5 text-sm text-[#4A5568] hc-muted">
                  {selected.services.map((srv) => (
                    <li key={srv} className="flex items-start gap-2">
                      <span className="text-[#237A3B] font-bold" aria-hidden="true">•</span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DDE3EA] flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selected.address + ', Chile'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg bg-[#662D91] hover:bg-[#4A2068] text-white font-semibold text-sm transition-colors hc-btn-primary"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                <span>Abrir ruta en Google Maps</span>
              </a>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('contacto-opir')}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-[#662D91] text-[#662D91] hc-text font-semibold text-sm hover:bg-[#F4F6F9] transition-colors cursor-pointer"
                >
                  Enviar consulta OPIR
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
