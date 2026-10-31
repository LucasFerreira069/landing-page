const CONFIG = {
  whatsappNumber: "5511989022544",
  whatsappDisplay: "(11) 98902-2544",
  email: "wnsmesquita@gmail.com",

  messages: {
    geral:  "Hello, teacher! Vim pelo site e gostaria de saber mais sobre as aulas de inglês.",
    plano1: "Hello, teacher! Quero contratar o plano de R$ 180,00, com uma aula por semana.",
    plano2: "Hello, teacher! Quero contratar o plano de R$ 340,00, com duas aulas por semana.",
    plano3: "Hello, teacher! Quero contratar o plano de R$ 480,00, com três aulas por semana.",
    experimental: "Hello, teacher! Gostaria de agendar uma aula experimental de inglês."
  }
};


function buildWhatsAppLink(key) {
  const text = CONFIG.messages[key] || CONFIG.messages.geral;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = buildWhatsAppLink(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});


const footerPhone = document.getElementById("footerPhone");
if (footerPhone) footerPhone.textContent = CONFIG.whatsappDisplay;

const footerEmail = document.getElementById("footerEmail");
if (footerEmail) {
  footerEmail.textContent = CONFIG.email;
  footerEmail.href = `mailto:${CONFIG.email}`;
}

document.getElementById("year").textContent = new Date().getFullYear();


if (window.lucide) lucide.createIcons();


const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) setMenu(false);
});


const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObserver.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}


const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}