# project_state.md — Sitio ADDV (addv.mx)

Última actualización: **Segunda ronda de fix de rendimiento (2026-08-09, tarde)**

- **Contexto**: tras la primera ronda (ver abajo), Lighthouse mobile de `index.html`
  subió de Performance 57→57 (aún 57, pero render-blocking savings bajó de 7.78s a
  450ms, cache lifetimes de 778 a 48 KiB, image delivery de 862 a 31 KiB — mejoras
  reales aunque el score compuesto no se movió todavía) y agregó "Reduce unused
  JavaScript — 38 KiB".
- **Plugin `container-queries` de Tailwind CDN eliminado** (`?plugins=forms,container-queries`
  → `?plugins=forms`) en las 6 páginas — cero uso de `@container`/`@sm:` etc. en todo
  el repo, confirmado por grep. Reduce el JS no usado sin tocar el modo de carga
  (sigue siendo CDN).
- **Preconnect a `cdn.tailwindcss.com` agregado** en las 6 páginas (faltaba).
- **`defer` en el script de Tailwind CDN — probado y revertido.** Se intentó
  agregar `defer` al `<script src="https://cdn.tailwindcss.com...">` (y al
  `<script id="tailwind-config">` en paralelo, para preservar el orden de
  ejecución) para dejar de bloquear el render. **QA visual en vivo (Chrome, vía
  extensión) mostró una regresión real, no solo un flash cosmético**: los tokens
  custom del config (`gap-lg`, `margin-desktop`, etc. — cualquier spacing/fontSize
  que no existe en la escala default de Tailwind) dejaban de aplicarse — el nav
  quedaba con texto pegado sin espaciado. Causa probable: el JIT del CDN escanea
  el DOM antes de que el config custom quede asignado cuando ambos scripts se
  difieren, y no reprocesa correctamente los tokens custom después. **Revertido
  en las 6 páginas** (sin `defer` en ninguno de los dos scripts). El bloqueo de
  Tailwind CDN en el render queda como limitación conocida — no se puede resolver
  sin cambiar cómo se carga Tailwind, lo cual viola la regla "Tailwind (solo CDN
  si se usa)" de `CLAUDE.md`.
- **QA visual confirmado** (extensión Chrome conectada esta sesión, contra
  `http://127.0.0.1:8123` servido con `python -m http.server`): contraste
  "valor real" en azul correcto, las 3 imágenes hero cargan de inmediato sin
  fade-in, logo nítido a tamaño real, formulario de `contacto.html` con estilos
  del plugin `forms` intactos, nav/footer sin regresiones, cero errores de
  consola en ninguna página revisada.

Última actualización anterior: **Fix de rendimiento PageSpeed Insights (2026-08-09)**

- **Contexto**: Lighthouse mobile de `index.html` daba Performance 57 (FCP 8.6s, LCP
  10.8s), con 3 causas raíz: cadena de recursos bloqueantes en `<head>` (2 stylesheets
  de Google Fonts + script síncrono de Tailwind CDN), `logo-addv.png` de 819 KB para un
  logo mostrado a 78×32px, y la imagen hero de `index.html` (LCP) siendo de terceros
  (`lh3.googleusercontent.com`) sin `width`/`height`/`fetchpriority` y envuelta en la
  clase `.reveal` (esperaba a `IntersectionObserver` + transición de 0.6s para pintar).
  También falló contraste AA en el span cyan `text-[#00BEEF]` de "valor real" (~2:1
  sobre fondo blanco).
- **Contraste**: `text-[#00BEEF]` → `text-secondary` (`#0058be`, mismo azul de
  botones/links, ya definido en el config de Tailwind) en `index.html`. Contraste
  resultante ~6.7:1.
- **Logo**: `assets/images/logo-addv.png` redimensionado de 1961×802 a 312×128px
  (4x el tamaño real de despliegue) vía `System.Drawing`/PowerShell, preservando
  transparencia. 819 KB → 13 KB. Un solo archivo, sin tocar las 6 páginas (ya
  apuntaban a la misma ruta).
