// contacto.js — validación de formulario y envío vía WhatsApp, sin backend

const WHATSAPP_NUMBER = "525539944697";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    nombre: { input: form.nombre, error: document.getElementById("err-nombre"), label: "Nombre" },
    correo: { input: form.correo, error: document.getElementById("err-correo"), label: "Correo electrónico" },
    telefono: { input: form.telefono, error: document.getElementById("err-telefono"), label: "Teléfono" },
    empresa: { input: form.empresa, error: document.getElementById("err-empresa"), label: "Empresa" },
    sitio: { input: form.sitio, error: document.getElementById("err-sitio"), label: "Sitio web" },
    mensaje: { input: form.mensaje, error: document.getElementById("err-mensaje"), label: "Mensaje" },
  };

  function setFieldError(key, message) {
    const { input, error } = fields[key];
    error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateField(key) {
    const { input, label } = fields[key];
    const value = input.value.trim();

    if (!value) {
      setFieldError(key, `${label} es obligatorio.`);
      return false;
    }
    if (key === "correo" && !EMAIL_RE.test(value)) {
      setFieldError(key, "Ingresa un correo válido.");
      return false;
    }
    if (key === "sitio" && !URL_RE.test(value)) {
      setFieldError(key, "Ingresa un sitio web válido (ej. https://ejemplo.com).");
      return false;
    }

    setFieldError(key, "");
    return true;
  }

  function buildWhatsAppUrl() {
    const message = [
      `Hola ADDV, soy ${fields.nombre.input.value.trim()}.`,
      `Correo: ${fields.correo.input.value.trim()}`,
      `Teléfono: ${fields.telefono.input.value.trim()}`,
      `Empresa: ${fields.empresa.input.value.trim()}`,
      `Sitio web: ${fields.sitio.input.value.trim()}`,
      `Mensaje: ${fields.mensaje.input.value.trim()}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Honeypot: campo trampa invisible para personas, si un bot lo llena se descarta el envío.
    const honeypot = form.querySelector("#hp-website");
    if (honeypot && honeypot.value.trim() !== "") return;

    const results = Object.keys(fields).map((key) => ({ key, valid: validateField(key) }));
    const firstInvalid = results.find((result) => !result.valid);
    if (firstInvalid) {
      fields[firstInvalid.key].input.focus();
      return;
    }

    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
    form.reset();
    Object.keys(fields).forEach((key) => setFieldError(key, ""));
  });
}

initContactForm();
