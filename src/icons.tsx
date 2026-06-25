import type { CSSProperties, HTMLAttributes } from 'react';
import {
  ArrowRight, Box, Briefcase, Check, ChevronDown, Cloud, CloudFog,
  Compass, Cpu, Database, DatabaseZap, Eye, Factory, FlaskConical,
  Gauge, GraduationCap, Handshake, Landmark, Layers, LayoutTemplate,
  LifeBuoy, Link as LinkIcon, Navigation, RadioTower, Rocket, Route,
  Search, Server, Shield, ShieldCheck, ShoppingBag, Shuffle, Smartphone,
  Sparkles, SquareStack, Stethoscope, Target, Truck, Users, Workflow,
  X, Zap,
  type LucideIcon,
} from 'lucide-react';

// Bundled, tree-shaken icon set (replaces the 80 KB lucide UMD CDN load).
// Only the icons listed here ship in the JS chunk.
const ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  'box': Box,
  'briefcase': Briefcase,
  'check': Check,
  'chevron-down': ChevronDown,
  'cloud': Cloud,
  'cloud-fog': CloudFog,
  'compass': Compass,
  'cpu': Cpu,
  'database': Database,
  'database-zap': DatabaseZap,
  'eye': Eye,
  'factory': Factory,
  'flask-conical': FlaskConical,
  'gauge': Gauge,
  'graduation-cap': GraduationCap,
  'handshake': Handshake,
  'landmark': Landmark,
  'layers': Layers,
  'layout-template': LayoutTemplate,
  'life-buoy': LifeBuoy,
  'link': LinkIcon,
  'navigation': Navigation,
  'radio-tower': RadioTower,
  'rocket': Rocket,
  'route': Route,
  'search': Search,
  'server': Server,
  'shield': Shield,
  'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag,
  'shuffle': Shuffle,
  'smartphone': Smartphone,
  'sparkles': Sparkles,
  'square-stack': SquareStack,
  'stethoscope': Stethoscope,
  'target': Target,
  'truck': Truck,
  'users': Users,
  'workflow': Workflow,
  'x': X,
  'zap': Zap,
};

type IconProps = Omit<HTMLAttributes<SVGSVGElement>, 'style'> & {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 20, className = '', style, ...props }: IconProps) {
  const C = ICONS[name];
  if (!C) return null;
  return (
    <C
      size={size}
      strokeWidth={1.5}
      className={['pl-ic', className].filter(Boolean).join(' ')}
      style={style}
      {...props}
    />
  );
}
