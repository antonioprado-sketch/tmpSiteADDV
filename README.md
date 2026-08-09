# Sitio ADDV (addv.mx)

Sitio corporativo estático de ADDV (Agile Development and Design + Value)
para GitHub Pages.

## Requisitos

Ninguno para desarrollar (no requiere Node, npm, Docker, ni ningún
proceso de build). **Sí requiere conexión a internet al abrir el sitio**
(en `file://` o publicado): carga Tailwind CDN, Google Fonts y ~37 fotos
de stock externas (tarjetas de servicios/productos, etc.). Antes del
rebrand de 2026-08-03 el sitio funcionaba 100% offline; ya no. Las 3
imágenes hero (home/servicios/nosotros) sí son locales
(`assets/images/hero-*.jpg`, desde 2026-08-09) por ser el elemento LCP
de cada página.

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
├── prompts/
│   └── image-prompts.md
├── robots.txt
├── sitemap.xml
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
