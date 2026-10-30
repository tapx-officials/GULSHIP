"use strict";

(() => {
  const WHATSAPP_NUMBER = "917827305767";
  const PREPAYMENT_PER_UNIT = 99;
  const MAX_QUANTITY = 20;

  const KEYS = {
    cart: "gulship_cart_v2",
    customer: "gulship_customer_v2",
    closed: "gulship_store_closed_v1",
    activity: "gulship_activity_v1"
  };

  // Product data: filenames and prices can be edited here.
  const products = [
    {
     id: "meta-rayban",
name: "Rayban Meta AI Sunglasses Gen 2",
category: "Meta Glasses",
price: 1499,
oldPrice: 1949,
      images: [
        "meta1.jpg", "meta2.jpg", "meta3.jpg", "meta4.jpg",
        "meta5.jpg", "meta6.jpg", "meta7.jpg", "meta8.jpg",
        "meta9.jpg", "meta10.jpg", "meta11.mp4"
      ],
      description:
        "Make a statement with the Rayban Meta AI Sunglasses Gen 2, a contemporary eyewear option with a distinctive, technology-inspired aesthetic. Its bold everyday look is suited to customers who want their accessories to stand out while keeping styling versatile. Browse the complete gallery, including the product video, to inspect the appearance before ordering. Exact technical capabilities, lens properties, device compatibility, warranty and included accessories must be confirmed with GULSHIP before purchase.",
      highlights: [
        "Distinctive smart-glasses-inspired appearance",
        "Contemporary styling for everyday outings and travel",
        "Product gallery includes multiple images and a video",
        "Confirm exact specifications, compatibility and box contents with GULSHIP"
      ],
      shortDescription:
        "A standout smart-glasses-inspired look with a detailed product gallery.",
      badge: "TOP RATED"
    },
    {
      id: "ai-goggles",
      name: "A1 Goggles",
      category: "Sunglasses",
      price: 499,
      oldPrice: 748,
      images: ["sunglasses1.jpg", "sunglasses.mp4"],
      description:
        "Upgrade your everyday accessory collection with A1 AI Goggles. The design offers a modern eyewear look that can complement casual outfits, weekend plans and travel styling. Explore the product image and accompanying video to get a better view of the design. The term AI in the product name should not be taken as confirmation of any specific smart feature; ask GULSHIP to verify supported functions, lens properties, frame material and compatibility before placing an order.",
      highlights: [
        "Contemporary eyewear-inspired design",
        "Includes a product video in the gallery",
        "Easy to pair with everyday casual styling",
        "Ask GULSHIP to confirm actual smart features and specifications"
      ],
      shortDescription: "Modern everyday eyewear with an additional product video.",
      badge: "POPULAR"
    },
    {
      id: "a2-goggles",
      name: "A2 Goggles",
      category: "Sunglasses",
      price: 499,
      oldPrice: 698,
      images: ["goggles1.jpg", "goggles2.jpg", "goggles3.jpg"],
      description:
        "Discover A2 Goggles, a versatile eyewear option for customers who want a fresh addition to their everyday style. Three product images let you examine the appearance from different views before making a decision. Whether you are choosing eyewear for casual outings or as a style accessory, check the gallery carefully and contact GULSHIP for information about sizing, frame material, lens type, UV protection and other specifications.",
      highlights: [
        "Three product images for a closer look",
        "Contemporary style for everyday outfits",
        "A practical option for your accessory collection",
        "Verify lens protection, sizing and material before purchase"
      ],
      shortDescription: "Explore three product views before choosing your style.",
      badge: "EVERYDAY STYLE"
    },
    {
      id: "a3-goggles",
      name: "A3 Goggles",
      category: "Sunglasses",
      price: 499,
      oldPrice: 748,
      images: ["sunglasses3.jpg"],
      description:
        "A3 Goggles bring another distinctive option to the GULSHIP eyewear collection. The design can add a finishing touch to casual outfits and everyday looks. Review the available product image to assess its appearance and ask GULSHIP about frame dimensions, material, lens characteristics, fit and any protective features. Product specifications should be confirmed before ordering rather than inferred from appearance alone.",
      highlights: [
        "Distinctive eyewear styling",
        "Suitable for a variety of casual looks",
        "A budget-conscious accessory option",
        "Confirm fit, lens details and material with the seller"
      ],
      shortDescription: "A distinctive eyewear option for everyday styling.",
      badge: "STYLE PICK"
    },
    {
      id: "a4-goggles",
      name: "A4 Goggles",
      category: "Sunglasses",
      price: 499,
      oldPrice: 698,
      images: ["goggle1.jpg", "goggle2.jpg", "goggle3.jpg"],
      description:
        "Refresh your accessory collection with A4 Goggles. This product includes three gallery images so you can examine its appearance before placing an order. Its contemporary eyewear styling can complement a range of casual looks. For an informed purchase, confirm the exact frame finish, dimensions, lens material, UV protection and fit with GULSHIP. Any technical or protective claims should be verified with the seller.",
      highlights: [
        "Three product images in the gallery",
        "Modern eyewear styling",
        "Easy to explore before ordering",
        "Confirm dimensions, fit and lens specifications with GULSHIP"
      ],
      shortDescription: "Three product views to help you inspect the design.",
      badge: "NEW LOOK"
    },
    {
      id: "ai-airbuds",
      name: "A1 Airbuds",
      category: "Airbuds",
      price: 699,
      oldPrice: 898,
      images: ["airbuds1.jpg"],
      description:
        "AI Airbuds are an everyday audio accessory for commuting, travel and leisure. Their compact earbud-style form is designed to fit naturally into a personal-tech collection. Check the product image to inspect the design and charging case. Battery life, supported devices, charging method, controls, microphone quality and any AI-related functions vary by model and should be confirmed with GULSHIP before purchase.",
      highlights: [
        "Compact wireless-earbud-style accessory",
        "Suitable for everyday audio routines",
        "Convenient size for carrying with other tech essentials",
        "Confirm battery, charging and compatibility details"
      ],
      shortDescription: "A compact audio accessory for daily routines.",
      badge: "POPULAR"
    },
    {
      id: "a2-airbuds",
      name: "A2 Airbuds",
      category: "Airbuds",
      price: 699,
      oldPrice: 948,
      images: ["airbuds2.jpg"],
      description:
        "Add A2 Airbuds to your everyday tech setup for a compact audio accessory suited to daily routines and travel. The product image provides a first look at the design; check the exact charging case and included accessories with GULSHIP. Before ordering, confirm device compatibility, battery performance, charging connection, control functions, microphone availability and the contents of the retail package.",
      highlights: [
        "Compact, carry-friendly design",
        "Useful for everyday audio routines",
        "Easy to include in a personal-tech collection",
        "Confirm compatibility and package contents before purchase"
      ],
      shortDescription: "Compact earbuds for your everyday tech collection.",
      badge: "DAILY ESSENTIAL"
    },
    {
      id: "a3-airbuds",
      name: "A3 Airbuds",
      category: "Airbuds",
      price: 749,
      oldPrice: 948,
      images: ["airbuds3.jpg"],
      description:
        "A3 Airbuds offer another option for customers exploring everyday wireless audio accessories. Their compact form makes them easy to carry with your other personal-tech essentials. Review the available image and check with GULSHIP for the exact model specifications, supported devices, sound controls, microphone functions, charging method, battery performance and included accessories before confirming your order.",
      highlights: [
        "Contemporary in-ear audio accessory",
        "Designed for everyday personal-tech use",
        "Compact option for routines and travel",
        "Verify specifications and included accessories with GULSHIP"
      ],
      shortDescription: "A contemporary audio option for daily use.",
      badge: "SMART PICK"
    },
    {
      id: "a4-airbuds",
      name: "A4 Airbuds + FREE WATCH",
      category: "Airbuds",
      price: 799,
      oldPrice: 998,
      images: ["airbuds4.jpg"],
      description:
        "Get the A4 Airbuds bundle, advertised with a complimentary watch. This offer combines an audio accessory with an additional item in one package at the displayed price. Before ordering, contact GULSHIP to verify current offer availability, the exact watch model, included accessories, compatibility and warranty terms. Smartwatch functions and earbud specifications depend on the actual models supplied.",
      highlights: [
        "Advertised bundle includes A4 Airbuds and a FREE watch",
        "Displayed bundle price: ₹799",
        "Confirm the watch model and offer availability before ordering",
        "Check the included items and specifications with GULSHIP"
      ],
      shortDescription: "A4 Airbuds bundle advertised with a complimentary watch.",
      badge: "FREE WATCH"
    }
  ];

  const categories = [
    { name: "All", icon: "fa-border-all" },
    { name: "Meta Glasses", icon: "fa-glasses" },
    { name: "Sunglasses", icon: "fa-glasses" },
    { name: "Airbuds", icon: "fa-ear-listen" }
  ];

  const $ = id => document.getElementById(id);

  const pages = [
  "homePage",
  "productPage",
  "cartPage",
  "aboutPage",
  "checkoutPage",
  "confirmationPage",
  "closedPage"
];

  let cart = readJSON(KEYS.cart, []);
  let customer = readJSON(KEYS.customer, {});
  let selectedCategory = "All";
  let currentProduct = null;
  let detailQuantity = 1;
  let toastTimeout = null;
  let pendingWhatsAppUrl = "";
  let internalNavigation = false;

  function stopDetailVideos() {
  const gallery = $("detailGallery");
  if (!gallery) return;

  gallery.querySelectorAll("video").forEach(video => {
    video.pause();

    try {
      video.currentTime = 0;
    } catch {}

    video.removeAttribute("autoplay");
  });
}

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("[GULSHIP] Could not save local data:", error);
    }
  }

  function money(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });
  }

  function whatsappMoney(value) {
    return "Rs. " + Number(value || 0).toFixed(2);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getProduct(id) {
    return products.find(product => product.id === id);
  }

  function getCartLines() {
    return cart.map(item => {
      const product = getProduct(item.id);
      return product
        ? { ...product, qty: Math.max(1, Math.min(MAX_QUANTITY, Number(item.qty) || 1)) }
        : null;
    }).filter(Boolean);
  }

  function getTotal(lines = getCartLines()) {
    return lines.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function getProductQuantity(lines = getCartLines()) {
    return lines.reduce((sum, item) => sum + item.qty, 0);
  }

  function getPrepayment(lines = getCartLines()) {
    return getProductQuantity(lines) * PREPAYMENT_PER_UNIT;
  }

  function showToast(message) {
    const toast = $("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function isStoreClosed() {
    return localStorage.getItem(KEYS.closed) === "true";
  }

  function saveCart() {
    writeJSON(KEYS.cart, cart);
    updateCartCount();
  }

  function updateCartCount() {
    const count = getProductQuantity();
    if ($("cartCount")) $("cartCount").textContent = count;
    if ($("bottomCartCount")) $("bottomCartCount").textContent = count;
  }

  function closeSearch(clear = false) {
    if (!$("searchScreen")) return;

    $("searchScreen").classList.remove("open");
    $("searchScreen").setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-mode");

    if (clear && $("searchInput")) {
      $("searchInput").value = "";
      renderSearchResults();
    }
  }

  function clearDetailPurchasePin() {
    const purchase = document.querySelector("#productPage .detail-purchase");
    const boundary = document.querySelector("#productPage .detail-sticky-boundary");
    if (!purchase || !boundary) return;

    purchase.classList.remove("is-pinned");
    boundary.classList.remove("purchase-is-pinned");
    boundary.style.removeProperty("--detail-purchase-space");
  }

  function updateDetailPurchasePin() {
    const productPage = $("productPage");
    const purchase = document.querySelector("#productPage .detail-purchase");
    const boundary = document.querySelector("#productPage .detail-sticky-boundary");
    if (!productPage || !purchase || !boundary) return;

    if (!productPage.classList.contains("active")) {
      clearDetailPurchasePin();
      return;
    }

    const top = window.innerWidth <= 650 ? 74 : 86;
    const purchaseRect = purchase.getBoundingClientRect();
    const boundaryBottom = boundary.getBoundingClientRect().bottom;
    const pinned = purchase.classList.contains("is-pinned");

    if (!pinned && purchaseRect.top <= top && boundaryBottom > top + purchaseRect.height) {
      const styles = window.getComputedStyle(purchase);
      const space = purchaseRect.height +
        (parseFloat(styles.marginTop) || 0) +
        (parseFloat(styles.marginBottom) || 0);

      boundary.style.setProperty("--detail-purchase-space", `${space}px`);
      boundary.classList.add("purchase-is-pinned");
      purchase.classList.add("is-pinned");
      return;
    }

    if (pinned && boundaryBottom <= top + purchaseRect.height) {
      clearDetailPurchasePin();
    }
  }
 
function showPage(page, options = {}) {
  if (!pages.includes(page)) page = "homePage";

  if (isStoreClosed() && page !== "closedPage" && !options.allowClosed) {
    page = "closedPage";
  }

  pages.forEach(id => {
    if ($(id)) $(id).classList.toggle("active", id === page);
  });

  if (page !== "productPage") {
    stopDetailVideos();

    if (window.detailPurchaseObserver) {
      window.detailPurchaseObserver.disconnect();
      window.detailPurchaseObserver = null;
    }

    document.querySelector("#productPage .detail-purchase")
      ?.classList.remove("is-hidden");
  }

  const restricted = [
    "closedPage",
    "checkoutPage",
    "confirmationPage",
    "productPage"
  ].includes(page);

  document.body.classList.toggle(
    "checkout-mode",
    page === "checkoutPage"
  );

  if ($("topbar")) {
    $("topbar").style.display =
      ["closedPage", "checkoutPage"].includes(page) ? "none" : "";
  }

  if ($("bottomNav")) {
    $("bottomNav").style.display = restricted ? "none" : "";
  }

  closeSearch(false);

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page ||
      (page === "productPage" && button.dataset.page === "homePage")
    );
  });

  if (page === "cartPage") renderCart();
  if (page === "checkoutPage") fillCustomerForm();

  window.scrollTo({ top: 0, behavior: "instant" });

 

  if (options.hash !== false) {
    const hash = "#" + page.replace("Page", "").toLowerCase();

    if (options.pushHistory) {
      internalNavigation = true;
      history.pushState({ gulshipPage: page }, "", hash);
      internalNavigation = false;
    } else {
      try {
        history.replaceState({ gulshipPage: page }, "", hash);
      } catch {}
    }
  }
}


  function renderCategories() {
    $("categoryRow").innerHTML = categories.map(category => `
      <button class="category-chip ${selectedCategory === category.name ? "active" : ""}"
              data-category="${escapeHTML(category.name)}"
              type="button">
        <i class="fa-solid ${category.icon}" aria-hidden="true"></i>
        <span>${escapeHTML(category.name)}</span>
      </button>
    `).join("");

    $("categoryRow").querySelectorAll("[data-category]").forEach(button => {
      button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        renderCategories();
        renderProducts();
      });
    });
  }

