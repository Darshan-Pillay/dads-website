/* @ds-bundle: {"format":3,"namespace":"PolarisDesignSystem_ff4f72","components":[{"name":"Avatar","sourcePath":"components/avatar/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/avatar/Avatar.jsx"},{"name":"Badge","sourcePath":"components/badge/Badge.jsx"},{"name":"Tag","sourcePath":"components/badge/Tag.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"Dialog","sourcePath":"components/dialog/Dialog.jsx"},{"name":"Input","sourcePath":"components/input/Input.jsx"},{"name":"Textarea","sourcePath":"components/input/Input.jsx"},{"name":"Select","sourcePath":"components/select/Select.jsx"},{"name":"Tabs","sourcePath":"components/tabs/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/toggles/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/toggles/Radio.jsx"},{"name":"Switch","sourcePath":"components/toggles/Switch.jsx"},{"name":"Tooltip","sourcePath":"components/tooltip/Tooltip.jsx"}],"sourceHashes":{"components/avatar/Avatar.jsx":"bfc5914b2b8f","components/badge/Badge.jsx":"bd1809098e66","components/badge/Tag.jsx":"f26c3925ad41","components/buttons/Button.jsx":"524aef6063ab","components/buttons/IconButton.jsx":"920048243552","components/card/Card.jsx":"c5cc4d5ad88d","components/dialog/Dialog.jsx":"46cf9499e592","components/input/Input.jsx":"0a322861a82e","components/select/Select.jsx":"36f58ad4ecb5","components/tabs/Tabs.jsx":"d278dd6c22ad","components/toggles/Checkbox.jsx":"53ae8d50d6f7","components/toggles/Radio.jsx":"8883a8e80a32","components/toggles/Switch.jsx":"d5633d25a984","components/tooltip/Tooltip.jsx":"5de3b21076d6","ui_kits/website/Contact.jsx":"c701a1db2e8e","ui_kits/website/Hero.jsx":"e7ca19171e55","ui_kits/website/Nav.jsx":"56193ce78cec","ui_kits/website/Sections.jsx":"b7dbf8610624","ui_kits/website/icons.jsx":"51cc35247a9f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PolarisDesignSystem_ff4f72 = window.PolarisDesignSystem_ff4f72 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/avatar/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Avatar — represents a person (senior consultant) or company.
 * Image with a graceful initials fallback on a quiet surface. Optional
 * gold ring to flag the "your lead consultant" emphasis.
 */

const STYLE_ID = 'polaris-avatar-styles';
const CSS = `
.pl-avatar {
  --_s: 40px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_s);
  height: var(--_s);
  border-radius: 50%;
  background: var(--surface-raised);
  border: 1px solid var(--border-subtle);
  color: var(--color-slate);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: calc(var(--_s) * 0.4);
  letter-spacing: 0.01em;
  overflow: hidden;
  flex: none;
  user-select: none;
}
.pl-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pl-avatar--ring { box-shadow: 0 0 0 2px var(--bg-page), 0 0 0 3px var(--color-gold); }
.pl-avatar--square { border-radius: var(--radius-md); }

.pl-avatar__status {
  position: absolute; right: -1px; bottom: -1px;
  width: 28%; height: 28%; min-width: 8px; min-height: 8px;
  border-radius: 50%; border: 2px solid var(--bg-page);
  background: var(--color-success);
}
.pl-avatar__status--away { background: var(--color-warning); }
.pl-avatar__status--offline { background: var(--color-mist); }

.pl-avatar-group { display: inline-flex; }
.pl-avatar-group > .pl-avatar { margin-left: -10px; box-shadow: 0 0 0 2px var(--bg-page); }
.pl-avatar-group > .pl-avatar:first-child { margin-left: 0; }
`;
function useAvatarStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
const SIZES = {
  sm: 28,
  md: 40,
  lg: 56,
  xl: 80
};
function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
function Avatar({
  src,
  name = '',
  size = 'md',
  square = false,
  ring = false,
  status,
  className = '',
  ...props
}) {
  useAvatarStyles();
  const px = SIZES[size] || size;
  const cls = ['pl-avatar', ring ? 'pl-avatar--ring' : '', square ? 'pl-avatar--square' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      '--_s': px + 'px'
    },
    title: name
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name), status ? /*#__PURE__*/React.createElement("span", {
    className: `pl-avatar__status pl-avatar__status--${status}`
  }) : null);
}
function AvatarGroup({
  children,
  className = '',
  ...props
}) {
  useAvatarStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['pl-avatar-group', className].filter(Boolean).join(' ')
  }, props), children);
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/badge/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Badge — a small status/label pill. Functional colors are used
 * sparingly and muted to sit inside the dark theme. Gold is reserved for
 * the rare "featured" emphasis.
 */

