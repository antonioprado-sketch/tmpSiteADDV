# project_state.md — Sitio ADDV (addv.mx)

Última actualización: Segmento 5 completado (2026-08-03) —
`casos-exito.html`. **Las 6 páginas del sitio ya existen** — ya no quedan
links internos rotos en ninguna página. Falta el checklist final
(Segmento 6: accesibilidad, performance, Lighthouse, cierre de
documentación).

Nota sobre el Segmento 1: la carpeta `assets/` y los archivos raíz
(`robots.txt`, `sitemap.xml`, `favicon.ico`) se habían perdido del disco
(no había repo git para recuperarlos); se regeneraron desde cero. **Ya se
inicializó `git`** (commit `f96afbd`) para que esto no vuelva a pasar sin
rastro — remoto pendiente de que Tony dé la URL del repo.

## Qué existe (Segmento 5 — Casos de éxito)

- `casos-exito.html`: dos secciones, por decisión explícita de Tony
  (combinar ambos formatos):
  1. **Clientes reales** — Invex (banca), Iberdrola/Cox (energía),
     ADITMEX (mentoría tecnológica), cada uno con formato Reto/Solución/
     Resultado usando solo los hechos ya confirmados en este documento
     (sin inventar métricas ni detalles no dados).
  2. **Otros ejemplos** — 4 tarjetas genéricas por industria (Energía &
     Utilities, Servicios Financieros, Logística, Emprendedores), copy
     tomado de `http://localhost:8080/casos-de-exito`, cada una marcada
     explícitamente "Ejemplo ilustrativo — caso real disponible bajo
     solicitud" (igual que el sitio real) para no confundirlas con casos
     reales. El texto de "Emprendedores" en el sitio real estaba muy
     escueto/con errores de gramática ("ayudarles a ser organizado"); se
     redactó con el mismo nivel de detalle que las otras 3 tarjetas
     ilustrativas, sin agregar hechos nuevos, solo ordenando la idea ya
     dada.
- `assets/css/casos-exito.css`: grid de tarjetas de caso con
  Reto/Solución/Resultado (`<dl>`), tag de sector para clientes reales,
  tag distinta ("Ejemplo ilustrativo") para las genéricas.
- Con esta página, **las 6 páginas del plan original ya existen** — se
  verificó que ningún link interno del sitio apunta a una página
  inexistente.

## Qué existe (Segmento 4 — Productos)

- `productos.html`: hero de página + 2 tarjetas de producto (Portal de
  Facturación, ADDV Fintech), copy mezclado a propósito (decisión
  explícita de Tony): estructura y tono tomados de
  `http://localhost:8080/productos`, más los matices ya confirmados antes
  en el proyecto que el sitio real ya no menciona (sin timbrado CFDI,
  colaboración con el contador del cliente, fintech de "marca blanca").
  Estatus asimétrico como estaba decidido: Portal de Facturación
  "Próximamente" (más avanzado), ADDV Fintech "En construcción".
- `assets/css/productos.css`: grid de 2 tarjetas con badge de estatus en
  pastilla dorada.
- Sin botón "Ver más" en las tarjetas — el sitio real enlaza a páginas de
  detalle por producto que no existen en el alcance de este sitio
  estático; se omitió para no crear links rotos (mismo criterio que con
  "Recursos").

## Qué existe (Segmento 3 — Servicios)

- `servicios.html`: hero de página + 7 servicios completos (título,
  descripción, 3 bullets c/u), tomados literal de
  `http://localhost:8080/servicios`: Desarrollo de Software, Business
  Intelligence, Arquitectura & Cloud, UX/UI Design, Integración &
  Automatización, Soporte & Mantenimiento, **Consultoría SAP**. Nota: el
  footer-nav del propio sitio real solo lista 6 (omite "Consultoría SAP")
  — inconsistencia de ellos, no nuestra; aquí se listan los 7 que sí
  aparecen en el contenido de la página real.
- `assets/css/servicios.css`: lista vertical de servicios con bullets
  (viñeta punteada en oro, sin iconos por servicio — el HTML real no traía
  iconos recuperables en el texto extraído).
