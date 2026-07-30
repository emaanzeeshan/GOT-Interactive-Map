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
  // Get lore data safely
  const loreData = typeof getLoreData === 'function' ? getLoreData(loc.name) : null;
  
  // Breadcrumb Navigation
  const breadcrumb = renderBreadcrumb(loreData);
  
  // Hero Banner
  const bannerImage = loc.image || loc.links?.[0]?.url || '';
  const banner = `
    <div class="panel-banner">
      ${bannerImage ? `<img src="${bannerImage}" alt="${loc.name}" class="panel-banner-image" />` : ''}
      <div class="panel-banner-overlay"></div>
      <div class="panel-banner-content">
        <span class="panel-banner-badge">${loc.region || "Westeros / Essos"}</span>
        <h2 class="panel-banner-title">${loc.name}</h2>
        <p class="panel-banner-description">${loc.description}</p>
      </div>
    </div>
  `;

  // Quick Facts Card
  const quickFacts = renderQuickFactsCard(loc);
  
  // Did You Know Section
  const didYouKnow = renderDidYouKnow(loreData);
  
  // Section Organization
  let body = "";
  const show = (key) => filter === "all" || filter === key;

  if (show("all")) body += renderOverviewSection(loc);
  if (show("Events")) body += renderEventsSection(loc);
  if (show("Battles")) body += renderBattlesSection(loc);
  if (show("Characters")) body += renderCharactersSection(loc);
  if (show("Dragons")) body += renderDragonsSection(loc);
  if (show("Castles")) body += renderCastleSection(loc);
  if (show("Houses")) body += renderHousesSection(loc);
  if (show("Coronations")) body += renderCoronationsSection(loc);
  if (show("all")) body += renderFactsSection(loc);

  if (!body.trim()) {
    body = `<div class="panel-section-empty"><p>No recorded ${filter.toLowerCase()} history is tied to ${loc.name}. Try another category or select "All".</p></div>`;
  }

  // Related Content Section
  const relatedContent = renderRelatedContent(loreData);

  return `<div class="panel-scroll">${breadcrumb}${banner}${quickFacts}${didYouKnow}${body}${relatedContent}</div>`;
}

