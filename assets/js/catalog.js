import {
  bookCategories,
  books,
} from "../data/books.js";

import {
  productCategories,
  products,
} from "../data/products.js";


function featuredFirst(items) {
  return [
    ...items.filter((item) => item.destacado === true),
    ...items.filter((item) => item.destacado !== true),
  ];
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = text;
  }

  return element;
}


function getUsedCategories(categories, items) {
  const usedCategoryIds = new Set(
    items
      .map((item) => item.categoria_id)
      .filter(Boolean)
  );

  return categories.filter(
    (category) => usedCategoryIds.has(category.id)
  );
}


function ratingText(rating) {
  if (!rating) {
    return "";
  }

  const filled = "\u2605".repeat(rating);
  const empty = "\u2606".repeat(5 - rating);

  return `${filled}${empty}`;
}


function createRating(rating) {
  if (!rating) {
    return null;
  }

  const wrapper = createElement(
    "div",
    "catalog-rating"
  );

  const stars = createElement(
    "span",
    "catalog-rating__stars",
    ratingText(rating)
  );

  stars.setAttribute(
    "aria-label",
    `Valoración personal: ${rating} de 5`
  );

  const value = createElement(
    "span",
    "catalog-rating__value",
    `${rating}/5`
  );

  wrapper.append(
    stars,
    value
  );

  return wrapper;
}


function createExternalLink(
  url,
  label,
  className = ""
) {
  if (!url) {
    return null;
  }

  const link = createElement(
    "a",
    `catalog-action ${className}`.trim(),
    label
  );

  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  return link;
}


function createMetadata(
  category,
  status,
  featured = false
) {
  const meta = createElement(
    "div",
    "catalog-card__meta"
  );

  if (category) {
    meta.append(
      createElement(
        "span",
        "catalog-pill",
        category
      )
    );
  }

  if (status) {
    meta.append(
      createElement(
        "span",
        "catalog-pill catalog-pill--soft",
        status
      )
    );
  }

  if (featured) {
    meta.append(
      createElement(
        "span",
        "catalog-pill catalog-pill--featured",
        "\u2605 Destacado"
      )
    );
  }

  return meta;
}


function createImage(src, alt) {
  if (!src) {
    return null;
  }

  const media = createElement(
    "div",
    "catalog-card__media"
  );

  const image = document.createElement("img");

  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";

  media.append(image);

  return media;
}


function addTextSection(
  container,
  title,
  content
) {
  if (!content) {
    return;
  }

  const section = createElement(
    "section",
    "catalog-card__section"
  );

  section.append(
    createElement(
      "h3",
      "",
      title
    ),
    createElement(
      "p",
      "",
      content
    )
  );

  container.append(section);
}


function createDisclosure(label) {
  const details = document.createElement("details");
  details.className = "catalog-details";

  const summary = createElement(
    "summary",
    "catalog-details__summary",
    label
  );

  const content = createElement(
    "div",
    "catalog-details__content"
  );

  details.append(
    summary,
    content
  );

  return {
    details,
    content,
  };
}

function createBookCard(book) {
  const card = createElement(
    "article",
    "catalog-card catalog-card--book"
  );

  if (book.destacado) {
    card.classList.add(
      "catalog-card--featured"
    );
  }

  const image = createImage(
    book.imagen,
    `Portada de ${book.titulo}`
  );

  if (image) {
    card.append(image);
  }

  const body = createElement(
    "div",
    "catalog-card__body"
  );

  body.append(
    createMetadata(
      book.categoria,
      book.estado,
      book.destacado
    )
  );

  body.append(
    createElement(
      "h2",
      "catalog-card__title",
      book.titulo
    )
  );

  if (book.autor) {
    body.append(
      createElement(
        "p",
        "catalog-card__author",
        book.autor
      )
    );
  }

  const rating = createRating(
    book.rating
  );

  if (rating) {
    body.append(rating);
  }

  if (book.descripcion) {
    const disclosure = createDisclosure(
      "Descripci\u00f3n"
    );

    disclosure.content.append(
      createElement(
        "p",
        "catalog-details__text",
        book.descripcion
      )
    );

    body.append(
      disclosure.details
    );
  }

  if (book.opinion) {
    const disclosure = createDisclosure(
      "Lo que me ha aportado"
    );

    disclosure.content.append(
      createElement(
        "p",
        "catalog-details__text",
        book.opinion
      )
    );

    body.append(
      disclosure.details
    );
  }

  const actions = createElement(
    "div",
    "catalog-actions"
  );

  const articleLink = createExternalLink(
    book.substack_url,
    "Leer mi artículo \u2197"
  );

  const affiliateLink = createExternalLink(
    book.affiliate_url,
    "Ver en Amazon \u2197",
    "catalog-action--affiliate"
  );

  if (affiliateLink) {
    affiliateLink.dataset.affiliate = "amazon";
  }

  if (articleLink) {
    actions.append(articleLink);
  }

  if (affiliateLink) {
    actions.append(affiliateLink);
  }

  if (actions.children.length > 0) {
    body.append(actions);
  }

  card.append(body);

  return card;
}


