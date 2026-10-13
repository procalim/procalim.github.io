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

/**
 * The inline first screen (#app-shell, in index.html) covers the page until
 * the app has painted beneath it, then fades away. It waits for its own cover
 * image, at most a couple of seconds, so that image is painted first and
 * stays the page's largest element. يختفي غطاء الشاشة الأولى بعد ظهور الموقع.
 */
const retireShell = () => {
  const shell = document.getElementById("app-shell");
  if (!shell) return;
  const cover = shell.querySelector("img");
  const imageShown = new Promise<void>((resolve) => {
    if (!cover || cover.complete) return resolve();
    cover.addEventListener("load", () => resolve(), { once: true });
    cover.addEventListener("error", () => resolve(), { once: true });
    window.setTimeout(resolve, 2500);
  });
  imageShown.then(() =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        shell.style.opacity = "0";
        shell.style.pointerEvents = "none";
        window.setTimeout(() => shell.remove(), 400);
      }),
    ),
  );
};

stylesReady().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
  retireShell();
});