function renderQuickFactsCard(loc) {
  const facts = [];
  
  if (loc.region) facts.push({ icon: '📍', label: 'Region', value: loc.region });
  if (loc.ruler) facts.push({ icon: '👑', label: 'Ruler', value: loc.ruler });
  if (loc.houses && loc.houses.length) facts.push({ icon: '🏰', label: 'House', value: loc.houses.map(h => h.name).join(', ') });
  if (loc.allegiance) facts.push({ icon: '⚔️', label: 'Allegiance', value: loc.allegiance });
  if (loc.continent) facts.push({ icon: '🌍', label: 'Continent', value: loc.continent });
  if (loc.dragons && (loc.dragons.events?.length || loc.dragons.battles?.length || loc.dragons.deaths?.length || loc.dragons.appearances?.length)) {
    facts.push({ icon: '🐉', label: 'Dragons', value: 'Present' });
  }
  if (loc.timelinePeriod) facts.push({ icon: '📅', label: 'Timeline', value: loc.timelinePeriod });
  
  if (!facts.length) return '';
  
  return `
    <div class="panel-quick-facts">
      <div class="panel-quick-facts-grid">
        ${facts.map(f => `
          <div class="panel-fact-item">
            <span class="panel-fact-icon">${f.icon}</span>
            <div class="panel-fact-content">
              <span class="panel-fact-label">${f.label}</span>
              <span class="panel-fact-value">${f.value}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderOverviewSection(loc) {
  if (!loc.history && !loc.strategicImportance && !loc.culture) return '';
  
  const content = `
    ${loc.history ? `<div class="panel-text-block"><p>${loc.history}</p></div>` : ''}
    ${loc.strategicImportance ? `<div class="panel-text-block"><h4 class="panel-subtitle">Strategic Importance</h4><p>${loc.strategicImportance}</p></div>` : ''}
    ${loc.culture ? `<div class="panel-text-block"><h4 class="panel-subtitle">Culture</h4><p>${loc.culture}</p></div>` : ''}
  `;
  
  return renderSection('📜 Overview', content);
}

function renderEventsSection(loc) {
  if (!loc.events || !loc.events.length) return '';
  
  const showMore = loc.events.length > 3;
  const visibleEvents = showMore ? loc.events.slice(0, 3) : loc.events;
  const hiddenEvents = showMore ? loc.events.slice(3) : [];
  
  const content = visibleEvents.map(e => `
    <div class="panel-event-card">
      <div class="panel-event-meta">${e.season} · ${e.episode}</div>
      <h4 class="panel-event-title">${e.title}</h4>
      <p class="panel-event-description">${e.text}</p>
      ${(e.charactersInvolved || []).length ? `<div class="panel-event-characters"><strong>Characters:</strong> ${e.charactersInvolved.join(', ')}</div>` : ''}
    </div>
  `).join('');
  
  const hiddenContent = hiddenEvents.map(e => `
    <div class="panel-event-card hidden-event">
      <div class="panel-event-meta">${e.season} · ${e.episode}</div>
      <h4 class="panel-event-title">${e.title}</h4>
      <p class="panel-event-description">${e.text}</p>
      ${(e.charactersInvolved || []).length ? `<div class="panel-event-characters"><strong>Characters:</strong> ${e.charactersInvolved.join(', ')}</div>` : ''}
    </div>
  `).join('');
  
  const showMoreButton = showMore ? `
    <button class="panel-show-more-btn" data-section="events">
      <span class="show-more-text">Show ${hiddenEvents.length} More Events</span>
      <span class="show-more-icon">+</span>
    </button>
  ` : '';
  
  return renderSection('⚔️ Notable Events', content + hiddenContent + showMoreButton);
}

function renderBattlesSection(loc) {
  if (!loc.battles || !loc.battles.length) return '';
  
  const showMore = loc.battles.length > 3;
  const visibleBattles = showMore ? loc.battles.slice(0, 3) : loc.battles;
  const hiddenBattles = showMore ? loc.battles.slice(3) : [];
  
  const content = visibleBattles.map(b => `
    <div class="panel-battle-card">
      <div class="panel-battle-meta">${b.season} · ${b.episode}</div>
      <h4 class="panel-battle-title">⚔️ ${b.name}</h4>
      <p class="panel-battle-description">${b.description}</p>
      <div class="panel-battle-details">
        ${b.combatants ? `<div><strong>Combatants:</strong> ${b.combatants}</div>` : ''}
        ${b.winner ? `<div><strong>Winner:</strong> ${b.winner}</div>` : ''}
        ${b.casualties ? `<div><strong>Casualties:</strong> ${b.casualties}</div>` : ''}
      </div>
    </div>
  `).join('');
  
  const hiddenContent = hiddenBattles.map(b => `
    <div class="panel-battle-card hidden-battle">
      <div class="panel-battle-meta">${b.season} · ${b.episode}</div>
      <h4 class="panel-battle-title">⚔️ ${b.name}</h4>
      <p class="panel-battle-description">${b.description}</p>
      <div class="panel-battle-details">
        ${b.combatants ? `<div><strong>Combatants:</strong> ${b.combatants}</div>` : ''}
        ${b.winner ? `<div><strong>Winner:</strong> ${b.winner}</div>` : ''}
        ${b.casualties ? `<div><strong>Casualties:</strong> ${b.casualties}</div>` : ''}
      </div>
    </div>
  `).join('');
  
  const showMoreButton = showMore ? `
    <button class="panel-show-more-btn" data-section="battles">
      <span class="show-more-text">Show ${hiddenBattles.length} More Battles</span>
      <span class="show-more-icon">+</span>
    </button>
  ` : '';
  
  return renderSection('⚔️ Major Battles', content + hiddenContent + showMoreButton);
}

function renderCharactersSection(loc) {
  if (!loc.characterDeaths || !loc.characterDeaths.length) return '';
  
  const showMore = loc.characterDeaths.length > 3;
  const visibleCharacters = showMore ? loc.characterDeaths.slice(0, 3) : loc.characterDeaths;
  const hiddenCharacters = showMore ? loc.characterDeaths.slice(3) : [];
  
  const content = visibleCharacters.map(c => `
    <div class="panel-character-card">
      <div class="panel-character-meta">${c.season} · ${c.episode}</div>
      <h4 class="panel-character-name">☠️ ${c.name}</h4>
      <div class="panel-character-details">
        ${c.cause ? `<div><strong>Cause:</strong> ${c.cause}</div>` : ''}
        ${c.killer ? `<div><strong>Killed by:</strong> ${c.killer}</div>` : ''}
      </div>
      ${c.text ? `<p class="panel-character-text">${c.text}</p>` : ''}
      ${c.significance ? `<div class="panel-character-significance"><strong>Significance:</strong> ${c.significance}</div>` : ''}
    </div>
  `).join('');
  
  const hiddenContent = hiddenCharacters.map(c => `
    <div class="panel-character-card hidden-character">
      <div class="panel-character-meta">${c.season} · ${c.episode}</div>
      <h4 class="panel-character-name">☠️ ${c.name}</h4>
      <div class="panel-character-details">
        ${c.cause ? `<div><strong>Cause:</strong> ${c.cause}</div>` : ''}
        ${c.killer ? `<div><strong>Killed by:</strong> ${c.killer}</div>` : ''}
      </div>
      ${c.text ? `<p class="panel-character-text">${c.text}</p>` : ''}
      ${c.significance ? `<div class="panel-character-significance"><strong>Significance:</strong> ${c.significance}</div>` : ''}
    </div>
  `).join('');
  
  const showMoreButton = showMore ? `
    <button class="panel-show-more-btn" data-section="characters">
      <span class="show-more-text">Show ${hiddenCharacters.length} More Deaths</span>
      <span class="show-more-icon">+</span>
    </button>
  ` : '';
  
  return renderSection('👤 Notable Characters', content + hiddenContent + showMoreButton);
}

function renderDragonsSection(loc) {
  const d = loc.dragons;
  if (!d || (!d.events?.length && !d.battles?.length && !d.deaths?.length && !d.appearances?.length)) return '';
  
  const content = `
    ${d.events && d.events.length ? `<div class="panel-dragon-block"><h4 class="panel-subtitle">Dragon Events</h4>${mp_list(d.events)}</div>` : ''}
    ${d.battles && d.battles.length ? `<div class="panel-dragon-block"><h4 class="panel-subtitle">Battles</h4>${mp_list(d.battles)}</div>` : ''}
    ${d.deaths && d.deaths.length ? `<div class="panel-dragon-block"><h4 class="panel-subtitle">Deaths</h4>${mp_list(d.deaths)}</div>` : ''}
    ${d.appearances && d.appearances.length ? `<div class="panel-dragon-block"><h4 class="panel-subtitle">Appearances</h4>${mp_list(d.appearances)}</div>` : ''}
  `;
  
  return renderSection('🐉 Dragons', content);
}

function renderCastleSection(loc) {
  const c = loc.castle;
  if (!c || !c.architecture) return '';
  
  const content = `
    <div class="panel-castle-details">
      ${c.architecture ? `<div><strong>Architecture:</strong> ${c.architecture}</div>` : ''}
      ${c.importantEvents ? `<div><strong>Important Events:</strong> ${c.importantEvents}</div>` : ''}
      ${c.sieges ? `<div><strong>Sieges:</strong> ${c.sieges}</div>` : ''}
    </div>
    ${c.ownersByEra ? `
      <div class="panel-castle-owners">
        <h4 class="panel-subtitle">Owners Across Eras</h4>
        ${Object.entries(c.ownersByEra).map(([era, owner]) => `
          <div class="panel-owner-item">
            <span class="panel-owner-era">${era.replace(/-/g, ' ')}</span>
            <span class="panel-owner-name">${owner}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}
    ${c.facts && c.facts.length ? `
      <div class="panel-castle-facts">
        <h4 class="panel-subtitle">Interesting Facts</h4>
        ${mp_list(c.facts)}
      </div>
    ` : ''}
  `;
  
  return renderSection('🏰 Castle', content);
}

function renderHousesSection(loc) {
  if (!loc.houses || !loc.houses.length) return '';
  
  const content = loc.houses.map(h => `
    <div class="panel-house-card">
      <h4 class="panel-house-name">🛡️ ${h.name}</h4>
      <div class="panel-house-motto"><em>"${h.words || ''}"</em></div>
      <div class="panel-house-details">
        ${h.sigil ? `<div><strong>Sigil:</strong> ${h.sigil}</div>` : ''}
        ${h.founder ? `<div><strong>Founder:</strong> ${h.founder}</div>` : ''}
        ${h.seat ? `<div><strong>Seat:</strong> ${h.seat}</div>` : ''}
        ${h.status ? `<div><strong>Status:</strong> ${h.status}</div>` : ''}
      </div>
      ${h.history ? `<p class="panel-house-history">${h.history}</p>` : ''}
      <div class="panel-house-relations">
        ${(h.importantMembers || []).length ? `<div><strong>Members:</strong> ${h.importantMembers.join(', ')}</div>` : ''}
        ${(h.alliances || []).length ? `<div><strong>Alliances:</strong> ${h.alliances.join(', ')}</div>` : ''}
        ${(h.enemies || []).length ? `<div><strong>Enemies:</strong> ${h.enemies.join(', ')}</div>` : ''}
      </div>
    </div>
  `).join('');
  
  return renderSection('🏰 Great Houses', content);
}

function renderCoronationsSection(loc) {
  if (!loc.coronations || !loc.coronations.length) return '';
  
  const content = loc.coronations.map(c => `
    <div class="panel-coronation-card">
      <div class="panel-coronation-meta">${c.season} · ${c.episode}</div>
      <h4 class="panel-coronation-title">👑 ${c.crowned} — ${c.title}</h4>
      <div class="panel-coronation-details">
        ${c.location ? `<div><strong>Location:</strong> ${c.location}</div>` : ''}
      </div>
      ${c.significance ? `<p class="panel-coronation-significance"><strong>Significance:</strong> ${c.significance}</p>` : ''}
      <div class="panel-coronation-context">
        ${c.before ? `<div><strong>Before:</strong> ${c.before}</div>` : ''}
        ${c.after ? `<div><strong>After:</strong> ${c.after}</div>` : ''}
      </div>
    </div>
  `).join('');
  
  return renderSection('👑 Coronations', content);
}

function renderFactsSection(loc) {
  if (!loc.facts || !loc.facts.length) return '';
  
  const content = `
    <div class="panel-facts-grid">
      ${loc.facts.map(f => `
        <div class="panel-fact-card">
          <p>${f}</p>
        </div>
      `).join('')}
    </div>
  `;
  
  return renderSection('✨ Interesting Facts', content);
}

function renderSection(title, content) {
  if (!content || !content.trim()) return '';
  
  return `
    <div class="panel-section">
      <div class="panel-section-header">
        <h3 class="panel-section-title">${title}</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="panel-section-content">
        ${content}
      </div>
    </div>
  `;
}

/**
 * Updates the info panel with smooth transition
 */
function updateInfoPanelWithTransition(html) {
  const panel = document.getElementById('mapPanel');
  if (!panel) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Instant update for reduced motion preference
    panel.innerHTML = html;
    panel.scrollTop = 0;
    initRelatedContentListeners();
    return;
  }
  
  // Fade out current content
  panel.style.opacity = '0';
  panel.style.transition = 'opacity 0.25s ease';
  
  setTimeout(() => {
    // Update content
    panel.innerHTML = html;
    panel.scrollTop = 0;
    
    // Animate banner if present
    const banner = panel.querySelector('.panel-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(-20px)';
      banner.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          banner.style.opacity = '1';
          banner.style.transform = 'translateY(0)';
        });
      });
    }
    
    // Animate title if present
    const title = panel.querySelector('.panel-banner-title');
    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(-10px)';
      title.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          title.style.opacity = '1';
          title.style.transform = 'translateY(0)';
        });
      });
    }
    
    // Fade in new content
    panel.style.opacity = '1';
    
    // Initialize related content listeners
    initRelatedContentListeners();
  }, 250);
}

