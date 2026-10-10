(() => {
  "use strict";

  const CONSENT_KEY =
    "travelandmore.analyticsConsent.v1";


  function readPreference() {
    try {
      return localStorage.getItem(
        CONSENT_KEY
      );
    } catch {
      return null;
    }
  }


  function savePreference(value) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        value
      );
    } catch {
      // Sin persistencia disponible:
      // seguimos respetando la decisión
      // durante esta carga de página.
    }
  }


  function dispatchPreference(value) {
    window.dispatchEvent(
      new CustomEvent(
        "travelandmore:analytics-consent",
        {
          detail: {
            value,
          },
        }
      )
    );
  }


  function createBanner() {
    const banner =
      document.createElement(
        "section"
      );

    banner.id =
      "privacy-consent-banner";

    banner.className =
      "privacy-consent-banner";

    banner.hidden = true;

    banner.setAttribute(
      "role",
      "dialog"
    );

    banner.setAttribute(
      "aria-modal",
      "false"
    );

    banner.setAttribute(
      "aria-labelledby",
      "privacy-consent-title"
    );

    banner.innerHTML = `
      <div class="privacy-consent-banner__inner">
        <div class="privacy-consent-banner__copy">
          <strong id="privacy-consent-title">
            Privacidad en Travel &amp; More
          </strong>

          <p>
            Podemos usar Google Analytics para saber,
            de forma estadistica, como se utiliza la web
            y mejorarla. Analytics solo se carga si lo
            aceptas.
          </p>

          <div class="privacy-consent-banner__links">
            <a href="privacidad.html">
              Privacidad
            </a>

            <a href="cookies.html">
              Cookies
            </a>
          </div>
        </div>

        <div class="privacy-consent-banner__actions">
          <button
            type="button"
            class="privacy-button privacy-button--secondary"
            data-consent="denied"
          >
            Solo necesarias
          </button>

          <button
            type="button"
            class="privacy-button privacy-button--primary"
            data-consent="granted"
          >
            Aceptar Analytics
          </button>
        </div>
      </div>
    `;

    document.body.append(
      banner
    );

    return banner;
  }


  function createSettingsButton() {
    const button =
      document.createElement(
        "button"
      );

    button.type = "button";

    button.className =
      "privacy-settings-button";

    button.textContent =
      "Privacidad";

    button.setAttribute(
      "aria-label",
      "Cambiar preferencias de privacidad"
    );

    document.body.append(
      button
    );

    return button;
  }


  function boot() {
    const banner =
      createBanner();

    const settingsButton =
      createSettingsButton();

    function openBanner() {
      banner.hidden = false;
    }

    function closeBanner() {
      banner.hidden = true;
    }

    function choose(value) {
      const analyticsWasEnabled =
        window.TravelMoreAnalytics
          ?.isEnabled?.() === true;

      savePreference(
        value
      );

      dispatchPreference(
        value
      );

      closeBanner();

      if (
        value === "denied"
        && analyticsWasEnabled
      ) {
        window.location.reload();
      }
    }


    banner.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            "[data-consent]"
          );

        if (!button) {
          return;
        }

        choose(
          button.dataset.consent
        );
      }
    );


    settingsButton.addEventListener(
      "click",
      openBanner
    );


    const current =
      readPreference();

    if (
      current !== "granted"
      && current !== "denied"
    ) {
      openBanner();
    }
  }


  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {
        once: true,
      }
    );
  } else {
    boot();
  }
})();
