import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dataversoSection, articles } from "../assets/data/articles.js";

const required = [
  "index.html",
  "sobre-mi.html",
  "indexa.html",
  "american-express.html",
  "biblioteca.html",
  "compras.html",
  "privacidad.html",
  "cookies.html",
  "afiliados.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "assets/css/styles.css",
  "assets/img/favicon.svg",
  "assets/js/app.js",
  "assets/js/catalog.js",
  "assets/js/analytics.js",
  "assets/js/consent.js",
  "assets/data/books.js",
  "assets/data/products.js",
  "assets/data/articles.js",
];

test("TAM-0 required files exist", () => {
  for (const path of required) {
    assert.equal(
      existsSync(path),
      true,
      `Missing required file: ${path}`
    );
  }
});

test("Travel & More home exposes the agreed V1 routes", () => {
  const html = readFileSync("index.html", "utf8");

  assert.match(html, /biblioteca\.html/);
  assert.match(html, /compras\.html/);
  assert.match(html, /american-express\.html/);
  assert.match(html, /sobre-mi\.html/);
  assert.match(
    html,
    /dataversodata\.substack\.com\/s\/aprender-mejorar-e-invertir-con-datos/
  );
  assert.match(
    html,
    /instagram\.com\/victor\.travelandmore/
  );
});

test("professional portfolio is not exposed from the home", () => {
  const html = readFileSync("index.html", "utf8");

  assert.doesNotMatch(
    html,
    /victorguzmanperez\.github\.io\/victorguzman/
  );
});

test("home external destinations open in a new tab safely", () => {
  const html = readFileSync("index.html", "utf8");

  const externalCards = html.match(/target="_blank"/g) ?? [];
  const safeRelations = html.match(/rel="noopener noreferrer"/g) ?? [];

  // Dataverso + Quantfury + Instagram.
  assert.equal(externalCards.length, 3);
  assert.equal(safeRelations.length, 3);
});

test("about page keeps internal and external roles separated", () => {
  const html = readFileSync("sobre-mi.html", "utf8");

  assert.match(html, /href="biblioteca\.html"/);
  assert.match(html, /href="compras\.html"/);

  assert.match(
    html,
    /victorguzmanperez\.github\.io\/victorguzman/
  );

  assert.match(
    html,
    /substack\.com\/@dataversodata/
  );

  assert.match(
    html,
    /instagram\.com\/victor\.travelandmore/
  );
});

test("about page external destinations open in a new tab safely", () => {
  const html = readFileSync("sobre-mi.html", "utf8");

  const externalLinks = html.match(/target="_blank"/g) ?? [];
  const safeRelations = html.match(/rel="noopener noreferrer"/g) ?? [];

  assert.equal(externalLinks.length, 4);
  assert.equal(safeRelations.length, 4);
});

test("Dataverso integration is curated and explicit", () => {
  assert.equal(
    dataversoSection.url,
    "https://dataversodata.substack.com/s/aprender-mejorar-e-invertir-con-datos"
  );

  assert.equal(Array.isArray(articles), true);
});


test("Travel & More home uses the natural V1 copy", () => {
  const html = readFileSync("index.html", "utf8");

  assert.match(
    html,
    /Libros que he ido leyendo y lo que me han aportado\./
  );

  assert.match(
    html,
    /Mis compras/
  );

  assert.match(
    html,
    /Productos que usamos, lo que nos gusta, lo que no y nuestra opini\u00f3n\./
  );

  assert.match(
    html,
    /Libros, dinero, inversi\u00f3n y cosas que voy aprendiendo por el camino\./
  );

  assert.match(
    html,
    /Fotos, recuerdos y lugares que hemos ido conociendo\./
  );

  assert.match(
    html,
    /Un poco sobre nosotros y c\u00f3mo hemos llegado hasta aqu\u00ed\./
  );

  assert.doesNotMatch(
    html,
    /Mis Compras Reales/
  );
});

