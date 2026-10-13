import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Built pages preload the app's stylesheet rather than block on it (see
 * scripts/prerender-routes.mjs). Attach it and wait for it before mounting,
 * so the inline first screen stays up until the app can appear fully styled.
 * In development Vite injects the styles itself and there is nothing to wait for.
 * ننتظر ملف التنسيق قبل إظهار الموقع، فلا يظهر أبداً بلا تنسيق.
 */
const stylesReady = (): Promise<void> => {
  const link = document.querySelector<HTMLLinkElement>("link[data-app-css]");
  if (!link) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => resolve();
    link.addEventListener("load", done, { once: true });
    link.addEventListener("error", done, { once: true });
    link.rel = "stylesheet";
    // A cached sheet can finish before the listener runs.
    if (link.sheet) resolve();
  });
};

stylesReady().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
