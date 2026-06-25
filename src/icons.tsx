import type { CSSProperties, HTMLAttributes } from 'react';

type IconProps = Omit<HTMLAttributes<HTMLElement>, 'style'> & {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 20, className = '', style = {}, ...props }: IconProps) {
  return (
    <i
      data-lucide={name}
      className={['pl-ic', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, display: 'inline-flex', ...style }}
      {...props}
    />
  );
}
