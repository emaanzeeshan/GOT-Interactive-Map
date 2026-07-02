/* =====================================================================
   THE HISTORY OF WESTEROS — app.js
   ===================================================================== */

const state = {
  data: null,
  currentEra: 0,
  currentLocation: null,
  currentFilter: 'all',
  zoom: 1,
  music: null,
  gain: null,
  audioEnabled: true,
  themeTimer: null,
  themeStarted: false,
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
  bindStartJourney();
  initCinematicBackground();
  initDragonVideos();

  try {
    const r = await fetch('assets/data/content.json');
    if (!r.ok) throw new Error('fetch failed');
    state.data = await r.json();
  } catch(e) {
    console.warn('Using fallback data.', e);
    state.data = getFallbackData();
  }
  renderFilters();
  renderTimeline();
  renderSections();
  bindEvents();
  if (state.data.timeline?.length)    setActiveEra(0);
  if (state.data.locations?.length)   setActiveLocation(state.data.locations[0].id, { silent:true });
  setSectionTheme('home');
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
  document.getElementById('filterList').innerHTML = filterOptions.map(f =>
    `<button class="filter-chip ${f===state.currentFilter?'active':''}" data-filter="${f}">${f==='all'?'All':f}</button>`
  ).join('');
}

function renderTimeline() {
  const labels = document.getElementById('timelineLabels');
  labels.innerHTML = state.data.timeline.map(era => `<span>${era.title}</span>`).join('');
  const slider = document.getElementById('timelineSlider');
  slider.max = state.data.timeline.length - 1;
  slider.addEventListener('input', e => setActiveEra(Number(e.target.value)));
}

function renderSections() {
  renderHouses(); renderCharacters(); renderDragons();
  renderBattles(); renderCastles(); renderSearch(); renderMapMarkers();
}

function renderHouses() {
  const grid = document.getElementById('housesGrid');
  grid.innerHTML = state.data.houses.map(h => {
    const ruler = h.rulers[state.data.timeline[state.currentEra].id] || h.currentRuler;
    return `<article class="card">
      <div class="sigil">${h.sigil}</div>
      <span class="badge">${h.words}</span>
      <h3>${h.name}</h3>
      <p>${h.territory}</p>
      <ul class="list">
        <li><strong>Ruler:</strong> ${ruler}</li>
        <li><strong>Allies:</strong> ${h.allies.join(', ')}</li>
        <li><strong>Enemies:</strong> ${h.enemies.join(', ')}</li>
      </ul>
    </article>`;
  }).join('');
}

function renderCharacters() {
  const grid = document.getElementById('charactersGrid');
  grid.innerHTML = state.data.characters.map(c => {
    const status = c.statusByEra[state.data.timeline[state.currentEra].id] || c.status || 'Unknown';
    const alive = status.toLowerCase().includes('alive');
    return `<article class="card char-card" data-char="${c.name}">
      <div class="avatar-wrap">
        <div class="avatar avatar-breathe">${c.initials}</div>
        <div class="avatar-eyes">
          <span class="eye eye-left"></span>
          <span class="eye eye-right"></span>
        </div>
        <div class="status-dot ${alive?'alive':'dead'}"></div>
      </div>
      <span class="badge">${c.house}</span>
      <h3>${c.name}</h3>
      <p>${c.bio}</p>
      <ul class="list">
        <li><strong>Status:</strong> <span class="status-text ${alive?'alive':'dead'}">${status}</span></li>
        <li><strong>Weapon:</strong> ${c.weapon}</li>
        <li><strong>Path:</strong> ${c.path}</li>
      </ul>
    </article>`;
  }).join('');

  document.querySelectorAll('.eye').forEach((el, i) => {
    el.style.animationDelay = `${(i*1.3)%4}s`;
  });
}

function renderDragons() {
  const grid = document.getElementById('dragonsGrid');
  grid.innerHTML = state.data.dragons.map((d, i) => `
    <article class="card dragon-card">
      <div class="dragon-icon-wrap">
        <div class="dragon-icon dragon-icon-${i%3}">🐉</div>
        <div class="dragon-fire"></div>
      </div>
      <span class="badge">${d.breed}</span>
      <h3>${d.name}</h3>
      <p>${d.description}</p>
      <ul class="list">
        <li><strong>Rider:</strong> ${d.rider}</li>
        <li><strong>Size:</strong> ${d.size}</li>
        <li><strong>Fate:</strong> ${d.death}</li>
      </ul>
    </article>
  `).join('');
}

function renderBattles() {
  document.getElementById('battlesGrid').innerHTML = state.data.battles.map(b => `
    <article class="card">
      <span class="badge">${b.location}</span>
      <h3>${b.name}</h3>
      <p>${b.summary}</p>
      <ul class="list">
        <li><strong>Commanders:</strong> ${b.commanders.join(', ')}</li>
        <li><strong>Outcome:</strong> ${b.outcome}</li>
        <li><strong>Era:</strong> ${b.era}</li>
      </ul>
    </article>
  `).join('');
}

function renderCastles() {
  document.getElementById('castlesGrid').innerHTML = state.data.castles.map(c => `
    <article class="card">
      <span class="badge">${c.region}</span>
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <ul class="list">
        <li><strong>House:</strong> ${c.house}</li>
        <li><strong>Notable:</strong> ${c.notable}</li>
        <li><strong>Feature:</strong> ${c.feature}</li>
      </ul>
    </article>
  `).join('');
}

function renderSearch() {
  document.getElementById('searchResults').innerHTML = '';
}