const STYLE_ID = 'polaris-badge-styles';
const CSS = `
.pl-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 9px;
  font-family: var(--font-body);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  white-space: nowrap;
}
.pl-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.pl-badge--neutral { background: var(--color-white-a08); color: var(--color-slate); }
.pl-badge--gold    { background: var(--color-gold-a16); color: var(--color-gold-light); border-color: var(--color-gold-a32); }
.pl-badge--success { background: var(--color-success-bg); color: var(--color-success); }
.pl-badge--warning { background: var(--color-warning-bg); color: var(--color-warning); }
.pl-badge--error   { background: var(--color-error-bg); color: var(--color-error); }
.pl-badge--info    { background: var(--color-info-bg); color: var(--color-info); }

.pl-badge--outline { background: transparent; border-color: var(--color-hairline-2); color: var(--color-slate); }
`;
function useBadgeStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  outline = false,
  className = '',
  ...props
}) {
  useBadgeStyles();
  const cls = ['pl-badge', outline ? 'pl-badge--outline' : `pl-badge--${tone}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), dot ? /*#__PURE__*/React.createElement("span", {
    className: "pl-badge__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/badge/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Tag — a removable/selectable chip for filters, domains, and
 * keywords (AI · Cloud · SAP …). Quiet by default; gold when selected.
 */

const STYLE_ID = 'polaris-tag-styles';
const CSS = `
.pl-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 13px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-hairline-2);
  background: transparent;
  color: var(--color-slate);
  cursor: default;
  transition: color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              background var(--dur-fast) var(--ease-out);
}
.pl-tag--clickable { cursor: pointer; }
.pl-tag--clickable:hover { color: var(--color-white); border-color: var(--color-gold); }
.pl-tag--selected {
  color: var(--color-on-gold);
  background: var(--color-gold);
  border-color: var(--color-gold);
}
.pl-tag--selected:hover { color: var(--color-on-gold); background: var(--color-gold-light); border-color: var(--color-gold-light); }
.pl-tag:focus-visible { outline: none; box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-tag__remove {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; margin-right: -4px; border-radius: 50%;
  border: none; background: transparent; color: inherit; cursor: pointer;
  opacity: 0.7;
}
.pl-tag__remove:hover { opacity: 1; background: rgba(0,0,0,0.18); }
.pl-tag__remove svg { width: 11px; height: 11px; }
`;
function useTagStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Tag({
  children,
  selected = false,
  onClick,
  onRemove,
  className = '',
  ...props
}) {
  useTagStyles();
  const clickable = !!onClick || selected !== undefined && !!onClick;
  const isClickable = !!onClick;
  const cls = ['pl-tag', isClickable ? 'pl-tag--clickable' : '', selected ? 'pl-tag--selected' : '', className].filter(Boolean).join(' ');
  const Tag = isClickable ? 'button' : 'span';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    onClick: onClick
  }, props), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pl-tag__remove",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }))) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badge/Tag.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Button — the primary interactive primitive.
 * Gold is reserved for the single most important action in view; most
 * buttons are secondary (outline) or ghost. Polished, modern feel:
 * crisp hairline, quiet lift, gold focus ring, calm easing.
 */

const STYLE_ID = 'polaris-button-styles';
const CSS = `
.pl-btn {
  --_h: 44px;
  --_px: 22px;
  --_fs: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: var(--_h);
  padding: 0 var(--_px);
  font-family: var(--font-display);
  font-size: var(--_fs);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.pl-btn:focus-visible {
  outline: none;
  box-shadow: var(--ring-offset-shadow), var(--ring);
}
.pl-btn:disabled, .pl-btn[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
.pl-btn__icon { display: inline-flex; align-items: center; justify-content: center; }
.pl-btn__icon svg { width: 1.05em; height: 1.05em; display: block; }

/* sizes */
.pl-btn--sm { --_h: 36px; --_px: 16px; --_fs: 13.5px; }
.pl-btn--lg { --_h: 54px; --_px: 30px; --_fs: 17px; border-radius: var(--radius-lg); }

/* full width */
.pl-btn--block { width: 100%; }

/* primary — the gold spotlight */
.pl-btn--primary {
  background: var(--color-gold);
  color: var(--color-on-gold);
  box-shadow: var(--shadow-inset-top), var(--shadow-sm);
}
.pl-btn--primary:hover {
  background: var(--color-gold-light);
  box-shadow: var(--shadow-inset-top), var(--glow-gold-md);
}
.pl-btn--primary:active {
  background: var(--color-gold-deep);
  transform: translateY(1px);
  box-shadow: var(--shadow-xs);
}

/* secondary — outline, the workhorse */
.pl-btn--secondary {
  background: transparent;
  color: var(--color-snow);
  border-color: var(--color-hairline-2);
}
.pl-btn--secondary:hover {
  color: var(--color-white);
  border-color: var(--color-gold);
  background: var(--color-gold-a08);
}
.pl-btn--secondary:active { transform: translateY(1px); background: var(--color-gold-a16); }

/* ghost — quietest */
.pl-btn--ghost {
  background: transparent;
  color: var(--color-slate);
}
.pl-btn--ghost:hover { color: var(--color-white); background: var(--color-white-a04); }
.pl-btn--ghost:active { transform: translateY(1px); background: var(--color-white-a08); }

/* solid white — high-contrast alt CTA on busy hero */
.pl-btn--contrast {
  background: var(--color-snow);
  color: var(--color-obsidian);
  box-shadow: var(--shadow-sm);
}
.pl-btn--contrast:hover { background: var(--color-white); }
.pl-btn--contrast:active { transform: translateY(1px); }

/* danger */
.pl-btn--danger {
  background: transparent;
  color: var(--color-error);
  border-color: rgba(226,97,90,0.4);
}
.pl-btn--danger:hover { background: var(--color-error-bg); border-color: var(--color-error); }
`;
function useButtonStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Button({
  children,
  variant = 'secondary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  ...props
}) {
  useButtonStyles();
  const Tag = as;
  const cls = ['pl-btn', `pl-btn--${variant}`, size !== 'md' ? `pl-btn--${size}` : '', block ? 'pl-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "pl-btn__icon"
  }, iconLeft) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "pl-btn__icon"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris IconButton — a square, icon-only control for toolbars, nav,
 * and dense UI. Shares the Button visual language; defaults to the
 * quiet ghost treatment.
 */

const STYLE_ID = 'polaris-iconbutton-styles';
const CSS = `
.pl-iconbtn {
  --_s: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_s);
  height: var(--_s);
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-slate);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}
.pl-iconbtn svg { width: 20px; height: 20px; display: block; }
.pl-iconbtn:focus-visible { outline: none; box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

.pl-iconbtn--sm { --_s: 36px; }
.pl-iconbtn--sm svg { width: 17px; height: 17px; }
.pl-iconbtn--lg { --_s: 52px; }
.pl-iconbtn--lg svg { width: 23px; height: 23px; }

.pl-iconbtn--round { border-radius: var(--radius-pill); }

/* ghost (default) */
.pl-iconbtn--ghost:hover { color: var(--color-white); background: var(--color-white-a04); }
.pl-iconbtn--ghost:active { transform: translateY(1px); background: var(--color-white-a08); }

/* secondary outline */
.pl-iconbtn--secondary { border-color: var(--color-hairline-2); color: var(--color-snow); }
.pl-iconbtn--secondary:hover { border-color: var(--color-gold); color: var(--color-white); background: var(--color-gold-a08); }
.pl-iconbtn--secondary:active { transform: translateY(1px); }

/* primary gold */
.pl-iconbtn--primary { background: var(--color-gold); color: var(--color-on-gold); box-shadow: var(--shadow-inset-top), var(--shadow-sm); }
.pl-iconbtn--primary:hover { background: var(--color-gold-light); box-shadow: var(--shadow-inset-top), var(--glow-gold-md); }
.pl-iconbtn--primary:active { background: var(--color-gold-deep); transform: translateY(1px); }
`;
function useIconButtonStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function IconButton({
  children,
  icon,
  variant = 'ghost',
  size = 'md',
  round = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) {
  useIconButtonStyles();
  const cls = ['pl-iconbtn', `pl-iconbtn--${variant}`, size !== 'md' ? `pl-iconbtn--${size}` : '', round ? 'pl-iconbtn--round' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": ariaLabel
  }, props), icon || children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Card — a raised surface for grouping content. On the night
 * canvas, depth comes from a hairline border + a subtly raised fill,
 * not heavy shadow. Optional gold-glow hover for interactive cards.
 */

const STYLE_ID = 'polaris-card-styles';
const CSS = `
.pl-card {
  display: block;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-inset-top), var(--shadow-sm);
  color: var(--text-body);
  overflow: hidden;
}
.pl-card--pad { padding: var(--space-5); }
.pl-card--pad-lg { padding: var(--space-6); }
.pl-card--raised { background: var(--surface-raised); }
.pl-card--flat { box-shadow: none; }

.pl-card--interactive {
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: border-color var(--dur-base) var(--ease-out),
              transform var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}
.pl-card--interactive:hover {
  border-color: var(--border-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-inset-top), var(--shadow-md);
}
.pl-card--interactive:focus-visible {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: var(--ring-offset-shadow), var(--ring);
}
.pl-card--accent { border-top: 2px solid var(--color-gold); }
`;
function useCardStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Card({
  children,
  padding = 'md',
  raised = false,
  flat = false,
  interactive = false,
  accent = false,
  as,
  className = '',
  ...props
}) {
  useCardStyles();
  const Tag = as || (interactive ? 'button' : 'div');
  const cls = ['pl-card', padding === 'md' ? 'pl-card--pad' : padding === 'lg' ? 'pl-card--pad-lg' : '', raised ? 'pl-card--raised' : '', flat ? 'pl-card--flat' : '', interactive ? 'pl-card--interactive' : '', accent ? 'pl-card--accent' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/dialog/Dialog.jsx
try { (() => {
/**
 * Polaris Dialog — a centered modal on a deep scrim. Surface card with a
 * hairline border; calm fade + lift entrance. Closes on Esc and backdrop.
 */

const STYLE_ID = 'polaris-dialog-styles';
const CSS = `
.pl-dialog__scrim {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: var(--space-5);
  background: var(--surface-overlay);
  backdrop-filter: blur(var(--blur-sm));
  -webkit-backdrop-filter: blur(var(--blur-sm));
  animation: pl-dialog-fade var(--dur-base) var(--ease-out);
}
@keyframes pl-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
.pl-dialog {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-6);
  animation: pl-dialog-rise var(--dur-base) var(--ease-out);
}
@keyframes pl-dialog-rise { from { opacity: 0; transform: translateY(12px) scale(0.985); } to { opacity: 1; transform: none; } }
.pl-dialog--wide { max-width: 680px; }
.pl-dialog__close {
  position: absolute; top: 16px; right: 16px;
  width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
  border: none; background: transparent; color: var(--color-slate);
  border-radius: var(--radius-md); cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.pl-dialog__close:hover { color: var(--color-white); background: var(--color-white-a04); }
.pl-dialog__close svg { width: 18px; height: 18px; }
.pl-dialog__title { font-family: var(--font-display); font-size: 24px; font-weight: 500; color: var(--color-white); margin: 0 0 8px; letter-spacing: -0.01em; padding-right: 32px; }
.pl-dialog__desc { font-family: var(--font-body); font-size: 15px; line-height: 1.6; color: var(--color-slate); margin: 0; }
.pl-dialog__body { margin-top: var(--space-5); }
.pl-dialog__footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: var(--space-6); }
`;
function useDialogStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  wide = false,
  closeOnBackdrop = true,
  className = ''
}) {
  useDialogStyles();
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "pl-dialog__scrim",
    onMouseDown: e => {
      if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: ['pl-dialog', wide ? 'pl-dialog--wide' : '', className].filter(Boolean).join(' '),
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pl-dialog__close",
    "aria-label": "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }))), title ? /*#__PURE__*/React.createElement("h2", {
    className: "pl-dialog__title"
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    className: "pl-dialog__desc"
  }, description) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "pl-dialog__body"
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    className: "pl-dialog__footer"
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dialog/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/input/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Input — text field on the dark canvas. Quiet raised fill,
 * hairline border that warms to gold on focus, generous height.
 * Supports a label, helper/error text, and leading/trailing adornments.
 */

const STYLE_ID = 'polaris-field-styles';
const CSS = `
.pl-field { display: flex; flex-direction: column; gap: 7px; }
.pl-field__label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-snow);
}
.pl-field__req { color: var(--color-gold); margin-left: 3px; }
.pl-field__wrap {
  display: flex;
  align-items: center;
  gap: 9px;
  background: var(--surface-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0 13px;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.pl-field__wrap:hover { border-color: var(--border-strong); }
.pl-field__wrap:focus-within {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px var(--color-gold-a16);
}
.pl-field__input {
  flex: 1;
  width: 100%;
  height: 44px;
  border: none;
  background: transparent;
  color: var(--color-snow);
  font-family: var(--font-body);
  font-size: 15px;
  outline: none;
}
.pl-field__input::placeholder { color: var(--color-mist); }
.pl-field--textarea .pl-field__wrap { padding: 11px 13px; }
.pl-field__input--area { height: auto; min-height: 96px; resize: vertical; line-height: 1.6; padding: 0; }
.pl-field__adorn { display: inline-flex; color: var(--color-mist); flex: none; }
.pl-field__adorn svg { width: 18px; height: 18px; display: block; }
.pl-field__help { font-family: var(--font-body); font-size: 12px; color: var(--color-slate); }

.pl-field--error .pl-field__wrap { border-color: var(--color-error); }
.pl-field--error .pl-field__wrap:focus-within { box-shadow: 0 0 0 3px var(--color-error-bg); }
.pl-field--error .pl-field__help { color: var(--color-error); }

.pl-field--disabled { opacity: 0.5; pointer-events: none; }
`;
function useFieldStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
let _id = 0;
function useId(prefix) {
  const [id] = React.useState(() => `${prefix}-${++_id}`);
  return id;
}
function Input({
  label,
  helper,
  error,
  required = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  className = '',
  id,
  ...props
}) {
  useFieldStyles();
  const autoId = useId('pl-input');
  const fieldId = id || autoId;
  const msg = error || helper;
  const cls = ['pl-field', error ? 'pl-field--error' : '', disabled ? 'pl-field--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pl-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "pl-field__wrap"
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__adorn"
  }, iconLeft) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "pl-field__input",
    disabled: disabled,
    "aria-invalid": !!error
  }, props)), iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__adorn"
  }, iconRight) : null), msg ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__help"
  }, msg) : null);
}
function Textarea({
  label,
  helper,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  id,
  ...props
}) {
  useFieldStyles();
  const autoId = useId('pl-textarea');
  const fieldId = id || autoId;
  const msg = error || helper;
  const cls = ['pl-field pl-field--textarea', error ? 'pl-field--error' : '', disabled ? 'pl-field--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pl-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "pl-field__wrap"
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    className: "pl-field__input pl-field__input--area",
    disabled: disabled,
    "aria-invalid": !!error
  }, props))), msg ? /*#__PURE__*/React.createElement("span", {
    className: "pl-field__help"
  }, msg) : null);
}
Object.assign(__ds_scope, { Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/input/Input.jsx", error: String((e && e.message) || e) }); }

// components/select/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Select — a styled native <select> for reliability and a11y.
 * Matches the Input field language with a custom gold chevron.
 */

const STYLE_ID = 'polaris-select-styles';
const CSS = `
.pl-select { display: flex; flex-direction: column; gap: 7px; }
.pl-select__label { font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--color-snow); }
.pl-select__req { color: var(--color-gold); margin-left: 3px; }
.pl-select__wrap { position: relative; display: flex; }
.pl-select__el {
  appearance: none; -webkit-appearance: none;
  width: 100%; height: 44px;
  padding: 0 40px 0 13px;
  background: var(--surface-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--color-snow);
  font-family: var(--font-body); font-size: 15px;
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.pl-select__el:hover { border-color: var(--border-strong); }
.pl-select__el:focus { outline: none; border-color: var(--color-gold); box-shadow: 0 0 0 3px var(--color-gold-a16); }
.pl-select__el:disabled { opacity: 0.5; cursor: not-allowed; }
.pl-select__el option { background: var(--color-surface); color: var(--color-snow); }
.pl-select__chev {
  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  pointer-events: none; color: var(--color-gold); display: flex;
}
.pl-select__chev svg { width: 16px; height: 16px; }
.pl-select__help { font-family: var(--font-body); font-size: 12px; color: var(--color-slate); }
.pl-select--placeholder .pl-select__el { color: var(--color-mist); }
`;
function useSelectStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
let _sid = 0;
function Select({
  label,
  helper,
  required = false,
  placeholder,
  options = [],
  value,
  defaultValue,
  disabled = false,
  className = '',
  id,
  children,
  ...props
}) {
  useSelectStyles();
  const [fid] = React.useState(() => id || `pl-select-${++_sid}`);
  const isEmpty = (value ?? defaultValue ?? '') === '' && placeholder;
  const cls = ['pl-select', isEmpty ? 'pl-select--placeholder' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "pl-select__label",
    htmlFor: fid
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "pl-select__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "pl-select__wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "pl-select__el",
    value: value,
    defaultValue: defaultValue,
    disabled: disabled
  }, props), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "pl-select__chev"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), helper ? /*#__PURE__*/React.createElement("span", {
    className: "pl-select__help"
  }, helper) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/select/Select.jsx", error: String((e && e.message) || e) }); }

// components/tabs/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Tabs — underline-style navigation between views. Active tab is
 * marked by a gold underline that slides in. Quiet, editorial feel.
 */

const STYLE_ID = 'polaris-tabs-styles';
const CSS = `
.pl-tabs__list {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border-subtle);
}
.pl-tabs__tab {
  position: relative;
  appearance: none;
  background: transparent;
  border: none;
  padding: 12px 16px 14px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--color-slate);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out);
}
.pl-tabs__tab:hover { color: var(--color-snow); }
.pl-tabs__tab[aria-selected="true"] { color: var(--color-white); }
.pl-tabs__tab::after {
  content: "";
  position: absolute; left: 12px; right: 12px; bottom: -1px; height: 2px;
  background: var(--color-gold);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--dur-base) var(--ease-out);
}
.pl-tabs__tab[aria-selected="true"]::after { transform: scaleX(1); }
.pl-tabs__tab:focus-visible { outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }
.pl-tabs__tab:disabled { opacity: 0.4; cursor: not-allowed; }
.pl-tabs__count { margin-left: 7px; font-family: var(--font-body); font-size: 12px; color: var(--color-mist); }
.pl-tabs__panel { padding-top: var(--space-5); }
`;
function useTabsStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  className = '',
  children,
  ...props
}) {
  useTabsStyles();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  const activeItem = items.find(i => i.value === active);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['pl-tabs', className].filter(Boolean).join(' ')
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "pl-tabs__list",
    role: "tablist"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    role: "tab",
    type: "button",
    "aria-selected": active === it.value,
    disabled: it.disabled,
    className: "pl-tabs__tab",
    onClick: () => select(it.value)
  }, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "pl-tabs__count"
  }, it.count) : null))), activeItem?.content || children ? /*#__PURE__*/React.createElement("div", {
    className: "pl-tabs__panel",
    role: "tabpanel"
  }, activeItem?.content ?? children) : null);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/toggles/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Checkbox — gold-filled check on the dark canvas, with an
 * optional label + description.
 */

const STYLE_ID = 'polaris-toggle-styles';
const CSS = `
.pl-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-body); }
.pl-check--disabled { opacity: 0.45; cursor: not-allowed; }
.pl-check__input { position: absolute; opacity: 0; width: 0; height: 0; }
.pl-check__box {
  flex: none; width: 20px; height: 20px; margin-top: 1px;
  border: 1px solid var(--color-hairline-2);
  border-radius: var(--radius-sm);
  background: var(--surface-raised);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--color-on-gold);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.pl-check:hover .pl-check__box { border-color: var(--color-gold); }
