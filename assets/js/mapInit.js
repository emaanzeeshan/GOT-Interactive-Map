/* =====================================================================
   mapInit.js — wires the Map page together. Must be loaded AFTER
   app.js. It overrides only the two map-related globals app.js exposes
   (renderMapMarkers, setActiveLocation) so nothing on any other page
   (Home, Timeline, Houses, Characters, Dragons, Battles, Castles,
   Search) is touched in any way.
   ===================================================================== */

(function () {
  // 1) Redirect the map-only globals from app.js to the rich versions.
  //    Everything else in app.js (renderHouses, renderCharacters, audio
  //    engine, timeline, nav, etc.) is left completely untouched.
  window.renderMapMarkers = renderMapMarkersV2;
  window.setActiveLocation = setActiveLocationV2;

  // 2) Do our own first paint immediately — don't wait on app.js's
  //    async content.json fetch, since our data already lives in
  //    mapData.js and is available synchronously.
  function firstPaint() {
    if (typeof state === "undefined") { setTimeout(firstPaint, 30); return; }
    renderMapMarkersV2();
    if (mapData.locations.length) {
      setActiveLocationV2(mapData.locations[0].id, { silent: true });
    }
    injectMapSearch();
    
    // Hide loading overlay
    const loadingOverlay = document.getElementById('mapLoadingOverlay');
    if (loadingOverlay) {
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
      }, 800);
    }
  }
  firstPaint();

  // 3) Lightweight search across every category, scoped to the Map
  //    section only (does not touch the site-wide #search page).
  function injectMapSearch() {
    const toolbar = document.querySelector("#map .toolbar");
    if (!toolbar || document.getElementById("mapSearchWrap")) return;

    const wrap = document.createElement("div");
    wrap.id = "mapSearchWrap";
    wrap.className = "map-search-wrap";
    wrap.innerHTML = `
      <input type="search" id="mapSearchInput" placeholder="Search the map — locations, battles, houses, deaths…" />
      <div class="map-search-results" id="mapSearchResults"></div>
    `;
    toolbar.appendChild(wrap);

    const input = wrap.querySelector("#mapSearchInput");
    const results = wrap.querySelector("#mapSearchResults");

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ""; results.classList.remove("show"); return; }

      const hits = [];
      mapData.locations.forEach(loc => {
        if (loc.name.toLowerCase().includes(q)) hits.push({ loc, label: loc.name, type: "Location" });
        (loc.events || []).forEach(e => { if (e.title.toLowerCase().includes(q)) hits.push({ loc, label: e.title, type: "Event" }); });
        (loc.battles || []).forEach(b => { if (b.name.toLowerCase().includes(q)) hits.push({ loc, label: b.name, type: "Battle" }); });
        (loc.characterDeaths || []).forEach(c => { if (c.name.toLowerCase().includes(q)) hits.push({ loc, label: c.name, type: "Character" }); });
        (loc.houses || []).forEach(h => { if (h.name.toLowerCase().includes(q)) hits.push({ loc, label: h.name, type: "House" }); });
        (loc.coronations || []).forEach(c => { if (c.crowned.toLowerCase().includes(q)) hits.push({ loc, label: c.crowned, type: "Coronation" }); });
      });

      // Also search character profiles
      if (typeof characterProfiles !== 'undefined') {
        Object.values(characterProfiles).forEach(profile => {
          if (profile.name.toLowerCase().includes(q)) {
            hits.push({ profile, label: profile.name, type: "Character Profile" });
          }
        });
      }

      results.innerHTML = hits.slice(0, 8).map(h => {
        if (h.type === "Character Profile") {
          return `
            <div class="map-search-hit" data-character="${h.profile.id}">
              <span class="badge">${h.type}</span>
              <strong>${h.label}</strong>
            </div>`;
        }
        return `
          <div class="map-search-hit" data-loc="${h.loc.id}">
            <span class="badge">${h.type}</span>
            <strong>${h.label}</strong>
            <span class="map-search-hit-sub">${h.loc.name}</span>
          </div>`;
      }).join("") || `<div class="map-search-hit map-search-hit--empty">No matches found.</div>`;
      results.classList.add("show");

      // Handle character profile clicks
      results.querySelectorAll(".map-search-hit[data-character]").forEach(el => {
        el.addEventListener("click", () => {
          const characterId = el.dataset.character;
          if (typeof characterProfiles !== 'undefined' && characterProfiles[characterId]) {
            showCharacterProfile(characterProfiles[characterId]);
          }
          results.classList.remove("show");
          input.value = "";
        });
      });

      // Handle location clicks
      results.querySelectorAll(".map-search-hit[data-loc]").forEach(el => {
        el.addEventListener("click", () => {
          const loc = mapData.locations.find(l => l.id === el.dataset.loc);
          if (!loc) return;
          state.currentFilter = "all";
          renderFilters();
          renderMapMarkersV2();
          setActiveLocationV2(loc.id);
          const marker = document.querySelector(`.map-marker[data-location="${loc.id}"]`);
          if (marker) {
            marker.classList.add("marker-highlight");
            marker.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            setTimeout(() => marker.classList.remove("marker-highlight"), 1600);
          }
          results.classList.remove("show");
          input.value = "";
        });
      });
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) results.classList.remove("show");
    });
  }
})();