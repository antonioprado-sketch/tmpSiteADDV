# build/tailwind — regenerar assets/css/tailwind.css

Esta carpeta **no es parte del sitio en producción** — el sitio no la carga,
no la necesita para abrirse ni para publicarse en GitHub Pages. Es solo la
fuente para regenerar `assets/css/tailwind.css` cuando se agreguen clases
de Tailwind nuevas al HTML que el archivo actual no cubra.

No hay `node_modules` ni build corriendo en el repo — Tailwind CLI se
instala temporalmente, se corre una vez, y se descarta.

## Cuándo regenerar

Si agregás una clase de Tailwind (color, spacing, breakpoint, etc.) a
cualquiera de las 6 páginas HTML y no aparece estilada, es porque no
estaba en el HTML cuando se generó `assets/css/tailwind.css` la última
vez. Hay que regenerarlo.

## Cómo regenerar

Desde la raíz del repo:

```bash
cd build/tailwind
npm init -y
npm install -D tailwindcss@3 @tailwindcss/forms
npx tailwindcss -i ./input.css -o ../../assets/css/tailwind.css --config ./tailwind.config.js --minify
rm -rf node_modules package.json package-lock.json
```

El último paso borra lo que `npm install` acaba de crear — son artefactos
temporales del build local, no se commitean (ver `.gitignore` en esta
carpeta). Solo `tailwind.config.js`, `input.css` y este `README.md` viven
en git.

Si cambia la paleta/spacing/tipografía del sitio, actualizá
`tailwind.config.js` aquí **y** el registro correspondiente en
`../../CLAUDE.md` antes de regenerar.
