/**
 * Utilidades de formateo y validación de RUT chileno (Módulo 11)
 * y teléfonos chilenos para formularios municipales WCAG 2.1 AA.
 */

export function limpiarRut(valor: string): string {
  return valor.replace(/[^0-9kK]/g, '').toUpperCase();
}

export function formatearRut(valor: string): string {
  const limpio = limpiarRut(valor);
  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpoFormateado}-${dv}`;
}

export function validarRut(rutInput: string): boolean {
  const limpio = limpiarRut(rutInput);
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  // Rechazar secuencias repetidas evidentes (ej. 11111111-1)
  if (/^(\d)\1+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado = '';
  if (resto === 11) dvEsperado = '0';
  else if (resto === 10) dvEsperado = 'K';
  else dvEsperado = String(resto);

  return dvIngresado === dvEsperado;
}

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function validarTelefonoChileno(tel: string): boolean {
  const soloDigitos = tel.replace(/\D/g, '');
  return soloDigitos.length >= 8 && soloDigitos.length <= 11;
}

export function generarFolio(prefijo: 'OPIR' | 'VET' | 'TALLER' | 'KARIN'): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const fecha = new Date();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  return `CONCHALI-${prefijo}-2026${mes}-${randomNum}`;
}