/**
 * Initialize event listeners for related content chips
 */
function initRelatedContentListeners() {
  const chips = document.querySelectorAll('.related-content-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', handleRelatedContentClick);
  });
  
  // Character profile listeners
  const journeyBtn = document.querySelector('.character-journey-btn');
  if (journeyBtn) {
    journeyBtn.addEventListener('click', handleJourneyButtonClick);
  }
  
  const locationChips = document.querySelectorAll('.related-location-chip');
  locationChips.forEach(chip => {
    chip.addEventListener('click', handleRelatedLocationClick);
  });
  
  const characterChips = document.querySelectorAll('.relationship-chip');
  characterChips.forEach(chip => {
    chip.addEventListener('click', handleRelatedCharacterChipClick);
  });
  
  // Show More button listeners
  const showMoreBtns = document.querySelectorAll('.panel-show-more-btn');
  showMoreBtns.forEach(btn => {
    btn.addEventListener('click', handleShowMoreClick);
  });
}

/**
 * Handle show more button click
 */
function handleShowMoreClick(e) {
  const button = e.currentTarget;
  const section = button.dataset.section;
  
  // Toggle hidden items
  const hiddenItems = document.querySelectorAll(`.hidden-${section}`);
  hiddenItems.forEach(item => {
    item.style.display = 'block';
    item.style.animation = 'fadeIn 0.3s ease';
  });
  
  // Update button state
  button.classList.add('expanded');
  button.querySelector('.show-more-text').textContent = 'Show Less';
  button.querySelector('.show-more-icon').textContent = '−';
  
  // Remove click listener
  button.removeEventListener('click', handleShowMoreClick);
  button.addEventListener('click', handleShowLessClick);
}

