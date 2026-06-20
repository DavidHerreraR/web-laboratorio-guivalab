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

const serviceHubContent = {
  medicina: {
    title: "Medicina general",
    description: "Atención médica integral para evaluación inicial, control de síntomas, seguimiento y orientación preventiva.",
    bullets: [
      "Consulta para molestias frecuentes y controles de salud.",
      "Valoración inicial y derivación cuando sea necesario.",
      "Orientación clara para pacientes y familias."
    ]
  },
  ginecologia: {
    title: "Consultas ginecológicas",
    description: "Atención para salud femenina, controles preventivos, molestias ginecológicas y seguimiento según cada etapa.",
    bullets: [
      "Controles ginecológicos y orientación preventiva.",
      "Atención de síntomas, ciclos y salud reproductiva.",
      "Acompañamiento profesional con trato cercano."
    ]
  },
  urologia: {
    title: "Consultas urológicas",
    description: "Evaluación urológica para molestias urinarias, controles preventivos y seguimiento médico especializado.",
    bullets: [
      "Valoración de síntomas urinarios y molestias relacionadas.",
      "Controles preventivos para hombres y mujeres.",
      "Orientación para exámenes y seguimiento."
    ]
  },
  pediatria: {
    title: "Consultas pediátricas",
    description: "Atención médica para niños y adolescentes con enfoque preventivo, control de crecimiento y orientación familiar.",
    bullets: [
      "Control de crecimiento y desarrollo.",
      "Evaluación de síntomas frecuentes en la infancia.",
      "Indicaciones claras para padres y cuidadores."
    ]
  },
  laboratorio: {
    title: "Laboratorio",
    description: "Exámenes clínicos de rutina y pruebas especializadas para apoyar diagnóstico, control y seguimiento médico.",
    bullets: [
      "Pruebas de rutina y controles clínicos.",
      "Apoyo para diagnóstico y seguimiento médico.",
      "Orientación previa sobre preparación de exámenes."
    ]
  },
  ecografia: {
    title: "Ecografía",
    description: "Servicio de imagen diagnóstica por ultrasonido para apoyar la evaluación médica de distintas condiciones.",
    bullets: [
      "Evaluaciones por ultrasonido según indicación médica.",
      "Soporte diagnóstico para controles y seguimiento.",
      "Coordinación previa para horarios y preparación."
    ]
  },
  ocupacional: {
    title: "Salud ocupacional",
    description: "Atención orientada a empresas y trabajadores para evaluaciones médicas, controles y seguimiento laboral.",
    bullets: [
      "Evaluaciones para ingreso, control o seguimiento.",
      "Soporte médico para empresas y equipos de trabajo.",
      "Coordinación de atención según necesidad empresarial."
    ]
  },
  electrocardiogramas: {
    title: "Electrocardiogramas",
    description: "Estudio para registrar la actividad eléctrica del corazón y apoyar controles cardiovasculares.",
    bullets: [
      "Apoyo para evaluación cardiovascular inicial.",
      "Registro de actividad eléctrica cardíaca.",
      "Atención coordinada con consulta médica cuando aplique."
    ]
  },
  cardiologia: {
    title: "Cardiología",
    description: "Consulta especializada para valoración, control y seguimiento de la salud cardiovascular.",
    bullets: [
      "Control y seguimiento de factores de riesgo.",
      "Valoración de síntomas cardiovasculares.",
      "Acompañamiento especializado para cuidado del corazón."
    ]
  }
};

const serviceHubTabs = document.querySelectorAll(".service-tab[data-service]");
const serviceFeature = document.querySelector(".service-feature");
const serviceFeatureTitle = document.querySelector("#service-feature-title");
const serviceFeatureDescription = document.querySelector("#service-feature-description");
const serviceFeatureList = document.querySelector("#service-feature-list");

const getServiceHubColumnCount = () => {
  if (!serviceFeature || !serviceFeature.parentElement) return 1;

  const columns = window.getComputedStyle(serviceFeature.parentElement).gridTemplateColumns;
  return Math.max(1, columns.split(" ").filter(Boolean).length);
};

const moveServiceFeatureAfterSelectedRow = (selectedTab) => {
  if (!serviceFeature) return;

  const tabs = Array.from(serviceHubTabs);
  const selectedIndex = tabs.indexOf(selectedTab);
  if (selectedIndex < 0) return;

  const columns = getServiceHubColumnCount();
  const rowEndIndex = Math.min(tabs.length - 1, selectedIndex + columns - 1 - (selectedIndex % columns));
  tabs[rowEndIndex].after(serviceFeature);
};

const setActiveService = (selectedTab) => {
  const serviceKey = selectedTab.dataset.service;
  const serviceContent = serviceHubContent[serviceKey];
  if (!serviceContent || !serviceFeature || !serviceFeatureTitle || !serviceFeatureDescription || !serviceFeatureList) return;

  const isAlreadyOpen = selectedTab.classList.contains("service-tab-active") && !serviceFeature.classList.contains("is-collapsed");

  serviceHubTabs.forEach((tab) => {
    tab.classList.remove("service-tab-active");
    tab.setAttribute("aria-expanded", "false");
    const stateIcon = tab.querySelector("span");
    if (stateIcon) stateIcon.textContent = "+";
  });

  if (isAlreadyOpen) {
    serviceFeature.classList.add("is-collapsed");
    return;
  }

  selectedTab.classList.add("service-tab-active");
  selectedTab.setAttribute("aria-expanded", "true");
  const selectedIcon = selectedTab.querySelector("span");
  if (selectedIcon) selectedIcon.textContent = "×";

  moveServiceFeatureAfterSelectedRow(selectedTab);
  serviceFeatureTitle.textContent = serviceContent.title;
  serviceFeatureDescription.textContent = serviceContent.description;
  serviceFeatureList.replaceChildren(
    ...serviceContent.bullets.map((bullet) => {
      const item = document.createElement("li");
      item.textContent = bullet;
      return item;
    })
  );
  serviceFeature.classList.remove("is-collapsed");
};

serviceHubTabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveService(tab));
});

const activeServiceHubTab = document.querySelector(".service-tab-active[data-service]");
if (activeServiceHubTab) {
  moveServiceFeatureAfterSelectedRow(activeServiceHubTab);
}

let serviceHubResizeFrame = 0;
window.addEventListener("resize", () => {
  window.cancelAnimationFrame(serviceHubResizeFrame);
  serviceHubResizeFrame = window.requestAnimationFrame(() => {
    const activeTab = document.querySelector(".service-tab-active[data-service]");
    if (activeTab && serviceFeature && !serviceFeature.classList.contains("is-collapsed")) {
      moveServiceFeatureAfterSelectedRow(activeTab);
    }
  });
});

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
