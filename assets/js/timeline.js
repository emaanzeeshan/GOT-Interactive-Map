/* =====================================================================
   timeline.js — Timeline page redesign
   Handles medieval timeline navigation, era content rendering, and animations
   ===================================================================== */

(function () {
  'use strict';

  // Timeline state
  const timelineState = {
    currentEra: 0,
    timeline: []
  };

  // Era icons mapping
  const eraIcons = {
    'age-of-heroes': '⚔',
    'aegons-conquest': '🏰',
    'roberts-rebellion': '👑',
    'war-of-the-five-kings': '⚔',
    'game-of-thrones': '❄'
  };

  /**
   * Initialize timeline page
   */
  function initTimelinePage() {
    // Add timeline page class to body
    document.body.classList.add('timeline-page');
    
    // Create dust particles
    createDustParticles();
    
    // Load timeline data
    if (typeof window.mapData !== 'undefined' && window.mapData.timeline) {
      timelineState.timeline = window.mapData.timeline;
      renderTimelineNavigation();
      renderEraContent(timelineState.currentEra);
    }
  }

  /**
   * Create dust particles effect
   */
  function createDustParticles() {
    const dustContainer = document.createElement('div');
    dustContainer.className = 'dust-particles';
    document.body.appendChild(dustContainer);

    // Create 20 dust particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      dustContainer.appendChild(particle);
    }
  }

  /**
   * Render timeline navigation
   */
  function renderTimelineNavigation() {
    const navContainer = document.getElementById('timelineNavigation');
    if (!navContainer) return;

    const navigationHTML = timelineState.timeline.map((era, index) => `
      <div class="timeline-era-checkpoint ${index === timelineState.currentEra ? 'active' : ''}" 
           data-era-index="${index}">
        <div class="timeline-era-icon">${eraIcons[era.id] || '📜'}</div>
        <div class="timeline-era-label">${era.title}</div>
      </div>
    `).join('');

    navContainer.innerHTML = navigationHTML;

    // Add click handlers
    navContainer.querySelectorAll('.timeline-era-checkpoint').forEach(checkpoint => {
      checkpoint.addEventListener('click', () => {
        const eraIndex = parseInt(checkpoint.dataset.eraIndex);
        switchToEra(eraIndex);
      });
    });
  }

  /**
   * Switch to a different era with animation
   */
  function switchToEra(eraIndex) {
    if (eraIndex === timelineState.currentEra) return;
    
    timelineState.currentEra = eraIndex;
    
    // Update navigation active state
    document.querySelectorAll('.timeline-era-checkpoint').forEach((checkpoint, index) => {
      checkpoint.classList.toggle('active', index === eraIndex);
    });

    // Animate era content transition
    const eraContainer = document.getElementById('eraContainer');
    if (eraContainer) {
      eraContainer.style.opacity = '0';
      eraContainer.style.transform = 'translateY(20px)';
      eraContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      
      setTimeout(() => {
        renderEraContent(eraIndex);
        eraContainer.style.opacity = '1';
        eraContainer.style.transform = 'translateY(0)';
      }, 400);
    }
  }

  /**
   * Render era content
   */
  function renderEraContent(eraIndex) {
    const era = timelineState.timeline[eraIndex];
    const eraContainer = document.getElementById('eraContainer');
    if (!era || !eraContainer) return;

    // Use gradient placeholder if no image
    const eraImage = era.image || '';
    const hasImage = eraImage && eraImage.length > 0;

    const eraHTML = `
      <div class="era-content">
        <div class="era-image-wrapper ${hasImage ? '' : 'era-image-placeholder'}">
          ${hasImage ? `
            <img src="${eraImage}" 
                 alt="${era.title}" 
                 class="era-image"
                 loading="lazy"
                 onerror="this.parentElement.classList.add('era-image-placeholder'); this.style.display='none';">
          ` : ''}
          <div class="era-image-overlay"></div>
        </div>
        <div class="era-details">
          <div class="era-header">
            <span class="era-years">${era.years}</span>
            <h2 class="era-title">${era.title}</h2>
            <p class="era-description">${era.description}</p>
          </div>
          
          ${era.politicalShift ? `
            <div>
              <h3 class="era-section-title">Political Shift</h3>
              <p class="era-section-content">${era.politicalShift}</p>
            </div>
          ` : ''}
          
          ${era.events && era.events.length ? `
            <div>
              <h3 class="era-section-title">Key Events</h3>
              <div class="era-events-grid">
                ${era.events.map(event => `
                  <div class="event-card" onclick="toggleEventCard(this)">
                    <h4 class="event-card-title">${event}</h4>
                    <p class="event-card-summary">A pivotal moment in the history of Westeros.</p>
                    <div class="event-card-details">
                      <p>This event marked a significant turning point that shaped the course of Westerosi history.</p>
                      <p>Its consequences were felt across the realm for generations to come.</p>
                    </div>
                    <span class="event-card-read-more">Read More →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${era.houses && era.houses.length ? `
            <div>
              <h3 class="era-section-title">Important Houses</h3>
              <p class="era-section-content">
                ${era.houses.map(h => h.name).join(', ')}
              </p>
            </div>
          ` : ''}
          
          <div class="era-actions">
            ${era.castles && era.castles.length ? `
              <a href="castles.html" class="era-action-btn">
                🏰 View Related Castles
              </a>
            ` : ''}
            ${era.battles && era.battles.length ? `
              <a href="battles.html" class="era-action-btn">
                ⚔️ View Battles
              </a>
            ` : ''}
            ${era.characters && era.characters.length ? `
              <a href="characters.html" class="era-action-btn">
                👤 View Characters
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    eraContainer.innerHTML = eraHTML;
  }

  /**
   * Toggle event card expansion
   */
  window.toggleEventCard = function(card) {
    card.classList.toggle('expanded');
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelinePage);
  } else {
    initTimelinePage();
  }
})();
