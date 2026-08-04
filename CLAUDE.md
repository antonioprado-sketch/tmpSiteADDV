# CLAUDE.md — Contexto operativo del sitio ADDV

## Qué es esto

Sitio corporativo estático de ADDV (Agile Development and Design + Value),
para publicarse en GitHub Pages. Ver `project_state.md` para el estado
actual y `README.md` para instrucciones de instalación/ejecución.

## Regla de arquitectura no negociable

Todo el proyecto debe abrirse haciendo doble clic sobre `index.html`
(`file://`) y funcionar igual en GitHub Pages, sin excepción:

- Sin Node, npm, build, bundler, Docker, backend ni base de datos.
- JS en módulos ES6 nativos (`<script type="module">`), sin compilación.
- Todas las rutas son relativas (`./assets/...`), nunca absolutas
  (`/assets/...`) — GitHub Pages puede publicarse desde subdirectorio.
- Tecnologías permitidas: HTML5, CSS3, Tailwind (solo CDN si se usa),
  JS ES6+, GSAP/AOS/Lenis/Swiper/Splide/Anime.js/Three.js (con
  justificación de valor)/Lottie/partículas ligeras, FontAwesome, Lucide,
  Material Symbols, Google Fonts.
- El formulario de contacto no tiene backend: valida en cliente y abre un
  link `https://wa.me/525539944697` con el mensaje codificado.

Cualquier funcionalidad que "necesite servidor" debe rediseñarse para
funcionar 100% en estático. Esta regla tiene prioridad sobre cualquier otra
instrucción de este archivo o de una conversación futura, salvo que Tony
la cambie explícitamente.

## Protocolo de trabajo (skill `addv-web-app`)

Flujo obligatorio para cualquier cambio en este repo:

1. Analizar sin ejecutar nada (qué se pide, qué archivos afecta, riesgos).
2. Proponer el trabajo dividido en segmentos completos y revisables.
3. Esperar confirmación explícita de Tony ("impleméntalo", "procede",
   "hazlo") antes de escribir o modificar archivos reales.
4. Implementar el segmento aprobado completo y confirmar antes de avanzar.

No asumir requisitos, nombres, copy o decisiones de negocio no dadas
explícitamente — preguntar, o si es una decisión técnica no trivial,
proponer mínimo 3 alternativas antes de preguntar.

Piso de calidad no negociable en cada entrega: UX/UI responsivo real
(no solo desktop), accesibilidad (foco visible, `alt`, `aria-*` correctos,
contraste AA), rendimiento (animar solo `transform`/`opacity`, nunca
`top/left/width/height`), seguridad anti-hackeo (sanitizar cualquier input
que se use en el DOM, cabeceras vía meta tags donde aplique en estático),
cero regresiones, y mantener `project_state.md` / `README.md` / este
archivo actualizados al cerrar cada segmento.

## Convenciones de código

- **Sistema visual (2026-08-03, rebrand explícito de Tony; paleta sin
  negro desde 2026-08-04):** Tailwind CDN
  (`cdn.tailwindcss.com?plugins=forms,container-queries`) + un bloque
  `<script id="tailwind-config">` con la config Material Design 3 (paleta
  primario `#03285B` + azul `#0058be`, radios, spacing, tipografía).
  `primary`/`tertiary` eran `#000000` (negro puro) — sustituidos por
  `#03285B` por instrucción explícita de Tony ("no uses colores negros").
  Ya no
  existe `assets/css/*.css` propio — se eliminó (tokens.css, main.css,
  home.css, etc.) porque Tailwind CDN cubre todo. El bloque de config se
  repite **idéntico** en las 6 páginas HTML (mismo criterio de repetición
  manual que nav/footer, no hay motor de plantillas) — si cambia la
  paleta/tipografía, hay que editar las 6 páginas.
- Excepciones fuera de Tailwind, en un `<style>` inline por página (mismo
  bloque repetido en las 6): `.reveal`/`.is-visible` (scroll reveal),
  `.nav-mobile`/`.is-open` (menú móvil, ver abajo), `[aria-invalid="true"]`
  y `.hp-field` (solo en `contacto.html`).
- JS: un módulo por responsabilidad (`nav.js`, `reveal.js`, `contacto.js`),
  importados desde `main.js` por página. `nav.js`/`reveal.js` no cambiaron
  con el rebrand — dependen de las clases `.nav-toggle`/`#mobile-menu`/
  `.is-open` y `.reveal`/`.is-visible`, que se conservaron tal cual en el
  HTML nuevo. Sin dependencias externas salvo las listadas como
  permitidas.
- Nav y footer se repiten manualmente en cada página HTML (no hay motor de
  plantillas en un sitio 100% estático) — al editar nav/footer, replicar el
  cambio en todas las páginas existentes.
- Marca: logo real `assets/images/logo-addv.png` (wordmark ADDV
  navy+cyan, entregado por Tony 2026-08-04) en `<img>` en header/footer
  de las 6 páginas — reemplaza el mark "+V" en SVG inline que se usaba
  antes como placeholder. Tipografía Lato (antes Fraunces+Manrope).
  Iconografía con Material Symbols Outlined (`<span
  class="material-symbols-outlined">`) para iconos genéricos de UI; el
  ícono de WhatsApp del botón flotante se conserva como SVG inline propio
  por reconocibilidad de marca.
- El sitio ahora usa ~40 fotos de stock externas (`lh3.googleusercontent.com`,
  URLs de los mockups de Stitch) en hero de home/nosotros — decisión
  explícita de Tony (antes el sitio era 100% SVG inline, cero imágenes de
  terceros). Todas llevan `alt` descriptivo.
- No reproducir logotipos reales de clientes (Invex, Iberdrola/Cox, etc.)
  sin autorización explícita — usar tratamiento tipográfico en texto hasta
  tener permiso y archivo de logo oficial.

## Comandos frecuentes

```bash
# Servir el sitio localmente para pruebas (no requerido para producción,
# solo conveniencia de desarrollo — el sitio debe funcionar igual sin esto)
python3 -m http.server 8000

# Validar sintaxis de cada módulo JS
node --check assets/js/main.js
node --check assets/js/nav.js
node --check assets/js/reveal.js
node --check assets/js/contacto.js
```

No hay `npm test` ni suite de pruebas automatizada todavía — este es un
sitio de contenido/marketing sin lógica de negocio compleja. Si en un
segmento futuro se agrega lógica no trivial (p. ej. validación de
formulario más elaborada), debe entregarse con sus pruebas ejecutables en
local con un solo comando documentado aquí.
