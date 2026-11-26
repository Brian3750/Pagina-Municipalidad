import React, { useState } from 'react';
import {
  CheckCircle2,
  FileUp,
  AlertCircle,
  Printer,
  ShieldCheck,
  HeartPulse,
  FileText,
} from 'lucide-react';
import {
  formatearRut,
  generarFolio,
  validarEmail,
  validarRut,
  validarTelefonoChileno,
} from '../utils/rut';

interface ReceiptData {
  folio: string;
  fecha: string;
  tipo: string;
  solicitante: string;
  rut: string;
  correo: string;
  detalle: string;
  archivo?: string;
}

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

function validateAttachment(file: File | null): string | null {
  if (!file) return null;
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Formato no permitido. Adjunta únicamente archivos PDF, JPG o PNG.';
  }
  if (file.size > MAX_FILE_BYTES) {
    return 'El archivo supera el máximo permitido de 5 MB.';
  }
  return null;
}

export const OpirForm: React.FC = () => {
  const [tipoIngreso, setTipoIngreso] = useState('Solicitud Formal');
  const [unidadDestino, setUnidadDestino] = useState('Secretaría Municipal / Oficina de Partes');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [motivo, setMotivo] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const err = validateAttachment(file);
    if (err) {
      setErrores((prev) => ({ ...prev, archivo: err }));
      setArchivo(null);
    } else {
      setErrores((prev) => {
        const next = { ...prev };
        delete next.archivo;
        return next;
      });
      setArchivo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!validarRut(rut)) {
      nextErrors.rut = 'Ingresa un RUT chileno válido con dígito verificador (ej. 14.567.890-K).';
    }
    if (nombre.trim().length < 4) {
      nextErrors.nombre = 'Ingresa tu nombre y apellido completo.';
    }
    if (!validarEmail(correo)) {
      nextErrors.correo = 'Ingresa un correo electrónico válido.';
    }
    if (!validarTelefonoChileno(telefono)) {
      nextErrors.telefono = 'Ingresa un teléfono de contacto válido (+56 9 XXXX XXXX).';
    }
    if (motivo.trim().length < 15) {
      nextErrors.motivo = 'Describe el motivo de tu solicitud o reclamo (mínimo 15 caracteres).';
    }
    const fileErr = validateAttachment(archivo);
    if (fileErr) nextErrors.archivo = fileErr;

    setErrores(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      const now = new Date().toLocaleString('es-CL', {
        dateStyle: 'long',
        timeStyle: 'short',
      });
      setReceipt({
        folio: generarFolio('OPIR'),
        fecha: now,
        tipo: `${tipoIngreso} · ${unidadDestino}`,
        solicitante: nombre.trim(),
        rut,
        correo: correo.trim(),
        detalle: motivo.trim(),
        archivo: archivo ? archivo.name : undefined,
      });
    }
  };

  const resetForm = () => {
    setReceipt(null);
    setRut('');
    setNombre('');
    setCorreo('');
    setTelefono('');
    setDireccion('');
    setMotivo('');
    setArchivo(null);
    setErrores({});
  };

  if (receipt) {
    return (
      <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-4 p-5 rounded-xl bg-[#237A3B]/10 border border-[#237A3B]/30">
          <CheckCircle2 className="w-7 h-7 text-[#237A3B] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-xl text-[#662D91] hc-text">
              Ingreso registrado en Oficina de Partes Digital (OPIR)
            </h3>
            <p className="text-[15px] text-[#4A5568] hc-muted mt-1">
              Hemos enviado copia de este comprobante a <strong>{receipt.correo}</strong>. El plazo legal de respuesta formal es de hasta 10 días hábiles.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#F4F6F9] hc-surface border border-[#DDE3EA] text-[15px]">
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Número de Folio</dt>
            <dd className="font-mono-tabular font-bold text-lg text-[#662D91] hc-text mt-0.5">
              {receipt.folio}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Fecha y Hora de Ingreso</dt>
            <dd className="font-semibold text-[#1A2332] hc-text mt-0.5">{receipt.fecha}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Solicitante</dt>
            <dd className="font-semibold text-[#1A2332] hc-text mt-0.5">
              {receipt.solicitante} ({receipt.rut})
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Clasificación</dt>
            <dd className="font-semibold text-[#1A2332] hc-text mt-0.5">{receipt.tipo}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Resumen ingresado</dt>
            <dd className="text-[#1A2332] hc-text mt-1">{receipt.detalle}</dd>
          </div>
          {receipt.archivo && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Documento adjunto</dt>
              <dd className="font-mono-tabular text-sm text-[#662D91] hc-text mt-0.5">
                {receipt.archivo}
              </dd>
            </div>
          )}
        </dl>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#662D91] text-[#662D91] hc-text font-semibold text-[15px] hover:bg-[#F4F6F9] cursor-pointer"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Imprimir comprobante</span>
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-2.5 rounded-lg bg-[#662D91] text-white font-semibold text-[15px] hover:bg-[#4A2068] cursor-pointer hc-btn-primary"
          >
            Ingresar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center gap-3 pb-4 border-b border-[#DDE3EA]">
        <div className="p-2.5 rounded-lg bg-[#662D91]/10 text-[#662D91]">
          <FileText className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-[#662D91] hc-text">
            Formulario Oficina de Partes Digital (OPIR)
          </h3>
          <p className="text-sm text-[#4A5568] hc-muted">
            Todos los campos marcados con asterisco (*) son obligatorios y cuentan con validación ciudadana.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="opir-tipo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Tipo de requerimiento *
          </label>
          <select
            id="opir-tipo"
            value={tipoIngreso}
            onChange={(e) => setTipoIngreso(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Solicitud Formal">Solicitud Formal / Carta a Alcaldía</option>
            <option value="Reclamo">Reclamo de Servicio Municipal</option>
            <option value="Sugerencia">Sugerencia o Propuesta Vecinal</option>
            <option value="Felicitación">Felicitación a Funcionario o Unidad</option>
          </select>
        </div>

        <div>
          <label htmlFor="opir-unidad" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Dirección o Unidad de destino *
          </label>
          <select
            id="opir-unidad"
            value={unidadDestino}
            onChange={(e) => setUnidadDestino(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Secretaría Municipal / Oficina de Partes">Secretaría Municipal / Oficina de Partes</option>
            <option value="Dirección de Obras Municipales (DOM)">Dirección de Obras Municipales (DOM)</option>
            <option value="Dirección de Tránsito y Transporte">Dirección de Tránsito y Transporte</option>
            <option value="DIDECO — Desarrollo Comunitario">DIDECO — Desarrollo Comunitario</option>
            <option value="Medio Ambiente, Aseo y Ornato">Medio Ambiente, Aseo y Ornato</option>
            <option value="Dirección de Seguridad Pública">Dirección de Seguridad Pública</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="opir-rut" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            RUT chileno *
          </label>
          <input
            id="opir-rut"
            type="text"
            value={rut}
            onChange={(e) => setRut(formatearRut(e.target.value))}
            placeholder="12.345.678-9"
            aria-invalid={Boolean(errores.rut)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.rut && (
            <p className="flex items-center gap-1.5 text-sm text-red-700 mt-1">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{errores.rut}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="opir-nombre" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Nombre completo *
          </label>
          <input
            id="opir-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Claudio Andrés Rojas Muñoz"
            aria-invalid={Boolean(errores.nombre)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.nombre && (
            <p className="flex items-center gap-1.5 text-sm text-red-700 mt-1">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{errores.nombre}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="opir-correo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Correo electrónico *
          </label>
          <input
            id="opir-correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="vecino@correo.cl"
            aria-invalid={Boolean(errores.correo)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.correo && <p className="text-sm text-red-700 mt-1">{errores.correo}</p>}
        </div>

        <div>
          <label htmlFor="opir-tel" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Teléfono móvil o fijo *
          </label>
          <input
            id="opir-tel"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+56 9 8765 4321"
            aria-invalid={Boolean(errores.telefono)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.telefono && <p className="text-sm text-red-700 mt-1">{errores.telefono}</p>}
        </div>

        <div>
          <label htmlFor="opir-dir" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Dirección en Conchalí (opcional)
          </label>
          <input
            id="opir-dir"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ej. Pasaje Las Acacias 1420"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="opir-motivo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
          Motivo y detalle de la solicitud *
        </label>
        <textarea
          id="opir-motivo"
          rows={4}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Describe claramente tu requerimiento, dirección involucrada o antecedente relevante..."
          aria-invalid={Boolean(errores.motivo)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
        />
        {errores.motivo && <p className="text-sm text-red-700 mt-1">{errores.motivo}</p>}
      </div>

      <div>
        <label htmlFor="opir-archivo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
          Adjuntar documento o fotografía de respaldo (PDF o JPG, máx. 5 MB)
        </label>
        <label
          htmlFor="opir-archivo"
          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-[#7A48A0] bg-[#F4F6F9] hover:bg-[#F2ECF6] cursor-pointer transition-colors"
        >
          <FileUp className="w-5 h-5 text-[#7A48A0] shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium text-[#662D91]">
            {archivo ? `Archivo seleccionado: ${archivo.name}` : 'Seleccionar archivo PDF, JPG o PNG desde tu equipo o celular'}
          </span>
          <input
            id="opir-archivo"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        {errores.archivo && <p className="text-sm text-red-700 mt-1">{errores.archivo}</p>}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#4A5568] hc-muted">
          Tus datos personales son resguardados conforme a la Ley N° 19.628 sobre Protección de la Vida Privada.
        </p>
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer hc-btn-primary"
        >
          Enviar a Oficina de Partes Digital
        </button>
      </div>
    </form>
  );
};

export const VeterinariaForm: React.FC = () => {
  const [servicio, setServicio] = useState('Esterilización Canina / Felina');
  const [especie, setEspecie] = useState('Perro');
  const [nombreMascota, setNombreMascota] = useState('');
  const [sede, setSede] = useState('Clínica Veterinaria Sagitario 1655');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivo, setMotivo] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const err = validateAttachment(file);
    if (err) {
      setErrores((prev) => ({ ...prev, archivo: err }));
      setArchivo(null);
    } else {
      setErrores((prev) => {
        const next = { ...prev };
        delete next.archivo;
        return next;
      });
      setArchivo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!validarRut(rut)) nextErrors.rut = 'Ingresa un RUT chileno válido.';
    if (nombre.trim().length < 4) nextErrors.nombre = 'Ingresa el nombre del tutor responsable.';
    if (nombreMascota.trim().length < 2) nextErrors.nombreMascota = 'Ingresa el nombre de tu mascota.';
    if (!validarEmail(correo)) nextErrors.correo = 'Ingresa un correo electrónico válido.';
    if (!validarTelefonoChileno(telefono)) nextErrors.telefono = 'Ingresa un teléfono válido.';
    if (motivo.trim().length < 8) nextErrors.motivo = 'Indica observaciones o disponibilidad horaria.';
    const fileErr = validateAttachment(archivo);
    if (fileErr) nextErrors.archivo = fileErr;

    setErrores(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setReceipt({
        folio: generarFolio('VET'),
        fecha: new Date().toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' }),
        tipo: `${servicio} · ${especie} "${nombreMascota}"`,
        solicitante: nombre.trim(),
        rut,
        correo: correo.trim(),
        detalle: `Sede: ${sede}. Observación: ${motivo.trim()}`,
        archivo: archivo?.name,
      });
    }
  };

  if (receipt) {
    return (
      <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-4 p-5 rounded-xl bg-[#237A3B]/10 border border-[#237A3B]/30">
          <CheckCircle2 className="w-7 h-7 text-[#237A3B] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-xl text-[#662D91] hc-text">
              Solicitud de Hora Veterinaria recibida
            </h3>
            <p className="text-[15px] text-[#4A5568] hc-muted mt-1">
              El equipo de Zoonosis y Tenencia Responsable confirmará día y bloque horario a tu correo <strong>{receipt.correo}</strong> en un máximo de 48 horas hábiles.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#F4F6F9] hc-surface border border-[#DDE3EA] text-[15px]">
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Folio de Atención</dt>
            <dd className="font-mono-tabular font-bold text-lg text-[#662D91] hc-text">{receipt.folio}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Tutor Responsable</dt>
            <dd className="font-semibold text-[#1A2332] hc-text">
              {receipt.solicitante} ({receipt.rut})
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Prestación y Mascota</dt>
            <dd className="font-semibold text-[#1A2332] hc-text">{receipt.tipo}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold text-[#4A5568] hc-muted">Detalle</dt>
            <dd className="text-[#1A2332] hc-text">{receipt.detalle}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => {
            setReceipt(null);
            setNombreMascota('');
            setMotivo('');
          }}
          className="px-5 py-2.5 rounded-lg bg-[#662D91] text-white font-semibold hover:bg-[#4A2068] cursor-pointer hc-btn-primary"
        >
          Solicitar otra hora veterinaria
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center gap-3 pb-4 border-b border-[#DDE3EA]">
        <div className="p-2.5 rounded-lg bg-[#237A3B]/10 text-[#237A3B]">
          <HeartPulse className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-[#662D91] hc-text">
            Solicitud de Hora Veterinaria y Zoonosis
          </h3>
          <p className="text-sm text-[#4A5568] hc-muted">
            Atención gratuita o copago social para vecinos residentes de Conchalí.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vet-servicio" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Prestación solicitada *
          </label>
          <select
            id="vet-servicio"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Esterilización Canina / Felina">Esterilización Canina / Felina</option>
            <option value="Vacunación Antirrábica y Séxtuple/Triple">Vacunación Antirrábica y Desparasitación</option>
            <option value="Implantación de Microchip (Ley 21.020)">Implantación de Microchip (Tenencia Responsable)</option>
            <option value="Consulta Veterinaria Primaria">Consulta Veterinaria Primaria</option>
          </select>
        </div>

        <div>
          <label htmlFor="vet-sede" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Sede de atención *
          </label>
          <select
            id="vet-sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Clínica Veterinaria Sagitario 1655">Clínica Veterinaria · Calle Sagitario 1655</option>
            <option value="Operativo Móvil en Junta de Vecinos">Operativo Móvil en mi Junta de Vecinos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vet-especie" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Especie *
          </label>
          <select
            id="vet-especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Perro">Canino (Perro / Perra)</option>
            <option value="Gato">Felino (Gato / Gata)</option>
          </select>
        </div>

        <div>
          <label htmlFor="vet-mascota" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Nombre de la mascota *
          </label>
          <input
            id="vet-mascota"
            type="text"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
            placeholder="Ej. Luna (2 años)"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.nombreMascota && <p className="text-sm text-red-700 mt-1">{errores.nombreMascota}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vet-rut" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            RUT del tutor responsable *
          </label>
          <input
            id="vet-rut"
            type="text"
            value={rut}
            onChange={(e) => setRut(formatearRut(e.target.value))}
            placeholder="12.345.678-9"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.rut && <p className="text-sm text-red-700 mt-1">{errores.rut}</p>}
        </div>

        <div>
          <label htmlFor="vet-nombre" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Nombre completo del tutor *
          </label>
          <input
            id="vet-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Francisca Alejandra Díaz Vera"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.nombre && <p className="text-sm text-red-700 mt-1">{errores.nombre}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vet-correo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Correo electrónico *
          </label>
          <input
            id="vet-correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tutor@correo.cl"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.correo && <p className="text-sm text-red-700 mt-1">{errores.correo}</p>}
        </div>

        <div>
          <label htmlFor="vet-tel" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
            Teléfono de contacto *
          </label>
          <input
            id="vet-tel"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+56 9 8765 4321"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.telefono && <p className="text-sm text-red-700 mt-1">{errores.telefono}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="vet-motivo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
          Motivo / Antecedentes clínicos o preferencia de horario *
        </label>
        <textarea
          id="vet-motivo"
          rows={3}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Indica edad aproximada, peso o disponibilidad en horario mañana (09:00 a 13:30 hrs)..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
        />
        {errores.motivo && <p className="text-sm text-red-700 mt-1">{errores.motivo}</p>}
      </div>

      <div>
        <label htmlFor="vet-archivo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1.5">
          Adjuntar comprobante de domicilio o cartilla sanitaria (PDF / JPG, máx. 5 MB)
        </label>
        <label
          htmlFor="vet-archivo"
          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-[#237A3B] bg-[#F4F6F9] hover:bg-[#EAF5EE] cursor-pointer transition-colors"
        >
          <FileUp className="w-5 h-5 text-[#237A3B] shrink-0" aria-hidden="true" />
          <span className="text-sm font-medium text-[#662D91]">
            {archivo ? `Adjunto: ${archivo.name}` : 'Adjuntar cuenta de luz/agua o certificado de residencia'}
          </span>
          <input
            id="vet-archivo"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        {errores.archivo && <p className="text-sm text-red-700 mt-1">{errores.archivo}</p>}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-[#237A3B] hover:bg-[#195F31] text-white font-semibold text-base transition-colors cursor-pointer hc-btn-primary"
        >
          Solicitar Hora Veterinaria
        </button>
      </div>
    </form>
  );
};

export const LeyKarinForm: React.FC = () => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoHecho, setTipoHecho] = useState('Acoso Laboral');
  const [relato, setRelato] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [folio, setFolio] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!validarRut(rut)) next.rut = 'Ingresa un RUT chileno válido.';
    if (nombre.trim().length < 4) next.nombre = 'Ingresa tu nombre completo.';
    if (!validarEmail(correo)) next.correo = 'Ingresa un correo de notificación reservado.';
    if (!validarTelefonoChileno(telefono)) next.telefono = 'Ingresa un teléfono válido.';
    if (relato.trim().length < 20) next.relato = 'Entrega un relato preliminar de los hechos (mínimo 20 caracteres).';

    setErrores(next);
    if (Object.keys(next).length === 0) {
      setFolio(generarFolio('KARIN'));
    }
  };

  if (folio) {
    return (
      <div className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#662D91]/8 border border-[#662D91]/20">
          <ShieldCheck className="w-6 h-6 text-[#662D91] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display font-bold text-lg text-[#662D91] hc-text">
              Denuncia registrada bajo Protocolo Ley N° 21.643 (Ley Karin)
            </h3>
            <p className="text-[15px] text-[#4A5568] hc-muted mt-1">
              Folio reservado: <strong className="font-mono-tabular text-[#662D91]">{folio}</strong>. El Comité de Integridad y Contraloría Interna activará medidas de resguardo dentro de 3 días hábiles.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setFolio(null);
            setRelato('');
          }}
          className="px-5 py-2.5 rounded-lg bg-[#662D91] text-white font-semibold cursor-pointer"
        >
          Cerrar comprobante
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white hc-card rounded-xl border border-[#DDE3EA] p-6 sm:p-8 space-y-4"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="karin-rut" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
            RUT denunciante *
          </label>
          <input
            id="karin-rut"
            type="text"
            value={rut}
            onChange={(e) => setRut(formatearRut(e.target.value))}
            placeholder="12.345.678-9"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.rut && <p className="text-sm text-red-700 mt-1">{errores.rut}</p>}
        </div>

        <div>
          <label htmlFor="karin-tipo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
            Materia de la denuncia *
          </label>
          <select
            id="karin-tipo"
            value={tipoHecho}
            onChange={(e) => setTipoHecho(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          >
            <option value="Acoso Laboral">Acoso Laboral</option>
            <option value="Acoso Sexual">Acoso Sexual</option>
            <option value="Violencia en el Trabajo">Violencia en el Trabajo ejercida por terceros</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="karin-nombre" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
            Nombre completo *
          </label>
          <input
            id="karin-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.nombre && <p className="text-sm text-red-700 mt-1">{errores.nombre}</p>}
        </div>
        <div>
          <label htmlFor="karin-correo" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
            Correo reservado *
          </label>
          <input
            id="karin-correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.correo && <p className="text-sm text-red-700 mt-1">{errores.correo}</p>}
        </div>
        <div>
          <label htmlFor="karin-tel" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
            Teléfono *
          </label>
          <input
            id="karin-tel"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
          />
          {errores.telefono && <p className="text-sm text-red-700 mt-1">{errores.telefono}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="karin-relato" className="block text-sm font-semibold text-[#1A2332] hc-text mb-1">
          Relato reservado de los hechos *
        </label>
        <textarea
          id="karin-relato"
          rows={4}
          value={relato}
          onChange={(e) => setRelato(e.target.value)}
          placeholder="Indica fechas aproximadas, unidad municipal y descripción de los hechos..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-base bg-white text-[#1A2332]"
        />
        {errores.relato && <p className="text-sm text-red-700 mt-1">{errores.relato}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-[#662D91] hover:bg-[#4A2068] text-white font-semibold cursor-pointer hc-btn-primary"
        >
          Enviar Denuncia Confidencial
        </button>
      </div>
    </form>
  );
};
