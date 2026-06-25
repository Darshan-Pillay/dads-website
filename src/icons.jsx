export function Icon({ name, size = 20, className = '', style = {}, ...props }) {
  return (
    <i
      data-lucide={name}
      className={['pl-ic', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, display: 'inline-flex', ...style }}
      {...props}
    />
  );
}
