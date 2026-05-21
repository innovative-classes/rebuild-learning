// Client-side on-demand loader for the Razorpay Checkout script.
//
// The previous approach used <Script strategy="lazyOnload">, which defers
// loading until browser idle. A user who clicked "Pay" before the script
// finished hit `window.Razorpay === undefined`, the checkout threw, and the
// popup silently never opened. This loader returns a promise that resolves
// only once `window.Razorpay` is actually available, so callers can await it.

const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: any;
  }
}

let loadPromise: Promise<boolean> | null = null;

export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<boolean>((resolve) => {
    const finish = (ok: boolean) => {
      if (!ok) loadPromise = null; // allow a retry on the next click
      resolve(ok);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SRC}"]`
    );
    if (existing) {
      if (window.Razorpay) return finish(true);
      existing.addEventListener("load", () => finish(!!window.Razorpay));
      existing.addEventListener("error", () => finish(false));
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SRC;
    script.async = true;
    script.onload = () => finish(!!window.Razorpay);
    script.onerror = () => finish(false);
    document.body.appendChild(script);
  });

  return loadPromise;
}