- Cada servicio tiene `id` ancla (`#desarrollo-de-software`, etc.) por si
  se quiere enlazar directo desde el teaser de home más adelante.
- **Botón CTA "Hablemos" en el header**, agregado a las 4 páginas
  existentes (`index.html`, `nosotros.html`, `contacto.html`,
  `servicios.html`): visible en desktop junto al nav (`.nav-cta`), y como
  botón de ancho completo al final del menú móvil (`.nav-mobile-cta`).
  Enlaza a `contacto.html` en todas.

## Qué existe (Segmento 2 — Nosotros y Contacto)

- `nosotros.html`: hero de página, sección "Propósito", 5 "Pilares de
  marca" (Confianza absoluta, Inteligencia estratégica, Excelencia
  técnica, Innovación con impacto, Resultados que perduran), banda CTA a
  contacto. Copy tomado literal de `http://localhost:8080/nosotros`
  (versión más reciente/completa del sitio real que la que sirve
  `www.addv.mx` en vivo — ver nota abajo).
- `contacto.html`: formulario con 6 campos, todos obligatorios (Nombre,
  Correo electrónico, Teléfono, Empresa, Sitio web, Mensaje — el campo de
  sitio web y el que todos sean obligatorios ya estaba decidido; el resto
  del set de campos lo confirmó Tony en este segmento). Incluye campo
  honeypot invisible (`#hp-website`) como anti-spam. Al enviar: valida en
  cliente (formato de correo/URL, campos vacíos, mensajes de error
  accesibles vía `role="alert"` + `aria-invalid`), arma el mensaje y abre
  `https://wa.me/525539944697?text=...` en pestaña nueva — sin backend.
  Panel lateral con WhatsApp directo, correo, oficina principal y oficina
  adicional.
- `assets/css/nosotros.css`, `assets/css/contacto.css`: estilos
  específicos de cada página (`.pillars-*`, `.contact-*`), siguiendo la
  convención de un CSS por página.
- `assets/css/main.css` ganó bloques compartidos nuevos: `.page-hero` /
  `.page-lede` (reutilizable en cualquier página interna), `.form-field` /
  `.field-error` / `.hp-field` (formularios), y `.cta-band` (se movió
  desde `home.css` porque ahora la usan 2 páginas — home y nosotros).
- `assets/js/contacto.js`: módulo nuevo, responsabilidad única (validación
  + honeypot + construcción del link de WhatsApp). Se referencia con un
  `<script type="module">` adicional solo en `contacto.html`; `main.js`
  (nav + reveal) se mantiene genérico para todas las páginas.
- Botón flotante de WhatsApp (`.wa-float`) agregado a **las 3 páginas**
  existentes (`index.html`, `nosotros.html`, `contacto.html`) — decisión
  confirmada: aparece en todo el sitio, no solo en contacto.
- **Footer sincronizado en las 3 páginas** con datos más recientes de
  `http://localhost:8080/`: correo `contacto@addv.mx` (antes
  `info@addv.mx`), oficina adicional en Morelia además de la de Polanco,
  razón social completa "Agile Development and Design + Value, S.A. de
  C.V." (antes "...Value®").

### Nota importante — fuente de verdad del copy cambió a mitad de proyecto

`https://www.addv.mx/nosotros` responde 404 en el sitio en vivo, y
`https://www.addv.mx/por-que-addv` solo trae misión+valores (lo que ya
usamos en home desde el Segmento 1). Tony indicó copiar en su lugar de
`http://localhost:8080/` — un build Next.js local con contenido más
completo y aparentemente más nuevo (nueva oficina, nuevo correo, 6
servicios en vez de 5, nav con ítems `Recursos` y botón `Hablemos` que
no existen todavía en nuestro sitio estático). Se sincronizó lo que toca a
este segmento (footer); lo que falta por reconciliar queda en "Decisiones
pendientes" abajo.

## Qué existe (Segmento 1 — Base del proyecto)

