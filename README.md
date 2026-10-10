# Travel & More

Proyecto personal independiente de Víctor Guzmán.

## Objetivo

Reunir viajes, lecturas y compras reales en una web mobile-first conectada con Instagram y Dataverso.

## Desarrollo local

Ejecutar:

python -m http.server 8000

Después abrir:

http://localhost:8000/

## Tests

Ejecutar:

npm test

## Separación de proyectos

Travel & More es independiente del portfolio profesional victorguzman.
## Catálogo data-driven

La fuente editable es `content/Travel_More_Catalogo.xlsx`.

Flujo habitual:

```powershell
python scripts/build_catalog.py --check
python scripts/build_catalog.py
python -m unittest tests/test_catalog_builder.py -v
npm test
```

### Imágenes de productos

En `02_COMPRAS`, la columna `imagen` siempre apunta al original en
`assets/img/products/`.

Ejemplo:

`assets/img/products/funko-pop-frozen-2-olaf.jpg`

Durante el build, las imágenes de productos activos se normalizan sin recorte a
un lienzo 4:3 de 1200x900 px y se guardan como WebP en
`assets/img/products/generated/`. `products.js` apunta automáticamente a esas
versiones generadas. No hay que editar la carpeta `generated` ni escribir sus
rutas en el Excel.

El build requiere Pillow y openpyxl:

```powershell
python -m pip install -r requirements.txt
```

`--check` valida también que las imágenes puedan abrirse y procesarse, pero no
escribe ni JS ni derivados WebP.