test("library and purchases pages use the natural V1 copy", () => {
  const library = readFileSync("biblioteca.html", "utf8");
  const purchases = readFileSync("compras.html", "utf8");

  assert.match(
    library,
    /Libros que he ido leyendo y lo que me han aportado\./
  );

  assert.match(
    purchases,
    /<h1>Mis compras<\/h1>/
  );

  assert.match(
    purchases,
    /Productos que usamos, lo que nos gusta, lo que no y nuestra opini\u00f3n\./
  );

  assert.doesNotMatch(
    purchases,
    /Mis Compras Reales/
  );
});



test("library discloses Amazon affiliate links close to the catalog", () => {
  const html = readFileSync(
    "biblioteca.html",
    "utf8"
  );

  assert.match(
    html,
    /class="affiliate-disclosure"/
  );

  assert.match(
    html,
    /Transparencia:/
  );

  assert.match(
    html,
    /enlaces a Amazon son de afiliado/
  );

  assert.match(
    html,
    /href="afiliados\.html"/
  );

  assert.doesNotMatch(
    html,
    /href="afiliados\.html"[^>]*target="_blank"/
  );
});

test("purchases disclose Amazon affiliate links close to the catalog", () => {
  const html = readFileSync("compras.html", "utf8");

  assert.match(
    html,
    /class="affiliate-disclosure"/
  );

  assert.match(
    html,
    /Transparencia:/
  );

  assert.match(
    html,
    /enlaces a Amazon son de afiliado/
  );

  assert.match(
    html,
    /href="afiliados\.html"/
  );

  assert.doesNotMatch(
    html,
    /href="afiliados\.html"[^>]*target="_blank"/
  );
});


test("affiliate disclosure page is complete and transparent", () => {
  const html = readFileSync(
    "afiliados.html",
    "utf8"
  );

  assert.match(
    html,
    /<!doctype html>/
  );

  assert.match(
    html,
    /href="assets\/css\/styles\.css"/
  );

  assert.match(
    html,
    /En calidad de Afiliado de Amazon/
  );

  assert.match(
    html,
    /Indexa Capital/
  );

  assert.match(
    html,
    /American Express/
  );

  assert.match(
    html,
    /src="assets\/js\/analytics\.js"/
  );

  assert.match(
    html,
    /src="assets\/js\/consent\.js"/
  );
});

test("about page keeps the natural personal voice", () => {
  const html = readFileSync("sobre-mi.html", "utf8");

  assert.match(
    html,
    /Creo que a muchos de nuestra generaci\u00f3n nos ense\u00f1aron/
  );

  assert.match(
    html,
    /No hemos descubierto ning\u00fan secreto ni nada parecido/
  );

  assert.match(
    html,
    /No pretendo decirle a nadie qu\u00e9 tiene que hacer con su dinero/
  );

  assert.match(
    html,
    /Seguimos viajando, aunque ahora algo menos/
  );

  assert.match(
    html,
    /pues mejor todav\u00eda/
  );
});
test("Indexa route keeps referral contextual and explicit", () => {
  const home = readFileSync("index.html", "utf8");
  const indexa = readFileSync("indexa.html", "utf8");

  assert.match(
    home,
    /href="indexa\.html"/
  );

  assert.match(
    home,
    /Indexa Capital/
  );

  assert.doesNotMatch(
    home,
    /indexacapital\.com\/t\/BOZsXy/
  );

  assert.match(
    indexa,
    /15 preguntas/
  );

  assert.match(
    indexa,
    /Abrir cuenta/
  );

  assert.match(
    indexa,
    /indexacapital\.com\/t\/BOZsXy/
  );
});

