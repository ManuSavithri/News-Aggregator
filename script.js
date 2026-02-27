const apiKey = 'APIKEY'; // Replace with your actual API key
const categoryDropdown = document.getElementById('category');
const searchInput = document.getElementById('search');
const newsContainer = document.getElementById('news-container');
const loader = document.getElementById('loader');

async function fetchNews(category = 'general', query = '') {
  loader.classList.add('active');
  newsContainer.innerHTML = '';
  
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    loader.classList.remove('active');
    
    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p class='error'>No articles found. Try a different search or category.</p>";
      return;
    }
    displayNews(data.articles);
  } catch (err) {
    loader.classList.remove('active');
    newsContainer.innerHTML = "<p class='error'>Error loading news. Please try again later.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = articles.map(article => `
    <div class="card">
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x220/667eea/ffffff?text=No+Image'}" alt="News image" onerror="this.src='https://via.placeholder.com/400x220/667eea/ffffff?text=No+Image'">
      <div class="card-content">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    </div>
  `).join('');
}

categoryDropdown.addEventListener('change', () => {
  fetchNews(categoryDropdown.value);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchNews('', searchInput.value);
  }
});

// Initial load
fetchNews();