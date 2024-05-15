import { fetchPosts, fetchUser } from './queries';
import { displayPosts } from './display';
import { loadAndDisplayPosts } from './actions';

const searchInput = document.getElementById('search-input') as HTMLInputElement;
const postsContainer = document.getElementById('posts-container') as HTMLElement;
let debounceTimeout: number;
let loading = false;
let currentPage = 1;
const pageSize = 10;

function isBottomOfPage(): boolean {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // Триггер предзагрузки за 100px до конца
}

async function handleInput(): Promise<void> {
  const searchTerm = encodeURIComponent(searchInput.value.trim());
  currentPage = 1;
  postsContainer.innerHTML = '';
  clearTimeout(debounceTimeout);
  debounceTimeout = window.setTimeout(async () => {
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
