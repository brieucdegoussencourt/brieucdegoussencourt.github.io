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
export const CAL_BRAND = "#18181b";

// ---------------------------------------------------------------------------
// Shared Cal.com wiring. Call useCalInit() once at app level, then spread
// {...calButtonProps} onto any button/link that should open the booking modal.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function useCalInit() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": CAL_BRAND } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
}

export const calButtonProps = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
};
