/* =====================================================================
   journeyMode.js — Character Journeys mode for the interactive map
   Handles character selection, animated travel paths, timeline controls,
   and auto-play functionality
   ===================================================================== */

const journeyState = {
  isActive: false,
  selectedCharacter: null,
  currentStopIndex: 0,
  isPlaying: false,
  playInterval: null,
  pathElement: null,
  completedPathElement: null,
  upcomingPathElement: null,
  stopMarkers: [],
  characterMarker: null,
  pathCache: new Map(),
  animationFrame: null,
  pathProgress: 0,
  isDrawingPath: false,
  isCharacterMoving: false,
  characterAnimationFrame: null,
};

// Character icon mapping for themed markers
const characterIcons = {
  jonSnow: '🐺',
  daenerys: '🐉',
  aryaStark: '⚔️',
  tyrion: '🦁',
  jaime: '🦁',
  bran: '🦅',
  theHound: '🐕',
  sansa: '🦌',
};

// Initialize journey mode
function initJourneyMode() {
  const filterList = document.getElementById('filterList');
  if (!filterList) return;

  // Listen for filter changes
  filterList.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    const filterId = chip.dataset.filter;
    if (filterId === 'journeys') {
      activateJourneyMode();
    } else {
      deactivateJourneyMode();
    }
  });
}

function activateJourneyMode() {
  if (journeyState.isActive) return;
  journeyState.isActive = true;

  // Hide regular markers
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(m => m.style.display = 'none');

  // Show character selection panel
  showCharacterSelectionPanel();
}

function deactivateJourneyMode() {
  if (!journeyState.isActive) return;
  journeyState.isActive = false;

  // Stop auto-play if running
  stopAutoPlay();

  // Clear journey elements
  clearJourneyElements();

  // Show regular markers
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(m => m.style.display = '');

  // Hide character selection panel
  hideCharacterSelectionPanel();
}

function showCharacterSelectionPanel() {
  const panel = document.getElementById('mapPanel');
  if (!panel) return;

  const characters = Object.values(characterJourneys);
  
  panel.innerHTML = `
    <div class="journey-selection">
      <div class="journey-selection-header">
        <h3>🛤 Character Journeys</h3>
        <p>Select a character to follow their journey across Westeros and Essos</p>
      </div>
      <div class="journey-character-grid">
        ${characters.map(char => `
          <button class="journey-character-card" data-character="${char.id}">
            <span class="journey-character-icon">${char.icon}</span>
            <span class="journey-character-name">${char.name}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Add click handlers
  panel.querySelectorAll('.journey-character-card').forEach(card => {
    card.addEventListener('click', () => {
      const charId = card.dataset.character;
      selectCharacter(charId);
    });
  });
}

function hideCharacterSelectionPanel() {
  // Panel will be updated by other functions
}

function selectCharacter(charId) {
  const character = characterJourneys[charId];
  if (!character) return;

  journeyState.selectedCharacter = character;
  journeyState.currentStopIndex = 0;

  // Clear previous journey elements
  clearJourneyElements();

  // Draw the journey path
  drawJourneyPath(character);

  // Create stop markers
  createStopMarkers(character);

  // Show journey controls panel
  showJourneyControlsPanel(character);

  // Navigate to first stop
  navigateToStop(0);
}

