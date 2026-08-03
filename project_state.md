# project_state.md — Sitio ADDV (addv.mx)

Última actualización: Segmento 1 reconstruido (2026-08-03) — la carpeta
`assets/` y los archivos raíz (`robots.txt`, `sitemap.xml`, `favicon.ico`)
se habían perdido del disco (no había repo git para recuperarlos); se
regeneraron desde cero siguiendo exactamente lo descrito en este documento
y las clases/variables ya usadas por `index.html`.

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

## Pruebas realizadas sobre este segmento

- Sintaxis JS validada (`node --check`) en los 3 módulos — sin errores.
- Verificación por filesystem: los 11 archivos/rutas referenciados por
  `index.html` (`./assets/css/*.css`, `./assets/js/main.js`,
  `./assets/icons/favicon.svg`, `./favicon.ico`) existen en disco.
- No fue posible levantar `python3 -m http.server` en este entorno (el
  `python3` del PATH es el stub de Microsoft Store, sin intérprete real
  instalado) — pendiente smoke test HTTP real y revisión visual en
  navegador (Lighthouse, consola, responsive) la próxima vez que se
  trabaje en una máquina con Python/servidor local disponible.
- Pendiente: smoke test DOM (jsdom) que sí corrió en la versión anterior
  de este segmento — no se repitió aquí porque no hay evidencia de que
  jsdom siga instalado tras la pérdida de archivos; verificar antes de
  asumir que sigue disponible.

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
  ventas y eficiencia) + trabajo previo de propuestas ADDV.
- Productos confirmados: portal de facturación para emprendedores (sin
  timbrado CFDI, foco en gestión organizada/madurez tecnológica con su
  contador) y fintech de marca blanca — esta última se publica marcada
  "en construcción".
- Copy tomado de https://www.addv.mx/ real (home, "¿Por qué ADDV?", footer,
  redes sociales) — no se inventó contenido institucional.

## Decisiones pendientes de confirmar con Tony

- Detalle de copy y estructura interna de `servicios.html` (¿listar más
  servicios de los 5 usados en el teaser de home, o son los mismos?).
- Si el botón flotante de WhatsApp (clase `.wa-float` ya definida en CSS,
  no usada todavía) debe aparecer en todas las páginas o solo en contacto.
- Si se debe reemplazar el mark "+V" en SVG por un logo oficial real (no se
  proporcionó archivo de logo).

## Qué falta (próximos segmentos, ya aprobados en el plan)

2. `nosotros.html` y `contacto.html` (formulario WhatsApp).
3. `servicios.html`.
4. `productos.html`.
5. `casos-exito.html`.
6. Checklist final: accesibilidad, performance, Lighthouse, cierre de
   documentación.
