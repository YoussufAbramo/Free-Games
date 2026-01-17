// State Management
let all_data = [];
let filtered_data = [];
let currentPage = 1;
let pageSize = 9;
let currentView = 'list-view';

// Persistence State
let favorites = JSON.parse(localStorage.getItem('freeGamesFavorites') || '[]');

// Filter State
const state = {
  search: '',
  platform: 'all',
  genre: 'all',
  favoritesOnly: false
};

// Fetch Data
function fetchData() {
  renderSkeletons();
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("GET", "https://free-to-play-games-database.p.rapidapi.com/api/games");
  xhr.setRequestHeader("X-RapidAPI-Key", "431e2e0512msh12ec0cf6343c1c8p1de776jsnb12502d1e36b");
  xhr.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      all_data = JSON.parse(this.responseText);
      filtered_data = [...all_data];
      populateGenres();
      renderApp();
    }
  });
  xhr.send(null);
}

// Initial Call
fetchData();

// UI Event Listeners
document.getElementById('listViewBtn').addEventListener('click', () => setView('list-view'));
document.getElementById('gridViewBtn').addEventListener('click', () => setView('grid-view'));
document.getElementById('pageSize').addEventListener('change', (e) => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  renderApp();
});

// Search & Filter Listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  state.search = e.target.value.toLowerCase();
  applyFilters();
});

document.getElementById('platformFilter').addEventListener('change', (e) => {
  state.platform = e.target.value;
  applyFilters();
});

document.getElementById('genreFilter').addEventListener('change', (e) => {
  state.genre = e.target.value;
  applyFilters();
});

document.getElementById('favoriteOnly').addEventListener('change', (e) => {
  state.favoritesOnly = e.target.checked;
  applyFilters();
});

// Modal Logic
const modal = document.getElementById("devModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementsByClassName("close-modal")[0];

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
}

function setView(view) {
  currentView = view;
  document.getElementById('listViewBtn').classList.toggle('active', view === 'list-view');
  document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid-view');
  renderApp();
}

function populateGenres() {
  const genres = [...new Set(all_data.map(game => game.genre))].sort();
  const select = document.getElementById('genreFilter');
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

function applyFilters() {
  filtered_data = all_data.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(state.search) ||
      game.short_description.toLowerCase().includes(state.search);
    const matchesPlatform = state.platform === 'all' ||
      (state.platform === 'pc' && game.platform.toLowerCase().includes('pc')) ||
      (state.platform === 'browser' && game.platform.toLowerCase().includes('web browser'));
    const matchesGenre = state.genre === 'all' || game.genre === state.genre;
    const matchesFav = !state.favoritesOnly || favorites.includes(game.id);

    return matchesSearch && matchesPlatform && matchesGenre && matchesFav;
  });

  currentPage = 1;
  renderApp();
}

const detailModal = document.getElementById("gameDetailModal");

// GLOBAL FUNCTIONS for onclick handlers
window.toggleFavorite = (id) => {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('freeGamesFavorites', JSON.stringify(favorites));
  renderApp();
};

window.toggleShare = (id) => {
  document.querySelectorAll('.share-menu').forEach(m => {
    if (m.id !== `share-menu-${id}`) m.classList.remove('show');
  });
  const menu = document.getElementById(`share-menu-${id}`);
  menu.classList.toggle('show');
};

window.openGameDetail = (id) => {
  detailModal.style.display = "block";
  document.getElementById("gameDetailBody").innerHTML = `<div class="loading-detail">Loading game details...</div>`;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("GET", `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`);
  xhr.setRequestHeader("X-RapidAPI-Key", "431e2e0512msh12ec0cf6343c1c8p1de776jsnb12502d1e36b");
  xhr.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      try {
        const game = JSON.parse(this.responseText);
        renderGameDetail(game);
      } catch (e) {
        console.error("Error parsing game details", e);
      }
    }
  });
  xhr.send(null);
};

window.closeDetailModal = () => {
  detailModal.style.display = "none";
};

// Image Viewer Logic
window.showFullImage = (src) => {
  const viewer = document.getElementById('imageViewerModal');
  const img = document.getElementById('fullSizeImage');
  img.src = src;
  viewer.style.display = 'flex';
  viewer.style.alignItems = 'center';
  viewer.style.justifyContent = 'center';

  if (viewer.requestFullscreen) {
    viewer.requestFullscreen().catch(err => console.log(err));
  } else if (viewer.webkitRequestFullscreen) {
    viewer.webkitRequestFullscreen();
  }
};

window.closeImageViewer = () => {
  const viewer = document.getElementById('imageViewerModal');
  viewer.style.display = 'none';
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.getElementById('imageViewerModal').style.display = 'none';
  }
});

document.addEventListener('webkitfullscreenchange', () => {
  if (!document.webkitFullscreenElement) {
    document.getElementById('imageViewerModal').style.display = 'none';
  }
});

// Global click handler for closing menus and modals
window.addEventListener('click', (event) => {
  if (event.target == detailModal) window.closeDetailModal();
  const viewer = document.getElementById('imageViewerModal');
  if (event.target == viewer) window.closeImageViewer();
  if (!event.target.closest('.icon-btn')) {
    document.querySelectorAll('.share-menu').forEach(m => m.classList.remove('show'));
  }
});

function renderSkeletons() {
  const gamesContainer = document.getElementById("free_games");
  let html = ``;
  for (let i = 0; i < 6; i++) {
    html += `
      <div class="item skeleton-container">
        <div class="img-container skeleton skeleton-img"></div>
        <div class="info">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 40%"></div>
        </div>
      </div>
    `;
  }
  gamesContainer.innerHTML = html;
}