.pl-check__box svg { width: 13px; height: 13px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pl-check__input:checked + .pl-check__box { background: var(--color-gold); border-color: var(--color-gold); }
.pl-check__input:checked + .pl-check__box svg { opacity: 1; transform: scale(1); }
.pl-check__input:focus-visible + .pl-check__box { box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-check__body { display: flex; flex-direction: column; gap: 2px; }
.pl-check__label { font-size: 14px; color: var(--color-snow); line-height: 1.45; }
.pl-check__desc { font-size: 12.5px; color: var(--color-slate); line-height: 1.4; }

.pl-radio__box { border-radius: 50%; }
.pl-radio__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--color-on-gold); opacity: 0; transform: scale(0.4); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pl-check__input:checked + .pl-radio__box .pl-radio__dot { opacity: 1; transform: scale(1); }

.pl-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--font-body); }
.pl-switch--disabled { opacity: 0.45; cursor: not-allowed; }
.pl-switch__track {
  position: relative; width: 42px; height: 24px; flex: none;
  background: var(--color-hairline); border: 1px solid var(--color-hairline-2);
  border-radius: var(--radius-pill);
  transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.pl-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
  background: var(--color-slate); border-radius: 50%;
  transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.pl-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.pl-switch__input:checked + .pl-switch__track { background: var(--color-gold); border-color: var(--color-gold); }
.pl-switch__input:checked + .pl-switch__track .pl-switch__thumb { transform: translateX(18px); background: var(--color-on-gold); }
.pl-switch__input:focus-visible + .pl-switch__track { box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-switch__label { font-size: 14px; color: var(--color-snow); }
`;
function useToggleStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
const CheckMark = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
function Checkbox({
  label,
  description,
  disabled = false,
  className = '',
  ...props
}) {
  useToggleStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ['pl-check', disabled ? 'pl-check--disabled' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    className: "pl-check__input",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "pl-check__box"
  }, /*#__PURE__*/React.createElement(CheckMark, null)), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__body"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__label"
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/toggles/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/toggles/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Radio — single-select control; the gold dot marks the choice.
 * Group several with a shared `name`.
 */

const STYLE_ID = 'polaris-toggle-styles';
const CSS = `
.pl-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-body); }
.pl-check--disabled { opacity: 0.45; cursor: not-allowed; }
.pl-check__input { position: absolute; opacity: 0; width: 0; height: 0; }
.pl-check__box {
  flex: none; width: 20px; height: 20px; margin-top: 1px;
  border: 1px solid var(--color-hairline-2);
  border-radius: var(--radius-sm);
  background: var(--surface-raised);
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--color-on-gold);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.pl-check:hover .pl-check__box { border-color: var(--color-gold); }
.pl-check__box svg { width: 13px; height: 13px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pl-check__input:checked + .pl-check__box { background: var(--color-gold); border-color: var(--color-gold); }
.pl-check__input:checked + .pl-check__box svg { opacity: 1; transform: scale(1); }
.pl-check__input:focus-visible + .pl-check__box { box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-check__body { display: flex; flex-direction: column; gap: 2px; }
.pl-check__label { font-size: 14px; color: var(--color-snow); line-height: 1.45; }
.pl-check__desc { font-size: 12.5px; color: var(--color-slate); line-height: 1.4; }

.pl-radio__box { border-radius: 50%; }
.pl-radio__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--color-on-gold); opacity: 0; transform: scale(0.4); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pl-check__input:checked + .pl-radio__box .pl-radio__dot { opacity: 1; transform: scale(1); }
`;
function useToggleStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Radio({
  label,
  description,
  disabled = false,
  className = '',
  ...props
}) {
  useToggleStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ['pl-check', disabled ? 'pl-check--disabled' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    className: "pl-check__input",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "pl-check__box pl-radio__box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pl-radio__dot"
  })), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__body"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__label"
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    className: "pl-check__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/toggles/Radio.jsx", error: String((e && e.message) || e) }); }

// components/toggles/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Switch — instant on/off toggle; track fills gold when on.
 */

const STYLE_ID = 'polaris-switch-styles';
const CSS = `
.pl-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--font-body); }
.pl-switch--disabled { opacity: 0.45; cursor: not-allowed; }
.pl-switch__track {
  position: relative; width: 42px; height: 24px; flex: none;
  background: var(--color-hairline); border: 1px solid var(--color-hairline-2);
  border-radius: var(--radius-pill);
  transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.pl-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
  background: var(--color-slate); border-radius: 50%;
  transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.pl-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.pl-switch__input:checked + .pl-switch__track { background: var(--color-gold); border-color: var(--color-gold); }
.pl-switch__input:checked + .pl-switch__track .pl-switch__thumb { transform: translateX(18px); background: var(--color-on-gold); }
.pl-switch__input:focus-visible + .pl-switch__track { box-shadow: var(--ring-offset-shadow), var(--ring); }
.pl-switch__label { font-size: 14px; color: var(--color-snow); }
`;
function useSwitchStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Switch({
  label,
  disabled = false,
  className = '',
  ...props
}) {
  useSwitchStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ['pl-switch', disabled ? 'pl-switch--disabled' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    className: "pl-switch__input",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "pl-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pl-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "pl-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/toggles/Switch.jsx", error: String((e && e.message) || e) }); }

// components/tooltip/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Polaris Tooltip — a small label on hover/focus. Deep-ink surface,
 * hairline border, quick fade. Wrap any focusable trigger.
 */

const STYLE_ID = 'polaris-tooltip-styles';
const CSS = `
.pl-tt { position: relative; display: inline-flex; }
.pl-tt__bubble {
  position: absolute; z-index: 900;
  left: 50%;
  padding: 7px 11px;
  background: var(--color-ink);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  color: var(--color-snow);
  font-family: var(--font-body); font-size: 12.5px; line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.pl-tt__bubble--top    { bottom: calc(100% + 9px); transform: translate(-50%, 4px); }
.pl-tt__bubble--bottom { top: calc(100% + 9px);    transform: translate(-50%, -4px); }
.pl-tt__bubble::after {
  content: ""; position: absolute; left: 50%; width: 8px; height: 8px;
  background: var(--color-ink);
  border: 1px solid var(--border-strong);
  transform: translateX(-50%) rotate(45deg);
}
.pl-tt__bubble--top::after    { bottom: -5px; border-top: none; border-left: none; }
.pl-tt__bubble--bottom::after { top: -5px;    border-bottom: none; border-right: none; }
.pl-tt:hover .pl-tt__bubble,
.pl-tt:focus-within .pl-tt__bubble { opacity: 1; transform: translate(-50%, 0); }
.pl-tt__bubble strong { color: var(--color-gold-light); font-weight: 600; }
`;
function useTooltipStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Tooltip({
  label,
  placement = 'top',
  children,
  className = '',
  ...props
}) {
  useTooltipStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['pl-tt', className].filter(Boolean).join(' ')
  }, props), children, /*#__PURE__*/React.createElement("span", {
    className: `pl-tt__bubble pl-tt__bubble--${placement}`,
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tooltip/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
/* Contact + Footer — the close of the scroll. */

function Contact({
  onContact
}) {
  const {
    Button,
    Input,
    Select
  } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  return /*#__PURE__*/React.createElement("section", {
    className: "section contact",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container split split--reverse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "Contact"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "Get unbiased guidance."), /*#__PURE__*/React.createElement("p", {
    className: "section__lead reveal",
    style: {
      '--d': '120ms'
    }
  }, "Tell us what you're navigating. We'll match you with a senior consultant \u2014 a straight conversation, no sales pitch."), /*#__PURE__*/React.createElement("ul", {
    className: "contact__meta reveal",
    style: {
      '--d': '180ms'
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 18
  }), " hello@polaris.consulting"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 18
  }), " Remote-first \xB7 plugged into your team"))), /*#__PURE__*/React.createElement("div", {
    className: "contact__card reveal",
    style: {
      '--d': '120ms'
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "contact__form",
    onSubmit: e => {
      e.preventDefault();
      onContact?.();
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "What do you need help with?",
    placeholder: "Choose a domain",
    options: ['AI & Data', 'Cloud', 'SAP', 'Oracle', 'Microsoft', 'Enterprise Architecture', 'Not sure yet']
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Connect with a specialist")))));
}
function Footer() {
  const cols = [{
    h: 'Services',
    items: ['AI & Data', 'Cloud', 'SAP', 'Oracle', 'Enterprise Architecture']
  }, {
    h: 'Company',
    items: ['About', 'Our approach', 'Consultants', 'Case studies']
  }, {
    h: 'Connect',
    items: ['Contact', 'LinkedIn', 'Insights']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container site-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-footer__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/polaris-horizontal-dark.png",
    alt: "Polaris"
  }), /*#__PURE__*/React.createElement("p", null, "Your fixed point in a shifting landscape.")), /*#__PURE__*/React.createElement("div", {
    className: "site-footer__cols"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h,
    className: "site-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, c.h), /*#__PURE__*/React.createElement("ul", null, c.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, it)))))))), /*#__PURE__*/React.createElement("div", {
    className: "container site-footer__base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Polaris. Independent IT consultancy."), /*#__PURE__*/React.createElement("span", null, "Independent expertise. Real solutions. No agenda.")));
}
Object.assign(window, {
  Contact,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero — the opening statement. North Star mark, the promise, one CTA. */

function Hero({
  onContact
}) {
  const {
    Button
  } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__star",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/polaris-mark-gold.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "Independent IT consultancy"), /*#__PURE__*/React.createElement("h1", {
    className: "hero__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "Your fixed point in a", /*#__PURE__*/React.createElement("br", null), "shifting landscape", /*#__PURE__*/React.createElement("span", {
    className: "gold"
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead reveal",
    style: {
      '--d': '140ms'
    }
  }, "AI is moving fast. We're the senior, independent experts who cut hype from substance \u2014 and recommend what's right for ", /*#__PURE__*/React.createElement("em", null, "you"), ", not for a vendor."), /*#__PURE__*/React.createElement("div", {
    className: "hero__actions reveal",
    style: {
      '--d': '220ms'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onContact,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Find your north"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    as: "a",
    href: "#what-we-do"
  }, "See what we do"))), /*#__PURE__*/React.createElement("a", {
    className: "hero__scroll",
    href: "#the-shift",
    "aria-label": "Scroll"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 22
  })));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* Nav — fixed top bar; transparent over hero, frosts on scroll. */

function Nav({
  onContact
}) {
  const {
    Button
  } = window.PolarisDesignSystem_ff4f72;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector('.pl-site');
    const el = root || window;
    const onScroll = () => {
      const y = root ? root.scrollTop : window.scrollY;
      setScrolled(y > 24);
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['The shift', 'Who we are', 'What we do', 'How we work'];
  return /*#__PURE__*/React.createElement("header", {
    className: `site-nav ${scrolled ? 'is-scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-nav__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "site-nav__brand",
    href: "#top"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/polaris-horizontal-dark.png",
    alt: "Polaris"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "site-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase().replace(/\s+/g, '-')
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "site-nav__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onContact
  }, "Connect with a specialist"))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* Sections — the single-scroll narrative body. */