/**
 * Handle show less button click
 */
function handleShowLessClick(e) {
  const button = e.currentTarget;
  const section = button.dataset.section;
  
  // Hide items
  const hiddenItems = document.querySelectorAll(`.hidden-${section}`);
  hiddenItems.forEach(item => {
    item.style.display = 'none';
  });
  
  // Update button state
  button.classList.remove('expanded');
  button.querySelector('.show-more-text').textContent = `Show ${hiddenItems.length} More`;
  button.querySelector('.show-more-icon').textContent = '+';
  
  // Remove click listener
  button.removeEventListener('click', handleShowLessClick);
  button.addEventListener('click', handleShowMoreClick);
}

/**
 * Handle journey button click in character profile
 */
function handleJourneyButtonClick(e) {
  const button = e.currentTarget;
  const characterId = button.dataset.characterId;
  
  if (characterId && typeof activateJourneyMode === 'function') {
    // Activate Journey Mode
    activateJourneyMode();
    
    // Select the character after a short delay
    setTimeout(() => {
      if (typeof selectCharacter === 'function') {
        selectCharacter(characterId);
      }
    }, 100);
  }
}

/**
 * Handle related location click in character profile
 */
function handleRelatedLocationClick(e) {
  const chip = e.target;
  const locationName = chip.dataset.location;
  navigateToRelatedLocation(locationName);
}