function renderRelatedProducts(currentProductId) {
  const grid = $("relatedProductsGrid");
  if (!grid) return;

  const available = products.filter(
    product => product.id !== currentProductId
  );

  // Random order on each product-details visit.
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  const suggestions = available.slice(0, 4);

  grid.innerHTML = suggestions
    .map(product => productCard(product, false))
    .join("");
}

  function discountPercent(product) {
    if (!product.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round((1 - product.price / product.oldPrice) * 100);
  }

  
function productCard(product, featured = false) {
  const hasDiscount =
    Number(product.oldPrice) > Number(product.price);

  const isMetaRayban = product.id === "meta-rayban";

  return `
    <article class="product-card ${featured ? "featured-meta" : ""}">
      <div class="product-image-wrap"
           data-open-product="${product.id}"
           role="button"
           tabindex="0"
           aria-label="View ${escapeHTML(product.name)}">

        <img src="${escapeHTML(product.images[0])}"
             alt="${escapeHTML(product.name)}"
             loading="eager"
             decoding="async">

        <span class="product-badge">
          ${escapeHTML(product.badge || "GULSHIP PICK")}
        </span>
      </div>

      <div class="product-content">
        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>

        <h3 data-open-product="${product.id}">
          ${escapeHTML(product.name)}
        </h3>

        ${featured
          ? `<p class="product-description-short">${escapeHTML(product.shortDescription)}</p>`
          : ""}

        ${isMetaRayban ? `
          <div class="meta-customer-rating">
            <span class="meta-rating-stars">★★★★★</span>
            <strong>4.9/5</strong>
            <span>15k+ Happy Customers</span>
          </div>
        ` : ""}

        <div class="product-price-row">
          <span class="product-price">
            ${money(product.price)}
          </span>

          ${hasDiscount ? `
            <del class="product-old-price">
              ${money(product.oldPrice)}
            </del>

            <span class="product-discount">
              ${discountPercent(product)}% OFF
            </span>
          ` : ""}
        </div>

        <div class="card-bottom">
          <button class="card-view-btn"
                  data-view-product="${product.id}"
                  type="button">
            View Details <i class="fa-solid fa-arrow-right"></i>
          </button>

          <button class="card-add-btn"
                  data-add-product="${product.id}"
                  type="button"
                  aria-label="Add ${escapeHTML(product.name)} to shopping bag"
                  title="Add to Shopping Bag">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}


  function renderProducts() {
    const filtered = products.filter(product =>
      selectedCategory === "All" || product.category === selectedCategory
    );

    $("productsHeading").textContent =
      selectedCategory === "All" ? "All Products" : selectedCategory;

    $("resultCount").textContent =
      `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;

    $("noProducts").classList.toggle("hidden", filtered.length > 0);

    $("productGrid").innerHTML = filtered.map(product =>
      productCard(
        product,
        selectedCategory === "Meta Glasses" && product.id === "meta-rayban"
      )
    ).join("");

    $("productGrid").querySelectorAll("img").forEach(img => {
      img.addEventListener("error", () => {
        console.error("[GULSHIP] Image not found:", img.getAttribute("src"));
        img.classList.add("image-load-failed");
        img.alt = img.alt + " (image unavailable)";
      }, { once: true });
    });
  }

  function renderSearchResults() {
    const query = $("searchInput").value.trim().toLowerCase();

    const filtered = products.filter(product =>
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );

    $("searchHeading").textContent = query ? "Search Results" : "Explore GULSHIP";
    $("searchSubheading").textContent = query
      ? `${filtered.length} matching ${filtered.length === 1 ? "product" : "products"}`
      : "Browse the collection or type a product name above.";

    $("searchEmpty").classList.toggle("hidden", filtered.length > 0);
    $("searchResults").innerHTML =
      filtered.map(product => productCard(product, false)).join("");
  }

  function openSearch() {
    if (isStoreClosed()) return;

    $("searchScreen").classList.add("open");
    $("searchScreen").setAttribute("aria-hidden", "false");
    document.body.classList.add("search-mode");

    renderSearchResults();
    setTimeout(() => $("searchInput").focus(), 50);
  }

  function openProduct(id) {

    const product = getProduct(id);
    if (!product) return;

    currentProduct = product;
    detailQuantity = 1;

    $("detailCategory").textContent = product.category.toUpperCase();
    $("detailName").textContent = product.name;
    $("detailPrice").textContent = money(product.price);

const hasDiscount =
  Number(product.oldPrice) > Number(product.price);

$("detailOldPrice").textContent = hasDiscount
  ? money(product.oldPrice)
  : "";

$("detailDiscount").textContent = hasDiscount
  ? `${discountPercent(product)}% OFF`
  : "";

$("detailOldPrice").classList.toggle("hidden", !hasDiscount);
$("detailDiscount").classList.toggle("hidden", !hasDiscount);
    $("detailDescription").textContent = product.description;
    $("detailQty").textContent = detailQuantity;

    const gallery = $("detailGallery");
    gallery.classList.toggle("multi", product.images.length > 1);

    gallery.innerHTML = product.images.map((src, index) => {
      if (src.toLowerCase().endsWith(".mp4")) {
        return `
          <video src="${escapeHTML(src)}"
                 controls
                 playsinline
                 preload="metadata"
                 aria-label="${escapeHTML(product.name)} product video">
            Your browser does not support embedded video.
          </video>
        `;
      }

      return `
        <img src="${escapeHTML(src)}"
             alt="${escapeHTML(product.name)} product image ${index + 1}"
             loading="${index === 0 ? "eager" : "lazy"}"
             decoding="async">
      `;
    }).join("");

    $("galleryHint").classList.toggle("hidden", product.images.length < 2);
    $("galleryHint").innerHTML = product.images.some(src => src.endsWith(".mp4"))
      ? '<i class="fa-solid fa-arrows-left-right"></i> Swipe through the gallery to view every image and video'
      : '<i class="fa-solid fa-arrows-left-right"></i> Swipe to explore product images';

    $("detailHighlights").innerHTML = product.highlights.map(highlight => `
      <div class="highlight-item">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
        <span>${escapeHTML(highlight)}</span>
      </div>
    `).join("");
    renderRelatedProducts(product.id);
    showPage("productPage", { pushHistory: true });
  }

  function changeDetailQty(amount) {
    detailQuantity = Math.max(1, Math.min(MAX_QUANTITY, detailQuantity + amount));
    $("detailQty").textContent = detailQuantity;
  }

  function addToCart(id, qty = 1) {
    const product = getProduct(id);
    if (!product) return;

    const quantity = Math.max(1, Math.min(MAX_QUANTITY, Number(qty) || 1));
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty = Math.min(MAX_QUANTITY, existing.qty + quantity);
    } else {
      cart.push({ id, qty: quantity });
    }

    saveCart();
    showToast(`${product.name} added to your bag`);
  }

  function updateCartQty(id, amount) {
    const item = cart.find(entry => entry.id === id);
    if (!item) return;

    item.qty = Math.min(MAX_QUANTITY, Math.max(1, item.qty + amount));
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    showToast("Item removed from your bag");
  }

  function renderCart() {
    const lines = getCartLines();
    const empty = lines.length === 0;

    $("emptyCart").classList.toggle("hidden", !empty);
    $("cartSummary").classList.toggle("hidden", empty);

    $("cartItems").innerHTML = lines.map(item => `
      <article class="cart-item">
        <img src="${escapeHTML(item.images[0])}" alt="${escapeHTML(item.name)}" loading="eager">

        <div class="cart-item-main">
          <h3>${escapeHTML(item.name)}</h3>
          <div class="cart-unit-price">${money(item.price)} each</div>

          <div class="cart-actions">
            <div class="quantity-control">
              <button data-cart-minus="${item.id}" type="button" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>${item.qty}</span>
              <button data-cart-plus="${item.id}" type="button" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>

            <button class="remove-btn" data-remove="${item.id}" type="button">
              <i class="fa-regular fa-trash-can"></i> Remove
            </button>
          </div>
        </div>

        <div class="cart-item-total">${money(item.price * item.qty)}</div>
      </article>
    `).join("");

    $("cartSubtotal").textContent = money(getTotal(lines));
    $("cartGrandTotal").textContent = money(getTotal(lines));

    $("cartItems").querySelectorAll("[data-cart-minus]").forEach(button => {
      button.addEventListener("click", () => updateCartQty(button.dataset.cartMinus, -1));
    });

    $("cartItems").querySelectorAll("[data-cart-plus]").forEach(button => {
      button.addEventListener("click", () => updateCartQty(button.dataset.cartPlus, 1));
    });

    $("cartItems").querySelectorAll("[data-remove]").forEach(button => {
      button.addEventListener("click", () => removeFromCart(button.dataset.remove));
    });
  }

  const customerFieldMap = {
    customerName: "name",
    customerPhone: "phone",
    customerAddress: "address",
    customerCity: "city",
    customerState: "state",
    customerPincode: "pincode",
    customerNote: "note"
  };

  function autosaveCustomerForm() {
    Object.entries(customerFieldMap).forEach(([id, key]) => {
      const input = $(id);
      if (!input) return;

      input.addEventListener("input", () => {
        customer[key] = input.value;
        writeJSON(KEYS.customer, customer);
      });
    });
  }

  function fillCustomerForm() {
    Object.entries(customerFieldMap).forEach(([id, key]) => {
      if ($(id) && customer[key] !== undefined) {
        $(id).value = customer[key];
      }
    });
  }

  function readCustomerForm() {
    return {
      name: $("customerName").value.trim(),
      phone: $("customerPhone").value.trim(),
      address: $("customerAddress").value.trim(),
      city: $("customerCity").value.trim(),
      state: $("customerState").value.trim(),
      pincode: $("customerPincode").value.trim(),
      note: $("customerNote").value.trim()
    };
  }

  function validateCustomer(buyer) {
    if (!buyer.name || !buyer.phone || !buyer.address ||
        !buyer.city || !buyer.state || !buyer.pincode) {
      showToast("Please complete all required delivery details.");
      return false;
    }

    if (!/^[0-9+\-\s()]{8,18}$/.test(buyer.phone)) {
      showToast("Please enter a valid contact number.");
      $("customerPhone").focus();
      return false;
    }

    if (!/^[0-9]{6}$/.test(buyer.pincode)) {
      showToast("Please enter a valid 6-digit PIN code.");
      $("customerPincode").focus();
      return false;
    }

    return true;
  }

  function buildWhatsAppMessage(snapshot) {
    const divider = "━━━━━━━━━━━━━━━━━━";

    const itemLines = snapshot.lines.map(item =>
      `${item.name} x ${item.qty} = ${whatsappMoney(item.price * item.qty)}`
    );

   const message = [
  "\u{1F451} *GULSHIP*",
  divider,
  "\u{1F9FE} *NEW ORDER REQUEST*",
  "",
  "\u{1F464} *CUSTOMER DETAILS*",
  `\u2022 Name: ${snapshot.customer.name}`,
  `\u2022 Phone: ${snapshot.customer.phone}`,
  `\u2022 Address: ${snapshot.customer.address}`,
  `\u2022 City: ${snapshot.customer.city}`,
  `\u2022 State: ${snapshot.customer.state}`,
  `\u2022 PIN Code: ${snapshot.customer.pincode}`,
  "",
  divider,
  "\u{1F6CD}\uFE0F *ORDER SUMMARY*",
  "",
  ...itemLines,
  "",
  divider,
  ...(snapshot.customer.note
    ? [
        "\u{1F4DD} *SPECIAL REQUEST*",
        snapshot.customer.note,
        "",
        divider
      ]
    : []),
  `\u{1F4B0} *TOTAL AMOUNT: ${money(snapshot.total)}*`,
  "",
  `\u{1F4E6} Total product quantity: ${snapshot.quantity}`,
  `\u{1F4B3} Required manual prepayment: ${money(snapshot.prepayment)} (₹99 × ${snapshot.quantity} units)`,
  `\u{1F69A} Estimated remaining COD: ${money(snapshot.cod)}`,
  "Delivery charges, if applicable, will be confirmed separately.",
  "",
  "Thank you."
];

return message.join("\n");
  }