/* ---- MAP MARKERS (pin + hover label; click opens popup + sidebar) ---- */
function renderMapMarkers() {
  const container = document.getElementById('mapMarkers');
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
function setActiveEra(idx) {
  state.currentEra = idx;
  const era = state.data.timeline[idx];
  document.getElementById('timelineSlider').value = idx;

  const panel = document.getElementById('timelinePanel');
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

  renderHouses();
  renderCharacters();
  playEraSound(era.id);
  renderMapMarkers();
}

function setActiveLocation(id, opts = {}) {
  state.currentLocation = id;
  const loc = state.data.locations.find(l => l.id===id);
  if (!loc) return;

  const panel = document.getElementById('mapPanel');
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

  if (!opts.silent) playLocationSound(loc);
}

/* ====================================================================
   AUDIO ENGINE
   ==================================================================== */
function ensureAudio() {
  if (state.music) return true;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return false;
  state.music = new Ctor();
  state.gain  = state.music.createGain();
  state.gain.gain.value = 0.04;
  state.gain.connect(state.music.destination);
  return true;
}

function clearTheme() {
  if (state.themeTimer) { clearInterval(state.themeTimer); state.themeTimer=null; }
}

const THEMES = {
  home:       [523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33],
  map:        [392, 440, 493.88, 523.25, 587.33, 523.25],
  timeline:   [329.63, 369.99, 440, 493.88, 440, 369.99],
  houses:     [261.63, 293.66, 329.63, 369.99, 329.63],
  characters: [349.23, 392, 440, 493.88, 440, 392],
  dragons:    [493.88, 554.37, 587.33, 659.25, 739.99, 830.61],
  battles:    [220, 246.94, 261.63, 293.66, 246.94, 220],
  castles:    [293.66, 329.63, 369.99, 415.30, 369.99],
  search:     [392, 440, 493.88, 523.25, 440],
};

const LOCATION_THEMES = {
  'winterfell':     THEMES.battles,
  "king's-landing": THEMES.home,
  'dragonstone':    THEMES.dragons,
  'the-wall':       THEMES.battles,
};

function playNote(freq, when, dur=0.45, wave='sine', vol=0.022) {
  if (!state.music || !state.audioEnabled) return;
  const osc = state.music.createOscillator();
  const gn  = state.music.createGain();
  osc.type = wave;
  osc.frequency.value = freq;
  gn.gain.setValueAtTime(0.0001, when);
  gn.gain.linearRampToValueAtTime(vol, when+0.02);
  gn.gain.exponentialRampToValueAtTime(0.0001, when+dur);
  osc.connect(gn).connect(state.gain);
  osc.start(when); osc.stop(when+dur+0.05);
}

function playSequence(notes, bpm=72) {
  if (!ensureAudio() || !state.audioEnabled) return;
  clearTheme();
  const interval = 60/bpm;
  state.themeStarted = true;
  const loop = () => {
    const now = state.music.currentTime;
    notes.forEach((freq, i) => {
      playNote(freq, now + i*interval, interval*0.85);
      playNote(freq*0.5, now + i*interval, interval*0.85, 'triangle', 0.008);
    });
    state.themeTimer = setTimeout(loop, notes.length * interval * 1000);
  };
  loop();
}

function playEraSound(eraId) {
  const eraMap = {
    'age-of-heroes':        THEMES.castles,
    'the-long-night':       THEMES.battles,
    'aegons-conquest':      THEMES.dragons,
    'dance-of-the-dragons': THEMES.dragons,
    'blackfyre-rebellions': THEMES.battles,
    'roberts-rebellion':    THEMES.battles,
    'war-of-the-five-kings':THEMES.houses,
    'house-of-the-dragon':  THEMES.dragons,
    'game-of-thrones':      THEMES.home,
  };
  playSequence(eraMap[eraId] || THEMES.home, 66);
}

function playLocationSound(loc) {
  playSequence(LOCATION_THEMES[loc.id] || THEMES.map, 80);
}

function setSectionTheme(id) {
  playSequence(THEMES[id] || THEMES.home, 72);
}

function playTheme(id) { setSectionTheme(id); }

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
    playTheme('home');
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

function bindEvents() {
  document.getElementById('filterList').addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    state.currentFilter = chip.dataset.filter;
    renderFilters();
    renderMapMarkers();
  });

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
      setSectionTheme(a.getAttribute('href').slice(1));
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      const out = document.getElementById('searchResults');
      if (!q) { out.innerHTML=''; return; }

      const all = [
        ...state.data.characters.map(x=>({...x,_type:'Character'})),
        ...state.data.houses.map(x=>({...x,_type:'House'})),
        ...state.data.dragons.map(x=>({...x,_type:'Dragon'})),
        ...state.data.battles.map(x=>({...x,_type:'Battle'})),
        ...state.data.castles.map(x=>({...x,_type:'Castle'})),
        ...state.data.locations.map(x=>({...x,_type:'Location'})),
      ].filter(x => x.name.toLowerCase().includes(q));

      out.innerHTML = all.slice(0,10).map(x => `
        <div class="search-result">
          <span class="badge" style="margin-bottom:0.3rem">${x._type}</span>
          <strong>${x.name}</strong>
          <p>${x.description||x.summary||x.territory||x.bio||''}</p>
        </div>`).join('');
    });
  }

  const audioBtn = document.getElementById('audioToggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      audioBtn.textContent = state.audioEnabled ? '🔊' : '🔈';
      if (state.audioEnabled) {
        if (!state.themeStarted) playTheme('home');
        if (state.gain) state.gain.gain.setTargetAtTime(0.04, state.music.currentTime, 0.1);
      } else if (state.gain) {
        state.gain.gain.setTargetAtTime(0, state.music.currentTime, 0.1);
      }
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