- Estructura de carpetas completa según arquitectura obligatoria (`assets/css`,
  `assets/js`, `assets/images`, `assets/icons`, `assets/fonts`, `assets/videos`,
  `prompts/`).
- Sistema de tokens de diseño (`assets/css/tokens.css`): paleta navy + oro
  (consistente con la identidad ya usada por ADDV en sus propuestas
  comerciales), tipografía Fraunces (display) + Manrope (texto), escala
  tipográfica fluida, escala de espaciado de 8px.
- `assets/css/main.css`: reset, layout base, header/nav (con menú móvil
  accesible), footer, botones, reveal-on-scroll, `prefers-reduced-motion`.
- `assets/css/home.css`: estilos específicos de home (hero, franja de
  partners, tarjetas de servicios, sección de valores, CTA).
- `assets/js/main.js`, `nav.js`, `reveal.js`: módulos ES6 sin bundler.
  Menú móvil accesible (`aria-expanded`, cierre con Escape) y reveal-on-scroll
  vía `IntersectionObserver` animando solo `transform`/`opacity`.
- `index.html`: home completo — hero, franja de clientes (Invex, Iberdrola/Cox,
  ADITMEX, Dentool, CashClick — en texto, sin reproducir logotipos reales de
  terceros sin autorización), teaser de servicios, sección "por qué ADDV"
  (misión + 6 valores, tomados del sitio real), banda CTA, footer completo
  (dirección, teléfono, correo, redes sociales — datos tomados del sitio real).
- Marca visual: mark "+V" propio en SVG inline (sin dependencia de imagen
  externa), favicon SVG + `favicon.ico` generado como fallback.
- `robots.txt`, `sitemap.xml` (con las 6 páginas planeadas).
- `prompts/image-prompts.md`: placeholder — el sitio no usa fotografía de
  terceros; documenta qué se necesitaría si se decide incorporarla más
  adelante, y advierte no usar logos reales de clientes sin autorización.

## Pruebas realizadas sobre el Segmento 5

- Verificación por filesystem: `casos-exito.html` y
  `assets/css/casos-exito.css` existen en disco.
- Sanity check por grep: exactamente un `<h1>`, `lang="es"` presente,
  `aria-controls="mobile-menu"` apunta a un id real, 21 `<dt>` y 21 `<dd>`
  (balanceados, 7 tarjetas × 3 pares Reto/Solución/Resultado).
- Verificado que las 6 páginas del sitio ya se referencian entre sí sin
  links rotos (`casos-exito.html` aparecía ya en el nav/footer de las 5
  páginas anteriores).
- Sin JS nuevo en este segmento.

## Pruebas realizadas sobre el Segmento 4

- Verificación por filesystem: `productos.html` y
  `assets/css/productos.css` existen en disco.
- Sanity check por grep: exactamente un `<h1>`, `lang="es"` presente,
  `aria-controls="mobile-menu"` apunta a un id real, `sitemap.xml` ya
  listaba `productos.html`.
- Sin JS nuevo en este segmento.

## Pruebas realizadas sobre el Segmento 3

- Verificación por filesystem: `servicios.html` y
  `assets/css/servicios.css` existen en disco.
- Sanity check por grep: exactamente un `<h1>`, `lang="es"` presente,
  `aria-controls="mobile-menu"` apunta a un id real.
- Sin JS nuevo en este segmento (nada que validar con `node --check`).

## Pruebas realizadas sobre el Segmento 2

- Sintaxis JS validada (`node --check`) en `contacto.js` — sin errores.
- Verificación por filesystem: `nosotros.html`, `contacto.html`,
  `assets/css/nosotros.css`, `assets/css/contacto.css`,
  `assets/js/contacto.js` existen en disco.
- Sanity check por grep: exactamente un `<h1>` por página, `lang="es"`
  presente, `aria-controls="mobile-menu"` apunta a un id real en ambas
  páginas, cada `<label for="...">` del formulario tiene su `id`
  correspondiente en el input (7 pares, incluyendo el honeypot).
- Pendiente (igual que Segmento 1): smoke test HTTP real con servidor
  local y revisión visual en navegador — sigue bloqueado por no tener un
  intérprete Python real en el PATH de este entorno.

