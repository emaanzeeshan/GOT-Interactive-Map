/* =====================================================================
   mapPanel.js — builds the rich, Wikipedia-style right-hand info panel
   Reads from mapData / CATEGORY_META (mapData.js). Only touches the
   #mapPanel element used by the Map section.
   ===================================================================== */

function mp_para(arr) {
  if (!arr || !arr.length) return "";
  return arr.map(p => `<p>${p}</p>`).join("");
}

function mp_list(items) {
  if (!items || !items.length) return "";
  return `<ul class="list">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

function mp_section(title, innerHTML) {
  if (!innerHTML || !innerHTML.trim()) return "";
  return `<div class="panel-section">
      <h4 class="panel-section-title">${title}</h4>
      ${innerHTML}
    </div>`;
}

function mp_badge(text) {
  return `<span class="badge">${text}</span>`;
}

/* ---------- category-specific renderers ---------- */

function renderEventsBlock(loc) {
  if (!loc.events || !loc.events.length) return "";
  const body = loc.events.map(e => `
    <div class="panel-entry">
      <div class="panel-entry-meta">${e.season} · ${e.episode}</div>
      <h5>${e.title}</h5>
      <p>${e.text}</p>
      <ul class="list">
        <li><strong>Characters involved:</strong> ${(e.charactersInvolved || []).join(", ")}</li>
        <li><strong>Consequences:</strong> ${e.consequences}</li>
        <li><strong>Historical importance:</strong> ${e.importance}</li>
      </ul>
    </div>`).join("<hr class='panel-divider'>");
  return mp_section("Major Events", body);
}

function renderBattlesBlock(loc) {
  if (!loc.battles || !loc.battles.length) return "";
  const body = loc.battles.map(b => `
    <div class="panel-entry">
      <div class="panel-entry-meta">${b.season} · ${b.episode}</div>
      <h5>⚔ ${b.name}</h5>
      <p>${b.description}</p>
      <ul class="list">
        <li><strong>Combatants:</strong> ${b.combatants}</li>
        <li><strong>Winner:</strong> ${b.winner}</li>
        <li><strong>Casualties:</strong> ${b.casualties}</li>
        <li><strong>Strategy:</strong> ${b.strategy}</li>
        <li><strong>Key moments:</strong> ${b.keyMoments}</li>
        <li><strong>Consequences:</strong> ${b.consequences}</li>
      </ul>
    </div>`).join("<hr class='panel-divider'>");
  return mp_section("Major Battles", body);
}

function renderCharacterDeathsBlock(loc) {
  if (!loc.characterDeaths || !loc.characterDeaths.length) return "";
  const body = loc.characterDeaths.map(c => `
    <div class="panel-entry">
      <div class="panel-entry-meta">${c.season} · ${c.episode}</div>
      <h5>☠ ${c.name}</h5>
      <ul class="list">
        <li><strong>Cause of death:</strong> ${c.cause}</li>
        <li><strong>Killed by:</strong> ${c.killer}</li>
      </ul>
      <p>${c.text}</p>
      <p><strong>Why it mattered:</strong> ${c.significance}</p>
    </div>`).join("<hr class='panel-divider'>");
  return mp_section("Notable Deaths", body);
}

function renderDragonsBlock(loc) {
  const d = loc.dragons;
  if (!d || (!d.events?.length && !d.battles?.length && !d.deaths?.length && !d.appearances?.length)) return "";
  const body = `
    ${mp_para(d.events)}
    ${d.battles && d.battles.length ? `<p><strong>Battles involving dragons:</strong></p>${mp_list(d.battles)}` : ""}
    ${d.deaths && d.deaths.length ? `<p><strong>Dragon deaths:</strong></p>${mp_list(d.deaths)}` : ""}
    ${d.appearances && d.appearances.length ? `<p><strong>Notable appearances:</strong></p>${mp_list(d.appearances)}` : ""}
  `;
  return mp_section("🐉 Dragons", body);
}

function renderCastleBlock(loc) {
  const c = loc.castle;
  if (!c || !c.architecture) return "";
  const body = `
    <p><strong>Architecture:</strong> ${c.architecture}</p>
    <p><strong>Important events:</strong> ${c.importantEvents || "—"}</p>
    <p><strong>Sieges:</strong> ${c.sieges || "—"}</p>
    ${c.ownersByEra ? `<p><strong>Owners across the eras:</strong></p><ul class="list">${
      Object.entries(c.ownersByEra).map(([era, owner]) => `<li><strong>${era.replace(/-/g," ")}:</strong> ${owner}</li>`).join("")
    }</ul>` : ""}
    ${c.facts && c.facts.length ? `<p><strong>Interesting facts:</strong></p>${mp_list(c.facts)}` : ""}
  `;
  return mp_section("🏰 Castle", body);
}

function renderHousesBlock(loc) {
  if (!loc.houses || !loc.houses.length) return "";
  const body = loc.houses.map(h => `
    <div class="panel-entry">
      <h5>🛡 ${h.name}</h5>
      <ul class="list">
        <li><strong>Sigil:</strong> ${h.sigil}</li>
        <li><strong>Words:</strong> ${h.words}</li>
        <li><strong>Founder:</strong> ${h.founder}</li>
        <li><strong>Seat:</strong> ${h.seat}</li>
        <li><strong>Status:</strong> ${h.status}</li>
      </ul>
      <p>${h.history}</p>
      <ul class="list">
        <li><strong>Important members:</strong> ${(h.importantMembers||[]).join(", ")}</li>
        <li><strong>Alliances:</strong> ${(h.alliances||[]).join(", ") || "—"}</li>
        <li><strong>Enemies:</strong> ${(h.enemies||[]).join(", ") || "—"}</li>
      </ul>
    </div>`).join("<hr class='panel-divider'>");
  return mp_section("Great House", body);
}

function renderCoronationsBlock(loc) {
  if (!loc.coronations || !loc.coronations.length) return "";
  const body = loc.coronations.map(c => `
    <div class="panel-entry">
      <div class="panel-entry-meta">${c.season} · ${c.episode}</div>
      <h5>👑 ${c.crowned} — ${c.title}</h5>
      <ul class="list">
        <li><strong>Location:</strong> ${c.location}</li>
      </ul>
      <p><strong>Political significance:</strong> ${c.significance}</p>
      <p><strong>Events before:</strong> ${c.before}</p>
      <p><strong>Events after:</strong> ${c.after}</p>
    </div>`).join("<hr class='panel-divider'>");
  return mp_section("Coronations", body);
}

function renderFactsBlock(loc) {
  if (!loc.facts || !loc.facts.length) return "";
  return mp_section("Interesting Facts", mp_list(loc.facts));
}

function renderOverviewBlock(loc) {
  return `
    ${mp_section("History", mp_para(loc.history))}
    ${mp_section("Strategic Importance", loc.strategicImportance ? `<p>${loc.strategicImportance}</p>` : "")}
    ${mp_section("Culture", loc.culture ? `<p>${loc.culture}</p>` : "")}
  `;
}

/**
 * Main entry point — builds the full panel HTML for a location, filtered
 * by the currently active category ("all" shows everything available).
 */
function buildLocationPanelHTML(loc, filter) {
  const header = `
    <div class="panel-header">
      <span class="badge">${loc.region || "Westeros / Essos"}</span>
      <h3>${loc.name}</h3>
      <p class="panel-lede">${loc.description}</p>
    </div>
  `;

  let body = "";
  const show = (key) => filter === "all" || filter === key;

  if (show("all")) body += renderOverviewBlock(loc);
  if (show("Events")) body += renderEventsBlock(loc);
  if (show("Battles")) body += renderBattlesBlock(loc);
  if (show("Characters")) body += renderCharacterDeathsBlock(loc);
  if (show("Dragons")) body += renderDragonsBlock(loc);
  if (show("Castles")) body += renderCastleBlock(loc);
  if (show("Houses")) body += renderHousesBlock(loc);
  if (show("Coronations")) body += renderCoronationsBlock(loc);
  if (show("all")) body += renderFactsBlock(loc);

  if (!body.trim()) {
    body = `<div class="panel-section"><p>No recorded ${filter.toLowerCase()} history is tied to ${loc.name}. Try another category or select "All".</p></div>`;
  }

  return `<div class="panel-scroll">${header}${body}</div>`;
}

function renderEmptyPanel() {
  return `<p style="color:var(--muted);font-size:0.9rem;margin:0">
    Click a glowing marker on the map to read the lore of that location.
  </p>`;
}