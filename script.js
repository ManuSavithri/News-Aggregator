const apiKey = '7d8a3759c991472f855e04a6ad98604f'; // 🔑 Replace with your actual API key
const categoryDropdown = document.getElementById('category');
const searchInput = document.getElementById('search');
const newsContainer = document.getElementById('news-container');

async function fetchNews(category = 'general', query = '') {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No articles found.</p>";
      return;
    }
    displayNews(data.articles);
  } catch (err) {
    newsContainer.innerHTML = "<p>Error loading news.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = articles.map(article => `
    <div class="card">
      <img src="${article.urlToImage || ''}" alt="News image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
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