function setOrderButtonLoading(loading) {
  const button = $("confirmPayment");
  if (!button) return;

  if (loading) {
    if (!button.dataset.originalHtml) {
      button.dataset.originalHtml = button.innerHTML;
    }

    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
    button.setAttribute("aria-label", "Opening WhatsApp");

    button.innerHTML = `
      <span class="order-loader" aria-hidden="true"></span>
      <span>Opening WhatsApp...</span>
    `;
    button.disabled = true;
  } else {
    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
    button.removeAttribute("aria-label");

    if (button.dataset.originalHtml) {
      button.innerHTML = button.dataset.originalHtml;
    }

    button.disabled = false;
  }
}

  function submitOrderRequest() {
    const lines = getCartLines();

    if (!lines.length) {
      showToast("Your shopping bag is empty.");
      showPage("homePage");
      return;
    }

    if (!validateCustomer(customer)) {
      showPage("checkoutPage");
      return;
    }

    const total = getTotal(lines);
    const quantity = getProductQuantity(lines);
    const prepayment = getPrepayment(lines);

    const snapshot = {
      orderId: `GUL-${Date.now()}`,
      lines: lines.map(item => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      total,
      quantity,
      prepayment,
      cod: Math.max(0, total - prepayment),
      customer: { ...customer }
    };

    const message = buildWhatsAppMessage(snapshot);
    pendingWhatsAppUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
// Clear the cart immediately when Place Order is clicked.
cart = [];
saveCart();
    // Local record only: this is NOT a shared admin database.
    // Connect this event to a backend when the admin panel is built.
    const activity = readJSON(KEYS.activity, []);
    activity.unshift({
      orderId: snapshot.orderId,
      customer: snapshot.customer,
      items: snapshot.lines,
      total: snapshot.total,
      quantity: snapshot.quantity,
      prepaymentRequired: snapshot.prepayment,
      codEstimate: snapshot.cod,
      status: "WhatsApp Redirect Clicked",
      clickedAt: new Date().toISOString()
    });
    writeJSON(KEYS.activity, activity.slice(0, 100));

   
    // Show the loading state before navigating to WhatsApp.
    setOrderButtonLoading(true);

   // Cart has already been cleared after preparing the order message.
    showPage("confirmationPage", { pushHistory: true });

    // User must send the pre-filled message themselves.
    // Use the same tab to avoid popup blockers.
    window.location.assign(pendingWhatsAppUrl);

  }

  function bindEvents() {
   

    document.querySelectorAll("[data-page]").forEach(button => {
      button.addEventListener("click", () => {
        const page = button.dataset.page;

        if (page === "cartPage") renderCart();
        showPage(page, { pushHistory: true });
      });
    });

    $("searchToggle").addEventListener("click", openSearch);
    $("closeSearch").addEventListener("click", () => closeSearch(true));

    $("clearSearch").addEventListener("click", () => {
      $("searchInput").value = "";
      renderSearchResults();
      $("searchInput").focus();
    });

    $("searchInput").addEventListener("input", renderSearchResults);

    document.addEventListener("click", event => {
      const addButton = event.target.closest("[data-add-product]");

      if (addButton) {
        event.preventDefault();
        addToCart(addButton.dataset.addProduct, 1);
        return;
      }

      const viewButton = event.target.closest("[data-view-product]");

      if (viewButton) {
        event.preventDefault();
        openProduct(viewButton.dataset.viewProduct);
        return;
      }

      const openTarget = event.target.closest("[data-open-product]");

      if (openTarget) {
        openProduct(openTarget.dataset.openProduct);
      }
    });

    document.addEventListener("keydown", event => {
      const openTarget = event.target.closest("[data-open-product]");
      if (openTarget && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openProduct(openTarget.dataset.openProduct);
      }

      if (event.key === "Escape" && $("searchScreen").classList.contains("open")) {
        closeSearch(true);
      }
    });

    $("shopCollection").addEventListener("click", () => {
      selectedCategory = "All";
      renderCategories();
      renderProducts();
      $("productsSection").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    $("resetProducts").addEventListener("click", () => {
      selectedCategory = "All";
      renderCategories();
      renderProducts();
    });

    $("showAllProducts").addEventListener("click", () => {
      selectedCategory = "All";
      renderCategories();
      renderProducts();
    });

    $("detailQtyMinus").addEventListener("click", () => changeDetailQty(-1));
    $("detailQtyPlus").addEventListener("click", () => changeDetailQty(1));

    $("addDetailToCart").addEventListener("click", () => {
      if (!currentProduct) return;

      addToCart(currentProduct.id, detailQuantity);
      selectedCategory = "All";
      renderCategories();
      renderProducts();

      // Requested behavior: return to the home screen after adding from details.
      showPage("homePage", { pushHistory: true });
    });

    $("proceedCheckout").addEventListener("click", () => {
      if (!getCartLines().length) {
        showToast("Add products to your bag first.");
        return;
      }

      showPage("checkoutPage", { pushHistory: true });
    });

    $("customerForm").addEventListener("submit", event => {
      event.preventDefault();

      if (!event.currentTarget.reportValidity()) return;

      customer = readCustomerForm();
      if (!validateCustomer(customer)) return;

      writeJSON(KEYS.customer, customer);
      submitOrderRequest();
    });

    $("checkoutBack").addEventListener("click", () => {
      showPage("cartPage", { pushHistory: true });
    });

    $("reopenWhatsApp").addEventListener("click", () => {
      if (pendingWhatsAppUrl) window.location.href = pendingWhatsAppUrl;
      else showToast("Please review your order again from the shopping bag.");
    });

    $("returnHomeAfterOrder").addEventListener("click", () => {
      showPage("homePage", { pushHistory: true });
      showToast("Your bag is saved until you change or clear it.");
    });

    $("refreshBtn").addEventListener("click", () => window.location.reload());

   $("exitStore").addEventListener("click", () => {
  // Try to close the current tab.
  window.close();

  // Browsers usually block closing tabs opened manually.
  // If closing is blocked, show a clean exit message.
  setTimeout(() => {
    if (!window.closed) {
      document.body.innerHTML = `
        <main style="
          min-height:100vh;
          display:grid;
          place-items:center;
          padding:24px;
          text-align:center;
          font-family:Arial,sans-serif;
          background:#f7f2e8;
          color:#25251f;
        ">
          <div>
            <h1 style="letter-spacing:4px;">GULSHIP</h1>
            <p>The store is currently closed.</p>
            <p>You can close this browser tab now.</p>
          </div>
        </main>
      `;
    }
  }, 150);
});

    window.addEventListener("storage", event => {
      if (event.key === KEYS.closed && isStoreClosed()) {
        showPage("closedPage", { hash: false });
      }
    });

    // Mobile / browser back navigation.
window.addEventListener("popstate", event => {
  if (internalNavigation) return;

  const pageFromState = event.state?.gulshipPage;

  if (pages.includes(pageFromState)) {
    showPage(pageFromState, { hash: false });
    return;
  }

  const hash = location.hash.replace("#", "").toLowerCase();

  const matchingPage = pages.find(page =>
    page.replace("Page", "").toLowerCase() === hash
  );

  showPage(matchingPage || "homePage", { hash: false });
});

// Keep an app history entry so the first Back press returns to Home
// instead of immediately leaving the website.
function initializeBackNavigation() {
  if (!history.state?.gulshipPage) {
    history.replaceState(
      { gulshipPage: "homePage", gulshipRoot: true },
      "",
      location.href
    );
  }
}

initializeBackNavigation();
  }

  function initialize() {
    renderCategories();
    renderProducts();
    renderSearchResults();
    updateCartCount();
    fillCustomerForm();
    autosaveCustomerForm();
    bindEvents();

    const initialHash = location.hash.replace("#", "").toLowerCase();
    const initialPage = pages.find(page =>
      page.replace("Page", "").toLowerCase() === initialHash
    );

    if (isStoreClosed()) {
      showPage("closedPage", { hash: false });
    } else {
      showPage(initialPage || "homePage", { hash: false });
    }
  }

  initialize();
})();
