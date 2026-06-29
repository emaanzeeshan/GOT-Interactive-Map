/* =====================================================================
   THE HISTORY OF WESTEROS — app.js (full rewrite)
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
  dragonAnimFrames: [],
  snowAnimId: null,
};

const filterOptions = ['all','Battles','Houses','Dragons','Castles','Characters','Coronations','Events'];

/* ── Fallback data ── */
function getFallbackData() {
  return {
    timeline:[{id:'intro',title:'The Realm',years:'Ancient',description:'The tale begins here.',events:[],politicalShift:'The realm is awakening.'}],
    houses:[],characters:[],dragons:[],battles:[],castles:[],locations:[],
  };
}

/* ── Boot ── */
async function init() {
  bindStartJourney();
  initCinematicBackground();
  initDragons();
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
  if (state.data.locations?.length)   setActiveLocation(state.data.locations[0].id);
  setSectionTheme('home');
}

/* ====================================================================
   CINEMATIC SNOW + PARALLAX BACKGROUND
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

  function tick(t) {
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
  tick(0);
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', parallax, {passive:true});
}

/* ====================================================================
   ANIMATED DRAGONS  (canvas-based silhouettes flying across the scene)
   ==================================================================== */
function initDragons() {
  const canvas = document.getElementById('dragonCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W=0, H=0;

  const dragons = [
    { x:-200, y:0.18, speed:0.55, scale:1.1, opacity:0.75, color:'#c83c22', dir:1, phase:0 },
    { x:-500, y:0.32, speed:0.38, scale:0.7, opacity:0.55, color:'#7b1a0f', dir:1, phase:1.4 },
    { x:-900, y:0.12, speed:0.70, scale:1.4, opacity:0.60, color:'#a0280f', dir:1, phase:2.8 },
  ];

  function resize() {
    const dpr = window.devicePixelRatio||1;
    W = window.innerWidth; H = window.innerHeight;
    canvas.width=W*dpr; canvas.height=H*dpr;
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  /* Draw a stylised GOT dragon silhouette */
  function drawDragon(ctx, t, scale, color, wingPhase) {
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    const wingBeat = Math.sin(t * 3.5 + wingPhase);

    /* body */
    ctx.beginPath();
    ctx.ellipse(0, 0, 62, 18, -0.08, 0, Math.PI*2);
    ctx.fill();

    /* head & neck */
    ctx.beginPath();
    ctx.ellipse(72, -6, 22, 10, 0.35, 0, Math.PI*2);
    ctx.fill();

    /* snout */
    ctx.beginPath();
    ctx.moveTo(88,-2); ctx.lineTo(104,2); ctx.lineTo(88,8); ctx.closePath();
    ctx.fill();

    /* tail */
    ctx.beginPath();
    ctx.moveTo(-55,4); ctx.quadraticCurveTo(-90,22,-115,8);
    ctx.quadraticCurveTo(-120,6,-115,2);
    ctx.quadraticCurveTo(-90,14,-55,-4);
    ctx.closePath();
    ctx.fill();

    /* left wing (up) */
    const wL = wingBeat * 45;
    ctx.save();
    ctx.translate(-10,-10);
    ctx.rotate((-0.6 + wingBeat*0.5) * (Math.PI/180) * 60);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.quadraticCurveTo(-30,-80,-10,-120);
    ctx.quadraticCurveTo(30,-70,55,-30);
    ctx.quadraticCurveTo(30,-20,15,-10);
    ctx.closePath();
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.restore();

    /* right wing (down mirror) */
    ctx.save();
    ctx.translate(-10, 10);
    ctx.scale(1,-1);
    ctx.rotate((-0.6 + wingBeat*0.5) * (Math.PI/180) * 48);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.quadraticCurveTo(-30,-80,-10,-120);
    ctx.quadraticCurveTo(30,-70,55,-30);
    ctx.quadraticCurveTo(30,-20,15,-10);
    ctx.closePath();
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  let last = 0;
  function tick(ts) {
    const t = ts / 1000;
    ctx.clearRect(0,0,W,H);

    dragons.forEach(d => {
      d.x += d.speed;
      if (d.x > W + 300) d.x = -300;

      const py = H * d.y + Math.sin(t*0.7 + d.phase)*22;
      ctx.save();
      ctx.globalAlpha = d.opacity;
      ctx.translate(d.x, py);
      if (d.dir === -1) ctx.scale(-1,1);
      drawDragon(ctx, t, d.scale, d.color, d.phase);
      ctx.restore();
    });

    requestAnimationFrame(tick);
  }

  resize();
  tick(0);
  window.addEventListener('resize', resize);
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

/* ---- Houses ---- */
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

/* ---- Characters with CSS animations ---- */
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

  /* stagger blink animation delays */
  document.querySelectorAll('.eye').forEach((el, i) => {
    el.style.animationDelay = `${(i*1.3)%4}s`;
  });
}

/* ---- Dragons ---- */
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

/* ---- Map Markers ---- */
function renderMapMarkers() {
  const container = document.getElementById('mapMarkers');
  container.innerHTML = state.data.locations.map(loc => {
    const visible = state.currentFilter==='all'
      || loc.type===state.currentFilter
      || (state.currentFilter==='Events' && loc.category==='event')
      || (state.currentFilter==='Coronations' && loc.category==='coronation');
    return `<button class="map-marker ${loc.id===state.currentLocation?'active':''}"
      data-location="${loc.id}"
      style="left:${loc.x}%;top:${loc.y}%;"
      title="${loc.name}"
      ${visible?'':'hidden'}></button>`;
  }).join('');

  container.querySelectorAll('.map-marker').forEach(m =>
    m.addEventListener('click', () => setActiveLocation(m.dataset.location))
  );
}

/* ====================================================================
   STATE SETTERS
   ==================================================================== */
function setActiveEra(idx) {
  state.currentEra = idx;
  const era = state.data.timeline[idx];
  document.getElementById('timelineSlider').value = idx;

  /* animate the panel */
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

  /* update map markers for time-gated locations */
  renderMapMarkers();
}

function setActiveLocation(id) {
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

  renderMapMarkers();

  /* play location-specific sound theme */
  playLocationSound(loc);
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

/* Pentatonic melodic sequences per section */
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

/* Location mood overrides */
const LOCATION_THEMES = {
  'winterfell':    THEMES.battles,
  "king's-landing": THEMES.home,
  'dragonstone':   THEMES.dragons,
  'the-wall':      THEMES.battles,
};

function playNote(freq, when, dur=0.45, wave='sine', vol=0.022) {
  if (!state.music || !state.audioEnabled) return;
  const osc  = state.music.createOscillator();
  const gn   = state.music.createGain();
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
  let beat = 0;
  const interval = 60/bpm;
  state.themeStarted = true;
  const loop = () => {
    const now = state.music.currentTime;
    notes.forEach((freq, i) => {
      playNote(freq, now + i*interval, interval*0.85);
      /* quiet harmony a fifth below */
      playNote(freq*0.5, now + i*interval, interval*0.85, 'triangle', 0.008);
    });
    const totalDur = notes.length * interval;
    state.themeTimer = setTimeout(loop, (totalDur)*1000);
  };
  loop();
}

function playEraSound(eraId) {
  const eraMap = {
    'age-of-heroes':      THEMES.castles,
    'the-long-night':     THEMES.battles,
    'aegons-conquest':    THEMES.dragons,
    'dance-of-the-dragons': THEMES.dragons,
    'blackfyre-rebellions': THEMES.battles,
    'roberts-rebellion':  THEMES.battles,
    'war-of-the-five-kings': THEMES.houses,
    'house-of-the-dragon':  THEMES.dragons,
    'game-of-thrones':    THEMES.home,
  };
  playSequence(eraMap[eraId] || THEMES.home, 66);
}

function playLocationSound(loc) {
  const notes = LOCATION_THEMES[loc.id] || THEMES.map;
  playSequence(notes, 80);
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
    playTheme('home');
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

function bindEvents() {
  /* filter chips */
  document.getElementById('filterList').addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    state.currentFilter = chip.dataset.filter;
    renderFilters();
    renderMapMarkers();
  });

  /* zoom controls */
  document.querySelectorAll('[data-zoom]').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.zoom;
      if (a==='in')  state.zoom = Math.min(2.2, state.zoom+0.2);
      if (a==='out') state.zoom = Math.max(0.6, state.zoom-0.2);
      if (a==='reset') state.zoom = 1;
      const img = document.querySelector('.map-image');
      if (img) img.style.transform = `scale(${state.zoom})`;
    });
  });

  /* mobile nav */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      menu?.classList.remove('open');
      setSectionTheme(a.getAttribute('href').slice(1));
    });
  });

  /* search */
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

  /* audio toggle */
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

  /* active nav on scroll */
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