- **Imágenes hero auto-hospedadas**: las 3 imágenes hero que antes venían de
  `lh3.googleusercontent.com` (`index.html`, `servicios.html`, `nosotros.html`) se
  descargaron, se re-comprimieron a JPEG calidad 80 (~32-36 KB c/u) y se guardaron
  localmente como `assets/images/hero-home.jpg`, `hero-servicios.jpg`,
  `hero-nosotros.jpg`. Cada `<img>` ahora lleva `width`/`height` explícitos y
  `fetchpriority="high"` + `loading="eager"`, y cada página tiene un
  `<link rel="preload" as="image">` de su hero en `<head>`. Se quitó la clase
  `reveal` del wrapper de la imagen hero en `index.html` y `nosotros.html` (la
  imagen LCP ya no espera a JS + animación para pintarse). El resto de las ~40
  fotos de stock externas del sitio (tarjetas de servicios/productos, etc.) se
  dejaron sin tocar — no son LCP y quedan fuera de este alcance. **Decisión de
  Tony**: reemplaza la elección previa de usar solo fotos externas, específicamente
  para estas 3 imágenes hero.
- **Fonts sin bloquear render**: en las 6 páginas, los 2 `<link rel="stylesheet">`
  de Google Fonts (Lato + Material Symbols) se cambiaron al patrón estándar
  preload + `media="print" onload` + `<noscript>` fallback — dejan de bloquear el
  primer render sin cambiar qué se carga. El script `cdn.tailwindcss.com` se dejó
  intacto (CLAUDE.md exige Tailwind solo vía CDN; agregarle `defer` causaría FOUC
  severo por ser un compilador JIT).
- **Limitación conocida — cache lifetimes**: el insight "Use efficient cache
  lifetimes" (~778 KiB) no se puede resolver desde este repo: GitHub Pages sirve
  con `Cache-Control` fijo por defecto y no hay forma de configurar headers
  (no hay `_headers`/config equivalente). La mitigación real aplicada fue bajar
  el peso de los assets pesados (logo + heroes) para que el cache corto importe
  menos.
- **Sin verificación visual en navegador**: la extensión Claude-in-Chrome no
  estaba conectada en esta sesión, así que no se pudo hacer un chequeo visual en
  vivo (`file://` o localhost) antes de publicar. Se verificó por lectura de
  código: HTML balanceado (`<noscript>` abre/cierra 1:1 en las 6 páginas), las
  4 imágenes nuevas existen en `assets/images/`, y no quedan referencias a
  `lh3.googleusercontent.com` ni al cyan viejo (`grep` en todo el repo). Recomendado
  que Tony confirme visualmente tras el deploy.

Última actualización anterior: **Favicons + logo real + paleta sin negro (2026-08-03/04)**

- **Favicons**: Tony entregó `assets/favicon_io.zip` (favicon.io) →
  extraído a `assets/icons/` (svg + apple-touch-icon + 32/16px png +
  ico + android-chrome 192/512 + `site.webmanifest`). `favicon.ico`
  suelto en raíz eliminado (consolidado en `assets/icons/`).
  `site.webmanifest` traía rutas absolutas (`/android-chrome-*.png`,
  rompían en `file://` y subdirectorio de GitHub Pages) — corregidas a
  relativas al manifest; `name`/`short_name` rellenados a "ADDV"
  (venían vacíos), `theme_color` alineado a la paleta nueva
  (`#03285B`). `<head>` de las 6 páginas actualizado con el set
  completo de `<link>` (rutas `./assets/icons/...`).
