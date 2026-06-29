const state = {
  data: null,
  currentEra: 0,
  currentLocation: null,
  currentFilter: 'all',
  zoom: 1,
  panX: 0,
  panY: 0,
  music: null,
  gain: null,
  audioEnabled: true,
  themeTimer: null,
  themeStarted: false,
};

const filterOptions = ['all', 'Battles', 'Houses', 'Dragons', 'Castles', 'Characters', 'Coronations', 'Events'];

async function init() {
  const response = await fetch('assets/data/content.json');
  state.data = await response.json();
  renderFilters();
  renderTimeline();
  renderSections();
  bindEvents();
  setActiveEra(0);
  setActiveLocation(state.data.locations[0].id);
  setSectionTheme('home');
}

function renderFilters() {
  const container = document.getElementById('filterList');
  container.innerHTML = filterOptions.map((filter) => {
    const label = filter === 'all' ? 'All' : filter;
    return `<button class="filter-chip ${filter === state.currentFilter ? 'active' : ''}" data-filter="${filter}">${label}</button>`;
  }).join('');
}

function renderTimeline() {
  const labels = document.getElementById('timelineLabels');
  labels.innerHTML = state.data.timeline.map((era, index) => `<span>${era.title}</span>`).join('');

  const slider = document.getElementById('timelineSlider');
  slider.max = state.data.timeline.length - 1;
  slider.addEventListener('input', (event) => {
    setActiveEra(Number(event.target.value));
  });
}

function renderSections() {
  renderHouses();
  renderCharacters();
  renderDragons();
  renderBattles();
  renderCastles();
  renderSearch();
  renderMapMarkers();
}

function renderHouses() {
  const grid = document.getElementById('housesGrid');
  grid.innerHTML = state.data.houses.map((house) => {
    const ruler = house.rulers[state.data.timeline[state.currentEra].id] || house.currentRuler;
    return `
      <article class="card">
        <div class="sigil">${house.sigil}</div>
        <span class="badge">${house.words}</span>
        <h3>${house.name}</h3>
        <p>${house.territory}</p>
        <ul class="list">
          <li><strong>Ruler:</strong> ${ruler}</li>
          <li><strong>Allies:</strong> ${house.allies.join(', ')}</li>
          <li><strong>Enemies:</strong> ${house.enemies.join(', ')}</li>
        </ul>
      </article>
    `;
  }).join('');
}

function renderCharacters() {
  const grid = document.getElementById('charactersGrid');
  grid.innerHTML = state.data.characters.map((character) => {
    const status = character.statusByEra[state.data.timeline[state.currentEra].id] || character.status;
    return `
      <article class="card">
        <div class="avatar">${character.initials}</div>
        <span class="badge">${character.house}</span>
        <h3>${character.name}</h3>
        <p>${character.bio}</p>
        <ul class="list">
          <li><strong>Status:</strong> ${status}</li>
          <li><strong>Weapon:</strong> ${character.weapon}</li>
          <li><strong>Path:</strong> ${character.path}</li>
        </ul>
      </article>
    `;
  }).join('');
}

function renderDragons() {
  const grid = document.getElementById('dragonsGrid');
  grid.innerHTML = state.data.dragons.map((dragon) => `
    <article class="card">
      <div class="dragon"></div>
      <span class="badge">${dragon.breed}</span>
      <h3>${dragon.name}</h3>
      <p>${dragon.description}</p>
      <ul class="list">
        <li><strong>Rider:</strong> ${dragon.rider}</li>
        <li><strong>Size:</strong> ${dragon.size}</li>
        <li><strong>Death:</strong> ${dragon.death}</li>
      </ul>
    </article>
  `).join('');
}

function renderBattles() {
  const grid = document.getElementById('battlesGrid');
  grid.innerHTML = state.data.battles.map((battle) => `
    <article class="card">
      <span class="badge">${battle.location}</span>
      <h3>${battle.name}</h3>
      <p>${battle.summary}</p>
      <ul class="list">
        <li><strong>Commanders:</strong> ${battle.commanders.join(', ')}</li>
        <li><strong>Outcome:</strong> ${battle.outcome}</li>
        <li><strong>Era:</strong> ${battle.era}</li>
      </ul>
    </article>
  `).join('');
}

function renderCastles() {
  const grid = document.getElementById('castlesGrid');
  grid.innerHTML = state.data.castles.map((castle) => `
    <article class="card">
      <span class="badge">${castle.region}</span>
      <h3>${castle.name}</h3>
      <p>${castle.description}</p>
      <ul class="list">
        <li><strong>House:</strong> ${castle.house}</li>
        <li><strong>Notable:</strong> ${castle.notable}</li>
        <li><strong>Feature:</strong> ${castle.feature}</li>
      </ul>
    </article>
  `).join('');
}

function renderSearch() {
  const results = document.getElementById('searchResults');
  results.innerHTML = '';
}

function renderMapMarkers() {
  const markersContainer = document.getElementById('mapMarkers');
  markersContainer.innerHTML = state.data.locations.map((location) => {
    const visible = state.currentFilter === 'all' || location.type === state.currentFilter || (state.currentFilter === 'Events' && location.category === 'event') || (state.currentFilter === 'Coronations' && location.category === 'coronation');
    return `<button class="map-marker ${location.id === state.currentLocation ? 'active' : ''}" data-location="${location.id}" style="left:${location.x}%; top:${location.y}%;" title="${location.name}" ${visible ? '' : 'hidden'}></button>`;
  }).join('');

  markersContainer.querySelectorAll('.map-marker').forEach((marker) => {
    marker.addEventListener('click', () => {
      setActiveLocation(marker.dataset.location);
    });
  });
}

