
"use strict";

(() => {
  const KEYS = {
    closed: "gulship_store_closed_v1",
    activity: "gulship_activity_v1"
  };

  const $ = id => document.getElementById(id);

  let activityRecords = [];
  let toastTimer = null;
  let dialogAction = null;

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
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

  function money(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });
  }

  function getClosed() {
    try {
      return localStorage.getItem(KEYS.closed) === "true";
    } catch {
      return false;
    }
  }

  function showToast(message) {
    const toast = $("adminToast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  function formatDate(value) {
    if (!value) return "Time not recorded";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function sameLocalDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  function getRecordDate(record) {
    const date = new Date(record.clickedAt || "");
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function normalizeRecord(record) {
    const customer = record?.customer || {};
    const items = Array.isArray(record?.items) ? record.items : [];

    return {
      orderId: String(record?.orderId || "GUL-UNKNOWN"),
      customer: {
        name: String(customer.name || "Customer"),
        phone: String(customer.phone || ""),
        address: String(customer.address || ""),
        city: String(customer.city || ""),
        state: String(customer.state || ""),
        pincode: String(customer.pincode || ""),
        note: String(customer.note || "")
      },
      items: items.map(item => ({
        id: String(item.id || ""),
        name: String(item.name || "Product"),
        qty: Math.max(1, Number(item.qty) || 1),
        price: Math.max(0, Number(item.price) || 0)
      })),
      total: Math.max(0, Number(record?.total) || 0),
      quantity: Math.max(0, Number(record?.quantity) || 0),
      prepaymentRequired: Math.max(
        0, Number(record?.prepaymentRequired) || 0
      ),
      codEstimate: Math.max(0, Number(record?.codEstimate) || 0),
      status: String(record?.status || "WhatsApp Redirect Clicked"),
      clickedAt: record?.clickedAt || ""
    };
  }

  function loadActivity() {
    const saved = readJSON(KEYS.activity, []);
    activityRecords = Array.isArray(saved)
      ? saved.map(normalizeRecord)
      : [];

    activityRecords.sort((a, b) => {
      return (getRecordDate(b)?.getTime() || 0) -
        (getRecordDate(a)?.getTime() || 0);
    });
  }

  function renderStoreStatus() {
    const closed = getClosed();
    const card = document.querySelector(".store-card");

    card.classList.toggle("is-closed", closed);

    $("storeIcon").innerHTML = closed
      ? '<i class="fa-solid fa-store-slash"></i>'
      : '<i class="fa-solid fa-store"></i>';

    $("storeStatusTitle").textContent = closed
      ? "Your store is closed"
      : "Your store is open";

    $("storeStatusDescription").textContent = closed
      ? "The customer website should show its closed-store screen."
      : "Customers can browse the catalogue and start an order request.";

    $("storeStatusText").textContent = closed ? "Closed" : "Open";

    $("toggleStore").innerHTML = closed
      ? '<i class="fa-solid fa-power-off"></i><span>Open Store</span>'
      : '<i class="fa-solid fa-power-off"></i><span>Close Store</span>';
  }

  function recordCard(record, index) {
    const customer = record.customer;
    const initials = (customer.name.trim().charAt(0) || "C").toUpperCase();

    const productsHTML = record.items.length
      ? record.items.map(item => `
          <div class="activity-product">
            <span>${escapeHTML(item.name)} × ${item.qty}</span>
            <strong>${money(item.price * item.qty)}</strong>
          </div>
        `).join("")
      : '<div class="activity-note">No item details were saved for this record.</div>';

    const location = [
      customer.city,
      customer.state,
      customer.pincode
    ].filter(Boolean).join(", ");

    const address = [
      customer.address,
      location
    ].filter(Boolean).join(" · ");

    return `
      <article class="activity-card" style="animation-delay:${Math.min(index * 35, 250)}ms">
        <div class="activity-card-top">
          <div class="customer-identity">
            <div class="customer-avatar">${escapeHTML(initials)}</div>
            <div>
              <h3>${escapeHTML(customer.name)}</h3>
              <p>${escapeHTML(customer.phone || "Phone not recorded")}</p>
              <p>${escapeHTML(record.orderId)}</p>
            </div>
          </div>

          <span class="order-status">
            <i class="fa-brands fa-whatsapp"></i>
            ${escapeHTML(record.status)}
          </span>
        </div>

        <div class="activity-meta">
          <span>
            <i class="fa-regular fa-clock"></i>
            ${escapeHTML(formatDate(record.clickedAt))}
          </span>
          <span>
            <i class="fa-solid fa-box"></i>
            ${record.quantity} product unit${record.quantity === 1 ? "" : "s"}
          </span>
          <span>
            <i class="fa-solid fa-location-dot"></i>
            ${escapeHTML(address || "Address not recorded")}
          </span>
        </div>

        <div class="activity-products">${productsHTML}</div>

        <div class="activity-totals">
          <div class="total-cell">
            <span>Product total</span>
            <strong>${money(record.total)}</strong>
          </div>
          <div class="total-cell emphasis">
            <span>Manual prepayment required</span>
            <strong>${money(record.prepaymentRequired)}</strong>
          </div>
          <div class="total-cell">
            <span>Estimated remaining product amount</span>
            <strong>${money(record.codEstimate)}</strong>
          </div>
        </div>

        ${customer.note ? `
          <p class="activity-note">
            <i class="fa-regular fa-note-sticky"></i>
            <strong>Customer request:</strong>
            ${escapeHTML(customer.note)}
          </p>
        ` : ""}

        <p class="activity-note">
          <i class="fa-solid fa-circle-info"></i>
          WhatsApp redirect recorded. Message delivery and payment are unverified.
        </p>
      </article>
    `;
  }

  function renderSummary() {
    const today = new Date();

    const todayRecords = activityRecords.filter(record => {
      const date = getRecordDate(record);
      return date && sameLocalDay(date, today);
    });

    const value = activityRecords.reduce((sum, record) => {
      return sum + record.total;
    }, 0);

    $("totalActivity").textContent = activityRecords.length;
    $("todayActivity").textContent = todayRecords.length;
    $("totalValue").textContent = money(value);
    $("sidebarActivityCount").textContent = activityRecords.length;

    $("recentActivity").innerHTML = activityRecords.length
      ? activityRecords.slice(0, 3).map(recordCard).join("")
      : emptyRecentHTML();
  }

  function emptyRecentHTML() {
    return `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-regular fa-folder-open"></i></div>
        <h3>No activity recorded yet</h3>
        <p>Local activity records will appear here if they are saved by the customer website in this browser.</p>
      </div>
    `;
  }

  function filteredActivity() {
    const query = $("activitySearch").value.trim().toLowerCase();
    const dateFilter = $("dateFilter").value;
    const now = new Date();

    return activityRecords.filter(record => {
      const searchable = [
        record.orderId,
        record.customer.name,
        record.customer.phone,
        record.customer.address,
        record.customer.city,
        record.customer.state,
        ...record.items.map(item => item.name)
      ].join(" ").toLowerCase();

      if (query && !searchable.includes(query)) return false;

      const date = getRecordDate(record);

      if (dateFilter !== "all") {
        if (!date) return false;

        if (dateFilter === "today" && !sameLocalDay(date, now)) {
          return false;
        }

        if (dateFilter === "week") {
          const cutoff = new Date(now);
          cutoff.setDate(cutoff.getDate() - 7);

          if (date < cutoff || date > now) return false;
        }

        if (dateFilter === "month") {
          const cutoff = new Date(now);
          cutoff.setDate(cutoff.getDate() - 30);

          if (date < cutoff || date > now) return false;
        }
      }

      return true;
    });
  }

  function renderAllActivity() {
    const records = filteredActivity();

    $("activityResultsCount").textContent =
      `${records.length} ${records.length === 1 ? "record" : "records"}`;

    $("allActivity").innerHTML = records
      .map(recordCard)
      .join("");

    $("emptyActivity").classList.toggle("hidden", records.length > 0);
    $("allActivity").classList.toggle("hidden", records.length === 0);
  }

  function renderEverything() {
    loadActivity();
    renderStoreStatus();
    renderSummary();
    renderAllActivity();
  }

  function showSection(section) {
    const isActivity = section === "activity";

    $("overviewSection").classList.toggle("hidden", isActivity);
    $("activitySection").classList.toggle("hidden", !isActivity);

    document.querySelectorAll(".side-link, .mobile-nav-item").forEach(button => {
  const isActive = button.dataset.section === section;

  button.classList.toggle("active", isActive);

  if (isActive) {
    button.setAttribute("aria-current", "page");
  } else {
    button.removeAttribute("aria-current");
  }
});

    $("pageTitle").textContent = isActivity
      ? "Customer Activity"
      : "Overview";

    $("pageSubtitle").textContent = isActivity
      ? "Review recorded customer details and WhatsApp redirect attempts."
      : "Your store at a glance.";

    if (isActivity) renderAllActivity();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleStore() {
    const nextClosed = !getClosed();

    try {
      localStorage.setItem(KEYS.closed, String(nextClosed));
    } catch {
      showToast("Could not save the store status in this browser.");
      return;
    }

    renderStoreStatus();

    showToast(nextClosed
      ? "Store marked as closed."
      : "Store marked as open.");

    /*
      The customer website reads the same localStorage key.
      In a different tab on the same browser, its storage listener
      can react to this change. This is not a cross-device service.
    */
  }

  function openConfirm(title, message, action, confirmLabel = "Confirm") {
    $("dialogTitle").textContent = title;
    $("dialogMessage").textContent = message;
    $("dialogConfirm").textContent = confirmLabel;
    dialogAction = action;

    const dialog = $("confirmDialog");

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else if (window.confirm(`${title}\n\n${message}`)) {
      if (dialogAction) dialogAction();
      dialogAction = null;
    }
  }

  function closeDialog() {
    $("confirmDialog").close();
    dialogAction = null;
  }

  function exportCSV() {
    const records = filteredActivity();

    if (!records.length) {
      showToast("There are no matching records to export.");
      return;
    }

    const rows = [[
      "Order ID",
      "Customer Name",
      "Phone",
      "Address",
      "City",
      "State",
      "PIN Code",
      "Products",
      "Product Quantity",
      "Product Total",
      "Manual Prepayment Required",
      "Estimated Remaining Product Amount",
      "Special Request",
      "Activity Status",
      "WhatsApp Redirect Time"
    ]];

    records.forEach(record => {
      rows.push([
        record.orderId,
        record.customer.name,
        record.customer.phone,
        record.customer.address,
        record.customer.city,
        record.customer.state,
        record.customer.pincode,
        record.items.map(item =>
          `${item.name} x ${item.qty} (${money(item.price * item.qty)})`
        ).join("; "),
        record.quantity,
        record.total,
        record.prepaymentRequired,
        record.codEstimate,
        record.customer.note,
        record.status,
        formatDate(record.clickedAt)
      ]);
    });

    const csv = rows.map(row =>
      row.map(value => {
        let text = String(value ?? "");

        // Avoid spreadsheet formula execution from untrusted text.
        if (/^[=+\-@]/.test(text)) text = "'" + text;

        return `"${text.replace(/"/g, '""')}"`;
      }).join(",")
    ).join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `gulship-activity-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("CSV export prepared.");
  }

  function bindEvents() {
    document.querySelectorAll("[data-section]").forEach(button => {
      button.addEventListener("click", () => {
        showSection(button.dataset.section);
      });
    });

    $("toggleStore").addEventListener("click", toggleStore);

    $("refreshDashboard").addEventListener("click", () => {
      renderEverything();
      showToast("Dashboard refreshed.");
    });

    $("activitySearch").addEventListener("input", renderAllActivity);
    $("dateFilter").addEventListener("change", renderAllActivity);

    $("clearFilters").addEventListener("click", () => {
      $("activitySearch").value = "";
      $("dateFilter").value = "all";
      renderAllActivity();
    });

    $("exportActivity").addEventListener("click", exportCSV);

    $("clearActivity").addEventListener("click", () => {
      openConfirm(
        "Clear local activity?",
        "This removes activity records saved in this browser. It cannot be undone, and it does not delete WhatsApp messages.",
        () => {
          try {
            localStorage.removeItem(KEYS.activity);
            renderEverything();
            showToast("Local activity records cleared.");
          } catch {
            showToast("Could not clear local activity records.");
          }
        },
        "Clear records"
      );
    });

    $("dialogCancel").addEventListener("click", closeDialog);

    $("dialogConfirm").addEventListener("click", () => {
      const action = dialogAction;
      closeDialog();
      if (action) action();
    });

    $("confirmDialog").addEventListener("click", event => {
      if (event.target === $("confirmDialog")) closeDialog();
    });

    window.addEventListener("storage", event => {
      if (event.key === KEYS.closed || event.key === KEYS.activity) {
        renderEverything();
      }

      if (event.key === null) {
        renderEverything();
      }
    });
  }

  function initialize() {
  $("currentYear").textContent = new Date().getFullYear();

  bindEvents();
  renderEverything();
  showSection("overview");
}

// GULSHIP ADMIN LOGIN
const LOGIN_CREDENTIALS = {
  email: "tapx.officials@gmail.com",
  password: "bilal@gulship#786"
};

const LOGIN_SESSION_KEY = "gulship_admin_authenticated";

function showDashboard() {
  $("loginScreen").classList.add("hidden");
  $("appShell").classList.remove("hidden");
  initialize();
}

function initializeLogin() {
  const form = $("adminLoginForm");
  const emailInput = $("loginEmail");
  const passwordInput = $("loginPassword");
  const passwordToggle = $("togglePassword");
  const errorMessage = $("loginError");

  try {
    if (sessionStorage.getItem(LOGIN_SESSION_KEY) === "true") {
      showDashboard();
      return;
    }
  } catch {}

  passwordToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    passwordToggle.innerHTML = isPassword
      ? '<i class="fa-regular fa-eye-slash"></i>'
      : '<i class="fa-regular fa-eye"></i>';
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    const valid =
      emailInput.value.trim().toLowerCase() === LOGIN_CREDENTIALS.email &&
      passwordInput.value === LOGIN_CREDENTIALS.password;

    if (!valid) {
      errorMessage.classList.remove("hidden");
      passwordInput.value = "";
      return;
    }

    try {
      sessionStorage.setItem(LOGIN_SESSION_KEY, "true");
    } catch {}

    showDashboard();
  });

  emailInput.addEventListener("input", () =>
    errorMessage.classList.add("hidden")
  );

  passwordInput.addEventListener("input", () =>
    errorMessage.classList.add("hidden")
  );
}

initializeLogin();
})();
