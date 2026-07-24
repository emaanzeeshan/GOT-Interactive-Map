/* =====================================================================
   THE HISTORY OF WESTEROS — app.js (Modern Encyclopedia & Interactive Map)
   ===================================================================== */
const state = {
  data: null,
  currentEra: 0,
  currentLocation: null,
  currentFilter: 'all',
  zoom: 1,
  snowAnimId: null,
  activePopupEl: null,
};

const filterOptions = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'Battles', label: 'Battles', icon: '⚔️' },
  { id: 'Houses', label: 'Houses', icon: '🛡️' },
  { id: 'Dragons', label: 'Dragons', icon: '🐉' },
  { id: 'Castles', label: 'Castles', icon: '🏰' },
  { id: 'Characters', label: 'Characters', icon: '👤' },
  { id: 'Coronations', label: 'Coronations', icon: '👑' },
  { id: 'Events', label: 'Events', icon: '📜' },
];

function getCategoryIcon(type) {
  switch ((type || '').toLowerCase()) {
    case 'castles': case 'castle': return '🏰';
    case 'battles': case 'battle': return '⚔️';
    case 'dragons': case 'dragon': return '🐉';
    case 'characters': case 'character': return '👤';
    case 'houses': case 'house': return '🛡️';
    case 'coronations': case 'coronation': return '👑';
    case 'events': case 'event': return '📜';
    default: return '📍';
  }
}

function getFallbackData() {
  return {
    timeline: [{ id: 'intro', title: 'The Realm', years: 'Ancient', description: 'The tale begins here.', events: [], politicalShift: 'The realm is awakening.' }],
    houses: [], characters: [], dragons: [], battles: [], castles: [],
    locations: [
      { id: 'winterfell', name: "Winterfell", x: 16.5, y: 24.7, type: 'Castles', description: "Ancient seat of House Stark, fortress of the North.", ruler: "House Stark", events: ["Battle of the Bastards", "The Long Night"], characters: ["Jon Snow", "Sansa Stark", "Arya Stark"] },
      { id: 'the-wall', name: "The Wall", x: 22.3, y: 16.4, type: 'Castles', description: "A colossal wall of ice guarding the realms of men.", ruler: "Night's Watch", events: ["Battle of Castle Black"], characters: ["Jon Snow", "Jeor Mormont"] },
      { id: "king's-landing", name: "King's Landing", x: 28.3, y: 53.8, type: 'Castles', description: "Capital of the Seven Kingdoms and seat of the Iron Throne.", ruler: "House Baratheon / House Targaryen", events: ["Battle of Blackwater", "Sack of King's Landing"], characters: ["Cersei Lannister", "Tyrion Lannister"] },
      { id: 'dragonstone', name: "Dragonstone", x: 37.3, y: 56.6, type: 'Castles', description: "Ancestral island seat of House Targaryen.", ruler: "House Targaryen", events: ["War of the Five Kings planning"], characters: ["Daenerys Targaryen", "Stannis Baratheon"] },
      { id: 'casterly-rock', name: "Casterly Rock", x: 8.1, y: 55.9, type: 'Castles', description: "Stronghold of House Lannister, carved into the coastal rock.", ruler: "House Lannister", events: ["Lannister Infiltration"], characters: ["Tywin Lannister", "Jaime Lannister"] },
      { id: 'highgarden', name: "Highgarden", x: 12.1, y: 63.8, type: 'Castles', description: "Garden capital of the Reach, seat of House Tyrell.", ruler: "House Tyrell", events: ["Sack of Highgarden"], characters: ["Olenna Tyrell", "Margaery Tyrell"] },
      { id: 'sunspear', name: "Sunspear", x: 15.2, y: 73.8, type: 'Castles', description: "Sun-baked capital of Dorne, seat of House Martell.", ruler: "House Martell", events: ["Unbowed Unbroken Unbroken"], characters: ["Oberyn Martell", "Doran Martell"] },
      { id: 'braavos', name: "Braavos", x: 55.4, y: 42.5, type: 'Events', description: "A proud free city across the narrow sea.", ruler: "The Sealord", events: ["Arya's Training"], characters: ["Arya Stark", "Jaqen H'ghar"] },
      { id: 'pentos', name: "Pentos", x: 60.4, y: 46.6, type: 'Events', description: "The free city closest to Westeros' shores.", ruler: "Magister", events: ["Targaryen Exile"], characters: ["Illyrio Mopatis"] },
      { id: 'volantis', name: "Volantis", x: 66.7, y: 63.4, type: 'Events', description: "Oldest and once-mightiest of the Free Cities.", ruler: "Triarchs", events: ["Red Temple Gathering"], characters: ["Kinvara"] },
      { id: 'meereen', name: "Meereen", x: 82.7, y: 71.6, type: 'Events', description: "A great city of Slaver's Bay.", ruler: "House Targaryen", events: ["Siege of Meereen"], characters: ["Daenerys Targaryen", "Barristan Selmy"] },
      { id: 'vaes-dothrak', name: "Vaes Dothrak", x: 81.0, y: 53.4, type: 'Events', description: "The sacred city of the Dothraki horselords.", ruler: "Dosh khaleen", events: ["Gathering of the Khals"], characters: ["Daenerys Targaryen"] },
    ],
  };
}

