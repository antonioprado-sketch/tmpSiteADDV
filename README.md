# Sitio ADDV (addv.mx)

Sitio corporativo estático de ADDV (Agile Development and Design + Value)
para GitHub Pages.

## Requisitos

Ninguno. No requiere Node, npm, Docker, ni ningún proceso de build.

## Cómo verlo localmente

**Opción 1 — directo (la forma en que debe funcionar siempre):**

1. Clona o descarga este repositorio.
2. Haz doble clic sobre `index.html`.
3. El sitio se abre en tu navegador vía `file://` y funciona completo:
   navegación, menú móvil, animaciones, y (cuando estén los segmentos
   correspondientes) formulario de contacto.

**Opción 2 — servidor local (opcional, solo conveniencia de desarrollo):**

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

No es necesario para que el sitio funcione — es solo una alternativa si tu
navegador restringe algo bajo `file://` (poco común con este sitio, ya que
no usa `fetch` a assets locales).

## Cómo publicarlo en GitHub Pages

1. Sube el contenido de este repositorio a la rama que uses para Pages
   (por ejemplo `main`, carpeta raíz, o `gh-pages`).
2. En GitHub → Settings → Pages, selecciona esa rama/carpeta como fuente.
3. Todas las rutas del sitio son relativas (`./assets/...`), así que
   funciona igual si el repo se publica en la raíz de un dominio o en un
   subdirectorio (`usuario.github.io/repo/`).
4. Verifica que cargue: la página de inicio, cada hoja de estilos
   (`assets/css/*.css`), cada script (`assets/js/*.js`), y el favicon.

## Estructura del proyecto

```
/
├── index.html            Página de inicio
├── servicios.html        (pendiente — próximo segmento)
├── productos.html        (pendiente — próximo segmento)
├── casos-exito.html      (pendiente — próximo segmento)
├── nosotros.html         (pendiente — próximo segmento)
├── contacto.html         (pendiente — próximo segmento)
├── assets/
│   ├── css/               tokens.css (paleta/tipografía), main.css
│   │                       (compartido), home.css (específico de home)
│   ├── js/                 main.js, nav.js, reveal.js — módulos ES6
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

Ver `project_state.md` para el detalle de qué está construido, qué
decisiones ya se tomaron, y qué falta por segmento.