test("Indexa invitation opens externally and includes transparency", () => {
  const html = readFileSync("indexa.html", "utf8");

  assert.match(
    html,
    /href="https:\/\/indexacapital\.com\/t\/BOZsXy"\s+target="_blank"\s+rel="noopener noreferrer"/
  );

  assert.match(
    html,
    /15\.000/
  );

  assert.match(
    html,
    /No es asesoramiento/
  );

  assert.match(
    html,
    /Las condiciones de la invitación pueden cambiar/
  );
});
test("TAM-0.4 metadata is coherent across primary pages", () => {
  const pages = [
    ["index.html", "https://victorguzmanperez.github.io/travelandmore/"],
    ["sobre-mi.html", "https://victorguzmanperez.github.io/travelandmore/sobre-mi.html"],
    ["biblioteca.html", "https://victorguzmanperez.github.io/travelandmore/biblioteca.html"],
    ["compras.html", "https://victorguzmanperez.github.io/travelandmore/compras.html"],
    ["indexa.html", "https://victorguzmanperez.github.io/travelandmore/indexa.html"],
    ["american-express.html", "https://victorguzmanperez.github.io/travelandmore/american-express.html"],
  ];

  for (const [path, canonical] of pages) {
    const html = readFileSync(path, "utf8");

    assert.match(
      html,
      /<meta name="theme-color" content="#17324a">/
    );

    assert.match(
      html,
      new RegExp(
        `rel="canonical"\\s+href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`
      )
    );

    assert.match(
      html,
      /rel="icon"\s+href="assets\/img\/favicon\.svg"/
    );

    assert.match(
      html,
      /property="og:title"/
    );

    assert.match(
      html,
      /property="og:description"/
    );

    assert.match(
      html,
      /property="og:url"/
    );

    assert.match(
      html,
      /name="twitter:card" content="summary"/
    );
  }
});

test("Quantfury is contextual external content from the home", () => {
  const html = readFileSync("index.html", "utf8");

  assert.match(
    html,
    /Mi experiencia con Quantfury/
  );

  assert.match(
    html,
    /https:\/\/dataversodata\.substack\.com\/p\/mover-6000-con-300/
  );

  assert.match(
    html,
    /href="https:\/\/dataversodata\.substack\.com\/p\/mover-6000-con-300"\s+target="_blank"\s+rel="noopener noreferrer"/
  );
});

test("library and purchases share the data-driven catalog renderer", () => {
  const library = readFileSync("biblioteca.html", "utf8");
  const purchases = readFileSync("compras.html", "utf8");

  assert.match(
    library,
    /id="catalog-root"[\s\S]*data-catalog="books"/
  );

  assert.match(
    purchases,
    /id="catalog-root"[\s\S]*data-catalog="products"/
  );

  assert.match(
    library,
    /type="module"[\s\S]*src="assets\/js\/catalog\.js"/
  );

  assert.match(
    purchases,
    /type="module"[\s\S]*src="assets\/js\/catalog\.js"/
  );
});

test("catalog renderer supports dynamic categories ratings and optional links", () => {
  const renderer = readFileSync(
    "assets/js/catalog.js",
    "utf8"
  );

  assert.match(
    renderer,
    /getUsedCategories/
  );

  assert.match(
    renderer,
    /categoria_id/
  );

  assert.match(
    renderer,
    /ratingText/
  );

  assert.match(
    renderer,
    /substack_url/
  );

  assert.match(
    renderer,
    /affiliate_url/
  );

  assert.match(
    renderer,
    /aria-pressed/
  );
});

test("Travel & More analytics requires explicit consent", () => {
  const analytics = readFileSync(
    "assets/js/analytics.js",
    "utf8"
  );

  assert.match(
    analytics,
    /G-EYPRHTHVPW/
  );

  assert.match(
    analytics,
    /travelandmore\.analyticsConsent\.v1/
  );

  assert.match(
    analytics,
    /hasConsent/
  );

  assert.match(
    analytics,
    /googletagmanager\.com\/gtag\/js/
  );
});

test("Google Analytics is not statically embedded in Travel & More HTML", () => {
  const pages = [
    "index.html",
    "sobre-mi.html",
    "biblioteca.html",
    "compras.html",
    "indexa.html",
    "american-express.html",
    "privacidad.html",
    "cookies.html",
    "afiliados.html",
  ];

  for (const path of pages) {
    const html = readFileSync(
      path,
      "utf8"
    );

    assert.doesNotMatch(
      html,
      /googletagmanager\.com\/gtag\/js/
    );

    assert.match(
      html,
      /src="assets\/js\/analytics\.js"/
    );

    assert.match(
      html,
      /src="assets\/js\/consent\.js"/
    );
  }
});

test("privacy preferences can be accepted rejected and reopened", () => {
  const consent = readFileSync(
    "assets/js/consent.js",
    "utf8"
  );

  assert.match(
    consent,
    /data-consent="granted"/
  );

  assert.match(
    consent,
    /data-consent="denied"/
  );

  assert.match(
    consent,
    /travelandmore:analytics-consent/
  );

  assert.match(
    consent,
    /privacy-settings-button/
  );
});