function renderGameDetail(game) {
  const container = document.getElementById("gameDetailBody");

  let screenshotsHtml = '';
  if (game.screenshots && game.screenshots.length > 0) {
    screenshotsHtml = `
      <div class="screenshots-container">
        <h3>Screenshots</h3>
        <div class="screenshots-row">
          ${game.screenshots.map(s => `<img src="${s.image}" alt="Screenshot" onclick="window.showFullImage('${s.image}')">`).join('')}
        </div>
      </div>
    `;
  }

  let reqHtml = '<div class="req-item">No special requirements listed.</div>';
  if (game.minimum_system_requirements) {
    const r = game.minimum_system_requirements;
    reqHtml = `
      <div class="requirements-grid">
        <div class="req-item"><b>OS: </b> ${r.os || 'N/A'}</div>
        <div class="req-item"><b>Processor: </b>${r.processor || 'N/A'}</div>
        <div class="req-item"><b>Memory: </b>${r.memory || 'N/A'}</div>
        <div class="req-item"><b>Graphics: </b>${r.graphics || 'N/A'}</div>
        <div class="req-item"><b>Storage: </b>${r.storage || 'N/A'}</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="detail-header">
      <img src="${game.thumbnail}" alt="${game.title}">
      <div class="detail-header-overlay">
        <h2 class="glow-text-small" style="font-family: 'Germania One', cursive; margin: 0; font-size: 2.5rem;">${game.title}</h2>
        <p style="color: var(--accent-secondary); font-weight: 600; margin-top: 10px">${game.genre} | ${game.platform}</p>
      </div>
    </div>
    <div class="detail-info-grid">
      <div class="main-info">
        <h3>About the Game</h3>
        <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">${game.description}</p>
        ${screenshotsHtml}
      </div>
      <div class="sidebar-info">
        <div class="requirements-card">
          <h3>System Info</h3>
          ${reqHtml}
          
          <div class="metadata-list">
            <div class="meta-row"><span>Status</span> <b>${game.status || 'Live'}</b></div>
            <div class="meta-row"><span>Publisher</span> <b>${game.publisher}</b></div>
            <div class="meta-row"><span>Developer</span> <b>${game.developer}</b></div>
            <div class="meta-row"><span>Release Date</span> <b>${game.release_date}</b></div>
          </div>
          
          <div style="margin-top: 30px">
            <a href="${game.game_url}" target="_blank" class="btn" style="width: 100%; text-align: center; font-size: 1.1rem; padding: 15px;">PLAY NOW</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  const gamesContainer = document.getElementById("free_games");
  gamesContainer.className = `games-container ${currentView}`;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentGames = filtered_data.slice(startIndex, endIndex);

  if (currentGames.length === 0) {
    gamesContainer.innerHTML = `<div class="no-results" style="padding: 40px; text-align: center; color: var(--text-secondary);">No games found matching your criteria.</div>`;
    document.getElementById("pagination").innerHTML = '';
    return;
  }

  let html = ``;
  currentGames.forEach(game => {
    const isFav = favorites.includes(game.id);
    html += `
      <div class="item">
        <div class="img-container">
          <div class="card-actions">
            <button class="icon-btn ${isFav ? 'fav-active' : ''}" onclick="event.stopPropagation(); window.toggleFavorite(${game.id})" title="Favorite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <div style="position: relative">
              <button class="icon-btn" onclick="event.stopPropagation(); window.toggleShare(${game.id})" title="Share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </button>
              <div id="share-menu-${game.id}" class="share-menu">
                <a href="https://twitter.com/intent/tweet?text=Check out this free game: ${game.title}&url=${encodeURIComponent(game.game_url)}" target="_blank" class="share-link">Twitter</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(game.game_url)}" target="_blank" class="share-link">Facebook</a>
                <a href="javascript:void(0)" onclick="navigator.clipboard.writeText('${game.game_url}'); alert('Link copied!')" class="share-link">Copy Link</a>
              </div>
            </div>
          </div>
          <a href="javascript:void(0)" onclick="window.openGameDetail(${game.id})">
            <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
          </a>
        </div>
        <div class="info" onclick="window.openGameDetail(${game.id})" style="cursor: pointer">
          <div class="info-header">
            <h2>${game.title}</h2>
            <span class="genre">${game.genre}</span>
          </div>
          <div class="meta-info">
            <span>${game.platform}</span> • <span>${game.developer}</span>
          </div>
          <p class="description">${game.short_description}</p>
          <span class="release-date">Release Date: <b>${game.release_date}</b></span>
        </div>
        <div class="action">
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <a class="btn" href="${game.game_url}" target="_blank">Get It Now!</a>
            <button class="btn btn-secondary" onclick="window.openGameDetail(${game.id})">View Details</button>
          </div>
        </div>
      </div>
    `;
  });

  gamesContainer.innerHTML = html;
  renderPagination();
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  const totalPages = Math.ceil(filtered_data.length / pageSize);

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.changePage(${currentPage - 1})">Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.changePage(${i})">${i}</button>`;
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      if (!html.endsWith('...</span>')) html += `<span style="color: grey">...</span>`;
    }
  }

  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.changePage(${currentPage + 1})">Next</button>`;

  paginationContainer.innerHTML = html;
}

window.changePage = (page) => {
  currentPage = page;
  renderApp();
  window.scrollTo({ top: 300, behavior: 'smooth' });
}