## Pruebas realizadas sobre el Segmento 1

- Sintaxis JS validada (`node --check`) en los 3 módulos — sin errores.
- Verificación por filesystem: los 11 archivos/rutas referenciados por
  `index.html` (`./assets/css/*.css`, `./assets/js/main.js`,
  `./assets/icons/favicon.svg`, `./favicon.ico`) existen en disco.
- No fue posible levantar `python3 -m http.server` en este entorno (el
  `python3` del PATH es el stub de Microsoft Store, sin intérprete real
  instalado) — pendiente smoke test HTTP real y revisión visual en
  navegador (Lighthouse, consola, responsive) la próxima vez que se
  trabaje en una máquina con Python/servidor local disponible.

## Decisiones ya tomadas (confirmadas por Tony)

- Sitio 100% estático, sin Docker, sin build, compatible con `file://` y
  GitHub Pages.
- Sin frameworks/bundlers; JS en módulos ES6 nativos.
- Formulario de contacto SÍ usa WhatsApp (`https://wa.me/525539944697`),
  todos los campos obligatorios, incluye campo separado para el link del
  sitio web oficial del prospecto.
- Casos de éxito confirmados: Invex (banca en línea, UX evitó deserción),
  Iberdrola/Cox (portal antes inoperante, UX lo simplificó y aumentó
  rendimiento), ADITMEX (mentoría tecnológica, aumento de casos de éxito en
  ventas y eficiencia) + trabajo previo de propuestas ADDV. (Segmento 5:
  implementados, combinados con 4 ejemplos ilustrativos genéricos por
  decisión explícita.)
- Productos confirmados: portal de facturación para emprendedores (sin
  timbrado CFDI, foco en gestión organizada/madurez tecnológica con su
  contador) y fintech de marca blanca — esta última se publica marcada
  "en construcción". (Segmento 4: implementado con este matiz mezclado
  sobre la estructura/tono del sitio real, por decisión explícita.)
- Copy tomado de https://www.addv.mx/ real (home, "¿Por qué ADDV?", footer,
  redes sociales) — no se inventó contenido institucional.
- (Segmento 2) Copy de `nosotros.html` y datos de contacto tomados de
  `http://localhost:8080/` (ver nota de fuente de verdad arriba) — no
  inventado.
- (Segmento 2) Campos del formulario de contacto: Nombre, Correo
  electrónico, Teléfono, Empresa, Sitio web, Mensaje — los 6 obligatorios
  (el sitio real los marca opcionales en Teléfono/Empresa, pero Tony ya
  había decidido "todos obligatorios" antes de este segmento).
- (Segmento 2) `.wa-float` aparece en todas las páginas, no solo contacto.
- (Segmento 2) Footer/marca sincronizado en las 3 páginas existentes con
  los datos de `localhost:8080` (correo, oficina adicional, razón social).

## Decisiones pendientes de confirmar con Tony

- **Abierta desde Segmento 2/3:** el teaser de servicios en home (5
  tarjetas, copy corto/genérico) quedó desactualizado frente a los 7
  servicios reales ya usados en `servicios.html` (con copy más largo y
  específico). ¿Se actualiza el teaser de home a los mismos 7 (o una
  selección de ellos con el copy real), o se deja como resumen aparte?
- **Resuelta en Segmento 3:** botón "Hablemos" en el header — sí, se
  agregó a las 4 páginas.
- **Sigue abierta:** `localhost:8080` tiene un ítem de nav "Recursos"
  (blog, guías, webinars, plantillas, FAQ) que no existe en el plan
  original de 6 páginas de este sitio estático — no se agregó (crearía un
  link roto sin página destino). ¿Se agrega al alcance como página nueva,
  o se deja fuera?
- Si se debe reemplazar el mark "+V" en SVG por un logo oficial real (no se
  proporcionó archivo de logo).

## Qué falta (próximos segmentos, ya aprobados en el plan)

6. Checklist final: accesibilidad, performance, Lighthouse, cierre de
   documentación.