test("American Express referral stays contextual and transparent", () => {
  const home = readFileSync("index.html", "utf8");
  const amex = readFileSync("american-express.html", "utf8");

  assert.match(
    home,
    /href="american-express\.html"/
  );

  assert.match(
    home,
    /Nuestra American Express Gold/
  );

  assert.doesNotMatch(
    home,
    /americanexpress\.com\/es-es\/referral\/gold/
  );

  assert.match(
    amex,
    /href="https:\/\/americanexpress\.com\/es-es\/referral\/gold\?ref=vICTOGRDl8&amp;XL=MNMNS"\s+target="_blank"\s+rel="noopener noreferrer"/
  );

  assert.match(
    amex,
    /24\.000 puntos Membership Rewards/
  );

  assert.match(
    amex,
    /2\.000 puntos cada mes/
  );

  assert.match(
    amex,
    /1\.000 &euro;/
  );

  assert.match(
    amex,
    /pueden cambiar/
  );

  assert.match(
    amex,
    /No es asesoramiento financiero/
  );
});


test("catalog featured items are visibly identified", () => {
  const catalog = readFileSync(
    "assets/js/catalog.js",
    "utf8"
  );

  const styles = readFileSync(
    "assets/css/styles.css",
    "utf8"
  );

  assert.match(
    catalog,
    /catalog-pill--featured/
  );

  assert.ok(
    catalog.includes("\\u2605 Destacado")
  );

  assert.match(
    catalog,
    /book\.destacado/
  );

  assert.match(
    catalog,
    /product\.destacado/
  );

  assert.match(
    styles,
    /\.catalog-pill--featured/
  );
});


test("catalog featured items are rendered first", async () => {
  const { featuredFirst } = await import(
    "../assets/js/catalog.js"
  );

  const ordered = featuredFirst([
    { id: "regular-1", destacado: false },
    { id: "featured-1", destacado: true },
    { id: "regular-2", destacado: false },
    { id: "featured-2", destacado: true },
  ]);

  assert.deepEqual(
    ordered.map((item) => item.id),
    [
      "featured-1",
      "featured-2",
      "regular-1",
      "regular-2",
    ]
  );
});


test("catalog editorial content uses accessible disclosures", () => {
  const catalog = readFileSync(
    "assets/js/catalog.js",
    "utf8"
  );

  const styles = readFileSync(
    "assets/css/styles.css",
    "utf8"
  );

  assert.match(
    catalog,
    /function createDisclosure\(label\)/
  );

  assert.match(
    catalog,
    /document\.createElement\("details"\)/
  );

  assert.match(
    catalog,
    /"summary"/
  );

  assert.match(
    catalog,
    /book\.descripcion/
  );

  assert.match(
    catalog,
    /book\.opinion/
  );

  assert.match(
    catalog,
    /product\.descripcion/
  );

  assert.match(
    catalog,
    /product\.uso/
  );

  assert.match(
    catalog,
    /product\.lo_que_nos_gusta/
  );

  assert.match(
    catalog,
    /product\.lo_que_no/
  );

  assert.match(
    catalog,
    /product\.opinion/
  );

  assert.match(
    catalog,
    /"Nuestra experiencia"/
  );

  assert.match(
    styles,
    /\.catalog-details/
  );

  assert.match(
    styles,
    /-webkit-line-clamp:\s*4/
  );
});


test("catalog descriptions use expandable disclosures", () => {
  const catalog = readFileSync(
    "assets/js/catalog.js",
    "utf8"
  );

  const descriptionLabel =
    '"Descripci\\u00f3n"';

  assert.equal(
    catalog.split(descriptionLabel).length - 1,
    2
  );

  assert.doesNotMatch(
    catalog,
    /"catalog-card__description"/
  );

  assert.match(
    catalog,
    /if \(book\.descripcion\)[\s\S]*?createDisclosure\(/
  );

  assert.match(
    catalog,
    /if \(product\.descripcion\)[\s\S]*?createDisclosure\(/
  );

  assert.match(
    catalog,
    /book\.descripcion/
  );

  assert.match(
    catalog,
    /product\.descripcion/
  );
});
