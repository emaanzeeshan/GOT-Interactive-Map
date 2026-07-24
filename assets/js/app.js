/* =====================================================================
   THE HISTORY OF WESTEROS — app.js
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

const filterOptions = ['all','Battles','Houses','Dragons','Castles','Characters','Coronations','Events'];

function getFallbackData() {
  return {
    timeline:[{id:'intro',title:'The Realm',years:'Ancient',description:'The tale begins here.',events:[],politicalShift:'The realm is awakening.'}],
    houses:[],characters:[],dragons:[],battles:[],castles:[],
    locations:[
      { id:'winterfell',    name:"Winterfell",     x:16.5, y:24.7, type:'Castles', description:"Ancient seat of House Stark, fortress of the North.", ruler:"House Stark", events:[], characters:[] },
      { id:'the-wall',      name:"The Wall",        x:22.3, y:16.4, type:'Castles', description:"A colossal wall of ice guarding the realms of men.", ruler:"Night's Watch", events:[], characters:[] },
      { id:"king's-landing",name:"King's Landing", x:28.3, y:53.8, type:'Castles', description:"Capital of the Seven Kingdoms and seat of the Iron Throne.", ruler:"House Baratheon / House Targaryen", events:[], characters:[] },
      { id:'dragonstone',   name:"Dragonstone",     x:37.3, y:56.6, type:'Castles', description:"Ancestral island seat of House Targaryen.", ruler:"House Targaryen", events:[], characters:[] },
      { id:'casterly-rock', name:"Casterly Rock",   x:8.1,  y:55.9, type:'Castles', description:"Stronghold of House Lannister, carved into the coastal rock.", ruler:"House Lannister", events:[], characters:[] },
      { id:'highgarden',    name:"Highgarden",      x:12.1, y:63.8, type:'Castles', description:"Garden capital of the Reach, seat of House Tyrell.", ruler:"House Tyrell", events:[], characters:[] },
      { id:'sunspear',      name:"Sunspear",        x:15.2, y:73.8, type:'Castles', description:"Sun-baked capital of Dorne, seat of House Martell.", ruler:"House Martell", events:[], characters:[] },
      { id:'braavos',       name:"Braavos",         x:55.4, y:42.5, type:'Events',  description:"A proud free city across the narrow sea.", ruler:"The Sealord", events:[], characters:[] },
      { id:'pentos',        name:"Pentos",          x:60.4, y:46.6, type:'Events',  description:"The free city closest to Westeros' shores.", ruler:"Magister", events:[], characters:[] },
      { id:'volantis',      name:"Volantis",        x:66.7, y:63.4, type:'Events',  description:"Oldest and once-mightiest of the Free Cities.", ruler:"Triarchs", events:[], characters:[] },
      { id:'meereen',       name:"Meereen",         x:82.7, y:71.6, type:'Events',  description:"A great city of Slaver's Bay.", ruler:"Varies", events:[], characters:[] },
      { id:'vaes-dothrak',  name:"Vaes Dothrak",    x:81.0, y:53.4, type:'Events',  description:"The sacred city of the Dothraki horselords.", ruler:"Dosh khaleen", events:[], characters:[] },
    ],
  };
}

async function init() {
  const hasIntro = !!document.getElementById('startJourney');
  if (hasIntro) {
    document.body.classList.add('loading');
  } else {
    document.body.classList.remove('loading');
  }

  bindStartJourney();
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
  } catch(e) {
    console.warn('Using fallback data.', e);
    state.data = typeof mapData !== 'undefined' ? mapData : getFallbackData();
  }
  renderFilters();
  renderTimeline();
  ensureEncyclopediaData();
  renderSections();
  bindEvents();
  bindSectionSearch();
  if (state.data.timeline?.length)    setActiveEra(0, { silent:true });
  if (state.data.locations?.length)   setActiveLocation(state.data.locations[0].id, { silent:true });
}

/* ====================================================================
   DRAGON VIDEO LOOP
   ==================================================================== */
function initDragonVideos() {
  document.querySelectorAll('.flying-dragon').forEach(video => {
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
    video.addEventListener('pause', () => {
      video.play();
    });
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
    });
  });
}

