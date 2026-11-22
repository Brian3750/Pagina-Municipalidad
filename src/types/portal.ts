export type PageId =
  | 'inicio'
  | 'municipio-alcaldia'
  | 'municipio-concejo'
  | 'municipio-organigrama'
  | 'municipio-dependencias'
  | 'municipio-cuenta-publica'
  | 'municipio-plan-regulador'
  | 'tramites-circulacion'
  | 'tramites-patentes'
  | 'tramites-aseo'
  | 'tramites-tag'
  | 'tramites-licencia'
  | 'tramites-residencia'
  | 'tramites-todos'
  | 'servicios-dideco'
  | 'servicios-rsh'
  | 'servicios-omil'
  | 'servicios-veterinaria'
  | 'servicios-adulto-mayor'
  | 'servicios-salud-educacion'
  | 'cultura-biblioteca'
  | 'cultura-leganes'
  | 'cultura-polideportivo'
  | 'contacto-opir'
  | 'denuncia-ley-karin'
  | 'transparencia'
  | 'portal-lobby'
  | 'arquitectura-wordpress';

export interface TramiteItem {
  id: string;
  title: string;
  shortDesc: string;
  category: 'Pagos y Patentes' | 'Tránsito' | 'Social y Salud' | 'Atención Ciudadana';
  mode: 'En línea' | 'Presencial / Hora' | 'Mixto';
  iconName:
    | 'Car'
    | 'IdCard'
    | 'Trash2'
    | 'Store'
    | 'Users'
    | 'HeartPulse'
    | 'FileText'
    | 'ShieldAlert'
    | 'Home'
    | 'Receipt';
  featured: boolean;
  keywords: string[];
  targetPage: PageId;
  externalPaymentUrl?: string;
  externalGatewayName?: string;
  actionLabel: string;
  isPrimaryOnlineAction?: boolean;
  requirements: string[];
  cost: string;
  processingTime: string;
  officeLocation: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Obras' | 'Comunidad' | 'Cultura' | 'Salud';
  date: string;
  author: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  paragraphs: string[];
  locationTag: string;
}

export interface WorkshopEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  address: string;
  category: string;
  spotsAvailable: number;
  instructor: string;
  description: string;
  requirements: string;
}

export interface MunicipalDependency {
  id: string;
  name: string;
  shortName: string;
  address: string;
  hours: string;
  phone: string;
  emergencyPhone?: string;
  services: string[];
  metroAccess: string;
  mapCoords: { x: number; y: number };
  type: 'consistorial' | 'transito' | 'social' | 'seguridad' | 'deporte';
}

export interface ExternalRedirectTarget {
  title: string;
  gatewayName: string;
  url: string;
  description: string;
}