function Shift() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--center",
    id: "the-shift"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "The shift"), /*#__PURE__*/React.createElement("h2", {
    className: "section__statement reveal",
    style: {
      '--d': '60ms'
    }
  }, "Everyone's talking about AI. The landscape is transforming faster than you can keep up \u2014 and the cost of choosing wrong keeps rising."), /*#__PURE__*/React.createElement("p", {
    className: "section__lead reveal",
    style: {
      '--d': '140ms'
    }
  }, "The big consultancies are expensive and conflicted. The big vendors sell you their roadmap, not yours. You don't need another sales pitch. You need someone who'll tell you the truth.")));
}
function WhoWeAre() {
  const {
    Card
  } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const points = [{
    icon: 'shield-check',
    title: 'No agenda',
    body: 'No badges, no affiliations, no kickbacks. We recommend what works best for you.'
  }, {
    icon: 'compass',
    title: 'Always pointing north',
    body: "We don't just diagnose — we hand you a clear, prioritised plan you can act on."
  }, {
    icon: 'users',
    title: 'Inside your team',
    body: 'Senior consultants who work shoulder-to-shoulder with your people, not over the top.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "who-we-are"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "Who we are"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "The honest specialists who fight in your corner.")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, points.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    padding: "lg",
    className: "reveal",
    style: {
      '--d': i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "feature__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    className: "feature__title"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "feature__body"
  }, p.body))))));
}
function WhatWeDo() {
  const {
    Tag
  } = window.PolarisDesignSystem_ff4f72;
  const domains = ['AI', 'Big Data', 'Cloud Computing', 'SAP', 'Microsoft', 'Oracle', 'IBM', 'Enterprise Architecture', 'Software Development'];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--alt",
    id: "what-we-do"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "What we do"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "Multi-domain expertise \u2014 framed as outcomes, not vendor names."), /*#__PURE__*/React.createElement("p", {
    className: "section__lead reveal",
    style: {
      '--d': '120ms'
    }
  }, "We're agnostic across the whole stack. Wherever real outcomes live, we go \u2014 and we stay honest about what you actually need.")), /*#__PURE__*/React.createElement("div", {
    className: "domains reveal",
    style: {
      '--d': '160ms'
    }
  }, domains.map(d => /*#__PURE__*/React.createElement(Tag, {
    key: d
  }, d)))));
}
function WhyIndependent() {
  const Icon = window.Icon;
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "why-independent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split__media reveal",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orbit"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/polaris-mark-gold.png",
    alt: "",
    className: "orbit__star"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "split__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "Why independent matters"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "When the landscape keeps shifting, we're the point that doesn't move."), /*#__PURE__*/React.createElement("ul", {
    className: "check-list reveal",
    style: {
      '--d': '140ms'
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18
  }), " We sell judgement \u2014 not certifications or vendor allegiances."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18
  }), " The calibre of the giants, without the giant invoice."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18
  }), " Advice you can actually trust, because nothing's hidden.")), /*#__PURE__*/React.createElement("blockquote", {
    className: "pull-quote reveal",
    style: {
      '--d': '200ms'
    }
  }, "\"We recommend what works best for you \u2014 not what's best for a vendor.\""))));
}
function HowWeWork() {
  const Icon = window.Icon;
  const steps = [{
    n: '01',
    icon: 'search',
    title: 'Diagnose',
    body: 'We plug into your team and map the real picture — honestly, fast.'
  }, {
    n: '02',
    icon: 'navigation',
    title: 'Point north',
    body: 'A clear, prioritised plan: what to do, in what order, and why.'
  }, {
    n: '03',
    icon: 'handshake',
    title: 'Deliver together',
    body: 'Senior hands alongside yours until the outcome is real.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--alt",
    id: "how-we-work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow reveal"
  }, "How we work"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title reveal",
    style: {
      '--d': '60ms'
    }
  }, "The guide-and-plan model.")), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "step reveal",
    key: s.n,
    style: {
      '--d': i * 90 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "step__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "step__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "step__n"
  }, s.n)), /*#__PURE__*/React.createElement("h3", {
    className: "feature__title"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "feature__body"
  }, s.body))))));
}
Object.assign(window, {
  Shift,
  WhoWeAre,
  WhatWeDo,
  WhyIndependent,
  HowWeWork
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Icon — thin-line Lucide wrapper (brand calls for thin-line minimal icons
   in white or gold). Lucide is the closest CDN match to the brand direction.
   Renders an <i data-lucide> and lets the app-level lucide.createIcons() swap
   in the SVG with stroke-width 1.5. */

function Icon({
  name,
  size = 20,
  className = '',
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": name,
    className: ['pl-ic', className].filter(Boolean).join(' '),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      ...style
    }
  }, props));
}

/* Re-run icon replacement whenever the tree changes. */
function useLucide(dep) {
  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.5,
          width: 20,
          height: 20
        }
      });
    }
  });
}
Object.assign(window, {
  Icon,
  useLucide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