- **Logo real**: Tony entregó `Banner.png` (wordmark ADDV navy+cyan,
  1961×802, fondo blanco opaco) → copiado a
  `assets/images/logo-addv.png`. Reemplaza el mark "+V" en SVG inline +
  texto "ADDV" en header y footer de las 6 páginas (12 sitios) por
  `<img>` con `width`/`height` explícitos (evita CLS). **Cierra el
  pendiente abierto** "reemplazar el mark +V por el logo oficial" (ver
  Decisiones pendientes, abajo).
- **Paleta — negro eliminado**: por instrucción explícita de Tony, los
  tokens `primary`/`tertiary` (antes `#000000`) pasan a
  `#03285B` (color primario) en el bloque `tailwind-config` de las 6
  páginas + `theme_color` del manifest. Verificado por grep: cero
  `#000000`/`text-black`/`bg-black` en el repo.
- **`servicios.html` rediseñado** (2026-08-04): Tony pegó un mockup Stitch
  completo (hero + grid de 3 tarjetas genéricas + timeline de proceso +
  form de contacto duplicado sin backend + header/footer propios con
  links `href="#"`) con instrucción de aplicarlo y publicar sin
  preguntar más. Se adaptó en vez de pegarlo literal, por conflicto con
  reglas no negociables de `CLAUDE.md`:
  - Los 7 servicios reales (con sus `id` ancla, enlazados desde el
    teaser de `index.html`) se conservaron completos — el mockup solo
    traía 3 genéricos, adoptarlo tal cual habría borrado contenido real
    y roto los 7 links del teaser de home.
  - El `<form>` de "lead gen" del mockup no tiene backend ni JS — se
    omitió (regresión: en este sitio el único flujo de contacto válido
    es WhatsApp vía `contacto.js`, ver arquitectura no negociable). Se
    conservó el CTA a `contacto.html` ya existente.
  - Header/footer propios del mockup (links `href="#"`, sin menú móvil
    accesible, sin logo real, email falso `hello@addv.com`) se
    descartaron — se mantuvo el header/footer real compartido (nav real,
    `nav.js`/`.nav-toggle`/`#mobile-menu`, logo `logo-addv.png`, datos de
    contacto reales) para no romper accesibilidad ni consistencia con
    las otras 5 páginas.
  - `primary: "#000000"` del mockup se ignoró — ya se había resuelto a
    `#03285B` en este mismo segmento.
  - Se tomó del mockup: el estilo visual (grid de tarjetas con
    `shadow`/`hover:-translate-y-1`, franja "Nuestro Proceso" de 5 pasos
    sobre `bg-primary`) — contenido del proceso es genérico/metodológico,
    no un hecho de negocio, así que no había nada que confirmar. Sombras
    aplicadas como utilidades arbitrarias de Tailwind
    (`shadow-[0_4px_20px_-2px_rgba(3,40,91,0.04)]`) en vez de agregar
    tokens nuevos a `tailwind-config` — evita que el bloque de config
    diverja entre las 6 páginas (`CLAUDE.md`: debe ser idéntico).
  - Reveal-on-scroll reutiliza `.reveal`/`reveal.js` ya existente — no se
    agregó el script `IntersectionObserver` duplicado que traía el
    mockup.
