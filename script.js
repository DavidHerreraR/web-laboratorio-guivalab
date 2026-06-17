const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

const closeMenu = () => {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const openMenu = () => {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "true");
  navMenu.classList.add("is-open");
  document.body.classList.add("nav-open");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) closeMenu();
  });
}

const eventNames = {
  whatsapp: "whatsapp_click",
  phone: "phone_click",
  maps: "maps_click",
  social: "social_click",
  lead: "lead_submit"
};

const trackEvent = (eventName) => {
  if (!eventName) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName });

  // Meta Pixel: conectar aquí fbq("track", "Lead") o un evento personalizado.
  // Google Ads: conectar aquí gtag("event", "conversion", { send_to: "AW-XXXX/CONVERSION_LABEL" }).
  // Google Tag Manager: dataLayer.push({ event: eventName }) ya deja el evento disponible.
  // No enviar datos personales sensibles en eventos de analítica o publicidad.
};

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(eventNames[element.dataset.track]);
  });
});

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#")) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
});

document.querySelectorAll("form[data-track-form]").forEach((form) => {
  form.addEventListener("submit", () => {
    trackEvent(eventNames.lead);
  });
});
