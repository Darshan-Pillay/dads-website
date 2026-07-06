import type { CSSProperties, HTMLAttributes } from 'react';
import {
  ArrowRight, BarChart3, Box, Briefcase, Building2, Check, ChevronDown, Cloud, CloudFog,
  Compass, Cpu, Database, DatabaseZap, Eye, Factory, FlaskConical,
  Gauge, GraduationCap, Handshake, Landmark, Layers, Layers3, LayoutTemplate,
  LifeBuoy, Link as LinkIcon, Navigation, RadioTower, Rocket, Route,
  Search, Server, Shield, ShieldCheck, ShoppingBag, Shuffle, Smartphone,
  Sparkles, SquareStack, Stethoscope, Target, Truck, Users, Users2, Workflow,
  X, Zap,
  type LucideIcon,
} from 'lucide-react';

// Bundled, tree-shaken icon set (replaces the 80 KB lucide UMD CDN load).
// Only the icons listed here ship in the JS chunk.
const ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  'bar-chart-3': BarChart3,
  'box': Box,
  'briefcase': Briefcase,
  'building-2': Building2,
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
  'layers-3': Layers3,
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
  'users-2': Users2,
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