function drawJourneyPath(character) {
  const mapStage = document.getElementById('mapStage');
  if (!mapStage) return;

  // Create SVG overlay
  let svg = document.getElementById('journey-svg');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'journey-svg';
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '10';
    mapStage.appendChild(svg);
  }

  // Clear existing paths
  svg.innerHTML = '';

  // Build curved path from stops using Bezier curves
  const pathData = buildCurvedPathData(character.stops);
  
  // Calculate path length for animation
  const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  tempPath.setAttribute('d', pathData);
  const pathLength = tempPath.getTotalLength();
  
  // Create completed path (bright, fully opaque)
  const completedPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  completedPath.setAttribute('d', pathData);
  completedPath.setAttribute('fill', 'none');
  completedPath.setAttribute('stroke', character.color);
  completedPath.setAttribute('stroke-width', '4');
  completedPath.setAttribute('stroke-linecap', 'round');
  completedPath.setAttribute('stroke-linejoin', 'round');
  completedPath.setAttribute('stroke-opacity', '1');
  completedPath.setAttribute('stroke-dasharray', '8, 6');
  completedPath.setAttribute('stroke-dashoffset', pathLength);
  completedPath.style.filter = `drop-shadow(0 0 8px ${character.color})`;
  completedPath.dataset.pathLength = pathLength;
  completedPath.id = 'journey-completed-path';
  
  svg.appendChild(completedPath);
  journeyState.completedPathElement = completedPath;

  // Create upcoming path (faded, semi-transparent)
  const upcomingPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  upcomingPath.setAttribute('d', pathData);
  upcomingPath.setAttribute('fill', 'none');
  upcomingPath.setAttribute('stroke', character.color);
  upcomingPath.setAttribute('stroke-width', '3');
  upcomingPath.setAttribute('stroke-linecap', 'round');
  upcomingPath.setAttribute('stroke-linejoin', 'round');
  upcomingPath.setAttribute('stroke-opacity', '0.3');
  upcomingPath.setAttribute('stroke-dasharray', '8, 6');
  upcomingPath.setAttribute('stroke-dashoffset', pathLength);
  upcomingPath.style.filter = `drop-shadow(0 0 4px ${character.color})`;
  upcomingPath.dataset.pathLength = pathLength;
  upcomingPath.id = 'journey-upcoming-path';
  
  svg.appendChild(upcomingPath);
  journeyState.upcomingPathElement = upcomingPath;
  
  journeyState.pathElement = completedPath;
  journeyState.pathProgress = 0;
  journeyState.isDrawingPath = true;

  // Animate completed path drawing progressively
  animatePathDrawing(completedPath, pathLength, character.color);

  // Create character marker
  createCharacterMarker(svg, character);
}

function buildCurvedPathData(stops) {
  const mapStage = document.getElementById('mapStage');
  if (!mapStage) return '';

  const mapImage = document.querySelector('.map-image');
  if (!mapImage) return '';

  const imgRect = mapImage.getBoundingClientRect();
  
  // Check cache
  const cacheKey = stops.map(s => `${s.x},${s.y}`).join('|');
  if (journeyState.pathCache.has(cacheKey)) {
    return journeyState.pathCache.get(cacheKey);
  }

  // Convert stops to coordinates
  const points = stops.map(stop => ({
    x: (stop.x || 50) / 100 * imgRect.width,
    y: (stop.y || 50) / 100 * imgRect.height
  }));

  // Build smooth curved path using Catmull-Rom spline interpolation
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[Math.min(points.length - 1, i + 1)];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  // Cache the result
  journeyState.pathCache.set(cacheKey, path);
  
  return path;
}

function animatePathDrawing(path, pathLength, color) {
  const duration = 3000; // 3 seconds for full path
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic for smooth deceleration
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    
    const dashOffset = pathLength * (1 - easedProgress);
    path.setAttribute('stroke-dashoffset', dashOffset);
    
    // Move character marker along path
    if (journeyState.characterMarker) {
      moveCharacterMarker(path, easedProgress);
    }
    
    if (progress < 1) {
      journeyState.animationFrame = requestAnimationFrame(animate);
    } else {
      journeyState.isDrawingPath = false;
      // Keep character marker at end of path (first stop)
      if (journeyState.characterMarker) {
        moveCharacterMarker(path, 0);
        startCharacterPulse();
      }
    }
  }
  
  journeyState.animationFrame = requestAnimationFrame(animate);
}

function createCharacterMarker(svg, character) {
  const icon = characterIcons[character.id] || '📍';
  
  const marker = document.createElement('div');
  marker.className = 'journey-character-marker';
  marker.innerHTML = `<span class="journey-character-icon-inner">${icon}</span>`;
  marker.style.position = 'absolute';
  marker.style.zIndex = '20';
  marker.style.pointerEvents = 'none';
  marker.style.opacity = '0';
  marker.style.transform = 'translate(-50%, -50%)';
  marker.style.transition = 'opacity 0.3s ease';
  
  // Add to mapStage instead of SVG for better positioning
  const mapStage = document.getElementById('mapStage');
  if (mapStage) {
    mapStage.appendChild(marker);
  }
  
  journeyState.characterMarker = marker;
  
  // Fade in marker
  setTimeout(() => {
    marker.style.opacity = '1';
  }, 100);
}

