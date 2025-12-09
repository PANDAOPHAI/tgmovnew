const movieList     = document.getElementById("movie-list");
const popularList   = document.getElementById("popular-list");
const topRatedList  = document.getElementById("top-rated-list");
const searchInput   = document.getElementById("searchInput");
const searchResults = document.getElementById("search-results");

/* =========================
   Helper: kis movie ko kahan bhejna hai
   ========================= */
function getTargetHref(movie) {
  // ✅ Agar series hai → generic series page + query param
  if (movie.type === "series") {
    return `series.html?id=${movie.id}`;
  }
  // ✅ Episodes & movies dono player se chalenge
  return `player.html?id=${movie.id}`;
}

/* =========================
   ✅ ALL MOVIES GRID
========================= */

function renderAllMovies(list) {
  if (!movieList) return;
  movieList.innerHTML = "";

  // Episodes ko grid me mat dikhana
  const filtered = list.filter(m => m.type !== "episode");

  filtered.forEach(movie => {
    const card = document.createElement("a");
    card.href = getTargetHref(movie);
    card.className = "movie-card";

    card.innerHTML = `
      <div class="movie-thumb">
        <img src="${movie.poster}" alt="${movie.title}">
        <span class="badge-quality">${movie.quality || "HD"}</span>
      </div>
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year || ""} · ${movie.genre || ""}</p>
      </div>
    `;

    movieList.appendChild(card);
  });
}

if (typeof MOVIES !== "undefined") {
  renderAllMovies(MOVIES);
}


/* =========================
   🔍 SEARCH RESULTS LIST
========================= */

function renderSearchResults(list) {
  if (!searchResults) return;

  if (!list.length) {
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    return;
  }

  searchResults.innerHTML = "";
  searchResults.style.display = "block";

  list.forEach(movie => {
    const item = document.createElement("a");
    item.href = getTargetHref(movie);
    item.className = "search-result-item";

    item.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="search-result-text">
        <div class="search-result-title">${movie.title}</div>
        <div class="search-result-meta">
          ${(movie.year || "")} ${movie.genre ? "· " + movie.genre : ""}
        </div>
      </div>
    `;

    searchResults.appendChild(item);
  });
}

if (searchInput && searchResults && typeof MOVIES !== "undefined") {
  searchInput.addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();

    if (!q) {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }

    const filtered = MOVIES.filter(m =>
      m.type !== "episode" &&            // episodes search list me mat dikhana
      (m.title || "").toLowerCase().includes(q)
    );

    renderSearchResults(filtered);
  });
}


/* =========================
   ⭐ POPULAR MOVIES
========================= */

if (popularList && typeof MOVIES !== "undefined") {
  popularList.innerHTML = "";

  MOVIES
    .filter(m => m.category === "popular" && m.type !== "episode")
    .forEach(movie => {
      const card = document.createElement("a");
      card.href = getTargetHref(movie);
      card.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
      popularList.appendChild(card);
    });
}
/* =========================
   ⭐ ANIME MOVIES
========================= */

if (animeList && typeof MOVIES !== "undefined") {
  animeList.innerHTML = "";

  MOVIES
    .filter(m => m.category === "Anime" && m.type !== "episode")
    .forEach(movie => {
      const card = document.createElement("a");
      card.href = getTargetHref(movie);
      card.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
      animeList.appendChild(card);
    });
}


/* =========================
   ⭐ TOP RATED MOVIES
========================= */

if (topRatedList && typeof MOVIES !== "undefined") {
  topRatedList.innerHTML = "";

  MOVIES
    .filter(m => m.rating >= 8.5 && m.type !== "episode")
    .forEach(movie => {
      const card = document.createElement("a");
      card.href = getTargetHref(movie);
      card.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
      topRatedList.appendChild(card);
    });
}

