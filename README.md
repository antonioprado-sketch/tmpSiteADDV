# Sitio ADDV (addv.mx)

Sitio corporativo estático de ADDV (Agile Development and Design + Value)
para GitHub Pages.

## Requisitos

Ninguno para desarrollar (no requiere Node, npm, Docker, ni ningún
proceso de build). **Sí requiere conexión a internet al abrir el sitio**
(en `file://` o publicado): carga Google Fonts y ~37 fotos de stock
externas (tarjetas de servicios/productos, etc.). Antes del rebrand de
2026-08-03 el sitio funcionaba 100% offline; ya no. Las 3 imágenes hero
(home/servicios/nosotros) sí son locales (`assets/images/hero-*.jpg`,
desde 2026-08-09) por ser el elemento LCP de cada página. El CSS de
Tailwind también es local (`assets/css/tailwind.css`, compilado una sola
vez — ver `CLAUDE.md` y `build/tailwind/README.md` si necesitás
regenerarlo) desde 2026-08-09; ya no depende de `cdn.tailwindcss.com`.

## Cómo verlo localmente

**Opción 1 — directo:**

1. Clona o descarga este repositorio.
2. Haz doble clic sobre `index.html`.
3. El sitio se abre en tu navegador vía `file://` — necesita internet para
   cargar Tailwind CDN/fuentes/fotos, pero no necesita servidor local.

**Opción 2 — servidor local (opcional, solo conveniencia de desarrollo):**

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Cómo publicarlo en GitHub Pages

1. Sube el contenido de este repositorio a la rama que uses para Pages
   (por ejemplo `main`, carpeta raíz, o `gh-pages`).
2. En GitHub → Settings → Pages, selecciona esa rama/carpeta como fuente.
3. Todas las rutas del sitio son relativas (`./assets/...`), así que
   funciona igual si el repo se publica en la raíz de un dominio o en un
   subdirectorio (`usuario.github.io/repo/`).
4. Verifica que cargue: la página de inicio, cada script (`assets/js/*.js`)
   y el favicon. El estilo visual depende de que Tailwind CDN y Google
   Fonts carguen desde internet (no hay CSS propio que sirva de
   respaldo).

## Estructura del proyecto

```
/
├── index.html            Página de inicio
├── nosotros.html         Nosotros (propósito, pilares de marca)
├── contacto.html         Contacto (formulario → WhatsApp, sin backend)
├── servicios.html        Servicios (7 servicios con detalle y bullets)
├── productos.html        Productos (Portal de Facturación, ADDV Fintech)
├── casos-exito.html      Casos de éxito (clientes reales + ejemplos)
│                         (las 6 páginas del sitio ya existen)
├── assets/
│   ├── css/               vacío — el CSS propio se eliminó en el rebrand
│   │                       de 2026-08-03 (ver project_state.md); el sitio
│   │                       usa Tailwind CDN con config inline por página
│   ├── js/                 main.js (nav+reveal, todas las páginas),
│   │                       nav.js, reveal.js, contacto.js (solo en
│   │                       contacto.html — validación + WhatsApp).
│   │                       Sin cambios en el rebrand.
│   ├── images/, icons/, fonts/, videos/
├── 404.html              Página de error personalizada (GitHub Pages la sirve
│                         automático; noindex, mismo header/footer que las 6)
├── prompts/
│   └── image-prompts.md
├── robots.txt
├── sitemap.xml
├── llms.txt              Resumen del sitio para crawlers de LLMs/AI search
├── favicon.ico
├── project_state.md       Estado del proyecto, decisiones tomadas/pendientes
├── CLAUDE.md               Contexto operativo para trabajo futuro en el repo
└── README.md               Este archivo
```

## Estado actual

Sitio funcionalmente completo y publicado en GitHub:
[github.com/antonioprado-sketch/tmpSiteADDV](https://github.com/antonioprado-sketch/tmpSiteADDV).
Rebrand visual completo (2026-08-03): Tailwind CDN + Material Design 3
(negro+azul, Lato) en vez del CSS propio anterior — ver `project_state.md`
para el detalle. Sin links internos rotos, contraste AA verificado.
Pendiente: revisión visual real en navegador y Lighthouse — no se pudo
levantar un servidor local en el entorno donde se construyó (sin
intérprete Python real en el PATH). Recomendado antes de publicar en
producción.

Ver `project_state.md` para el detalle completo de qué está construido,
qué decisiones ya se tomaron, y qué queda pendiente de confirmar.

## SEO

Piso técnico de SEO implementado (2026-08-10): canonical corregidas a
`.html` en las 6 páginas, datos estructurados JSON-LD (Organization,
ProfessionalService, Service, BreadcrumbList), Open Graph/Twitter Card con
imagen social (`assets/images/og-default.jpg`), `llms.txt` para crawlers de
IA, y `404.html` personalizado. **Pendiente**: verificar el dominio en
Google Search Console (requiere que el dueño del sitio genere la propiedad
y comparta el token) para poder enviar `sitemap.xml` y solicitar indexación
manual. Detalle completo en `project_state.md` y `CLAUDE.md`.