/**
 * Handle related character chip click in character profile
 */
function handleRelatedCharacterChipClick(e) {
  const chip = e.target;
  const characterName = chip.dataset.character;
  navigateToRelatedCharacter(characterName);
}

/**
 * Handle click on related content chip
 */
function handleRelatedContentClick(e) {
  const chip = e.target;
  const itemName = chip.dataset.relatedItem;
  const section = chip.dataset.section;
  
  // Add visual feedback
  chip.style.transform = 'scale(0.95)';
  setTimeout(() => {
    chip.style.transform = '';
  }, 150);
  
  // Handle navigation based on section type
  switch (section) {
    case 'Related Locations':
      navigateToRelatedLocation(itemName);
      break;
    case 'Related Characters':
      navigateToRelatedCharacter(itemName);
      break;
    case 'Related Houses':
      navigateToRelatedHouse(itemName);
      break;
    case 'Related Battles':
      navigateToRelatedBattle(itemName);
      break;
    case 'Related Dragons':
      navigateToRelatedDragon(itemName);
      break;
    default:
      // Unknown section type
      console.warn('Unknown section type:', section);
  }
}

/**
 * Navigate to a related location on the map
 */
function navigateToRelatedLocation(locationName) {
  // Find the location in mapData
  const location = mapData.locations.find(loc => 
    loc.name.toLowerCase().includes(locationName.toLowerCase()) || 
    loc.name === locationName
  );
  
  if (location) {
    // Find and click the corresponding marker
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
      if (marker.dataset.locationId === location.id) {
        marker.click();
      }
    });
  }
}

/**
 * Navigate to a related character
 */
function navigateToRelatedCharacter(characterName) {
  // Find the character profile
  const profile = getCharacterProfile(characterName);
  
  if (profile) {
    // Open character profile
    showCharacterProfile(profile);
  } else {
    // Character not found in profiles
    showCharacterInfoFallback(characterName);
  }
}

/**
 * Show character profile in the information panel
 */
function showCharacterProfile(profile) {
  const panel = document.getElementById('mapPanel');
  if (!panel) return;
  
  const html = buildCharacterProfileHTML(profile);
  updateInfoPanelWithTransition(html);
}

/**
 * Build character profile HTML
 */