function moveCharacterMarker(path, progress) {
  const pathLength = path.dataset.pathLength;
  const point = path.getPointAtLength(progress * pathLength);
  
  const mapStage = document.getElementById('mapStage');
  if (!mapStage || !journeyState.characterMarker) return;
  
  // Convert SVG coordinates to percentage for positioning
  const mapImage = document.querySelector('.map-image');
  if (!mapImage) return;
  
  const imgRect = mapImage.getBoundingClientRect();
  const xPercent = (point.x / imgRect.width) * 100;
  const yPercent = (point.y / imgRect.height) * 100;
  
  journeyState.characterMarker.style.left = `${xPercent}%`;
  journeyState.characterMarker.style.top = `${yPercent}%`;
}

function startCharacterPulse() {
  if (!journeyState.characterMarker) return;
  
  journeyState.characterMarker.style.animation = 'journey-marker-pulse 2s ease-in-out infinite';
}

function stopCharacterPulse() {
  if (!journeyState.characterMarker) return;
  
  journeyState.characterMarker.style.animation = '';
}

function createStopMarkers(character) {
  const mapMarkers = document.getElementById('mapMarkers');
  if (!mapMarkers) return;

  character.stops.forEach((stop, index) => {
    const marker = document.createElement('button');
    marker.className = 'journey-stop-marker';
    marker.dataset.stopIndex = index;
    marker.style.left = `${stop.x || 50}%`;
    marker.style.top = `${stop.y || 50}%`;
    marker.innerHTML = `<span class="journey-stop-number">${index + 1}</span>`;
    marker.title = `Stop ${index + 1}: ${stop.title}`;
    
    marker.addEventListener('click', () => {
      navigateToStop(index);
    });

    mapMarkers.appendChild(marker);
    journeyState.stopMarkers.push(marker);
  });
}