- **`productos.html` rediseñado** (2026-08-04): mismo patrón que
  `servicios.html` — Tony pegó un mockup Stitch con hero + 3 productos
  ficticios ("ADDV DataHub", "ADDV Insights", "ADDV Sentinel", con
  features inventadas: cifrado end-to-end, arquitectura Zero-Trust,
  modelos ML) + nav/footer propios con `href="#"`. Se adaptó, no se pegó
  literal:
  - Los 2 productos reales confirmados (Portal de Facturación, ADDV
    Fintech, con su copy y badges de estatus exactos) se conservaron —
    los 3 productos del mockup son inventados, no existen, adoptarlos
    habría publicado información falsa sobre el catálogo real de ADDV.
  - Se tomó del mockup: estilo de hero (badge + headline grande + 2
    botones), estilo de tarjeta (`shadow`/`hover:-translate-y-1`,
    icono en badge redondeado) — mismo lenguaje visual ya aplicado en
    `servicios.html` (sombras `rgba(3,40,91,...)`, alineadas a
    `#03285B`).
  - Sin fotos de stock nuevas (el mockup traía 4 imágenes
    `lh3.googleusercontent.com` genéricas con `alt` placeholder tipo "A
    macro shot of...") — no hay fotografía real de los productos (no
    existen aún) y agregar stock sin relación real no estaba entre las
    decisiones ya tomadas para esta página.
  - `primary: "#000000"` del mockup, ignorado (ya resuelto a `#03285B`).
    Header/footer/nav del mockup (`href="#"`, sin logo real, sin menú
    móvil accesible), descartados — se mantuvo el header/footer
    compartido real de las 6 páginas.
  - Botón "Ver productos" enlaza a `#catalogo` (ancla real en la misma
    página); "Hablemos" a `contacto.html` — ambos funcionales, a
    diferencia de los botones `href="#"` del mockup.
- **`servicios.html`**: imagen de fondo decorativa del hero (red/circuito
  tecnológico, `opacity-20`, `alt=""` por ser puramente decorativa) —
  Tony pidió explícitamente agregarla tras ver que faltaba vs. el mockup
  Stitch original. Sin cambio de contenido, solo visual.
- **`nosotros.html` — Nuestra Experiencia + Nuestra Misión** (2026-08-04):
  Tony volvió a pedir el mockup Stitch de Nosotros "exactamente igual",
  esta vez confirmando explícitamente incluir también las secciones que
  la primera vez se habían dejado fuera por precaución. Se agregaron:
  - **Nuestra Experiencia**: 3 tarjetas de cifras (15+ años en el
    mercado, 500+ proyectos entregados, 250+ clientes corporativos).
    Son cifras del mockup que Tony pegó y confirmó dos veces — a
    diferencia de una suposición propia, esto es contenido de negocio
    que el dueño del proyecto proporcionó explícitamente. **Sin
    verificar**: si estas cifras son exactas o aproximadas — Tony debe
    confirmar/corregir los números reales antes de que esto se
    considere dato definitivo de marketing.
  - **Nuestra Misión + Valores** (Precisión, Confiabilidad,
    Transparencia, Evolución): agregado como sección nueva junto a
    "Propósito" (intacto, sin tocar su copy) y "Pilares de marca"
    (intacto, sin tocar) — quedan 3 bloques de valores/misión en la
    página (Propósito, Pilares de marca, Misión+Valores), algo
    redundante en contenido pero es lo que Tony pidió explícitamente
    ("el resto igual"), no una decisión propia.
  - Ambas secciones nuevas llevan `.reveal` (mismo sistema de scroll
    reveal que ya usa el resto del sitio vía `reveal.js`/
    `IntersectionObserver`) — "animación emergente" pedida por Tony.
  - **Deliberadamente NO agregado**: la sección "Equipo Directivo" del
    mockup (4 ejecutivos ficticios con nombre inventado — "Elena
    Rostova CEO", "David Chen CTO", "Sarah Jenkins COO", "Mateo García
    VP Design" — y fotos de stock de personas reales atribuidas a esas
    identidades falsas). A diferencia de las cifras de negocio (que
    Tony puede confirmar/corregir como dueño de esos datos), esto es
    cualitativamente distinto: publicar en el sitio real de ADDV fotos
    de personas reales (modelos de stock) presentadas como ejecutivos
    con nombres inventados es una posible falsificación de identidad
    con riesgo legal/reputacional, independientemente de quién lo pida.
    **Pendiente de decisión de Tony**: si quiere esta sección, debe ser
    con datos/fotos reales del equipo directivo real de ADDV.
- **Publicado en GitHub Pages** — ver sección de despliegue más abajo.