/* ====================================================================
   CINEMATIC SNOW + PARALLAX
   ==================================================================== */
function initCinematicBackground() {
  const canvas = document.getElementById('snowCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const layers = Array.from(document.querySelectorAll('.cinematic-layer'));
  let W=0, H=0, flakes=[];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth; H = window.innerHeight;
    canvas.width  = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W+'px'; canvas.style.height = H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    flakes = Array.from({length:120}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      size: Math.random()*2.6+0.6,
      speed: Math.random()*1.1+0.3,
      opacity: Math.random()*0.55+0.25,
      drift: Math.random()*0.5+0.15,
      phase: Math.random()*Math.PI*2,
    }));
  }

  function parallax() {
    const scrollY = window.scrollY;
    layers.forEach(l => {
      const f = Number(l.dataset.parallax || 0.12);
      l.style.setProperty('--parallax-offset', `${scrollY*f}px`);
    });
  }

  function tick() {
    ctx.clearRect(0,0,W,H);
    flakes.forEach(f => {
      f.y += f.speed;
      f.x += Math.sin((f.y/35) + f.phase) * 0.18;
      if (f.y > H+10) { f.y=-10; f.x=Math.random()*W; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
      ctx.fill();
    });
    state.snowAnimId = requestAnimationFrame(tick);
  }

  resize();
  parallax();
  tick();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', parallax, {passive:true});
}

/* ====================================================================
   RENDER FUNCTIONS
   ==================================================================== */
function renderFilters() {
  const filterList = document.getElementById('filterList');
  if (!filterList) return;
  filterList.innerHTML = filterOptions.map(f =>
    `<button class="filter-chip ${f===state.currentFilter?'active':''}" data-filter="${f}">${f==='all'?'All':f}</button>`
  ).join('');
}

function createSourceButton(links = []) {
  const link = Array.isArray(links) ? links[0] : null;
  if (link && link.url) {
    return `<div class="card-footer"><a class="btn ghost card-button" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label || 'View Image'}</a></div>`;
  }
  return `<div class="card-footer"><button class="btn ghost card-button disabled" disabled>View Image</button></div>`;
}