function buildCharacterProfileHTML(profile) {
  const statusColor = profile.status === 'Alive' ? '#4ade80' : profile.status === 'Deceased' ? '#ef4444' : '#f59e0b';
  
  // Hero Section
  const hero = `
    <div class="character-hero">
      <div class="character-hero-banner"></div>
      ${profile.portrait ? `<img src="${profile.portrait}" alt="${profile.name}" class="character-portrait" />` : '<div class="character-portrait-placeholder">👤</div>'}
      <div class="character-hero-content">
        <div class="character-sigil">${profile.sigil}</div>
        <h2 class="character-name">${profile.name}</h2>
        <div class="character-titles">
          ${profile.titles.map(title => `<span class="character-title">${title}</span>`).join(' · ')}
        </div>
        <div class="character-status" style="color: ${statusColor}">
          <span class="status-dot"></span>
          ${profile.status}
        </div>
        <div class="character-allegiance">${profile.allegiance}</div>
      </div>
    </div>
  `;
  
  // Quick Facts
  const quickFacts = renderCharacterQuickFacts(profile.quickFacts);
  
  // Biography
  const biography = renderCharacterBiography(profile.biography);
  
  // Timeline
  const timeline = renderCharacterTimeline(profile.timeline);
  
  // Related Locations
  const relatedLocations = renderCharacterRelatedLocations(profile.relatedLocations);
  
  // Related Characters
  const relatedCharacters = renderCharacterRelatedCharacters(profile.relatedCharacters);
  
  // Journey Integration
  const journeyButton = profile.hasJourney ? `
    <button class="character-journey-btn" data-character-id="${profile.id}">
      <span class="journey-btn-icon">🛤</span>
      <span class="journey-btn-text">Follow Journey</span>
    </button>
  ` : '';
  
  return `
    <div class="character-profile">
      ${hero}
      ${quickFacts}
      ${biography}
      ${timeline}
      ${relatedLocations}
      ${relatedCharacters}
      ${journeyButton}
    </div>
  `;
}

/**
 * Render character quick facts
 */
