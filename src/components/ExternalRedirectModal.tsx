import React, { useEffect } from 'react';
import { ExternalLink, ShieldCheck, X } from 'lucide-react';
import { ExternalRedirectTarget } from '../types/portal';

interface ExternalRedirectModalProps {
  target: ExternalRedirectTarget | null;
  onClose: () => void;
}

export const ExternalRedirectModal: React.FC<ExternalRedirectModalProps> = ({
  target,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (target) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [target, onClose]);

  if (!target) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1252]/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="redirect-modal-title"
    >
      <div className="bg-white hc-card w-full max-w-lg rounded-xl border border-[#DDE3EA] shadow-2xl overflow-hidden">
        <div className="bg-[#3B1E6D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#DDD6FE]" aria-hidden="true" />
            <h2 id="redirect-modal-title" className="font-display font-bold text-lg">
              Aviso de Redirección a Pasarela Oficial
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar aviso"
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-[#6D28D9]">
              {target.gatewayName}
            </p>
            <h3 className="font-display font-bold text-xl text-[#3B1E6D] hc-text mt-1">
              {target.title}
            </h3>
          </div>

          <p className="text-[15px] text-[#4A5568] hc-muted leading-relaxed">
            {target.description}
          </p>

          <div className="p-4 rounded-lg bg-[#F4F6F9] hc-surface border border-[#DDE3EA] text-sm text-[#1A2332] hc-text space-y-1.5">
            <p className="font-semibold">Recomendación de seguridad municipal:</p>
            <p className="text-[#4A5568] hc-muted">
              Estás saliendo del portal informativo hacia la pasarela segura de pagos o sistema externo. La ventana se abrirá en una pestaña nueva y verificará tu conexión cifrada (HTTPS).
            </p>
            <p className="font-mono-tabular text-xs text-[#3B1E6D] hc-link break-all pt-1">
              Destino: {target.url}
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#DDE3EA] text-[#1A2332] hc-text font-semibold text-[15px] hover:bg-[#F4F6F9] transition-colors cursor-pointer"
            >
              Cancelar y volver
            </button>
            <a
              href={target.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E8449] hover:bg-[#176B3A] text-white font-semibold text-[15px] transition-colors hc-btn-primary"
            >
              <span>Continuar al sitio oficial</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