function showJourneyControlsPanel(character) {
  const panel = document.getElementById('mapPanel');
  if (!panel) return;

  const currentStop = character.stops[journeyState.currentStopIndex];
  const progress = ((journeyState.currentStopIndex + 1) / character.stops.length * 100).toFixed(0);
  const prevStop = journeyState.currentStopIndex > 0 ? character.stops[journeyState.currentStopIndex - 1] : null;
  const nextStop = journeyState.currentStopIndex < character.stops.length - 1 ? character.stops[journeyState.currentStopIndex + 1] : null;

  panel.innerHTML = `
    <div class="journey-controls">
      <div class="journey-header">
        <div class="journey-character-info">
          <span class="journey-character-icon">${character.icon}</span>
          <div>
            <h3>${character.name}'s Journey</h3>
            <span class="journey-progress">Stop ${journeyState.currentStopIndex + 1} of ${character.stops.length}</span>
          </div>
        </div>
        <div class="journey-progress-bar">
          <div class="journey-progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <div class="journey-story-card" id="journeyStoryCard">
        <div class="journey-story-header">
          <div class="journey-story-number">${journeyState.currentStopIndex + 1}</div>
          <div class="journey-story-location">
            <h4>${currentStop.title}</h4>
            <span class="journey-story-region">${currentStop.description}</span>
          </div>
        </div>
        <div class="journey-story-meta">
          <span class="journey-story-season">${currentStop.season}</span>
          <span class="journey-story-episode">${currentStop.episode}</span>
        </div>
        ${currentStop.event ? `
          <div class="journey-story-event">
            <span class="journey-event-icon">⚔</span>
            <div class="journey-event-content">
              <span class="journey-event-title">Journey Event</span>
              <span class="journey-event-description">${currentStop.event}</span>
            </div>
          </div>
        ` : ''}
        <div class="journey-story-nav">
          ${prevStop ? `<span class="journey-nav-prev">← ${prevStop.title}</span>` : '<span class="journey-nav-empty"></span>'}
          ${nextStop ? `<span class="journey-nav-next">${nextStop.title} →</span>` : '<span class="journey-nav-empty"></span>'}
        </div>
      </div>

      <div class="journey-timeline-container">
        <div class="journey-timeline-parchment">
          <div class="journey-timeline-track">
            <div class="journey-timeline-progress" style="width: ${progress}%"></div>
          </div>
          <div class="journey-timeline-stops">
            ${character.stops.map((stop, index) => `
              <button class="journey-timeline-stop ${index === journeyState.currentStopIndex ? 'active' : ''} ${index < journeyState.currentStopIndex ? 'completed' : ''}" 
                      data-stop-index="${index}" 
                      title="${stop.title} (${stop.season} ${stop.episode})">
                <span class="journey-timeline-stop-number">${index + 1}</span>
              </button>
            `).join('')}
          </div>
          <div class="journey-timeline-thumb" style="left: ${progress}%">
            <div class="journey-timeline-thumb-inner"></div>
          </div>
        </div>
      </div>

      <div class="journey-timeline-controls">
        <button class="journey-btn journey-btn-play" id="journeyPlayBtn">
          ${journeyState.isPlaying ? '⏸ Pause Journey' : '▶ Play Journey'}
        </button>
        <button class="journey-btn journey-btn-back" id="journeyBackBtn">
          ← Back to Characters
        </button>
      </div>
    </div>
  `;

  // Add event listeners
  panel.querySelector('#journeyPlayBtn').addEventListener('click', toggleAutoPlay);
  panel.querySelector('#journeyBackBtn').addEventListener('click', showCharacterSelectionPanel);
  
  // Add timeline stop click handlers
  panel.querySelectorAll('.journey-timeline-stop').forEach(stop => {
    stop.addEventListener('click', () => {
      const stopIndex = parseInt(stop.dataset.stopIndex);
      navigateToStop(stopIndex);
    });
  });

  // Initialize timeline drag functionality
  initTimelineDrag(character);

  // Add keyboard navigation
  initTimelineKeyboard(character);
}

function initTimelineDrag(character) {
  const timelineParchment = document.querySelector('.journey-timeline-parchment');
  if (!timelineParchment) return;

  const thumb = document.querySelector('.journey-timeline-thumb');
  if (!thumb) return;

  let isDragging = false;

  const handleDrag = (e) => {
    if (!isDragging) return;

    const rect = timelineParchment.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Calculate nearest stop
    const stopIndex = Math.round((percentage / 100) * (character.stops.length - 1));
    
    if (stopIndex !== journeyState.currentStopIndex) {
      navigateToStop(stopIndex);
    }
  };

  const startDrag = (e) => {
    isDragging = true;
    timelineParchment.style.cursor = 'grabbing';
    thumb.style.cursor = 'grabbing';
  };

  const endDrag = () => {
    isDragging = false;
    timelineParchment.style.cursor = 'grab';
    thumb.style.cursor = 'grab';
  };

  // Mouse events
  timelineParchment.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', endDrag);

  // Touch events
  timelineParchment.addEventListener('touchstart', startDrag);
  document.addEventListener('touchmove', handleDrag);
  document.addEventListener('touchend', endDrag);

  // Click on timeline track
  const track = document.querySelector('.journey-timeline-track');
  if (track) {
    track.addEventListener('click', (e) => {
      const rect = timelineParchment.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const stopIndex = Math.round((percentage / 100) * (character.stops.length - 1));
      navigateToStop(stopIndex);
    });
  }
}

function initTimelineKeyboard(character) {
  document.addEventListener('keydown', (e) => {
    if (!journeyState.isActive) return;

    if (e.key === 'ArrowLeft' && journeyState.currentStopIndex > 0) {
      e.preventDefault();
      navigateToStop(journeyState.currentStopIndex - 1);
    } else if (e.key === 'ArrowRight' && journeyState.currentStopIndex < character.stops.length - 1) {
      e.preventDefault();
      navigateToStop(journeyState.currentStopIndex + 1);
    }
  });
}