function createProductCard(product) {
  const card = createElement(
    "article",
    "catalog-card catalog-card--product"
  );

  if (product.destacado) {
    card.classList.add(
      "catalog-card--featured"
    );
  }

  const image = createImage(
    product.imagen,
    product.nombre
  );

  if (image) {
    card.append(image);
  }

  const body = createElement(
    "div",
    "catalog-card__body"
  );

  body.append(
    createMetadata(
      product.categoria,
      "",
      product.destacado
    )
  );

  body.append(
    createElement(
      "h2",
      "catalog-card__title",
      product.nombre
    )
  );

  const rating = createRating(
    product.rating
  );

  if (rating) {
    body.append(rating);
  }

  if (product.descripcion) {
    const disclosure = createDisclosure(
      "Descripci\u00f3n"
    );

    disclosure.content.append(
      createElement(
        "p",
        "catalog-details__text",
        product.descripcion
      )
    );

    body.append(
      disclosure.details
    );
  }

  const hasExperience = Boolean(
    product.uso ||
    product.lo_que_nos_gusta ||
    product.lo_que_no ||
    product.opinion
  );

  if (hasExperience) {
    const disclosure = createDisclosure(
      "Nuestra experiencia"
    );

    addTextSection(
      disclosure.content,
      "Para qu\u00e9 lo usamos",
      product.uso
    );

    addTextSection(
      disclosure.content,
      "Lo que nos gusta",
      product.lo_que_nos_gusta
    );

    addTextSection(
      disclosure.content,
      "Lo que no",
      product.lo_que_no
    );

    addTextSection(
      disclosure.content,
      "Nuestra opini\u00f3n",
      product.opinion
    );

    body.append(
      disclosure.details
    );
  }

  const actions = createElement(
    "div",
    "catalog-actions"
  );

  const affiliateLink = createExternalLink(
    product.affiliate_url,
    "Ver en Amazon \u2197",
    "catalog-action--affiliate"
  );

  if (affiliateLink) {
    affiliateLink.dataset.affiliate = "amazon";
    actions.append(affiliateLink);
  }

  if (actions.children.length > 0) {
    body.append(actions);
  }

  card.append(body);

  return card;
}


function renderEmptyState(root, kind) {
  const message =
    kind === "books"
      ? "Todavía no he añadido libros a esta selección."
      : "Todavía no he añadido productos a esta selección.";

  const empty = createElement(
    "div",
    "catalog-empty"
  );

  empty.append(
    createElement(
      "p",
      "",
      message
    )
  );

  root.replaceChildren(empty);
}


function renderCatalog({
  root,
  kind,
  categories,
  items,
  createCard,
}) {
  if (items.length === 0) {
    renderEmptyState(
      root,
      kind
    );

    return;
  }

  const usedCategories = getUsedCategories(
    categories,
    items
  );

  const controls = createElement(
    "div",
    "catalog-controls"
  );

  const filterBar = createElement(
    "div",
    "filter-bar"
  );

  filterBar.setAttribute(
    "aria-label",
    "Filtrar por categoría"
  );

  const grid = createElement(
    "div",
    "catalog-grid"
  );

  const renderItems = (
    categoryId = "all"
  ) => {
    const filtered =
      categoryId === "all"
        ? items
        : items.filter(
            (item) =>
              item.categoria_id === categoryId
          );

    grid.replaceChildren(
      ...featuredFirst(filtered).map(createCard)
    );
  };

  const filters = [
    {
      id: "all",
      categoria: "Todos",
    },
    ...usedCategories,
  ];

  for (const category of filters) {
    const button = createElement(
      "button",
      "filter-button",
      category.categoria
    );

    button.type = "button";

    button.dataset.category =
      category.id;

    button.setAttribute(
      "aria-pressed",
      category.id === "all"
        ? "true"
        : "false"
    );

    button.addEventListener(
      "click",
      () => {
        for (
          const currentButton
          of filterBar.querySelectorAll(
            ".filter-button"
          )
        ) {
          currentButton.setAttribute(
            "aria-pressed",
            currentButton === button
              ? "true"
              : "false"
          );
        }

        renderItems(
          category.id
        );
      }
    );

    filterBar.append(button);
  }

  controls.append(filterBar);

  root.replaceChildren(
    controls,
    grid
  );

  renderItems();
}


function bootCatalog() {
  const root = document.querySelector(
    "#catalog-root"
  );

  if (!root) {
    return;
  }

  const kind = root.dataset.catalog;

  if (kind === "books") {
    renderCatalog({
      root,
      kind,
      categories: bookCategories,
      items: books,
      createCard: createBookCard,
    });

    return;
  }

  if (kind === "products") {
    renderCatalog({
      root,
      kind,
      categories: productCategories,
      items: products,
      createCard: createProductCard,
    });

    return;
  }

  console.error(
    "[Travel & More] Unknown catalog type:",
    kind
  );
}


if (typeof document !== "undefined") {
  bootCatalog();
}


export {
  featuredFirst,
  getUsedCategories,
  ratingText,
};
