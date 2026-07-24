/* =====================================================================
   mapMarkers.js — renders markers on the map, one icon style per
   category, driven entirely by mapData.js / CATEGORY_META.
   ===================================================================== */

/** Does this location have any content for the given category? */
function mm_hasCategory(loc, filter) {
  if (filter === "all") {
    return true; // "All" shows every location with any historical significance
  }
  const meta = CATEGORY_META[filter];
  if (!meta) return false;
  const val = loc[meta.field];
  if (!val) return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") {
    // castle {} or dragons {}
    if (meta.field === "castle") return !!val.architecture;
    if (meta.field === "dragons") {
      return !!(val.events?.length || val.battles?.length || val.deaths?.length || val.appearances?.length);
    }
    return Object.keys(val).length > 0;
  }
  return true;
}

function mm_iconFor(loc, filter) {
  if (filter !== "all") return CATEGORY_META[filter]?.icon || "📍";
  // In "All" mode, prioritize a representative icon based on richest category
  if (loc.castle && loc.castle.architecture) return CATEGORY_META.Castles.icon;
  if (loc.houses && loc.houses.length) return CATEGORY_META.Houses.icon;
  return CATEGORY_META.Events.icon;
}

function renderMapMarkersV2() {
  const container = document.getElementById("mapMarkers");
  if (!container) return;
  container.innerHTML = "";
  state.activePopupEl = null;

  mapData.locations.forEach(loc => {
    const visible = mm_hasCategory(loc, state.currentFilter);

    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `map-marker map-marker--${state.currentFilter === "all" ? "all" : state.currentFilter.toLowerCase()} ${loc.id === state.currentLocation ? "active" : ""}`;
    marker.style.left = `${loc.x}%`;
    marker.style.top = `${loc.y}%`;
    marker.title = loc.name;
    if (!visible) marker.hidden = true;
    marker.dataset.location = loc.id;

    const icon = mm_iconFor(loc, state.currentFilter);
    marker.innerHTML = `
      <span class="pin-dot pin-dot--icon">${icon}</span>
      <span class="pin-label">${loc.name}</span>
    `;

    marker.addEventListener("click", (e) => {
      e.stopPropagation();
      setActiveLocationV2(loc.id);
      showMapPopupV2(loc, marker);
    });

    container.appendChild(marker);
  });
}

function showMapPopupV2(loc, markerEl) {
  const container = document.getElementById("mapMarkers");
  if (state.activePopupEl) { state.activePopupEl.remove(); state.activePopupEl = null; }

  const popup = document.createElement("div");
  popup.className = "map-popup";
  popup.style.left = `${loc.x}%`;
  popup.style.top = `${loc.y}%`;
  popup.innerHTML = `
    <span class="popup-close">✕</span>
    <h4>${loc.name}</h4>
    <p>${loc.description}</p>
  `;
  popup.querySelector(".popup-close").addEventListener("click", (e) => {
    e.stopPropagation();
    popup.remove();
    state.activePopupEl = null;
    markerEl.classList.remove("active");
  });

  container.appendChild(popup);
  state.activePopupEl = popup;
  
  // Smart positioning to keep popup in viewport
  requestAnimationFrame(() => {
    positionPopupInViewport(popup, loc.x, loc.y);
    popup.classList.add("show");
  });
}

/**
 * Smart popup positioning to keep popups inside the map viewport
 */
function positionPopupInViewport(popup, xPercent, yPercent) {
  const mapStage = document.getElementById("mapStage");
  if (!mapStage) return;
  
  const mapRect = mapStage.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  
  // Calculate popup position relative to map
  const popupTop = (yPercent / 100) * mapRect.height - popupRect.height - 15;
  const popupBottom = (yPercent / 100) * mapRect.height + 15;
  const popupLeft = (xPercent / 100) * mapRect.width - popupRect.width / 2;
  const popupRight = (xPercent / 100) * mapRect.width + popupRect.width / 2;
  
  // Remove all position classes
  popup.classList.remove('popup-below', 'popup-left', 'popup-right');
  
  // Check if popup would overflow top
  if (popupTop < 0) {
    // Position below marker instead
    popup.style.top = `${yPercent}%`;
    popup.classList.add('popup-below');
  }
  
  // Check if popup would overflow left side
  if (popupLeft < 0) {
    // Position to the right of marker
    popup.style.left = `${xPercent + 5}%`;
    popup.classList.add('popup-left');
  }
  
  // Check if popup would overflow right side
  if (popupRight > mapRect.width) {
    // Position to the left of marker
    popup.style.left = `${xPercent - 5}%`;
    popup.classList.add('popup-right');
  }
}

/* Overrides app.js's setActiveLocation to use the rich data + panel builder */
function setActiveLocationV2(id, opts = {}) {
  state.currentLocation = id;
  const loc = mapData.locations.find(l => l.id === id);
  if (!loc) return;

  const panel = document.getElementById("mapPanel");
  const html = buildLocationPanelHTML(loc, state.currentFilter);
  
  // Use smooth transition function
  if (typeof updateInfoPanelWithTransition === "function") {
    updateInfoPanelWithTransition(html);
  } else {
    // Fallback to original behavior
    panel.classList.add("era-fade");
    setTimeout(() => {
      panel.innerHTML = html;
      panel.classList.remove("era-fade");
    }, 160);
  }

  document.querySelectorAll(".map-marker").forEach(m =>
    m.classList.toggle("active", m.dataset.location === id)
  );
}