function navigateToStop(index) {
  if (!journeyState.selectedCharacter) return;
  
  const character = journeyState.selectedCharacter;
  if (index < 0 || index >= character.stops.length) return;

  const previousIndex = journeyState.currentStopIndex;
  journeyState.currentStopIndex = index;
  const stop = character.stops[index];

  // Update marker highlights
  journeyState.stopMarkers.forEach((marker, i) => {
    marker.classList.toggle('active', i === index);
  });

  // Update path visibility (completed vs upcoming)
  updatePathVisibility(character, index);

  // Check if destination is in viewport before panning
  if (!isLocationInViewport(stop.x || 50, stop.y || 50)) {
    panToLocation(stop.x || 50, stop.y || 50);
  }

  // Animate character marker to new stop
  if (previousIndex !== index) {
    animateCharacterToStop(character, previousIndex, index);
  }

  // Animate story card transition
  animateStoryCardTransition(() => {
    // Update controls panel after animation
    showJourneyControlsPanel(character);
  });
}

function animateStoryCardTransition(callback) {
  const storyCard = document.getElementById('journeyStoryCard');
  if (!storyCard) {
    callback();
    return;
  }

  storyCard.style.opacity = '0';
  storyCard.style.transform = 'translateY(10px)';
  storyCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  setTimeout(() => {
    callback();
    
    // Fade in new content
    setTimeout(() => {
      const newStoryCard = document.getElementById('journeyStoryCard');
      if (newStoryCard) {
        newStoryCard.style.opacity = '1';
        newStoryCard.style.transform = 'translateY(0)';
      }
    }, 50);
  }, 300);
}

function isLocationInViewport(xPercent, yPercent) {
  const mapStage = document.getElementById('mapStage');
  if (!mapStage) return false;

  const mapImage = document.querySelector('.map-image');
  if (!mapImage) return false;

  const stageRect = mapStage.getBoundingClientRect();
  const imgRect = mapImage.getBoundingClientRect();

  // Calculate location position in viewport
  const locX = (xPercent / 100) * imgRect.width;
  const locY = (yPercent / 100) * imgRect.height;

  // Add margin (50px) so location isn't on edge
  const margin = 50;
  
  return locX >= margin && locX <= stageRect.width - margin &&
         locY >= margin && locY <= stageRect.height - margin;
}

function updatePathVisibility(character, currentIndex) {
  if (!journeyState.completedPathElement || !journeyState.upcomingPathElement) return;

  const pathLength = parseFloat(journeyState.completedPathElement.dataset.pathLength);
  const totalStops = character.stops.length;
  
  // Calculate progress based on current stop
  const progress = currentIndex / (totalStops - 1);
  
  // Update completed path dashoffset to show only traveled portion
  const completedOffset = pathLength * (1 - progress);
  journeyState.completedPathElement.setAttribute('stroke-dashoffset', completedOffset);
  
  // Update upcoming path dashoffset to show only remaining portion
  const upcomingOffset = pathLength * (1 - progress);
  journeyState.upcomingPathElement.setAttribute('stroke-dashoffset', -pathLength * progress);
}

function animateCharacterToStop(character, fromIndex, toIndex) {
  if (!journeyState.characterMarker || fromIndex === toIndex) return;
  
  stopCharacterPulse();
  journeyState.isCharacterMoving = true;
  
  const fromStop = character.stops[fromIndex];
  const toStop = character.stops[toIndex];
  
  const duration = 1500; // 1.5 seconds to travel between stops
  const startTime = performance.now();
  
  const startX = fromStop.x || 50;
  const startY = fromStop.y || 50;
  const endX = toStop.x || 50;
  const endY = toStop.y || 50;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease in-out for smooth movement
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    // Interpolate position
    const currentX = startX + (endX - startX) * easedProgress;
    const currentY = startY + (endY - startY) * easedProgress;
    
    // Add bobbing effect while moving
    const bobOffset = Math.sin(elapsed * 0.01) * 3;
    
    journeyState.characterMarker.style.left = `${currentX}%`;
    journeyState.characterMarker.style.top = `${currentY - bobOffset * 0.1}%`;
    journeyState.characterMarker.style.transform = `translate(-50%, -50%) scale(${1 + Math.sin(elapsed * 0.008) * 0.1})`;
    
    if (progress < 1) {
      journeyState.characterAnimationFrame = requestAnimationFrame(animate);
    } else {
      journeyState.isCharacterMoving = false;
      journeyState.characterMarker.style.transform = 'translate(-50%, -50%) scale(1)';
      triggerArrivalAnimation(toIndex);
    }
  }
  
  journeyState.characterAnimationFrame = requestAnimationFrame(animate);
}

