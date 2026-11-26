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
import municipalLogo from '../assets/images/conchali-logo.jpg';

export const MunicipalShield: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <img
    src={municipalLogo}
    alt=""
    width={445}
    height={345}
    className={`${className} object-contain`}
    aria-hidden="true"
  />
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
