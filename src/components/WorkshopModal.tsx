import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, User, X } from 'lucide-react';
import { WorkshopEvent } from '../types/portal';
import {
  formatearRut,
  generarFolio,
  validarEmail,
  validarRut,
  validarTelefonoChileno,
} from '../utils/rut';

interface WorkshopModalProps {
  workshop: WorkshopEvent | null;
  onClose: () => void;
}

export const WorkshopModal: React.FC<WorkshopModalProps> = ({ workshop, onClose }) => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [folio, setFolio] = useState<string | null>(null);

  if (!workshop) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!validarRut(rut)) errs.rut = 'Ingresa un RUT chileno válido (ej. 15.234.567-8).';
    if (nombre.trim().length < 4) errs.nombre = 'Ingresa tu nombre completo.';
    if (!validarEmail(correo)) errs.correo = 'Ingresa un correo electrónico válido.';
    if (!validarTelefonoChileno(telefono)) errs.telefono = 'Ingresa un teléfono válido (ej. +56 9 8765 4321).';

    setErrores(errs);
    if (Object.keys(errs).length === 0) {
      setFolio(generarFolio('TALLER'));
    }
  };

  const resetAndClose = () => {
    setFolio(null);
    setErrores({});
    setRut('');
    setNombre('');
    setCorreo('');
    setTelefono('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A2068]/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workshop-modal-title"
    >
      <div className="bg-white hc-card w-full max-w-xl rounded-xl border border-[#DDE3EA] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-[#662D91] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#E4D6ED]">{workshop.category}</p>
            <h2 id="workshop-modal-title" className="font-display font-bold text-lg">
              {workshop.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Cerrar ficha de taller"
            className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {folio ? (
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#237A3B]/10 border border-[#237A3B]/30">
                <CheckCircle2 className="w-6 h-6 text-[#237A3B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display font-bold text-lg text-[#662D91] hc-text">
                    Inscripción confirmada correctamente
                  </h3>
                  <p className="text-[15px] text-[#4A5568] hc-muted mt-1">
                    Tu cupo ha sido reservado para <strong>{workshop.title}</strong> en {workshop.venue}.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F4F6F9] hc-surface border border-[#DDE3EA] space-y-2 text-[15px]">
                <div className="flex justify-between gap-2">
                  <span className="text-[#4A5568] hc-muted">Código de inscripción:</span>
                  <span className="font-mono-tabular font-bold text-[#662D91] hc-text">{folio}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#4A5568] hc-muted">Vecino/a inscrito:</span>
                  <span className="font-semibold text-[#1A2332] hc-text">{nombre} ({rut})</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#4A5568] hc-muted">Fecha y hora:</span>
                  <span className="font-semibold text-[#1A2332] hc-text">
                    {workshop.day} {workshop.month} · {workshop.time}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 rounded-lg bg-[#662D91] text-white font-semibold hover:bg-[#4A2068] transition-colors cursor-pointer"
              >
                Volver a la Agenda Municipal
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-[#F4F6F9] hc-surface border border-[#DDE3EA] text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">
                      {workshop.day} {workshop.month} · {workshop.time}
                    </p>
                    <p className="text-[#4A5568] hc-muted">Cupos disponibles: {workshop.spotsAvailable}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7A48A0] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#662D91] hc-text">{workshop.venue}</p>
                    <p className="text-[#4A5568] hc-muted">{workshop.address}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 pt-1 border-t border-[#DDE3EA]">
                  <User className="w-4 h-4 text-[#7A48A0] shrink-0" aria-hidden="true" />
                  <span className="text-[#4A5568] hc-muted">
                    {workshop.instructor} · {workshop.requirements}
                  </span>
                </div>
              </div>

              <p className="text-[15px] text-[#1A2332] hc-text leading-relaxed">
                {workshop.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#DDE3EA]" noValidate>
                <h3 className="font-display font-bold text-base text-[#662D91] hc-text">
                  Formulario de inscripción gratuita
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="taller-rut" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
                      RUT chileno *
                    </label>
                    <input
                      id="taller-rut"
                      type="text"
                      value={rut}
                      onChange={(e) => setRut(formatearRut(e.target.value))}
                      placeholder="12.345.678-9"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base focus:border-[#7A48A0] bg-white text-[#1A2332]"
                    />
                    {errores.rut && <p className="text-sm text-red-700 mt-1">{errores.rut}</p>}
                  </div>

                  <div>
                    <label htmlFor="taller-tel" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
                      Teléfono de contacto *
                    </label>
                    <input
                      id="taller-tel"
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+56 9 8765 4321"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base focus:border-[#7A48A0] bg-white text-[#1A2332]"
                    />
                    {errores.telefono && <p className="text-sm text-red-700 mt-1">{errores.telefono}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="taller-nombre" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
                    Nombre completo *
                  </label>
                  <input
                    id="taller-nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. María Eugenia Soto Paredes"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base focus:border-[#7A48A0] bg-white text-[#1A2332]"
                  />
                  {errores.nombre && <p className="text-sm text-red-700 mt-1">{errores.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="taller-correo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    id="taller-correo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="nombre@correo.cl"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base focus:border-[#7A48A0] bg-white text-[#1A2332]"
                  />
                  {errores.correo && <p className="text-sm text-red-700 mt-1">{errores.correo}</p>}
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-5 py-2.5 rounded-lg border border-[#DDE3EA] font-semibold text-[15px] hover:bg-[#F4F6F9] cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-[15px] cursor-pointer hc-btn-primary"
                  >
                    Confirmar inscripción gratuita
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
