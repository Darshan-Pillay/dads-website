import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/site.css';

// The Polaris design system bundle (public/_ds/_ds_bundle.js) references
// React as a bare global identifier inside its component definitions.
// Expose React on window so those components resolve it at render time.
window.React = React;

createRoot(document.getElementById('root')).render(<App />);