function createSourceLinks(links = []) {
  if (!links.length) return '';
  return `<div class="card-footer">${links.map(link =>
    `<a class="info-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
  ).join('')}</div>`;
}

function ensureEncyclopediaData() {
  ['houses', 'characters', 'dragons', 'battles', 'castles'].forEach(key => {
    if (!Array.isArray(state.data[key])) {
      state.data[key] = [];
    }
  });
}

function filterEncyclopediaCards(query) {
  const cards = document.querySelectorAll('#housesGrid article, #charactersGrid article, #dragonsGrid article, #battlesGrid article, #castlesGrid article');
  const terms = query.trim().toLowerCase();
  cards.forEach(card => {
    if (!terms) {
      card.hidden = false;
      return;
    }
    const text = card.textContent.toLowerCase();
    card.hidden = !text.includes(terms);
  });
}

function renderTimeline() {
  const timeline = Array.isArray(state.data.timeline) ? state.data.timeline : [];
  const labels = document.getElementById('timelineLabels');
  const slider = document.getElementById('timelineSlider');

  if (!labels) return;

  if (!timeline.length) {
    labels.innerHTML = '<span>No timeline data available.</span>';
    if (slider) {
      slider.max = 0;
      slider.value = 0;
      slider.disabled = true;
    }
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
    if (!terms) {
      card.hidden = false;
      return;
    }
    const text = card.textContent.toLowerCase();
    card.hidden = !text.includes(terms);
  });
}

function bindSectionSearch() {
  document.querySelectorAll('.section-search-input').forEach(input => {
    input.addEventListener('input', e => {
      const section = e.target.dataset.section;
      filterSectionCards(section, e.target.value);
    });
  });
}

function renderHouses() {
  const grid = document.getElementById('housesGrid');
  if (!grid) return;
  const houses = Array.isArray(state.data.houses) ? state.data.houses : [];
  if (!houses.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = houses.map(h => `
    <article class="card">
      <div class="card-image"></div>
      <span class="badge">${h.words || ''}</span>
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
  if (!characters.length) {
    grid.innerHTML = '';
    return;
  }
  grid.innerHTML = characters.map(c => {
    const alive = typeof c.status === 'string' && c.status.toLowerCase().includes('alive');
    return `<article class="card char-card">
      <div class="card-image"></div>
      <div class="avatar-wrap">
        <div class="avatar avatar-breathe">${c.initials || ''}</div>
        <div class="avatar-eyes">
          <span class="eye eye-left"></span>
          <span class="eye eye-right"></span>
        </div>
        <div class="status-dot ${alive ? 'alive' : 'dead'}"></div>
      </div>
      <span class="badge">${c.house || ''}</span>
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

  document.querySelectorAll('.eye').forEach((el, i) => {
    el.style.animationDelay = `${(i*1.3)%4}s`;
  });
}

function renderDragons() {
  const grid = document.getElementById('dragonsGrid');
  if (!grid) return;
  const dragons = Array.isArray(state.data.dragons) ? state.data.dragons : [];
  if (!dragons.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = dragons.map((d, i) => `
    <article class="card dragon-card">
      <div class="card-image"></div>
      <div class="dragon-icon-wrap">
        <div class="dragon-icon dragon-icon-${i%3}">🐉</div>
        <div class="dragon-fire"></div>
      </div>
      <span class="badge">${d.colour || ''}</span>
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
  if (!battles.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = battles.map(b => `
    <article class="card">
      <div class="card-image"></div>
      <span class="badge">${b.location || ''}</span>
      <h3>${b.name}</h3>
      <p>${b.summary || ''}</p>
      <ul class="list">
        <li><strong>Participants:</strong> ${(b.participants || b.commanders || []).join(', ')}</li>
        <li><strong>Winner:</strong> ${b.winner || 'Unknown'}</li>
        <li><strong>Consequences:</strong> ${b.consequences || 'Unknown'}</li>
      </ul>
      ${createSourceButton(b.links || [])}
    </article>
  `).join('');
}

function renderCastles() {
  const grid = document.getElementById('castlesGrid');
  if (!grid) return;
  const castles = Array.isArray(state.data.castles) ? state.data.castles : [];
  if (!castles.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = castles.map(c => `
    <article class="card">
      <div class="card-image"></div>
      <span class="badge">${c.region || ''}</span>
      <h3>${c.name}</h3>
      <p>${c.description || ''}</p>
      <ul class="list">
        <li><strong>House:</strong> ${c.house || 'Unknown'}</li>
        <li><strong>Architecture:</strong> ${c.architecture || 'Unknown'}</li>
        <li><strong>Importance:</strong> ${c.importance || 'Unknown'}</li>
      </ul>
      ${createSourceButton(c.links || [])}
    </article>
  `).join('');
}

function renderSearch() {
  const results = document.getElementById('searchResults');
  if (results) results.innerHTML = '';
}

/* ---- MAP MARKERS (pin + hover label; click opens popup + sidebar) ---- */
function renderMapMarkers() {
  const container = document.getElementById('mapMarkers');
  if (!container || !state.data?.locations) return;
  container.innerHTML = '';
  state.activePopupEl = null;

  state.data.locations.forEach(loc => {
    const visible = state.currentFilter==='all'
      || loc.type===state.currentFilter
      || (state.currentFilter==='Events' && loc.category==='event')
      || (state.currentFilter==='Coronations' && loc.category==='coronation');

    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = `map-marker ${loc.id===state.currentLocation?'active':''}`;
    marker.style.left = `${loc.x}%`;
    marker.style.top = `${loc.y}%`;
    marker.title = loc.name;
    if (!visible) marker.hidden = true;
    marker.dataset.location = loc.id;
    marker.innerHTML = `<span class="pin-dot"></span><span class="pin-label">${loc.name}</span>`;

    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveLocation(loc.id);
      showMapPopup(loc, marker);
    });

    container.appendChild(marker);
  });
}

/* popup card that appears directly above the clicked marker */
function showMapPopup(loc, markerEl) {
  const container = document.getElementById('mapMarkers');
  if (state.activePopupEl) { state.activePopupEl.remove(); state.activePopupEl = null; }

  const popup = document.createElement('div');
  popup.className = 'map-popup';
  popup.style.left = `${loc.x}%`;
  popup.style.top = `${loc.y}%`;
  popup.innerHTML = `
    <span class="popup-close">✕</span>
    <h4>${loc.name}</h4>
    <p>${loc.description}</p>
  `;
  popup.querySelector('.popup-close').addEventListener('click', (e) => {
    e.stopPropagation();
    popup.remove();
    state.activePopupEl = null;
    markerEl.classList.remove('active');
  });

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
   STATE SETTERS
   ==================================================================== */
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
        <li><strong>Events:</strong> ${era.events.join(', ')}</li>
        <li><strong>Political Shift:</strong> ${era.politicalShift}</li>
      </ul>`;
    panel.classList.remove('era-fade');
  }, 200);

  if (!opts.silent) playEraSound(era.id);
}

function setActiveLocation(id, opts = {}) {
  state.currentLocation = id;
  const loc = state.data.locations.find(l => l.id===id);
  if (!loc) return;

  const panel = document.getElementById('mapPanel');
  if (!panel) return;
  panel.classList.add('era-fade');
  setTimeout(() => {
    panel.innerHTML = `
      <h3>${loc.name}</h3>
      <p>${loc.description}</p>
      <ul class="list">
        <li><strong>Ruler:</strong> ${loc.ruler}</li>
        <li><strong>Events:</strong> ${loc.events.join(', ')}</li>
        <li><strong>Characters:</strong> ${loc.characters.join(', ')}</li>
      </ul>`;
    panel.classList.remove('era-fade');
  }, 180);

  document.querySelectorAll('.map-marker').forEach(m =>
    m.classList.toggle('active', m.dataset.location === id)
  );
}

/* ====================================================================
   EVENT BINDING
   ==================================================================== */
function bindStartJourney() {
  const btn = document.getElementById('startJourney');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const screen = document.getElementById('loadingScreen');
    if (screen) screen.classList.add('hidden');
    document.body.classList.remove('loading');
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

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
      if (a==='in')    state.zoom = Math.min(2.2, state.zoom+0.2);
      if (a==='out')   state.zoom = Math.max(0.6, state.zoom-0.2);
      if (a==='reset') state.zoom = 1;
      const img = document.querySelector('.map-image');
      if (img) img.style.transform = `scale(${state.zoom})`;
    });
  });

  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      menu?.classList.remove('open');
      const href = a.getAttribute('href') || '';
      const hash = href.includes('#') ? href.split('#')[1] : '';
      const pageName = href.split('/').pop().split('.')[0] || '';
      const themeKey = hash || pageName || 'home';
      setSectionTheme(themeKey);
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      const out = document.getElementById('searchResults');
      filterEncyclopediaCards(q);
      if (!q) { out.innerHTML=''; return; }

      const all = [
        ...state.data.characters.map(x=>({...x,_type:'Character'})),
        ...state.data.houses.map(x=>({...x,_type:'House'})),
        ...state.data.dragons.map(x=>({...x,_type:'Dragon'})),
        ...state.data.battles.map(x=>({...x,_type:'Battle'})),
        ...state.data.castles.map(x=>({...x,_type:'Castle'})),
        ...state.data.locations.map(x=>({...x,_type:'Location'})),
      ].filter(x => x.name.toLowerCase().includes(q) || (x.house||'').toLowerCase().includes(q) || (x.region||'').toLowerCase().includes(q));

      out.innerHTML = all.slice(0,10).map(x => `
        <div class="search-result">
          <span class="badge" style="margin-bottom:0.3rem">${x._type}</span>
          <strong>${x.name}</strong>
          <p>${x.description||x.summary||x.territory||x.bio||''}</p>
        </div>`).join('');
    });
  }

  // clicking anywhere outside a marker/popup closes the open popup
  document.addEventListener('click', () => closeMapPopup());

  window.addEventListener('scroll', () => {
    const offset = window.scrollY + 130;
    document.querySelectorAll('section').forEach(sec => {
      if (offset >= sec.offsetTop && offset < sec.offsetTop + sec.offsetHeight) {
        document.querySelectorAll('.nav-links a').forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`)
        );
      }
    });
  }, {passive:true});
}

/* ── Entry point ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}