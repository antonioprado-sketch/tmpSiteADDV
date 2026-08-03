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

- CSS: variables/tokens en `assets/css/tokens.css`, nunca colores/tamaños
  hardcodeados repetidos en otros archivos. Un archivo CSS por página para
  estilos específicos (`home.css`, `servicios.css`, ...), más `main.css`
  compartido.
- JS: un módulo por responsabilidad (`nav.js`, `reveal.js`, ...),
  importados desde `main.js` por página. Sin dependencias externas salvo
  las listadas como permitidas.
- Nav y footer se repiten manualmente en cada página HTML (no hay motor de
  plantillas en un sitio 100% estático) — al editar nav/footer, replicar el
  cambio en todas las páginas existentes.
- Marca: mark "+V" en SVG inline (ver `index.html`), paleta navy
  (`--color-navy-950` etc.) + oro (`--color-gold-500` etc.), tipografía
  Fraunces (display) + Manrope (texto). No usar Inter/Roboto/Arial como
  tipografía única.
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
```

No hay `npm test` ni suite de pruebas automatizada todavía — este es un
sitio de contenido/marketing sin lógica de negocio compleja. Si en un
segmento futuro se agrega lógica no trivial (p. ej. validación de
formulario más elaborada), debe entregarse con sus pruebas ejecutables en
local con un solo comando documentado aquí.
