// Bridge to the Polaris design system bundle.
//
// The DS lives in public/_ds/ and is loaded synchronously via a plain
// <script> tag in index.html, so by the time Vite's React entry runs,
// window.PolarisDesignSystem_ff4f72 is already populated. Components
// import from here instead of touching `window` directly.
const ds = () => window.PolarisDesignSystem_ff4f72;

export const Button = (props) => { const C = ds().Button; return <C {...props} />; };
export const Card   = (props) => { const C = ds().Card;   return <C {...props} />; };
export const Tag    = (props) => { const C = ds().Tag;    return <C {...props} />; };
export const Input  = (props) => { const C = ds().Input;  return <C {...props} />; };
export const Select = (props) => { const C = ds().Select; return <C {...props} />; };
export const Dialog = (props) => { const C = ds().Dialog; return <C {...props} />; };
