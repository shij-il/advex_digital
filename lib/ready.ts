/** Run `cb` once the loading intro has finished (or right away if it already has). Returns an unsubscribe fn. */
export function onReady(cb: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.dataset.ready === "1") {
    cb();
    return () => {};
  }
  window.addEventListener("advex:ready", cb, { once: true });
  return () => window.removeEventListener("advex:ready", cb);
}
