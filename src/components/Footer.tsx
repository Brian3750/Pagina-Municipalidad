import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { ExternalRedirectTarget, PageId } from '../types/portal';
import { MunicipalShield } from './MunicipalShield';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onRequestRedirect: (target: ExternalRedirectTarget) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestRedirect }) => {
  return (
    <footer className="bg-[#2A1252] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Identidad Institucional y Dirección Oficial */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MunicipalShield className="w-10 h-11 shrink-0" />
              <div>
                <p className="font-display font-bold text-lg leading-tight">
                  Ilustre Municipalidad de Conchalí
                </p>
                <p className="text-xs text-[#DDD6FE]">Región Metropolitana, Chile</p>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              Gestión municipal cercana, transparente y orientada a mejorar la calidad de vida de nuestras vecinas y vecinos.
            </p>

            <div className="space-y-2 text-sm text-white/85 pt-1">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C4B5FD] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Av. Independencia 3499, Conchalí, Región Metropolitana</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C4B5FD] shrink-0" aria-hidden="true" />
                <span>Lun a Vie · 08:30 a 14:00 hrs</span>
              </p>
              <p className="flex items-center gap-2 font-semibold text-white">
                <Phone className="w-4 h-4 text-[#C4B5FD] shrink-0" aria-hidden="true" />
                <span>Emergencias Seguridad Pública: 1425</span>
              </p>
            </div>
          </div>

          {/* Columna 2: Trámites y Servicios */}
          <div>
            <h3 className="font-display font-bold text-base text-white mb-4">
              Trámites y Atención Vecinal
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {[
                { label: 'Permisos de Circulación', page: 'tramites-circulacion' as PageId },
                { label: 'Licencias de Conducir', page: 'tramites-licencia' as PageId },
                { label: 'Derechos de Aseo Domiciliario', page: 'tramites-aseo' as PageId },
                { label: 'Patentes Comerciales y PYME', page: 'tramites-patentes' as PageId },
                { label: 'Oficina de Partes Digital (OPIR)', page: 'contacto-opir' as PageId },
                { label: 'Hora Veterinaria y Zoonosis', page: 'servicios-veterinaria' as PageId },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Transparencia Activa y Pasiva */}
          <div>
            <h3 className="font-display font-bold text-base text-white mb-4">
              Transparencia y Probidad
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('transparencia')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Transparencia Activa (Ley N° 20.285)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('transparencia')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Transparencia Pasiva (Solicitud de Información)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portal-lobby')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Portal de Lobby y Audiencias (Ley N° 20.730)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('denuncia-ley-karin')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Canal de Denuncia Ley Karin (Ley N° 21.643)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('municipio-cuenta-publica')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Cuenta Pública y Presupuesto Municipal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('municipio-plan-regulador')}
                  className="hover:text-[#DDD6FE] hover:underline text-left cursor-pointer"
                >
                  Plan Regulador Comunal (PRC)
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Canales Oficiales y Estándares */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-white mb-4">
              Canales Oficiales y Accesibilidad
            </h3>

            <div className="space-y-2.5 text-sm text-white/80">
              <p>Mesa Central: +56 2 2828 6000</p>
              <p>Correo OIRS: oirs@conchali.cl</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/municonchali/' },
                { name: 'Facebook', url: 'https://www.facebook.com/municonchali/' },
                { name: 'YouTube', url: 'https://www.youtube.com/@municonchali' },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={() =>
                    onRequestRedirect({
                      title: `Red Social Oficial — ${social.name}`,
                      gatewayName: 'Canal Institucional Ilustre Municipalidad de Conchalí',
                      url: social.url,
                      description: `Serás redirigido al perfil oficial verificado de la Municipalidad de Conchalí en ${social.name}.`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{social.name}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#DDD6FE]">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Estándar Accesibilidad Digital WCAG 2.1 AA</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('arquitectura-wordpress')}
                className="text-xs text-white/75 hover:text-white underline cursor-pointer text-left"
              >
                Ficha Técnica WordPress (Kadence / FSE / Core Web Vitals)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            © 2026 Ilustre Municipalidad de Conchalí · Av. Independencia 3499, Santiago, Chile. Todos los derechos reservados.
          </p>
          <p>
            Portal Ciudadano optimizado para lectura en dispositivos móviles y computadores.
          </p>
        </div>
      </div>
    </footer>
  );
};
