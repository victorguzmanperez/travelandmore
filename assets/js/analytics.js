(() => {
  "use strict";

  const MEASUREMENT_ID = "G-EYPRHTHVPW";

  const CONSENT_KEY =
    "travelandmore.analyticsConsent.v1";

  const SCRIPT_ID =
    "travelandmore-ga4-script";

  let enabled = false;


  function readConsent() {
    try {
      return localStorage.getItem(
        CONSENT_KEY
      );
    } catch {
      return null;
    }
  }


  function hasConsent() {
    return readConsent() === "granted";
  }


  function isDebugMode() {
    return new URLSearchParams(
      window.location.search
    ).get("ga_debug") === "1";
  }


  function isLocalHost() {
    return (
      window.location.hostname === "localhost"
      || window.location.hostname === "127.0.0.1"
    );
  }


  function canLoadGoogle() {
    if (!hasConsent()) {
      return false;
    }

    if (
      isLocalHost()
      && !isDebugMode()
    ) {
      return false;
    }

    return true;
  }


  function configureGtag() {
    window.dataLayer =
      window.dataLayer || [];

    window.gtag = function gtag() {
      window.dataLayer.push(
        arguments
      );
    };

    window.gtag(
      "js",
      new Date()
    );

    const config = {
      send_page_view: true,

      allow_google_signals: false,

      allow_ad_personalization_signals:
        false,
    };

    if (isDebugMode()) {
      config.debug_mode = true;
    }

    window.gtag(
      "config",
      MEASUREMENT_ID,
      config
    );
  }


  function enable() {
    if (!canLoadGoogle()) {
      return false;
    }

    window[
      `ga-disable-${MEASUREMENT_ID}`
    ] = false;

    if (
      document.getElementById(
        SCRIPT_ID
      )
    ) {
      enabled = true;
      return true;
    }

    configureGtag();

    const script =
      document.createElement(
        "script"
      );

    script.id = SCRIPT_ID;
    script.async = true;

    script.src =
      "https://www.googletagmanager.com/gtag/js?id="
      + encodeURIComponent(
        MEASUREMENT_ID
      );

    document.head.append(
      script
    );

    enabled = true;

    return true;
  }


  function disable() {
    window[
      `ga-disable-${MEASUREMENT_ID}`
    ] = true;

    enabled = false;
  }


  function track(
    eventName,
    parameters = {}
  ) {
    if (
      !hasConsent()
      || !enabled
      || typeof window.gtag !== "function"
    ) {
      return false;
    }

    window.gtag(
      "event",
      eventName,
      parameters
    );

    return true;
  }


  function isEnabled() {
    return enabled;
  }


  window.TravelMoreAnalytics = {
    measurementId: MEASUREMENT_ID,
    consentKey: CONSENT_KEY,
    enable,
    disable,
    track,
    hasConsent,
    isEnabled,
  };


  window.addEventListener(
    "travelandmore:analytics-consent",
    (event) => {
      const value =
        event.detail?.value;

      if (value === "granted") {
        enable();
        return;
      }

      disable();
    }
  );


  if (hasConsent()) {
    enable();
  }
})();