function triggerArrivalAnimation(stopIndex) {
  // Enlarge destination marker
  const marker = journeyState.stopMarkers[stopIndex];
  if (marker) {
    marker.style.animation = 'journey-arrival-pulse 0.5s ease-out';
    setTimeout(() => {
      marker.style.animation = '';
    }, 500);
  }
  
  // Start character pulse at destination
  startCharacterPulse();
}

function panToLocation(xPercent, yPercent) {
  const mapStage = document.getElementById('mapStage');
  if (!mapStage) return;

  const mapImage = document.querySelector('.map-image');
  if (!mapImage) return;

  const stageRect = mapStage.getBoundingClientRect();
  const imgRect = mapImage.getBoundingClientRect();

  // Calculate target position to center the location
  const targetX = (xPercent / 100) * imgRect.width;
  const targetY = (yPercent / 100) * imgRect.height;

  const centerX = stageRect.width / 2;
  const centerY = stageRect.height / 2;

  const newPanX = centerX - targetX;
  const newPanY = centerY - targetY;
  
  // Gentle camera adjustment without aggressive zoom
  const targetZoom = Math.min(state.zoom * 1.05, 2.0);

  // Use cinematic animation with easing
  if (typeof startAnimation === 'function') {
    startAnimation(newPanX, newPanY, targetZoom);
  } else {
    state.panX = newPanX;
    state.panY = newPanY;
    state.zoom = targetZoom;
    updateMapTransform();
  }
}

function toggleAutoPlay() {
  if (journeyState.isPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  if (!journeyState.selectedCharacter) return;
  
  journeyState.isPlaying = true;
  const character = journeyState.selectedCharacter;

  // Update play button
  const playBtn = document.getElementById('journeyPlayBtn');
  if (playBtn) playBtn.textContent = '⏸ Pause';

  // Navigate to next stop every 3 seconds
  journeyState.playInterval = setInterval(() => {
    if (journeyState.currentStopIndex < character.stops.length - 1) {
      navigateToStop(journeyState.currentStopIndex + 1);
    } else {
      stopAutoPlay();
    }
  }, 3000);
}

function stopAutoPlay() {
  journeyState.isPlaying = false;
  
  if (journeyState.playInterval) {
    clearInterval(journeyState.playInterval);
    journeyState.playInterval = null;
  }

  // Update play button
  const playBtn = document.getElementById('journeyPlayBtn');
  if (playBtn) playBtn.textContent = '▶ Play Journey';
}

function clearJourneyElements() {
  // Cancel any running animations
  if (journeyState.animationFrame) {
    cancelAnimationFrame(journeyState.animationFrame);
    journeyState.animationFrame = null;
  }
  
  if (journeyState.characterAnimationFrame) {
    cancelAnimationFrame(journeyState.characterAnimationFrame);
    journeyState.characterAnimationFrame = null;
  }
  
  // Remove SVG path
  const svg = document.getElementById('journey-svg');
  if (svg) svg.remove();

  // Remove character marker
  if (journeyState.characterMarker) {
    journeyState.characterMarker.remove();
    journeyState.characterMarker = null;
  }

  // Remove stop markers
  journeyState.stopMarkers.forEach(marker => marker.remove());
  journeyState.stopMarkers = [];

  journeyState.pathElement = null;
  journeyState.completedPathElement = null;
  journeyState.upcomingPathElement = null;
  journeyState.travelIndicator = null;
  journeyState.isDrawingPath = false;
  journeyState.isCharacterMoving = false;
  journeyState.pathProgress = 0;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initJourneyMode);