function setActiveEra(index) {
  state.currentEra = index;
  const era = state.data.timeline[index];
  document.getElementById('timelineSlider').value = index;
  document.getElementById('timelinePanel').innerHTML = `
    <h3>${era.title}</h3>
    <p>${era.description}</p>
    <ul class="list">
      <li><strong>Years:</strong> ${era.years}</li>
      <li><strong>Events:</strong> ${era.events.join(', ')}</li>
      <li><strong>Political Shift:</strong> ${era.politicalShift}</li>
    </ul>
  `;
  renderHouses();
  renderCharacters();
  renderSearch();
}

function setActiveLocation(id) {
  state.currentLocation = id;
  const location = state.data.locations.find((entry) => entry.id === id);
  const panel = document.getElementById('mapPanel');
  panel.innerHTML = `
    <h3>${location.name}</h3>
    <p>${location.description}</p>
    <ul class="list">
      <li><strong>Ruler:</strong> ${location.ruler}</li>
      <li><strong>Events:</strong> ${location.events.join(', ')}</li>
      <li><strong>Characters:</strong> ${location.characters.join(', ')}</li>
    </ul>
  `;
  renderMapMarkers();
}

function bindEvents() {
  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.currentFilter = chip.dataset.filter;
      renderFilters();
      renderMapMarkers();
    });
  });

  document.querySelectorAll('[data-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.zoom;
      if (action === 'in') state.zoom = Math.min(1.8, state.zoom + 0.2);
      if (action === 'out') state.zoom = Math.max(0.8, state.zoom - 0.2);
      if (action === 'reset') {
        state.zoom = 1;
        state.panX = 0;
        state.panY = 0;
      }
      const image = document.querySelector('.map-image');
      image.style.transform = `scale(${state.zoom}) translate(${state.panX}px, ${state.panY}px)`;
    });
  });

  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('open');
      setSectionTheme(link.getAttribute('href').slice(1));
    });
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      document.getElementById('searchResults').innerHTML = '';
      return;
    }
    const results = [
      ...state.data.characters.filter((item) => item.name.toLowerCase().includes(query)),
      ...state.data.houses.filter((item) => item.name.toLowerCase().includes(query)),
      ...state.data.dragons.filter((item) => item.name.toLowerCase().includes(query)),
      ...state.data.battles.filter((item) => item.name.toLowerCase().includes(query)),
      ...state.data.castles.filter((item) => item.name.toLowerCase().includes(query)),
      ...state.data.locations.filter((item) => item.name.toLowerCase().includes(query)),
    ];

    document.getElementById('searchResults').innerHTML = results.slice(0, 10).map((item) => `
      <div class="search-result" data-target="${item.type || 'search'}">
        <strong>${item.name}</strong>
        <p>${item.description || item.summary || item.territory || item.bio || ''}</p>
      </div>
    `).join('');

    document.querySelectorAll('.search-result').forEach((result) => {
      result.addEventListener('click', () => {
        document.getElementById('searchInput').value = result.querySelector('strong').textContent;
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
      });
    });
  });

  document.getElementById('startJourney').addEventListener('click', () => {
    document.getElementById('loadingScreen').classList.add('hidden');
    playTheme('home');
  });

  document.getElementById('audioToggle').addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    const button = document.getElementById('audioToggle');
    button.textContent = state.audioEnabled ? '🔊' : '🔈';
    if (state.audioEnabled) {
      if (!state.themeStarted) playTheme('home');
      if (state.gain) state.gain.gain.value = 0.035;
    } else if (state.gain) {
      state.gain.gain.value = 0;
    }
  });

  window.addEventListener('scroll', () => {
    const sections = Array.from(document.querySelectorAll('section'));
    const offset = window.scrollY + 120;
    sections.forEach((section) => {
      if (offset >= section.offsetTop && offset < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-links a').forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
        });
      }
    });
  });
}

function setSectionTheme(sectionId) {
  const themeMap = {
    home: 'home',
    map: 'map',
    timeline: 'timeline',
    houses: 'houses',
    characters: 'characters',
    dragons: 'dragons',
    battles: 'battles',
    castles: 'castles',
    search: 'search',
  };
  playTheme(themeMap[sectionId] || 'home');
}

function playTheme(sectionId) {
  if (!state.audioEnabled) return;

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!state.music) {
    state.music = new AudioContextCtor();
    state.gain = state.music.createGain();
    state.gain.gain.value = 0.035;
    state.gain.connect(state.music.destination);
  }

  if (state.themeTimer) {
    clearInterval(state.themeTimer);
  }

  const patterns = {
    home: [523.25, 659.25, 783.99, 659.25, 523.25, 440],
    map: [392, 440, 523.25, 587.33],
    timeline: [329.63, 392, 440, 493.88],
    houses: [261.63, 329.63, 392, 440],
    characters: [349.23, 392, 440, 493.88],
    dragons: [493.88, 587.33, 659.25, 783.99],
    battles: [261.63, 329.63, 392, 261.63],
    castles: [293.66, 349.23, 392, 440],
    search: [392, 440, 493.88, 523.25],
  };

  const notes = patterns[sectionId] || patterns.home;
  let index = 0;
  state.themeStarted = true;
  state.themeTimer = setInterval(() => {
    const freq = notes[index % notes.length];
    const osc = state.music.createOscillator();
    const gainNode = state.music.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gainNode.gain.value = 0.0001;
    gainNode.gain.exponentialRampToValueAtTime(0.02, state.music.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, state.music.currentTime + 0.4);
    osc.connect(gainNode).connect(state.gain);
    osc.start();
    osc.stop(state.music.currentTime + 0.42);
    index += 1;
  }, 600);
}

window.addEventListener('DOMContentLoaded', init);
