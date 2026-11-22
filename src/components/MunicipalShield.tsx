import React from 'react';
import {
  Car,
  IdCard,
  Trash2,
  Store,
  Users,
  HeartPulse,
  FileText,
  ShieldAlert,
  Home,
  Receipt,
} from 'lucide-react';
import { TramiteItem } from '../types/portal';

export const MunicipalShield: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 2L44 9.5V25.5C44 38.2 35.4 47.7 24 52C12.6 47.7 4 38.2 4 25.5V9.5L24 2Z"
      fill="#3B1E6D"
      stroke="#6D28D9"
      strokeWidth="2"
    />
    <path
      d="M24 6.5L39.5 12.4V25.2C39.5 35.4 32.8 43.2 24 47C15.2 43.2 8.5 35.4 8.5 25.2V12.4L24 6.5Z"
      fill="#FFFFFF"
      fillOpacity="0.1"
    />
    {/* Cordillera y valle estilizados */}
    <path
      d="M10.5 30L17.5 19.5L23.5 26.5L30.5 17L37.5 30H10.5Z"
      fill="#8B5CF6"
    />
    {/* Estrella cívica chilena */}
    <path
      d="M24 10.5L25.5 14.5H29.7L26.3 17L27.6 21L24 18.6L20.4 21L21.7 17L18.3 14.5H22.5L24 10.5Z"
      fill="#FFFFFF"
    />
    {/* Franja esmeralda de valle */}
    <path
      d="M12.5 34.5C16.2 36.2 20.1 37 24 37C27.9 37 31.8 36.2 35.5 34.5V37.8C31.8 39.8 27.9 41 24 41C20.1 41 16.2 39.8 12.5 37.8V34.5Z"
      fill="#1E8449"
    />
  </svg>
);

export const TramiteIcon: React.FC<{ name: TramiteItem['iconName']; className?: string }> = ({
  name,
  className = 'w-6 h-6',
}) => {
  switch (name) {
    case 'Car':
      return <Car className={className} aria-hidden="true" />;
    case 'IdCard':
      return <IdCard className={className} aria-hidden="true" />;
    case 'Trash2':
      return <Trash2 className={className} aria-hidden="true" />;
    case 'Store':
      return <Store className={className} aria-hidden="true" />;
    case 'Users':
      return <Users className={className} aria-hidden="true" />;
    case 'HeartPulse':
      return <HeartPulse className={className} aria-hidden="true" />;
    case 'FileText':
      return <FileText className={className} aria-hidden="true" />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} aria-hidden="true" />;
    case 'Home':
      return <Home className={className} aria-hidden="true" />;
    case 'Receipt':
      return <Receipt className={className} aria-hidden="true" />;
    default:
      return <FileText className={className} aria-hidden="true" />;
  }
};
