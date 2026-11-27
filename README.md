# Cerrajería El Prado — Sitio web (demo)

Sitio estático multipágina para **Cerrajería El Prado**, cerrajería automotriz en San Pedro Sula, Honduras.

> **Estado:** sitio terminado y publicado en GitHub Pages. No se ha contactado al cliente con este enlace.

## Publicación

- **Enlace con dominio propio:** https://www.naturallhn.com/cerrajeria-el-prado/
- **Alternativa en GitHub Pages:** https://qJulio.github.io/cerrajeria-el-prado/
- **Repositorio:** https://github.com/qJulio/cerrajeria-el-prado
- Rama `main`, GitHub Pages activo desde la raíz del repositorio, `.nojekyll` incluido.

Las dos URLs sirven el mismo sitio. Si necesitas otro nombre de enlace, se puede renombrar el repositorio o configurar un dominio distinto.

## Datos confirmados

- **WhatsApp / único canal de conversión:** +504 9819-2313
- **Horario normal:** 8:00 a.m. – 6:00 p.m.
- **Emergencias:** 24/7 con recargo. Cubren aperturas, reparaciones y clonaciones.
- **Copias de llave:** solo en horario normal, no en emergencias.
- **Base:** San Pedro Sula, zona 21104. Servicio dentro y fuera de la ciudad.
- **Facebook:** https://www.facebook.com/p/cerrajeria-el-prado-100067910711453/
- **Google Maps:** https://share.google/LXiDjFmackNgphoyg
- **Precios:** no se publican en la web. Se confirman por WhatsApp según vehículo, llave y momento.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada, servicios principales, horarios, cobertura y preguntas frecuentes. |
| `servicios.html` | Los ocho servicios, tabla día/emergencia y proceso de trabajo. |
| `emergencias.html` | Alcance de la emergencia, pasos, recargo y preguntas frecuentes. |
| `cobertura.html` | Cobertura dentro y fuera de la ciudad, mapa referencial y coordinación. |
| `contacto.html` | WhatsApp directo, formulario que arma el mensaje y preguntas rápidas. |

## Cómo abrirlo

Doble clic en `index.html` abre el sitio directamente. Los enlaces entre páginas son relativos y las fuentes son locales, así que funciona sin internet (salvo WhatsApp).

Para servirlo en local:

```powershell
cd "C:\Users\julio\OneDrive\Escritorio\cerrajeria-el-prado-web"
python -m http.server 8770
```

Luego abrir `http://localhost:8770`.

No hay build, dependencias ni framework. Editar los `.html`, `assets/css/styles.css` o `assets/js/main.js` es suficiente.

## Formulario de contacto

El formulario de `contacto.html` no usa backend ni guarda datos:

1. Toma nombre, servicio, ubicación y detalle.
2. Arma un mensaje multilínea para WhatsApp.
3. Abre `wa.me/50498192313` en una pestaña nueva.
4. Si el navegador bloquea la pestaña, usa `location.href` como respaldo.

El botón de envío solo abre WhatsApp; el mensaje se envía desde la app.

## Diseño

Dirección de arte tipo **dossier técnico suizo/industrial**, distinta a los sitios de Larsons y Air Cold:

- Hueso `#f1ede2`, tinta `#0e1113`, acero `#59636b`, naranja de seguridad `#ff4d00`.
- Tipografías locales: **Archivo Black**, **Archivo** (400–700) y **Space Mono**.
- Grillas técnicas, numeración de secciones, textura de papel y acentos de taller.
- Animaciones con `prefers-reduced-motion`, menú móvil con foco atrapado y transiciones suaves.
- Sin fotos de stock ni testimonios inventados; el mapa es explícitamente referencial.

## Estructura

```text
cerrajeria-el-prado-web/
├── index.html
├── servicios.html
├── emergencias.html
├── cobertura.html
├── contacto.html
├── README.md
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── fonts/            (7 archivos TTF locales)
└── previews/             (capturas desktop y móvil)
```

## QA realizado

- 5 páginas, un solo `<h1>` por página.
- **59 enlaces `wa.me`** al número correcto; **0 enlaces `tel:`**.
- Todos los enlaces internos y anclas resuelven; sin IDs duplicados.
- **0 errores de consola** en las cinco páginas (escritorio y móvil).
- **0 desbordamiento horizontal** a 1366×577 y 390×844.
- Menú móvil: abre, cierra con Escape, devuelve el foco y bloquea el scroll de fondo.
- Formulario probado: abre `wa.me/50498192313` con el mensaje multilínea correcto.
- Sin precios, montos ni promesas de disponibilidad no confirmadas en el texto visible.
- Metadatos, favicon, `lang="es"`, viewport y descripciones presentes en todas las páginas.
- Facebook y Google Maps integrados con iconos propios en barra superior, menú móvil, pie de página, contacto y cobertura; abren en pestaña nueva.
- Fuentes locales verificadas (7/7).
- Verificado ya publicado: 5/5 páginas cargan sin errores de consola ni recursos rotos.

Capturas en `previews/`: `desktop-*.png` y `mobile-*.png` para las cinco páginas.

## Pendiente de confirmar con el cliente

- Dirección exacta del local (la web solo indica San Pedro Sula y coordenadas por WhatsApp).
- Logo, fotografías reales y colores de marca, si los tiene.
- Si desea publicar el sitio en un dominio propio.
- Cualquier ajuste de horarios, recargos o servicios antes de publicar.

## Crédito

Sitio por NovaStudio.
