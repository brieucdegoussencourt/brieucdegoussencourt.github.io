// Cal.com booking configuration — one place to update.
//
// TODO (Brieuc): replace CAL_LINK below with your real Cal.com link once your
// event type exists. It's the slug shown in your event's public URL:
//   https://cal.com/<username>/<event-slug>   →   "<username>/<event-slug>"
// e.g. "brieuc-de-goussencourt/intro-call".
//
// CAL_NAMESPACE just needs to be a stable, unique string for this embed; it
// does not have to match the slug.
export const CAL_LINK = "brieuc-de-goussencourt-bwmrs2/let-s-have-a-conversation";
export const CAL_NAMESPACE = "let-s-have-a-conversation";

// Brand colour used for the modal's highlights (ink, matching the site).
export const CAL_BRAND = "#0f172a";

// ---------------------------------------------------------------------------
// Shared Cal.com wiring. Call useCalInit() once at app level, then spread
// {...calButtonProps} onto any button/link that should open the booking modal.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

/*
  The embed (script + a third-party cookie) only loads once a visitor shows
  intent: hovering, focusing or touching a booking button. A click that beats
  the load is caught and replayed as a modal once the embed is ready.
*/
const CAL_SELECTOR = "[data-cal-link]";
let calReady = null;
let embedLoaded = false; // embed.js has run, so its own click handler is live

function loadCal() {
  calReady ??= getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
    // getCalApi resolves with a queueing stub as soon as the script tag is added.
    document
      .querySelector('script[src*="cal.com/embed/embed.js"]')
      ?.addEventListener("load", () => (embedLoaded = true), { once: true });
    cal("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": CAL_BRAND } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    return cal;
  });
  return calReady;
}

export function useCalInit() {
  useEffect(() => {
    let loaded = false;
    const onIntent = (e) => {
      if (loaded || !e.target.closest?.(CAL_SELECTOR)) return;
      loaded = true;
      loadCal();
    };
    const onClick = (e) => {
      if (!e.target.closest?.(CAL_SELECTOR)) return;
      // Before the embed is ready its own click handler doesn't exist yet.
      if (embedLoaded) return;
      e.preventDefault();
      loaded = true;
      loadCal().then((cal) =>
        cal("modal", { calLink: CAL_LINK, config: { layout: "month_view" } }),
      );
    };
    const intents = ["pointerover", "focusin", "touchstart"];
    intents.forEach((t) => document.addEventListener(t, onIntent, { passive: true }));
    document.addEventListener("click", onClick);
    return () => {
      intents.forEach((t) => document.removeEventListener(t, onIntent));
      document.removeEventListener("click", onClick);
    };
  }, []);
}

export const calButtonProps = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
};