Última actualización de rebrand: **Rebrand completo (2026-08-03)** — las 6 páginas
migradas de CSS propio (tokens.css/main.css/*.css, navy+oro, Fraunces+
Manrope) a Tailwind CDN con paleta Material Design 3 (negro+azul
`#0058be`, Lato), por decisión explícita de Tony a partir de mockups de
Stitch. Repo ya vive en
[github.com/antonioprado-sketch/tmpSiteADDV](https://github.com/antonioprado-sketch/tmpSiteADDV)
(remoto agregado y sincronizado — commits `95d6898` rebrand,
`c8d4636` fix de accesibilidad post-rebrand).

## Rebrand — qué cambió y qué no

**Se reemplazó:**
- Sistema CSS: `assets/css/tokens.css`/`main.css`/`home.css`/`nosotros.css`/
  `contacto.css`/`servicios.css`/`productos.css`/`casos-exito.css`
  **eliminados** (ya no los referencia ninguna página). Ahora: Tailwind CDN
  + un bloque `<script id="tailwind-config">` idéntico repetido en las 6
  páginas (mismo criterio manual que nav/footer — sin motor de plantillas).
- Paleta: navy+oro → negro `#000000` + azul `#0058be` (tokens Material
  Design 3, ver `CLAUDE.md`).
- Tipografía: Fraunces (display) + Manrope (texto) → Lato única.
- Iconografía: SVG inline propios → Material Symbols Outlined para iconos
  genéricos de UI (menú, check, send, etc.).
- El sitio pasó de cero imágenes de terceros a ~40 fotos de stock externas
  (`lh3.googleusercontent.com`, URLs de los mockups de Stitch) en hero de
  home y nosotros — decisión explícita de Tony.
- El mark "+V" propio se conservó (Tony no dio logo real todavía),
  recoloreado a la paleta nueva.

**Se conservó sin cambios:**
- Todo el contenido real ya aprobado: 7 servicios (con bullets), 3
  clientes reales (Invex, Iberdrola/Cox, ADITMEX) + 4 ejemplos
  ilustrativos, 2 productos, datos de contacto/oficinas/redes.
- `nav.js`/`reveal.js`/`contacto.js` — sin tocar. El HTML nuevo conserva
  las clases/ids exactos que estos scripts esperan (`.nav-toggle`,
  `#mobile-menu`, `.is-open`, `.reveal`/`.is-visible`, ids de campos de
  formulario `f-nombre`/`f-correo`/etc. y honeypot `hp-website`).
- El flujo de contacto sigue siendo 100% WhatsApp sin backend.

**Verificado después del rebrand:**
- 10 pares de contraste texto/fondo de la paleta nueva calculados
  (fórmula WCAG) — todos pasan AA (mínimo 5.88:1). Sin fixes necesarios,
  a diferencia del checklist del Segmento 6 (que sí encontró fallos en la
  paleta vieja).
- `.nav-toggle` (botón de menú móvil) no tenía tamaño explícito en el
  primer pase del rebrand — el ícono quedaba suelto sin caja, bajo
  44×44px. Corregido (`w-11 h-11`) en las 6 páginas.
- Sintaxis JS (`node --check`) en los 4 módulos — sin errores.
- Jerarquía de encabezados (`h1`→`h2`→`h3`, sin saltos), `lang="es"`,
  `id="main"`/`id="mobile-menu"` únicos, 0 links internos rotos, anchors
  de servicios (`#desarrollo-de-software` etc.) y pares label/id del
  formulario — todo verificado por página, igual que en el Segmento 6.

**Pendiente / no verificado:**
- Lighthouse y revisión visual real en navegador — sigue bloqueado por no
  tener un intérprete Python funcional en el PATH de este entorno.
- Tailwind CDN es una dependencia de red en runtime que el sitio no tenía
  antes (antes cargaba con CSS propio, funcionaba 100% offline salvo
  Google Fonts). Si `file://` sin internet es un caso de uso real para
  Tony, esto es una regresión a tener en cuenta.

## Historia previa (Segmentos 1–6, arquitectura CSS propia — ya reemplazada)

Nota sobre el Segmento 1: la carpeta `assets/` y los archivos raíz
(`robots.txt`, `sitemap.xml`, `favicon.ico`) se habían perdido del disco
(no había repo git para recuperarlos); se regeneraron desde cero. **Ya se
inicializó `git`** (commit `f96afbd`) para que esto no vuelva a pasar sin
rastro.

## Qué existe (Segmento 6 — Checklist final de calidad)

Auditoría de accesibilidad (WCAG 2.1 AA) y performance sobre las 6
páginas, usando las skills `web-performance-accessibility` y
`low-impact-motion`. Se calcularon ratios de contraste reales (fórmula
WCAG de luminancia relativa) para cada par texto/fondo del sistema de
diseño — no se asumió visualmente.

**Bugs de accesibilidad encontrados y corregidos:**

- **Contraste insuficiente** en 3 usos de `--color-gold-600` como color de
  texto: `.eyebrow` (3.19:1 sobre `--color-paper`), `.case-tag`/
  `.product-status` (2.95:1 sobre `--color-gold-100`), y
  `.case-details dt` (3.51:1 sobre blanco) — los tres por debajo del 4.5:1
  requerido (el texto es `fs-xs`/`fs-sm` en negritas, no califica como
  "texto grande" bajo WCAG). **Fix:** nuevo token `--color-gold-700`
  (`#7A5D16`), que da ≥5.1:1 en los tres fondos, aplicado en `main.css`,
  `home.css`, `casos-exito.css` y `productos.css`. `--color-gold-600` se
  conserva para otros usos no textuales.
- **Salto de nivel de encabezado** `h2 → h4` en la sección de valores de
  `index.html` (`.value-item`) — corregido a `h3` (con `font-size`
  explícito para no cambiar el tamaño visual, solo el nivel semántico).
- **Salto de nivel** `h1 → h3` (sin ningún `h2`) en `contacto.html` — las
  4 cabeceras del panel de contacto (`WhatsApp directo`, `Correo`,
  `Oficina principal`, `Oficina adicional`) eran `h3`; se subieron a
  `h2`. Verificado con `grep` que las 6 páginas quedaron con jerarquía
  `h1 → h2 → h3` sin saltos.
- **Objetivo de toque táctil** (44×44px mínimo): `.nav-toggle` (era
  40×40) y `.social-links a` (era 36×36) se subieron a 44×44.

**Verificado sin hallazgos (ya cumplía):**

- Resto de pares texto/fondo del sistema de diseño (16 combinaciones
  revisadas, incluyendo texto semitransparente sobre navy) — todos
  ≥4.5:1.
- Foco visible global (`:focus-visible`), skip link, `aria-expanded`/
  `aria-controls`/`aria-label` en el menú móvil, `aria-label` en
  íconos-only (WhatsApp flotante, redes sociales), honeypot con
  `aria-hidden` + `tabindex="-1"` correctamente excluido de teclado y
  lectores de pantalla, errores de formulario anunciados vía texto +
  `role="alert"` (no solo color).
- Cero `<img>` en todo el sitio (100% SVG inline) y cero `<svg>` sin
  `aria-hidden="true"`.
- Cero links internos rotos en las 6 páginas (verificado por filesystem,
  cada `href="./..."` resuelve a un archivo real).
- Animaciones: solo `transform`/`opacity` (reveal-on-scroll,
  hover de botones) más `background-color`/`color`/`box-shadow` en
  transiciones puntuales de hover (no en bucle, sobre elementos
  pequeños) — dentro de lo permitido por `low-impact-motion`. Ninguna
  animación de `top`/`left`/`width`/`height`/`margin`/`padding`.
  `prefers-reduced-motion: reduce` respetado en CSS y en `reveal.js`.
  Sin scroll hijacking (el único listener de scroll es el nativo del
  navegador; `reveal.js` usa `IntersectionObserver`, no el evento
  `scroll`).
- Sin anchos fijos grandes en CSS que pudieran romper viewports angostos
  — todo el layout usa unidades relativas, `flex`/`grid` con `1fr`, y
  `.container` con `max-width` + padding.
- `sitemap.xml` coincide exactamente con las 6 páginas reales.

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

## Pruebas realizadas sobre el Segmento 6

- Contraste: calculado programáticamente (Node, fórmula WCAG de
  luminancia relativa) para 19 pares texto/fondo del sistema de diseño,
  incluyendo colores semitransparentes mezclados sobre su fondo real.
  3 fallos encontrados y corregidos (ver arriba); los 16 restantes ya
  cumplían AA.
- Jerarquía de encabezados: `grep` de `<h1>`–`<h6>` en las 6 páginas,
  verificado manualmente que no hay saltos de nivel. 2 saltos encontrados
  y corregidos.
- `node --check` en los 4 módulos JS (`main.js`, `nav.js`, `reveal.js`,
  `contacto.js`) — sin errores.
- Verificación exhaustiva de enlaces: cada `href="./..."` y
  `src="./..."` de las 6 páginas resuelve a un archivo real en disco —
  cero rotos.
- `sitemap.xml` contrastado contra las 6 páginas reales — coincide.
- Sigue pendiente (como en segmentos anteriores): Lighthouse y revisión
  visual real en navegador — no hay intérprete Python funcional en el
  PATH de este entorno para levantar `http.server`. Recomendado antes de
  publicar: abrir cada página con doble clic (`file://`) o en un entorno
  con servidor local disponible, y correr Lighthouse ahí.

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

- **Resuelta (2026-08-03):** teaser de servicios en home actualizado a
  los 7 servicios reales (antes 5, copy genérico) — ver detalle abajo.
- **Resuelta en Segmento 3:** botón "Hablemos" en el header — sí, se
  agregó a las 4 páginas (ahora 6).
- **Resuelta (2026-08-03):** ítem de nav "Recursos" — se deja fuera del
  alcance, no se crea página ni link.
- **Resuelta (2026-08-04):** logo real recibido (`Banner.png` →
  `assets/images/logo-addv.png`) y aplicado en header/footer de las 6
  páginas, reemplazando el mark "+V" en SVG inline.

## Qué existe (post-Segmento 6 — ajustes de pendientes, 2026-08-03)

- `index.html`: teaser de servicios actualizado de 5 tarjetas genéricas a
  los **7 servicios reales** (mismos títulos/primera frase de
  `servicios.html`), cada tarjeta ahora es un `<a>` que enlaza directo al
  ancla del servicio correspondiente en `servicios.html`
  (`./servicios.html#desarrollo-de-software`, etc. — los 7 anchors ya
  existían desde el Segmento 3). `.service-card` pasó de `<article>` a
  `<a>`; se agregó `display: block` en `home.css` para que siga
  comportándose como bloque, y hereda foco visible / color / sin
  subrayado de las reglas globales ya existentes en `main.css`.
- 2 iconos SVG nuevos (mismo estilo stroke que los demás, decorativos,
  `aria-hidden="true"`) para Soporte & Mantenimiento y Consultoría SAP,
  que no tenían tarjeta previa en el teaser.
- Ítem "Recursos": decisión tomada de no agregarlo — no requiere cambios.
- Logo real: pendiente de que Tony entregue el archivo.

## Qué falta

Los 6 segmentos del plan original están completos, y los 3 pendientes de
negocio abiertos al cierre del Segmento 6 ya se resolvieron (una queda
abierta: logo real, pendiente de archivo por parte de Tony). Lo que
queda es verificación manual que este entorno no puede hacer (Lighthouse,
revisión visual en navegador — ver "Pruebas realizadas sobre el
Segmento 6").