async function init() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    document.body.classList.add('loading');
    initCinematicLoading();
  } else {
    document.body.classList.remove('loading');
  }

  initCinematicBackground();
  initDragonVideos();

  try {
    const r = await fetch('assets/data/content.json');
    if (!r.ok) throw new Error('fetch failed');
    const fetched = await r.json();
    state.data = {
      ...getFallbackData(),
      ...(typeof mapData !== 'undefined' ? mapData : {}),
      ...fetched,
    };
  } catch (e) {
    console.warn('Using fallback data.', e);
    state.data = typeof mapData !== 'undefined' ? mapData : getFallbackData();
  }

  renderFilters();
  renderTimeline();
  ensureEncyclopediaData();
  renderSections();
  bindEvents();
  bindSectionSearch();

  if (state.data.timeline?.length) setActiveEra(0, { silent: true });
  if (state.data.locations?.length) setActiveLocation(state.data.locations[0].id, { silent: true });
}

function initDragonVideos() {
  document.querySelectorAll('.flying-dragon').forEach(video => {
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
    });
  });
}

function initCinematicBackground() {
  const canvas = document.getElementById('snowCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const layers = Array.from(document.querySelectorAll('.cinematic-layer'));
  let W = 0, H = 0, flakes = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      size: Math.random() * 2.6 + 0.6, speed: Math.random() * 1.1 + 0.3,
      opacity: Math.random() * 0.55 + 0.25, drift: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function parallax() {
    const scrollY = window.scrollY;
    layers.forEach(l => {
      const f = Number(l.dataset.parallax || 0.12);
      l.style.setProperty('--parallax-offset', `${scrollY * f}px`);
    });
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    flakes.forEach(f => {
      f.y += f.speed;
      f.x += Math.sin((f.y / 35) + f.phase) * 0.18;
      if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
      ctx.fill();
    });
    state.snowAnimId = requestAnimationFrame(tick);
  }

  resize(); parallax(); tick();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', parallax, { passive: true });
}

function renderFilters() {
  const filterList = document.getElementById('filterList');
  if (!filterList) return;
  filterList.innerHTML = filterOptions.map(f =>
    `<button class="filter-chip ${f.id === state.currentFilter ? 'active' : ''}" data-filter="${f.id}">
      <span class="chip-icon">${f.icon}</span>
      <span>${f.label}</span>
    </button>`
  ).join('');
}

function createSourceButton(links = []) {
  const link = Array.isArray(links) ? links[0] : null;
  if (link && link.url) {
    return `<div class="card-footer"><a class="btn ghost card-button" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label || 'View Image'}</a></div>`;
  }
  return `<div class="card-footer"><button class="btn ghost card-button disabled" disabled>View Image</button></div>`;
}

function ensureEncyclopediaData() {
  ['houses', 'characters', 'dragons', 'battles', 'castles'].forEach(key => {
    if (!Array.isArray(state.data[key])) state.data[key] = [];
  });
}

function filterEncyclopediaCards(query) {
  const cards = document.querySelectorAll('#housesGrid article, #charactersGrid article, #dragonsGrid article, #battlesGrid article, #castlesGrid article');
  const terms = query.trim().toLowerCase();
  cards.forEach(card => {
    card.hidden = terms ? !card.textContent.toLowerCase().includes(terms) : false;
  });
}

function renderTimeline() {
  const timeline = Array.isArray(state.data.timeline) ? state.data.timeline : [];
  const labels = document.getElementById('timelineLabels');
  const slider = document.getElementById('timelineSlider');
  if (!labels) return;

  if (!timeline.length) {
    labels.innerHTML = '<span>No timeline data available.</span>';
    if (slider) slider.disabled = true;
    return;
  }

  labels.innerHTML = timeline.map(era => `<span>${era.title}</span>`).join('');
  if (slider) {
    slider.max = Math.max(timeline.length - 1, 0);
    slider.disabled = false;
    slider.value = Math.min(state.currentEra, timeline.length - 1);
    if (!slider._timelineListenerAdded) {
      slider.addEventListener('input', e => setActiveEra(Number(e.target.value)));
      slider._timelineListenerAdded = true;
    }
  }
}

function renderSections() {
  renderHouses(); renderCharacters(); renderDragons();
  renderBattles(); renderCastles(); renderSearch(); renderMapMarkers();
}

function filterSectionCards(section, query) {
  const grid = document.getElementById(`${section}Grid`);
  if (!grid) return;
  const terms = query.trim().toLowerCase();
  grid.querySelectorAll('article').forEach(card => {
    card.hidden = terms ? !card.textContent.toLowerCase().includes(terms) : false;
  });
}

function bindSectionSearch() {
  document.querySelectorAll('.section-search-input').forEach(input => {
    input.addEventListener('input', e => {
      filterSectionCards(e.target.dataset.section, e.target.value);
    });
  });
}

function renderHouses() {
  const grid = document.getElementById('housesGrid');
  if (!grid) return;
  const houses = Array.isArray(state.data.houses) ? state.data.houses : [];
  if (!houses.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = houses.map(h => `
    <article class="card">
      <span class="badge">${h.words || 'House Sigil'}</span>
      <h3>${h.name}</h3>
      <p>${h.region || ''}</p>
      <ul class="list">
        <li><strong>Seat:</strong> ${h.seat || 'Unknown'}</li>
        <li><strong>Ruler:</strong> ${h.ruler || 'Unknown'}</li>
        <li><strong>Allegiance:</strong> ${h.allegiance || 'Unknown'}</li>
      </ul>
      ${createSourceButton(h.links || [])}
    </article>
  `).join('');
}

function renderCharacters() {
  const grid = document.getElementById('charactersGrid');
  if (!grid) return;
  const characters = Array.isArray(state.data.characters) ? state.data.characters : [];
  if (!characters.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = characters.map(c => {
    const alive = typeof c.status === 'string' && c.status.toLowerCase().includes('alive');
    return `<article class="card char-card">
      <span class="badge">${c.house || 'Westeros'}</span>
      <h3>${c.name}</h3>
      <p>${c.bio || ''}</p>
      <ul class="list">
        <li><strong>Titles:</strong> ${c.titles || 'Unknown'}</li>
        <li><strong>Allegiance:</strong> ${c.allegiance || 'Unknown'}</li>
        <li><strong>Status:</strong> <span class="status-text ${alive ? 'alive' : 'dead'}">${c.status || 'Unknown'}</span></li>
      </ul>
      ${createSourceButton(c.links || [])}
    </article>`;
  }).join('');
}

function renderDragons() {
  const grid = document.getElementById('dragonsGrid');
  if (!grid) return;
  const dragons = Array.isArray(state.data.dragons) ? state.data.dragons : [];
  if (!dragons.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = dragons.map((d) => `
    <article class="card dragon-card">
      <span class="badge">${d.colour || 'Fire & Blood'}</span>
      <h3>${d.name}</h3>
      <p>${d.description || ''}</p>
      <ul class="list">
        <li><strong>Rider:</strong> ${d.rider || 'Unknown'}</li>
        <li><strong>Size:</strong> ${d.size || 'Unknown'}</li>
        <li><strong>Status:</strong> ${d.status || 'Unknown'}</li>
      </ul>
      ${createSourceButton(d.links || [])}
    </article>
  `).join('');
}

function renderBattles() {
  const grid = document.getElementById('battlesGrid');
  if (!grid) return;
  const battles = Array.isArray(state.data.battles) ? state.data.battles : [];
  if (!battles.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = battles.map(b => `
    <article class="card">
      <span class="badge">${b.location || 'War'}</span>
      <h3>${b.name}</h3>
      <p>${b.summary || ''}</p>
      <ul class="list">
        <li><strong>Participants:</strong> ${(b.participants || b.commanders || []).join(', ')}</li>
        <li><strong>Winner:</strong> ${b.winner || 'Unknown'}</li>
      </ul>
      ${createSourceButton(b.links || [])}
    </article>
  `).join('');
}

function renderCastles() {
  const grid = document.getElementById('castlesGrid');
  if (!grid) return;
  const castles = Array.isArray(state.data.castles) ? state.data.castles : [];
  if (!castles.length) { grid.innerHTML = ''; return; }

  grid.innerHTML = castles.map(c => `
    <article class="card">
      <span class="badge">${c.region || 'Fortress'}</span>
      <h3>${c.name}</h3>
      <p>${c.description || ''}</p>
      <ul class="list">
        <li><strong>House:</strong> ${c.house || 'Unknown'}</li>
        <li><strong>Architecture:</strong> ${c.architecture || 'Unknown'}</li>
      </ul>
      ${createSourceButton(c.links || [])}
    </article>
  `).join('');
}

function renderSearch() {
  const results = document.getElementById('searchResults');
  if (results) results.innerHTML = '';
}

/* ====================================================================
   MAP MARKER RENDERING & POPUPS
   ==================================================================== */
function renderMapMarkers() {
  const container = document.getElementById('mapMarkers');
  if (!container || !state.data?.locations) return;
  container.innerHTML = '';
  state.activePopupEl = null;

  state.data.locations.forEach(loc => {
    const visible = state.currentFilter === 'all'
      || loc.type === state.currentFilter
      || (state.currentFilter === 'Events' && loc.category === 'event')
      || (state.currentFilter === 'Coronations' && loc.category === 'coronation');

    const catClass = `cat-${(loc.type || 'events').toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = `map-marker ${catClass} ${loc.id === state.currentLocation ? 'active' : ''}`;
    marker.style.left = `${loc.x}%`;
    marker.style.top = `${loc.y}%`;
    marker.title = loc.name;
    if (!visible) marker.hidden = true;
    marker.dataset.location = loc.id;

    marker.innerHTML = `
      <span class="pin-dot"></span>
      <span class="pin-label">${loc.name}</span>
    `;

    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveLocation(loc.id);
      showMapPopup(loc, marker);
    });

    container.appendChild(marker);
  });
}

function showMapPopup(loc, markerEl) {
  const container = document.getElementById('mapMarkers');
  if (state.activePopupEl) {
    state.activePopupEl.remove();
    state.activePopupEl = null;
  }

  const popup = document.createElement('div');
  popup.className = 'map-popup';
  popup.style.left = `${loc.x}%`;
  popup.style.top = `${loc.y}%`;

  const thumbHtml = (loc.image || loc.thumbnail)
    ? `<div class="popup-thumb"><img src="${loc.image || loc.thumbnail}" alt="${loc.name}" loading="lazy" /></div>`
    : '';

  const icon = getCategoryIcon(loc.type);

  popup.innerHTML = `
    <button class="popup-close" aria-label="Close popup">✕</button>
    ${thumbHtml}
    <div class="popup-content">
      <span class="popup-badge">${icon} ${loc.type || 'Location'}</span>
      <h4 class="popup-title">${loc.name}</h4>
      <p class="popup-desc">${loc.description}</p>
      <button class="popup-view-btn">View Details →</button>
    </div>
  `;

  popup.querySelector('.popup-close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeMapPopup();
  });

  const viewBtn = popup.querySelector('.popup-view-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveLocation(loc.id);
      closeMapPopup();
      const panel = document.getElementById('mapPanel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  container.appendChild(popup);
  state.activePopupEl = popup;
  requestAnimationFrame(() => popup.classList.add('show'));
}

function closeMapPopup() {
  if (state.activePopupEl) {
    state.activePopupEl.remove();
    state.activePopupEl = null;
  }
  document.querySelectorAll('.map-marker.active').forEach(m => m.classList.remove('active'));
}

/* ====================================================================
   SET ACTIVE LOCATION — MODERN ENCYCLOPEDIA LAYOUT
   ==================================================================== */
function setActiveLocation(id, opts = {}) {
  state.currentLocation = id;
  const loc = state.data.locations.find(l => l.id === id);
  if (!loc) return;

  const panel = document.getElementById('mapPanel');
  if (!panel) return;

  panel.classList.add('updating');

  setTimeout(() => {
    const icon = getCategoryIcon(loc.type);
    const eventsList = Array.isArray(loc.events) && loc.events.length
      ? loc.events.map(ev => `<li class="wiki-event-item">${ev}</li>`).join('')
      : `<li class="wiki-event-item">No major conflicts recorded in current archives.</li>`;

    const charactersList = Array.isArray(loc.characters) && loc.characters.length
      ? loc.characters.map(ch => `<span class="wiki-tag">👤 ${ch}</span>`).join('')
      : `<span class="wiki-tag">👤 Unknown / Unlisted</span>`;

    panel.innerHTML = `
      <div class="wiki-container">
        <div class="wiki-header-banner">
          <span class="wiki-type-badge">${icon} ${loc.type || 'Location'}</span>
          <h3 class="wiki-title">${loc.name}</h3>
        </div>

        <div class="wiki-body">
          <div class="wiki-infobox">
            <div class="wiki-infobox-header">Quick Facts</div>
            <div class="wiki-stat-row">
              <span class="wiki-stat-label">👑 Ruling Faction</span>
              <span class="wiki-stat-value">${loc.ruler || 'Unknown'}</span>
            </div>
            <div class="wiki-stat-row">
              <span class="wiki-stat-label">📍 Region Coordinates</span>
              <span class="wiki-stat-value">${loc.x}% X / ${loc.y}% Y</span>
            </div>
            <div class="wiki-stat-row">
              <span class="wiki-stat-label">🏛️ Classification</span>
              <span class="wiki-stat-value">${loc.type || 'Landmark'}</span>
            </div>
          </div>

          <div class="wiki-section">
            <h4 class="wiki-section-title">📖 History & Lore</h4>
            <p class="wiki-description">${loc.description}</p>
          </div>

          <div class="wiki-section">
            <h4 class="wiki-section-title">👥 Associated Figures</h4>
            <div class="wiki-tags">${charactersList}</div>
          </div>

          <div class="wiki-section">
            <h4 class="wiki-section-title">⚔️ Chronicle Events</h4>
            <ul class="wiki-events-list">${eventsList}</ul>
          </div>
        </div>

        <div class="wiki-actions">
          <button class="btn primary" id="wikiFocusBtn" style="width: 100%;">
            📍 Focus Map Location
          </button>
        </div>
      </div>
    `;

    panel.classList.remove('updating');

    const focusBtn = panel.querySelector('#wikiFocusBtn');
    if (focusBtn) {
      focusBtn.addEventListener('click', () => {
        const marker = document.querySelector(`.map-marker[data-location="${loc.id}"]`);
        if (marker) {
          showMapPopup(loc, marker);
          marker.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }, 180);

  document.querySelectorAll('.map-marker').forEach(m =>
    m.classList.toggle('active', m.dataset.location === id)
  );
}

function setActiveEra(idx, opts = {}) {
  state.currentEra = idx;
  const era = state.data.timeline[idx];
  const slider = document.getElementById('timelineSlider');
  if (slider) slider.value = idx;

  const panel = document.getElementById('timelinePanel');
  if (!panel) return;
  panel.classList.add('era-fade');
  setTimeout(() => {
    panel.innerHTML = `
      <h3>${era.title}</h3>
      <p>${era.description}</p>
      <ul class="list">
        <li><strong>Years:</strong> ${era.years}</li>
        <li><strong>Events:</strong> ${(era.events || []).join(', ')}</li>
        <li><strong>Political Shift:</strong> ${era.politicalShift}</li>
      </ul>`;
    panel.classList.remove('era-fade');
  }, 200);
}

function initCinematicLoading() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (!loadingScreen) return;

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2500);
}

/* ====================================================================
   SEARCH FUNCTIONALITY WITH CATEGORY ICONS & DROPDOWN SELECTION
   ==================================================================== */
function bindEvents() {
  const filterList = document.getElementById('filterList');
  if (filterList) {
    filterList.addEventListener('click', e => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      state.currentFilter = chip.dataset.filter;
      renderFilters();
      renderMapMarkers();
    });
  }

  document.querySelectorAll('[data-zoom]').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.zoom;
      if (a === 'in') state.zoom = Math.min(2.2, state.zoom + 0.2);
      if (a === 'out') state.zoom = Math.max(0.6, state.zoom - 0.2);
      if (a === 'reset') state.zoom = 1;
      const img = document.querySelector('.map-image');
      if (img) img.style.transform = `scale(${state.zoom})`;
    });
  });

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = "Search locations, houses, dragons...";
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      const out = document.getElementById('searchResults');
      filterEncyclopediaCards(q);
      if (!q) { out.innerHTML = ''; return; }

      const all = [
        ...state.data.characters.map(x => ({ ...x, _type: 'Character' })),
        ...state.data.houses.map(x => ({ ...x, _type: 'House' })),
        ...state.data.dragons.map(x => ({ ...x, _type: 'Dragon' })),
        ...state.data.battles.map(x => ({ ...x, _type: 'Battle' })),
        ...state.data.castles.map(x => ({ ...x, _type: 'Castle' })),
        ...state.data.locations.map(x => ({ ...x, _type: 'Location' })),
      ].filter(x => x.name.toLowerCase().includes(q) || (x.house || '').toLowerCase().includes(q));

      out.innerHTML = all.slice(0, 8).map(x => {
        const typeStr = x._type || x.type || 'Location';
        const icon = getCategoryIcon(typeStr);
        return `
          <div class="search-result" data-id="${x.id || ''}">
            <div class="search-result-left">
              <span class="search-result-icon">${icon}</span>
              <span class="search-result-name">${x.name}</span>
            </div>
            <span class="search-result-badge">${typeStr}</span>
          </div>`;
      }).join('');

      out.querySelectorAll('.search-result').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.id;
          if (id) {
            setActiveLocation(id);
            const marker = document.querySelector(`.map-marker[data-location="${id}"]`);
            if (marker) {
              const locObj = state.data.locations.find(l => l.id === id);
              if (locObj) showMapPopup(locObj, marker);
            }
          }
          out.innerHTML = '';
        });
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
      const out = document.getElementById('searchResults');
      if (out) out.innerHTML = '';
    }
    closeMapPopup();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}