function renderCharacterQuickFacts(facts) {
  if (!facts) return '';
  
  const items = [];
  if (facts.house) items.push({ icon: '🏰', label: 'House', value: facts.house });
  if (facts.region) items.push({ icon: '📍', label: 'Region', value: facts.region });
  if (facts.family) items.push({ icon: '👨‍👩‍👧‍👦', label: 'Family', value: facts.family });
  if (facts.occupation) items.push({ icon: '⚔️', label: 'Occupation', value: facts.occupation });
  if (facts.firstAppearance) items.push({ icon: '📺', label: 'First Appearance', value: facts.firstAppearance });
  if (facts.lastAppearance) items.push({ icon: '📺', label: 'Last Appearance', value: facts.lastAppearance });
  if (facts.portrayedBy) items.push({ icon: '🎭', label: 'Portrayed by', value: facts.portrayedBy });
  
  if (!items.length) return '';
  
  return `
    <div class="character-quick-facts">
      <div class="panel-section-header">
        <h3 class="panel-section-title">Quick Facts</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="quick-facts-grid">
        ${items.map(item => `
          <div class="quick-fact-item">
            <span class="quick-fact-icon">${item.icon}</span>
            <div class="quick-fact-content">
              <span class="quick-fact-label">${item.label}</span>
              <span class="quick-fact-value">${item.value}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render character biography
 */
function renderCharacterBiography(biography) {
  if (!biography) return '';
  
  // Split biography into paragraphs
  const paragraphs = biography.split('\n\n').filter(p => p.trim());
  
  return `
    <div class="character-biography">
      <div class="panel-section-header">
        <h3 class="panel-section-title">📖 Biography</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="biography-content">
        ${paragraphs.map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>
  `;
}

/**
 * Render character timeline
 */
function renderCharacterTimeline(timeline) {
  if (!timeline || !timeline.length) return '';
  
  return `
    <div class="character-timeline">
      <div class="panel-section-header">
        <h3 class="panel-section-title">⏳ Major Events</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="timeline-list">
        ${timeline.map((item, index) => `
          <div class="timeline-item">
            <div class="timeline-number">${index + 1}</div>
            <div class="timeline-content">
              <div class="timeline-event">${item.event}</div>
              <div class="timeline-season">${item.season}${item.episode ? ` · ${item.episode}` : ''}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render character related locations
 */
function renderCharacterRelatedLocations(locations) {
  if (!locations || !locations.length) return '';
  
  return `
    <div class="character-related-locations">
      <div class="panel-section-header">
        <h3 class="panel-section-title">📍 Related Locations</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="related-locations-grid">
        ${locations.map(loc => `
          <button class="related-location-chip" data-location="${loc}">
            ${loc}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render character related characters
 */
function renderCharacterRelatedCharacters(relationships) {
  if (!relationships) return '';
  
  const sections = [];
  
  if (relationships.family && relationships.family.length) {
    sections.push({ icon: '👨‍👩‍👧‍👦', title: 'Family', items: relationships.family });
  }
  if (relationships.allies && relationships.allies.length) {
    sections.push({ icon: '🤝', title: 'Allies', items: relationships.allies });
  }
  if (relationships.rivals && relationships.rivals.length) {
    sections.push({ icon: '⚔️', title: 'Rivals', items: relationships.rivals });
  }
  if (relationships.enemies && relationships.enemies.length) {
    sections.push({ icon: '💀', title: 'Enemies', items: relationships.enemies });
  }
  
  if (!sections.length) return '';
  
  return `
    <div class="character-related-characters">
      <div class="panel-section-header">
        <h3 class="panel-section-title">👥 Relationships</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="relationships-grid">
        ${sections.map(section => `
          <div class="relationship-section">
            <div class="relationship-header">
              <span class="relationship-icon">${section.icon}</span>
              <span class="relationship-title">${section.title}</span>
            </div>
            <div class="relationship-items">
              ${section.items.map(char => `
                <button class="relationship-chip" data-character="${char}">
                  ${char}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Navigate to a related house
 */
function navigateToRelatedHouse(houseName) {
  // Find the house in mapData
  const house = mapData.houses.find(h => 
    h.name.toLowerCase().includes(houseName.toLowerCase()) || 
    h.name === houseName
  );
  
  if (house) {
    // Activate the House filter
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      if (chip.dataset.filter === 'Houses') {
        chip.click();
      }
    });
    
    // Navigate to the house's seat location
    if (house.seat) {
      const seatLocation = mapData.locations.find(loc => 
        loc.name.toLowerCase().includes(house.seat.toLowerCase()) || 
        loc.name === house.seat
      );
      if (seatLocation) {
        setTimeout(() => {
          const markers = document.querySelectorAll('.map-marker');
          markers.forEach(marker => {
            if (marker.dataset.locationId === seatLocation.id) {
              marker.click();
            }
          });
        }, 300);
      }
    }
  }
}

/**
 * Navigate to a related battle
 */
function navigateToRelatedBattle(battleName) {
  // Find a location that has this battle
  const battleLocation = mapData.locations.find(loc => 
    loc.battles && loc.battles.some(b => 
      b.name.toLowerCase().includes(battleName.toLowerCase()) || 
      b.name === battleName
    )
  );
  
  if (battleLocation) {
    // Navigate to the battle location
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
      if (marker.dataset.locationId === battleLocation.id) {
        marker.click();
      }
    });
    
    // Activate Battles filter to highlight battle info
    setTimeout(() => {
      const filterChips = document.querySelectorAll('.filter-chip');
      filterChips.forEach(chip => {
        if (chip.dataset.filter === 'Battles') {
          chip.click();
        }
      });
    }, 100);
  }
}

/**
 * Navigate to a related dragon
 */
function navigateToRelatedDragon(dragonName) {
  // Find a location that has this dragon
  const dragonLocation = mapData.locations.find(loc => 
    loc.dragons && (
      (loc.dragons.events && loc.dragons.events.some(e => 
        e.toLowerCase().includes(dragonName.toLowerCase())
      )) ||
      (loc.dragons.battles && loc.dragons.battles.some(b => 
        b.toLowerCase().includes(dragonName.toLowerCase())
      )) ||
      (loc.dragons.deaths && loc.dragons.deaths.some(d => 
        d.toLowerCase().includes(dragonName.toLowerCase())
      )) ||
      (loc.dragons.appearances && loc.dragons.appearances.some(a => 
        a.toLowerCase().includes(dragonName.toLowerCase())
      ))
    )
  );
  
  if (dragonLocation) {
    // Navigate to the dragon location
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
      if (marker.dataset.locationId === dragonLocation.id) {
        marker.click();
      }
    });
    
    // Activate Dragons filter to highlight dragon info
    setTimeout(() => {
      const filterChips = document.querySelectorAll('.filter-chip');
      filterChips.forEach(chip => {
        if (chip.dataset.filter === 'Dragons') {
          chip.click();
        }
      });
    }, 100);
  }
}

/**
 * Fallback for character info when no journey exists
 */
function showCharacterInfoFallback(characterName) {
  // Show a toast indicating character info is available
  const toast = document.createElement('div');
  toast.className = 'lore-navigation-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">�</span>
      <span class="toast-message">${characterName} - Character details coming soon</span>
    </div>
  `;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(196, 131, 45, 0.95);
    color: #ffd57d;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    z-index: 1000;
    animation: toastSlideUp 0.3s ease;
    font-family: 'Cinzel', serif;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Add toast animation to CSS
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes toastSlideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
document.head.appendChild(toastStyle);

function renderEmptyPanel() {
  return `<p style="color:var(--muted);font-size:0.9rem;margin:0">
    Click a glowing marker on the map to read the lore of that location.
  </p>`;
}

function renderBreadcrumb(loreData) {
  if (!loreData || !loreData.breadcrumb || !loreData.breadcrumb.length) return '';
  
  return `
    <div class="panel-breadcrumb">
      ${loreData.breadcrumb.map((crumb, index) => `
        <span class="breadcrumb-item ${index === loreData.breadcrumb.length - 1 ? 'breadcrumb-active' : ''}">
          ${crumb}
        </span>
        ${index < loreData.breadcrumb.length - 1 ? '<span class="breadcrumb-separator">›</span>' : ''}
      `).join('')}
    </div>
  `;
}

function renderDidYouKnow(loreData) {
  if (!loreData || !loreData.didYouKnow) return '';
  
  return `
    <div class="panel-did-you-know">
      <div class="did-you-know-header">
        <span class="did-you-know-icon">💡</span>
        <span class="did-you-know-title">Did You Know?</span>
      </div>
      <p class="did-you-know-text">${loreData.didYouKnow}</p>
    </div>
  `;
}

function renderRelatedContent(loreData) {
  if (!loreData) return '';
  
  const sections = [];
  
  if (loreData.relatedHouses && loreData.relatedHouses.length) {
    const validHouses = loreData.relatedHouses.filter(house => 
      mapData.houses.some(h => h.name.toLowerCase().includes(house.toLowerCase()) || 
                              h.name === house)
    );
    if (validHouses.length) {
      sections.push({
        icon: '🏰',
        title: 'Related Houses',
        items: validHouses
      });
    }
  }
  
  if (loreData.relatedCharacters && loreData.relatedCharacters.length) {
    const validCharacters = loreData.relatedCharacters.filter(char => 
      mapData.characters.some(c => c.name.toLowerCase().includes(char.toLowerCase()) || 
                                  c.name === char)
    );
    if (validCharacters.length) {
      sections.push({
        icon: '👤',
        title: 'Related Characters',
        items: validCharacters
      });
    }
  }
  
  if (loreData.relatedBattles && loreData.relatedBattles.length) {
    sections.push({
      icon: '⚔️',
      title: 'Related Battles',
      items: loreData.relatedBattles
    });
  }
  
  if (loreData.relatedDragons && loreData.relatedDragons.length) {
    sections.push({
      icon: '🐉',
      title: 'Related Dragons',
      items: loreData.relatedDragons
    });
  }
  
  if (loreData.relatedLocations && loreData.relatedLocations.length) {
    const validLocations = loreData.relatedLocations.filter(loc => 
      mapData.locations.some(l => l.name.toLowerCase().includes(loc.toLowerCase()) || 
                              l.name === loc)
    );
    if (validLocations.length) {
      sections.push({
        icon: '📍',
        title: 'Related Locations',
        items: validLocations
      });
    }
  }
  
  if (!sections.length) return '';
  
  return `
    <div class="panel-related-content">
      <div class="panel-section-header">
        <h3 class="panel-section-title">🔗 Related Content</h3>
        <div class="panel-section-divider"></div>
      </div>
      <div class="related-content-grid">
        ${sections.map(section => `
          <div class="related-content-section">
            <div class="related-section-header">
              <span class="related-section-icon">${section.icon}</span>
              <span class="related-section-title">${section.title}</span>
            </div>
            <div class="related-section-items">
              ${section.items.map(item => `
                <button class="related-content-chip" data-related-item="${item}" data-section="${section.title}">
                  ${item}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}