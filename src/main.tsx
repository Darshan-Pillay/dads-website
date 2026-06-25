import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/site.css';

// The Polaris design system bundle (public/_ds/_ds_bundle.js) references
// React as a bare global identifier inside its component definitions.
// Expose React on window so those components resolve it at render time.
window.React = React;

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element in index.html');

// In dev, Vite places the module entry at end-of-body so the defer'd DS
// bundle in index.html has already executed by the time we mount. In the
// production build, Vite injects the module entry into <head>, which makes
// it run *before* the body defers — so window.PolarisDesignSystem_ff4f72
// isn't populated yet and every <Button>/<Card>/etc. throws. Waiting for
// the window 'load' event guarantees all defer scripts have executed.
function whenDsReady(): Promise<void> {
  if (window.PolarisDesignSystem_ff4f72) return Promise.resolve();
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
}

whenDsReady().then(() => createRoot(root).render(<App />));
