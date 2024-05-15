import { fetchPosts, fetchUser } from './queries.js';
import { displayPosts } from './display.js';

const searchInput = document.getElementById('search-input');
const postsContainer = document.getElementById('posts-container');
let loading = false;
let debounceTimeout;
let currentPage = 1;
const pageSize = 10;

function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // Trigger pre-fetching 100px before the bottom
}

async function loadAndDisplayPosts(title = '', page = 1) {
  try {
    loading = true;

    const posts = await fetchPosts(page, pageSize, title);

    currentPage = page + 1;

    // Fetch user data in the background
    const postsWithUser = await Promise.all(posts.map(async post => {
      const user = await fetchUser(post.userId);
      post.user = user;
      return post;
    }));

    if (page === 1) {
      postsContainer.innerHTML = '';
    }

    displayPosts(postsWithUser, postsContainer);

    loading = false;
  } catch (error) {
    console.error('Error loading and displaying posts:', error);
    postsContainer.innerHTML = `<p>${error.message}</p>`;
    loading = false;
  }
}

async function handleInput() {
  const searchTerm = encodeURIComponent(searchInput.value.trim());
  currentPage = 1;
  postsContainer.innerHTML = '';
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    await loadAndDisplayPosts(searchTerm, 1);
  }, 500);
}

searchInput.addEventListener('input', handleInput);

window.addEventListener('scroll', async () => {
  if (isBottomOfPage() && !loading) {
    const searchTerm = encodeURIComponent(searchInput.value.trim());
    await loadAndDisplayPosts(searchTerm, currentPage);
  }
});

window.addEventListener('load', handleInput);
